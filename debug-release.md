# 릴리즈 노트 생성 디버깅

## 확인해야 할 사항들:

### 1. GitHub Actions 확인
- Actions 탭에서 "IWL Release Flow" 워크플로우 상태 확인
- 에러 로그가 있다면 세부 내용 확인

### 2. 권한 확인
- Repository Settings → Actions → General
- Workflow permissions가 "Read and write permissions"로 설정되어 있는지 확인

### 3. 수동 실행 옵션
만약 자동 실행이 안 된다면, Actions 탭에서 수동으로 실행 가능

### 4. 대안 방법
- GitHub CLI를 사용한 수동 릴리즈 생성
- 웹 인터페이스에서 직접 릴리즈 생성

현재 시각: $(date)