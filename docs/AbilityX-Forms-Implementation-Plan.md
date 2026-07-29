# AbilityX On-Site Forms — Implementation Plan
### (Partner Inquiry, Waitlist, Exhibit Interest — no database, no CMS)

**What this replaces:** the Google Form links/embeds on the three homepage CTA cards, with real on-site forms matching the site's design. On submit, each form (1) emails you, and (2) appends a row to a Google Sheet — no data stored in your own app at all, fully stateless, deploys as-is on Cloudflare Workers.

**Services needed:** Resend (email) and Google Sheets API (via a service account, not OAuth login). Both have free tiers sufficient for this volume.

---

## Part 1 — One-time setup

### 1.1 Google Sheets — service account

A service account is a machine identity Google issues for server-to-server API access — no user login flow, no OAuth consent screen for visitors.

1. Go to [console.cloud.google.com](https://console.cloud.google.com), create a new project (or reuse one) — e.g., `abilityx-forms`.
2. **APIs & Services → Library** → search "Google Sheets API" → **Enable**.
3. **IAM & Admin → Service Accounts → Create Service Account** — name it e.g. `abilityx-forms-writer`. No special roles needed at the project level.
4. Open the new service account → **Keys → Add Key → Create new key → JSON**. Download it — this file has two fields you'll need: `client_email` and `private_key`.
5. **Create the actual Google Sheet** (in your normal Google account, not the service account) with three tabs, each with a header row:
   - `Partner Inquiries` — columns: `Timestamp | Name | Organization | Email | Message`
   - `Waitlist` — columns: `Timestamp | Name | Email`
   - `Exhibit Interest` — columns: `Timestamp | Name | Organization | Email | Innovation Description`
6. Click **Share** on the sheet → paste the service account's `client_email` (looks like `abilityx-forms-writer@abilityx-forms.iam.gserviceaccount.com`) → give it **Editor** access.
7. Copy the **Sheet ID** from the URL: `docs.google.com/spreadsheets/d/THIS_PART_IS_THE_ID/edit`.

### 1.2 Resend — transactional email

1. Sign up at [resend.com](https://resend.com) — free tier covers this volume easily.
2. **Domains → Add Domain** → add `ability-x.org` → Resend gives you DNS records (SPF/DKIM) to add. Since Cloudflare already manages this domain's DNS, add them there directly.
3. Once verified, generate an **API key** (Settings → API Keys).

### 1.3 Environment variables

Add these both locally (`.env.local`, gitignored) and in the Cloudflare Workers dashboard (Settings → Environment Variables):

```bash
GOOGLE_CLIENT_EMAIL=abilityx-forms-writer@abilityx-forms.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQ...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_sheet_id_here

RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=your-inbox@ability-x.org
```

**Important:** `GOOGLE_PRIVATE_KEY` needs its newlines preserved. When pasting into Cloudflare's dashboard, keep it as one string with literal `\n` sequences (not actual line breaks) — the code below converts them back at runtime.

---

## Part 2 — Shared library code

### 2.1 Install `jose` (JWT signing — Web Crypto based, works on Cloudflare Workers, unlike the heavier `googleapis` SDK)

```bash
npm install jose
```

### 2.2 Google Sheets client

```typescript
// lib/googleSheets.ts
import { SignJWT, importPKCS8 } from 'jose'

async function getGoogleAccessToken(): Promise<string> {
  const privateKey = await importPKCS8(
    process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    'RS256'
  )

  const jwt = await new SignJWT({ scope: 'https://www.googleapis.com/auth/spreadsheets' })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuer(process.env.GOOGLE_CLIENT_EMAIL!)
    .setSubject(process.env.GOOGLE_CLIENT_EMAIL!)
    .setAudience('https://oauth2.googleapis.com/token')
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(privateKey)

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  if (!res.ok) throw new Error('Failed to get Google access token')
  const data = await res.json()
  return data.access_token
}

export async function appendToSheet(range: string, row: (string | number)[]) {
  const accessToken = await getGoogleAccessToken()
  const sheetId = process.env.GOOGLE_SHEET_ID!

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [row] }),
    }
  )

  if (!res.ok) throw new Error(`Sheets append failed: ${await res.text()}`)
}
```

### 2.3 Email client

```typescript
// lib/email.ts
export async function sendAdminNotification(subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'AbilityX Website <notifications@ability-x.org>',
      to: process.env.ADMIN_EMAIL,
      subject,
      html,
    }),
  })

  if (!res.ok) throw new Error(`Resend send failed: ${await res.text()}`)
}
```

---

## Part 3 — API route (handles all three forms)

```typescript
// app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { appendToSheet } from '@/lib/googleSheets'
import { sendAdminNotification } from '@/lib/email'

type FormType = 'partner' | 'waitlist' | 'exhibit'

const SHEET_RANGES: Record<FormType, string> = {
  partner: 'Partner Inquiries!A:E',
  waitlist: 'Waitlist!A:C',
  exhibit: 'Exhibit Interest!A:E',
}

const SUBJECT_LABELS: Record<FormType, string> = {
  partner: 'New Partner Inquiry',
  waitlist: 'New Waitlist Signup',
  exhibit: 'New Exhibit Interest',
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { formType, ...fields } = body as { formType: FormType; [key: string]: string }

  if (!formType || !SHEET_RANGES[formType] || !fields.name || !fields.email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const timestamp = new Date().toISOString()

  // Build the row per form type — adjust columns to match Part 1.1's sheet tabs
  const row =
    formType === 'waitlist'
      ? [timestamp, fields.name, fields.email]
      : [timestamp, fields.name, fields.organization ?? '', fields.email, fields.message ?? fields.description ?? '']

  try {
    await appendToSheet(SHEET_RANGES[formType], row)

    await sendAdminNotification(
      `${SUBJECT_LABELS[formType]} — AbilityX 2.0`,
      `
        <h2>${SUBJECT_LABELS[formType]}</h2>
        <p><strong>Name:</strong> ${fields.name}</p>
        ${fields.organization ? `<p><strong>Organization:</strong> ${fields.organization}</p>` : ''}
        <p><strong>Email:</strong> ${fields.email}</p>
        ${fields.message || fields.description ? `<p><strong>Message:</strong> ${fields.message ?? fields.description}</p>` : ''}
      `
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Form submission failed:', err)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
```

---

## Part 4 — Form component (client-side, matches existing Tailwind design)

```tsx
// components/InquiryForm.tsx
'use client'

import { useState, type FormEvent } from 'react'

type FormType = 'partner' | 'waitlist' | 'exhibit'

interface Field {
  name: string
  label: string
  type: 'text' | 'email' | 'textarea'
  required?: boolean
}

const FIELD_CONFIG: Record<FormType, Field[]> = {
  partner: [
    { name: 'name', label: 'Full name', type: 'text', required: true },
    { name: 'organization', label: 'Organization', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'message', label: 'How would you like to partner?', type: 'textarea' },
  ],
  waitlist: [
    { name: 'name', label: 'Full name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
  ],
  exhibit: [
    { name: 'name', label: 'Full name', type: 'text', required: true },
    { name: 'organization', label: 'Organization', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'description', label: 'Describe your innovation', type: 'textarea', required: true },
  ],
}

export function InquiryForm({ formType }: { formType: FormType }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const fields = FIELD_CONFIG[formType]

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType, ...payload }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-brand-red font-semibold">
        Thanks — we've received your submission and will be in touch soon.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label htmlFor={field.name} className="text-sm font-medium">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              rows={4}
              className="rounded-md border border-gray-300 p-2"
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              className="rounded-md border border-gray-300 p-2"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-full bg-brand-red text-white px-6 py-2 font-semibold disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Submit'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong — please try again.</p>
      )}
    </form>
  )
}
```

Adjust class names to match whatever Tailwind tokens Claude Design actually set up (`brand-red`, radius, etc.) — this is illustrative of structure, not final styling.

---

## Part 5 — Wiring into the existing CTA cards

Replace the current Google Form link/embed in each CTA card with `<InquiryForm formType="partner" />` (or `waitlist` / `exhibit`), inside whatever card/modal component currently holds them. If the cards use a flip-to-form pattern, the form component's own `status === 'success'` branch already handles the success-state swap — no separate local boolean needed.

---

## Testing before deploy

1. **Local test of the Sheets connection**, isolated from the UI — run a small script or hit the API route directly with `curl`/Postman, confirm a row actually appears in the correct tab.
2. **Local test of Resend** — same approach, confirm the email arrives.
3. **Full loop locally** — run the Next.js dev server, submit each of the three forms through the actual UI, confirm both the sheet row and email appear correctly, with the right fields in the right columns.
4. **Deploy to Cloudflare**, confirm environment variables are set there too (a common miss — env vars set locally don't automatically carry over to the Workers dashboard), and repeat the full-loop test against the live site before considering this done.

---

## Summary of what each service is doing

| Concern | Handled by |
|---|---|
| Form UI | Next.js client component, Tailwind |
| Submission handling | One Next.js API route (`/api/submit-form`) |
| Record-keeping | Google Sheet (3 tabs), via service account — no database |
| Notification | Resend, one email per submission |
| Hosting | Cloudflare Workers — no VPS, no persistent server |
