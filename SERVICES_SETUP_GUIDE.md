# 🔧 기타 서비스 설정 가이드

이 가이드는 personal-journal-hub 프로젝트에 필요한 추가 서비스들을 연동하는 방법을 설명합니다.

## 📋 목차
1. [Resend (이메일 서비스)](#1-resend-이메일-서비스)
2. [Stripe (결제 서비스)](#2-stripe-결제-서비스)
3. [환경변수 종합 설정](#3-환경변수-종합-설정)
4. [서비스 연동 테스트](#4-서비스-연동-테스트)

---

## 1. Resend (이메일 서비스)

뉴스레터 및 알림 이메일 발송을 위한 Resend 설정

### 1단계: Resend 계정 생성
1. [Resend](https://resend.com)에 접속
2. "Get Started" 클릭하여 계정 생성
3. 이메일 인증 완료

### 2단계: API 키 발급
1. Resend 대시보드에서 "API Keys" 클릭
2. "Create API Key" 버튼 클릭
3. 키 이름 설정: `personal-journal-hub`
4. 권한 설정: `Send access` 선택
5. API 키 복사 및 저장

### 3단계: 도메인 설정 (선택사항)
```
# 사용자 정의 도메인 사용 시
1. "Domains" 섹션에서 도메인 추가
2. DNS 레코드 설정
3. 도메인 인증 완료
```

### 4단계: 이메일 템플릿 준비
```typescript
// 뉴스레터 구독 확인 이메일 템플릿
const subscriptionConfirmEmail = {
  from: 'noreply@your-domain.com',
  subject: '뉴스레터 구독이 완료되었습니다! 🎉',
  html: `
    <h1>환영합니다!</h1>
    <p>personal-journal-hub 뉴스레터 구독을 확인해드립니다.</p>
    <p>앞으로 유용한 여행 정보와 AI 활용 팁을 전해드리겠습니다.</p>
  `
};
```

---

## 2. Stripe (결제 서비스)

강의 결제 처리를 위한 Stripe 설정

### 1단계: Stripe 계정 생성
1. [Stripe](https://stripe.com)에 접속
2. "Start now" 클릭하여 계정 생성
3. 비즈니스 정보 입력 및 인증

### 2단계: API 키 확인
1. Stripe 대시보드에서 "Developers" → "API keys" 클릭
2. 다음 키들 복사:
   ```
   Publishable key: pk_test_... (테스트용)
   Secret key: sk_test_... (테스트용)
   ```

### 3단계: 웹훅 설정
1. "Developers" → "Webhooks" 클릭
2. "Add endpoint" 클릭
3. 엔드포인트 URL 설정:
   ```
   URL: https://your-domain.com/api/stripe/webhook
   Description: Payment confirmations
   ```
4. 이벤트 선택:
   ```
   - checkout.session.completed
   - payment_intent.succeeded
   - payment_intent.payment_failed
   ```

### 4단계: 상품 및 가격 설정
```javascript
// Stripe 대시보드에서 상품 생성
const products = [
  {
    name: '제주도 여행 계획 AI 협업 마스터 과정',
    description: '8주 완주형 커리큘럼',
    price: 299000, // KRW
    currency: 'krw'
  },
  {
    name: 'AI와 함께하는 창의적 사고법',
    description: '6주 집중 과정',
    price: 199000, // KRW
    currency: 'krw'
  }
];
```

### 5단계: 테스트 카드 정보
```
테스트용 카드 번호:
- 성공: 4242 4242 4242 4242
- 실패: 4000 0000 0000 0002
- 3D Secure: 4000 0025 0000 3155

만료일: 미래의 아무 날짜
CVC: 아무 3자리 숫자
우편번호: 아무 5자리 숫자
```

---

## 3. 환경변수 종합 설정

### 완성된 .env.local 파일 예시:

```env
# Google Gemini API 설정
GEMINI_API_KEY=AIzaSyAlHiNVBH41XeUaM5wWCHMHse9KzNdzZFk

# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend 이메일 서비스
RESEND_API_KEY=re_123456789_your_actual_resend_key

# Stripe 결제 서비스
STRIPE_SECRET_KEY=sk_test_123456789_your_actual_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_123456789_your_actual_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_123456789_your_webhook_secret

# Next.js 설정
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# 기타 설정
NODE_ENV=development
```

### .env.example 파일 업데이트:

```env
# Google Gemini API 설정
# https://makersuite.google.com/app/apikey 에서 발급
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase 설정
# https://supabase.com 에서 프로젝트 생성 후 발급
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Resend 이메일 서비스
# https://resend.com 에서 발급
RESEND_API_KEY=your_resend_api_key_here

# Stripe 결제 서비스
# https://stripe.com 에서 발급
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# Next.js 설정
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_here

# 개발 환경 설정
NODE_ENV=development
```

---

## 4. 서비스 연동 테스트

### 1단계: 환경변수 확인 스크립트

프로젝트에 환경변수 확인 페이지를 추가:

```typescript
// pages/api/test/env-check.ts (개발용만)
export default function handler(req: any, res: any) {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({ error: 'Not found' });
  }

  const envStatus = {
    gemini: !!process.env.GEMINI_API_KEY,
    supabase: {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      anon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      service: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    },
    resend: !!process.env.RESEND_API_KEY,
    stripe: {
      secret: !!process.env.STRIPE_SECRET_KEY,
      public: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      webhook: !!process.env.STRIPE_WEBHOOK_SECRET
    }
  };

  res.json(envStatus);
}
```

### 2단계: 서비스별 테스트

#### Gemini AI 테스트:
```bash
# AI 챗봇 페이지에서 테스트
curl http://localhost:3000/ai-practice
```

#### Supabase 연결 테스트:
```bash
# 회원가입/로그인 테스트
curl http://localhost:3000/auth
```

#### Resend 이메일 테스트:
```bash
# 뉴스레터 구독 테스트
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

#### Stripe 결제 테스트:
```bash
# 결제 페이지 접속
curl http://localhost:3000/course
```

### 3단계: 통합 테스트 시나리오

1. **사용자 회원가입** (Supabase)
2. **이메일 인증** (Resend)
3. **AI 챗봇 대화** (Gemini)
4. **강의 결제** (Stripe)
5. **진도 추적** (Supabase)

---

## 🚨 보안 체크리스트

### API 키 보안
- [ ] 모든 키가 `.env.local`에만 저장됨
- [ ] 프로덕션과 개발 키가 분리됨
- [ ] 서비스 역할 키는 서버에서만 사용
- [ ] 웹훅 시크릿이 설정됨

### 네트워크 보안
- [ ] HTTPS 사용 (프로덕션)
- [ ] CORS 설정 확인
- [ ] Rate limiting 설정
- [ ] 입력 데이터 검증

### 데이터 보안
- [ ] 개인정보 암호화
- [ ] 로그에 민감정보 미포함
- [ ] 정기적 백업 설정
- [ ] 접근 로그 모니터링

---

## 📊 모니터링 및 로깅

### 서비스별 대시보드
- **Supabase**: 데이터베이스 성능, 사용량
- **Resend**: 이메일 전송 통계, 반송율
- **Stripe**: 결제 성공률, 환불 현황
- **Gemini**: API 호출량, 응답 시간

### 알림 설정
```javascript
// 중요 이벤트 알림 설정
const alertConditions = [
  'Payment failures > 5%',
  'Email bounce rate > 3%',
  'API error rate > 1%',
  'Database connection failures'
];
```

---

## 🎯 완료 체크리스트

### Resend 설정
- [ ] 계정 생성 및 API 키 발급
- [ ] 도메인 설정 (선택사항)
- [ ] 이메일 템플릿 준비
- [ ] 환경변수 설정

### Stripe 설정
- [ ] 계정 생성 및 API 키 발급
- [ ] 웹훅 엔드포인트 설정
- [ ] 상품 및 가격 설정
- [ ] 테스트 결제 확인

### 통합 테스트
- [ ] 환경변수 확인 스크립트 실행
- [ ] 각 서비스별 개별 테스트
- [ ] 전체 사용자 플로우 테스트
- [ ] 보안 체크리스트 확인

**🎉 모든 단계 완료 후 전체 서비스 연동이 완성됩니다!**