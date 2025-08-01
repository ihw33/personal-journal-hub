/**
 * ===================================================================
 * IdeaWorkLab v3.2 Journal List Page Component
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * v3.0 Architect Design System 완전 적용
 * ===================================================================
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Filter, 
  Calendar, 
  User, 
  Eye,
  MessageCircle,
  Brain,
  TrendingUp,
  ArrowRight,
  Clock,
  Tag,
  Play,
  Download,
  Heart,
  Share2,
  Grid3X3,
  List,
  SlidersHorizontal,
  Star,
  Zap,
  Target,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface JournalListPageProps {
  user?: any;
  onNavigate: (page: string, params?: any) => void;
  language: 'ko' | 'en';
}

interface JournalPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    verified: boolean;
  };
  category: string;
  tags: string[];
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  aiAssisted: boolean;
  status: 'published' | 'draft';
  thumbnail?: string;
  videoId?: string; // YouTube video ID
  downloadResources?: {
    title: string;
    type: 'template' | 'checklist' | 'guide';
    url: string;
  }[];
}

/**
 * v3.2 저널 목록 페이지 컴포넌트
 * Architect Design System 기반의 전문적인 저널 플랫폼
 */
export const JournalListPage: React.FC<JournalListPageProps> = ({ 
  user, 
  onNavigate, 
  language 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('latest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 다국어 콘텐츠
  const content = {
    ko: {
      hero: {
        badge: '사고와 재능의 설계자',
        title: user ? `${user.name}님의 저널` : '전문가의 생각정리\\n저널 플랫폼',
        subtitle: user 
          ? 'AI 파트너와 함께 작성한 생각정리를 확인하고 관리하세요'
          : '전문가들의 체계적 사고법과 AI 협업 노하우를 학습하고 나만의 인사이트를 발견해보세요'
      },
      tabs: {
        all: '전체 저널',
        featured: '추천 저널',
        trending: '인기 저널',
        recent: '최신 저널',
        my: '내 저널'
      },
      categories: [
        { id: 'all', name: '전체', icon: BookOpen, color: 'architect-primary' },
        { id: 'methodology', name: '사고 방법론', icon: Brain, color: 'architect-accent' },
        { id: 'business', name: '비즈니스 전략', icon: TrendingUp, color: 'architect-success' },
        { id: 'creative', name: '창의적 사고', icon: Lightbulb, color: 'architect-warning' },
        { id: 'analysis', name: '분석적 사고', icon: BarChart3, color: 'architect-info' },
        { id: 'ai-collaboration', name: 'AI 협업', icon: Zap, color: 'architect-ai-primary' },
        { id: 'problem-solving', name: '문제 해결', icon: Target, color: 'architect-error' }
      ],
      search: {
        placeholder: '저널, 작성자, 태그로 검색...',
        filter: '필터',
        sort: '정렬',
        view: '보기'
      },
      sort: {
        latest: '최신순',
        popular: '인기순',
        views: '조회순',
        likes: '좋아요순'
      },
      actions: {
        create: 'AI와 함께 저널 작성하기',
        view: '읽기',
        edit: '수정',
        continue: '계속 작성',
        watch: '영상 시청',
        download: '자료 다운로드'
      },
      stats: {
        total: '총 저널 수',
        published: '발행된 저널',
        drafts: '임시저장',
        views: '총 조회수',
        engagement: '참여도'
      },
      empty: {
        title: '검색 결과가 없습니다',
        description: '다른 키워드로 검색하거나 필터를 조정해보세요',
        action: '전체 저널 보기'
      },
      filters: {
        category: '카테고리',
        author: '작성자',
        tags: '태그',
        dateRange: '기간',
        hasVideo: '영상 포함',
        hasResources: '자료 포함',
        aiAssisted: 'AI 협업'
      }
    },
    en: {
      hero: {
        badge: 'The Architect of Thought and Talent',
        title: user ? `${user.name}'s Journal` : 'Expert Thinking\\nJournal Platform',
        subtitle: user 
          ? 'View and manage your thinking notes created with AI partner'
          : 'Learn systematic thinking methods and AI collaboration know-how from experts, and discover your own insights'
      },
      tabs: {
        all: 'All Journals',
        featured: 'Featured',
        trending: 'Trending',
        recent: 'Recent',
        my: 'My Journals'
      },
      categories: [
        { id: 'all', name: 'All', icon: BookOpen, color: 'architect-primary' },
        { id: 'methodology', name: 'Thinking Methods', icon: Brain, color: 'architect-accent' },
        { id: 'business', name: 'Business Strategy', icon: TrendingUp, color: 'architect-success' },
        { id: 'creative', name: 'Creative Thinking', icon: Lightbulb, color: 'architect-warning' },
        { id: 'analysis', name: 'Analytical Thinking', icon: BarChart3, color: 'architect-info' },
        { id: 'ai-collaboration', name: 'AI Collaboration', icon: Zap, color: 'architect-ai-primary' },
        { id: 'problem-solving', name: 'Problem Solving', icon: Target, color: 'architect-error' }
      ],
      search: {
        placeholder: 'Search journals, authors, tags...',
        filter: 'Filter',
        sort: 'Sort',
        view: 'View'
      },
      sort: {
        latest: 'Latest',
        popular: 'Popular',
        views: 'Most Viewed',
        likes: 'Most Liked'
      },
      actions: {
        create: 'Create Journal with AI',
        view: 'Read',
        edit: 'Edit',
        continue: 'Continue',
        watch: 'Watch Video',
        download: 'Download Resources'
      },
      stats: {
        total: 'Total Journals',
        published: 'Published',
        drafts: 'Drafts',
        views: 'Total Views',
        engagement: 'Engagement'
      },
      empty: {
        title: 'No search results',
        description: 'Try different keywords or adjust filters',
        action: 'View All Journals'
      },
      filters: {
        category: 'Category',
        author: 'Author',
        tags: 'Tags',
        dateRange: 'Date Range',
        hasVideo: 'Has Video',
        hasResources: 'Has Resources',
        aiAssisted: 'AI Assisted'
      }
    }
  };

  const t = content[language];

  // Mock journal data with enhanced features
  const mockJournals: JournalPost[] = [
    {
      id: '1',
      title: 'AI와 함께 제주도 여행 계획 세우기: 창의적 사고법 실습',
      excerpt: 'AI 파트너와 함께 효과적인 제주도 여행 계획을 세우는 과정을 통해 창의적 사고법을 학습했습니다. 단순한 일정 작성을 넘어서 진정한 여행의 의미를 탐구하고, 체계적인 사고 과정을 경험해보세요.',
      author: {
        id: 'expert-1',
        name: '김지은',
        avatar: '',
        verified: true
      },
      category: 'creative',
      tags: ['여행계획', 'AI협업', '창의사고', '제주도'],
      readTime: 8,
      views: 1247,
      likes: 89,
      comments: 23,
      createdAt: '2024-01-25',
      updatedAt: '2024-01-25',
      featured: true,
      aiAssisted: true,
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=250&fit=crop',
      videoId: 'dQw4w9WgXcQ', // YouTube video ID
      downloadResources: [
        { title: '제주도 여행 계획 템플릿', type: 'template', url: '#' },
        { title: '창의적 사고 체크리스트', type: 'checklist', url: '#' }
      ]
    },
    {
      id: '2',
      title: '복잡한 비즈니스 문제 해결하기: 8단계 체계적 분석법',
      excerpt: 'AI와의 대화를 통해 복잡한 업무 문제를 체계적으로 분석하고 해결책을 도출하는 방법을 배웠습니다. 논리적 접근과 창의적 발상의 균형을 찾는 과정을 단계별로 설명합니다.',
      author: {
        id: 'expert-2',
        name: '박민수',
        avatar: '',
        verified: true
      },
      category: 'business',
      tags: ['문제해결', '비즈니스', '분석사고', '전략수립'],
      readTime: 12,
      views: 892,
      likes: 67,
      comments: 15,
      createdAt: '2024-01-22',
      updatedAt: '2024-01-24',
      featured: true,
      aiAssisted: true,
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop',
      videoId: 'dQw4w9WgXcQ',
      downloadResources: [
        { title: '비즈니스 문제 분석 프레임워크', type: 'template', url: '#' },
        { title: '해결책 평가 매트릭스', type: 'template', url: '#' }
      ]
    },
    {
      id: '3',
      title: '창의적 아이디어 발상법: AI 멘토와의 브레인스토밍',
      excerpt: 'AI 멘토와 함께 브레인스토밍하며 새로운 아이디어를 발견하는 과정을 기록했습니다. 인간의 직관과 AI의 논리적 사고가 만나는 지점에서 탄생하는 혁신적 아이디어를 경험해보세요.',
      author: {
        id: user?.id || 'expert-3',
        name: user?.name || '이서연',
        avatar: '',
        verified: false
      },
      category: 'methodology',
      tags: ['창의사고', '아이디어', 'AI멘토', '브레인스토밍'],
      readTime: 6,
      views: 634,
      likes: 45,
      comments: 8,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      featured: false,
      aiAssisted: true,
      status: user ? 'draft' : 'published',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      downloadResources: [
        { title: '브레인스토밍 가이드', type: 'guide', url: '#' }
      ]
    },
    {
      id: '4',
      title: 'AI 프롬프트 엔지니어링: 효과적인 질문 설계법',
      excerpt: 'AI와의 협업에서 가장 중요한 것은 질문의 질입니다. 좋은 프롬프트를 설계하는 방법부터 AI의 답변을 최대한 활용하는 전략까지, 실전 경험을 바탕으로 정리했습니다.',
      author: {
        id: 'expert-4',
        name: '최영호',
        avatar: '',
        verified: true
      },
      category: 'ai-collaboration',
      tags: ['프롬프트엔지니어링', 'AI활용', '질문설계', '협업전략'],
      readTime: 10,
      views: 1156,
      likes: 92,
      comments: 31,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-19',
      featured: true,
      aiAssisted: true,
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
      videoId: 'dQw4w9WgXcQ',
      downloadResources: [
        { title: '프롬프트 템플릿 모음', type: 'template', url: '#' },
        { title: 'AI 협업 체크리스트', type: 'checklist', url: '#' }
      ]
    },
    {
      id: '5',
      title: '분석적 사고로 데이터 해석하기: 숫자 너머의 인사이트',
      excerpt: '데이터는 말하지만, 우리가 올바르게 들어야 합니다. 분석적 사고를 통해 데이터에서 진정한 인사이트를 도출하는 방법을 실제 사례와 함께 설명합니다.',
      author: {
        id: 'expert-5',
        name: '윤미경',
        avatar: '',
        verified: true
      },
      category: 'analysis',
      tags: ['데이터분석', '분석사고', '인사이트', '의사결정'],
      readTime: 9,
      views: 743,
      likes: 56,
      comments: 12,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16',
      featured: false,
      aiAssisted: true,
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      downloadResources: [
        { title: '데이터 분석 프레임워크', type: 'template', url: '#' }
      ]
    },
    {
      id: '6',
      title: '복잡한 문제를 단순하게: 문제 해결의 원칙들',
      excerpt: '복잡해 보이는 문제도 올바른 접근법으로 단순화할 수 있습니다. 문제의 본질을 파악하고 해결책을 체계적으로 도출하는 사고 과정을 공유합니다.',
      author: {
        id: 'expert-6',
        name: '정현수',
        avatar: '',
        verified: true
      },
      category: 'problem-solving',
      tags: ['문제해결', '체계적사고', '단순화', '본질파악'],
      readTime: 7,
      views: 568,
      likes: 41,
      comments: 9,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-13',
      featured: false,
      aiAssisted: false,
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop'
    }
  ];

  // Filtering and sorting logic
  const filteredJournals = mockJournals.filter(journal => {
    const matchesSearch = 
      journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || journal.category === selectedCategory;
    
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'my' && journal.author.id === user?.id) ||
      (activeTab === 'featured' && journal.featured) ||
      (activeTab === 'trending' && journal.views > 800) ||
      (activeTab === 'recent');
    
    return matchesSearch && matchesCategory && matchesTab;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.likes - a.likes;
      case 'views': return b.views - a.views;
      case 'likes': return b.likes - a.likes;
      case 'latest':
      default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // User statistics
  const myJournals = user ? mockJournals.filter(journal => journal.author.id === user.id) : [];
  const publishedCount = myJournals.filter(j => j.status === 'published').length;
  const draftCount = myJournals.filter(j => j.status === 'draft').length;
  const totalViews = myJournals.reduce((sum, j) => sum + j.views, 0);

  // Get category info
  const getCategoryInfo = (categoryId: string) => {
    return t.categories.find(cat => cat.id === categoryId) || t.categories[0];
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-architect-success/10 text-architect-success border-architect-success/20';
      case 'draft': return 'bg-architect-warning/10 text-architect-warning border-architect-warning/20';
      default: return 'bg-architect-gray-100 text-architect-gray-700 border-architect-gray-300';
    }
  };

  // Render journal card
  const renderJournalCard = (journal: JournalPost) => {
    const categoryInfo = getCategoryInfo(journal.category);
    const Icon = categoryInfo.icon;

    if (viewMode === 'list') {
      return (
        <Card key={journal.id} className="card-architect-hover overflow-hidden">
          <div className="grid md:grid-cols-4 gap-0">
            {/* Thumbnail */}
            <div className="relative md:col-span-1">
              <ImageWithFallback
                src={journal.thumbnail || `https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=200&fit=crop`}
                alt={journal.title}
                className="w-full h-48 md:h-full object-cover"
              />
              {journal.videoId && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-architect-primary ml-1" />
                  </div>
                </div>
              )}
              {journal.featured && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-architect-accent text-white shadow-architect-sm">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="md:col-span-3 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="outline" className={`border-${categoryInfo.color} text-${categoryInfo.color}`}>
                    <Icon className="w-3 h-3 mr-1" />
                    {categoryInfo.name}
                  </Badge>
                  {journal.aiAssisted && (
                    <Badge className="bg-architect-ai-primary/10 text-architect-ai-primary border-architect-ai-primary/20">
                      <Zap className="w-3 h-3 mr-1" />
                      AI 협업
                    </Badge>
                  )}
                  <Badge className={`${getStatusColor(journal.status)} border`}>
                    {journal.status === 'published' ? '발행됨' : '임시저장'}
                  </Badge>
                </div>
              </div>

              <h3 className="text-architect-h4 font-architect-bold text-architect-gray-900 mb-3 leading-architect-tight hover:text-architect-primary transition-colors cursor-pointer">
                {journal.title}
              </h3>

              <p className="text-architect-body text-architect-gray-700 mb-4 leading-architect-relaxed line-clamp-2">
                {journal.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-architect-primary/10 text-architect-primary text-architect-small">
                        {journal.author.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-architect-small font-architect-medium text-architect-gray-900">
                          {journal.author.name}
                        </span>
                        {journal.author.verified && (
                          <div className="w-4 h-4 bg-architect-success rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="text-architect-xs text-architect-gray-500">
                        {journal.createdAt}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-architect-small text-architect-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {journal.readTime}분
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {journal.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {journal.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {journal.comments}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {journal.downloadResources && journal.downloadResources.length > 0 && (
                    <Button variant="outline" size="sm" className="border-architect-accent text-architect-accent hover:bg-architect-accent hover:text-white">
                      <Download className="w-4 h-4 mr-1" />
                      자료
                    </Button>
                  )}
                  {journal.videoId && (
                    <Button variant="outline" size="sm" className="border-architect-info text-architect-info hover:bg-architect-info hover:text-white">
                      <Play className="w-4 h-4 mr-1" />
                      영상
                    </Button>
                  )}
                  <Button 
                    onClick={() => onNavigate('journal-detail', { journalId: journal.id })}
                    className="btn-architect-primary text-architect-small px-4"
                  >
                    {t.actions.view}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    // Grid view (default)
    return (
      <Card key={journal.id} className="card-architect-hover overflow-hidden group">
        {/* Thumbnail */}
        <div className="relative">
          <ImageWithFallback
            src={journal.thumbnail || `https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop`}
            alt={journal.title}
            className="w-full h-48 object-cover"
          />
          {journal.videoId && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-6 h-6 text-architect-primary ml-1" />
              </div>
            </div>
          )}
          {journal.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-architect-accent text-white shadow-architect-sm">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute top-3 right-3 flex gap-2">
            {journal.downloadResources && journal.downloadResources.length > 0 && (
              <div className="w-8 h-8 bg-architect-accent/90 rounded-full flex items-center justify-center">
                <Download className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>

        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={`border-${categoryInfo.color} text-${categoryInfo.color}`}>
                <Icon className="w-3 h-3 mr-1" />
                {categoryInfo.name}
              </Badge>
              {journal.aiAssisted && (
                <Badge className="bg-architect-ai-primary/10 text-architect-ai-primary border-architect-ai-primary/20">
                  <Zap className="w-3 h-3 mr-1" />
                  AI
                </Badge>
              )}
            </div>
            <Badge className={`${getStatusColor(journal.status)} border text-architect-xs`}>
              {journal.status === 'published' ? '발행됨' : '임시저장'}
            </Badge>
          </div>
          
          <CardTitle className="text-architect-h4 font-architect-bold text-architect-gray-900 leading-architect-tight hover:text-architect-primary transition-colors cursor-pointer line-clamp-2">
            {journal.title}
          </CardTitle>
          <CardDescription className="text-architect-body text-architect-gray-700 leading-architect-relaxed line-clamp-3">
            {journal.excerpt}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Author and stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-architect-primary/10 text-architect-primary text-architect-small">
                  {journal.author.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-architect-small font-architect-medium text-architect-gray-900">
                    {journal.author.name}
                  </span>
                  {journal.author.verified && (
                    <div className="w-4 h-4 bg-architect-success rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-architect-xs text-architect-gray-500">
                  {journal.createdAt}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-architect-small text-architect-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {journal.readTime}분
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {journal.views.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {journal.likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {journal.comments}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {journal.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-architect-xs border-architect-gray-300 text-architect-gray-700 hover:border-architect-primary hover:text-architect-primary cursor-pointer">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {journal.tags.length > 3 && (
              <Badge variant="outline" className="text-architect-xs border-architect-gray-300 text-architect-gray-500">
                +{journal.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => onNavigate('journal-detail', { journalId: journal.id })}
              className="flex-1 btn-architect-primary text-architect-small"
            >
              {t.actions.view}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            {journal.author.id === user?.id && (
              <Button
                variant="outline"
                onClick={() => onNavigate('journal-editor', { journalId: journal.id })}
                className="border-architect-primary text-architect-primary hover:bg-architect-primary hover:text-white text-architect-small"
              >
                {journal.status === 'draft' ? t.actions.continue : t.actions.edit}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-architect-primary/5 via-white to-architect-accent/5 border-b border-architect-gray-300/30">
        <div className="container mx-auto">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-architect-primary/10 border border-architect-primary/20 rounded-full px-6 py-3 mb-8">
              <Brain className="w-5 h-5 text-architect-primary" />
              <span className="text-architect-body font-architect-semibold text-architect-primary">
                {t.hero.badge}
              </span>
            </div>
            
            <h1 className="text-architect-h1 md:text-architect-hero font-architect-black text-architect-gray-900 mb-6 leading-architect-tight">
              {t.hero.title.split('\\n').map((line, index) => (
                <div key={index} className={index === 1 ? 'text-architect-gradient' : ''}>
                  {line}
                </div>
              ))}
            </h1>
            
            <p className="text-architect-body-lg text-architect-gray-700 mb-10 max-w-4xl mx-auto leading-architect-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => onNavigate('journal-editor')}
                className="btn-architect-primary px-8 py-4 text-architect-body font-architect-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                {t.actions.create}
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('courses')}
                className="btn-architect-secondary px-8 py-4 text-architect-body font-architect-semibold"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                사고 방법론 학습하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (for logged-in users) */}
      {user && (
        <section className="py-12 bg-white border-b border-architect-gray-300/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center p-6 bg-architect-primary/5 rounded-xl border border-architect-primary/10">
                <div className="text-architect-h2 font-architect-bold text-architect-gradient mb-2">
                  {myJournals.length}
                </div>
                <div className="text-architect-body text-architect-gray-600">{t.stats.total}</div>
              </div>
              <div className="text-center p-6 bg-architect-success/5 rounded-xl border border-architect-success/10">
                <div className="text-architect-h2 font-architect-bold text-architect-success mb-2">
                  {publishedCount}
                </div>
                <div className="text-architect-body text-architect-gray-600">{t.stats.published}</div>
              </div>
              <div className="text-center p-6 bg-architect-warning/5 rounded-xl border border-architect-warning/10">
                <div className="text-architect-h2 font-architect-bold text-architect-warning mb-2">
                  {draftCount}
                </div>
                <div className="text-architect-body text-architect-gray-600">{t.stats.drafts}</div>
              </div>
              <div className="text-center p-6 bg-architect-info/5 rounded-xl border border-architect-info/10">
                <div className="text-architect-h2 font-architect-bold text-architect-info mb-2">
                  {totalViews.toLocaleString()}
                </div>
                <div className="text-architect-body text-architect-gray-600">{t.stats.views}</div>
              </div>
              <div className="text-center p-6 bg-architect-accent/5 rounded-xl border border-architect-accent/10">
                <div className="text-architect-h2 font-architect-bold text-architect-accent mb-2">
                  {Math.round((myJournals.reduce((sum, j) => sum + j.likes + j.comments, 0) / Math.max(myJournals.length, 1)) * 10) / 10}
                </div>
                <div className="text-architect-body text-architect-gray-600">{t.stats.engagement}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto">
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-architect-gray-500" />
                <Input
                  placeholder={t.search.placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-architect pl-12 h-12 text-architect-body"
                />
              </div>
              
              {/* Controls */}
              <div className="flex gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 h-12 border-2 border-architect-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">{t.sort.latest}</SelectItem>
                    <SelectItem value="popular">{t.sort.popular}</SelectItem>
                    <SelectItem value="views">{t.sort.views}</SelectItem>
                    <SelectItem value="likes">{t.sort.likes}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border-2 border-architect-gray-300 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    onClick={() => setViewMode('grid')}
                    className={`rounded-none border-0 ${viewMode === 'grid' ? 'bg-architect-primary text-white' : 'bg-white text-architect-gray-700'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    onClick={() => setViewMode('list')}
                    className={`rounded-none border-0 ${viewMode === 'list' ? 'bg-architect-primary text-white' : 'bg-white text-architect-gray-700'}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="border-2 border-architect-gray-300 h-12"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  {t.search.filter}
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-6">
              {t.categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id 
                      ? `bg-architect-gradient text-white shadow-architect-md` 
                      : `border-2 border-architect-gray-300 text-architect-gray-700 hover:border-architect-primary hover:text-architect-primary`
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5 max-w-4xl h-12 bg-architect-gray-100 border border-architect-gray-300">
              <TabsTrigger 
                value="all" 
                className="text-architect-body font-architect-medium data-[state=active]:bg-architect-primary data-[state=active]:text-white"
              >
                {t.tabs.all}
              </TabsTrigger>
              <TabsTrigger 
                value="featured"
                className="text-architect-body font-architect-medium data-[state=active]:bg-architect-primary data-[state=active]:text-white"
              >
                {t.tabs.featured}
              </TabsTrigger>
              <TabsTrigger 
                value="trending"
                className="text-architect-body font-architect-medium data-[state=active]:bg-architect-primary data-[state=active]:text-white"
              >
                {t.tabs.trending}
              </TabsTrigger>
              <TabsTrigger 
                value="recent"
                className="text-architect-body font-architect-medium data-[state=active]:bg-architect-primary data-[state=active]:text-white"
              >
                {t.tabs.recent}
              </TabsTrigger>
              {user && (
                <TabsTrigger 
                  value="my"
                  className="text-architect-body font-architect-medium data-[state=active]:bg-architect-primary data-[state=active]:text-white"
                >
                  {t.tabs.my}
                </TabsTrigger>
              )}
            </TabsList>
          </Tabs>

          {/* Journal Grid/List */}
          {filteredJournals.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-6"
            }>
              {filteredJournals.map(renderJournalCard)}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-architect-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-architect-gray-400" />
              </div>
              <h3 className="text-architect-h3 font-architect-bold text-architect-gray-900 mb-3">
                {t.empty.title}
              </h3>
              <p className="text-architect-body text-architect-gray-600 mb-8 max-w-md mx-auto">
                {t.empty.description}
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setActiveTab('all');
                }}
                className="btn-architect-secondary"
              >
                {t.empty.action}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

/**
 * 사용 예시:
 * 
 * // 기본 사용
 * <JournalListPage 
 *   onNavigate={navigate}
 *   language="ko"
 * />
 * 
 * // 로그인 사용자와 함께
 * <JournalListPage 
 *   user={currentUser}
 *   onNavigate={navigate}
 *   language="en"
 * />
 */

export default JournalListPage;