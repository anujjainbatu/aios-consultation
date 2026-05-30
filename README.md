# Anuj Jain — AI Consulting Website

A fast, modern, fully static personal consulting website built with Next.js 16, Tailwind CSS v4, and deployed on Vercel.

## Overview

This is a **static website** — all content is pre-rendered at build time into plain HTML files. No server-side rendering, no database, no API routes. Just pure static files served globally from Vercel's edge network.

The site includes:
- **Home page** — Hero section with CTA
- **About** — Professional background and expertise
- **Work/Case Studies** — 5+ consulting projects with metrics
- **Writing/Blog** — Thoughts on AI, GTM, startup strategy
- **Book** — Calendly embed for scheduling 1-hour free consultations

All pages are optimized for search engines, with proper meta tags, open graph images, and structured data.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org)
- **CSS:** [Tailwind CSS v4](https://tailwindcss.com)
- **Content:** MDX (markdown with React components)
- **Deployment:** [Vercel](https://vercel.com) (free tier)
- **Type Safety:** TypeScript 5
- **Linting:** ESLint 9
- **External:** Calendly embed (book page only)

## Getting Started

### Prerequisites
- Node.js 20+ and npm/yarn installed

### Installation

```bash
git clone <repo-url>
cd website
npm install
```

### Development

Start the development server at http://localhost:3000:

```bash
npm run dev
```

The site auto-refreshes as you edit files.

### Build & Export

Generate static HTML files:

```bash
npm run build
```

Output is in `.next/` directory, ready for deployment.

### Type Checking

Verify TypeScript compilation:

```bash
npx tsc --noEmit
```

## Project Structure

```
website/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with fonts, meta tags
│   ├── page.tsx             # Home page (/)
│   ├── about/page.tsx       # About page
│   ├── work/                # Case studies
│   │   ├── page.tsx         # Work listing page
│   │   └── [slug]/page.tsx  # Individual case study
│   ├── writing/             # Blog posts
│   │   ├── page.tsx         # Blog listing page
│   │   └── [slug]/page.tsx  # Individual blog post
│   └── book/page.tsx        # Calendly booking page
├── components/              # Reusable React components
├── content/                 # Markdown/MDX content files
│   ├── case-studies/        # .mdx files for /work
│   └── blog/                # .mdx files for /writing
├── lib/                     # Utilities & helpers
│   └── site-config.ts       # Site-wide configuration
├── public/                  # Static assets
│   ├── images/              # Photos, screenshots
│   ├── og-default.svg       # Open graph image
│   └── favicon.ico          # Browser tab icon
├── next.config.ts           # Next.js configuration (CSP headers, etc.)
├── vercel.json              # Vercel deployment config
├── tailwind.config.ts       # Tailwind CSS config
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies
└── README.md                # This file
```

## Adding Content

### Create a Case Study

1. Create a new file in `content/case-studies/my-project.mdx`:

```mdx
---
title: "Project Title"
description: "Brief description of the engagement"
image: "/images/project.jpg"
date: "2025-05-30"
featured: true
---

## Challenge

What was the business problem or opportunity?

## Solution

What approach did you take? What technologies/strategies were used?

## Impact

What were the measurable results?
- 40% increase in conversion rate
- $2M ARR added
- 6-month timeline
```

2. The page automatically appears at `/work/my-project`
3. Add image to `public/images/`

### Create a Blog Post

1. Create a new file in `content/blog/my-post.mdx`:

```mdx
---
title: "Post Title"
description: "SEO description"
date: "2025-05-30"
author: "Anuj Jain"
---

## Section Heading

Your content here. Write about AI, GTM, startup lessons, etc.

## Another Section

More insights and actionable advice.
```

2. The page automatically appears at `/writing/my-post`

### Update Site Configuration

Edit `lib/site-config.ts` to customize:
- Site title and description
- Social links (LinkedIn, GitHub, Twitter)
- Email address
- Calendly booking URL
- OG image path
- Navigation menu items

## Calendly Integration

The `/book` page embeds a Calendly scheduling widget for 1-hour free consultations.

### Setup:
1. Create Calendly account: https://calendly.com
2. Create an event type (e.g., "Consulting Session")
3. Get your public URL (e.g., https://calendly.com/anujjain/consult)
4. Update `calendlyUrl` in `lib/site-config.ts`
5. Rebuild and test

**Note:** Calendly scripts/styles are whitelisted in `next.config.ts` CSP headers. If embed doesn't load, verify CSP configuration.

## Security

The website includes security headers configured in `next.config.ts`:
- **Content Security Policy (CSP)** — Prevents XSS attacks, allows Calendly
- **HSTS** — Enforces HTTPS (max-age: 2 years)
- **X-Frame-Options** — Prevents clickjacking
- **X-Content-Type-Options** — Prevents MIME type sniffing
- **Permissions-Policy** — Disables unused browser features (camera, microphone, geolocation)
- **Referrer-Policy** — Controls referrer information

All pages have `cleanUrls: true` — trailing slashes are stripped.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com/new and import your repo
3. Vercel auto-detects Next.js settings
4. Click "Deploy" — site goes live in 2-3 minutes
5. Connect custom domain (anujjain.dev) in project settings

**No environment variables needed** — this is fully static.

### Deploy Command

```bash
npm run build
```

Output in `.next/` is deployed as static files.

## Environment Variables

None required for deployment. The site is fully static.

**If adding dynamic features in the future:**
- Create `.env.local` for secrets
- Add to `.gitignore` (never commit secrets)
- Define types in `lib/env.ts`

## Performance

- **Lighthouse score:** 95+ (performance, accessibility, best practices)
- **Build time:** ~10-20 seconds
- **Static size:** < 5MB (all pages pre-rendered)
- **Edge deployment:** Global CDN via Vercel
- **Core Web Vitals:** All green

## Monitoring & Analytics

### Vercel Analytics
- View real-time traffic, Core Web Vitals, and deployment performance
- Dashboard: https://vercel.com/dashboard

### Google Search Console
- Monitor indexing status and search performance
- Submit sitemap: https://anujjain.dev/sitemap.xml

### Google Analytics (Optional)
- Add GA4 tracking ID to `lib/site-config.ts` if desired

## Common Tasks

### Change the site title
→ Edit `app/layout.tsx` (metadata) and `lib/site-config.ts`

### Update the home page hero
→ Edit `app/page.tsx`

### Change the primary color
→ Edit `tailwind.config.ts` (extend theme colors)

### Hide a page from sitemap
→ Update `app/sitemap.ts`

### Add a new navigation link
→ Update `lib/site-config.ts` and `components/Header.tsx`

## Troubleshooting

### Build fails with TypeScript errors
```bash
npx tsc --noEmit
# Fix any errors shown, then rebuild
npm run build
```

### Calendly embed not loading
- Check CSP headers in `next.config.ts` — Calendly domains must be whitelisted
- Verify `calendlyUrl` in `lib/site-config.ts` is correct
- Check browser console for CSP violations

### Site doesn't show latest changes after deploy
- Clear Vercel cache: Project Settings > Caches > Clear Cache
- Wait ~5 minutes for CDN to invalidate
- Do a hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### Domain not resolving to site
- DNS propagation takes up to 24 hours
- Check DNS settings at your registrar match Vercel's instructions
- Use https://dnschecker.org to verify propagation

## Pre-Launch Checklist

Before going public, complete the **LAUNCH_CHECKLIST.md** in the root directory. It covers:
- Vercel setup and domain configuration
- Content updates (case studies, blog posts)
- OG image and favicon
- Calendly integration and testing
- SEO configuration
- Security and performance checks

## License

All content and design © Anuj Jain. Code is MIT licensed.

## Questions?

- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
- Tailwind docs: https://tailwindcss.com/docs
- Calendly help: https://help.calendly.com
