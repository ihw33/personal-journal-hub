# Idea Work Lab - 종합 개발 기획서

## 🎯 프로젝트 개요

### 프로젝트명
**Idea Work Lab (IWL) - AI와 함께하는 새로운 생각정리 플랫폼**

### 핵심 컨셉
- **기존**: 개인 저널 허브
- **진화**: AI 협력 기반 생각정리 전문 플랫폼
- **목표**: AI와의 협력을 통한 깊이 있는 인사이트 창출

### 브랜드 메시징
- **한국어**: "AI와 함께하는 새로운 생각정리"
- **영어**: "Think Deeper with AI"
- **서브타이틀**: "AI-Enhanced Thinking for Modern Minds"
- **브랜드 스토리**: "Where AI Meets Deep Thinking"

---

## 🎨 브랜드 시스템

### 컬러 시스템
```css
/* Primary Gradient */
--iwl-gradient: linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%);
--iwl-purple: #7C3AED;
--iwl-blue: #3B82F6;

/* Supporting Colors */
--iwl-purple-50: #F5F3FF;
--iwl-purple-100: #EDE9FE;
--iwl-blue-50: #EFF6FF;
--iwl-blue-100: #DBEAFE;

/* Neutral */
--iwl-gray-900: #1F2937;
--iwl-gray-600: #4B5563;
--iwl-gray-300: #D1D5DB;
--iwl-gray-50: #F9FAFB;
```

### 로고 시스템
- **Primary**: IWL (그라데이션) + "Idea Work Lab" (검정)
- **Secondary**: IWL + "Idea Work Lab" (둘 다 그라데이션)
- **Icon Only**: IWL (파비콘용)

### 타이포그래피
- **Main Font**: Inter (영문), Pretendard (한글)
- **Hierarchy**: H1(48px) → H2(36px) → H3(24px) → Body(16px)

---

## 🏗️ 사이트 구조 및 페이지 계획

### 1. 홈페이지 (/)

#### 현재 구현된 페이지 구조

**1. 히어로 섹션**
- **현재**: "AI와 함께하는 깊이 있는 사고" + "현대인을 위한 AI 강화 사고법"
- **현재 CTA**: "저널 시작하기", "강의 탐색하기"
- **오른쪽 시각 요소**: AI 강화 사고 진행률 (87% 창작력 향상, 3.2x 더 빠른 통찰)

**2. 3단계 프로세스 섹션**
- **현재**: "깊이 있는 분석", "AI 통찰력", "실천적 효과"
- 아이콘 기반 3단계 프로세스 설명

**3. 강의/프로그램 섹션**
- **제목**: "아이디어를 위한 완벽한 도구들"
- **서브타이틀**: "깊이 있는 사고와 창의적 아이디어 발굴을 위한 체계적인 강의와 개인 코칭"
- **3개 강의 카드**:
  - AI와 함께하는 창의적 사고법 (₩299,000) - 4.9★
  - 개인 맞춤 사고력 코칭 (₩899,000) - 5★
  - 디지털 저널링 워크샵 (₩189,000) - 4.8★

**4. 최근 저널 연재들**
- **제목**: "최근 저널 연재기"
- **서브타이틀**: "AI와 함께 탐구한 깊이 있는 사고의 여정을 공유합니다"
- **3개 블로그 카드**:
  - AI와 창의성의 만남 (8분 읽기) - 발견적 사고
  - 디지털 시대의 깊은 사고 (12분 읽기) - 단지배
  - 저널링과 AI (10분 읽기) - 저널링

**5. 뉴스레터 구독 섹션**
- **배경**: 보라색 그라데이션
- **제목**: "최신 인사이트를 받아보세요"
- **서브타이틀**: "매주 엄선된 아이디어와 깊이 있는 사고를 위한 콘텐츠를 이메일로 받아보세요"
- **CTA**: "구독하기"

**6. 푸터**
- 로고 + "AI와 함께하는 깊이 있는 사고를 위한 개인 저널 허브"
- 3단 구조: 저널/블로그/AI도구/분석 + 회사/소개/블로그/제품/연락처 + 리소스/도움말/커뮤니티/API문서/상태
- 하단 뉴스레터 재구독 + 저작권

#### 개선 계획

**히어로 섹션 업데이트**
- **메인 카피**: "AI와 함께하는 새로운 생각정리" (기획서 메시징 적용)
- **서브 카피**:
  - 한국어: "현대인을 위한 AI 강화 생각정리법"
  - 영어: "AI-Enhanced Thinking for Modern Minds"
- **시각 요소**: 현재 진행률 차트 유지하되 내용 업데이트
- **CTA 버튼**: 기존 텍스트 유지 ("저널 시작하기", "강의 탐색하기")

**3단계 프로세스 섹션 개선**
기존 구조 유지하되 AI 협력 방법론으로 내용 업데이트:
- **AI와 함께 시작하기** - "AI 도구와 친해지기"
- **함께 생각해보기** - "AI와 함께 깊이 생각하기"
- **멋진 결과 만들기** - "혼자서는 못 만드는 결과"

**강의 섹션 동적 시스템 구축**
- **기존**: 하드코딩된 3개 고정 강의
- **신규**: 관리자 페이지에서 강의 관리 + 메인에 자동 표시
- **구현 내용**:
  - 관리자 강의 관리 페이지 (`/admin/courses`)
  - 강의 CRUD 기능 (제목, 설명, 가격, 기간, 평점, 썸네일)
  - 메인 화면에 "추천 강의" 3개 자동 표시
  - "더 많은 강의 보기" → `/courses` 페이지 연결
  - 데이터베이스: `courses` 테이블 추가
  - API: `/api/courses` 엔드포인트

**저널 섹션 AI 요소 강화**
- 기존 블로그 카드에 AI 협력 요소 추가
- 읽기 시간과 함께 AI 활용도 표시

**기술 구현**
- 현재 레이아웃 유지하되 브랜딩 메시지 업데이트
- 그라데이션 컬러 시스템 적용
- 기존 반응형 구조 최적화

### 2. 저널 페이지 (/journal)

#### 현재 상태
- 저널 목록 및 검색
- 카테고리 필터링
- 기본적인 CRUD 기능

#### 개선 계획

**AI 협력 요소 추가**
- "AI와 함께 작성하기" 모드
- AI 인사이트 제안 기능
- 생각 패턴 분석 및 피드백

**UX 개선**
- 더 나은 에디터 (마크다운 + 위지윅)
- 태그 시스템 강화
- 읽기 경험 향상 (타이포그래피, 간격)

**기술 구현**
- 마크다운 에디터 업그레이드
- AI API 연동 (OpenAI/Claude)
- 검색 기능 강화

### 3. 강의/뉴스레터 페이지 (/courses)

#### 현재 상태
- 기본적인 강의 소개
- 뉴스레터 구독 폼

#### 개선 계획

**강의 섹션**
- AI 협력 생각정리 방법론 강의
- 단계별 커리큘럼 제시
- 실습 예제 및 템플릿 제공

**뉴스레터 섹션**
- "AI 인사이트 레터" 리브랜딩
- 구독자 혜택 명시
- 미리보기 콘텐츠 제공

**기술 구현**
- 강의 등록 시스템 (구글 시트 연동)
- 이메일 구독 시스템 강화
- 결제 시스템 준비 (추후)

### 4. 소개 페이지 (/about)

#### 현재 상태
- 기본적인 개인 소개
- 미션 및 비전

#### 개선 계획

**스토리텔링 강화**
- "Where AI Meets Deep Thinking" 중심 스토리
- 개인 여정: 아날로그 → 디지털 → AI 협력
- 전문성 어필: 생각정리 + AI 활용 경험

**신뢰도 구축**
- 경력 및 경험 소개
- 추천사 또는 성과 사례
- 소셜 미디어 연결 강화

**기술 구현**
- 인터랙티브 타임라인
- 소셜 프루프 요소
- 연락처 및 상담 신청

### 5. 관리자 페이지 (/admin)

#### 현재 상태
- 기본적인 대시보드
- 저널 관리 기능

#### 개선 계획

**분석 대시보드**
- 방문자 통계
- 인기 콘텐츠 분석
- 구독자 현황

**콘텐츠 관리**
- 일괄 편집 기능
- AI 제안 콘텐츠 관리
- SEO 최적화 도구

---

## ⚙️ 기능 로드맵

### Phase 1: 브랜딩 및 기본 개선 (2-3주)
- ✅ 브랜드 컬러 시스템 적용
- ✅ 로고 업데이트
- ✅ 홈페이지 히어로 섹션 리뉴얼
- ✅ 전체 페이지 브랜딩 통일
- 🔄 반응형 개선

### Phase 2: 콘텐츠 및 UX 강화 (3-4주)
- 🔄 AI 협력 방법론 콘텐츠 추가
- 🔄 저널 에디터 개선
- 🔄 뉴스레터 시스템 강화
- 🔄 강의 등록 시스템 구축

### Phase 3: AI 기능 통합 (4-6주)
- ⏳ AI 글쓰기 도우미
- ⏳ 인사이트 제안 기능
- ⏳ 생각 패턴 분석
- ⏳ 개인화된 추천 시스템

### Phase 4: 고급 기능 (장기)
- ⏳ 커뮤니티 기능
- ⏳ 협업 도구
- ⏳ 모바일 앱
- ⏳ API 제공

---

## 🎯 우선순위 매트릭스

### 높음 (즉시 시작)
- 홈페이지 히어로 섹션 리뉴얼
- 브랜드 메시징 전체 적용
- 저널 UX 개선

### 중간 (2-4주 내)
- AI 협력 방법론 콘텐츠
- 강의 시스템 구축
- 뉴스레터 리뉴얼

### 낮음 (장기)
- AI 기능 통합
- 고급 분석 도구
- 모바일 앱

---

## 📋 실행 체크리스트

### 디자인 (피그마)
- [ ] 홈페이지 히어로 섹션 디자인
- [ ] 브랜드 컬러 시스템 적용
- [ ] 컴포넌트 라이브러리 구축
- [ ] 반응형 레이아웃 설계
- [ ] AI 요소 아이콘/일러스트

### 개발 (클로드 코드)
- [x] CSS 변수 시스템 구축
- [x] 컴포넌트 리팩토링
- [x] 페이지별 개선 적용
- [ ] SEO 최적화
- [ ] 성능 최적화

### 콘텐츠
- [ ] AI 협력 방법론 아티클 작성
- [ ] 강의 커리큘럼 설계
- [ ] 뉴스레터 템플릿 제작
- [ ] About 페이지 스토리 작성

### 마케팅
- [ ] 소셜 미디어 브랜딩 업데이트
- [ ] SEO 키워드 최적화
- [ ] 유튜브 채널 연동 강화
- [ ] 이메일 시퀀스 설계

---

## 🔧 기술 스택 및 도구

### 현재 기술 스택
- **Frontend**: React, Next.js
- **Backend**: Supabase
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Domain**: Cloudflare

### 추가 도구 계획
- **AI API**: OpenAI GPT-4, Claude API
- **Analytics**: Google Analytics, Mixpanel
- **Email**: ConvertKit, Mailchimp
- **CMS**: 자체 구축 또는 Notion API

---

## 📊 성공 지표 (KPI)

### 단기 목표 (1-2개월)
- 페이지 체류 시간 30% 증가
- 뉴스레터 구독률 50% 증가
- 저널 작성 빈도 20% 증가

### 중기 목표 (3-6개월)
- 월 방문자 수 2배 증가
- 강의 등록자 100명 돌파
- AI 기능 사용률 60% 이상

### 장기 목표 (6-12개월)
- AI 생각정리 분야 1위 브랜드
- 월 수익 목표 달성
- 커뮤니티 활성 사용자 1000명

---

## 🎉 마일스톤

### Week 1-2: 브랜딩 완성
- 피그마 디자인 시스템 완료
- 홈페이지 리뉴얼 적용
- 전체 브랜딩 통일

### Week 3-4: 콘텐츠 강화
- AI 방법론 콘텐츠 추가
- 저널 UX 개선
- 강의 시스템 론칭

### Week 5-8: 기능 확장
- AI 기능 베타 테스트
- 사용자 피드백 수집
- 시스템 안정화

### Week 9-12: 성장 가속
- 마케팅 캠페인 론칭
- 커뮤니티 구축
- 수익화 모델 실행

---

## 🏗️ 개발 명명 규칙 및 구조

### 📋 페이지 구조 (Routes)
```
/ (홈페이지)
├── /journal (저널 메인)
├── /journal/[id] (저널 상세)
├── /journal/view (저널 작성)
├── /journal/category/[category] (카테고리별)
├── /courses (강의/코스)
├── /about (소개)
├── /auth (로그인/인증)
├── /admin (관리자)
└── /privacy (개인정보처리방침)
```

### 🧩 컴포넌트 명명 규칙

#### 레이아웃 컴포넌트
- `Header` - 상단 네비게이션
- `Footer` - 하단 푸터
- `Layout` - 전체 레이아웃 래퍼

#### 홈페이지 섹션 컴포넌트
- `HeroSection` - 히어로 섹션 ("AI와 함께하는 새로운 생각정리")
- `FeaturesSection` - 주요 기능 섹션 ("AI가 강화하는 깊이 있는 사고")
- `FeaturedJournals` - 추천 저널 섹션
- `NewsletterSection` - 뉴스레터 구독 섹션
- `CreatorSection` - 크리에이터 소개 섹션

#### 저널 관련 컴포넌트
- `JournalList` - 저널 목록
- `JournalCard` - 저널 카드
- `JournalDetail` - 저널 상세보기
- `JournalEditor` - 저널 작성 에디터
- `CategoryFilter` - 카테고리 필터

#### 공통 UI 컴포넌트
- `Button` - 버튼 (IWL 그라데이션 스타일)
- `Badge` - 뱃지 (카테고리 표시용)
- `Card` - 카드 컨테이너
- `Input` - 입력 필드
- `Modal` - 모달 다이얼로그

### 🎨 CSS 클래스 및 스타일 명명

#### 브랜드 컬러 클래스
```css
/* CSS Variables */
--iwl-purple: #7C3AED;
--iwl-blue: #3B82F6;
--iwl-gradient: linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%);
--iwl-purple-50: #F5F3FF;
--iwl-purple-100: #EDE9FE;
--iwl-blue-50: #EFF6FF;
--iwl-blue-100: #DBEAFE;

/* Utility Classes */
.bg-iwl-gradient
.text-iwl-gradient
.text-iwl-purple
.text-iwl-blue
.bg-iwl-purple-50
.bg-iwl-purple-100
.bg-iwl-blue-50
.bg-iwl-blue-100
```

### 🔗 링크 및 네비게이션 명명
- `home` - 홈페이지 (/)
- `journal` - 저널 메인 (/journal)
- `courses` - 강의/코스 (/courses)
- `about` - 소개 (/about)
- `newsletter` - 뉴스레터 구독 (/#newsletter)

### 📝 콘텐츠 텍스트 키

#### 메인 브랜딩 메시지
- `mainTitle`: "AI와 함께하는 새로운 생각정리"
- `subTitle`: "AI-Enhanced Thinking for Modern Minds"
- `description`: "AI 기반 도구로 인지적 잠재력을 해제하고, 사고 과정을 증폭시키며, 창의성을 향상시키고, 아이디어를 실행 가능한 통찰력으로 변환하세요"

#### CTA 버튼 텍스트
- `startJournal`: "🧠 AI 저널 시작하기"
- `subscribeNewsletter`: "📧 뉴스레터 구독"
- `learnMore`: "AI 사고법 더보기"
- `viewJournal`: "AI 저널 보기"

#### 섹션 제목
- `featuresTitle`: "AI가 강화하는 깊이 있는 사고"
- `journalsTitle`: "AI와 함께한 깊이 있는 사고"
- `creatorTitle`: "AI와 함께 더 깊이 생각하는 방법"
- `newsletterTitle`: "AI 사고법 인사이트를 받아보세요!"

### 🛠 API 엔드포인트 명명
```
GET/POST /api/journals
GET/PUT/DELETE /api/journals/[id]
POST /api/newsletter/subscribe
GET /api/newsletter/confirm
POST /api/newsletter/unsubscribe
POST /api/upload
```

### 📁 파일/폴더 구조
```
src/
├── app/
│   ├── page.tsx (홈페이지)
│   ├── journal/
│   ├── courses/
│   ├── about/
│   ├── auth/
│   └── api/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── FeaturedJournals.tsx
│   │   ├── NewsletterSection.tsx
│   │   └── CreatorSection.tsx
│   ├── journal/
│   └── ui/
└── styles/
    └── globals.css
```

---

*이 기획서를 바탕으로 피그마 디자인과 클로드 코드 개발을 체계적으로 진행할 수 있습니다.*