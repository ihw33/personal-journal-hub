import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'API is working',
    env: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrlPreview: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      nodeEnv: process.env.NODE_ENV
    }
  })
}