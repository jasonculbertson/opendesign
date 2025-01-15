import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';

export const prerender = false;

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Submitting to Supabase:', { email });

    const { data, error } = await supabaseAdmin
      .from('subscribers')
      .insert([{ email, subscribed_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      
      // If the error is about the table not existing, we'll return a specific message
      if (error.message?.includes('does not exist')) {
        return new Response(
          JSON.stringify({ 
            error: 'Database table not set up. Please create the subscribers table.' 
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      // If it's a unique constraint violation, the email already exists
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ 
            error: 'This email is already subscribed.' 
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      return new Response(
        JSON.stringify({ 
          error: error.message || 'Failed to subscribe' 
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
