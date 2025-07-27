import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { 
  Search, 
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
  Share2,
  Play,
  Youtube
} from 'lucide-react';

interface JournalPageProps {
  language: 'ko' | 'en';
  onNavigate: (page: 'home' | 'signup' | 'journal' | 'journal-write' | 'journal-detail' | 'courses' | 'about') => void;
  onJournalClick: (id: string) => void;
}

// 모든 콘텐츠는 이상혁 저자가 직접 작성한 것으로 가정
const journalContent = {
  ko: {
    // 저자 권위 섹션
    authorSection: {
      title: "이상혁",
      subtitle: "생각정리 전문가",
      bookTitle: "『생각정리를 위한 노트의 기술』 저자",
      description: "깊이 있는 사고와 체계적인 생각정리를 통해 개인의 인지적 잠재력을 극대화하는 방법을 연구하고 실천합니다.",
      stats: [
        { label: "구독자", value: "12.5K" },
        { label: "총 조회수", value: "250K" },
        { label: "강의 수강생", value: "1,200+" }
      ]
    },
    // 메인 헤더
    pageHeader: {
      title: "깊이 있는 사고의 여정",
      subtitle: "유튜브 영상과 확장 자료로 배우는 체계적 생각정리법",
      description: "실전 사례, 도구 리뷰, 생각정리 방법론을 통해 여러분의 사고력을 한 단계 업그레이드하세요"
    },
    // 필터 및 검색
    filters: {
      searchPlaceholder: "제목, 내용으로 검색...",
      categories: [
        { id: 'all', name: '전체', count: 24 },
        { id: 'thinking-method', name: '생각정리법', count: 8 },
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
      subtitle: "1:1 코칭과 체계적인 강의로 생각정리법을 완전히 마스터하세요",
      buttons: [
        { text: "개인 코칭 문의", variant: "default" },
        { text: "강의 둘러보기", variant: "outline" }
      ]
    },
    // 뉴스레터
    newsletter: {
      title: "생각정리 인사이트 레터",
      subtitle: "매주 엄선된 생각정리 콘텐츠를 받아보세요",
      placeholder: "이메일 주소를 입력하세요",
      button: "구독하기"
    }
  },
  en: {
    // 저자 권위 섹션
    authorSection: {
      title: "Sanghyuk Lee",
      subtitle: "Thinking Organization Expert",
      bookTitle: "Author of 'The Art of Note-Taking for Organized Thinking'",
      description: "Researching and practicing methods to maximize individual cognitive potential through deep thinking and systematic thought organization.",
      stats: [
        { label: "Subscribers", value: "12.5K" },
        { label: "Total Views", value: "250K" },
        { label: "Course Students", value: "1,200+" }
      ]
    },
    // 메인 헤더
    pageHeader: {
      title: "Journey of Deep Thinking",
      subtitle: "Learn systematic thinking methods through YouTube videos and expanded materials",
      description: "Upgrade your thinking skills with practical cases, tool reviews, and thinking methodologies"
    },
    // 필터 및 검색
    filters: {
      searchPlaceholder: "Search by title, content...",
      categories: [
        { id: 'all', name: 'All', count: 24 },
        { id: 'thinking-method', name: 'Thinking Methods', count: 8 },
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
      subtitle: "Master thinking organization completely with 1:1 coaching and systematic courses",
      buttons: [
        { text: "Personal Coaching Inquiry", variant: "default" },
        { text: "Explore Courses", variant: "outline" }
      ]
    },
    // 뉴스레터
    newsletter: {
      title: "Thinking Insights Newsletter",
      subtitle: "Get curated thinking organization content weekly",
      placeholder: "Enter your email address",
      button: "Subscribe"
    }
  }
};

// 샘플 저널 데이터
const sampleJournals = [
  {
    id: '1',
    title: "체계적 사고의 힘: 복잡한 문제를 단순하게 만드는 법",
    excerpt: "복잡해 보이는 문제도 체계적인 사고 과정을 통해 명확하고 단순한 해결책을 찾을 수 있습니다. 실제 사례를 통해 이 과정을 자세히 살펴보겠습니다.",
    category: "thinking-method",
    readingTime: 8,
    views: 1247,
    likes: 89,
    comments: 12,
    publishedAt: "2024년 1월 15일",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    tags: ["체계적사고", "문제해결", "사고법", "방법론"],
    youtubeUrl: "https://youtube.com/watch?v=example1"
  },
  {
    id: '2',
    title: "디지털 시대의 깊은 사고: 정보 과부하 극복법",
    excerpt: "넘쳐나는 정보 속에서 진정으로 깊이 있는 사고를 하는 방법. 디지털 도구를 활용한 정보 필터링과 사고 구조화 전략을 다룹니다.",
    category: "deep-thinking",
    readingTime: 12,
    views: 2156,
    likes: 156,
    comments: 28,
    publishedAt: "2024년 1월 8일",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop",
    tags: ["깊은사고", "정보과부하", "필터링", "구조화"],
    youtubeUrl: "https://youtube.com/watch?v=example2"
  },
  {
    id: '3',
    title: "저널링의 과학: 일상의 통찰을 극대화하는 방법",
    excerpt: "매일의 기록이 어떻게 깊은 통찰로 이어질 수 있는지 탐구. 과학적 근거를 바탕으로 한 저널링 방법과 자기 성찰의 새로운 차원을 제시합니다.",
    category: "case-study",
    readingTime: 10,
    views: 1834,
    likes: 127,
    comments: 19,
    publishedAt: "2024년 1월 2일",
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop",
    tags: ["저널링", "일상", "통찰", "자기성찰"],
    youtubeUrl: "https://youtube.com/watch?v=example3"
  },
  {
    id: '4',
    title: "Notion 완전 활용법: 생각정리의 혁신",
    excerpt: "Notion의 모든 기능을 활용한 체계적 생각정리 시스템 구축. 템플릿부터 자동화까지, 실무에 바로 적용할 수 있는 노하우를 공개합니다.",
    category: "tool-review",
    readingTime: 15,
    views: 3421,
    likes: 234,
    comments: 45,
    publishedAt: "2023년 12월 28일",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop",
    tags: ["Notion", "도구", "생각정리", "자동화"],
    youtubeUrl: "https://youtube.com/watch?v=example4"
  }
];

export function JournalPage({ language, onNavigate, onJournalClick }: JournalPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  const content = journalContent[language];

  // 필터링된 저널 데이터
  const filteredJournals = sampleJournals.filter(journal => {
    const matchesCategory = selectedCategory === 'all' || journal.category === selectedCategory;
    const matchesSearch = journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         journal.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* 저자 프로필 섹션 */}
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

            {/* 저자 사진 영역 */}
            <div className="flex justify-center">
              <Card className="bg-white/10 backdrop-blur border-white/20 max-w-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-16 h-16 text-white/80" />
                  </div>
                  <h3 className="text-white text-xl mb-2">저자 프로필</h3>
                  <p className="text-white/80 text-sm mb-4">
                    10년+ 경력의 생각정리 전문가
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-white/70">
                    <div>
                      <div className="text-lg text-white">15+</div>
                      <div>강의</div>
                    </div>
                    <div>
                      <div className="text-lg text-white">1,200+</div>
                      <div>수강생</div>
                    </div>
                    <div>
                      <div className="text-lg text-white">4.9★</div>
                      <div>평점</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

      {/* 저널 카드 그리드 */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredJournals.map((journal) => (
              <Card 
                key={journal.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onJournalClick(journal.id)}
              >
                <div className="relative aspect-video bg-gray-100">
                  <ImageWithFallback
                    src={journal.thumbnail}
                    alt={journal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="lg" className="bg-white/90 text-black hover:bg-white">
                      <Play className="w-6 h-6 mr-2" />
                      영상 보기
                    </Button>
                  </div>
                  {/* 카테고리 뱃지 */}
                  <Badge className="absolute top-3 left-3 bg-iwl-gradient text-white">
                    {content.filters.categories.find(c => c.id === journal.category)?.name}
                  </Badge>
                  {/* 유튜브 아이콘 */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <Youtube className="w-4 h-4 text-white" />
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* 제목 및 요약 */}
                  <div className="mb-4">
                    <h3 className="text-xl mb-2 line-clamp-2">
                      {journal.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                      {journal.excerpt}
                    </p>
                  </div>

                  {/* 메타 정보 */}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{journal.readingTime}분</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{journal.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{journal.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{journal.comments}</span>
                    </div>
                  </div>

                  {/* 태그 */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {journal.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 발행일 */}
                  <div className="text-xs text-muted-foreground">
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