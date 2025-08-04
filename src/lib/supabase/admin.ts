import { createClient } from '@supabase/supabase-js'

// Admin client for server-side operations that require elevated privileges
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Missing Supabase environment variables, returning null client')
    // Return a mock client for build time
    return {
      rpc: () => Promise.resolve({ data: null, error: new Error('Client not initialized') }),
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: new Error('Client not initialized') })
          })
        }),
        insert: () => Promise.resolve({ data: null, error: new Error('Client not initialized') }),
        update: () => ({
          eq: () => Promise.resolve({ data: null, error: new Error('Client not initialized') })
        })
      })
    } as any
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}