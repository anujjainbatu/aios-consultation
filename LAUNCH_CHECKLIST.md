# Launch Checklist for anujjain.dev

Complete this checklist before going live with your consulting website.

## 1. Vercel Setup

- [ ] **Create Vercel account** (https://vercel.com/signup)
- [ ] **Connect GitHub repository** to Vercel
  - Go to https://vercel.com/new
  - Select the website repo
  - Framework: "Next.js" (auto-detected)
  - Root directory: "./" (default)
  - Click "Deploy"
- [ ] **Wait for first deployment** to complete (usually 2-3 minutes)
- [ ] **Test preview deployment** — click the preview URL and verify all pages load

## 2. Domain Configuration

- [ ] **Prepare anujjain.dev domain**
  - Purchase domain (if not already owned)
  - Add custom domain in Vercel project settings (Settings > Domains)
  - Follow Vercel's DNS setup instructions for your registrar
  - Common registrars: Namecheap, GoDaddy, Route 53, Google Domains
- [ ] **Point DNS to Vercel**
  - Add A record: 76.76.19.165
  - OR add CNAME record: cname.vercel-dns.com
  - Wait for DNS propagation (up to 24 hours, usually 5-15 minutes)
- [ ] **Verify HTTPS**
  - Vercel auto-provisions SSL certificate
  - Check that https://anujjain.dev loads without warnings
- [ ] **Set primary domain**
  - In Vercel: Settings > Domains > select anujjain.dev as primary
  - Optional: redirect www.anujjain.dev to anujjain.dev

## 3. Content Configuration

- [ ] **Update site-config.ts** with Anuj's information
  - Email address
  - Social links (LinkedIn, GitHub, Twitter)
  - Phone number (if applicable)
  - Calendly URL (see Calendly Setup section below)

- [ ] **Replace case studies**
  - Create new MDX files in `content/case-studies/`
  - Replace placeholder projects with real consulting work
  - Include problem, solution, and impact metrics
  - Ensure each has a featured image

- [ ] **Replace blog posts**
  - Create new MDX files in `content/blog/`
  - Post topics: AI consulting, startup strategy, GTM, tech leadership
  - Include author bio and publication date
  - Link to Calendly for relevant CTAs

- [ ] **Update home page** (`app/page.tsx`)
  - Hero headline and subheadline
  - Value proposition (3-5 key points)
  - Services offered
  - Call-to-action buttons

## 4. Visual Assets

- [ ] **Create OG image**
  - Size: 1200 x 630 pixels (PNG format)
  - Text: "Anuj Jain | AI Consultant"
  - Design: Professional, on-brand colors
  - Tools: Canva Pro or Figma
  - Save to: `public/og-default.svg` (or update path in `app/layout.tsx`)

- [ ] **Add favicon** (if not already present)
  - Size: 32x32 or 64x64 PNG
  - Save to: `public/favicon.ico`

- [ ] **Add profile photo** (for /about page if applicable)
  - Professional headshot
  - Recommended: 400x400 PNG or JPG
  - Save to: `public/images/profile.jpg`

## 5. Calendly Setup

- [ ] **Create Calendly account** (https://calendly.com)
- [ ] **Create event type for consultations**
  - Duration: 1 hour
  - Title: "Consulting Session" or "Strategy Call"
  - Description: "Free 1-hour consulting session to discuss your AI/GTM needs"
  - Calendar: Connect your Google Calendar or Outlook
  - Availability: Set your working hours
  - Timezone: Set to your local timezone

- [ ] **Get Calendly URL**
  - Usually: https://calendly.com/anujjain/consult
  - Or your custom slug if set up

- [ ] **Update calendlyUrl in site-config.ts**
  ```typescript
  calendlyUrl: "https://calendly.com/anujjain/consult",
  ```

- [ ] **Test embed on /book page**
  - Visit http://localhost:3000/book during local dev
  - Verify Calendly widget loads correctly
  - Test booking a slot
  - Cancel test booking

## 6. SEO & Meta Configuration

- [ ] **Verify meta tags in layout.tsx**
  - Site title
  - Site description
  - OG image URL
  - Twitter card configuration

- [ ] **Check robots.txt** (`app/robots.ts`)
  - Ensure Disallow rules are appropriate
  - Allow crawling for Google, Bing

- [ ] **Check sitemap.xml** (`app/sitemap.ts`)
  - Verify all pages are included
  - Test: https://anujjain.dev/sitemap.xml

- [ ] **Submit to Google Search Console**
  - Add property for anujjain.dev
  - Upload sitemap
  - Request indexing for key pages

## 7. Security & Performance

- [ ] **Verify Content Security Policy** (next.config.ts)
  - Calendly domains are whitelisted
  - Run security headers check: https://securityheaders.com

- [ ] **Test on mobile devices**
  - Visit site on iPhone and Android
  - Verify responsive design
  - Test Calendly embed on mobile
  - Check form submissions (if any)

- [ ] **Performance check**
  - Run Lighthouse: https://developers.google.com/web/tools/lighthouse
  - Target: 90+ performance score
  - Check Core Web Vitals

- [ ] **Test all pages**
  - Home (/)
  - About (/about)
  - Work/Case Studies (/work)
  - Individual case study pages
  - Writing/Blog (/writing)
  - Individual blog post pages
  - Book/Calendly (/book)
  - Contact form (if applicable)

## 8. Analytics (Optional)

- [ ] **Set up Google Analytics**
  - Create GA4 property for anujjain.dev
  - Add tracking ID to environment variables
  - Verify pageviews in real-time

- [ ] **Set up Vercel Analytics**
  - Enable in Vercel project settings
  - Monitor Core Web Vitals and deployment performance

## 9. Email & Communication

- [ ] **Set up email forwarding** (if needed)
  - Forward anuj@anujjain.dev to automation@brilliantbrains.ai
  - Or use Vercel/domain registrar forwarding

- [ ] **Test contact email submissions**
  - If you have a contact form, verify emails arrive

## 10. Final Checks

- [ ] **Test all external links**
  - LinkedIn profile
  - GitHub profile
  - Twitter/X profile
  - Email links

- [ ] **Verify build is optimized**
  - Run: `npm run build`
  - Check output for warnings
  - Verify `.next` directory is under 50MB

- [ ] **Announce launch**
  - Update LinkedIn profile with website link
  - Tweet about launch
  - Add to GitHub portfolio
  - Share with network

---

## Post-Launch Monitoring (First 2 Weeks)

- [ ] Monitor Vercel analytics for traffic
- [ ] Test Calendly integration for any booking issues
- [ ] Monitor for 404 errors in Vercel logs
- [ ] Check Google Search Console for indexing issues
- [ ] Gather feedback from first visitors
- [ ] Update content based on engagement metrics

## Support & Maintenance

**For questions about deployment:**
- Vercel docs: https://vercel.com/docs
- Next.js deployment: https://nextjs.org/docs/app/building-your-application/deploying

**For DNS issues:**
- Check your domain registrar's DNS settings
- Use https://dnschecker.org to verify DNS propagation
- Vercel support: https://vercel.com/support

**For Calendly troubleshooting:**
- Calendly Help Center: https://help.calendly.com
- Check CSP headers in next.config.ts if embed doesn't load
