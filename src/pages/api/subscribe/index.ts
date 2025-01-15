import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

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

    const { data: insertData, error } = await supabase
      .from('subscribers')
      .insert([{ email }])
      .select()
      .single();

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
