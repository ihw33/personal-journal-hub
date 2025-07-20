export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            강의 & 뉴스레터
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            새로운 지식과 인사이트를 얻어보세요
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              📚 온라인 강의
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    개인 브랜딩 전략
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    소셜 미디어를 활용한 개인 브랜딩 방법을 배워보세요
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">₩50,000</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      신청하기
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-green-500 to-teal-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    콘텐츠 제작 워크샵
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    매력적인 콘텐츠를 만드는 비법을 알려드립니다
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">₩75,000</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      신청하기
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-orange-500 to-red-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    소셜 미디어 마케팅
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    효과적인 소셜 미디어 마케팅 전략을 수립해보세요
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">₩60,000</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      신청하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              📧 뉴스레터 구독
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  주간 인사이트 받아보기
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  매주 새로운 소셜 미디어 트렌드와 개인 브랜딩 팁을 이메일로 받아보세요
                </p>
                <form className="flex gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="이메일 주소를 입력하세요"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
                  >
                    구독하기
                  </button>
                </form>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  언제든지 구독 해지가 가능합니다
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}