export const prerender = false;

export async function post({ request }) {
  try {
    const CONVERTKIT_API_KEY = 'NdRDyf2k9oFD8ccxZGVDgQ';
    const CONVERTKIT_FORM_ID = '7565334';

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const ckResponse = await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: CONVERTKIT_API_KEY, email })
    });

    const ckData = await ckResponse.json();
    console.log('ConvertKit response:', ckData);

    if (!ckResponse.ok) {
      return new Response(JSON.stringify({
        error: ckData.message || 'Failed to subscribe',
        details: ckData
      }), {
        status: ckResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, data: ckData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
