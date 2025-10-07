// app/api/webhooks/clerk/route.js
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.text(); // Get raw body for verification
    const evt = await verifyWebhook({ body, signature: req.headers.get('svix-signature') });
    console.log('Webhook received:', evt.type, evt.data);
    // Process event (e.g., sync to database)
    return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
  } catch (err) {
    console.error('Webhook verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
