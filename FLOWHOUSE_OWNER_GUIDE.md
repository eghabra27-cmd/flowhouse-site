# flowhouse — Your Complete Owner's Guide

### Everything you need to run, edit, and grow flowhouserb.com on your own

Welcome, Sam. This is your studio's website — and from here on, it's yours to run. This guide is written so you never have to ask anyone how anything works. No coding required. Take it section by section, and keep it bookmarked.

Your live site: **https://flowhouserb.com**

---

## Table of Contents

1. [The two ways to work on your site](#1-the-two-ways-to-work-on-your-site)
2. [How your website actually works (the simple version)](#2-how-your-website-actually-works)
3. [Way A — Editing through Perplexity (easiest)](#3-way-a--editing-through-perplexity)
4. [Way B — Editing through your website's editor (/admin)](#4-way-b--editing-through-your-websites-editor-admin)
5. [Every page on your site, and what's on it](#5-every-page-on-your-site)
6. [Your photos & images](#6-your-photos--images)
7. [The email sign-up list (Founding Circle)](#7-the-email-sign-up-list-founding-circle)
8. [Mariana Tek — class booking, memberships & accounts](#8-mariana-tek)
9. [Going live with merch (the shop)](#9-going-live-with-merch)
10. [Going live with memberships & pricing](#10-going-live-with-memberships--pricing)
11. [Legal pages](#11-legal-pages)
12. [Common things you'll want to do (quick recipes)](#12-common-things-youll-want-to-do)
13. [If something breaks or looks wrong](#13-if-something-breaks)
14. [Your logins (write them here)](#14-your-logins)
15. [Logins & accounts checklist](#15-logins--accounts-checklist)
16. [Words you might see (glossary)](#16-glossary)

---

## 1. The two ways to work on your site

You have **two completely separate ways** to change your website. You can use either one, anytime. Pick whichever feels comfortable.

**Way A — Just ask Perplexity (recommended for you).**
Log into Perplexity Computer, open the **flowhouse Space**, and type what you want in plain English — like *"change the homepage headline to ___"* or *"add a new class called Sculpt."* It makes the change for you. No buttons, no code. This is the easiest path and the one I'd start with.

**Way B — Use your website's built-in editor.**
Your site has its own simple editor (like a friendly form-based dashboard) at **https://flowhouserb.com/admin**. You log in, click the section you want, type your changes, and hit **Publish**. The site updates itself in about a minute. Good for quick text/photo swaps when you don't want to open Perplexity.

> Both ways change the **same** website. You can never "use the wrong one." Use whatever you're in the mood for.

---

## 2. How your website actually works

You don't need to understand this deeply, but a one-minute mental model makes everything else click:

- Your website's **words and photos** are stored separately from its **design**. That means you can change the text on any page without ever touching how it looks. The design stays beautiful and consistent automatically.
- When you change something (either Way A or Way B), the site **rebuilds itself and goes live on its own**, usually within **1–2 minutes**. You don't "upload" anything or press a launch button.
- Your site lives on a service called **Netlify** (the host) and the files live on **GitHub** (secure storage). You rarely need to log into either — they just run in the background.

**The flow, start to finish:**
> You make a change → it saves automatically → the site rebuilds → flowhouserb.com updates in ~1–2 minutes. Refresh the page to see it.

---

## 3. Way A — Editing through Perplexity

This is the simplest way to do *anything*, including things the built-in editor can't do (like adding a brand-new page or changing the design).

**To start:**
1. Go to Perplexity Computer and log in.
2. Open the **flowhouse Space** (it's already set up with everything about your studio and site).
3. Type what you want in everyday language and send it.

**Examples you can copy:**
- "Change the homepage headline to *Find your flow.*"
- "Update the studio hours / opening date on every page to ___."
- "Add a new class to the homepage called *Sculpt* — 40 minutes, all levels, and write a warm description."
- "Swap the merch hero photo for the new one I'm attaching." (then attach the photo)
- "Write an Instagram-style announcement for our opening and add it to the homepage."
- "The FAQ is missing a question about parking — add one."
- "Make the founder story on the About page a little warmer and shorter."
- "Add our real studio address back to the Studio page now that we've announced it."

**Tips for great results:**
- Be specific. Instead of "fix the homepage," say "make the homepage headline bigger and change it to ___."
- Attach photos directly in the chat when you want to add or replace an image.
- You can always say "show me what it looks like first" before it goes live, or "undo that."
- If you're not sure how to phrase something, just describe the goal: "I want people to sign up for classes more easily." It'll suggest options.

> **This is your safety net.** If Way B (the editor) ever confuses you, just open Perplexity and ask. It can do everything the editor does, plus much more.

---

## 4. Way B — Editing through your website's editor (/admin)

Your site has a friendly, form-based editor built in. No code — just fields you type into.

**To log in:**
1. Go to **https://flowhouserb.com/admin**
2. Click **Login with GitHub** and sign in with the GitHub account connected to the site.
3. You'll see a clean dashboard with one item per page (Home page, Studio page, About page, etc.).

**To make a change:**
1. Click the page you want (e.g. **Home page**).
2. Click the section (e.g. **Hero section**).
3. Edit the text in the fields, or click an image field to upload a new photo.
4. Click **Publish** (top of the screen).
5. Wait ~1–2 minutes, then refresh flowhouserb.com to see it live.

**What you can edit here:** all the words and photos on every main page — Home, Studio, About/Meet Sam, Method, What to Expect, Schedule, Memberships, Merch, Teach, Franchising, plus site-wide things (footer text, Instagram link, email, the bar at the bottom of every page).

**A few field notes:**
- Fields labeled "HTML allowed for italics" let you make one word slanted/elegant. To italicize a word, wrap it like this: `<em>word</em>`. If that feels fiddly, just type normally — or use Way A and ask Perplexity to do it.
- "Alt text" fields describe a photo for accessibility and Google. Write a short, plain description of what's in the image.
- Lists (like classes, FAQ, values) have an **Add** button to add another item and a drag handle to reorder them.

> If you ever get stuck in the editor, you can't break anything permanently. Close the tab and ask Perplexity instead.

---

## 5. Every page on your site

Here's every page, what it's for, and what you can change. (You can edit all of these in the `/admin` editor or via Perplexity.)

| Page | Web address | What it's for |
|---|---|---|
| **Home** | flowhouserb.com | First impression — hero photo of you, the modalities, FlowFormer feature, founder teaser, "things to know," Founding Circle sign-up. |
| **Meet Sam (About)** | /about.html | Your founder story, values, and a sign-up. The personal heart of the site. |
| **Studio** | /studio.html | The space, what's inside, atmosphere. The exact address is intentionally hidden until launch (it shows "Coastal Highway · Rehoboth Beach"). |
| **Method (FlowFormer)** | /flowformer.html | Explains the FlowFormer and positions flowhouse as its own movement method, not just another pilates studio. |
| **What to Expect** | /what-to-expect.html | First-timer friendly — the class flow, after-class community, "start here," and the FAQ. |
| **Schedule** | /schedule.html | The live class booking (powered by Mariana Tek — see Section 8). |
| **Memberships (teaser)** | /memberships.html | Pre-launch teaser + sign-up. Real prices stay hidden until you're ready. |
| **Membership (buy)** | /membership.html | The page where people will actually buy memberships, packs, and intro offers (Mariana Tek). |
| **My Account** | /account.html | Where members sign in to manage bookings and billing (Mariana Tek). |
| **Merch** | /merch.html | "flowhouse — the line." Striped-bag hero + a tasteful blurred "coming soon" teaser. |
| **Teach** | /teach.html | Instructor recruiting + an application form that emails you. |
| **Franchising** | /franchising.html | "Coming soon" — future-facing page with a register-interest form. |
| **Thank you** | /thank-you.html | The little "you're on the list" page people see after signing up. |
| **Legal pages** | /privacy.html, /terms.html, /sms-terms.html, /policies.html, /marketing-consent.html | Privacy, terms, SMS rules, studio policies (see Section 11). |

---

## 6. Your photos & images

**The easiest way to change a photo:** open Perplexity, attach the new photo, and say which one to replace (e.g. "Replace the merch hero photo with this"). It will optimize it and put it in the right place.

**Through the editor (/admin):** any field labeled "image" has an upload button. Click it, pick your photo, Publish.

**Good-photo tips for a luxury feel:**
- Use bright, natural light. Warm tones (sand, walnut, cream) match the brand.
- Vertical/portrait photos work best for the hero image slots; wide photos work for the studio and feature sections.
- High resolution is fine — the site automatically shrinks images so pages stay fast.
- Always add a short description (alt text) of what's in the photo.

> Your hero photo (you holding the weights) was professionally color-graded to feel like a campaign. If you want a different photo treated the same way, just send it to Perplexity and ask for "the same editorial grade as the hero."

---

## 7. The email sign-up list (Founding Circle)

Every sign-up form on the site (Founding Circle, plus the franchise and instructor forms) collects **Name, Email, and Phone**, with a consent checkbox.

**Where the sign-ups go:** they're stored in **Netlify** (your host) and can be emailed to you.

Every form on the site (Founding Circle, franchise inquiries, and instructor applications) is set up to email you the moment it's filled out, so you can keep track of every lead. There are **two delivery methods** working together (belt-and-suspenders), both sending to **info@flowhouserb.com**:

**Method 1 — Netlify built-in email (simplest, one-time setup):**
1. Log into **netlify.com** with the account connected to the site.
2. Open the flowhouse site → **Forms** → **Form notifications**.
3. Click **Add notification → Email notification**.
4. Enter **info@flowhouserb.com** and save. (You can add it once per form: `founding-circle`, `franchise-interest`, `instructor-application`.)
5. Done — you'll get an email every time someone submits.

**Method 2 — Branded emails via Resend (already built, needs one key):**
A behind-the-scenes function emails you a nicely formatted summary of each submission, with **reply-to set to the person who filled it out** (so you can reply straight to the lead). To switch it on:
1. In Netlify → your site → **Site settings → Environment variables → Add a variable**.
2. Add **`RESEND_API_KEY`** = your Resend API key (from resend.com → API Keys; it starts with `re_`).
3. Save and trigger a redeploy (Netlify → Deploys → Trigger deploy). That's it.
4. *Optional polish:* once you've verified flowhouserb.com in Resend, also add **`NOTIFY_FROM`** = `flowhouse <hello@flowhouserb.com>` so emails come "from" your own domain. Until then they arrive from a Resend address — still delivered to your inbox.

**Either method alone is enough** — Method 1 is the quickest. With both on, you simply get the notification twice. If you'd rather keep it simple, just do Method 1 and ignore Method 2.

> No matter what, every submission is **also** stored in Netlify (Forms tab) as a backup, even if email isn't set up yet.

**To see/download all sign-ups anytime:** Netlify → your site → **Forms** → click a form → you can view every submission and **export them to a spreadsheet (CSV)**.

**Later:** when you're set up in Mariana Tek, you can import that spreadsheet of names/emails/phones into your Mariana Tek contacts so your Founding Circle becomes your first members. (Perplexity can walk you through this when you're ready.)

---

## 8. Mariana Tek

Three pages are built to plug directly into your Mariana Tek account: **Schedule** (book classes), **Membership** (buy memberships/packs/intro offers), and **My Account** (members manage their stuff).

Right now those pages show a gentle "Loading the live schedule…" message. They'll start working the moment Mariana Tek's **Web Integrations** are turned on for your account.

**Right now (pre-launch):** the website embed is built correctly and connected to your `flowhouse` Mariana Tek account. Until you publish a live class schedule in Mariana Tek, these pages show a tasteful "Booking opens soon — Join the Founding Circle" message (never a broken/empty box). The moment your schedule goes live in Mariana Tek, the real booking widget appears automatically — no website change needed.

**To turn live booking on (do this in Mariana Tek, not the website):**
1. Log into your **Mariana Tek admin**.
2. **Add your classes to the schedule** and **publish** them (booking can't show until there are real classes to book).
3. Find **Web Integrations** (often under Settings or Marketing — your Mariana Tek onboarding rep can point you to it) and make sure it's **enabled** and your **booking site is published**. Confirm your booking site loads at `flowhouse.marianatek.com`. (If that link gives a "not found" error, the tenant isn't published yet — that's the thing to fix with your MT rep.)
4. That's it — the Schedule, Membership, and Account pages on flowhouserb.com will fill in with the live widget automatically.

**How to test it's working:** open `flowhouserb.com/schedule.html` in your browser. If you see real classes you can click to book, you're live. If you still see "Booking opens soon," your Mariana Tek schedule isn't published yet — finish steps 2–3 above.

If anything looks off, ask Perplexity: "The Mariana Tek schedule isn't showing on flowhouserb.com — help me check it." Your Mariana Tek support rep can also confirm the integration is active.

---

## 9. Going live with merch (the shop)

Right now the Merch page is a beautiful "coming soon" teaser with blurred products — intentional, to build anticipation.

**When you're ready to actually sell:**
- The simplest path is to ask Perplexity: "I'm ready to launch merch — here are my products, photos, and prices," and it'll set up the shop section and connect your store links.
- The site is already wired to support a Squarespace store: once you create a product in your store and copy its link, that product can switch from "Coming Soon" to a real "Add to Cart" button.

No rush — the teaser looks great on its own until you're ready.

---

## 10. Going live with memberships & pricing

Your real membership prices are **intentionally hidden** until launch (they're saved safely in the site's notes for when you're ready). The Memberships page is a teaser that drives sign-ups.

**When you want to publish pricing:**
- Easiest: tell Perplexity your final prices and say "publish the membership pricing," and it'll build the pricing section.
- Or you'll sell memberships directly through the **Membership page** once Mariana Tek is connected (Section 8).

---

## 11. Legal pages

Your site includes professionally written **Privacy Policy, Terms of Service, SMS Terms, Studio Policies** (membership, cancellation, booking, liability, and photo/video release), and a **Marketing Consent** explainer. They're linked in the footer of every page.

> **Important:** these are strong, complete templates — but before you open the doors, have a lawyer give them a quick review to make sure they fit your final policies, prices, and any Delaware specifics. You can edit any of their wording through Perplexity or the editor anytime.

The photo/video release matters for you specifically: it lets flowhouse use photos and videos of members in marketing, social media, ads, and the website. It's already written into your Studio Policies.

---

## 12. Common things you'll want to do (quick recipes)

**Change the opening date or a headline**
→ Ask Perplexity, or in /admin open the relevant page → edit the field → Publish.

**Add or edit a class**
→ /admin → Home page → Class menu section → use **Add** under "Classes," fill in name/description/tag → Publish. (Or ask Perplexity.)

**Add an FAQ**
→ /admin → What to Expect page → FAQ entries → **Add** → type question + answer → Publish.

**Replace a photo**
→ Easiest: send the photo to Perplexity and say where it goes. Or /admin → the page → click the image field → upload → Publish.

**Update your email, Instagram, or footer text (site-wide)**
→ /admin → **Site-wide** → edit → Publish. This changes it on every page at once.

**Reveal the studio address when you announce it**
→ Ask Perplexity: "Show our full studio address on the Studio page now." (It's hidden on purpose right now.)

**Announce the opening / a new offer**
→ Ask Perplexity to add an announcement section or update the bar at the bottom of every page.

**See who signed up**
→ Netlify → your site → Forms → export to spreadsheet (Section 7).

---

## 13. If something breaks or looks wrong

Don't panic — your site is very hard to truly break, and every change is reversible.

- **A change didn't show up?** Wait 2 minutes and refresh. Still nothing? Do a "hard refresh": hold **Shift** and click reload.
- **Something looks broken or off?** Open Perplexity and describe exactly what you see: "On the Studio page, the photo is stretched / the text is overlapping." It can diagnose and fix it.
- **You made a change you regret?** Ask Perplexity to "undo the last change" or "put back the previous version." Every version is saved.
- **The editor (/admin) won't load or log in?** Use Perplexity instead for now, and mention the login issue so it can help sort it out.

When in doubt, the answer is always: **open the flowhouse Space in Perplexity and describe the problem in plain words.**

---

## 14. Your logins (write them here)

Keep your important logins in one safe place. Fill these in by hand (in your printed copy), or ask Ethan to set them up with you. **Treat this page like a key to your studio — keep it private and safe.**

> Security tip: use a strong, unique password for each account, and turn on two-factor authentication (2FA) where it's offered. A free password manager (like the one built into your phone or browser) can store all of this for you securely.

### GitHub — needed to log into your website editor (/admin)

- **Website:** https://github.com/login
- **Username / email:** _______________________________________________
- **Password:** _______________________________________________
- **2FA / backup codes (if set up):** _______________________________________________
- *Note: this is also how you log into flowhouserb.com/admin — click "Login with GitHub."*

### Perplexity Computer — the easy editing path (the flowhouse Space)

- **Website:** https://perplexity.ai
- **Username / email:** _______________________________________________
- **Password:** _______________________________________________

### Netlify — your website host + where sign-ups are stored

- **Website:** https://app.netlify.com
- **Username / email:** _______________________________________________
- **Password:** _______________________________________________

### Mariana Tek — class booking, memberships & accounts

- **Login link:** _______________________________________________
- **Username / email:** _______________________________________________
- **Password:** _______________________________________________

### Studio email inbox — info@flowhouserb.com

- **Where you check it (Gmail, etc.):** _______________________________________________
- **Username / email:** _______________________________________________
- **Password:** _______________________________________________

### Other accounts (Squarespace, Instagram, domain, etc.)

- **Account:** ___________________  **Login:** ___________________  **Password:** ___________________
- **Account:** ___________________  **Login:** ___________________  **Password:** ___________________
- **Account:** ___________________  **Login:** ___________________  **Password:** ___________________

> If you ever forget a password, every one of these sites has a "Forgot password?" link that emails you a reset to **info@flowhouserb.com** — so keeping access to that inbox is the most important one of all.

---

## 15. Logins & accounts checklist

Make sure you have access to these (ask Ethan to transfer/share ownership where needed):

- [ ] **Perplexity Computer** — to use the flowhouse Space (the easy editing path).
- [ ] **GitHub** account `eghabra27-cmd` (or your own, added as a collaborator) — needed to log into the `/admin` editor.
- [ ] **Netlify** — the host; where form sign-ups live and where the site auto-deploys.
- [ ] **Mariana Tek** admin — booking, memberships, accounts.
- [ ] **Domain** (flowhouserb.com) and the **info@flowhouserb.com** inbox.
- [ ] **Squarespace** (only if/when you sell merch online).
- [ ] **Instagram** (@myflowhouse) — update the handle/link in Site-wide settings if it changes.

> Tip: ask Ethan to add you as a collaborator/owner on GitHub, Netlify, and Mariana Tek so everything is in your name. Perplexity can guide you through any of these if you get stuck.

---

## 16. Glossary

- **Hero** — the big headline + photo at the top of a page.
- **CMS / the editor (/admin)** — the form-based dashboard where you type changes without code.
- **Publish** — the button in the editor that makes your change go live.
- **Deploy / build** — the automatic process that updates the live site after a change (takes ~1–2 min).
- **Netlify** — the company that hosts (serves) your website and stores form sign-ups.
- **GitHub** — secure storage for the site's files; also your login for the editor.
- **Mariana Tek** — the booking/membership software your Schedule, Membership, and Account pages connect to.
- **Founding Circle** — your pre-launch email/SMS list of future founding members.
- **FlowFormer** — your custom-branded reformer and the name of your method.
- **Alt text** — a short written description of a photo (helps accessibility and Google).
- **OG image** — the preview photo that shows when your site is shared on social media or text.

---

## One last thing

This site was built to feel editorial, warm, and unmistakably flowhouse — and to grow with you, all the way to franchising. You don't need anyone's permission or help to run it. When you want to change something, you have two easy doors: **ask Perplexity in plain English**, or **use the /admin editor**. Both are yours.

You've got this, Sam. 🌿

*If you ever feel stuck, open the flowhouse Space in Perplexity and just describe what you want in your own words. That's always the answer.*
