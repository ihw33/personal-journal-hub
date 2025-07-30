# Idea Work Lab - 피그마 디자인 가이드라인
**Figma Design Guidelines for AI Learning Platform**

---

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

## 📊 **현재 개발 상태**

### **✅ v0.5 플랫폼 완성됨**
기본 플랫폼은 이미 완성되어 있으며, 안정적인 기반 위에 v0.6 통합 챗봇을 추가하는 단계

### **🔄 v0.6 통합 챗봇 개발 중**
현재 개발 중인 핵심 기능으로, 사용자가 AI와 함께 Phase별 학습을 진행할 수 있는 통합 챗봇 시스템

### **🎯 개발 목표**
완전한 AI 학습 플랫폼으로 베타 오픈을 통한 실제 서비스 시작

---

## 🎨 브랜드 시스템 (v0.5 확정)

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

## 🚀 **v0.6 통합 챗봇 시스템 (개발 중)**

### **🎯 핵심 기능**
AI 학습 플랫폼의 핵심인 **통합 챗봇 시스템** 구축으로 사용자가 각 Phase(1→2→3)를 연속적으로 학습할 수 있는 환경 제공

### **🔧 챗봇 시스템 요구사항**
```
1. Phase별 연속 대화 시스템
   ├─ Phase 1→2→3 끊김 없는 대화 흐름
   ├─ 사용자 학습 진도 자동 저장
   └─ 개인화된 학습 경로 제공

2. AI 컨텍스트 누적 시스템  
   ├─ 이전 대화 맥락 완전 기억
   ├─ 사용자 특성 학습 및 적응
   └─ 점진적 난이도 조절

3. 실시간 저장/불러오기
   ├─ 세션 기반 대화 관리
   ├─ 클라우드 동기화
   └─ 다디바이스 연동
```

### **🎨 피그마 디자인 핵심 포인트**

#### **v0.5 기반 브랜딩 매칭 필수**
```
• 컬러: IWL 그라데이션 (#7C3AED → #3B82F6) 활용
• 폰트: Inter/Pretendard 시스템과 일치  
• 스타일: 기존 v0.5 컴포넌트 디자인 언어 유지
• 호환성: SPA 라우팅 구조 고려
```

#### **챗봇 UI/UX 설계 원칙**
```
• 직관적 대화 인터페이스
• Phase 전환 시각적 표현
• 학습 진도 실시간 표시
• 모바일/데스크톱 반응형 지원
```

---

## 🏗️ 완성된 플랫폼 구조 (v0.5 기반)

### 1. 홈페이지 (/) - ✅ 완성됨

#### **현재 완성된 구조**
```
✅ 히어로 섹션: "AI와 함께하는 새로운 생각정리" 메시징 적용
✅ 3단계 프로세스: AI 협력 방법론 기반 업데이트
✅ 강의/프로그램 섹션: 동적 시스템 준비 완료
✅ 저널 연재 섹션: AI 요소 강화 적용
✅ 뉴스레터 구독: "AI 인사이트 레터" 리브랜딩
✅ 반응형 디자인: 모든 디바이스 완벽 지원
```

#### **v0.6 챗봇 연동 계획**
- 통합 챗봇 진입점 추가
- 학습 진도 표시 위젯
- 실시간 사용자 활동 표시

### 2. 저널 페이지 (/journal) - ✅ 기반 완성

#### **현재 상태**
- 저널 목록 및 검색 ✅
- 카테고리 필터링 ✅
- 기본적인 CRUD 기능 ✅

#### **v0.6 AI 협력 요소 추가**
- "AI와 함께 작성하기" 모드
- AI 인사이트 제안 기능  
- 생각 패턴 분석 및 피드백

### 3. 강의/뉴스레터 페이지 (/courses) - ✅ 완성됨

#### **완성된 기능**
- 3개 프로그램 체계적 소개 + 이중언어 ✅
- "AI 인사이트 레터" 리브랜딩 ✅
- 구독 시스템 기반 구축 ✅

#### **v0.6 통합 챗봇 연동**
- 강의별 전용 챗봇 연결
- 학습 진도 실시간 추적
- AI 튜터 시스템 도입

### 4. 소개 페이지 (/about) - ✅ 완성됨

#### **완성된 브랜딩**
- "Where AI Meets Deep Thinking" 스토리 ✅
- 미션/비전/가치 섹션 + 이중언어 ✅
- 전문성 어필 완료 ✅

### 5. 관리자 페이지 (/admin) - ✅ 기반 완성

#### **기본 완성 기능**
- 저널 관리 기능 ✅
- 기본 대시보드 ✅

#### **v0.6 추가 기능**
- 챗봇 대화 모니터링
- 사용자 학습 분석
- AI 성능 지표 대시보드

---

## ⚙️ 기술 아키텍처 (검증된 기반)

### **현재 기술 스택 ✅ 검증됨**
- **Frontend**: React, Next.js (SPA 라우팅)
- **Backend**: Supabase (권한 시스템 포함)
- **Styling**: Tailwind CSS (IWL 그라데이션 시스템)
- **Deployment**: Vercel (프로덕션 레디)
- **Domain**: Cloudflare

### **v0.6 추가 기술**
- **AI API**: OpenAI GPT-4, Claude API (챗봇용)
- **Session Management**: Redis (대화 상태 관리)
- **Analytics**: Google Analytics, Mixpanel (사용자 행동 분석)
- **Monitoring**: Sentry (에러 추적)

---

## 🧩 컴포넌트 시스템 (기반 + 신규)

### **✅ v0.5 완성 컴포넌트**
- `HeaderV05` - v0.5 헤더 (완성)
- `HeroSection` - 히어로 섹션 (v0.5 브랜딩 완성)
- `FeaturedJournals` - 추천 저널 섹션 (완성)
- `NewsletterSection` - 뉴스레터 구독 섹션 (완성)
- `Footer` - v0.5 푸터 (완성)

### **🔄 v0.6 신규 컴포넌트 (디자인 필요)**
- `ChatbotContainer` - 통합 챗봇 컨테이너
- `ChatbotInterface` - 챗봇 대화 인터페이스
- `PhaseProgress` - 학습 진도 표시
- `AIContextManager` - AI 컨텍스트 관리
- `SessionManager` - 세션 상태 관리

## 🔗 API 엔드포인트 설계

### **✅ 기존 API (완성됨)**
```
GET/POST /api/journals ✅
GET/PUT/DELETE /api/journals/[id] ✅
POST /api/newsletter/subscribe ✅
GET /api/newsletter/confirm ✅
POST /api/newsletter/unsubscribe ✅
POST /api/upload ✅
```

### **🔄 v0.6 신규 API (개발 필요)**
```
Chatbot API
POST /api/chatbot/message - AI 메시지 처리
GET /api/chatbot/session/[id] - 세션 조회
POST /api/chatbot/session - 세션 생성
PUT /api/chatbot/session/[id] - 세션 업데이트

Learning API  
GET /api/learning/progress/[userId] - 학습 진도 조회
POST /api/learning/phase/complete - Phase 완료 처리
GET /api/learning/analytics - 학습 분석 데이터
```

---

## 📁 파일/폴더 구조

### **✅ v0.5 기존 구조 (완성됨)**
```
src/
├── app/
│   ├── page.tsx (홈페이지) ✅ v0.5 완성
│   ├── journal/ ✅ v0.5 기반
│   ├── courses/ ✅ v0.5 완성
│   ├── about/ ✅ v0.5 완성
│   └── api/ ✅ v0.5 기반
├── components/
│   ├── layout/
│   │   ├── HeaderV05.tsx ✅ 완성
│   │   └── Footer.tsx ✅ 완성
│   ├── sections/
│   │   ├── HeroSection.tsx ✅ 완성
│   │   ├── FeaturedJournals.tsx ✅ 완성
│   │   └── NewsletterSection.tsx ✅ 완성
│   └── ui/ ✅ v0.5 기반
└── styles/
    └── globals.css ✅ v0.5 IWL 그라데이션 적용
```

### **🔄 v0.6 신규 추가 (개발 필요)**
```
src/
├── app/
│   └── chatbot/ 🔄 신규 페이지
│       ├── page.tsx
│       └── [sessionId]/
└── components/
    ├── chatbot/ 🔄 신규 섹션
    │   ├── ChatbotContainer.tsx
    │   ├── ChatbotInterface.tsx
    │   ├── PhaseProgress.tsx
    │   └── SessionManager.tsx
    ├── ai/ 🔄 신규 AI 관련
    │   ├── AIContextManager.tsx
    │   └── LearningAnalytics.tsx
    └── learning/ 🔄 신규 학습 관련
        ├── ProgressTracker.tsx
        └── PhaseNavigator.tsx
```

---

## 🎯 **개발 필요 항목 체크리스트**

### **🎨 피그마 디자인 필요**
- [ ] ChatbotContainer 컴포넌트 디자인
- [ ] ChatbotInterface UI/UX 설계  
- [ ] PhaseProgress 진도 표시 디자인
- [ ] 모바일/데스크톱 반응형 레이아웃
- [ ] v0.5 브랜딩과 일관성 확보

### **💻 개발 필요 기능**
- [ ] AI API 연동 시스템
- [ ] 세션 기반 대화 관리
- [ ] Phase별 컨텍스트 누적
- [ ] 실시간 저장/불러오기
- [ ] 학습 진도 추적 시스템

### **🔧 기술 통합**
- [ ] v0.5 플랫폼과 완전 통합
- [ ] TypeScript 타입 시스템 확장
- [ ] 성능 최적화 및 테스트
- [ ] 에러 처리 및 예외 상황 대응

---

**🚀 v0.5 완성된 안정적 기반 위에 v0.6 통합 챗봇을 추가하여 완전한 AI 학습 플랫폼 완성!**