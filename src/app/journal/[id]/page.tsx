'use client';

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import JournalContent from '@/components/journal/JournalContent'

interface JournalPageProps {
  params: Promise<{
    id: string
  }>
}

interface Journal {
  id: string
  title: string
  content: string
  excerpt?: string
  category: string
  status: string
  created_at: string
  updated_at?: string
  published_at?: string
  user_id: string
}

export default function JournalPage({ params }: JournalPageProps) {
  const [journal, setJournal] = useState<Journal | null>(null)
  const [loading, setLoading] = useState(true)
  const [journalId, setJournalId] = useState<string>('')

  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params
      setJournalId(resolvedParams.id)
    }
    getId()
  }, [params])

  useEffect(() => {
    if (journalId) {
      fetchJournal()
    }
  }, [journalId])

  const fetchJournal = async () => {
    try {
      const response = await fetch('/api/journals')
      
      if (!response.ok) {
        throw new Error('저널 불러오기 실패')
      }
      
      const result = await response.json()
      const journals = result.journals || []
      
      console.log('Looking for ID:', journalId)
      console.log('Available journals:', journals.map((j: Journal) => ({ id: j.id, title: j.title, status: j.status })))
      
      // 발행된 저널 중에서 ID가 일치하는 것 찾기
      const foundJournal = journals.find((j: Journal) => j.id === journalId && j.status === 'published')
      
      console.log('Found journal:', foundJournal ? foundJournal.title : 'Not found')
      
      if (foundJournal) {
        setJournal(foundJournal)
      } else {
        notFound()
      }
    } catch (error) {
      console.error('저널 불러오기 에러:', error)
      notFound()
    } finally {
      setLoading(false)
    }
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

  if (!journal) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 네비게이션 */}
        <nav className="mb-8">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← 홈으로 돌아가기
          </Link>
        </nav>

        {/* 글 헤더 */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm px-3 py-1 rounded-full">
              {journal.category}
            </span>
            <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">
              <span>
                작성일: {new Date(journal.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              {journal.updated_at && journal.updated_at !== journal.created_at && (
                <span>
                  수정일: {new Date(journal.updated_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {journal.title}
          </h1>
        </header>

        {/* 글 내용 */}
        <article className="max-w-4xl mx-auto">
          <JournalContent journal={journal} />
        </article>

        {/* 하단 네비게이션 */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link 
              href="/journal"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              모든 글 보기
            </Link>
            
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                이 글이 도움이 되셨다면 뉴스레터를 구독해보세요
              </p>
              <Link 
                href="/#newsletter"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                뉴스레터 구독하기
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
