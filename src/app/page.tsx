import Link from "next/link";
import { supabase } from '@/lib/supabase'
import NewsletterSubscribe from '@/components/newsletter/NewsletterSubscribe'

async function getRecentJournals() {
  // 임시 더미 데이터 (Supabase 연결 전까지)
  const dummyJournals = [
    {
      id: '1',
      title: '디지털 노마드로서의 첫 달',
      excerpt: '새로운 라이프스타일에 적응하며 배운 것들을 공유합니다.',
      content: '디지털 노마드로서의 첫 달을 보내며...',
      category: '일상',
      created_at: '2025-01-15',
      published_at: '2025-01-15'
    },
    {
      id: '2', 
      title: '원격 근무 효율성을 높이는 방법',
      excerpt: '생산성 향상을 위한 실용적인 팁들을 정리했습니다.',
      content: '원격 근무를 하면서 깨달은...',
      category: '개발',
      created_at: '2025-01-10',
      published_at: '2025-01-10'
    },
    {
      id: '3',
      title: '여행하며 일하기',
      excerpt: '새로운 도시에서 일하며 얻은 영감들',
      content: '여행과 일의 균형을 맞추는...',
      category: '여행',
      created_at: '2025-01-05',
      published_at: '2025-01-05'
    }
  ]

  try {
    const { data: journals, error } = await supabase
      .from('journals')
      .select('id, title, excerpt, content, category, created_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(6)

    if (error) {
      console.error('저널 불러오기 실패, 더미 데이터 사용:', error)
      return dummyJournals
    }

    return journals || dummyJournals
  } catch (error) {
    console.error('Supabase 연결 실패, 더미 데이터 사용:', error)
    return dummyJournals
  }
}

export default async function Home() {
  const recentJournals = await getRecentJournals()
  const featuredJournal = recentJournals[0] // 가장 최신 저널을 피처드로 사용
  const otherJournals = recentJournals.slice(1, 4) // 나머지 3개

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              디지털 시대의
              <span className="block text-blue-600">개인 저널</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              일상의 소중한 순간들을 기록하고, 인사이트를 공유하며,<br />
              소셜 미디어와 연결하여 더 많은 사람들과 소통하세요
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link 
                href="/journal"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                📖 저널 읽어보기
              </Link>
              <Link 
                href="#newsletter"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-4 px-8 rounded-lg transition-colors"
              >
                📧 뉴스레터 구독
              </Link>
            </div>

            {/* 최신 저널 대형 카드 */}
            {featuredJournal && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      최신 저널
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(featuredJournal.published_at || featuredJournal.created_at).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                    {featuredJournal.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 line-clamp-3">
                    {featuredJournal.excerpt || featuredJournal.content.slice(0, 150) + '...'}
                  </p>
                  <Link 
                    href={`/journal/${featuredJournal.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg group"
                  >
                    자세히 읽기
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 주요 기능 섹션 */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              다양한 기능으로 완성하는 개인 브랜딩
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              콘텐츠 제작부터 독자와의 소통까지, 모든 것을 한 곳에서
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                전문적인 저널 작성
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                마크다운 지원과 실시간 미리보기로 아름다운 콘텐츠를 만들어보세요
              </p>
              <Link href="/journal" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                저널 보기
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                소셜 미디어 연동
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                YouTube, Instagram, Facebook과 연결하여 더 넓은 독자층과 만나세요
              </p>
              <Link href="/about" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                더 알아보기
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                강의 & 뉴스레터
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                온라인 강의 제공과 뉴스레터로 구독자들과 지속적인 관계를 만들어보세요
              </p>
              <Link href="/courses" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">
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
                추천 저널
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                놓치면 안 될 인사이트가 담긴 이야기들
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              {otherJournals.map((journal) => (
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {journal.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                      {journal.excerpt || journal.content.slice(0, 120) + '...'}
                    </p>
                    <div className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group">
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
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl group"
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
      <section id="newsletter" className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              최신 인사이트를 받아보세요!
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              새로운 저널과 독점 콘텐츠를 이메일로 먼저 만나보세요
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
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-8 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">👋</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              안녕하세요, 저는 디지털 노마드입니다
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              기술과 삶의 균형을 찾아가는 여정을 기록하고, <br/>
              배운 것들을 나누며 함께 성장하고 싶습니다.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/about"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                나의 스토리 더보기
              </Link>
              <Link 
                href="/journal"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                작품 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
