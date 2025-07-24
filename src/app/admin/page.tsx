'use client'

import { useState, useEffect } from 'react'
import { marked } from 'marked'
import JournalEditor from '@/components/admin/JournalEditor'
import NewsletterManager from '@/components/admin/NewsletterManager'

interface Journal {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: string;
  published_at: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [showNewsletter, setShowNewsletter] = useState(false)
  const [journals, setJournals] = useState<Journal[]>([])
  const [editingJournal, setEditingJournal] = useState<Journal | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [previewJournal, setPreviewJournal] = useState<Journal | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      fetchJournals()
    }
  }, [isAuthenticated])

  const fetchJournals = async () => {
    try {
      // API 라우트를 통해 저널 목록 가져오기
      const response = await fetch('/api/journals')
      
      if (!response.ok) {
        throw new Error('저널 불러오기 실패')
      }
      
      const result = await response.json()
      setJournals(result.journals || [])
    } catch (err) {
      console.error('저널 불러오기 실패:', err)
      // 에러 시 빈 배열로 설정
      setJournals([])
    }
  }

  const handleDeleteJournal = async (id: string) => {
    if (!confirm('정말로 이 저널을 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/journals/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('삭제 실패')
      }
      
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
            existingJournal={editingJournal || undefined}
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
          <div className="space-y-6">
            {/* 상태별 통계 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { status: 'all', label: '전체', color: 'bg-gray-500', count: journals.length },
                { status: 'published', label: '발행됨', color: 'bg-green-500', count: journals.filter(j => j.status === 'published').length },
                { status: 'draft', label: '임시저장', color: 'bg-yellow-500', count: journals.filter(j => j.status === 'draft').length },
                { status: 'review', label: '검토 대기', color: 'bg-blue-500', count: journals.filter(j => j.status === 'review').length },
                { status: 'private', label: '비공개', color: 'bg-purple-500', count: journals.filter(j => j.status === 'private').length }
              ].map((stat) => (
                <button
                  key={stat.status}
                  onClick={() => setStatusFilter(stat.status)}
                  className={`p-4 rounded-lg text-white transition-all ${
                    statusFilter === stat.status 
                      ? `${stat.color} ring-4 ring-opacity-50 ring-current transform scale-105` 
                      : `${stat.color} hover:opacity-80`
                  }`}
                >
                  <div className="text-2xl font-bold">{stat.count}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </button>
              ))}
            </div>

            {/* 저널 목록 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  저널 관리 
                  {statusFilter !== 'all' && (
                    <span className="text-lg font-normal text-gray-600 ml-2">
                      ({statusFilter === 'published' ? '발행됨' : 
                        statusFilter === 'draft' ? '임시저장' :
                        statusFilter === 'review' ? '검토 대기' :
                        statusFilter === 'private' ? '비공개' : '보관됨'})
                    </span>
                  )}
                </h2>
                
                {/* 상태 필터 드롭다운 */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">전체 보기</option>
                  <option value="published">발행됨</option>
                  <option value="draft">임시저장</option>
                  <option value="review">검토 대기</option>
                  <option value="private">비공개</option>
                  <option value="archived">보관됨</option>
                </select>
              </div>

              <div className="space-y-4">
                {(() => {
                  const filteredJournals = statusFilter === 'all' 
                    ? journals 
                    : journals.filter(j => j.status === statusFilter);
                  
                  if (filteredJournals.length === 0) {
                    return (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">📝</div>
                        <p className="text-gray-500 text-lg mb-2">
                          {statusFilter === 'all' 
                            ? '아직 작성된 저널이 없습니다.' 
                            : `${statusFilter === 'published' ? '발행된' : 
                                statusFilter === 'draft' ? '임시저장된' :
                                statusFilter === 'review' ? '검토 대기 중인' :
                                statusFilter === 'private' ? '비공개' : '보관된'} 저널이 없습니다.`
                          }
                        </p>
                        <button
                          onClick={() => {
                            setEditingJournal(null)
                            setShowEditor(true)
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                          새 저널 작성하기
                        </button>
                      </div>
                    );
                  }

                  return filteredJournals.map((journal) => {
                    const getStatusConfig = (status: string) => {
                      switch (status) {
                        case 'published':
                          return { 
                            color: 'border-green-500 bg-green-50', 
                            badge: 'bg-green-100 text-green-800',
                            icon: '✅',
                            label: '발행됨'
                          };
                        case 'draft':
                          return { 
                            color: 'border-yellow-500 bg-yellow-50', 
                            badge: 'bg-yellow-100 text-yellow-800',
                            icon: '📝',
                            label: '임시저장'
                          };
                        case 'review':
                          return { 
                            color: 'border-blue-500 bg-blue-50', 
                            badge: 'bg-blue-100 text-blue-800',
                            icon: '👀',
                            label: '검토 대기'
                          };
                        case 'private':
                          return { 
                            color: 'border-purple-500 bg-purple-50', 
                            badge: 'bg-purple-100 text-purple-800',
                            icon: '🔒',
                            label: '비공개'
                          };
                        case 'archived':
                          return { 
                            color: 'border-gray-500 bg-gray-50', 
                            badge: 'bg-gray-100 text-gray-800',
                            icon: '📦',
                            label: '보관됨'
                          };
                        default:
                          return { 
                            color: 'border-gray-300 bg-gray-50', 
                            badge: 'bg-gray-100 text-gray-800',
                            icon: '❓',
                            label: '알 수 없음'
                          };
                      }
                    };

                    const statusConfig = getStatusConfig(journal.status);

                    return (
                      <div key={journal.id} className={`border-l-4 ${statusConfig.color} rounded-r-lg p-4`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 
                                className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors"
                                onClick={() => {
                                  setPreviewJournal(journal)
                                  setShowPreview(true)
                                }}
                              >
                                {journal.title}
                              </h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.badge}`}>
                                <span>{statusConfig.icon}</span>
                                {statusConfig.label}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">
                              <span className="font-medium">작성:</span> {new Date(journal.created_at).toLocaleDateString('ko-KR')}
                              {journal.updated_at && journal.updated_at !== journal.created_at && (
                                <span className="ml-3">
                                  <span className="font-medium">수정:</span> {new Date(journal.updated_at).toLocaleDateString('ko-KR')}
                                </span>
                              )}
                              <span className="ml-3">
                                <span className="font-medium">카테고리:</span> {journal.category}
                              </span>
                            </p>
                            <p className="text-gray-700 text-sm line-clamp-2">
                              {journal.excerpt || journal.content.slice(0, 120) + '...'}
                            </p>
                          </div>
                          <div className="ml-4 flex flex-col gap-2">
                            <button
                              onClick={() => {
                                setPreviewJournal(journal)
                                setShowPreview(true)
                              }}
                              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              미리보기
                            </button>
                            <button
                              onClick={() => {
                                setEditingJournal(journal)
                                setShowEditor(true)
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                              편집
                            </button>
                            <button
                              onClick={() => handleDeleteJournal(journal.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        )}

        {/* 미리보기 모달 */}
        {showPreview && previewJournal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* 모달 헤더 */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-gray-900">미리보기</h3>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    previewJournal.status === 'published' ? 'bg-green-100 text-green-800' :
                    previewJournal.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    previewJournal.status === 'review' ? 'bg-blue-100 text-blue-800' :
                    previewJournal.status === 'private' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {previewJournal.status === 'published' ? '✅ 발행됨' :
                     previewJournal.status === 'draft' ? '📝 임시저장' :
                     previewJournal.status === 'review' ? '👀 검토 대기' :
                     previewJournal.status === 'private' ? '🔒 비공개' : '📦 보관됨'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowPreview(false)
                      setEditingJournal(previewJournal)
                      setShowEditor(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    편집하기
                  </button>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 모달 내용 */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="p-6">
                  {/* 글 정보 */}
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{previewJournal.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                        {previewJournal.category}
                      </span>
                      <span>
                        <span className="font-medium">작성:</span> {new Date(previewJournal.created_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      {previewJournal.updated_at && previewJournal.updated_at !== previewJournal.created_at && (
                        <span>
                          <span className="font-medium">수정:</span> {new Date(previewJournal.updated_at).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 마크다운 렌더링된 내용 */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
                    dangerouslySetInnerHTML={{ __html: marked(previewJournal.content) }}
                  />
                </div>
              </div>

              {/* 모달 푸터 */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    글자 수: {previewJournal.content.length}자 • 예상 읽기 시간: {Math.ceil(previewJournal.content.length / 200)}분
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowPreview(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      닫기
                    </button>
                    <button
                      onClick={() => {
                        setShowPreview(false)
                        setEditingJournal(previewJournal)
                        setShowEditor(true)
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      편집하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}