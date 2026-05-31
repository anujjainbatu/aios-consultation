// ============================================================
// Anuj Jain — Lead Form Handler
// Deploy as: Extensions > Apps Script > Deploy > New deployment
//   Type: Web App
//   Execute as: Me
//   Who has access: Anyone
// Copy the Web App URL into siteConfig.appsScriptUrl
//
// No extra services needed — uses built-in CalendarApp + UrlFetchApp.
// ============================================================

const NOTIFY_EMAIL = "hi@anujjain.dev";
const MY_NAME      = "Anuj Jain";
const SHEET_NAME   = "Leads";
const CAL_ID       = "edecccb91cbcefa5a14f5915f68f0f5b03ef7ba0a75263cd6cad340f51baa96a@group.calendar.google.com";

// Free window: 6 PM IST → 8 AM IST (next morning) — 14-hour window each day
const FREE_START_HOUR = 18;        // 6 PM IST
const FREE_END_HOUR   = 8;         // 8 AM IST
const SLOT_MINS       = 60;        // 1-hour appointments
const DAYS_AHEAD      = 7;         // look up to 7 days ahead

// ── ENTRY POINTS ──────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // ── Write to Google Sheet ───────────────────────────────────────────────
    const ss  = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp", "Name", "Email", "Website", "Company Size", "Meet Link", "Slot (IST)"]);
      sheet.setFrozenRows(1);
    }

    // ── Find a free slot and book it ────────────────────────────────────────
    let meetLink   = "";
    let slotStr    = "";
    let bookingErr = "";

    try {
      const slot  = findSlot();
      const event = slot ? createEvent(data.name, data.email, data.companySize, slot) : null;

      if (event) {
        meetLink = event.hangoutLink
          || (event.conferenceData && event.conferenceData.entryPoints &&
              event.conferenceData.entryPoints[0] &&
              event.conferenceData.entryPoints[0].uri)
          || "";
        slotStr = fmtIST(slot.start) + " – " + fmtIST(slot.end) + " IST";
        sendLeadConfirmation(data.name, data.email, slot, meetLink);
      } else if (!slot) {
        bookingErr = "No free slot found in the next " + DAYS_AHEAD + " days.";
      }
    } catch (err) {
      bookingErr = err.message;
      Logger.log("Booking error: " + err.message);
    }

    // ── Log to sheet ────────────────────────────────────────────────────────
    sheet.appendRow([
      new Date(),
      data.name        || "",
      data.email       || "",
      data.website     || "",
      data.companySize || "",
      meetLink,
      slotStr,
    ]);

    // ── Notify Anuj ─────────────────────────────────────────────────────────
    const subject = "New lead: " + (data.name || "—") + " — " + (data.companySize || "—");
    const body    =
      "Name:         " + (data.name        || "—") + "\n" +
      "Email:        " + (data.email       || "—") + "\n" +
      "Website:      " + (data.website     || "—") + "\n" +
      "Company size: " + (data.companySize || "—") + "\n" +
      (slotStr    ? "Booked slot:  " + slotStr   + "\n" : "Booking:      FAILED — book manually\n") +
      (meetLink   ? "Meet link:    " + meetLink  + "\n" : "") +
      (bookingErr ? "Error detail: " + bookingErr + "\n" : "") +
      "\nSubmitted at: " + new Date().toLocaleString();

    GmailApp.sendEmail(NOTIFY_EMAIL, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput("Lead form endpoint is live.")
    .setMimeType(ContentService.MimeType.TEXT);
}

// ── SLOT FINDER ───────────────────────────────────────────────────────────────

function findSlot() {
  const now   = new Date();
  const limit = new Date(now.getTime() + DAYS_AHEAD * 864e5);

  // One freeBusy call covers the whole search range — no per-slot API calls.
  const busy = fetchBusy(now, limit);

  // Start at the next whole IST hour boundary after now.
  let t = roundUpToISTHour(now);

  while (t < limit) {
    const h   = istHour(t);
    const end = new Date(t.getTime() + SLOT_MINS * 60000);

    // In daytime block (8 AM – 6 PM IST) → jump straight to next 6 PM IST.
    if (h >= FREE_END_HOUR && h < FREE_START_HOUR) {
      t = nextSixPmIST(t);
      continue;
    }

    // Slot end must not bleed into daytime — except it may land exactly at 8:00 AM.
    const endH   = istHour(end);
    const endMin = toIST(end).getUTCMinutes();
    const endBleedsIntoDaytime = (endH >= FREE_END_HOUR && endH < FREE_START_HOUR)
                               && !(endH === FREE_END_HOUR && endMin === 0);
    if (endBleedsIntoDaytime) {
      t = nextSixPmIST(t);
      continue;
    }

    // Check against busy intervals.
    const blocked = busy.some(b => t < b.end && end > b.start);
    if (!blocked) return { start: t, end: end };

    t = end; // advance by one slot
  }

  return null;
}

// One freeBusy API call — returns [{start, end}] of busy intervals.
function fetchBusy(from, to) {
  const token = ScriptApp.getOAuthToken();
  const res   = UrlFetchApp.fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method:            "post",
    headers:           { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
    payload:           JSON.stringify({ timeMin: from.toISOString(), timeMax: to.toISOString(), items: [{ id: CAL_ID }] }),
    muteHttpExceptions: true,
  });

  if (res.getResponseCode() !== 200) {
    throw new Error("FreeBusy API " + res.getResponseCode() + ": " + res.getContentText());
  }

  const data = JSON.parse(res.getContentText());
  const cal  = data.calendars && data.calendars[CAL_ID];
  if (!cal) throw new Error("Calendar not found in freeBusy response. Check CAL_ID.");

  return (cal.busy || []).map(function(b) {
    return { start: new Date(b.start), end: new Date(b.end) };
  });
}

// Round `date` up to the next whole hour in IST (so candidates are always tidy HH:00 IST).
function roundUpToISTHour(date) {
  const HOUR_MS  = 3600000;
  const istMs    = date.getTime() + IST_MS;
  const rounded  = Math.ceil(istMs / HOUR_MS) * HOUR_MS;
  return new Date(rounded - IST_MS);
}

// Next 6 PM IST strictly after `from`.
function nextSixPmIST(from) {
  const ist    = toIST(from);
  const same   = fromIST(new Date(Date.UTC(
    ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate(), FREE_START_HOUR, 0, 0, 0
  )));
  return same > from ? same : new Date(same.getTime() + 864e5);
}

// ── CALENDAR EVENT ────────────────────────────────────────────────────────────

// Uses UrlFetchApp + OAuth token — no Advanced Calendar Service needed.
function createEvent(name, email, companySize, slot) {
  const resource = {
    summary:     "Free AI Consultation — " + MY_NAME + " × " + name,
    description: "Auto-booked via anujjain.dev/book\n\nCompany size: " + (companySize || "—"),
    start: { dateTime: slot.start.toISOString(), timeZone: "Asia/Kolkata" },
    end:   { dateTime: slot.end.toISOString(),   timeZone: "Asia/Kolkata" },
    attendees: [{ email: email, displayName: name }],
    conferenceData: {
      createRequest: {
        requestId:             Utilities.getUuid(),
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
    reminders: {
      useDefault: false,
      overrides:  [
        { method: "email", minutes: 60 },
        { method: "popup", minutes: 15 },
      ],
    },
  };

  const calId    = encodeURIComponent(CAL_ID);
  const url      = "https://www.googleapis.com/calendar/v3/calendars/" + calId +
                   "/events?conferenceDataVersion=1&sendUpdates=all";
  const token    = ScriptApp.getOAuthToken();

  const response = UrlFetchApp.fetch(url, {
    method:  "post",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type":  "application/json",
    },
    payload:              JSON.stringify(resource),
    muteHttpExceptions:   true,
  });

  const code = response.getResponseCode();
  if (code !== 200) {
    throw new Error("Calendar API " + code + ": " + response.getContentText());
  }

  return JSON.parse(response.getContentText());
}

// ── LEAD CONFIRMATION EMAIL ───────────────────────────────────────────────────

function sendLeadConfirmation(name, email, slot, meetLink) {
  const startStr = fmtIST(slot.start);
  const endStr   = fmtIST(slot.end);
  const subject  = "Your session with Anuj Jain is confirmed";

  const plain =
    "Hi " + name + ",\n\n" +
    "Your free AI strategy session with " + MY_NAME + " is confirmed.\n\n" +
    "Date & Time : " + startStr + " IST\n" +
    "Ends at     : " + endStr   + " IST\n" +
    "Duration    : " + SLOT_MINS + " minutes\n" +
    "Google Meet : " + meetLink  + "\n\n" +
    "A Google Calendar invite has been sent to your inbox.\n\n" +
    "See you then,\n" +
    MY_NAME + "\n" +
    "anujjain.dev";

  const html = buildEmailHtml(name, startStr, endStr, meetLink);

  GmailApp.sendEmail(email, subject, plain, {
    htmlBody: html,
    name:     MY_NAME,
    replyTo:  NOTIFY_EMAIL,
  });
}

function buildEmailHtml(name, startStr, endStr, meetLink) {
  // Design tokens mirror the website (globals.css)
  // bg:#000  surface:#171717  border:#262626  text-secondary:#9ca3af  accent:#3b82f6→#93c5fd

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<title>Session Confirmed — Anuj Jain</title>
<style>
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
  table,td{mso-table-lspace:0;mso-table-rspace:0}
  img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}
  body{margin:0;padding:0;background-color:#0a0a0a}
  @media only screen and (max-width:600px){
    .wrap{padding:20px 8px!important}
    .card-pad{padding:28px 20px!important}
    .btn-cell{padding:20px!important}
    .foot-pad{padding:20px 20px 24px!important}
    h1{font-size:22px!important}
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
<tr><td align="center" class="wrap" style="padding:40px 16px;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:576px;">

    <!-- Top accent bar -->
    <tr>
      <td style="height:3px;background:linear-gradient(90deg,#3b82f6 0%,#93c5fd 100%);border-radius:14px 14px 0 0;font-size:0;line-height:0;">&nbsp;</td>
    </tr>

    <!-- ── HEADER ── -->
    <tr>
      <td bgcolor="#111111" class="card-pad" style="padding:40px 40px 28px;text-align:center;">

        <!-- Confirmed badge -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 22px;">
          <tr>
            <td style="background-color:#0d1f3c;border:1px solid #1d4ed8;border-radius:100px;padding:5px 16px;">
              <span style="color:#60a5fa;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">&#10003;&nbsp;&nbsp;Session Confirmed</span>
            </td>
          </tr>
        </table>

        <!-- Headline -->
        <h1 style="margin:0 0 12px;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;line-height:1.25;">
          You're booked, <span style="color:#60a5fa;">${name}</span>.
        </h1>

        <!-- Subtext -->
        <p style="margin:0;color:#9ca3af;font-size:15px;line-height:1.65;">
          Your free AI strategy session with
          <span style="color:#ffffff;font-weight:600;">Anuj Jain</span>
          is confirmed.<br>Here's everything you need.
        </p>

      </td>
    </tr>

    <!-- ── DETAILS CARD ── -->
    <tr>
      <td bgcolor="#111111" style="padding:0 32px 4px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background-color:#171717;border:1px solid #262626;border-radius:12px;overflow:hidden;">

          <!-- Date & Time -->
          <tr>
            <td style="padding:15px 20px;border-bottom:1px solid #262626;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="color:#4b5563;font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">DATE &amp; TIME</td>
                  <td style="color:#ffffff;font-size:14px;font-weight:600;text-align:right;">${startStr}&nbsp;IST</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Ends at -->
          <tr>
            <td style="padding:15px 20px;border-bottom:1px solid #262626;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="color:#4b5563;font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">ENDS AT</td>
                  <td style="color:#9ca3af;font-size:14px;text-align:right;">${endStr}&nbsp;IST</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Duration -->
          <tr>
            <td style="padding:15px 20px;border-bottom:1px solid #262626;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="color:#4b5563;font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">DURATION</td>
                  <td style="color:#9ca3af;font-size:14px;text-align:right;">${SLOT_MINS} minutes</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Google Meet link -->
          <tr>
            <td style="padding:15px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="color:#4b5563;font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;white-space:nowrap;vertical-align:middle;">GOOGLE MEET</td>
                  <td style="text-align:right;padding-left:12px;vertical-align:middle;">
                    <a href="${meetLink}" style="color:#3b82f6;font-size:13px;text-decoration:none;word-break:break-all;">${meetLink}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>

    <!-- ── CTA BUTTON ── -->
    <tr>
      <td bgcolor="#111111" class="btn-cell" style="padding:28px 32px 40px;text-align:center;">

        <!-- Button -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
          <tr>
            <td style="border-radius:10px;background-color:#3b82f6;">
              <a href="${meetLink}"
                 style="display:inline-block;background-color:#3b82f6;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 38px;border-radius:10px;letter-spacing:-0.2px;">
                Join Google Meet &rarr;
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:16px 0 0;color:#374151;font-size:12px;line-height:1.55;">
          A Google Calendar invite has been sent to your inbox.
        </p>

      </td>
    </tr>

    <!-- Thin rule -->
    <tr>
      <td bgcolor="#111111" style="padding:0 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td style="height:1px;background-color:#1c1c1c;font-size:0;line-height:0;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- ── FOOTER ── -->
    <tr>
      <td bgcolor="#0d0d0d" class="foot-pad" style="padding:24px 32px 28px;border-radius:0 0 14px 14px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="vertical-align:middle;">
              <p style="margin:0 0 2px;color:#ffffff;font-size:14px;font-weight:700;">Anuj Jain</p>
              <p style="margin:0;color:#4b5563;font-size:12px;">AI Strategy &amp; Implementation Consultant</p>
            </td>
            <td style="text-align:right;vertical-align:middle;">
              <a href="https://anujjain.dev" style="color:#374151;font-size:12px;text-decoration:none;">anujjain.dev</a>
            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
          <tr><td style="height:1px;background-color:#1a1a1a;font-size:0;line-height:0;">&nbsp;</td></tr>
        </table>

        <p style="margin:14px 0 0;color:#374151;font-size:11px;line-height:1.65;">
          Need to reschedule? Reply to this email or write to
          <a href="mailto:${NOTIFY_EMAIL}" style="color:#3b82f6;text-decoration:none;">${NOTIFY_EMAIL}</a>
        </p>

      </td>
    </tr>

    <!-- Bottom accent bar -->
    <tr>
      <td style="height:3px;background:linear-gradient(90deg,#3b82f6 0%,#93c5fd 100%);border-radius:0 0 14px 14px;font-size:0;line-height:0;">&nbsp;</td>
    </tr>

  </table>
</td></tr>
</table>

</body>
</html>`;
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

const IST_MS = 5.5 * 3600000; // UTC+5:30

function toIST(date)   { return new Date(date.getTime() + IST_MS); }
function fromIST(date) { return new Date(date.getTime() - IST_MS); }
function istHour(date) { return toIST(date).getUTCHours(); }

function fmtIST(date) {
  return Utilities.formatDate(date, "Asia/Kolkata", "EEE, MMM d yyyy · h:mm a");
}
