export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* 히어로 섹션 */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="text-white text-5xl font-bold">👋</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            안녕하세요, 저는 디지털 노마드입니다
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            기술과 삶의 균형을 찾아가는 여정을 기록하고, <br/>
            배운 것들을 나누며 함께 성장하고 싶습니다.
          </p>
        </section>

        <div className="max-w-4xl mx-auto">

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              🎯 우리의 미션
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              개인 저널 허브는 당신의 일상과 생각을 기록하고, 소셜 미디어와 자연스럽게 연결하여 
              개인 브랜딩과 소통을 도와주는 플랫폼입니다. 단순한 일기장을 넘어서 
              디지털 시대의 새로운 자기표현 방식을 제안합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                ✨ 주요 기능
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• 개인 저널 작성 및 관리</li>
                <li>• 소셜 미디어 계정 통합 연동</li>
                <li>• 자동 크로스 포스팅</li>
                <li>• 댓글 및 피드백 통합 관리</li>
                <li>• 강의 신청 및 뉴스레터 구독</li>
                <li>• 개인 브랜딩 도구</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🔗 지원 플랫폼
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎥</span>
                  <div>
                    <p className="font-medium">YouTube</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">채널 정보, 동영상, 댓글</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📸</span>
                  <div>
                    <p className="font-medium">Instagram</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">프로필 정보, 기본 게시물</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📘</span>
                  <div>
                    <p className="font-medium">Facebook</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">페이지 정보, 공개 게시물</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              💡 왜 개인 저널 허브인가요?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🔄</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">통합 관리</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  여러 소셜 플랫폼을 한 곳에서 관리하세요
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📈</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">브랜딩 강화</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  일관된 메시지로 개인 브랜드를 구축하세요
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⏰</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">시간 절약</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  자동화된 포스팅으로 시간을 절약하세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}