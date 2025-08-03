# 🚀 Slack 알림 테스트

이것은 **새로운 PR 생성 시 Slack 알림 자동화**를 테스트하기 위한 파일입니다.

## 📋 테스트 체크리스트

### ✅ 설정 완료 항목:
- [x] `.github/workflows/pr-notification.yml` 워크플로우 파일 생성
- [x] GitHub Repository Secrets에 `SLACK_WEBHOOK_URL` 설정
- [x] Slack Incoming Webhook 생성 및 채널 연결

### 🔍 확인할 사항:
- [ ] PR 생성 시 GitHub Actions 워크플로우 자동 실행
- [ ] Slack 채널에 알림 메시지 도착
- [ ] 메시지 내용과 포맷이 올바른지 확인
- [ ] PR 링크 클릭 시 정상 이동

## 🎯 성공 기준

PR 생성 후 **30초 이내**에 다음과 같은 Slack 메시지가 도착해야 합니다:

```
🤖 IWL-Bot
📬 New Pull Request Ready for Review!

PM님, 새로운 PR이 생성되었습니다. 리뷰를 시작해주세요.
PR Link: https://github.com/ihw33/personal-journal-hub/pull/[번호]
```

---
*Generated: $(date '+%Y-%m-%d %H:%M:%S')*