/**
 * ===================================================================
 * IdeaWorkLab v3.2 Journal Detail Page Component
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * v3.0 Architect Design System + 가독성 최적화
 * ===================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  BookOpen,
  User,
  Tag,
  Brain,
  Edit,
  MoreHorizontal,
  Play,
  Download,
  ExternalLink,
  Bookmark,
  Printer,
  MessageSquare,
  ThumbsUp,
  Star,
  Zap,
  Target,
  Lightbulb,
  BarChart3,
  TrendingUp,
  ChevronRight,
  FileText,
  CheckSquare,
  HelpCircle,
  Coffee,
  Headphones,
  Volume2,
  VolumeX,
  Maximize,
  ChevronDown,
  ChevronUp,
  Quote
} from 'lucide-react';
import { ErrorBoundary, JournalErrorFallback } from '../common/ErrorBoundary';
import { getPostById, type JournalPost as SupabaseJournalPost } from '@/lib/supabase/journal';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface JournalDetailPageProps {
  journalId: string;
  user?: any;
  onNavigate: (page: string, params?: any) => void;
  language: 'ko' | 'en';
}

interface DownloadResource {
  id: string;
  title: string;
  type: 'template' | 'checklist' | 'guide' | 'worksheet';
  description: string;
  fileSize: string;
  downloadCount: number;
  url: string;
}

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    verified: boolean;
  };
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

/**
 * v3.2 저널 상세 페이지 컴포넌트
 * 가독성 최적화 및 Architect Design System 완전 적용
 */
export const JournalDetailPage: React.FC<JournalDetailPageProps> = ({
  journalId,
  user,
  onNavigate,
  language
}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  // State for real data
  const [journal, setJournal] = useState<SupabaseJournalPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showToc, setShowToc] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // 다국어 콘텐츠
  const content = {
    ko: {
      back: '목록으로 돌아가기',
      author: '작성자',
      publishedAt: '발행일',
      readTime: '읽는 시간',
      views: '조회수',
      likes: '좋아요',
      comments: '댓글',
      tags: '태그',
      aiAssisted: 'AI 협업',
      readingProgress: '읽기 진행률',
      tableOfContents: '목차',
      actions: {
        like: '좋아요',
        unlike: '좋아요 취소',
        bookmark: '북마크',
        share: '공유하기',
        edit: '수정하기',
        print: '인쇄하기',
        listen: '음성 듣기',
        stopListen: '음성 중지',
        fullscreen: '전체화면',
        download: '다운로드',
        copy: '링크 복사'
      },
      sections: {
        overview: '개요',
        content: '본문',
        resources: '다운로드 자료',
        video: '관련 영상',
        keyInsights: '핵심 인사이트',
        relatedJournals: '관련 저널',
        comments: '댓글',
        authorProfile: '작성자 프로필'
      },
      aiInsight: 'AI 분석',
      aiSummary: '이 저널의 핵심 아이디어와 통찰을 AI가 분석했습니다.',
      keyPoints: '핵심 포인트',
      suggestions: '추천 학습',
      readingTime: '읽기 시간',
      difficulty: '난이도',
      category: '카테고리',
      downloadResources: '다운로드 자료',
      relatedContent: '관련 콘텐츠',
      shareThis: '이 저널 공유하기',
      copyLink: '링크가 복사되었습니다',
      noComments: '아직 댓글이 없습니다',
      writeComment: '댓글 작성하기',
      showReplies: '답글 보기',
      hideReplies: '답글 숨기기',
      moreJournals: '더 많은 저널 보기',
      estimatedTime: '예상 소요 시간',
      prerequisites: '사전 요구사항',
      learningObjectives: '학습 목표',
      practicalTips: '실무 팁'
    },
    en: {
      back: 'Back to List',
      author: 'Author',
      publishedAt: 'Published',
      readTime: 'Read Time',
      views: 'Views',
      likes: 'Likes',
      comments: 'Comments',
      tags: 'Tags',
      aiAssisted: 'AI Assisted',
      readingProgress: 'Reading Progress',
      tableOfContents: 'Table of Contents',
      actions: {
        like: 'Like',
        unlike: 'Unlike',
        bookmark: 'Bookmark',
        share: 'Share',
        edit: 'Edit',
        print: 'Print',
        listen: 'Listen',
        stopListen: 'Stop',
        fullscreen: 'Fullscreen',
        download: 'Download',
        copy: 'Copy Link'
      },
      sections: {
        overview: 'Overview',
        content: 'Content',
        resources: 'Download Resources',
        video: 'Related Video',
        keyInsights: 'Key Insights',
        relatedJournals: 'Related Journals',
        comments: 'Comments',
        authorProfile: 'Author Profile'
      },
      aiInsight: 'AI Analysis',
      aiSummary: 'AI has analyzed the key ideas and insights from this journal.',
      keyPoints: 'Key Points',
      suggestions: 'Recommended Learning',
      readingTime: 'Reading Time',
      difficulty: 'Difficulty',
      category: 'Category',
      downloadResources: 'Download Resources',
      relatedContent: 'Related Content',
      shareThis: 'Share this journal',
      copyLink: 'Link copied to clipboard',
      noComments: 'No comments yet',
      writeComment: 'Write a comment',
      showReplies: 'Show replies',
      hideReplies: 'Hide replies',
      moreJournals: 'More journals',
      estimatedTime: 'Estimated Time',
      prerequisites: 'Prerequisites',
      learningObjectives: 'Learning Objectives',
      practicalTips: 'Practical Tips'
    }
  };

  const t = content[language];

  // Load journal data from Supabase
  useEffect(() => {
    const loadJournal = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await getPostById(journalId, user);
        setJournal(data);
        
        // Set user interactions
        if (data.user_liked !== undefined) {
          setLiked(data.user_liked);
        }
        if (data.user_bookmarked !== undefined) {
          setBookmarked(data.user_bookmarked);
        }
      } catch (err) {
        console.error('Error loading journal:', err);
        setError(err instanceof Error ? err.message : '저널을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (journalId) {
      loadJournal();
    }
  }, [journalId, user]);

  // Early return if loading or error
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-architect-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-h3 font-bold text-architect-gray-900 mb-2">
            저널 로딩 중...
          </h1>
          <p className="text-body text-architect-gray-600">
            잠시만 기다려주세요
          </p>
        </div>
      </div>
    );
  }

  if (error || !journal) {
    return (
      <JournalErrorFallback 
        error={new Error(error || '저널을 찾을 수 없습니다')} 
        retry={() => {
          setError(null);
          // Trigger reload
          window.location.reload();
        }} 
      />
    );
  }

  // Create a mock journal object for now to maintain existing functionality
  const mockJournal = {
    id: journalId,
    title: 'AI와 함께 제주도 여행 계획 세우기: 창의적 사고법 실습',
    excerpt: 'AI 파트너와 함께 효과적인 제주도 여행 계획을 세우는 과정을 통해 창의적 사고법을 학습했습니다.',
    content: `
# 창의적 사고의 시작

여행 계획을 세우는 것은 단순히 장소와 일정을 정하는 것이 아닙니다. 이번 AI 협업 학습을 통해 제주도 여행 계획을 세우는 과정에서 창의적 사고의 진정한 힘을 경험했습니다.

## Phase 1: 문제 정의와 목표 설정

### 명확한 질문하기의 중요성

처음에는 단순히 "제주도 여행 계획을 세워줘"라고 AI에게 요청했습니다. 하지만 이런 막연한 질문으로는 만족스러운 답변을 얻을 수 없었습니다.

**개선된 질문 방식:**
- 여행의 목적이 무엇인가? (휴식, 모험, 학습, 문화체험)
- 함께 가는 사람은 누구인가? (가족, 친구, 연인, 혼자)
- 예산과 기간은 어떻게 되는가?
- 선호하는 활동 유형은 무엇인가?

이렇게 구체적인 맥락을 제공하자 AI가 훨씬 유용한 답변을 제공했습니다.

### 창의적 제약 조건 설정

제약이 창의성을 방해한다고 생각하기 쉽지만, 실제로는 적절한 제약이 더 창의적인 해결책을 이끌어냅니다.

> "제약은 창의성의 적이 아니라 친구다" - 스콧 벨스키

**설정한 창의적 제약들:**
1. 대중교통만 이용하기
2. 현지인이 추천하는 숨은 명소 찾기
3. 하루 예산 10만원 이하로 제한
4. 매일 새로운 음식 3가지 이상 시도하기

## Phase 2: 창의적 아이디어 발산

### 브레인스토밍의 새로운 차원

AI와 함께하는 브레인스토밍은 혼자 하는 것과는 차원이 다릅니다. AI는 다음과 같은 역할을 했습니다:

1. **아이디어 촉진자**: 예상치 못한 연결고리 제시
2. **정보 제공자**: 실시간 데이터와 통계 제공
3. **비판적 검토자**: 아이디어의 실현 가능성 검토
4. **확장 제안자**: 기본 아이디어를 더 발전시킨 버전 제시

### 혁신적 여행 아이디어들

**전통과 현대의 융합:**
- 해녀 할머니와 함께하는 바다 속 명상 체험
- 제주 방언으로 진행되는 오름 트레킹
- 현대 아티스트와 함께하는 돌하르방 재해석 워크숍

**지속가능 여행:**
- 제로 웨이스트 제주 여행 챌린지
- 전기차 렌탈로 섬 한 바퀴 돌기
- 로컬 농장에서 수확 체험 후 요리하기

**교육적 여행:**
- 제주의 화산 지형을 활용한 지질학 탐험
- 제주 4.3 역사 현장 답사
- 제주 전통 문화 장인과의 만남

## Phase 3: 분석적 검토와 실행 계획

### 아이디어 평가 매트릭스

발산한 아이디어들을 체계적으로 평가하기 위해 다음 기준을 사용했습니다:

| 기준 | 가중치 | 평가 방법 |
|------|--------|-----------|
| 실현 가능성 | 30% | 시간, 비용, 접근성 |
| 독창성 | 25% | 차별화 정도, 새로운 경험 |
| 학습 가치 | 25% | 지식 습득, 성장 기회 |
| 즐거움 | 20% | 재미, 만족도 예상 |

### 최종 여행 계획

**Day 1: 도착과 적응**
- 공항에서 전기버스로 이동
- 현지 게스트하우스 체크인 (현지인 운영)
- 동문시장에서 흑돼지 고기국수 첫 식사
- 용두암 일몰 감상 + 제주 방언 배우기

**Day 2: 자연과 문화**
- 새벽 성산일출봉 등반
- 해녀박물관 견학 후 실제 해녀 할머니와 대화
- 비자림 산책 (음이온 치료)
- 저녁: 해산물 직판장에서 자연산 회

**Day 3: 체험과 학습**
- 한라산 윗세오름 트레킹
- 제주 전통 옹기 만들기 체험
- 서귀포 매일올레시장 탐방
- 정방폭포에서 명상

## 핵심 인사이트

### 1. 질문의 질이 답변의 질을 결정한다

AI와의 협업에서 가장 중요한 것은 **좋은 질문을 하는 능력**입니다. 모호한 질문은 모호한 답변을 가져옵니다.

### 2. 제약이 창의성을 촉진한다

무제한의 자유보다는 적절한 제약 조건이 더 창의적인 해결책을 만들어냅니다.

### 3. AI는 도구가 아닌 파트너다

AI를 단순한 정보 검색 도구로 사용하는 것이 아니라, 창의적 사고의 파트너로 활용할 때 진정한 시너지가 발생합니다.

### 4. 과정이 결과만큼 중요하다

여행 계획을 세우는 과정 자체에서 얻은 학습과 성장이 실제 여행만큼 가치있었습니다.

## 실무 적용 방안

이번 경험을 통해 배운 창의적 사고법은 여행 계획뿐만 아니라 다양한 비즈니스 상황에서도 적용할 수 있습니다:

1. **프로젝트 기획**: 명확한 목표 설정과 창의적 제약 조건 활용
2. **문제 해결**: 다각도 분석과 AI 도구 활용
3. **팀 브레인스토밍**: 체계적 아이디어 발산과 평가
4. **의사결정**: 데이터 기반 합리적 선택

## 다음 단계

이제 실제로 제주도 여행을 떠나면서 이 계획을 실행해볼 예정입니다. 그 경험을 바탕으로 다음 AI 협업 프로젝트도 시작해보겠습니다.

**예정된 프로젝트들:**
- AI와 함께하는 창업 아이템 발굴
- 개인 브랜딩 전략 수립
- 새로운 취미 활동 기획

여러분도 일상의 작은 계획부터 AI와 함께 창의적으로 접근해보시기 바랍니다. 놀라운 결과를 경험하실 수 있을 것입니다.
    `,
    author: {
      id: 'expert-1',
      name: '김지은',
      avatar: '',
      bio: 'AI 협업 학습 전문가 · 창의적 사고법 연구자',
      expertise: ['AI 협업', '창의적 사고', '여행 기획', '문제 해결'],
      experience: '5년차 UX 디자이너',
      achievements: ['AI 협업 워크숍 100회 진행', '창의적 사고법 도서 저자', '테드 스피커'],
      verified: true,
      followers: 1250,
      following: 340,
      journalsCount: 28
    },
    publishedAt: '2024-01-25',
    updatedAt: '2024-01-25',
    readTime: 12,
    views: 1247,
    likes: 89,
    comments: 23,
    bookmarks: 45,
    shares: 12,
    category: 'creative',
    tags: ['여행계획', 'AI협업', '창의사고', '제주도', '문제해결', '브레인스토밍'],
    difficulty: 'intermediate',
    aiAssisted: true,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=400&fit=crop',
    videoId: 'dQw4w9WgXcQ',
    aiInsights: {
      summary: 'AI와의 협업을 통해 단순한 여행 계획을 넘어 창의적 사고법을 학습한 과정을 체계적으로 정리한 저널입니다.',
      keyPoints: [
        '질문의 질이 AI 협업의 핵심 성공 요인',
        'AI를 도구가 아닌 창의적 사고 파트너로 활용',
        '적절한 제약 조건이 더 창의적인 해결책 도출',
        '체계적인 아이디어 평가를 통한 실행 가능한 계획 수립',
        '과정 자체에서 얻는 학습 가치의 중요성'
      ],
      suggestions: [
        'Phase 2: 창의적 사고 심화 과정',
        'AI 프롬프트 엔지니어링 마스터 클래스',
        '분석적 사고와 의사결정 프레임워크',
        '팀 브레인스토밍 퍼실리테이션 스킬'
      ],
      difficulty: '중급',
      prerequisites: ['기본적인 AI 도구 사용 경험', '창의적 사고에 대한 관심'],
      learningObjectives: [
        'AI와의 효과적인 협업 방법 이해',
        '창의적 사고 과정의 체계화',
        '제약 조건을 활용한 아이디어 발상법',
        '아이디어 평가 및 실행 계획 수립'
      ],
      practicalTips: [
        '구체적이고 맥락이 풍부한 질문하기',
        '창의적 제약 조건 의도적으로 설정하기',
        '아이디어 평가 매트릭스 활용하기',
        '과정 자체를 학습 기회로 인식하기'
      ]
    },
    downloadResources: [
      {
        id: '1',
        title: '제주도 여행 계획 템플릿',
        type: 'template',
        description: '체계적인 여행 계획 수립을 위한 단계별 템플릿',
        fileSize: '2.3MB',
        downloadCount: 234,
        url: '#'
      },
      {
        id: '2',
        title: '창의적 사고 체크리스트',
        type: 'checklist',
        description: 'AI와 협업할 때 확인해야 할 핵심 포인트들',
        fileSize: '1.8MB',
        downloadCount: 189,
        url: '#'
      },
      {
        id: '3',
        title: '아이디어 평가 매트릭스',
        type: 'worksheet',
        description: '발산한 아이디어들을 체계적으로 평가하기 위한 워크시트',
        fileSize: '1.2MB',
        downloadCount: 156,
        url: '#'
      },
      {
        id: '4',
        title: 'AI 협업 가이드북',
        type: 'guide',
        description: 'AI와의 효과적인 협업을 위한 완전한 가이드',
        fileSize: '5.7MB',
        downloadCount: 312,
        url: '#'
      }
    ]
  };

  // Use real journal data when available, fallback to mock for gradual migration
  const displayJournal = journal || mockJournal;

  // Mock related journals
  const relatedJournals = [
    {
      id: '2',
      title: '복잡한 비즈니스 문제 해결하기: 8단계 체계적 분석법',
      author: '박민수',
      readTime: 10,
      views: 892,
      thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=200&fit=crop',
      category: 'business'
    },
    {
      id: '3',
      title: 'AI 프롬프트 엔지니어링: 효과적인 질문 설계법',
      author: '최영호',
      readTime: 8,
      views: 1156,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop',
      category: 'ai-collaboration'
    },
    {
      id: '4',
      title: '창의적 아이디어 발상법: AI 멘토와의 브레인스토밍',
      author: '이서연',
      readTime: 6,
      views: 634,
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      category: 'methodology'
    }
  ];

  // Mock comments
  const comments: Comment[] = [
    {
      id: '1',
      author: {
        id: 'user-1',
        name: '박서준',
        verified: false
      },
      content: '정말 체계적인 접근법이네요! AI와 함께 계획을 세우니까 혼자서는 생각하지 못했던 아이디어들이 나와서 놀랐어요. 특히 제약 조건을 의도적으로 설정하는 부분이 인상적입니다.',
      createdAt: '2024-01-26',
      likes: 12,
      replies: [
        {
          id: '1-1',
          author: {
            id: 'expert-1',
            name: '김지은',
            verified: true
          },
          content: '맞습니다! 제약이 오히려 창의성을 자극한다는 것을 경험으로 느끼실 수 있을 거예요. 다음에는 어떤 주제로 AI와 협업해보실 예정인가요?',
          createdAt: '2024-01-26',
          likes: 5
        }
      ]
    },
    {
      id: '2',
      author: {
        id: 'user-2',
        name: '윤미영',
        verified: false
      },
      content: '아이디어 평가 매트릭스가 특히 유용했어요. 숫자로 평가하니까 감정적인 판단보다는 객관적으로 선택할 수 있었습니다. 다운로드 자료도 잘 활용하고 있어요!',
      createdAt: '2024-01-26',
      likes: 8
    },
    {
      id: '3',
      author: {
        id: 'user-3',
        name: '이동훈',
        verified: false
      },
      content: '이 방법을 업무에도 적용해봤는데 정말 효과적이더라고요. 특히 프로젝트 기획할 때 AI와 함께 브레인스토밍하니까 아이디어의 질이 확실히 달라졌습니다.',
      createdAt: '2024-01-25',
      likes: 15
    }
  ];

  // Get category info
  const getCategoryInfo = (categoryId: string) => {
    const categories = {
      creative: { name: '창의적 사고', icon: Lightbulb, color: 'architect-warning' },
      business: { name: '비즈니스 전략', icon: TrendingUp, color: 'architect-success' },
      methodology: { name: '사고 방법론', icon: Brain, color: 'architect-accent' },
      'ai-collaboration': { name: 'AI 협업', icon: Zap, color: 'architect-ai-primary' }
    };
    return categories[categoryId as keyof typeof categories] || categories.creative;
  };

  const categoryInfo = getCategoryInfo(displayJournal.category);
  const Icon = categoryInfo.icon;

  const isAuthor = user?.id === displayJournal.author_id || user?.id === displayJournal.author?.id;

  // Table of contents
  const tableOfContents = [
    { id: 'phase1', title: 'Phase 1: 문제 정의와 목표 설정', level: 1 },
    { id: 'questions', title: '명확한 질문하기의 중요성', level: 2 },
    { id: 'constraints', title: '창의적 제약 조건 설정', level: 2 },
    { id: 'phase2', title: 'Phase 2: 창의적 아이디어 발산', level: 1 },
    { id: 'brainstorming', title: '브레인스토밍의 새로운 차원', level: 2 },
    { id: 'ideas', title: '혁신적 여행 아이디어들', level: 2 },
    { id: 'phase3', title: 'Phase 3: 분석적 검토와 실행 계획', level: 1 },
    { id: 'evaluation', title: '아이디어 평가 매트릭스', level: 2 },
    { id: 'plan', title: '최종 여행 계획', level: 2 },
    { id: 'insights', title: '핵심 인사이트', level: 1 },
    { id: 'application', title: '실무 적용 방안', level: 1 },
    { id: 'next', title: '다음 단계', level: 1 }
  ];

  // Handle actions
  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: displayJournal.title,
        text: journal.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  const handleDownload = (resource: any) => {
    // Simulate download
    console.log(`Downloading: ${resource.title}`);
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  // Render content with improved typography
  const renderContent = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('# ')) {
        return (
          <h1 key={index} className="text-architect-h1 font-architect-black text-architect-gray-900 mt-12 mb-6 leading-architect-tight">
            {trimmedLine.replace('# ', '')}
          </h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        return (
          <h2 key={index} className="text-architect-h2 font-architect-bold text-architect-gradient mt-10 mb-5 leading-architect-tight">
            {trimmedLine.replace('## ', '')}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        return (
          <h3 key={index} className="text-architect-h3 font-architect-semibold text-architect-gray-900 mt-8 mb-4 leading-architect-normal">
            {trimmedLine.replace('### ', '')}
          </h3>
        );
      } else if (trimmedLine.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-architect-accent bg-architect-accent/5 pl-6 py-4 my-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Quote className="w-6 h-6 text-architect-accent flex-shrink-0 mt-1" />
              <p className="text-architect-body-lg font-architect-medium text-architect-gray-800 italic leading-architect-relaxed">
                {trimmedLine.replace('> ', '')}
              </p>
            </div>
          </blockquote>
        );
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        return (
          <p key={index} className="text-architect-h4 font-architect-bold text-architect-gray-900 mt-6 mb-3">
            {trimmedLine.replace(/\*\*/g, '')}
          </p>
        );
      } else if (trimmedLine.match(/^\d+\./)) {
        return (
          <div key={index} className="flex items-start gap-3 ml-6 mb-3">
            <div className="w-6 h-6 bg-architect-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-architect-small font-architect-bold">
                {trimmedLine.match(/^(\d+)\./)?.[1]}
              </span>
            </div>
            <p className="text-architect-body text-architect-gray-700 leading-architect-relaxed">
              {trimmedLine.replace(/^\d+\.\s*/, '')}
            </p>
          </div>
        );
      } else if (trimmedLine.startsWith('- ')) {
        return (
          <div key={index} className="flex items-start gap-3 ml-6 mb-2">
            <div className="w-2 h-2 bg-architect-accent rounded-full flex-shrink-0 mt-2"></div>
            <p className="text-architect-body text-architect-gray-700 leading-architect-relaxed">
              {trimmedLine.replace('- ', '')}
            </p>
          </div>
        );
      } else if (trimmedLine.startsWith('|')) {
        // Simple table rendering - would need more sophisticated parsing in real implementation
        return (
          <div key={index} className="my-6 overflow-x-auto">
            <table className="w-full border-collapse border border-architect-gray-300 rounded-lg">
              <tbody>
                <tr className="bg-architect-gray-100">
                  {trimmedLine.split('|').filter(cell => cell.trim()).map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-architect-gray-300 px-4 py-3 text-architect-body font-architect-medium text-architect-gray-900">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      } else if (trimmedLine) {
        return (
          <p key={index} className="text-architect-body text-architect-gray-700 mb-4 leading-architect-relaxed">
            {trimmedLine}
          </p>
        );
      }
      
      return null;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={readingProgress} className="h-1 rounded-none progress-architect" />
      </div>

      {/* Header */}
      <section className="py-8 bg-white border-b border-architect-gray-300/30">
        <div className="container mx-auto">
          <Button
            variant="outline"
            onClick={() => onNavigate('journal')}
            className="mb-6 btn-architect-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Button>
          
          <div className="max-w-5xl">
            {/* Meta information */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <Badge variant="outline" className={`border-${categoryInfo.color} text-${categoryInfo.color} px-4 py-2`}>
                <Icon className="w-4 h-4 mr-2" />
                {categoryInfo.name}
              </Badge>
              {displayJournal.ai_assisted || displayJournal.aiAssisted && (
                <Badge className="bg-architect-ai-primary/10 text-architect-ai-primary border-architect-ai-primary/20 px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  {t.aiAssisted}
                </Badge>
              )}
              {journal.featured && (
                <Badge className="bg-architect-accent text-white px-4 py-2">
                  <Star className="w-4 h-4 mr-2" />
                  Featured
                </Badge>
              )}
              <Badge variant="outline" className="text-architect-small px-3 py-1">
                {t.difficulty}: {journal.aiInsights.difficulty}
              </Badge>
            </div>
            
            <h1 className="text-architect-h1 md:text-architect-hero font-architect-black text-architect-gray-900 mb-6 leading-architect-tight">
              {displayJournal.title}
            </h1>
            
            <p className="text-architect-body-lg text-architect-gray-700 mb-8 leading-architect-relaxed max-w-4xl">
              {journal.excerpt}
            </p>

            {/* Author and meta info */}
            <div className="flex flex-wrap items-center gap-6 text-architect-gray-600 mb-6">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={journal.author.avatar} />
                  <AvatarFallback className="bg-architect-primary/10 text-architect-primary">
                    {journal.author.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-architect-body font-architect-semibold text-architect-gray-900">
                      {journal.author.name}
                    </span>
                    {journal.author.verified && (
                      <div className="w-5 h-5 bg-architect-success rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="text-architect-small text-architect-gray-600">
                    {journal.author.bio}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="text-architect-small">{journal.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-architect-small">{journal.readTime}분 읽기</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span className="text-architect-small">{journal.views.toLocaleString()}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant={liked ? "default" : "outline"}
                onClick={handleLike}
                className={liked 
                  ? "bg-red-500 hover:bg-red-600 text-white" 
                  : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                }
              >
                <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                {liked ? t.actions.unlike : t.actions.like} ({journal.likes + (liked ? 1 : 0)})
              </Button>
              <Button
                variant={bookmarked ? "default" : "outline"}
                onClick={handleBookmark}
                className={bookmarked 
                  ? "bg-architect-accent hover:bg-architect-accent/90 text-white" 
                  : "border-architect-accent text-architect-accent hover:bg-architect-accent hover:text-white"
                }
              >
                <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? 'fill-current' : ''}`} />
                {t.actions.bookmark}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                {t.actions.share}
              </Button>
              <Button variant="outline" onClick={() => setShowToc(!showToc)}>
                <BookOpen className="w-4 h-4 mr-2" />
                {t.tableOfContents}
              </Button>
              {isAuthor && (
                <Button 
                  onClick={() => onNavigate('journal-editor', { journalId: journal.id })}
                  className="btn-architect-primary"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {t.actions.edit}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Video Section */}
            {journal.videoId && (
              <Card className="mb-8 overflow-hidden shadow-architect-lg">
                <div className="relative">
                  <div className="aspect-video bg-architect-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-architect-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                      <p className="text-architect-body font-architect-medium text-architect-gray-700 mb-2">
                        관련 영상 콘텐츠
                      </p>
                      <p className="text-architect-small text-architect-gray-600">
                        이 저널의 내용을 영상으로도 확인해보세요
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Table of Contents (expandable) */}
            {showToc && (
              <Card className="mb-8 shadow-architect-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-architect-primary" />
                    {t.tableOfContents}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block py-2 px-3 rounded-lg transition-colors hover:bg-architect-primary/5 ${
                          item.level === 1 
                            ? 'text-architect-body font-architect-semibold text-architect-gray-900' 
                            : 'text-architect-small text-architect-gray-700 ml-4'
                        }`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            )}

            {/* Main Article Content */}
            <Card className="mb-8 shadow-architect-lg">
              <CardContent className="p-8 lg:p-12">
                <article className="prose prose-lg max-w-none">
                  {renderContent(journal.content)}
                </article>
              </CardContent>
            </Card>

            {/* Download Resources */}
            {journal.downloadResources && journal.downloadResources.length > 0 && (
              <Card className="mb-8 shadow-architect-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-architect-accent" />
                    {t.downloadResources}
                  </CardTitle>
                  <CardDescription>
                    이 저널과 관련된 유용한 자료들을 다운로드하여 실무에 활용해보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {journal.downloadResources.map((resource) => {
                      const resourceIcon = {
                        template: FileText,
                        checklist: CheckSquare,
                        guide: HelpCircle,
                        worksheet: Edit
                      }[resource.type] || FileText;
                      const ResourceIcon = resourceIcon;

                      return (
                        <div key={resource.id} className="p-4 border-2 border-architect-gray-300 rounded-xl hover:border-architect-accent hover:bg-architect-accent/5 transition-all duration-300 group">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-architect-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-architect-accent group-hover:text-white transition-colors">
                              <ResourceIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-architect-body font-architect-semibold text-architect-gray-900 mb-1">
                                {resource.title}
                              </h4>
                              <p className="text-architect-small text-architect-gray-600 mb-2">
                                {resource.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-architect-xs text-architect-gray-500">
                                  <span>{resource.fileSize}</span>
                                  <span>{resource.downloadCount.toLocaleString()} 다운로드</span>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => handleDownload(resource)}
                                  className="bg-architect-accent hover:bg-architect-accent/90 text-white text-architect-small"
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  다운로드
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            <Card className="mb-8 shadow-architect-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-architect-gray-500" />
                  {t.tags}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {journal.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-architect-primary/10 hover:border-architect-primary hover:text-architect-primary transition-colors px-4 py-2"
                    >
                      <Tag className="w-3 h-3 mr-2" />
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="shadow-architect-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-architect-primary" />
                  {t.comments} ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {comments.length > 0 ? (
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border-b border-architect-gray-300/50 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-architect-primary/10 text-architect-primary">
                              {comment.author.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-architect-body font-architect-semibold text-architect-gray-900">
                                {comment.author.name}
                              </span>
                              {comment.author.verified && (
                                <div className="w-4 h-4 bg-architect-success rounded-full flex items-center justify-center">
                                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                              <span className="text-architect-small text-architect-gray-500">
                                {comment.createdAt}
                              </span>
                            </div>
                            <p className="text-architect-body text-architect-gray-700 mb-3 leading-architect-relaxed">
                              {comment.content}
                            </p>
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="text-architect-gray-600 hover:text-architect-primary">
                                <ThumbsUp className="w-4 h-4 mr-1" />
                                {comment.likes}
                              </Button>
                              {comment.replies && comment.replies.length > 0 && (
                                <Button variant="ghost" size="sm" className="text-architect-gray-600 hover:text-architect-primary">
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  {t.showReplies} ({comment.replies.length})
                                </Button>
                              )}
                            </div>
                            
                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="mt-4 ml-6 space-y-4">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className="flex items-start gap-3">
                                    <Avatar className="w-8 h-8">
                                      <AvatarFallback className="bg-architect-secondary/10 text-architect-secondary text-architect-small">
                                        {reply.author.name.slice(0, 2)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-architect-small font-architect-semibold text-architect-gray-900">
                                          {reply.author.name}
                                        </span>
                                        {reply.author.verified && (
                                          <div className="w-4 h-4 bg-architect-success rounded-full flex items-center justify-center">
                                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                          </div>
                                        )}
                                        <span className="text-architect-xs text-architect-gray-500">
                                          {reply.createdAt}
                                        </span>
                                      </div>
                                      <p className="text-architect-small text-architect-gray-700 leading-architect-relaxed">
                                        {reply.content}
                                      </p>
                                      <Button variant="ghost" size="sm" className="text-architect-gray-600 hover:text-architect-primary mt-2">
                                        <ThumbsUp className="w-3 h-3 mr-1" />
                                        {reply.likes}
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-architect-gray-300 mx-auto mb-4" />
                    <p className="text-architect-body text-architect-gray-600 mb-4">
                      {t.noComments}
                    </p>
                    <p className="text-architect-small text-architect-gray-500">
                      {t.writeComment}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Author Profile */}
            <Card className="shadow-architect-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-architect-primary" />
                  {t.author}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-4">
                    <AvatarImage src={journal.author.avatar} />
                    <AvatarFallback className="bg-architect-primary/10 text-architect-primary text-architect-h4">
                      {journal.author.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-architect-h4 font-architect-bold text-architect-gray-900">
                      {journal.author.name}
                    </h3>
                    {journal.author.verified && (
                      <div className="w-5 h-5 bg-architect-success rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-architect-small text-architect-gray-600 mb-4">
                    {journal.author.bio}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-architect-gray-300/50 mb-4">
                    <div className="text-center">
                      <div className="text-architect-h4 font-architect-bold text-architect-primary">
                        {journal.author.journalsCount}
                      </div>
                      <div className="text-architect-xs text-architect-gray-600">저널</div>
                    </div>
                    <div className="text-center">
                      <div className="text-architect-h4 font-architect-bold text-architect-primary">
                        {journal.author.followers.toLocaleString()}
                      </div>
                      <div className="text-architect-xs text-architect-gray-600">팔로워</div>
                    </div>
                    <div className="text-center">
                      <div className="text-architect-h4 font-architect-bold text-architect-primary">
                        {journal.author.following}
                      </div>
                      <div className="text-architect-xs text-architect-gray-600">팔로잉</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-architect-small font-architect-semibold text-architect-gray-900 mb-2">전문 분야</h4>
                      <div className="flex flex-wrap gap-2">
                        {journal.author.expertise.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-architect-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-architect-small font-architect-semibold text-architect-gray-900 mb-2">주요 성과</h4>
                      <ul className="space-y-1">
                        {journal.author.achievements.slice(0, 3).map((achievement, index) => (
                          <li key={index} className="text-architect-xs text-architect-gray-600 flex items-start gap-2">
                            <div className="w-1 h-1 bg-architect-accent rounded-full mt-2 flex-shrink-0"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button className="w-full mt-4 btn-architect-primary text-architect-small">
                    팔로우하기
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            {journal.aiInsights && (
              <Card className="bg-gradient-to-br from-architect-ai-primary/5 to-architect-primary/5 border-architect-ai-primary/20 shadow-architect-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-architect-ai-primary">
                    <Brain className="w-5 h-5" />
                    {t.aiInsight}
                  </CardTitle>
                  <CardDescription>
                    {t.aiSummary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Key Points */}
                  <div>
                    <h4 className="text-architect-body font-architect-semibold text-architect-gray-900 mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-architect-ai-primary" />
                      {t.keyPoints}
                    </h4>
                    <ul className="space-y-2">
                      {journal.aiInsights.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-architect-ai-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-architect-small text-architect-gray-700 leading-architect-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator className="bg-architect-ai-primary/20" />
                  
                  {/* Learning Objectives */}
                  <div>
                    <h4 className="text-architect-body font-architect-semibold text-architect-gray-900 mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-architect-success" />
                      {t.learningObjectives}
                    </h4>
                    <div className="space-y-2">
                      {journal.aiInsights.learningObjectives.map((objective, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-architect-success rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-architect-small text-architect-gray-700 leading-architect-relaxed">
                            {objective}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-architect-ai-primary/20" />
                  
                  {/* Practical Tips */}
                  <div>
                    <h4 className="text-architect-body font-architect-semibold text-architect-gray-900 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-architect-warning" />
                      {t.practicalTips}
                    </h4>
                    <div className="space-y-2">
                      {journal.aiInsights.practicalTips.map((tip, index) => (
                        <div key={index} className="p-3 bg-architect-warning/5 rounded-lg border border-architect-warning/20">
                          <span className="text-architect-small text-architect-gray-700 leading-architect-relaxed">
                            {tip}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-architect-ai-primary/20" />
                  
                  {/* Recommended Learning */}
                  <div>
                    <h4 className="text-architect-body font-architect-semibold text-architect-gray-900 mb-3">
                      {t.suggestions}
                    </h4>
                    <div className="space-y-2">
                      {journal.aiInsights.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-architect-small border-architect-ai-primary text-architect-ai-primary hover:bg-architect-ai-primary hover:text-white"
                          onClick={() => onNavigate('courses')}
                        >
                          <ChevronRight className="w-3 h-3 mr-2" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Journals */}
            <Card className="shadow-architect-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-architect-secondary" />
                  {t.relatedContent}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedJournals.map((related) => (
                    <div
                      key={related.id}
                      className="group cursor-pointer p-3 border border-architect-gray-300 rounded-xl hover:border-architect-primary hover:bg-architect-primary/5 transition-all duration-300"
                      onClick={() => onNavigate('journal-detail', { journalId: related.id })}
                    >
                      <div className="flex gap-3">
                        <ImageWithFallback
                          src={related.thumbnail}
                          alt={related.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-architect-small font-architect-semibold text-architect-gray-900 mb-1 line-clamp-2 group-hover:text-architect-primary transition-colors">
                            {related.title}
                          </h4>
                          <div className="flex items-center justify-between text-architect-xs text-architect-gray-500">
                            <span>{related.author}</span>
                            <div className="flex items-center gap-3">
                              <span>{related.readTime}분</span>
                              <span>{related.views.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 btn-architect-secondary"
                  onClick={() => onNavigate('journal')}
                >
                  {t.moreJournals}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 사용 예시:
 * 
 * // 기본 사용
 * <JournalDetailPage 
 *   journalId="1"
 *   onNavigate={navigate}
 *   language="ko"
 * />
 * 
 * // 로그인 사용자와 함께
 * <JournalDetailPage 
 *   journalId="1"
 *   user={currentUser}
 *   onNavigate={navigate}
 *   language="en"
 * />
 */

// Wrap the component with ErrorBoundary
const JournalDetailPageWithErrorBoundary: React.FC<JournalDetailPageProps> = (props) => (
  <ErrorBoundary 
    fallback={JournalErrorFallback}
    onError={(error, errorInfo) => {
      console.error('JournalDetailPage Error:', error, errorInfo);
      // Here you could send to logging service
    }}
  >
    <JournalDetailPage {...props} />
  </ErrorBoundary>
);

export { JournalDetailPageWithErrorBoundary as JournalDetailPage };
export default JournalDetailPageWithErrorBoundary;