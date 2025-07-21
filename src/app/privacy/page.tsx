import Link from 'next/link';

export default function PrivacyPage() {
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

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            개인정보 처리방침
          </h1>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>1. 개인정보의 처리목적</h2>
            <p>
              개인 저널 허브는 다음의 목적을 위하여 개인정보를 처리합니다.
            </p>
            <ul>
              <li>뉴스레터 서비스 제공</li>
              <li>고객 문의 및 지원</li>
              <li>서비스 개선 및 신규 서비스 개발</li>
            </ul>

            <h2>2. 처리하는 개인정보의 항목</h2>
            <p>
              개인 저널 허브는 다음의 개인정보 항목을 처리하고 있습니다.
            </p>
            <ul>
              <li><strong>뉴스레터 구독:</strong> 이메일 주소, 이름(선택)</li>
              <li><strong>문의 및 지원:</strong> 이메일 주소, 문의 내용</li>
            </ul>

            <h2>3. 개인정보의 처리 및 보유기간</h2>
            <p>
              개인정보는 수집·이용에 관한 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지 위 이용목적을 위하여 보유·이용됩니다.
            </p>
            <ul>
              <li><strong>뉴스레터 구독:</strong> 구독 해지 시까지</li>
              <li><strong>문의 기록:</strong> 3년</li>
            </ul>

            <h2>4. 개인정보의 제3자 제공</h2>
            <p>
              개인 저널 허브는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 
              다만, 아래의 경우에는 예외로 합니다.
            </p>
            <ul>
              <li>이용자들이 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>

            <h2>5. 개인정보 처리의 위탁</h2>
            <p>
              개인 저널 허브는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
            </p>
            <ul>
              <li><strong>이메일 발송 서비스:</strong> Resend (이메일 주소, 이름)</li>
              <li><strong>데이터베이스 서비스:</strong> Supabase (이메일 주소, 이름, 기타 서비스 데이터)</li>
            </ul>

            <h2>6. 정보주체의 권리·의무 및 행사방법</h2>
            <p>
              이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
            </p>
            <ul>
              <li>개인정보 처리정지 요구권</li>
              <li>개인정보 열람요구권</li>
              <li>개인정보 정정·삭제요구권</li>
              <li>개인정보 처리정지 요구권</li>
            </ul>

            <h2>7. 개인정보의 안전성 확보조치</h2>
            <p>
              개인 저널 허브는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
            </p>
            <ul>
              <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
              <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
              <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
            </ul>

            <h2>8. 개인정보보호책임자</h2>
            <p>
              개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.
            </p>
            <ul>
              <li><strong>개인정보보호책임자:</strong> 개인 저널 허브 관리자</li>
              <li><strong>연락처:</strong> 홈페이지 문의 폼 이용</li>
            </ul>

            <h2>9. 개인정보 처리방침 변경</h2>
            <p>
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>시행일자:</strong> {new Date().toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}