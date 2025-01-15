import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';

export const prerender = false;

export async function POST({ request }) {
  try {
    // Log the incoming request
    console.log('[API] Request received:', {
      method: request.method,
      headers: Object.fromEntries(request.headers.entries())
    });

    let body;
    try {
      body = await request.json();
      console.log('[API] Request body:', body);
    } catch (e) {
      console.error('[API] Failed to parse request body:', e);
      return new Response(JSON.stringify({
        error: 'Invalid request body',
        details: e instanceof Error ? e.message : 'Unknown error'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const { email } = body;
    console.log('[API] Processing email:', email);

    if (!email) {
      console.error('[API] No email provided');
      return new Response(JSON.stringify({ 
        error: 'Email is required',
        received: body 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    console.log('[API] Attempting Supabase insert for email:', email);
    
    try {
      const { data: insertData, error } = await supabaseAdmin
        .from('subscribers')
        .insert([{ 
          email, 
          subscribed_at: new Date().toISOString() 
        }])
        .select()
        .single();

      console.log('[API] Supabase response:', { data: insertData, error });

      if (error) {
        console.error('[API] Supabase error:', error);
        
        // Check if the error is due to unique constraint violation (email already exists)
        if (error.code === '23505') {
          return new Response(JSON.stringify({
            error: 'You\'re already subscribed! You can manage your subscription preferences through the links in our emails, or contact support if you need help.',
            code: 'ALREADY_SUBSCRIBED'
          }), {
            status: 409,
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }

        return new Response(JSON.stringify({
          error: 'Failed to subscribe to newsletter',
          details: error
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      console.log('[API] Successfully subscribed to newsletter');
      return new Response(JSON.stringify({
        success: true,
        data: insertData
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (dbError) {
      console.error('[API] Database operation error:', dbError);
      return new Response(JSON.stringify({
        error: 'Database operation failed',
        details: dbError instanceof Error ? dbError.message : 'Unknown database error'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    // Log the full error object for debugging
    console.error('[API] Unhandled error in subscribe endpoint:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return new Response(JSON.stringify({
      error: 'An unexpected error occurred',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
