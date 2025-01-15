import type { APIContext, APIRoute } from 'astro';

export const prerender = false;

export async function POST({ request }: APIContext) {
  try {
    const body = await request.json();
    console.log('Received request:', body);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Test endpoint working',
      received: body
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return new Response(JSON.stringify({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
