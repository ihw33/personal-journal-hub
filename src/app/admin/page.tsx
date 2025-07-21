'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import JournalEditor from '@/components/admin/JournalEditor'
import NewsletterManager from '@/components/admin/NewsletterManager'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [showNewsletter, setShowNewsletter] = useState(false)
  const [journals, setJournals] = useState<any[]>([])
  const [editingJournal, setEditingJournal] = useState<any>(null)

  useEffect(() => {
    if (isAuthenticated) {
      fetchJournals()
    }
  }, [isAuthenticated])

  const fetchJournals = async () => {
    try {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setJournals(data || [])
    } catch (err) {
      console.error('저널 불러오기 실패:', err)
    }
  }

  const handleDeleteJournal = async (id: string) => {
    if (!confirm('정말로 이 저널을 삭제하시겠습니까?')) return

    try {
      const { error } = await supabase
        .from('journals')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      fetchJournals()
    } catch (err) {
      console.error('삭제 실패:', err)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // 간단한 비밀번호 체크 (나중에 더 안전하게 변경 예정)
    if (password === 'admin123') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('비밀번호가 틀렸습니다.')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            관리자 로그인
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            로그아웃
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📝 저널 관리</h3>
            <p className="text-gray-600 mb-4">새 글 작성 및 기존 글 편집</p>
            <button 
              onClick={() => {
                setEditingJournal(null)
                setShowEditor(true)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              새 글 작성
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📧 뉴스레터</h3>
            <p className="text-gray-600 mb-4">뉴스레터 작성 및 발송</p>
            <button 
              onClick={() => {
                setShowEditor(false)
                setShowNewsletter(true)
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              뉴스레터 관리
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">👥 구독자 관리</h3>
            <p className="text-gray-600 mb-4">이메일 구독자 현황</p>
            <button 
              onClick={() => {
                setShowEditor(false)
                setShowNewsletter(true)
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              구독자 보기
            </button>
          </div>
        </div>

{showEditor ? (
          <JournalEditor
            existingJournal={editingJournal}
            onCancel={() => {
              setShowEditor(false)
              setEditingJournal(null)
            }}
            onSave={() => {
              setShowEditor(false)
              setEditingJournal(null)
              fetchJournals()
            }}
          />
        ) : showNewsletter ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">뉴스레터 관리</h2>
              <button
                onClick={() => setShowNewsletter(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                뒤로가기
              </button>
            </div>
            <NewsletterManager />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">최근 저널</h2>
            <div className="space-y-4">
              {journals.length === 0 ? (
                <p className="text-gray-500 text-center py-8">아직 작성된 저널이 없습니다.</p>
              ) : (
                journals.map((journal) => (
                  <div key={journal.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{journal.title}</h3>
                        <p className="text-gray-600 text-sm">
                          {new Date(journal.created_at).toLocaleDateString('ko-KR')} • {journal.category}
                          • {journal.status === 'published' ? '발행됨' : 
                             journal.status === 'draft' ? '임시저장' :
                             journal.status === 'review' ? '검토 대기' :
                             journal.status === 'private' ? '비공개' : '보관됨'}
                        </p>
                        <p className="text-gray-700 text-sm mt-1 line-clamp-2">
                          {journal.content.slice(0, 100)}...
                        </p>
                      </div>
                      <div className="ml-4 space-x-2">
                        <button
                          onClick={() => {
                            setEditingJournal(journal)
                            setShowEditor(true)
                          }}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          편집
                        </button>
                        <button
                          onClick={() => handleDeleteJournal(journal.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}