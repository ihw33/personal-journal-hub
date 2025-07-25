'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import NewsletterSubscribe from '@/components/newsletter/NewsletterSubscribe'
import { HeroSection } from '@/components/sections/HeroSection'

interface Journal {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  status: string;
  created_at: string;
  published_at?: string;
}

export default function Home() {
  const [recentJournals, setRecentJournals] = useState<Journal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJournals()
  }, [])

  const fetchJournals = async () => {
    try {
      const response = await fetch('/api/journals')
      
      if (!response.ok) {
        throw new Error('저널 불러오기 실패')
      }
      
      const result = await response.json()
      
      // 발행된 저널만 필터링하고 최신순으로 정렬
      const publishedJournals = (result.journals || [])
        .filter((journal: Journal) => journal.status === 'published')
        .sort((a: Journal, b: Journal) => {
          const dateA = new Date(a.published_at || a.created_at)
          const dateB = new Date(b.published_at || b.created_at)
          return dateB.getTime() - dateA.getTime()
        })
      
      setRecentJournals(publishedJournals)
    } catch (error) {
      console.error('저널 불러오기 에러:', error)
      
      // 에러 발생 시 더미 데이터 사용
      setRecentJournals([
        {
          id: '1',
          title: '디지털 노마드로서의 첫 달',
          excerpt: '새로운 라이프스타일에 적응하며 배운 것들을 공유합니다.',
          content: '디지털 노마드로서의 첫 달을 보내며...',
          category: '일상',
          status: 'published',
          created_at: '2025-01-15',
          published_at: '2025-01-15'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">저널을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  const featuredJournal = recentJournals[0] // 가장 최신 저널을 피처드로 사용
  const otherJournals = recentJournals.slice(1, 4) // 나머지 3개

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* 새로운 히어로 섹션 */}
      <HeroSection language="ko" />

      {/* 주요 기능 섹션 */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI가 강화하는 <span className="text-iwl-gradient">깊이 있는 사고</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              생각 정리부터 아이디어 실행까지, AI와 함께하는 완전한 사고 도구
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-iwl-purple-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                AI 강화 사고 정리
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                AI 도구와 함께 생각을 체계적으로 정리하고 깊이 있는 분석을 경험하세요
              </p>
              <Link href="/journal" className="inline-flex items-center text-iwl-purple hover:text-iwl-blue font-medium group">
                저널 보기
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-iwl-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                AI 통찰력 생성
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                복잡한 아이디어를 분석하고 실행 가능한 통찰력으로 변환합니다
              </p>
              <Link href="/about" className="inline-flex items-center text-iwl-purple hover:text-iwl-blue font-medium group">
                더 알아보기
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-iwl-purple-100 to-iwl-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                실행 계획 수립
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                아이디어를 구체적인 실행 계획으로 변환하고 목표를 달성하세요
              </p>
              <Link href="/courses" className="inline-flex items-center text-iwl-purple hover:text-iwl-blue font-medium group">
                둘러보기
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 추천 저널 섹션 */}
      {otherJournals.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                AI와 함께한 <span className="text-iwl-gradient">깊이 있는 사고</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                AI 도구로 분석하고 정리한 인사이트와 아이디어들
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              {otherJournals.map((journal: Journal) => (
                <Link 
                  key={journal.id}
                  href={`/journal/${journal.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                        {journal.category}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {new Date(journal.published_at || journal.created_at).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-iwl-purple transition-colors">
                      {journal.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                      {journal.excerpt || journal.content.slice(0, 120) + '...'}
                    </p>
                    <div className="mt-4 inline-flex items-center text-iwl-purple hover:text-iwl-blue text-sm font-medium group">
                      더 읽기
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                href="/journal"
                className="inline-flex items-center bg-iwl-gradient hover:opacity-90 text-white font-semibold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl group"
              >
                모든 저널 보기
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 뉴스레터 구독 섹션 */}
      <section id="newsletter" className="py-20 bg-iwl-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              AI 사고법 인사이트를 받아보세요!
            </h2>
            <p className="text-xl text-white/80 mb-8">
              AI와 함께하는 깊이 있는 사고법과 실전 경험을 이메일로 만나보세요
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <NewsletterSubscribe />
            </div>
          </div>
        </div>
      </section>

      {/* 콘텐츠 크리에이터 소개 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-iwl-gradient rounded-full mx-auto mb-8 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">🧠</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              AI와 함께 <span className="text-iwl-gradient">더 깊이 생각하는</span> 방법
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              현대인을 위한 AI 강화 사고법을 연구하고, <br/>
              실제 활용 경험을 나누며 함께 성장하고 있습니다.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/about"
                className="bg-iwl-gradient hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-opacity"
              >
                AI 사고법 더보기
              </Link>
              <Link 
                href="/journal"
                className="border-2 border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                AI 저널 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
