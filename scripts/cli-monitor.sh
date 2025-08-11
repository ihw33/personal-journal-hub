#!/bin/bash
# CLI 자동 모니터링 스크립트
# 사용법: ./cli-monitor.sh [gemini|codex]

CLI_TYPE=$1
NOTIFICATION_FILE="/tmp/cli-notifications/${CLI_TYPE}-notification.json"

if [ -z "$CLI_TYPE" ]; then
    echo "사용법: $0 [gemini|codex]"
    exit 1
fi

echo "🤖 ${CLI_TYPE} CLI 모니터링 시작..."
echo "알림 파일: ${NOTIFICATION_FILE}"

# 이전 알림 시간 기록
LAST_CHECK_FILE="/tmp/cli-notifications/${CLI_TYPE}-last-check"
if [ ! -f "$LAST_CHECK_FILE" ]; then
    echo "$(date -Iseconds)" > "$LAST_CHECK_FILE"
fi

monitor_notifications() {
    while true; do
        # GitHub API로 나에게 할당된 이슈의 최근 업데이트 확인
        ISSUES=$(gh issue list --assignee @me --state open --json number,updatedAt,comments 2>/dev/null)
        
        if [ $? -eq 0 ] && [ "$ISSUES" != "[]" ]; then
            LAST_CHECK=$(cat "$LAST_CHECK_FILE")
            
            # 마지막 확인 이후 업데이트된 이슈가 있는지 확인
            UPDATED_ISSUES=$(echo "$ISSUES" | jq -r ".[] | select(.updatedAt > \"$LAST_CHECK\") | .number")
            
            if [ ! -z "$UPDATED_ISSUES" ]; then
                echo "📢 새로운 업데이트 감지!"
                for issue in $UPDATED_ISSUES; do
                    echo "   - Issue #$issue 업데이트됨"
                    echo "   - 댓글 확인: gh issue view $issue --comments"
                    
                    # 최근 댓글 확인
                    RECENT_COMMENTS=$(gh issue view "$issue" --comments --json comments | jq -r '.comments[-3:] | .[] | "[@\(.author.login)] \(.body[0:100])..."')
                    echo "   📝 최근 댓글:"
                    echo "$RECENT_COMMENTS" | sed 's/^/      /'
                    echo ""
                done
                
                # 마지막 확인 시간 업데이트
                echo "$(date -Iseconds)" > "$LAST_CHECK_FILE"
                
                echo "💡 ${CLI_TYPE} CLI 액션 필요!"
                echo "   다음 명령으로 이슈 확인: gh issue list --assignee @me"
                echo ""
            fi
        fi
        
        # 30초마다 확인
        sleep 30
    done
}

echo "⏰ 30초마다 GitHub 이슈 업데이트 확인 중..."
echo "   중단하려면 Ctrl+C를 누르세요."
echo ""

monitor_notifications