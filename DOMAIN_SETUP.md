# Domain Setup Guide — Benchmark Engineering Website

## Current Hosting

The site is hosted on **GitHub Pages** at:
`https://warithsaid23-ops.github.io/benchmark-engineering/`

---

## Connecting a Custom Domain

### Step 1 — Buy a domain
Recommended registrars: Namecheap, Cloudflare Registrar, Google Domains.
Suggested domain: `benchmarkengineering.co.tz` or `benchmarkengineering-tz.com`

### Step 2 — Add a CNAME file to this repo
Create a file named `CNAME` in the root of this repo with a single line:
```
yourdomain.com
```
(No `https://`, no trailing slash.)

### Step 3 — Configure DNS at your registrar
Add these DNS records:

| Type  | Host | Value                              |
|-------|------|------------------------------------|
| A     | @    | 185.199.108.153                    |
| A     | @    | 185.199.109.153                    |
| A     | @    | 185.199.110.153                    |
| A     | @    | 185.199.111.153                    |
| CNAME | www  | warithsaid23-ops.github.io         |

### Step 4 — Enable HTTPS in GitHub Pages settings
1. Go to repo Settings → Pages
2. Under "Custom domain", enter your domain and save
3. Tick "Enforce HTTPS" once DNS propagates (allow 24–48 hours)

### Step 5 — Update sitemap.xml and canonical tags
Once live on the custom domain, do a find-and-replace:
- Find: `https://warithsaid23-ops.github.io/benchmark-engineering`
- Replace: `https://yourdomain.com`

Files to update: `sitemap.xml` and the `<link rel="canonical">` tag in every HTML page.

---

## Formspree Contact Form
The contact form uses Formspree endpoint `https://formspree.io/f/xpwzgkjd`.
This is a placeholder. To activate:
1. Sign up at formspree.io
2. Create a new form
3. Replace the endpoint URL in `contact.html` with your real endpoint

---

## Notes
- `robots.txt` references the GitHub Pages sitemap URL — update after domain switch
- `staff-portal.html` is not linked from any page and has `noindex` meta — it is effectively hidden
