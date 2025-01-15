import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and anon key
const supabaseUrl = 'https://bmqaaynxrncmczdtmhiy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcWFheW54cm5jbWN6ZHRtaGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3OTMzODgsImV4cCI6MjA1MTM2OTM4OH0.esgNwWgHvQ9GVgkjD7u1uOWWbyqaPFMz9UqLk_frqHE';

// Create a Supabase client with the anon key for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a service role client for admin operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey, // Fallback to anon key if service key not available
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
