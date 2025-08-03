# 개인 저널 허브 (Personal Journal Hub)

개인 블로그와 소셜 미디어를 연결하는 통합 플랫폼

<!-- Test: Automation Workflow -->

## 🚀 주요 기능

- **📝 저널 작성**: 관리자 전용 글 작성 시스템
- **📖 공개 읽기**: 모든 방문자가 저널 읽기 가능
- **📧 뉴스레터**: 이메일 구독 및 자동 발송
- **🎓 강의 관리**: 온라인 강의 신청 시스템
- **📊 설문조사**: 독자 피드백 수집
- **🔗 소셜 연동**: YouTube, Instagram, Facebook 연결

## 🛠 기술 스택

- **프론트엔드**: Next.js 15, TypeScript, Tailwind CSS
- **백엔드**: Supabase (PostgreSQL, Auth, Storage)
- **배포**: Vercel (예정)
- **이메일**: Resend (예정)

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경변수 설정 (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 개발 서버 실행
npm run dev -- --port 8080
```

## 🔐 관리자 접근

- URL: `/admin`
- 비밀번호: `admin123`

## 📁 프로젝트 구조

```
src/
├── app/                 # Next.js App Router 페이지
├── components/          # 재사용 가능한 컴포넌트
├── lib/                 # 유틸리티 및 설정
└── types/               # TypeScript 타입 정의
```

## 🚧 개발 진행사항

- [x] 프로젝트 초기 설정
- [x] Supabase 데이터베이스 설계
- [x] 관리자 저널 작성 시스템
- [x] 공개 저널 읽기 페이지
- [ ] 뉴스레터 시스템
- [ ] 이메일 구독 기능
- [ ] 소셜 미디어 연동
- [ ] 배포

## 🌐 접속 URL

- 홈페이지: http://localhost:8080
- 관리자: http://localhost:8080/admin

## 📝 라이센스

개인 프로젝트
 
