import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { email, marketingOptIn } = body;

    console.log('API received request:', { email, marketingOptIn });

    if (!email) {
      console.log('No email provided');
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Submitting to Supabase:', { email, marketingOptIn });

    try {
      const { data, error } = await supabaseAdmin
        .from('subscribers')
        .insert([{ 
          email, 
          subscribed_at: new Date().toISOString(),
          marketing_opt_in: marketingOptIn || false
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        
        if (error.message?.includes('does not exist')) {
          return new Response(
            JSON.stringify({ 
              success: false,
              error: 'Database table not set up. Please create the subscribers table.' 
            }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        if (error.code === '23505') {
          return new Response(
            JSON.stringify({ 
              success: false,
              error: 'This email is already subscribed.' 
            }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        if (error.code === '42501') {
          return new Response(
            JSON.stringify({ 
              success: false,
              error: 'Permission denied. Please check Supabase configuration.' 
            }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        return new Response(
          JSON.stringify({ 
            success: false,
            error: error.message || 'Failed to subscribe',
            code: error.code 
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      console.log('Successfully added to Supabase:', data);

      return new Response(
        JSON.stringify({ 
          success: true,
          message: 'Successfully subscribed',
          data 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Database operation failed',
          details: dbError instanceof Error ? dbError.message : 'Unknown error'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
