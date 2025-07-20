import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface JournalPageProps {
  params: {
    slug: string
  }
}

async function getJournal(slug: string) {
  const { data: journal, error } = await supabase
    .from('journals')
    .select('*')
    .eq('id', slug)
    .eq('published', true)
    .single()

  if (error || !journal) {
    return null
  }

  return journal
}

export default async function JournalPage({ params }: JournalPageProps) {
  const journal = await getJournal(params.slug)

  if (!journal) {
    notFound()
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
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {journal.category}
            </span>
            <span className="text-gray-500 text-sm">
              {new Date(journal.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {journal.title}
          </h1>
        </header>

        {/* 글 내용 */}
        <article className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {journal.content}
            </div>
          </div>
        </article>

        {/* 하단 네비게이션 */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <Link 
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              더 많은 글 보기
            </Link>
            
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                이 글이 도움이 되셨다면 뉴스레터를 구독해보세요
              </p>
              <Link 
                href="/newsletter"
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

export async function generateStaticParams() {
  const { data: journals } = await supabase
    .from('journals')
    .select('id')
    .eq('published', true)

  return journals?.map((journal) => ({
    slug: journal.id,
  })) || []
}