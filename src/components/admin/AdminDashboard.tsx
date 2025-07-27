import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  LayoutDashboard,
  PenTool,
  FileText,
  Mail,
  Users,
  Settings,
  LogOut,
  Plus,
  Eye,
  Edit3,
  Trash2,
  TrendingUp,
  Calendar,
  BarChart3,
  Target,
  Lightbulb,
  Clock,
  Filter,
  Search,
  MoreVertical,
  Home,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ language, onNavigate }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [editorMode, setEditorMode] = useState('list');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const contentText = {
    ko: {
      // 사이드바
      dashboard: "대시보드",
      posts: "글 관리",
      editor: "새 글 작성",
      newsletter: "뉴스레터",
      subscribers: "구독자",
      settings: "설정",
      logout: "로그아웃",
      viewSite: "사이트 보기",
      menu: "메뉴",
      
      // 대시보드
      totalPosts: "전체 글",
      publishedPosts: "발행됨",
      draftPosts: "임시저장",
      completePosts: "완성",
      privatePosts: "비공개",
      
      // 인사이트
      weeklyInsights: "이번 주 인사이트",
      popularContent: "인기 콘텐츠 TOP 3",
      readerEngagement: "독자 참여도",
      weeklyGoal: "이번 주 목표",
      aiRecommendations: "AI 추천 액션",
      
      // 액션
      newPost: "새 글 쓰기",
      viewPost: "미리보기",
      editPost: "편집",
      deletePost: "삭제",
      manageNewsletter: "뉴스레터 관리",
      viewSubscribers: "구독자 보기",
      
      // 통계
      weeklyTrend: "주간 발행 트렌드",
      categoryDistribution: "카테고리별 분포",
      performance: "성과 지표",
      
      // 빠른 액션
      quickActions: "빠른 액션",
      recentActivity: "최근 활동",
      
      // 에디터
      title: "제목",
      category: "카테고리",
      summary: "요약",
      content: "내용",
      save: "저장",
      publish: "발행",
      
      // 필터
      allPosts: "전체",
      published: "발행됨",
      draft: "임시저장",
      private: "비공개"
    },
    en: {
      // 사이드바
      dashboard: "Dashboard",
      posts: "Posts",
      editor: "New Post",
      newsletter: "Newsletter",
      subscribers: "Subscribers",
      settings: "Settings",
      logout: "Logout",
      viewSite: "View Site",
      menu: "Menu",
      
      // 대시보드
      totalPosts: "Total Posts",
      publishedPosts: "Published",
      draftPosts: "Drafts",
      completePosts: "Complete",
      privatePosts: "Private",
      
      // 인사이트
      weeklyInsights: "Weekly Insights",
      popularContent: "Popular Content TOP 3",
      readerEngagement: "Reader Engagement",
      weeklyGoal: "Weekly Goal",
      aiRecommendations: "AI Recommendations",
      
      // 액션
      newPost: "New Post",
      viewPost: "Preview",
      editPost: "Edit",
      deletePost: "Delete",
      manageNewsletter: "Manage Newsletter",
      viewSubscribers: "View Subscribers",
      
      // 통계
      weeklyTrend: "Weekly Publishing Trend",
      categoryDistribution: "Category Distribution",
      performance: "Performance Metrics",
      
      // 빠른 액션
      quickActions: "Quick Actions",
      recentActivity: "Recent Activity",
      
      // 에디터
      title: "Title",
      category: "Category",
      summary: "Summary",
      content: "Content",
      save: "Save",
      publish: "Publish",
      
      // 필터
      allPosts: "All",
      published: "Published",
      draft: "Draft",
      private: "Private"
    }
  };

  const t = contentText[language];

  // 모킹 데이터
  const stats = {
    total: 6,
    published: 4,
    draft: 2,
    complete: 0,
    private: 0
  };

  const weeklyData = [
    { name: '월', posts: 2 },
    { name: '화', posts: 1 },
    { name: '수', posts: 0 },
    { name: '목', posts: 1 },
    { name: '금', posts: 2 },
    { name: '토', posts: 0 },
    { name: '일', posts: 1 }
  ];

  const categoryData = [
    { name: '창의적 사고', value: 30, color: '#7C3AED' },
    { name: '디지털 저널링', value: 25, color: '#3B82F6' },
    { name: 'AI 도구', value: 20, color: '#10B981' },
    { name: '생각정리', value: 15, color: '#F59E0B' },
    { name: '기타', value: 10, color: '#EF4444' }
  ];

  const recentPosts = [
    {
      id: 1,
      title: "AI와 창의성의 만남",
      category: "창의적 사고",
      status: "published",
      date: "2024.1.25",
      views: 245
    },
    {
      id: 2,
      title: "디지털 시대의 깊은 사고",
      category: "생각정리",
      status: "published",
      date: "2024.1.24",
      views: 189
    },
    {
      id: 3,
      title: "저널링과 AI",
      category: "디지털 저널링",
      status: "draft",
      date: "2024.1.23",
      views: 0
    }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'posts', label: t.posts, icon: FileText },
    { id: 'editor', label: t.editor, icon: PenTool },
    { id: 'newsletter', label: t.newsletter, icon: Mail },
    { id: 'subscribers', label: t.subscribers, icon: Users },
    { id: 'settings', label: t.settings, icon: Settings }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      published: { variant: 'default' as const, color: 'bg-green-500', text: t.published },
      draft: { variant: 'secondary' as const, color: 'bg-orange-500', text: t.draft },
      private: { variant: 'outline' as const, color: 'bg-purple-500', text: t.private }
    };
    
    const config = variants[status as keyof typeof variants] || variants.draft;
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
  };

  const closeSidebar = () => setSidebarOpen(false);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* 통계 카드들 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        <Card className="bg-gray-100">
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-gray-700">{stats.total}</div>
            <div className="text-xs md:text-sm text-gray-500">{t.totalPosts}</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-green-600">{stats.published}</div>
            <div className="text-xs md:text-sm text-green-500">{t.publishedPosts}</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-orange-600">{stats.draft}</div>
            <div className="text-xs md:text-sm text-orange-500">{t.draftPosts}</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-blue-600">{stats.complete}</div>
            <div className="text-xs md:text-sm text-blue-500">{t.completePosts}</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-purple-600">{stats.private}</div>
            <div className="text-xs md:text-sm text-purple-500">{t.privatePosts}</div>
          </CardContent>
        </Card>
      </div>

      {/* 메인 콘텐츠 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 주간 트렌드 차트 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
              <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-iwl-purple" />
              <span>{t.weeklyTrend}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="posts" fill="url(#gradient)" />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 카테고리 분포 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
              <Target className="w-4 h-4 md:w-5 md:h-5 text-iwl-blue" />
              <span>{t.categoryDistribution}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 인사이트 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* 인기 콘텐츠 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
              <span>{t.popularContent}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentPosts.slice(0, 3).map((post, index) => (
              <div key={post.id} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-iwl-gradient rounded-full flex items-center justify-center text-white text-xs">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{post.title}</div>
                  <div className="text-xs text-muted-foreground">{post.views} 조회</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 이번 주 목표 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-iwl-purple" />
              <span>{t.weeklyGoal}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>새 글 작성</span>
                <span>2/3</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>독자 참여</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* AI 추천 */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
              <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
              <span>{t.aiRecommendations}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-medium">📝 글 작성 제안</div>
              <div className="text-xs text-muted-foreground mt-1">
                &quot;AI 도구 활용법&quot; 카테고리에 새 글을 작성해보세요
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium">🎯 SEO 최적화</div>
              <div className="text-xs text-muted-foreground mt-1">
                메타 설명을 추가하면 검색 노출을 늘릴 수 있어요
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPostsList = () => (
    <div className="space-y-6">
      {/* 필터 및 검색 */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            {t.allPosts}
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="글 검색..."
              className="pl-10 pr-4 py-2 border rounded-lg text-sm w-full sm:w-auto"
            />
          </div>
          <Button onClick={() => setEditorMode('create')} className="bg-iwl-gradient hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            {t.newPost}
          </Button>
        </div>
      </div>

      {/* 글 목록 */}
      <div className="space-y-3">
        {recentPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                    <h3 className="font-medium truncate">{post.title}</h3>
                    {getStatusBadge(post.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span>{post.category}</span> • <span>{post.date}</span>
                    {post.views > 0 && <span> • {post.views} 조회</span>}
                  </div>
                </div>
                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderEditor = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* 메인 에디터 */}
      <div className="lg:col-span-3 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">새 글 작성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t.title}</label>
              <input
                type="text"
                placeholder="글 제목을 입력하세요..."
                className="w-full p-3 border rounded-lg text-sm md:text-base"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">{t.category}</label>
                <select className="w-full p-3 border rounded-lg text-sm md:text-base">
                  <option>창의적 사고</option>
                  <option>디지털 저널링</option>
                  <option>AI 도구</option>
                  <option>생각정리</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">상태</label>
                <select className="w-full p-3 border rounded-lg text-sm md:text-base">
                  <option>임시저장</option>
                  <option>발행됨</option>
                  <option>비공개</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t.summary}</label>
              <textarea
                placeholder="글 요약을 입력하세요..."
                className="w-full p-3 border rounded-lg h-20 resize-none text-sm md:text-base"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t.content}</label>
              <textarea
                placeholder="내용을 입력하세요..."
                className="w-full p-3 border rounded-lg h-64 md:h-96 resize-none text-sm md:text-base"
              />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" className="w-full sm:w-auto">
                <Clock className="w-4 h-4 mr-2" />
                {t.save}
              </Button>
              <Button className="bg-iwl-gradient hover:opacity-90 w-full sm:w-auto">
                {t.publish}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI 도우미 패널 */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
              <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
              <span>AI 도우미</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm font-medium mb-2">💡 아이디어 확장</div>
              <div className="text-xs text-muted-foreground mb-2">
                주제에 대한 새로운 관점과 아이디어를 제안받으세요
              </div>
              <Button variant="outline" size="sm" className="w-full">
                아이디어 요청
              </Button>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium mb-2">📝 구조화 제안</div>
              <div className="text-xs text-muted-foreground mb-2">
                논리적인 글 구조와 목차를 제안받으세요
              </div>
              <Button variant="outline" size="sm" className="w-full">
                구조 제안
              </Button>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium mb-2">🎥 유튜브 스크립트</div>
              <div className="text-xs text-muted-foreground mb-2">
                글을 바탕으로 영상 스크립트를 생성하세요
              </div>
              <Button variant="outline" size="sm" className="w-full">
                스크립트 생성
              </Button>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-sm font-medium mb-2">🔍 SEO 최적화</div>
              <div className="text-xs text-muted-foreground mb-2">
                검색 엔진 최적화를 위한 키워드와 메타 정보
              </div>
              <Button variant="outline" size="sm" className="w-full">
                SEO 분석
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">📊 글쓰기 진행률</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>제목</span>
                <span>완료</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>개요</span>
                <span>50%</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>본문</span>
                <span>0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboard();
      case 'posts':
        return renderPostsList();
      case 'editor':
        return renderEditor();
      case 'newsletter':
        return <div className="p-8 text-center">뉴스레터 관리 페이지 (개발 예정)</div>;
      case 'subscribers':
        return <div className="p-8 text-center">구독자 관리 페이지 (개발 예정)</div>;
      case 'settings':
        return <div className="p-8 text-center">설정 페이지 (개발 예정)</div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* 사이드바 */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* 모바일 헤더 */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-iwl-gradient rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">iWL</span>
            </div>
            <div>
              <div className="font-semibold">Idea Work Lab</div>
              <div className="text-xs text-muted-foreground">관리자 대시보드</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeSidebar}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* 데스크톱 로고 */}
        <div className="hidden lg:block p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-iwl-gradient rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">iWL</span>
            </div>
            <div>
              <div className="font-semibold">Idea Work Lab</div>
              <div className="text-xs text-muted-foreground">관리자 대시보드</div>
            </div>
          </div>
        </div>

        {/* 네비게이션 */}
        <div className="flex-1 p-4 overflow-y-auto">
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    closeSidebar();
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    currentView === item.id
                      ? 'bg-iwl-purple-50 text-iwl-purple'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 하단 액션 버튼들 */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {/* 사이트 보기 버튼 */}
          <Button
            variant="outline"
            onClick={() => onNavigate('home')}
            className="w-full justify-start text-gray-600 hover:bg-gray-50"
          >
            <Home className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="truncate">{t.viewSite}</span>
            <ExternalLink className="w-4 h-4 ml-auto flex-shrink-0" />
          </Button>
          
          {/* 로그아웃 버튼 */}
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="w-full justify-start text-gray-600 hover:bg-gray-50"
          >
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="truncate">{t.logout}</span>
          </Button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {/* 모바일 헤더 */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
              <span className="ml-2">{t.menu}</span>
            </Button>
            <h1 className="text-lg font-semibold">
              {sidebarItems.find(item => item.id === currentView)?.label || t.dashboard}
            </h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {/* 데스크톱 헤더 */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {sidebarItems.find(item => item.id === currentView)?.label || t.dashboard}
            </h1>
            <p className="text-gray-600 mt-1">
              {currentView === 'dashboard' ? "관리자 대시보드에 오신 것을 환영합니다" : ""}
            </p>
          </div>

          {/* 플로팅 액션 버튼 */}
          {currentView !== 'editor' && (
            <div className="fixed bottom-6 right-6 z-50">
              <Button
                onClick={() => {
                  setCurrentView('editor');
                  setEditorMode('create');
                }}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-iwl-gradient hover:opacity-90 shadow-lg fab-animation"
              >
                <Plus className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </div>
          )}

          {/* 콘텐츠 */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}