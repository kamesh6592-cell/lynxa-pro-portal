// app/api/webhooks/clerk/route.js
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.text(); // Raw body for verification
    const evt = await verifyWebhook({
      body,
      signature: headers().get('svix-signature'),
    });
    console.log('Webhook received:', evt.type, evt.data); // Log for debugging
    // Process event (e.g., sync to DB)
    // Example: if (evt.type === 'user.created') { /* create user in DB */ }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Webhook verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
