import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  User,
  Brain,
  Target,
  Lightbulb,
  BarChart3,
  Clock,
  Award,
  ArrowRight
} from 'lucide-react';

interface CourseFeedbackPageProps {
  language: 'ko' | 'en';
  week: number;
  onNavigate: (page: string, journalId?: string, category?: string, week?: number) => void;
}

export function CourseFeedbackPage({ language, week, onNavigate }: CourseFeedbackPageProps) {
  const [selectedTab, setSelectedTab] = useState<'instructor' | 'ai'>('instructor');

  const content = {
    ko: {
      title: `${week}주차 피드백`,
      subtitle: "강사 피드백과 AI 분석 결과를 확인하세요",
      
      tabs: {
        instructor: "강사 피드백",
        ai: "AI 자동 분석"
      },
      
      // Mock feedback data
      instructorFeedback: {
        score: 87,
        instructor: {
          name: "이상혁",
          title: "생각정리의 기술 저자",
          photo: "/instructor-avatar.jpg"
        },
        evaluation: {
          promptQuality: 92,
          systematicThinking: 85,
          creativity: 90,
          execution: 82
        },
        feedback: "이번 주차에서 AI와의 협력적 대화 방식이 눈에 띄게 향상되었습니다. 특히 단계별로 정보를 확장해나가는 질문 체계가 매우 인상적이었어요. 다만 마지막 정리 단계에서 조금 더 구체적인 실행 계획을 포함했다면 더욱 완성도 높은 결과물이 되었을 것 같습니다.",
        strengths: [
          "체계적인 정보 수집 프로세스",
          "AI와의 자연스러운 대화 흐름",
          "카테고리별 세분화 접근법"
        ],
        improvements: [
          "실행 계획의 구체성 보완",
          "우선순위 설정 기준 명확화",
          "예상 변수 고려사항 추가"
        ],
        nextWeekAdvice: "다음 주차에서는 오늘 수집한 정보를 바탕으로 개인 맞춤 여행 컨셉을 정의해보겠습니다. 자신의 여행 스타일과 선호도를 구체적으로 생각해보세요."
      },
      
      aiAnalysis: {
        conversationMetrics: {
          totalQuestions: 12,
          followUpRate: 85,
          depthScore: 78
        },
        comparisonData: {
          position: "상위 15%",
          averageScore: 72,
          yourScore: 87
        },
        patterns: [
          {
            pattern: "체계적 질문 설계",
            score: 92,
            description: "카테고리별로 정보를 체계적으로 수집하는 질문 패턴을 보였습니다."
          },
          {
            pattern: "확장적 사고",
            score: 88,
            description: "하나의 답변에서 다음 질문을 자연스럽게 도출하는 능력이 우수합니다."
          },
          {
            pattern: "실용적 접근",
            score: 75,
            description: "실제 활용 가능한 정보 위주로 질문하는 경향을 보입니다."
          }
        ],
        recommendations: [
          "더 구체적인 실행 계획 질문 추가",
          "예상 문제점에 대한 사전 질문 고려",
          "개인화된 맥락 정보 더 많이 제공"
        ]
      },
      
      // Actions
      backToWeek: "주차 학습으로 돌아가기",
      nextWeek: "다음 주차 시작하기",
      askQuestion: "강사에게 질문하기",
      reviewSubmission: "제출물 다시 보기"
    },
    en: {
      title: `Week ${week} Feedback`,
      subtitle: "Check instructor feedback and AI analysis results",
      
      tabs: {
        instructor: "Instructor Feedback",
        ai: "AI Auto Analysis"
      },
      
      instructorFeedback: {
        score: 87,
        instructor: {
          name: "Sang-hyuk Lee",
          title: "Author of 'The Art of Organizing Thoughts'",
          photo: "/instructor-avatar.jpg"
        },
        evaluation: {
          promptQuality: 92,
          systematicThinking: 85,
          creativity: 90,
          execution: 82
        },
        feedback: "Your collaborative conversation style with AI has noticeably improved this week. The systematic questioning approach to expand information step by step was particularly impressive. However, including more specific execution plans in the final organization stage would have made the outcome even more complete.",
        strengths: [
          "Systematic information collection process",
          "Natural conversation flow with AI",
          "Category-based subdivision approach"
        ],
        improvements: [
          "Enhance specificity of execution plans",
          "Clarify priority setting criteria",
          "Add consideration of expected variables"
        ],
        nextWeekAdvice: "Next week, we'll define a personalized travel concept based on the information collected today. Think specifically about your travel style and preferences."
      },
      
      aiAnalysis: {
        conversationMetrics: {
          totalQuestions: 12,
          followUpRate: 85,
          depthScore: 78
        },
        comparisonData: {
          position: "Top 15%",
          averageScore: 72,
          yourScore: 87
        },
        patterns: [
          {
            pattern: "Systematic Question Design",
            score: 92,
            description: "Showed systematic information collection questioning patterns by category."
          },
          {
            pattern: "Expansive Thinking",
            score: 88,
            description: "Excellent ability to naturally derive next questions from one answer."
          },
          {
            pattern: "Practical Approach",
            score: 75,
            description: "Tends to focus questions on practically usable information."
          }
        ],
        recommendations: [
          "Add more specific execution plan questions",
          "Consider preliminary questions about expected problems",
          "Provide more personalized context information"
        ]
      },
      
      backToWeek: "Back to Week Learning",
      nextWeek: "Start Next Week",
      askQuestion: "Ask Instructor",
      reviewSubmission: "Review Submission"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('course-week', undefined, undefined, week)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.backToWeek}
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              피드백 완료
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8">
            <Button
              variant={selectedTab === 'instructor' ? 'default' : 'outline'}
              onClick={() => setSelectedTab('instructor')}
              className={selectedTab === 'instructor' ? 'bg-iwl-purple hover:bg-iwl-purple/90' : ''}
            >
              <User className="w-4 h-4 mr-2" />
              {t.tabs.instructor}
            </Button>
            <Button
              variant={selectedTab === 'ai' ? 'default' : 'outline'}
              onClick={() => setSelectedTab('ai')}
              className={selectedTab === 'ai' ? 'bg-iwl-purple hover:bg-iwl-purple/90' : ''}
            >
              <Brain className="w-4 h-4 mr-2" />
              {t.tabs.ai}
            </Button>
          </div>

          {selectedTab === 'instructor' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Feedback */}
              <div className="lg:col-span-2 space-y-6">
                {/* Score Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-iwl-gradient rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{t.instructorFeedback.instructor.name}</h3>
                          <p className="text-sm text-gray-600">{t.instructorFeedback.instructor.title}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-iwl-purple">{t.instructorFeedback.score}점</div>
                        <div className="text-sm text-gray-600">100점 만점</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-iwl-purple-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{t.instructorFeedback.feedback}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Evaluation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-iwl-purple" />
                      항목별 평가
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(t.instructorFeedback.evaluation).map(([key, score]) => {
                      const labels = {
                        promptQuality: '프롬프트 품질',
                        systematicThinking: '체계적 사고',
                        creativity: '창의성',
                        execution: '실행력'
                      };
                      return (
                        <div key={key}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              {labels[key as keyof typeof labels]}
                            </span>
                            <span className="text-sm font-bold text-iwl-purple">{score}점</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Strengths & Improvements */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        잘한 점
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {t.instructorFeedback.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-orange-600 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        개선할 점
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {t.instructorFeedback.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <Lightbulb className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Next Week Advice */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-iwl-purple flex items-center gap-2">
                      <ArrowRight className="w-5 h-5" />
                      다음 주차 조언
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {t.instructorFeedback.nextWeekAdvice}
                    </p>
                    <Button 
                      onClick={() => onNavigate('course-week', undefined, undefined, week + 1)}
                      className="w-full bg-iwl-purple hover:bg-iwl-purple/90"
                    >
                      {week + 1}주차 시작하기
                    </Button>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>추가 액션</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => onNavigate('course-submit', undefined, undefined, week)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {t.reviewSubmission}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <User className="w-4 h-4 mr-2" />
                      {t.askQuestion}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => onNavigate('course-dashboard')}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      전체 대시보드
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {selectedTab === 'ai' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Conversation Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-iwl-blue" />
                    대화 분석 지표
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-iwl-blue">{t.aiAnalysis.conversationMetrics.totalQuestions}</div>
                      <div className="text-xs text-gray-600">총 질문 수</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">{t.aiAnalysis.conversationMetrics.followUpRate}%</div>
                      <div className="text-xs text-gray-600">후속 질문률</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-iwl-purple">{t.aiAnalysis.conversationMetrics.depthScore}</div>
                      <div className="text-xs text-gray-600">깊이 점수</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Peer Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    동료 대비 위치
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-500 mb-2">{t.aiAnalysis.comparisonData.position}</div>
                    <p className="text-sm text-gray-600">전체 수강생 중</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>나의 점수</span>
                      <span className="font-bold text-iwl-purple">{t.aiAnalysis.comparisonData.yourScore}점</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>평균 점수</span>
                      <span className="text-gray-600">{t.aiAnalysis.comparisonData.averageScore}점</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Thinking Patterns */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-iwl-purple" />
                    사고 패턴 분석
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {t.aiAnalysis.patterns.map((pattern, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-900">{pattern.pattern}</h4>
                        <Badge 
                          variant="outline" 
                          className={pattern.score >= 90 ? 'border-green-500 text-green-700' : 
                                    pattern.score >= 80 ? 'border-iwl-blue text-iwl-blue' : 
                                    'border-gray-400 text-gray-600'}
                        >
                          {pattern.score}점
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
                      <Progress value={pattern.score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-orange-500" />
                    AI 개선 제안
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {t.aiAnalysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}