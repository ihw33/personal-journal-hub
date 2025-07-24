'use client';

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Journal {
  id: string
  title: string
  content: string
  excerpt?: string
  category: string
  created_at: string
  updated_at?: string
  published_at?: string
  status: string
}

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const category = decodeURIComponent(params.category as string)
  
  const [journals, setJournals] = useState<Journal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const categories = ['일상', '생각', '여행', '독서', '개발', '공지']
  const categoryDisplayName = category === 'all' ? '전체' : category

  useEffect(() => {
    fetchJournalsByCategory()
  }, [category])

  const fetchJournalsByCategory = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/journals')
      if (!response.ok) throw new Error('저널 불러오기 실패')
      
      const result = await response.json()
      const allJournals = result.journals || []
      
      // 발행된 글만 필터링
      const publishedJournals = allJournals.filter((journal: Journal) => 
        journal.status === 'published'
      )
      
      // 카테고리별 필터링
      const filteredJournals = category === 'all' 
        ? publishedJournals
        : publishedJournals.filter((journal: Journal) => journal.category === category)
      
      setJournals(filteredJournals)
    } catch (error) {
      console.error('저널 불러오기 실패:', error)
      setJournals([])
    } finally {
      setLoading(false)
    }
  }

  const getFilteredAndSortedJournals = () => {
    let filtered = journals

    // 검색 필터링
    if (searchTerm) {
      filtered = filtered.filter(journal =>
        journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 정렬
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

    return sorted
  }

  const filteredJournals = getFilteredAndSortedJournals()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">로딩 중...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">홈</Link>
            <span className="mx-2">›</span>
            <Link href="/journal" className="hover:text-blue-600">저널</Link>
            <span className="mx-2">›</span>
            <span className="text-blue-600">{categoryDisplayName}</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {categoryDisplayName} 저널
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {categoryDisplayName === '전체' 
              ? '모든 카테고리의 글을 보여드립니다.'
              : `${categoryDisplayName} 카테고리의 글들을 모았습니다.`
            }
          </p>
        </div>

        {/* 카테고리 네비게이션 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Link
            href="/journal/category/all"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
            }`}
          >
            전체
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/journal/category/${encodeURIComponent(cat)}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* 검색 및 정렬 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* 검색 */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="저널 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 정렬 */}
              <div className="md:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">최신순</option>
                  <option value="oldest">오래된순</option>
                  <option value="title">제목순</option>
                </select>
              </div>
            </div>

            {/* 결과 정보 */}
            <div className="mt-4 text-sm text-gray-600">
              총 {filteredJournals.length}개의 저널
              {searchTerm && ` (검색: "${searchTerm}")`}
            </div>
          </div>
        </div>

        {/* 저널 목록 - 게시판 스타일 테이블 */}
        <div className="max-w-6xl mx-auto">
          {filteredJournals.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-16 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {searchTerm ? '검색 결과가 없습니다' : `${categoryDisplayName} 카테고리에 저널이 없습니다`}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? '다른 검색어를 시도해보세요' : '첫 번째 저널을 작성해보세요!'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  검색 초기화
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* 데스크톱 테이블 */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">카테고리</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">제목</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">작성일</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">수정일</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredJournals.map((journal, index) => (
                      <tr 
                        key={journal.id} 
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                            {journal.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link 
                            href={`/journal/${journal.id}`}
                            className="text-gray-900 hover:text-blue-600 transition-colors font-medium block"
                          >
                            {journal.title}
                          </Link>
                          {journal.excerpt && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                              {journal.excerpt}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {new Date(journal.created_at).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          })}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {journal.updated_at ? 
                            new Date(journal.updated_at).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            })
                            : '-'
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 모바일 리스트 */}
              <div className="md:hidden divide-y divide-gray-200">
                {filteredJournals.map((journal) => (
                  <div key={journal.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded">
                        {journal.category}
                      </span>
                      <div className="text-xs text-gray-500 text-right">
                        <div>작성: {new Date(journal.created_at).toLocaleDateString('ko-KR')}</div>
                        {journal.updated_at && (
                          <div>수정: {new Date(journal.updated_at).toLocaleDateString('ko-KR')}</div>
                        )}
                      </div>
                    </div>
                    
                    <Link 
                      href={`/journal/${journal.id}`}
                      className="text-gray-900 hover:text-blue-600 transition-colors font-medium block mb-1"
                    >
                      {journal.title}
                    </Link>
                    
                    {journal.excerpt && (
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {journal.excerpt}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 하단 네비게이션 */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <Link
            href="/journal"
            className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            모든 저널 보기
          </Link>
        </div>
      </div>
    </div>
  )
}