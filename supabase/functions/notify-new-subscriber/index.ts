// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const DISCORD_WEBHOOK_URL = Deno.env.get('DISCORD_WEBHOOK_URL')

serve(async (req) => {
  try {
    const payload = await req.json()
    const { record } = payload

    if (!DISCORD_WEBHOOK_URL) {
      throw new Error('Missing DISCORD_WEBHOOK_URL environment variable')
    }

    // Send notification to Discord
    const message = {
      content: `🎉 New subscriber: ${record.email}`,
      embeds: [{
        title: 'New Email Subscription',
        fields: [
          {
            name: 'Email',
            value: record.email,
          },
          {
            name: 'Subscribed At',
            value: new Date(record.subscribed_at).toLocaleString(),
          }
        ],
        color: 5814783, // Green color
      }]
    }

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    if (!response.ok) {
      throw new Error(`Failed to send Discord notification: ${response.statusText}`)
    }

    return new Response(
      JSON.stringify({ message: 'Notification sent successfully' }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
})
