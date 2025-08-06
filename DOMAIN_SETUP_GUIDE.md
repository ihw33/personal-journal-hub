# [인프라-001] ideaworklab.com 커스텀 도메인 연결 가이드

**작성일:** 2025년 8월 6일  
**작성자:** Claude Code  
**대상:** 토마스님 (PM)  
**목적:** ideaworklab.com → personal-journal-hub.vercel.app 연결

---

## 📋 준비사항 체크리스트

- [ ] ideaworklab.com 도메인 관리자 권한 보유
- [ ] Vercel 프로젝트 대시보드 접근 권한
- [ ] 도메인 등록 업체 로그인 정보 확인

---

## 🚀 전체 설정 과정 개요

**소요 시간:** 약 10-15분 (DNS 전파 시간 제외)  
**난이도:** ⭐⭐☆☆☆ (초보자 가능)

1. Vercel에서 DNS 정보 확인
2. 도메인 등록 업체에서 DNS 레코드 설정
3. 설정 확인 및 테스트

---

## 1단계: Vercel에서 DNS 정보 확인하기

### 1.1 Vercel 대시보드 접속
1. [https://vercel.com](https://vercel.com)에 로그인
2. `personal-journal-hub` 프로젝트 선택
3. 상단 메뉴에서 **Settings** 클릭
4. 좌측 메뉴에서 **Domains** 선택

### 1.2 도메인 추가 및 DNS 정보 획득
1. **Add Domain** 버튼 클릭
2. `ideaworklab.com` 입력 후 **Add** 클릭
3. **DNS Records** 탭에서 다음 정보 확인 및 복사:

```
📝 복사해야 할 정보:
A Record IP 주소: [Vercel에서 표시되는 IP 주소]
CNAME Value: [Vercel에서 제공하는 고유 CNAME 값]
```

⚠️ **중요:** 위 정보는 프로젝트마다 다릅니다. 반드시 본인 프로젝트에서 표시되는 값을 사용하세요.

---

## 2단계: 도메인 등록 업체 로그인 및 DNS 설정

### 2.1 주요 도메인 업체별 접속 방법

#### 🔹 GoDaddy 사용자
1. [https://godaddy.com](https://godaddy.com) → 로그인
2. **My Products** → **DNS** 클릭
3. `ideaworklab.com` 옆의 **Manage DNS** 선택

#### 🔹 가비아 사용자
1. [https://www.gabia.com](https://www.gabia.com) → 로그인
2. **나의 서비스 관리** → **도메인** 선택
3. `ideaworklab.com` 옆의 **관리** → **DNS 정보** 클릭

#### 🔹 Namecheap 사용자
1. [https://namecheap.com](https://namecheap.com) → 로그인
2. **Domain List** → `ideaworklab.com` **Manage** 클릭
3. **Advanced DNS** 탭 선택

#### 🔹 Cloudflare 사용자
1. [https://dash.cloudflare.com](https://dash.cloudflare.com) → 로그인
2. `ideaworklab.com` 도메인 선택
3. **DNS** → **Records** 탭 이동

---

## 3단계: A 레코드 설정 (루트 도메인용)

### 3.1 A 레코드 추가
**목적:** `ideaworklab.com`을 Vercel에 연결

1. DNS 관리 화면에서 **Add Record** 또는 **레코드 추가** 클릭
2. 다음 값 입력:

```
Type (종류): A
Name (이름/호스트): @ 또는 빈칸
Value (값/주소): [1단계에서 복사한 Vercel IP 주소]
TTL: 자동 또는 3600
```

### 3.2 설정 예시 화면

```
┌─────────────────────────────────────┐
│ DNS 레코드 추가                        │
├─────────────────────────────────────┤
│ Type: [A            ▼]              │
│ Name: [@                          ] │
│ Value: [76.223.125.115            ] │ ← 예시 IP
│ TTL:  [Auto        ▼]              │
│                                     │
│ [Save] [Cancel]                     │
└─────────────────────────────────────┘
```

---

## 4단계: CNAME 레코드 설정 (www 서브도메인용)

### 4.1 CNAME 레코드 추가
**목적:** `www.ideaworklab.com`을 Vercel에 연결

1. **Add Record** 또는 **레코드 추가** 다시 클릭
2. 다음 값 입력:

```
Type (종류): CNAME
Name (이름/호스트): www
Value (값/주소): [1단계에서 복사한 Vercel CNAME 값]
TTL: 자동 또는 3600
```

### 4.2 설정 예시 화면

```
┌─────────────────────────────────────┐
│ DNS 레코드 추가                        │
├─────────────────────────────────────┤
│ Type: [CNAME        ▼]              │
│ Name: [www                        ] │
│ Value: [cname.vercel-dns.com      ] │ ← 예시값
│ TTL:  [Auto        ▼]              │
│                                     │
│ [Save] [Cancel]                     │
└─────────────────────────────────────┘
```

---

## 5단계: SSL 인증서를 위한 CAA 레코드 (선택사항)

### 5.1 기존 CAA 레코드 확인
현재 DNS에 CAA 레코드가 있는지 확인하세요.

### 5.2 CAA 레코드 추가 (기존 CAA가 있는 경우만)
```
Type: CAA
Name: @ 또는 빈칸
Value: 0 issue "letsencrypt.org"
TTL: 3600
```

---

## 6단계: 최종 확인 및 테스트

### 6.1 DNS 전파 대기
⏰ **소요시간:** 5분 ~ 48시간 (보통 30분 이내)

### 6.2 설정 확인 방법

#### 방법 1: 온라인 DNS 체커 사용
1. [https://dnschecker.org](https://dnschecker.org) 접속
2. `ideaworklab.com` 입력 후 A 레코드 체크
3. 전 세계 DNS 서버에서 올바른 IP가 표시되는지 확인

#### 방법 2: 명령어로 확인 (Windows)
```cmd
nslookup ideaworklab.com
nslookup www.ideaworklab.com
```

#### 방법 3: 명령어로 확인 (Mac/Linux)
```bash
dig ideaworklab.com
dig www.ideaworklab.com
```

### 6.3 성공 시 예상 결과
- ✅ `ideaworklab.com` → Vercel IP 주소 반환
- ✅ `www.ideaworklab.com` → Vercel CNAME 반환
- ✅ 브라우저에서 정상 페이지 로드

---

## 🚨 문제 해결 가이드

### 문제 1: "Domain not found" 오류
**원인:** DNS 전파 미완료  
**해결:** 30분~2시간 대기 후 재시도

### 문제 2: SSL 인증서 오류
**원인:** CAA 레코드 충돌  
**해결:** CAA 레코드에 `letsencrypt.org` 추가

### 문제 3: A 레코드 설정 실패
**원인:** 잘못된 IP 주소 입력  
**해결:** Vercel 대시보드에서 IP 주소 재확인

### 문제 4: CNAME 충돌 오류
**원인:** @ 레코드에 CNAME 설정 시도  
**해결:** 루트 도메인은 반드시 A 레코드 사용

---

## 📞 지원 연락처

### Vercel 지원
- **문서:** [https://vercel.com/docs/domains](https://vercel.com/docs/domains)
- **지원팀:** [help@vercel.com](mailto:help@vercel.com)

### 도메인 업체별 지원
- **GoDaddy:** 1-480-505-8877
- **가비아:** 02-2106-5555  
- **Namecheap:** Live Chat 24/7
- **Cloudflare:** [support.cloudflare.com](https://support.cloudflare.com)

---

## ✅ 완료 체크리스트

최종 점검용 체크리스트:

- [ ] A 레코드 설정 완료 (`@` → Vercel IP)
- [ ] CNAME 레코드 설정 완료 (`www` → Vercel CNAME)
- [ ] CAA 레코드 설정 완료 (필요시)
- [ ] DNS 전파 확인 완료
- [ ] `ideaworklab.com` 접속 테스트 성공
- [ ] `www.ideaworklab.com` 접속 테스트 성공
- [ ] SSL 인증서 적용 확인

---

## 📝 설정 기록 템플릿

향후 참조용으로 아래 정보를 기록해 두세요:

```
=== ideaworklab.com DNS 설정 기록 ===
설정일자: _______________
Vercel IP 주소: _______________
Vercel CNAME: _______________
도메인 업체: _______________
완료 시간: _______________
```

---

**🎉 축하합니다!** 
모든 설정이 완료되면 `ideaworklab.com`으로 Coming Soon 페이지에 접속할 수 있습니다.

---

*이 가이드는 2025년 8월 기준 Vercel 최신 설정을 반영했습니다. Vercel 정책 변경 시 일부 내용이 달라질 수 있습니다.*