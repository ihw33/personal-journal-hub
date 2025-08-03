# 자동화 테스트 파일

이 파일은 GitHub Actions → Slack 알림 자동화를 테스트하기 위해 생성되었습니다.

## 테스트 목적
- PR 생성 시 Slack 알림 전송 확인
- 메시지 포맷 및 내용 검증
- 자동화 워크플로우 정상 작동 여부 확인

## 예상 결과
PR 생성 후 지정된 Slack 채널에 다음과 같은 알림이 도착해야 합니다:
- 봇 이름: IWL-Bot
- 아이콘: 🤖
- 제목: "📬 New Pull Request Ready for Review!"
- 내용: PM님께 리뷰 요청 메시지
- PR 링크 포함

---
*Test created at: $(date)*