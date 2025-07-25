'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  PlayCircle, 
  Download, 
  Search, 
  Filter, 
  Clock, 
  Eye, 
  BookOpen, 
  Star,
  Award,
  Users,
  TrendingUp,
  ExternalLink,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react';

interface JournalPageProps {
  language?: 'ko' | 'en';
}

// 모든 콘텐츠는 이상혁 저자가 직접 작성한 것으로 가정
const journalContent = {
  ko: {
    // 저자 권위 섹션
    authorSection: {
      title: "이상혁",
      subtitle: "AI 협력 생각정리 전문가",
      bookTitle: "『생각정리를 위한 노트의 기술』 저자",
      description: "기존 생각정리를 AI와 협력으로 진화시키는 방법을 연구하고 실천합니다.",
      stats: [
        { label: "구독자", value: "12.5K" },
        { label: "총 조회수", value: "250K" },
        { label: "강의 수강생", value: "1,200+" }
      ]
    },
    // 메인 헤더
    pageHeader: {
      title: "AI와 함께하는 깊이 있는 사고",
      subtitle: "유튜브 영상과 확장 자료로 배우는 AI 협력 생각정리법",
      description: "실전 사례, 도구 리뷰, AI 방법론을 통해 여러분의 사고력을 한 단계 업그레이드하세요"
    },
    // 필터 및 검색
    filters: {
      searchPlaceholder: "제목, 내용으로 검색...",
      categories: [
        { id: 'all', name: '전체', count: 24 },
        { id: 'ai-methodology', name: 'AI 방법론', count: 8 },
        { id: 'tool-review', name: '도구 리뷰', count: 6 },
        { id: 'case-study', name: '사례 분석', count: 5 },
        { id: 'deep-thinking', name: '깊이 있는 사고', count: 5 }
      ],
      sortOptions: [
        { id: 'latest', name: '최신순' },
        { id: 'popular', name: '인기순' },
        { id: 'views', name: '조회순' }
      ]
    },
    // CTA 섹션
    ctaSection: {
      title: "더 깊은 학습이 필요하다면",
      subtitle: "1:1 코칭과 체계적인 강의로 AI 협력 사고법을 완전히 마스터하세요",
      buttons: [
        { text: "개인 코칭 문의", variant: "default" },
        { text: "강의 둘러보기", variant: "outline" }
      ]
    },
    // 뉴스레터
    newsletter: {
      title: "AI 인사이트 레터",
      subtitle: "매주 엄선된 AI 사고법 콘텐츠를 받아보세요",
      placeholder: "이메일 주소를 입력하세요",
      button: "구독하기"
    }
  },
  en: {
    // 저자 권위 섹션
    authorSection: {
      title: "Sanghyuk Lee",
      subtitle: "AI-Enhanced Thinking Expert",
      bookTitle: "Author of 'The Art of Note-Taking for Organized Thinking'",
      description: "Researching and practicing methods to evolve traditional thinking with AI collaboration.",
      stats: [
        { label: "Subscribers", value: "12.5K" },
        { label: "Total Views", value: "250K" },
        { label: "Course Students", value: "1,200+" }
      ]
    },
    // 메인 헤더
    pageHeader: {
      title: "Think Deeper with AI",
      subtitle: "Learn AI-enhanced thinking through YouTube videos and expanded materials",
      description: "Upgrade your thinking skills with practical cases, tool reviews, and AI methodologies"
    },
    // 필터 및 검색
    filters: {
      searchPlaceholder: "Search by title, content...",
      categories: [
        { id: 'all', name: 'All', count: 24 },
        { id: 'ai-methodology', name: 'AI Methodology', count: 8 },
        { id: 'tool-review', name: 'Tool Review', count: 6 },
        { id: 'case-study', name: 'Case Study', count: 5 },
        { id: 'deep-thinking', name: 'Deep Thinking', count: 5 }
      ],
      sortOptions: [
        { id: 'latest', name: 'Latest' },
        { id: 'popular', name: 'Popular' },
        { id: 'views', name: 'Most Viewed' }
      ]
    },
    // CTA 섹션
    ctaSection: {
      title: "Ready for Deeper Learning?",
      subtitle: "Master AI-enhanced thinking completely with 1:1 coaching and systematic courses",
      buttons: [
        { text: "Personal Coaching Inquiry", variant: "default" },
        { text: "Explore Courses", variant: "outline" }
      ]
    },
    // 뉴스레터
    newsletter: {
      title: "AI Insights Newsletter",
      subtitle: "Get curated AI thinking content weekly",
      placeholder: "Enter your email address",
      button: "Subscribe"
    }
  }
};

// 샘플 저널 데이터 (실제로는 이상혁이 작성한 콘텐츠)
const sampleJournals = [
  {
    id: 1,
    title: "ChatGPT와 함께하는 아이디어 발전법",
    subtitle: "AI 브레인스토밍으로 창의성 3배 향상시키기",
    category: "ai-methodology",
    duration: "12분",
    views: "15.2K",
    likes: "892",
    publishedAt: "2024년 1월 15일",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    videoUrl: "https://youtube.com/watch?v=example1",
    keyPoints: [
      "AI 프롬프트 최적화 전략",
      "단계별 아이디어 확장법",
      "실무 적용 체크리스트",
      "창의성 측정 지표"
    ],
    downloadableResources: [
      "AI 브레인스토밍 템플릿",
      "아이디어 평가 체크리스트"
    ],
    tags: ["ChatGPT", "창의성", "브레인스토밍", "AI협력"]
  },
  {
    id: 2,
    title: "Notion AI로 만드는 완벽한 생각정리 시스템",
    subtitle: "체계적인 지식 관리와 AI 활용법",
    category: "tool-review",
    duration: "18분",
    views: "23.8K",
    likes: "1.2K",
    publishedAt: "2024년 1월 8일",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop",
    videoUrl: "https://youtube.com/watch?v=example2",
    keyPoints: [
      "Notion AI 핵심 기능 분석",
      "생각정리 템플릿 구축법",
      "자동화 워크플로우 설정",
      "데이터베이스 활용 전략"
    ],
    downloadableResources: [
      "Notion 생각정리 템플릿",
      "AI 프롬프트 라이브러리"
    ],
    tags: ["Notion", "지식관리", "템플릿", "워크플로우"]
  },
  {
    id: 3,
    title: "AI 시대 독서법: Claude와 함께 읽는 깊이 있는 독서",
    subtitle: "인공지능과 함께하는 능동적 독서 전략",
    category: "case-study",
    duration: "15분",
    views: "19.4K",
    likes: "967",
    publishedAt: "2024년 1월 2일",
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop",
    videoUrl: "https://youtube.com/watch?v=example3",
    keyPoints: [
      "AI 독서 동반자 만들기",
      "질문 생성 프롬프트",
      "내용 요약 및 연결법",
      "독서 노트 AI 정리법"
    ],
    downloadableResources: [
      "AI 독서 가이드",
      "질문 생성 템플릿"
    ],
    tags: ["독서법", "Claude", "학습법", "지식연결"]
  },
  {
    id: 4,
    title: "AI 협력 일기 쓰기: 하루 10분으로 자기성찰 극대화",
    subtitle: "인공지능과 함께하는 의미 있는 성찰",
    category: "deep-thinking",
    duration: "11분",
    views: "12.6K",
    likes: "743",
    publishedAt: "2023년 12월 28일",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
    videoUrl: "https://youtube.com/watch?v=example4",
    keyPoints: [
      "AI 성찰 파트너 만들기",
      "감정 분석 프롬프트",
      "패턴 발견 기법",
      "성장 지표 추적법"
    ],
    downloadableResources: [
      "AI 일기 템플릿",
      "성찰 질문 리스트"
    ],
    tags: ["일기", "성찰", "자기분석", "성장"]
  }
];

export default function JournalPage({ language = 'ko' }: JournalPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  const content = journalContent[language];

  // 필터링된 저널 데이터
  const filteredJournals = sampleJournals.filter(journal => {
    const matchesCategory = selectedCategory === 'all' || journal.category === selectedCategory;
    const matchesSearch = journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         journal.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* 저자 권위 섹션 */}
      <section className="bg-iwl-gradient text-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 저자 정보 */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <BookOpen className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-3xl mb-2">{content.authorSection.title}</h1>
                  <p className="text-xl text-white/90">{content.authorSection.subtitle}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="w-5 h-5 text-yellow-300" />
                  <span className="text-lg">{content.authorSection.bookTitle}</span>
                </div>
                <p className="text-white/80 text-lg leading-relaxed">
                  {content.authorSection.description}
                </p>
              </div>

              {/* 통계 */}
              <div className="grid grid-cols-3 gap-6">
                {content.authorSection.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-1">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 책 표지 또는 시각적 요소 */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-80 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-white/60" />
                    <div className="text-white/80 text-sm px-4">
                      『생각정리를 위한<br/>노트의 기술』
                    </div>
                  </div>
                </div>
                {/* 3D 효과 */}
                <div className="absolute -bottom-2 -right-2 w-64 h-80 bg-white/5 rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 헤더 */}
      <section className="py-16 bg-gradient-to-b from-iwl-purple-50 to-background">
        <div className="container text-center">
          <h2 className="text-4xl mb-4 text-iwl-gradient">
            {content.pageHeader.title}
          </h2>
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            {content.pageHeader.subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            {content.pageHeader.description}
          </p>
        </div>
      </section>

      {/* 검색 및 필터 */}
      <section className="py-8 bg-background border-b">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* 검색 */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={content.filters.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 정렬 */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">정렬:</span>
              <div className="flex space-x-2">
                {content.filters.sortOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={sortBy === option.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy(option.id)}
                    className={sortBy === option.id ? "bg-iwl-gradient text-white" : ""}
                  >
                    {option.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-3">
              {content.filters.categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id 
                      ? "bg-iwl-gradient text-white border-none" 
                      : "hover:border-iwl-purple"
                  }`}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 콘텐츠 카드 그리드 */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredJournals.map((journal) => (
              <Card key={journal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  {/* 유튜브 썸네일 */}
                  <div className="relative aspect-video bg-gray-100">
                    <img
                      src={journal.thumbnail}
                      alt={journal.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button size="lg" className="bg-white/90 text-black hover:bg-white">
                        <PlayCircle className="w-6 h-6 mr-2" />
                        영상 보기
                      </Button>
                    </div>
                    {/* 카테고리 뱃지 */}
                    <Badge className="absolute top-3 left-3 bg-iwl-gradient text-white">
                      {content.filters.categories.find(c => c.id === journal.category)?.name}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* 제목 및 부제목 */}
                  <div className="mb-4">
                    <h3 className="text-xl mb-2 line-clamp-2">
                      {journal.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {journal.subtitle}
                    </p>
                  </div>

                  {/* 메타 정보 */}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{journal.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{journal.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{journal.likes}</span>
                    </div>
                  </div>

                  {/* 핵심 포인트 */}
                  <div className="mb-4">
                    <h4 className="text-sm text-muted-foreground mb-2">핵심 내용:</h4>
                    <ul className="space-y-1">
                      {journal.keyPoints.slice(0, 3).map((point, index) => (
                        <li key={index} className="text-sm flex items-start space-x-2">
                          <div className="w-1 h-1 bg-iwl-purple rounded-full mt-2 flex-shrink-0"></div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 추가 자료 */}
                  {journal.downloadableResources.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm text-muted-foreground mb-2">다운로드 자료:</h4>
                      <div className="space-y-1">
                        {journal.downloadableResources.map((resource, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 text-iwl-purple hover:text-iwl-blue justify-start"
                          >
                            <Download className="w-3 h-3 mr-2" />
                            <span className="text-sm">{resource}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 태그 */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {journal.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA 버튼 */}
                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-iwl-gradient hover:opacity-90">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      영상 보기
                    </Button>
                    <Button variant="outline" className="flex-1 hover:border-iwl-purple">
                      <BookOpen className="w-4 h-4 mr-2" />
                      전체 글 읽기
                    </Button>
                  </div>

                  {/* 발행일 */}
                  <div className="mt-4 text-xs text-muted-foreground">
                    {journal.publishedAt}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 더 보기 버튼 */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="hover:border-iwl-purple">
              더 많은 콘텐츠 보기
              <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50">
        <div className="container text-center">
          <h2 className="text-3xl mb-4 text-iwl-gradient">
            {content.ctaSection.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            {content.ctaSection.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-iwl-gradient hover:opacity-90">
              {content.ctaSection.buttons[0].text}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="hover:border-iwl-purple">
              {content.ctaSection.buttons[1].text}
            </Button>
          </div>
        </div>
      </section>

      {/* 뉴스레터 섹션 */}
      <section className="py-16 bg-iwl-gradient text-white">
        <div className="container text-center">
          <h2 className="text-3xl mb-4">
            {content.newsletter.title}
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            {content.newsletter.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={content.newsletter.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button className="bg-white text-iwl-purple hover:bg-white/90">
              {content.newsletter.button}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}