import { createClient } from '@supabase/supabase-js';

// Security Item 1 & 3: Uso exclusivo da VITE_SUPABASE_ANON_KEY no client-side
// A SERVICE_ROLE_KEY NUNCA deve ser incluída neste bundle
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pjvaxzjmracfugccusvm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqdmF4emptcmFjZnVnY2N1c3ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NTU1NzUsImV4cCI6MjAyNTQzMTU3NX0.PUBLIC_ANON_KEY_DEMO';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'ocaradojogo_auth_session',
  },
});
