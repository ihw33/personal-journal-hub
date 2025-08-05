# Stripe 결제 시스템 테스트 가이드

## 1. 환경 설정

### 필수 환경 변수 설정
`.env.local` 파일에 다음 환경 변수를 설정해야 합니다:

```bash
# Stripe API 키 (https://dashboard.stripe.com/test/apikeys 에서 발급)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Webhook 설정 (선택사항, Stripe Dashboard에서 설정)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## 2. 테스트 카드 정보

Stripe는 테스트 환경에서 사용할 수 있는 다양한 테스트 카드를 제공합니다:

### 성공 케이스
- **카드번호**: `4242 4242 4242 4242`
- **만료일**: 미래의 아무 날짜 (예: 12/34)
- **CVC**: 아무 3자리 숫자 (예: 123)
- **우편번호**: 아무 5자리 숫자 (예: 12345)

### 실패 케이스
- **잔액 부족**: `4000 0000 0000 9995`
- **카드 거부**: `4000 0000 0000 0002`
- **CVC 오류**: `4000 0000 0000 0127`

### 3D Secure 인증
- **3D Secure 필수**: `4000 0027 6000 3184`
- **3D Secure 선택**: `4000 0000 0000 3220`

## 3. 테스트 시나리오

### 시나리오 1: 정상 결제
1. 로그인 후 결제 페이지 접속
2. 플랜 선택 (베이직/프리미엄/프로)
3. 테스트 카드 정보 입력 (4242 4242 4242 4242)
4. 이용약관 동의 체크
5. 결제하기 버튼 클릭
6. 결제 확인 페이지로 리디렉션 확인

### 시나리오 2: 결제 실패
1. 실패 테스트 카드 사용 (4000 0000 0000 9995)
2. 적절한 에러 메시지 표시 확인
3. 재시도 가능 여부 확인

### 시나리오 3: 3D Secure 인증
1. 3D Secure 테스트 카드 사용 (4000 0027 6000 3184)
2. 인증 창 표시 확인
3. 인증 완료 후 결제 진행 확인

## 4. Webhook 테스트 (선택사항)

### Stripe CLI 설치
```bash
# macOS
brew install stripe/stripe-cli/stripe

# 또는 직접 다운로드
https://stripe.com/docs/stripe-cli
```

### Webhook 이벤트 전달
```bash
# 로그인
stripe login

# Webhook 이벤트를 로컬로 전달
stripe listen --forward-to localhost:3005/api/stripe-webhook

# 테스트 이벤트 트리거
stripe trigger payment_intent.succeeded
```

## 5. 주의사항

1. **테스트 모드 확인**: Stripe Dashboard 상단에 "Test mode" 표시 확인
2. **실제 카드 사용 금지**: 실제 카드 정보를 입력하지 마세요
3. **API 키 구분**: test_ 접두사가 붙은 키만 사용
4. **로그 확인**: 브라우저 콘솔과 서버 로그 모두 확인

## 6. 문제 해결

### "Missing stripe-signature header" 오류
- Webhook Secret이 올바르게 설정되었는지 확인
- Stripe CLI를 통해 이벤트를 전달하고 있는지 확인

### "Invalid API Key" 오류
- `.env.local` 파일의 API 키가 올바른지 확인
- 서버 재시작 필요 (`npm run dev`)

### 결제 후 리디렉션 실패
- `return_url`이 올바른지 확인
- 로컬 개발 시 `http://localhost:3005` 사용

## 7. 추가 리소스

- [Stripe 공식 문서](https://stripe.com/docs)
- [Stripe 테스트 카드](https://stripe.com/docs/testing)
- [Stripe Elements](https://stripe.com/docs/stripe-js)