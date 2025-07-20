import { supabase } from '@/lib/supabase'
import Link from 'next/link'

async function getAllJournals() {
  const { data: journals, error } = await supabase
    .from('journals')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('저널 불러오기 실패:', error)
    return []
  }

  return journals || []
}

export default async function JournalPage() {
  const journals = await getAllJournals()
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <nav className="mb-8">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← 홈으로 돌아가기
          </Link>
        </nav>

        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            모든 저널
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            일상의 소중한 순간들을 기록한 이야기들
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          {journals.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">아직 발행된 저널이 없습니다.</p>
              <Link 
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                홈으로 돌아가기
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {journals.map((journal) => (
                <Link 
                  key={journal.id}
                  href={`/journal/${journal.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {journal.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(journal.created_at).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {journal.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4 mb-4">
                      {journal.content.slice(0, 150)}...
                    </p>
                    <div className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      더 읽기 →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}