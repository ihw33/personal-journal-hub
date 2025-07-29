import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { 
  ArrowLeft, 
  Edit, 
  Share2, 
  Heart, 
  MessageCircle, 
  BookOpen, 
  Clock, 
  Calendar,
  Sparkles,
  Brain,
  Lightbulb,
  TrendingUp,
  Users,
  Eye
} from 'lucide-react';

interface JournalDetailProps {
  language: 'ko' | 'en';
  journalId: string | null;
  user?: any;
  onNavigate: (page: string) => void;
}

// 샘플 저널 데이터
const sampleJournal = {
  id: '1',
  title: 'AI와 창의성의 만남: 새로운 사고의 지평',
  content: `
오늘은 AI와 인간의 창의성이 어떻게 조화를 이룰 수 있는지에 대해 깊이 생각해보았다.

## 현재의 관찰

최근 ChatGPT와 함께 작업하면서 느낀 점은, AI가 단순히 정보를 제공하는 도구가 아니라 사고의 파트너가 될 수 있다는 것이다. 특히 아이디어를 확장하고 다양한 관점을 제시하는 능력이 인상적이었다.

## 새로운 발견

💡 **AI와의 협력 과정에서 발견한 패턴:**

1. **질문의 질이 결과를 좌우한다** - 구체적이고 맥락이 풍부한 질문일수록 더 유용한 답변을 얻을 수 있었다.

2. **반복적 대화의 힘** - 한 번의 질문으로 끝나지 않고, 연속적인 대화를 통해 아이디어가 점진적으로 발전했다.

3. **인간의 직관과 AI의 논리** - AI의 체계적인 분석과 인간의 직관적 통찰이 결합될 때 가장 창의적인 결과가 나왔다.

## 실천적 적용

앞으로는 다음과 같은 방식으로 AI와 협력해보려고 한다:

- **아침 사고 루틴**: 매일 아침 하나의 주제에 대해 AI와 15분간 대화하기
- **아이디어 검증**: 떠오른 아이디어를 AI에게 다양한 각도로 분석해달라고 요청하기
- **반대 관점 탐색**: 내 생각의 약점이나 다른 시각을 AI에게 물어보기

## 미래에 대한 생각

AI와의 협력은 인간의 창의성을 대체하는 것이 아니라 증폭시키는 것 같다. 마치 현미경이나 망원경처럼, AI는 우리의 사고력을 확장시켜주는 인지적 도구가 될 수 있다.

중요한 것은 AI에게 의존하지 않고, AI와 함께 성장하는 것이다. 기술이 발전할수록 더욱 인간다운 사고와 감성이 중요해질 것이다.
  `,
  tags: ['AI', '창의성', '사고법', '협력', '미래'],
  publishedAt: '2024년 1월 15일',
  readingTime: 8,
  views: 1247,
  likes: 89,
  comments: 12,
  author: {
    name: '이상혁',
    avatar: '/placeholder-avatar.jpg',
    title: 'AI 생각정리 전문가'
  },
  aiInsights: [
    {
      type: 'pattern',
      title: '사고 패턴 분석',
      content: '이 글에서 논리적 구조화와 실천적 적용이 강하게 나타납니다. 관찰 → 분석 → 적용의 체계적 사고 흐름을 보여줍니다.'
    },
    {
      type: 'connection',
      title: '연관 아이디어',
      content: '디자인 씽킹, 시스템 사고, 메타인지와 연결됩니다. 특히 "도구로서의 AI" 관점은 McLuhan의 미디어 이론과 유사합니다.'
    },
    {
      type: 'suggestion',
      title: '발전 방향',
      content: '구체적인 사례나 실험 결과를 추가하면 더 설득력 있는 글이 될 것입니다. 또한 AI 협력의 한계점도 탐구해보세요.'
    }
  ]
};

export function JournalDetail({ language, journalId, user, onNavigate }: JournalDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showAiInsights, setShowAiInsights] = useState(true);

  const contentText = {
    ko: {
      backToJournal: "저널로 돌아가기",
      edit: "편집",
      share: "공유",
      like: "좋아요",
      comment: "댓글",
      readingTime: "읽기 시간",
      minutes: "분",
      views: "조회수",
      publishedOn: "발행일",
      tags: "태그",
      
      // AI 인사이트
      aiInsights: "AI 인사이트",
      patternAnalysis: "사고 패턴 분석",
      relatedIdeas: "연관 아이디어",
      suggestions: "발전 방향",
      
      // 관련 글
      relatedJournals: "관련 저널",
      moreByAuthor: "저자의 다른 글",
      
      // 댓글
      comments: "댓글",
      writeComment: "댓글 작성하기...",
      postComment: "댓글 등록"
    },
    en: {
      backToJournal: "Back to Journal",
      edit: "Edit",
      share: "Share",
      like: "Like",
      comment: "Comment",
      readingTime: "Reading time",
      minutes: "min",
      views: "views",
      publishedOn: "Published on",
      tags: "Tags",
      
      // AI 인사이트
      aiInsights: "AI Insights",
      patternAnalysis: "Thinking Pattern Analysis",
      relatedIdeas: "Related Ideas",
      suggestions: "Development Direction",
      
      // 관련 글
      relatedJournals: "Related Journals",
      moreByAuthor: "More by Author",
      
      // 댓글
      comments: "Comments",
      writeComment: "Write a comment...",
      postComment: "Post Comment"
    }
  };

  const t = contentText[language];

  // journalId가 없으면 샘플 데이터 사용
  const journal = sampleJournal;

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl mt-8 mb-4 text-iwl-gradient">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('💡 **')) {
        return <div key={index} className="bg-iwl-purple-50 border-l-4 border-iwl-purple p-4 my-4 rounded-r-lg">
          <p className="font-medium text-iwl-purple">{line}</p>
        </div>;
      }
      if (line.startsWith('- **')) {
        return <div key={index} className="ml-4 my-2">
          <p>{line.replace('- ', '• ')}</p>
        </div>;
      }
      if (line.trim() === '') {
        return <div key={index} className="h-4"></div>;
      }
      return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 상단 네비게이션 */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('journal')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToJournal}
            </Button>

            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                {t.edit}
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                {t.share}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            <article className="prose prose-lg max-w-none">
              {/* 헤더 */}
              <header className="mb-8">
                <h1 className="text-4xl mb-6">{journal.title}</h1>
                
                {/* 메타 정보 */}
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={journal.author.avatar} alt={journal.author.name} />
                      <AvatarFallback>{journal.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-foreground">{journal.author.name}</div>
                      <div className="text-sm">{journal.author.title}</div>
                    </div>
                  </div>
                  
                  <Separator orientation="vertical" className="h-6" />
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{journal.publishedAt}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{journal.readingTime} {t.minutes}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{journal.views.toLocaleString()} {t.views}</span>
                  </div>
                </div>

                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {journal.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-iwl-purple-50 text-iwl-purple">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </header>

              {/* 본문 */}
              <div className="mb-12">
                {formatContent(journal.content)}
              </div>

              {/* 인터랙션 버튼 */}
              <div className="flex items-center space-x-6 py-6 border-t border-b">
                <Button
                  variant="ghost"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`${isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {journal.likes + (isLiked ? 1 : 0)}
                </Button>
                
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {journal.comments}
                </Button>
                
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <Share2 className="w-5 h-5 mr-2" />
                  {t.share}
                </Button>
              </div>
            </article>
          </div>

          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* AI 인사이트 패널 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-iwl-gradient">
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t.aiInsights}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {journal.aiInsights.map((insight, index) => (
                    <div key={index} className="p-4 bg-iwl-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        {insight.type === 'pattern' && <Brain className="w-4 h-4 text-iwl-purple" />}
                        {insight.type === 'connection' && <TrendingUp className="w-4 h-4 text-iwl-purple" />}
                        {insight.type === 'suggestion' && <Lightbulb className="w-4 h-4 text-iwl-purple" />}
                        <h4 className="text-sm text-iwl-purple">{insight.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {insight.content}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 저자 정보 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={journal.author.avatar} alt={journal.author.name} />
                      <AvatarFallback>{journal.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="">{journal.author.name}</h3>
                      <p className="text-sm text-muted-foreground">{journal.author.title}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI와 함께하는 깊이 있는 사고법을 연구하고 실천하는 전문가입니다.
                  </p>
                  <Button variant="outline" className="w-full border-iwl-purple text-iwl-purple hover:bg-iwl-purple-50">
                    <Users className="w-4 h-4 mr-2" />
                    {t.moreByAuthor}
                  </Button>
                </CardContent>
              </Card>

              {/* 관련 글 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-iwl-purple" />
                    {t.relatedJournals}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "디지털 시대의 깊은 사고", time: "12분" },
                    { title: "저널링과 AI", time: "10분" },
                    { title: "생각의 구조화 방법", time: "15분" }
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 hover:bg-muted rounded-lg transition-colors"
                    >
                      <h4 className="text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.time} 읽기</p>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}