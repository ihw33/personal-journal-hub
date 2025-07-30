import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
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
  MoreHorizontal
} from 'lucide-react';

interface JournalDetailProps {
  journalId: string | null;
  user: any;
  onNavigate: (page: string, params?: any) => void;
  language: 'ko' | 'en';
}

const JournalDetail: React.FC<JournalDetailProps> = ({
  journalId,
  user,
  onNavigate,
  language
}) => {
  const [liked, setLiked] = useState(false);

  const content = {
    ko: {
      back: '목록으로 돌아가기',
      author: '작성자',
      publishedAt: '발행일',
      readTime: '읽는 시간',
      views: '조회수',
      likes: '좋아요',
      tags: '태그',
      aiAssisted: 'AI 협업',
      actions: {
        like: '좋아요',
        share: '공유하기',
        edit: '수정하기',
        more: '더보기'
      },
      relatedJournals: '관련 저널',
      comments: '댓글',
      noComments: '아직 댓글이 없습니다',
      writeComment: '댓글 작성하기',
      aiInsight: 'AI 인사이트',
      aiSummary: '이 저널의 핵심 아이디어와 통찰을 AI가 분석했습니다.',
      keyPoints: '핵심 포인트',
      suggestions: '추천 학습'
    },
    en: {
      back: 'Back to List',
      author: 'Author',
      publishedAt: 'Published',
      readTime: 'Read Time',
      views: 'Views',
      likes: 'Likes',
      tags: 'Tags',
      aiAssisted: 'AI Assisted',
      actions: {
        like: 'Like',
        share: 'Share',
        edit: 'Edit',
        more: 'More'
      },
      relatedJournals: 'Related Journals',
      comments: 'Comments',
      noComments: 'No comments yet',
      writeComment: 'Write a comment',
      aiInsight: 'AI Insight',
      aiSummary: 'AI has analyzed the key ideas and insights from this journal.',
      keyPoints: 'Key Points',
      suggestions: 'Recommended Learning'
    }
  };

  const t = content[language];

  // Mock journal data - would come from API in real implementation
  const journal = {
    id: journalId || '1',
    title: 'AI와 함께 제주도 여행 계획 세우기',
    content: `
      이번 AI 협업 학습을 통해 제주도 여행 계획을 세우는 과정에서 많은 것을 배웠습니다. 
      
      ## 창의적 사고의 시작
      
      처음에는 단순히 관광지 목록을 나열하는 것에서 시작했지만, AI와의 대화를 통해 여행의 의미와 목적에 대해 더 깊이 생각해보게 되었습니다.
      
      ### Phase 1: 기본 사고법 익히기
      
      AI에게 "제주도 여행 계획을 세워줘"라고 단순히 요청하는 것이 아니라, 함께 협업하는 방법을 배웠습니다. 
      
      - 명확한 질문하기
      - 구체적인 상황 설명하기  
      - 단계별로 접근하기
      
      ### Phase 2: 창의적 아이디어 발산
      
      AI와 함께 브레인스토밍하며 일반적인 관광 코스를 넘어선 독특한 여행 아이디어들을 발견했습니다.
      
      **창의적 아이디어들:**
      1. 제주 방언으로 현지인과 대화해보기
      2. 제주도의 화산 지형을 활용한 지질학 탐험
      3. 전통 해녀 문화 체험과 현대 환경 보호 연결하기
      
      ### Phase 3: 분석적 검토와 실행 계획
      
      발산한 아이디어들을 현실적으로 검토하고 실제 실행 가능한 계획으로 구체화했습니다.
      
      ## 핵심 인사이트
      
      AI와의 협업에서 가장 중요한 것은 **질문의 질**이었습니다. 좋은 질문이 좋은 답변을 만들어내고, 이것이 창의적 사고의 촉매가 된다는 것을 깨달았습니다.
      
      또한 AI는 단순한 도구가 아니라 **사고의 파트너**로서 인간의 직관과 AI의 논리적 분석이 결합될 때 시너지를 낼 수 있다는 것을 경험했습니다.
      
      ## 다음 단계
      
      이제 실제로 제주도 여행을 떠나면서 이 계획을 실행해보고, 그 경험을 바탕으로 또 다른 AI 협업 프로젝트를 시작해볼 예정입니다.
    `,
    author: {
      id: 'user-1',
      name: '김지은',
      avatar: '',
      bio: 'AI 협업 학습 전문가'
    },
    publishedAt: '2024-01-15',
    readTime: 8,
    views: 234,
    likes: 15,
    tags: ['AI협업', '제주여행', '창의사고', '여행계획'],
    category: 'travel',
    aiAssisted: true,
    aiInsights: {
      summary: 'AI와의 협업을 통해 단순한 여행 계획을 넘어 창의적 사고법을 학습한 과정을 체계적으로 정리한 저널입니다.',
      keyPoints: [
        '질문의 질이 AI 협업의 핵심',
        'AI를 도구가 아닌 사고 파트너로 인식',
        '창의적 발산과 분석적 검토의 균형'
      ],
      suggestions: [
        'Phase 2: 창의적 사고 심화 과정',
        'AI 프롬프트 엔지니어링 학습',
        '분석적 사고 실습 프로그램'
      ]
    }
  };

  const relatedJournals = [
    {
      id: 2,
      title: '복잡한 비즈니스 문제 해결하기',
      author: '박민수',
      readTime: 6,
      category: 'business'
    },
    {
      id: 3,
      title: '창의적 아이디어 발상법',
      author: '이서연',
      readTime: 5,
      category: 'creative'
    }
  ];

  const isAuthor = user?.id === journal.author.id;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 border-b">
        <div className="container mx-auto px-4">
          <Button
            variant="outline"
            onClick={() => onNavigate('journal')}
            className="mb-6 border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Button>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-iwl-purple-100 text-iwl-purple">
                <BookOpen className="w-3 h-3 mr-1" />
                {journal.category}
              </Badge>
              {journal.aiAssisted && (
                <Badge className="bg-iwl-gradient text-white">
                  <Brain className="w-3 h-3 mr-1" />
                  {t.aiAssisted}
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {journal.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={journal.author.avatar} />
                  <AvatarFallback className="bg-iwl-purple-100 text-iwl-purple">
                    {journal.author.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span>{journal.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{journal.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{journal.readTime}분 읽기</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{journal.views}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  {journal.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-iwl-gradient mt-8 mb-4">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    } else if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <p key={index} className="font-semibold text-gray-900 mt-4 mb-2">
                          {paragraph.replace(/\*\*/g, '')}
                        </p>
                      );
                    } else if (paragraph.trim().match(/^\d+\./)) {
                      return (
                        <p key={index} className="ml-4 text-gray-700 mb-2">
                          {paragraph}
                        </p>
                      );
                    } else if (paragraph.trim().startsWith('- ')) {
                      return (
                        <p key={index} className="ml-4 text-gray-700 mb-2">
                          {paragraph}
                        </p>
                      );
                    } else if (paragraph.trim()) {
                      return (
                        <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant={liked ? "default" : "outline"}
                onClick={() => setLiked(!liked)}
                className={liked ? "bg-red-500 hover:bg-red-600 text-white" : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"}
              >
                <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                {t.actions.like} ({journal.likes + (liked ? 1 : 0)})
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                {t.actions.share}
              </Button>
              {isAuthor && (
                <Button 
                  onClick={() => onNavigate('journal-editor', { journalId: journal.id })}
                  className="bg-iwl-gradient hover:opacity-90 text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {t.actions.edit}
                </Button>
              )}
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">{t.tags}</h3>
              <div className="flex flex-wrap gap-2">
                {journal.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="cursor-pointer hover:bg-iwl-purple-100">
                    <Tag className="w-3 h-3 mr-1" />
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-iwl-purple" />
                  {t.author}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={journal.author.avatar} />
                    <AvatarFallback className="bg-iwl-purple-100 text-iwl-purple">
                      {journal.author.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{journal.author.name}</div>
                    <div className="text-sm text-gray-600">{journal.author.bio}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            {journal.aiInsights && (
              <Card className="bg-gradient-to-br from-iwl-purple-50 to-iwl-blue-50 border-iwl-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-iwl-gradient">
                    <Brain className="w-5 h-5" />
                    {t.aiInsight}
                  </CardTitle>
                  <CardDescription>
                    {t.aiSummary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{t.keyPoints}</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {journal.aiInsights.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-iwl-purple rounded-full mt-2 flex-shrink-0"></div>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{t.suggestions}</h4>
                    <div className="space-y-2">
                      {journal.aiInsights.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-xs border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white"
                          onClick={() => onNavigate('courses')}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Journals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-iwl-blue" />
                  {t.relatedJournals}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedJournals.map((related) => (
                    <div
                      key={related.id}
                      className="p-3 border border-gray-200 rounded-lg hover:border-iwl-purple-200 hover:bg-iwl-purple-50 transition-colors cursor-pointer"
                      onClick={() => onNavigate('journal-detail', { journalId: related.id.toString() })}
                    >
                      <h4 className="font-medium text-gray-900 mb-1 text-sm">
                        {related.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{related.author}</span>
                        <span>{related.readTime}분</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export { JournalDetail };