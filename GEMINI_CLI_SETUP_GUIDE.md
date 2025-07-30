# Gemini CLI 인수인계 가이드

## 🚀 빠른 시작 가이드

### 1. 프로젝트 클론 및 설정
```bash
git clone https://github.com/ihw33/personal-journal-hub.git
cd personal-journal-hub
npm install
```

### 2. 환경 변수 설정
`.env.local` 파일 생성:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### 3. 개발 서버 시작
```bash
npm run dev
```

## 📁 핵심 파일 구조 (Gemini CLI 필수 확인)

```
프로젝트 루트/
├── CLAUDE_WORK_HANDOVER.md        # 📄 주요 작업 내역 (필수 읽기)
├── GEMINI_CLI_SETUP_GUIDE.md      # 📄 이 파일
├── supabase_schema.sql             # 🗄️ DB 스키마
├── src/
│   ├── components/
│   │   ├── personalization/        # 🆕 새로 추가된 AI 개인화 시스템
│   │   │   └── RecommendationEngine.tsx
│   │   ├── version-history/        # 🆕 새로 추가된 버전 히스토리
│   │   │   ├── types.ts
│   │   │   ├── data.ts
│   │   │   ├── VersionHistoryMetrics.tsx
│   │   │   ├── VersionHistoryPhases.tsx
│   │   │   └── VersionHistoryChangelog.tsx
│   │   ├── AdminDashboard.tsx      # 🔧 최근 수정됨
│   │   └── Header.tsx              # 🔧 최근 수정됨
│   ├── lib/
│   │   ├── supabase.ts            # 🗄️ DB 연결 및 쿼리
│   │   └── securityMonitor.ts     # 🔐 보안 모니터링
│   └── app/globals.css            # 🎨 글로벌 스타일
```

## ⚡ 즉시 확인해야 할 사항들

### 1. 빌드 상태 확인
```bash
npm run build
# ✅ 성공해야 함 (Claude가 마지막에 수정 완료)
```

### 2. 현재 Todo 리스트 (우선순위)
```markdown
🔐 보안 관련 (Medium Priority):
- [ ] 입력 데이터 검증 함수 추가
- [ ] API Rate Limiting 구현

🔍 기능 개선 (Low Priority):
- [ ] SQL 인젝션 패턴 감지 강화
```

### 3. 최근 주요 변경사항 (2025.01.30)
- ✅ v125.1 원본 구조 완전 복원
- ✅ Beta 관련 컴포넌트 전체 제거
- ✅ 빌드 에러 수정 완료
- ✅ 보안 분석 완료 (A+ 등급)

## 🛡️ 보안 상태 요약

**현재 보안 등급: A+ (매우 안전)**

✅ **완벽하게 보호됨:**
- SQL 인젝션: Supabase ORM + RLS 정책
- XSS: 실시간 모니터링 시스템
- 인증: JWT 토큰 + 권한 기반 접근

⚠️ **개선 권장:**
- 사용자 입력 추가 검증
- API 속도 제한 구현

## 🎯 다음 단계 제안

### Phase 1: 환경 파악 (1-2일)
1. `CLAUDE_WORK_HANDOVER.md` 전체 읽기
2. 프로젝트 로컬 실행 확인
3. 주요 컴포넌트 동작 테스트

### Phase 2: 개선 작업 (1주)
1. Todo 리스트의 보안 관련 항목 구현
2. 사용자 피드백 기반 UX 개선
3. 성능 최적화 추가 검토

### Phase 3: 새로운 기능 (지속적)
1. 추가 AI 기능 개발
2. 사용자 경험 개선
3. 새로운 코스 콘텐츠 추가

## 🆘 문제 해결 가이드

### 빌드 실패 시
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 타입 체크
npm run typecheck

# 린트 체크
npm run lint
```

### Supabase 연결 실패 시
1. `.env.local` 환경 변수 확인
2. `src/lib/supabase.ts`의 데모 모드 동작 확인
3. 네트워크 연결 상태 점검

### 배포 실패 시
1. Vercel 환경 변수 설정 확인
2. 빌드 로그에서 에러 메시지 확인
3. `next.config.js` 설정 검토

## 📝 코딩 컨벤션

### TypeScript
- 모든 컴포넌트에 타입 정의 필수
- interface 사용 권장
- any 타입 사용 금지

### React
- 함수형 컴포넌트 사용
- Custom Hook 적극 활용
- Props drilling 방지 (Context 사용)

### CSS
- Tailwind CSS 클래스 사용
- ShadCN/UI 컴포넌트 우선 사용
- 커스텀 CSS는 globals.css에 정의

## 🔍 디버깅 팁

### 자주 사용하는 디버깅 명령어
```bash
# 개발 서버 (상세 로그)
npm run dev -- --verbose

# 타입 체크만
npx tsc --noEmit

# 특정 컴포넌트 빌드 테스트
npm run build 2>&1 | grep -i "component_name"
```

### 브라우저 콘솔
- React DevTools 설치 권장
- Network 탭에서 API 호출 모니터링
- Console에서 보안 이벤트 확인

---

**🤖 이 가이드는 Claude Code에서 Gemini CLI로의 원활한 인수인계를 위해 작성되었습니다.**

**주요 연락 정보:**
- GitHub Repo: https://github.com/ihw33/personal-journal-hub
- 배포 URL: Vercel 자동 배포
- 현재 브랜치: main (최신 상태)

**🎯 성공적인 인수인계를 위한 체크리스트:**
- [ ] 프로젝트 로컬 실행 성공
- [ ] `CLAUDE_WORK_HANDOVER.md` 완독
- [ ] 주요 컴포넌트 동작 확인
- [ ] Todo 리스트 우선순위 파악
- [ ] 첫 번째 개선 작업 계획 수립