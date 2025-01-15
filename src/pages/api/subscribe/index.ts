import type { APIRoute } from 'astro';

const CONVERTKIT_API_KEY = 'NdRDyf2k9oFD8ccxZGVDgQ';
const CONVERTKIT_FORM_ID = 'e1d5424765';

export const post: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email } = data;
    console.log('[API] Received email submission:', email);

    if (!email) {
      console.error('[API] No email provided');
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const CONVERTKIT_URL = `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`;
    
    console.log('[API] Sending to ConvertKit:', { url: CONVERTKIT_URL, email });

    const response = await fetch(CONVERTKIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email
      })
    });

    console.log('[API] ConvertKit status:', response.status, response.statusText);
    
    let responseData;
    try {
      responseData = await response.json();
      console.log('[API] ConvertKit response:', responseData);
    } catch (e) {
      console.error('[API] Failed to parse ConvertKit response:', e);
      const text = await response.text();
      console.log('[API] Raw response:', text);
      throw new Error('Invalid response from ConvertKit');
    }

    if (!response.ok) {
      console.error('[API] ConvertKit error:', responseData);
      
      // Check if the error is due to already subscribed email
      if (responseData.error?.includes('is already subscribed')) {
        return new Response(JSON.stringify({
          error: 'You\'re already subscribed! You can manage your subscription preferences through the links in our emails, or contact support if you need help.',
          code: 'ALREADY_SUBSCRIBED',
          details: responseData
        }), {
          status: 409,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      
      return new Response(JSON.stringify({
        error: responseData.message || 'Failed to subscribe to newsletter',
        details: responseData
      }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    console.log('[API] Successfully subscribed to ConvertKit');
    return new Response(JSON.stringify({
      success: true,
      data: responseData
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('[API] Error in subscribe endpoint:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Failed to subscribe to newsletter'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
