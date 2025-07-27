# 🗃️ Supabase 설정 가이드

이 가이드는 personal-journal-hub 프로젝트에 Supabase를 연동하는 방법을 설명합니다.

## 📋 목차
1. [Supabase 프로젝트 생성](#1-supabase-프로젝트-생성)
2. [데이터베이스 스키마 설정](#2-데이터베이스-스키마-설정)
3. [환경변수 설정](#3-환경변수-설정)
4. [인증 설정](#4-인증-설정)
5. [테스트 및 확인](#5-테스트-및-확인)

---

## 1. Supabase 프로젝트 생성

### 1단계: Supabase 계정 생성
1. [Supabase](https://supabase.com)에 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인 (권장)

### 2단계: 새 프로젝트 생성
1. "New project" 버튼 클릭
2. 조직 선택 (개인 계정 사용)
3. 프로젝트 정보 입력:
   ```
   Project name: personal-journal-hub
   Database password: [강력한 비밀번호 생성]
   Region: Northeast Asia (Seoul) - 선택 권장
   ```
4. "Create new project" 클릭
5. **프로젝트 생성 완료까지 약 2-3분 대기**

---

## 2. 데이터베이스 스키마 설정

### 1단계: SQL Editor 접속
1. Supabase 대시보드에서 "SQL Editor" 클릭
2. 새 쿼리 생성

### 2단계: 데이터베이스 스키마 실행
다음 SQL을 실행하여 필요한 테이블들을 생성합니다:

```sql
-- 사용자 프로필 테이블
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- 저널 테이블
CREATE TABLE public.journals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT,
  tags TEXT[],
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 코스 진행 상황 테이블
CREATE TABLE public.course_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  current_week INTEGER DEFAULT 1,
  current_phase INTEGER DEFAULT 1,
  completed_weeks INTEGER[] DEFAULT '{}',
  progress_percentage DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI 채팅 세션 테이블
CREATE TABLE public.ai_chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  week INTEGER NOT NULL,
  phase INTEGER NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('guided', 'self-directed')),
  messages JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 뉴스레터 구독자 테이블
CREATE TABLE public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  preferences JSONB DEFAULT '{}'
);

-- Row Level Security (RLS) 활성화
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_sessions ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own journals" ON public.journals
  FOR SELECT USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can create own journals" ON public.journals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journals" ON public.journals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journals" ON public.journals
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own progress" ON public.course_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own chat sessions" ON public.ai_chat_sessions
  FOR ALL USING (auth.uid() = user_id);
```

### 3단계: 트리거 함수 생성 (자동 업데이트)
```sql
-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 적용
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_journals_updated_at
  BEFORE UPDATE ON public.journals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_progress_updated_at
  BEFORE UPDATE ON public.course_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_chat_sessions_updated_at
  BEFORE UPDATE ON public.ai_chat_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 3. 환경변수 설정

### 1단계: API 키 확인
1. Supabase 대시보드에서 "Settings" → "API" 클릭
2. 다음 정보 복사:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public**: `eyJ...` (공개 키)
   - **service_role**: `eyJ...` (서비스 롤 키 - 보안 주의!)

### 2단계: .env.local 업데이트
프로젝트 루트의 `.env.local` 파일을 업데이트:

```env
# Google Gemini API 설정
GEMINI_API_KEY=AIzaSyAlHiNVBH41XeUaM5wWCHMHse9KzNdzZFk

# Supabase 설정 (실제 값으로 교체)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# 서버 사이드용 (선택사항)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# 기타 서비스 설정
RESEND_API_KEY=your_resend_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 4. 인증 설정

### 1단계: 인증 제공자 설정
1. Supabase 대시보드에서 "Authentication" → "Providers" 클릭
2. 소셜 로그인 설정 (선택사항):

#### Google OAuth 설정:
```
Client ID: your-google-client-id
Client Secret: your-google-client-secret
Redirect URL: https://your-project-id.supabase.co/auth/v1/callback
```

#### 기본 이메일 인증 설정:
- "Enable email confirmations" 체크
- "Enable email change confirmations" 체크

### 2단계: 리다이렉트 URL 설정
1. "URL Configuration" 섹션에서:
   ```
   Site URL: http://localhost:3000 (개발용)
   Redirect URLs: 
   - http://localhost:3000/auth/callback
   - https://your-production-domain.com/auth/callback
   ```

---

## 5. 테스트 및 확인

### 1단계: 연결 테스트
프로젝트에서 다음 명령으로 연결 확인:

```bash
# 개발 서버 재시작
npm run dev

# 브라우저에서 확인
# http://localhost:3000
```

### 2단계: 기능 테스트
1. **회원가입/로그인** 테스트
2. **저널 작성** 테스트
3. **AI 챗봇** 테스트
4. **코스 진행** 테스트

### 3단계: 데이터베이스 확인
Supabase 대시보드에서 "Table Editor"로 데이터 확인

---

## 🚨 보안 주의사항

### 1. 환경변수 보안
- ❌ **절대 커밋하지 마세요**: `.env.local` 파일
- ✅ **사용하세요**: `.env.example` 파일로 템플릿 제공
- ✅ **서버 키 분리**: `SUPABASE_SERVICE_ROLE_KEY`는 서버에서만 사용

### 2. RLS (Row Level Security)
- ✅ **모든 테이블에 RLS 활성화됨**
- ✅ **사용자별 데이터 접근 제한**
- ✅ **공개 데이터만 외부 접근 허용**

### 3. API 키 관리
- 🔄 **정기적으로 키 회전**
- 🔒 **최소 권한 원칙 적용**
- 📊 **사용량 모니터링**

---

## 📞 문제 해결

### 자주 발생하는 문제들

#### 🔍 "Invalid API key" 에러
```
해결방법:
1. API 키 다시 복사/붙여넣기
2. 공백이나 특수문자 확인
3. 프로젝트 ID 확인
```

#### 🔍 "RLS policy violation" 에러
```
해결방법:
1. 사용자 인증 상태 확인
2. RLS 정책 재검토
3. 테이블 권한 확인
```

#### 🔍 연결 타임아웃 에러
```
해결방법:
1. 네트워크 연결 확인
2. Supabase 서비스 상태 확인
3. 방화벽/프록시 설정 확인
```

---

## 🎯 완료 체크리스트

- [ ] Supabase 프로젝트 생성
- [ ] 데이터베이스 스키마 실행
- [ ] 환경변수 설정
- [ ] 인증 제공자 설정
- [ ] 연결 테스트 완료
- [ ] 기능 테스트 완료
- [ ] 보안 설정 확인

**🎉 모든 단계 완료 후 실제 Supabase 연동이 완성됩니다!**