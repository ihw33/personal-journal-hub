import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  Tag
} from 'lucide-react';

interface JournalPageProps {
  user: any;
  onNavigate: (page: string, params?: any) => void;
  language: 'ko' | 'en';
}

const JournalPage: React.FC<JournalPageProps> = ({ user, onNavigate, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const content = {
    ko: {
      hero: {
        badge: '저널 & 생각정리',
        title: user ? `${user.name}님의 저널` : 'AI와 함께하는\n생각정리 저널',
        subtitle: user 
          ? 'AI 파트너와 함께 작성한 생각정리를 확인하고 관리하세요'
          : 'AI와 함께 깊이 있는 생각정리를 경험하고 다른 사람들의 인사이트를 발견해보세요'
      },
      tabs: {
        all: '전체',
        my: '내 저널',
        featured: '추천',
        recent: '최신'
      },
      categories: [
        { id: 'all', name: '전체', icon: BookOpen },
        { id: 'travel', name: '여행', icon: Calendar },
        { id: 'business', name: '비즈니스', icon: TrendingUp },
        { id: 'creative', name: '창의적 사고', icon: Brain },
        { id: 'analysis', name: '분석적 사고', icon: MessageCircle }
      ],
      search: {
        placeholder: '저널 검색...',
        filter: '필터'
      },
      actions: {
        create: 'AI와 함께 저널 작성하기',
        view: '읽기',
        edit: '수정',
        continue: '계속 작성'
      },
      journals: [
        {
          id: 1,
          title: 'AI와 함께 제주도 여행 계획 세우기',
          excerpt: 'AI 파트너와 함께 효과적인 제주도 여행 계획을 세우는 과정을 통해 창의적 사고법을 학습했습니다. 단순한 일정 작성을 넘어서...',
          author: '김지은',
          authorId: 'user-1',
          category: 'travel',
          tags: ['여행계획', 'AI협업', '창의사고'],
          readTime: 5,
          views: 234,
          likes: 12,
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          featured: true,
          aiAssisted: true,
          status: 'published'
        },
        {
          id: 2,
          title: '복잡한 비즈니스 문제 해결하기',
          excerpt: 'AI와의 대화를 통해 복잡한 업무 문제를 체계적으로 분석하고 해결책을 도출하는 방법을 배웠습니다. 논리적 접근과 창의적 발상의 균형을...',
          author: '박민수',
          authorId: 'user-2',
          category: 'business',
          tags: ['문제해결', '비즈니스', '분석사고'],
          readTime: 8,
          views: 156,
          likes: 9,
          createdAt: '2024-01-12',
          updatedAt: '2024-01-14',
          featured: false,
          aiAssisted: true,
          status: 'published'
        },
        {
          id: 3,
          title: '창의적 아이디어 발상법',
          excerpt: 'AI 멘토와 함께 브레인스토밍하며 새로운 아이디어를 발견하는 과정을 기록했습니다. 인간의 직관과 AI의 논리적 사고가 만나...',
          author: user?.name || '이서연',
          authorId: user?.id || 'user-3',
          category: 'creative',
          tags: ['창의사고', '아이디어', 'AI멘토'],
          readTime: 6,
          views: 89,
          likes: 15,
          createdAt: '2024-01-10',
          updatedAt: '2024-01-10',
          featured: false,
          aiAssisted: true,
          status: 'draft'
        }
      ],
      stats: {
        total: '총 저널 수',
        published: '발행된 저널',
        drafts: '임시저장',
        views: '총 조회수'
      },
      empty: {
        title: '저널이 없습니다',
        description: 'AI와 함께 첫 번째 저널을 작성해보세요',
        action: '첫 저널 작성하기'
      }
    },
    en: {
      hero: {
        badge: 'Journal & Thinking',
        title: user ? `${user.name}'s Journal` : 'AI-Enhanced\nThinking Journal',
        subtitle: user 
          ? 'View and manage your thinking notes created with AI partner'
          : 'Experience deep thinking with AI and discover insights from others'
      },
      tabs: {
        all: 'All',
        my: 'My Journal',
        featured: 'Featured',
        recent: 'Recent'
      },
      categories: [
        { id: 'all', name: 'All', icon: BookOpen },
        { id: 'travel', name: 'Travel', icon: Calendar },
        { id: 'business', name: 'Business', icon: TrendingUp },
        { id: 'creative', name: 'Creative', icon: Brain },
        { id: 'analysis', name: 'Analysis', icon: MessageCircle }
      ],
      search: {
        placeholder: 'Search journals...',
        filter: 'Filter'
      },
      actions: {
        create: 'Create Journal with AI',
        view: 'Read',
        edit: 'Edit',
        continue: 'Continue'
      },
      journals: [
        {
          id: 1,
          title: 'Planning Jeju Island Trip with AI',
          excerpt: 'Learning creative thinking through effective Jeju Island travel planning with an AI partner. Going beyond simple scheduling...',
          author: 'Kim Jieun',
          authorId: 'user-1',
          category: 'travel',
          tags: ['Travel Planning', 'AI Collaboration', 'Creative Thinking'],
          readTime: 5,
          views: 234,
          likes: 12,
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          featured: true,
          aiAssisted: true,
          status: 'published'
        },
        {
          id: 2,
          title: 'Solving Complex Business Problems',
          excerpt: 'Learning systematic analysis and solution development for complex work problems through AI conversations. Balancing logical approach and creative thinking...',
          author: 'Park Minsu',
          authorId: 'user-2',
          category: 'business',
          tags: ['Problem Solving', 'Business', 'Analytical Thinking'],
          readTime: 8,
          views: 156,
          likes: 9,
          createdAt: '2024-01-12',
          updatedAt: '2024-01-14',
          featured: false,
          aiAssisted: true,
          status: 'published'
        },
        {
          id: 3,
          title: 'Creative Idea Generation Methods',
          excerpt: 'Recording the process of discovering new ideas through brainstorming with AI mentor. Where human intuition meets AI logical thinking...',
          author: user?.name || 'Lee Seoyeon',
          authorId: user?.id || 'user-3',
          category: 'creative',
          tags: ['Creative Thinking', 'Ideas', 'AI Mentor'],
          readTime: 6,
          views: 89,
          likes: 15,
          createdAt: '2024-01-10',
          updatedAt: '2024-01-10',
          featured: false,
          aiAssisted: true,
          status: 'draft'
        }
      ],
      stats: {
        total: 'Total Journals',
        published: 'Published',
        drafts: 'Drafts',
        views: 'Total Views'
      },
      empty: {
        title: 'No journals yet',
        description: 'Create your first journal with AI',
        action: 'Create First Journal'
      }
    }
  };

  const t = content[language];

  const getCategoryIcon = (categoryId: string) => {
    const category = t.categories.find(cat => cat.id === categoryId);
    return category ? category.icon : BookOpen;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredJournals = t.journals.filter(journal => {
    const matchesSearch = journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journal.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || journal.category === selectedCategory;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'my' && journal.authorId === user?.id) ||
                      (activeTab === 'featured' && journal.featured) ||
                      (activeTab === 'recent');
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const myJournals = user ? t.journals.filter(journal => journal.authorId === user.id) : [];
  const publishedCount = myJournals.filter(j => j.status === 'published').length;
  const draftCount = myJournals.filter(j => j.status === 'draft').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-iwl-purple-100 rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4 text-iwl-purple" />
              <span className="text-sm font-medium text-iwl-purple">{t.hero.badge}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.hero.title.split('\n').map((line, index) => (
                <div key={index} className={index === 1 ? 'text-iwl-gradient' : ''}>
                  {line}
                </div>
              ))}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>

            <Button
              onClick={() => onNavigate('journal-editor')}
              className="bg-iwl-gradient hover:opacity-90 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              {t.actions.create}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section (for logged-in users) */}
      {user && (
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-iwl-gradient mb-2">
                  {myJournals.length}
                </div>
                <div className="text-gray-600">{t.stats.total}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-iwl-gradient mb-2">
                  {publishedCount}
                </div>
                <div className="text-gray-600">{t.stats.published}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-iwl-gradient mb-2">
                  {draftCount}
                </div>
                <div className="text-gray-600">{t.stats.drafts}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-iwl-gradient mb-2">
                  {myJournals.reduce((sum, j) => sum + j.views, 0)}
                </div>
                <div className="text-gray-600">{t.stats.views}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={t.search.placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {t.categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-iwl-gradient hover:opacity-90 text-white" : ""}
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
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger value="all">{t.tabs.all}</TabsTrigger>
              <TabsTrigger value="my">{t.tabs.my}</TabsTrigger>
              <TabsTrigger value="featured">{t.tabs.featured}</TabsTrigger>
              <TabsTrigger value="recent">{t.tabs.recent}</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Journal Grid */}
          {filteredJournals.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJournals.map((journal) => {
                const CategoryIcon = getCategoryIcon(journal.category);
                return (
                  <Card key={journal.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-iwl-purple-100 text-iwl-purple">
                            <CategoryIcon className="w-3 h-3 mr-1" />
                            {t.categories.find(c => c.id === journal.category)?.name}
                          </Badge>
                          {journal.featured && (
                            <Badge className="bg-iwl-gradient text-white">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <Badge className={getStatusColor(journal.status)}>
                          {journal.status}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-lg hover:text-iwl-purple transition-colors">
                        {journal.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 line-clamp-3">
                        {journal.excerpt}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {/* Author and Date */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {journal.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {journal.createdAt}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {journal.readTime}분 읽기
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {journal.views}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {journal.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => onNavigate('journal-detail', { journalId: journal.id.toString() })}
                            className="flex-1 bg-iwl-gradient hover:opacity-90 text-white"
                          >
                            {t.actions.view}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                          {journal.authorId === user?.id && (
                            <Button
                              variant="outline"
                              onClick={() => onNavigate('journal-editor', { journalId: journal.id.toString() })}
                              className="border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white"
                            >
                              {journal.status === 'draft' ? t.actions.continue : t.actions.edit}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t.empty.title}
              </h3>
              <p className="text-gray-500 mb-6">
                {t.empty.description}
              </p>
              <Button
                onClick={() => onNavigate('journal-editor')}
                className="bg-iwl-gradient hover:opacity-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t.empty.action}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export { JournalPage };