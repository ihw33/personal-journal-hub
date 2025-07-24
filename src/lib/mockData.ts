// 더미 데이터와 로컬 저장소를 관리하는 파일

interface Journal {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: string;
  published_at: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// 더미 데이터
const dummyJournals = [
  {
    id: '1',
    title: '개인 저널 허브에 오신 것을 환영합니다',
    content: `# 개인 저널 허브에 오신 것을 환영합니다!

안녕하세요! 이곳은 개인 저널 허브입니다.

## 주요 기능

- **마크다운 지원**: 풍부한 텍스트 표현이 가능합니다
- **카테고리별 분류**: 글을 체계적으로 관리할 수 있습니다  
- **반응형 디자인**: 모든 기기에서 최적화된 경험을 제공합니다

### 코드 예제

\`\`\`javascript
console.log('Hello, Journal Hub!');
\`\`\`

이제 저널 작성을 시작해보세요!`,
    excerpt: '개인 저널 허브의 주요 기능을 소개합니다.',
    category: '공지',
    status: 'published',
    published_at: '2024-01-15T09:00:00Z',
    user_id: '00000000-0000-0000-0000-000000000000',
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-16T10:30:00Z'
  },
  {
    id: '2',
    title: '마크다운 사용법 가이드',
    content: `# 마크다운 사용법 가이드

마크다운을 사용하면 텍스트를 **굵게**, *기울임꼴*로 만들 수 있습니다.

## 목록 만들기

### 순서가 있는 목록
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

### 순서가 없는 목록
- 항목 1
- 항목 2
- 항목 3

## 링크와 이미지
[링크 텍스트](https://example.com)

## 코드 블록
\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

> 인용문도 사용할 수 있습니다.`,
    excerpt: '마크다운 문법을 활용한 글쓰기 방법을 알아보세요.',
    category: '개발',
    status: 'published',
    published_at: '2024-01-14T14:20:00Z',
    user_id: '00000000-0000-0000-0000-000000000000',
    created_at: '2024-01-14T14:20:00Z',
    updated_at: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    title: '일상 속 작은 행복 찾기',
    content: `# 일상 속 작은 행복 찾기

오늘은 평범한 하루였지만, 작은 행복들을 발견할 수 있었습니다.

## 오늘의 순간들

**아침**: 따뜻한 커피 한 잔과 함께 시작한 하루
**점심**: 친구와의 즐거운 대화
**저녁**: 아름다운 일몰을 바라보며 느낀 평온함

이런 작은 순간들이 모여 우리의 삶을 풍요롭게 만든다고 생각합니다.

---

*"행복은 멀리 있지 않다. 지금 이 순간에 있다."*`,
    excerpt: '평범한 일상에서 찾은 소소한 행복들을 공유합니다.',
    category: '일상',
    status: 'published',
    published_at: '2024-01-13T18:45:00Z',
    user_id: '00000000-0000-0000-0000-000000000000',  
    created_at: '2024-01-13T18:45:00Z',
    updated_at: '2024-01-13T18:45:00Z'
  },
  {
    id: '4',
    title: '독서노트: 좋은 책을 읽은 후',
    content: `# 독서노트: 좋은 책을 읽은 후

최근에 읽은 책에서 인상 깊었던 구절들을 정리해봅니다.

## 기억에 남는 문장들

> "책은 우리를 과거와 연결해주고, 미래를 상상하게 해준다."

이 문장이 특히 마음에 와닿았습니다.

## 나의 생각

책을 읽으면서 느낀 점:
- 새로운 관점을 얻을 수 있었음
- 일상의 문제들에 대한 해답을 찾을 수 있었음
- 다른 사람들의 경험을 간접적으로 체험할 수 있었음

독서는 정말 소중한 시간이라고 생각합니다.`,
    excerpt: '최근 읽은 책에서 얻은 인사이트와 감상을 나눕니다.',
    category: '독서',
    status: 'draft',
    published_at: '2024-01-12T16:15:00Z',
    user_id: '00000000-0000-0000-0000-000000000000',
    created_at: '2024-01-12T16:15:00Z',
    updated_at: '2024-01-12T16:15:00Z'
  }
]

// 전역 저장소 - 배열 자체는 const이지만 내용은 변경 가능
const journalStorage = [...dummyJournals]

// 저널 관리 함수들
export const journalStore = {
  // 모든 저널 가져오기
  getAll: () => [...journalStorage],
  
  // ID로 저널 찾기
  findById: (id: string) => journalStorage.find(j => j.id === id),
  
  // 새 저널 추가
  add: (journal: Journal) => {
    journalStorage.unshift(journal)
    return journal
  },
  
  // 저널 수정
  update: (id: string, updates: Partial<Journal>) => {
    const index = journalStorage.findIndex(j => j.id === id)
    if (index !== -1) {
      journalStorage[index] = {
        ...journalStorage[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      return journalStorage[index]
    }
    return null
  },
  
  // 저널 삭제
  delete: (id: string) => {
    const index = journalStorage.findIndex(j => j.id === id)
    if (index !== -1) {
      const deleted = journalStorage.splice(index, 1)[0]
      return deleted
    }
    return null
  }
}