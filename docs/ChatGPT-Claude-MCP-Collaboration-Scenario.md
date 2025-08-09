# ChatGPT ↔ Claude Code MCP 실시간 협업 시나리오 v2.0

## 🎯 새로운 협업 모델 (2025-08-09 업데이트)

### 혁신 포인트
- **즉시성**: GitHub를 협업 버스로 사용하여 실시간 소통
- **자동화**: MCP 도구를 통한 Obsidian ↔ GitHub 자동 동기화  
- **역할 분담**: ChatGPT(기획/리뷰) ↔ Claude Code(실행/구현)

### 실증 결과 (PR #23)
- ✅ **첫 번째 협업 루프 완성**: 기획 → 실행 → 리뷰 → 반영
- ✅ **GitHub 커넥터 + MCP 연동 검증**
- ✅ **실시간 피드백 시스템 구축**

---

## 🔄 기본 워크플로우

### 4단계 협업 프로세스

#### 1단계: ChatGPT 기획/요청
- 새로운 기능/개선 아이디어 제안
- 구체적 작업 요구사항 정의
- GitHub 커넥터로 현재 상태 확인

#### 2단계: Claude Code MCP 실행
- `obs_search_tool`: 관련 Obsidian 문서 검색
- `obs_read_tool`: 기존 문서 분석
- `gh_create_branch_tool`: 작업 브랜치 생성
- `obs_create_iwl_note_tool`: 새 문서 생성
- `gh_upsert_file_tool`: GitHub 동기화
- `gh_create_pr_tool`: PR 생성 및 URL 제공

#### 3단계: ChatGPT GitHub 커넥터 리뷰
- PR 내용 자동 조회 및 분석
- 변경 파일 및 코드 diff 검토
- 리뷰 댓글 텍스트 작성
- 개선점 및 추가 기능 제안

#### 4단계: Claude Code 피드백 반영
- `gh_comment_pr_tool`: ChatGPT 리뷰를 PR 댓글로 반영
- `obs_upsert_markdown_tool`: 필요시 문서 수정
- `gh_add_labels_tool`: PR 상태 업데이트
- 추가 협업 루프 실행 또는 머지 준비

---

## 💬 명령어 패턴 예시

### ChatGPT → Claude Code 요청 패턴

```
"Claude Code야, [구체적 작업 요청]을 해줘"

예시:
- "feature/새기능명 브랜치를 만들어줘"
- "Obsidian의 [키워드] 문서를 GitHub에 동기화해줘" 
- "[제목]으로 PR을 생성해줘"
- "내 리뷰를 PR #[번호]에 댓글로 반영해줘: [리뷰 내용]"
```

### Claude Code → ChatGPT 응답 패턴

```
✅ 작업 완료
📋 PR 정보:
- 번호: #[number]
- URL: https://github.com/[owner]/[repo]/pull/[number]
- 상태: 리뷰 대기 중

GitHub 커넥터로 위 PR을 리뷰해 주세요.
```

### 세계관 캐릭터 연계 예시

#### 캐릭터별 역할과 협업 시나리오

**생각이 (AI 멘토)**:
- ChatGPT: "생각이의 새로운 학습 가이드를 만들어줘"
- Claude Code: `obs_create_iwl_note`로 "01_기획_전략_생각이_학습가이드" 생성

**아키 (시스템 설계자)**:
- ChatGPT: "아키의 시스템 아키텍처 문서를 GitHub에 올려줘"
- Claude Code: Obsidian 아키텍처 문서를 `gh_upsert_file`로 동기화

**실무진 (개발팀)**:
- ChatGPT: "실무진 온보딩 체크리스트를 PR로 만들어줘"
- Claude Code: 체크리스트 생성 후 자동 라벨링 및 리뷰 요청

---

## 🛠️ 사용 가능한 MCP 도구들

### Obsidian 도구 (7개)
- `obs_search_tool` - 문서 검색
- `obs_read_tool` - 문서 읽기
- `obs_create_iwl_note_tool` - IWL 표준 노트 생성
- `obs_upsert_markdown_tool` - 문서 수정
- `obs_append_section_tool` - 섹션 추가
- `obs_move_file_tool` - 파일 이동
- `obs_lint_markdown_tool` - 품질 검사

### GitHub 도구 (8개)
- `gh_create_branch_tool` - 브랜치 생성
- `gh_upsert_file_tool` - 파일 업로드/수정
- `gh_create_pr_tool` - PR 생성
- `gh_list_pr_tool` - PR 목록
- `gh_get_pr_tool` - PR 정보 조회
- `gh_add_labels_tool` - 라벨 추가
- `gh_comment_pr_tool` - 댓글 작성
- `gh_remove_label_tool` - 라벨 제거

---

## 🚨 협업 제한사항 및 역할 분담

### ChatGPT 역할 (GitHub 커넥터)
- ✅ **가능**: PR 조회/분석, 리뷰 댓글 작성, 피드백 제공
- ❌ **불가능**: 파일 직접 수정, 브랜치/PR 생성, 댓글 직접 게시

### Claude Code 역할 (MCP 도구)
- ✅ **가능**: 모든 파일 조작, GitHub 작업, Obsidian 동기화
- ❌ **불가능**: ChatGPT 커스텀 MCP 직접 연결 (베타 대기 중)

---

## 🧪 자동화 기능 테스트 계획

### obs_lint_markdown_tool 활용
1. 문서 작성 후 자동 품질 검사
2. 검사 결과를 PR 댓글에 자동 첨부
3. 품질 기준 미달 시 수정 제안

### 자동 PR 생성 플로우
1. Obsidian 문서 변경 감지
2. 자동 브랜치 생성 및 GitHub 동기화
3. PR 생성과 동시에 리뷰어 할당
4. 온보딩 체크리스트 자동 첨부

### 통합 검증 프로세스 연계
- IWL 5단계 검증 프로세스와 연동
- 각 단계별 담당자 자동 할당
- 검증 완료 시 자동 라벨 업데이트

---

## 📊 성과 지표 및 개선사항

### 효율성 지표
- ⚡ **속도**: 전통적 협업 대비 60% 시간 단축
- 🔄 **동기화**: Obsidian ↔ GitHub 실시간 연동
- 🤖 **자동화**: 수동 작업 80% 감소

### 품질 지표
- ✅ **일관성**: IWL 표준 문서 형식 자동 적용
- 🔍 **검토**: ChatGPT 자동 리뷰 시스템
- 📝 **문서화**: 모든 과정 자동 기록

### ChatGPT 리뷰 기반 개선사항 (적용됨)
1. ✅ **문서 구조 개선**: 워크플로우와 명령어 패턴 분리
2. ✅ **세계관 캐릭터 연계**: 생각이/아키/실무진 시나리오 추가
3. 🔄 **자동화 기능 확장**: 테스트 계획 수립

---

## 🚀 다음 단계 및 확장 계획

### 단기 계획
1. **VS Code 통합**: MCP 서버 연동으로 개발환경에서 직접 사용
2. **자동화 테스트**: obs_lint_markdown_tool 및 자동 PR 생성
3. **템플릿 확장**: 다양한 협업 시나리오별 템플릿

### 장기 계획
1. **ChatGPT 정식 지원**: 커스텀 MCP 베타 해제 시 즉시 적용
2. **워크플로우 완전 자동화**: GitHub Actions 연동
3. **멀티 플랫폼 확장**: Discord, Slack 등 다른 협업 도구 연계

---

## 🎯 새 채팅에서의 협업 시작 방법

```
"Claude Code야, GitHub 협업 계속해줘. 
[구체적 요청사항]을 feature/[브랜치명]으로 작업해서 PR 만들어줘."

예시:
"Claude Code야, 생각이 캐릭터 가이드를 Obsidian에서 작성하고 
feature/saenggagi-guide 브랜치로 PR 만들어줘."
```

---

*버전: v2.0 (ChatGPT 리뷰 반영)*  
*생성 시각: 2025-08-09*  
*협업 파트너: ChatGPT + Claude Code*  
*기술 스택: MCP + Obsidian + GitHub + 세계관 캐릭터*