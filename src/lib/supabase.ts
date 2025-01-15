import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://bmqaaynxrncmczdtmhiy.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcWFheW54cm5jbWN6ZHRtaGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3NDU4ODgsImV4cCI6MjA1MTM2OTM4OH0.esgNwWgHvQ9GVgkjD7u1uOWWbyqaPFMz9UqLk_frqHE';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.warn('SUPABASE_SERVICE_ROLE_KEY not found, falling back to anon key');
}

// Create a Supabase client with the anon key for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a service role client for admin operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
