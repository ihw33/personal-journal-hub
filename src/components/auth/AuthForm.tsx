'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/journal')
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        로그인 / 회원가입
      </h1>
      
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#2563eb',
                brandAccent: '#1d4ed8',
              },
            },
          },
        }}
        providers={['google', 'github']}
        localization={{
          variables: {
            sign_in: {
              email_label: '이메일',
              password_label: '비밀번호',
              button_label: '로그인',
              loading_button_label: '로그인 중...',
              social_provider_text: '{{provider}}로 로그인',
              link_text: '이미 계정이 있으신가요? 로그인',
            },
            sign_up: {
              email_label: '이메일',
              password_label: '비밀번호',
              button_label: '회원가입',
              loading_button_label: '가입 중...',
              social_provider_text: '{{provider}}로 가입',
              link_text: '계정이 없으신가요? 회원가입',
            },
            forgotten_password: {
              email_label: '이메일',
              button_label: '비밀번호 재설정 링크 보내기',
              link_text: '비밀번호를 잊으셨나요?',
            },
          },
        }}
        redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8080'}/auth/callback`}
      />
      
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        가입하시면{" "}
        <a href="#" className="text-blue-600 hover:text-blue-700">
          이용약관
        </a>
        과{" "}
        <a href="#" className="text-blue-600 hover:text-blue-700">
          개인정보처리방침
        </a>
        에 동의하는 것으로 간주됩니다.
      </p>
    </div>
  )
}