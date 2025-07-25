import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim()

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// API 라우트용 클라이언트 생성 함수
export function createClient() {
  console.log('Creating Supabase client with URL:', supabaseUrl)
  console.log('API Key exists:', !!supabaseAnonKey)
  console.log('API Key length:', supabaseAnonKey?.length)
  console.log('API Key preview:', supabaseAnonKey?.substring(0, 20) + '...')
  
  // 추가 정리: 모든 보이지 않는 문자 제거
  const cleanUrl = supabaseUrl.replace(/[\r\n\t\s]/g, '').trim()
  const cleanKey = supabaseAnonKey.replace(/[\r\n\t\s]/g, '').trim()
  
  console.log('Cleaned URL:', cleanUrl)
  console.log('Cleaned key length:', cleanKey?.length)
  
  if (!cleanUrl || !cleanKey) {
    throw new Error('Supabase credentials missing')
  }
  
  try {
    const client = createSupabaseClient(cleanUrl, cleanKey, {
      auth: {
        persistSession: false
      },
      global: {
        fetch: fetch
      }
    })
    console.log('Supabase client created successfully')
    return client
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    throw error
  }
}

// 데이터베이스 타입 정의 (나중에 자동 생성 예정)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      journals: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          category: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          category?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          category?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      social_accounts: {
        Row: {
          id: string
          user_id: string
          provider: string
          provider_id: string
          access_token: string | null
          refresh_token: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider: string
          provider_id: string
          access_token?: string | null
          refresh_token?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider?: string
          provider_id?: string
          access_token?: string | null
          refresh_token?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}