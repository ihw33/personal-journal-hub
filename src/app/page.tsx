import Link from "next/link";
import { supabase } from '@/lib/supabase'

async function getRecentJournals() {
  const { data: journals, error } = await supabase
    .from('journals')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('저널 불러오기 실패:', error)
    return []
  }

  return journals || []
}

export default async function Home() {
  const recentJournals = await getRecentJournals()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            개인 저널 허브
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            나만의 이야기를 기록하고, 소셜 미디어와 연결하여 공유하세요
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/auth"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              시작하기
            </Link>
            <Link 
              href="/about"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              더 알아보기
            </Link>
          </div>
        </header>

        <main className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">✍️ 저널 작성</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              일상의 순간들을 기록하고 정리하세요
            </p>
            <Link href="/journal" className="text-blue-600 hover:text-blue-700 font-medium">
              저널 보기 →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">🔗 소셜 연동</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              YouTube, Instagram, Facebook과 연결하세요
            </p>
            <Link href="/auth" className="text-blue-600 hover:text-blue-700 font-medium">
              연동하기 →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">📚 강의 & 뉴스레터</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              강의 신청과 뉴스레터 구독을 관리하세요
            </p>
            <Link href="/courses" className="text-blue-600 hover:text-blue-700 font-medium">
              둘러보기 →
            </Link>
          </div>
        </main>

        {/* 최신 저널 섹션 */}
        {recentJournals.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              최신 저널
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentJournals.map((journal) => (
                <Link 
                  key={journal.id}
                  href={`/journal/${journal.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {journal.category}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {new Date(journal.created_at).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {journal.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {journal.content.slice(0, 120)}...
                    </p>
                    <div className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      더 읽기 →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/journal"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                모든 저널 보기
              </Link>
            </div>
          </section>
        )}

        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            소셜 미디어와 완벽 연동
          </h2>
          <div className="flex justify-center gap-8 text-4xl">
            <span title="YouTube">🎥</span>
            <span title="Instagram">📸</span>
            <span title="Facebook">📘</span>
          </div>
        </section>
      </div>
    </div>
  );
}
