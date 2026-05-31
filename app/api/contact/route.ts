import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/data/site-config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const upstream = await fetch(siteConfig.appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" }, // Apps Script requires text/plain
      body: JSON.stringify(body),
    });

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
