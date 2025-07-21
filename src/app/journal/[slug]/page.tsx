import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import JournalContent from '@/components/journal/JournalContent'

interface JournalPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getJournal(slug: string) {
  const { data: journal, error } = await supabase
    .from('journals')
    .select('*')
    .eq('id', slug)
    .eq('status', 'published')
    .single()

  if (error || !journal) {
    return null
  }

  return journal
}

async function getAdjacentJournals(currentId: string, publishedAt: string) {
  const { data: nextJournal } = await supabase
    .from('journals')
    .select('id, title')
    .eq('status', 'published')
    .gt('published_at', publishedAt)
    .order('published_at', { ascending: true })
    .limit(1)
    .single()

  const { data: prevJournal } = await supabase
    .from('journals')
    .select('id, title')
    .eq('status', 'published')
    .lt('published_at', publishedAt)
    .order('published_at', { ascending: false })
    .limit(1)
    .single()

  return { nextJournal, prevJournal }
}

export default async function JournalPage({ params }: JournalPageProps) {
  const { slug } = await params
  const journal = await getJournal(slug)

  if (!journal) {
    notFound()
  }

  const { nextJournal, prevJournal } = await getAdjacentJournals(
    journal.id, 
    journal.published_at || journal.created_at
  )

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
              {new Date(journal.published_at || journal.created_at).toLocaleDateString('ko-KR', {
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
          <JournalContent journal={journal} />
        </article>

        {/* 이전/다음 글 네비게이션 */}
        {(prevJournal || nextJournal) && (
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="flex justify-between items-center gap-4">
              {prevJournal ? (
                <Link 
                  href={`/journal/${prevJournal.id}`}
                  className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">← 이전 글</div>
                  <div className="font-medium text-gray-900 dark:text-white line-clamp-2">{prevJournal.title}</div>
                </Link>
              ) : (
                <div className="flex-1"></div>
              )}
              
              {nextJournal ? (
                <Link 
                  href={`/journal/${nextJournal.id}`}
                  className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow text-right"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">다음 글 →</div>
                  <div className="font-medium text-gray-900 dark:text-white line-clamp-2">{nextJournal.title}</div>
                </Link>
              ) : (
                <div className="flex-1"></div>
              )}
            </div>
          </div>
        )}

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

export async function generateStaticParams() {
  const { data: journals } = await supabase
    .from('journals')
    .select('id')
    .eq('status', 'published')

  return journals?.map((journal) => ({
    slug: journal.id,
  })) || []
}