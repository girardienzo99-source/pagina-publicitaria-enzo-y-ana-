import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Validar que las credenciales existan, tengan formato válido y no sean un dominio dummy
const isDummyDomain = 
  supabaseUrl.includes('euymmzkhgpickxmltons') || 
  supabaseUrl.includes('your-project-id') ||
  supabaseUrl.includes('example.supabase.co');

export const isSupabaseConfigured = 
  supabaseUrl !== '' && 
  supabaseAnonKey !== '' && 
  supabaseUrl.startsWith('https://') &&
  !isDummyDomain;

// Crear el cliente únicamente si hay credenciales válidas
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
      global: {
        headers: { 'x-application-name': 'rio-cuarto-web' }
      }
    }) 
  : null;
