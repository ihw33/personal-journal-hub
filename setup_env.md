# 🚀 환경 설정 빠른 가이드

이 가이드는 personal-journal-hub 프로젝트의 모든 환경변수를 빠르게 설정하는 방법을 제공합니다.

## 📋 체크리스트

### 1. Google Gemini API ✅ (완료)
- [x] API 키: `AIzaSyAlHiNVBH41XeUaM5wWCHMHse9KzNdzZFk`

### 2. Supabase 설정
- [ ] [Supabase](https://supabase.com) 계정 생성
- [ ] 새 프로젝트 생성: `personal-journal-hub`
- [ ] 데이터베이스 비밀번호 설정
- [ ] 리전 선택: Northeast Asia (Seoul)
- [ ] API 키 복사
- [ ] SQL 스키마 실행

### 3. Resend 이메일 서비스
- [ ] [Resend](https://resend.com) 계정 생성
- [ ] API 키 발급
- [ ] 도메인 설정 (선택사항)

### 4. Stripe 결제 서비스
- [ ] [Stripe](https://stripe.com) 계정 생성
- [ ] API 키 확인 (테스트용)
- [ ] 웹훅 설정

---

## ⚡ 빠른 실행 가이드

### 1단계: Supabase 프로젝트 생성
```bash
# 1. https://supabase.com 접속
# 2. "Start your project" 클릭
# 3. GitHub으로 로그인
# 4. "New project" 클릭
# 5. 프로젝트 정보 입력:
#    - Name: personal-journal-hub
#    - Password: [강력한 비밀번호]
#    - Region: Northeast Asia (Seoul)
```

### 2단계: 데이터베이스 설정
```bash
# Supabase 대시보드에서:
# 1. "SQL Editor" 클릭
# 2. supabase_schema.sql 파일 내용을 복사해서 실행
```

### 3단계: 환경변수 업데이트
```bash
# .env.local 파일에서 다음 값들을 실제 값으로 교체:

# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]

# Resend (선택사항)
RESEND_API_KEY=[YOUR-RESEND-KEY]

# Stripe (선택사항)
STRIPE_SECRET_KEY=sk_test_[YOUR-SECRET-KEY]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_[YOUR-PUBLISHABLE-KEY]
STRIPE_WEBHOOK_SECRET=whsec_[YOUR-WEBHOOK-SECRET]

# NextAuth Secret 생성
NEXTAUTH_SECRET=[랜덤-32자-문자열]
```

### 4단계: 테스트
```bash
# 개발 서버 시작
npm run dev

# 브라우저에서 확인
# http://localhost:3000
```

---

## 🔧 서비스별 상세 설정

### Supabase 상세 설정
1. **인증 설정**: Authentication > Settings
   - Enable email confirmations ✅
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

2. **RLS 정책 확인**: Table Editor에서 각 테이블의 RLS 활성화 상태 확인

### Resend 상세 설정 (뉴스레터용)
1. **API 키 발급**: Dashboard > API Keys
2. **도메인 설정** (선택): Domains > Add Domain
3. **이메일 템플릿** 준비

### Stripe 상세 설정 (결제용)
1. **웹훅 설정**: Developers > Webhooks
   - Endpoint: `https://your-domain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`

---

## ✅ 완료 확인

### 필수 설정 (최소 동작)
- [x] Google Gemini API
- [ ] Supabase 프로젝트 + 스키마
- [ ] 환경변수 업데이트

### 선택적 설정 (고급 기능)
- [ ] Resend (뉴스레터)
- [ ] Stripe (결제)
- [ ] NextAuth Secret

### 테스트 확인
- [ ] 빌드 성공: `npm run build`
- [ ] 개발 서버 실행: `npm run dev`
- [ ] AI 챗봇 동작 확인
- [ ] 회원가입/로그인 테스트 (Supabase 설정 후)

---

## 🆘 문제 해결

### "Invalid API key" 에러
- API 키 재복사 (공백 제거)
- 프로젝트 ID 확인
- 환경변수 이름 재확인

### 빌드 에러
```bash
# 타입 체크
npm run build

# 환경변수 확인
echo $NEXT_PUBLIC_SUPABASE_URL
```

### 데이터베이스 연결 에러
- Supabase 프로젝트 상태 확인
- 네트워크 연결 확인
- API 키 권한 확인

**🎉 모든 설정 완료 후 풀스택 애플리케이션이 완성됩니다!**