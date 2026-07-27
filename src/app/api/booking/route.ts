import { NextResponse } from 'next/server';
import { z } from 'zod';
import { site } from '@content/site';

/**
 * ============================================================================
 *  BOOKING & CONTACT FORM HANDLER
 * ============================================================================
 *
 *  Validates the submission and emails it to you. There is no database: the
 *  enquiry lands in your inbox and the conversation continues on WhatsApp,
 *  which is how these bookings actually close.
 *
 *  ── To switch email on ──────────────────────────────────────────────────
 *  1. Create a free account at https://resend.com
 *  2. Verify your domain, then create an API key
 *  3. Add these to your hosting environment variables:
 *       RESEND_API_KEY=re_xxxxxxxx
 *       BOOKING_EMAIL_TO=you@yourdomain.com      (optional, defaults to
 *                                                 the address in site.ts)
 *       BOOKING_EMAIL_FROM=bookings@yourdomain.com
 *
 *  Until then the form still works: submissions are logged on the server and
 *  the visitor is shown the WhatsApp fallback, so no enquiry is ever lost.
 */

const schema = z.object({
  vehicle: z.string().max(120).optional(),
  startDate: z.string().max(20).optional(),
  endDate: z.string().max(20).optional(),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(30).optional().or(z.literal('')),
  email: z.string().trim().email().max(160).optional().or(z.literal('')),
  deliveryPlace: z.string().trim().max(200).optional(),
  message: z.string().trim().max(2000).optional(),
  days: z.number().int().positive().max(400).optional(),
  total: z.number().nonnegative().max(1_000_000).optional(),
  locale: z.string().max(5).optional(),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional(),
});

/**
 * Simple in-memory rate limit: enough to stop casual form spam without adding
 * a database. It resets when the server restarts, which is fine for this
 * volume of traffic.
 */
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }

  const data = parsed.data;

  // A filled honeypot means a bot. Return success so it does not retry.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const lines = [
    `Nom / Name:      ${data.name}`,
    `Téléphone:       ${data.phone || '—'}`,
    `Email:           ${data.email || '—'}`,
    `Véhicule:        ${data.vehicle || '—'}`,
    `Du / From:       ${data.startDate || '—'}`,
    `Au / To:         ${data.endDate || '—'}`,
    `Durée:           ${data.days ? `${data.days} j` : '—'}`,
    `Total estimé:    ${data.total ? `${data.total} DT` : '—'}`,
    `Livraison:       ${data.deliveryPlace || '—'}`,
    `Langue:          ${data.locale || '—'}`,
    '',
    'Message:',
    data.message || '—',
  ].join('\n');

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // No email configured yet — make sure the enquiry is at least recorded.
    console.info('[booking] New enquiry (email not configured yet):\n' + lines);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.BOOKING_EMAIL_FROM ?? 'onboarding@resend.dev',
        to: [process.env.BOOKING_EMAIL_TO ?? site.contact.email],
        // Replying in your mail client goes straight back to the customer.
        ...(data.email ? { reply_to: data.email } : {}),
        subject: `Nouvelle demande — ${data.name}${data.vehicle ? ` — ${data.vehicle}` : ''}`,
        text: lines,
      }),
    });

    if (!response.ok) {
      console.error('[booking] Resend error', await response.text());
      console.info('[booking] Enquiry that failed to send:\n' + lines);
      return NextResponse.json({ error: 'Email failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error('[booking] Unexpected error', error);
    console.info('[booking] Enquiry that failed to send:\n' + lines);
    return NextResponse.json({ error: 'Email failed' }, { status: 502 });
  }
}
