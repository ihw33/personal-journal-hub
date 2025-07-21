'use client';

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Journal {
  id: string
  title: string
  content: string
  excerpt?: string
  category: string
  created_at: string
  published_at?: string
}

export default function JournalPage() {
  const [journals, setJournals] = useState<Journal[]>([])
  const [filteredJournals, setFilteredJournals] = useState<Journal[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [loading, setLoading] = useState(true)

  const categories = ['전체', '일상', '생각', '여행', '독서', '개발', '공지']

  useEffect(() => {
    fetchJournals()
  }, [])

  useEffect(() => {
    filterAndSortJournals()
  }, [journals, searchTerm, selectedCategory, sortBy])

  const fetchJournals = async () => {
    // 임시 더미 데이터
    const dummyJournals = [
      {
        id: '1',
        title: '디지털 노마드로서의 첫 달',
        excerpt: '새로운 라이프스타일에 적응하며 배운 것들을 공유합니다.',
        content: '디지털 노마드로서의 첫 달을 보내며 많은 것을 배웠습니다. 자유로운 라이프스타일의 장점과 도전 과제들을 경험하며...',
        category: '일상',
        created_at: '2025-01-15',
        published_at: '2025-01-15'
      },
      {
        id: '2', 
        title: '원격 근무 효율성을 높이는 방법',
        excerpt: '생산성 향상을 위한 실용적인 팁들을 정리했습니다.',
        content: '원격 근무를 하면서 깨달은 효율성 증대 방법들을 공유합니다. 시간 관리부터 도구 활용까지...',
        category: '개발',
        created_at: '2025-01-10',
        published_at: '2025-01-10'
      },
      {
        id: '3',
        title: '여행하며 일하기',
        excerpt: '새로운 도시에서 일하며 얻은 영감들',
        content: '여행과 일의 균형을 맞추는 것은 쉽지 않지만, 새로운 환경에서 얻는 영감은 정말 값진 것 같습니다...',
        category: '여행',
        created_at: '2025-01-05',
        published_at: '2025-01-05'
      },
      {
        id: '4',
        title: 'Next.js 15 마이그레이션 경험기',
        excerpt: 'App Router와 Turbopack 도입 과정에서 겪은 이슈들',
        content: 'Next.js 15로 업그레이드하면서 겪은 다양한 이슈들과 해결 방법을 공유합니다...',
        category: '개발',
        created_at: '2025-01-01',
        published_at: '2025-01-01'
      }
    ]

    try {
      const { data, error } = await supabase
        .from('journals')
        .select('id, title, content, excerpt, category, created_at, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (error) {
        console.error('저널 불러오기 실패, 더미 데이터 사용:', error)
        setJournals(dummyJournals)
      } else {
        setJournals(data || dummyJournals)
      }
    } catch (error) {
      console.error('Supabase 연결 실패, 더미 데이터 사용:', error)
      setJournals(dummyJournals)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortJournals = () => {
    let filtered = journals

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(journal => 
        journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 카테고리 필터
    if (selectedCategory && selectedCategory !== '전체') {
      filtered = filtered.filter(journal => journal.category === selectedCategory)
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime()
        case 'oldest':
          return new Date(a.published_at || a.created_at).getTime() - new Date(b.published_at || b.created_at).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredJournals(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">로딩 중...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-12 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              모든 저널
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              디지털 노마드의 여정과 인사이트가 담긴 이야기들을 만나보세요
            </p>

            {/* 검색창 */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="제목이나 내용으로 검색해보세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-lg"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 필터 및 정렬 바 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* 검색 결과 및 필터 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                <span className="text-blue-600 dark:text-blue-400 font-bold">{filteredJournals.length}</span>개의 저널
              </div>
              
              {/* 카테고리 필터 */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === '전체' ? '' : category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      (selectedCategory === '' && category === '전체') || selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 정렬 */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-300 text-sm">정렬:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="newest">최신순</option>
                <option value="oldest">오래된순</option>
                <option value="title">제목순</option>
              </select>
            </div>
          </div>

          {/* 활성 필터 표시 */}
          {(searchTerm || selectedCategory) && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600 dark:text-gray-400">활성 필터:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    검색: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                    카테고리: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('')
                  }}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  모든 필터 지우기
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto">
          {filteredJournals.length === 0 ? (
            <div className="text-center py-16">
              {journals.length === 0 ? (
                <>
                  <p className="text-gray-500 text-lg mb-4">아직 발행된 저널이 없습니다.</p>
                  <Link 
                    href="/"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    홈으로 돌아가기
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-gray-500 text-lg mb-4">검색 조건에 맞는 저널을 찾을 수 없습니다.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('')
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    필터 초기화
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="grid gap-8">
              {/* 그리드 레이아웃: 데스크톱에서는 카드 스타일, 모바일에서는 리스트 스타일 */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJournals.map((journal) => (
                  <Link 
                    key={journal.id}
                    href={`/journal/${journal.id}`}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                          {journal.category}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {new Date(journal.published_at || journal.created_at).toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {journal.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4 mb-6 leading-relaxed">
                        {journal.excerpt || journal.content.slice(0, 150) + '...'}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group">
                          더 읽기
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                        <div className="text-xs text-gray-400">
                          {Math.ceil(journal.content.length / 200)}분 읽기
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 모바일 리스트 레이아웃 */}
              <div className="md:hidden space-y-6">
                {filteredJournals.map((journal) => (
                  <Link 
                    key={journal.id}
                    href={`/journal/${journal.id}`}
                    className="block bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                            {journal.category}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {new Date(journal.published_at || journal.created_at).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {journal.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                          {journal.excerpt || journal.content.slice(0, 120) + '...'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-600 text-sm font-medium">더 읽기 →</span>
                          <span className="text-xs text-gray-400">
                            {Math.ceil(journal.content.length / 200)}분
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}