# 🤖 AI 챗봇 연동 설정 가이드

이 가이드는 Google Gemini API를 사용하여 AI 챗봇 기능을 활성화하는 방법을 설명합니다.

## 📋 목차
1. [Google Gemini API 키 발급](#1-google-gemini-api-키-발급)
2. [환경변수 설정](#2-환경변수-설정)
3. [기능 테스트](#3-기능-테스트)
4. [문제 해결](#4-문제-해결)

---

## 1. Google Gemini API 키 발급

### 1단계: Google AI Studio 접속
1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속합니다
2. Google 계정으로 로그인합니다

### 2단계: API 키 생성
1. "Create API Key" 버튼을 클릭합니다
2. 새 프로젝트를 생성하거나 기존 프로젝트를 선택합니다
3. API 키가 생성되면 **안전한 곳에 복사**해둡니다

⚠️ **중요**: API 키는 한 번만 표시되므로 반드시 복사해두세요!

---

## 2. 환경변수 설정

### 1단계: .env.local 파일 생성
프로젝트 루트 디렉토리에 `.env.local` 파일을 생성합니다:

```bash
# 프로젝트 루트에서 실행
touch .env.local
```

### 2단계: API 키 추가
`.env.local` 파일에 다음 내용을 추가합니다:

```env
# Google Gemini API 설정
GEMINI_API_KEY=여기에_발급받은_API_키를_입력하세요
```

**또는** 클라이언트 사이드에서 사용하려면:

```env
# 클라이언트 사이드 접근용
NEXT_PUBLIC_GEMINI_API_KEY=여기에_발급받은_API_키를_입력하세요
```

### 3단계: 서버 재시작
환경변수 변경 후 개발 서버를 재시작합니다:

```bash
npm run dev
```

---

## 3. 기능 테스트

### AI 연동 확인하기
1. 브라우저에서 `http://localhost:3000/ai-practice`로 이동
2. AI 어시스턴트와 대화 시작
3. 메시지를 보내보고 AI 응답을 확인

### 작동 모드 확인
- **✅ Gemini API 연동**: 실제 AI가 개인화된 응답 제공
- **⚠️ 시뮬레이션 모드**: API 키가 없으면 미리 준비된 응답 사용

---

## 4. 문제 해결

### 자주 발생하는 문제들

#### 🔍 "API key not found" 에러
```
해결방법:
1. .env.local 파일이 프로젝트 루트에 있는지 확인
2. API 키 변수명이 정확한지 확인 (GEMINI_API_KEY)
3. 서버 재시작 (npm run dev)
```

#### 🔍 "API 호출 실패" 에러
```
해결방법:
1. API 키가 유효한지 Google AI Studio에서 확인
2. 인터넷 연결 상태 확인
3. Google Cloud 프로젝트 설정 확인
```

#### 🔍 "Quota exceeded" 에러
```
해결방법:
1. Google AI Studio에서 사용량 확인
2. 무료 할당량을 초과했을 경우 잠시 대기
3. 필요시 유료 플랜으로 업그레이드
```

### 디버깅 도구

#### 브라우저 콘솔 확인
1. F12로 개발자 도구 열기
2. Console 탭에서 에러 메시지 확인
3. Network 탭에서 API 호출 상태 확인

#### 로그 확인
```javascript
// 브라우저 콘솔에서 API 상태 확인
console.log('Gemini API 사용 가능:', checkGeminiAPIKey());
```

---

## 🎯 사용 가능한 기능들

### AI 실습 모드
- **가이드형**: 단계별 안내와 구체적인 질문
- **자기주도형**: 창의적 탐구와 열린 질문

### 진행률 추적
- 실시간 학습 진행률 표시
- 체크포인트 기반 과제 완료도
- 개인화된 피드백 제공

### 세션 관리
- 사용자별 대화 세션 유지
- 주차별/단계별 학습 컨텍스트
- 대화 기록 및 진행 상황 저장

---

## 💡 추가 설정

### API 사용량 최적화
```javascript
// gemini.ts에서 설정 조정 가능
generationConfig: {
  temperature: 0.7,     // 창의성 조절 (0.0-1.0)
  maxOutputTokens: 1000, // 응답 길이 제한
  topK: 40,             // 응답 다양성
  topP: 0.95            // 응답 품질
}
```

### 안전성 설정
```javascript
// 부적절한 콘텐츠 필터링 설정
safetySettings: [
  {
    category: 'HARM_CATEGORY_HARASSMENT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
  }
  // 추가 안전성 설정...
]
```

---

## 📞 지원

문제가 지속되면 다음을 확인해보세요:

1. **공식 문서**: [Google AI Studio 가이드](https://ai.google.dev/docs)
2. **API 상태**: [Google Cloud 상태 페이지](https://status.cloud.google.com/)
3. **사용량 확인**: [Google AI Studio 대시보드](https://makersuite.google.com/app/apikey)

---

**🎉 설정 완료!**
이제 실제 AI와 함께하는 제주도 여행 계획 실습을 즐겨보세요!