import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  BarChart3,
  Clock,
  Star,
  Award,
  TrendingUp,
  Calendar,
  BookOpen,
  Target,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  MapPin,
  User,
  Brain,
  Home
} from 'lucide-react';

interface CourseDashboardProps {
  language: 'ko' | 'en';
  onNavigate: (page: string, journalId?: string, category?: string, week?: number) => void;
}

export function CourseDashboard({ language, onNavigate }: CourseDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'recent'>('all');

  const content = {
    ko: {
      title: "학습 대시보드",
      subtitle: "제주도 AI 협력 학습 과정 진행 현황",
      
      // Overview Stats
      overview: {
        completedWeeks: 3,
        totalWeeks: 8,
        averageScore: 85,
        rank: "상위 12%",
        studyTime: "14시간 30분",
        submissions: 3
      },
      
      // Weekly Progress
      weeklyProgress: [
        {
          week: 1,
          title: "생각의 재료 모으기",
          status: "completed",
          score: 87,
          submittedAt: "2024-01-15",
          feedback: "체계적인 정보 수집이 인상적이었습니다."
        },
        {
          week: 2,
          title: "여행의 컨셉 정의하기",
          status: "completed", 
          score: 92,
          submittedAt: "2024-01-22",
          feedback: "컨셉 정의가 매우 구체적이고 창의적입니다."
        },
        {
          week: 3,
          title: "여행의 뼈대 세우기",
          status: "completed",
          score: 78,
          submittedAt: "2024-01-29",
          feedback: "구조적 사고는 좋으나 실행 계획이 아쉽습니다."
        },
        {
          week: 4,
          title: "계획의 허점 찾기",
          status: "current",
          score: null,
          submittedAt: null,
          feedback: null
        },
        {
          week: 5,
          title: "여행에 '의미' 부여하기",
          status: "locked",
          score: null,
          submittedAt: null,
          feedback: null
        },
        {
          week: 6,
          title: "우리만의 여행 만들기",
          status: "locked",
          score: null,
          submittedAt: null,
          feedback: null
        },
        {
          week: 7,
          title: "생각을 현실로 만들기",
          status: "locked",
          score: null,
          submittedAt: null,
          feedback: null
        },
        {
          week: 8,
          title: "나의 생각 과정 돌아보기",
          status: "locked",
          score: null,
          submittedAt: null,
          feedback: null
        }
      ],
      
      // Strengths & Growth Areas
      analysis: {
        strengths: [
          {
            area: "체계적 정보 수집",
            score: 92,
            description: "카테고리별로 정보를 체계적으로 수집하는 능력이 뛰어납니다."
          },
          {
            area: "창의적 아이디어 발굴",
            score: 89,
            description: "독창적이고 참신한 아이디어를 제시하는 능력이 우수합니다."
          },
          {
            area: "AI 협업 활용도",
            score: 88,
            description: "AI와의 대화를 통해 효과적으로 인사이트를 도출합니다."
          }
        ],
        growthAreas: [
          {
            area: "실행 계획 구체화",
            score: 75,
            description: "아이디어를 구체적인 실행 계획으로 발전시키는 능력을 향상시켜보세요."
          },
          {
            area: "리스크 관리",
            score: 72,
            description: "예상 문제점과 대응 방안을 미리 고려하는 습관이 필요합니다."
          }
        ]
      },
      
      // Next Actions
      nextActions: [
        {
          type: "current",
          title: "4주차 과제 제출",
          description: "계획의 허점 찾기 실습 완료하기",
          deadline: "2024-02-05",
          priority: "high"
        },
        {
          type: "feedback",
          title: "3주차 피드백 확인",
          description: "강사 피드백을 바탕으로 개선점 파악하기",
          deadline: null,
          priority: "medium"
        },
        {
          type: "preparation",
          title: "5주차 준비",
          description: "여행에 의미 부여하기 위한 사전 생각 정리",
          deadline: null,
          priority: "low"
        }
      ],
      
      // Labels
      labels: {
        weekProgress: "주차별 진행률",
        currentWeek: "현재 주차",
        completedWeeks: "완료한 주차",
        averageScore: "평균 점수",
        myRank: "내 순위",
        totalStudyTime: "총 학습 시간",
        submissionCount: "제출 과제 수",
        strengths: "강점 분야",
        growthAreas: "성장 포인트",
        nextToDo: "다음 해야 할 일",
        viewFeedback: "피드백 보기",
        startWeek: "주차 시작",
        submitAssignment: "과제 제출",
        goToSite: "사이트 보기"
      }
    },
    en: {
      title: "Learning Dashboard", 
      subtitle: "Jeju AI Collaboration Course Progress",
      
      overview: {
        completedWeeks: 3,
        totalWeeks: 8,
        averageScore: 85,
        rank: "Top 12%",
        studyTime: "14h 30m",
        submissions: 3
      },
      
      weeklyProgress: [
        {
          week: 1,
          title: "Gathering Thinking Materials",
          status: "completed",
          score: 87,
          submittedAt: "2024-01-15",
          feedback: "Systematic information collection was impressive."
        },
        {
          week: 2,
          title: "Defining Travel Concept",
          status: "completed",
          score: 92,
          submittedAt: "2024-01-22", 
          feedback: "Concept definition was very specific and creative."
        },
        {
          week: 3,
          title: "Building Travel Framework",
          status: "completed",
          score: 78,
          submittedAt: "2024-01-29",
          feedback: "Good structural thinking but execution plan needs improvement."
        },
        {
          week: 4,
          title: "Finding Plan Weaknesses",
          status: "current",
          score: null,
          submittedAt: null,
          feedback: null
        },
        {
          week: 5,
          title: "Adding 'Meaning' to Travel",
          status: "locked",
          score: null,
          submittedAt: null,
          feedback: null
        },
        {
          week: 6,
          title: "Creating Our Unique Travel",
          status: "locked",
          score: null,
          submittedAt: null,
          feedback: null
        },
        {
          week: 7,
          title: "Making Thoughts Reality",
          status: "locked",
          score: null,
          submittedAt: null,
          feedback: null
        },
        {
          week: 8,
          title: "Reflecting on My Thinking Process",
          status: "locked",
          score: null,
          submittedAt: null,
          feedback: null
        }
      ],
      
      analysis: {
        strengths: [
          {
            area: "Systematic Information Collection",
            score: 92,
            description: "Excellent ability to systematically collect information by categories."
          },
          {
            area: "Creative Idea Generation", 
            score: 89,
            description: "Outstanding ability to present original and innovative ideas."
          },
          {
            area: "AI Collaboration Utilization",
            score: 88,
            description: "Effectively derives insights through conversations with AI."
          }
        ],
        growthAreas: [
          {
            area: "Execution Plan Refinement",
            score: 75,
            description: "Try to improve your ability to develop ideas into specific execution plans."
          },
          {
            area: "Risk Management",
            score: 72,
            description: "Need to develop the habit of considering potential problems and countermeasures in advance."
          }
        ]
      },
      
      nextActions: [
        {
          type: "current",
          title: "Submit Week 4 Assignment",
          description: "Complete finding plan weaknesses practice",
          deadline: "2024-02-05",
          priority: "high"
        },
        {
          type: "feedback",
          title: "Review Week 3 Feedback",
          description: "Identify improvement points based on instructor feedback",
          deadline: null,
          priority: "medium"
        },
        {
          type: "preparation",
          title: "Prepare for Week 5",
          description: "Organize preliminary thoughts for adding meaning to travel",
          deadline: null,
          priority: "low"
        }
      ],
      
      labels: {
        weekProgress: "Weekly Progress",
        currentWeek: "Current Week",
        completedWeeks: "Completed Weeks",
        averageScore: "Average Score",
        myRank: "My Rank",
        totalStudyTime: "Total Study Time", 
        submissionCount: "Submissions",
        strengths: "Strength Areas",
        growthAreas: "Growth Points",
        nextToDo: "Next To Do",
        viewFeedback: "View Feedback",
        startWeek: "Start Week",
        submitAssignment: "Submit Assignment",
        goToSite: "Go to Site"
      }
    }
  };

  const t = content[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'current': return 'bg-iwl-purple-100 text-iwl-purple';
      case 'locked': return 'bg-gray-100 text-gray-500';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'current': return <Clock className="w-4 h-4" />;
      case 'locked': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
            <Button 
              onClick={() => onNavigate('home')}
              variant="outline"
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              {t.labels.goToSite}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-iwl-purple mb-1">
                    {t.overview.completedWeeks}/{t.overview.totalWeeks}
                  </div>
                  <div className="text-sm text-gray-600">{t.labels.completedWeeks}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500 mb-1">{t.overview.averageScore}</div>
                  <div className="text-sm text-gray-600">{t.labels.averageScore}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-iwl-blue mb-1">{t.overview.rank}</div>
                  <div className="text-sm text-gray-600">{t.labels.myRank}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500 mb-1">{t.overview.studyTime}</div>
                  <div className="text-sm text-gray-600">{t.labels.totalStudyTime}</div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-iwl-purple" />
                  {t.labels.weekProgress}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {t.weeklyProgress.map((week, index) => (
                    <div key={week.week} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-iwl-gradient rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {week.week}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{week.title}</h4>
                            {week.submittedAt && (
                              <p className="text-sm text-gray-500">제출일: {week.submittedAt}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {week.score && (
                            <Badge variant="outline" className="border-iwl-purple text-iwl-purple">
                              {week.score}점
                            </Badge>
                          )}
                          <Badge className={getStatusColor(week.status)}>
                            {getStatusIcon(week.status)}
                            <span className="ml-1">
                              {week.status === 'completed' ? '완료' :
                               week.status === 'current' ? '진행중' : '잠김'}
                            </span>
                          </Badge>
                        </div>
                      </div>
                      
                      {week.feedback && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <p className="text-sm text-gray-700">{week.feedback}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {week.status === 'completed' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onNavigate('course-feedback', undefined, undefined, week.week)}
                          >
                            <Star className="w-3 h-3 mr-1" />
                            {t.labels.viewFeedback}
                          </Button>
                        )}
                        {week.status === 'current' && (
                          <>
                            <Button 
                              size="sm"
                              onClick={() => onNavigate('course-week', undefined, undefined, week.week)}
                              className="bg-iwl-purple hover:bg-iwl-purple/90"
                            >
                              <BookOpen className="w-3 h-3 mr-1" />
                              {t.labels.startWeek}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onNavigate('course-submit', undefined, undefined, week.week)}
                            >
                              <ArrowRight className="w-3 h-3 mr-1" />
                              {t.labels.submitAssignment}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strengths & Growth Areas */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    {t.labels.strengths}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {t.analysis.strengths.map((strength, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-900">{strength.area}</h4>
                        <Badge className="bg-green-100 text-green-700">{strength.score}점</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{strength.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {t.labels.growthAreas}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {t.analysis.growthAreas.map((area, index) => (
                    <div key={index} className="border-l-4 border-orange-500 pl-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-900">{area.area}</h4>
                        <Badge className="bg-orange-100 text-orange-700">{area.score}점</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{area.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-iwl-purple" />
                  {t.labels.nextToDo}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {t.nextActions.map((action, index) => (
                  <div key={index} className={`border rounded-lg p-3 ${getPriorityColor(action.priority)}`}>
                    <h4 className="font-semibold text-sm mb-1">{action.title}</h4>
                    <p className="text-xs mb-2">{action.description}</p>
                    {action.deadline && (
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="w-3 h-3" />
                        마감: {action.deadline}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-iwl-blue" />
                  빠른 통계
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>전체 진행률</span>
                    <span className="font-semibold">{Math.round((t.overview.completedWeeks / t.overview.totalWeeks) * 100)}%</span>
                  </div>
                  <Progress value={(t.overview.completedWeeks / t.overview.totalWeeks) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>평균 점수</span>
                    <span className="font-semibold">{t.overview.averageScore}점</span>
                  </div>
                  <Progress value={t.overview.averageScore} className="h-2" />
                </div>
                
                <div className="pt-3 border-t">
                  <Button 
                    onClick={() => onNavigate('course-jeju')}
                    className="w-full bg-iwl-gradient hover:opacity-90"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    코스 개요 보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}