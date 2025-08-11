# CLI 자동화 노티봇 시스템

## 🎯 개요
GitHub Actions를 통해 이슈 댓글 알림을 자동화하고, CLI들이 자동으로 업데이트를 감지할 수 있는 시스템입니다.

## 🤖 자동화된 기능

### 1. GitHub Actions 자동 감지
- 이슈 댓글에 `@Gemini CLI` 또는 `@Codex CLI` 멘션 감지
- `PM 피드백` 키워드 감지 시 의사결정 필요 알림
- 자동으로 노티봇 댓글 생성

### 2. CLI 자동 모니터링
- 각 CLI가 자신에게 할당된 이슈 업데이트 자동 감지
- 30초마다 체크하여 새 댓글 알림
- 최근 댓글 내용 미리보기 제공

## 🚀 사용 방법

### PM (Claude Code) 용법
```bash
# 현재와 동일하게 사용
# 노티봇이 자동으로 @멘션과 댓글을 감지하여 알림
```

### CLI 용법
```bash
# 각 CLI 터미널에서 백그라운드 모니터링 시작
cd /Users/m4_macbook/personal-journal-hub
./scripts/cli-monitor.sh gemini  # Gemini CLI용
./scripts/cli-monitor.sh codex   # Codex CLI용
```

### 모니터링 시작 시 출력 예시
```
🤖 gemini CLI 모니터링 시작...
⏰ 30초마다 GitHub 이슈 업데이트 확인 중...

📢 새로운 업데이트 감지!
   - Issue #58 업데이트됨
   - 댓글 확인: gh issue view 58 --comments
   
   📝 최근 댓글:
      [@ihw33] ## ✅ SVG Placeholder 제안 승인...
      
💡 gemini CLI 액션 필요!
   다음 명령으로 이슈 확인: gh issue list --assignee @me
```

## 🧠 의사결정 경계

### 완전 자동화
- ✅ GitHub 이벤트 감지
- ✅ CLI 알림 전송  
- ✅ 단순 작업 지시 실행
- ✅ 진행상황 보고

### 수동 개입 필요
- 🧠 복잡한 기술 결정
- 🧠 작업 우선순위 조정
- 🧠 충돌 해결 방향성
- 🧠 전략적 변경사항
- 🧠 품질 기준 판단

## 📊 예상 효과
- ⚡ 응답 시간 단축: 수동 노티 → 자동 감지
- 🔄 협업 효율성 증대: 실시간 업데이트 감지
- 📈 작업 추적성: 모든 알림이 GitHub에 기록
- 🎯 집중도 향상: PM은 의사결정에만 집중

## 🛠 설치된 파일
- `.github/workflows/cli-notification.yml` - GitHub Actions 워크플로우
- `scripts/cli-monitor.sh` - CLI 모니터링 스크립트
- `docs/CLI_AUTOMATION_GUIDE.md` - 이 가이드