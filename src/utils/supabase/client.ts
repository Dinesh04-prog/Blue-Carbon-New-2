import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create a single shared Supabase client instance
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'bluemitra-auth-session', // Use a unique storage key
      storage: typeof window !== 'undefined' ? window.localStorage : undefined
    }
  }
);

// Export project info for other uses
export { projectId, publicAnonKey };