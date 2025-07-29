import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle, 
  Star, 
  MessageSquare, 
  Clock, 
  Target,
  BarChart3,
  Calendar,
  Award,
  Brain,
  FileText,
  Send,
  Eye,
  CheckCircle,
  XCircle,
  UserCheck,
  UserX,
  Coffee,
  Zap,
  Heart
} from 'lucide-react';
import { Language, Page } from '../../App';

interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
  currentWeek: number;
  currentPhase: number;
  completedPhases: number;
  totalPhases: number;
  progress: number;
  lastActivity: string;
  status: 'active' | 'at-risk' | 'excellent' | 'inactive';
  satisfactionScore: number;
  aiInteractions: number;
  strugglingTopics: string[];
  strengths: string[];
  averageSessionTime: number;
  streak: number;
}

interface CourseAnalytics {
  totalStudents: number;
  activeStudents: number;
  completionRate: number;
  averageSatisfaction: number;
  totalAIInteractions: number;
  averageProgress: number;
  weeklyMetrics: {
    week: number;
    completionRate: number;
    satisfaction: number;
    dropoutRate: number;
  }[];
}

interface FeedbackTemplate {
  id: string;
  title: string;
  content: string;
  category: 'encouragement' | 'guidance' | 'correction' | 'achievement';
}

interface InstructorDashboardProps {
  language: Language;
  onNavigate: (page: Page, ...args: any[]) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  language,
  onNavigate
}) => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Mock data - 실제로는 API에서 가져올 데이터
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: '김민수',
      email: 'kim@example.com',
      enrollmentDate: '2025-01-10',
      currentWeek: 2,
      currentPhase: 1,
      completedPhases: 3,
      totalPhases: 12,
      progress: 25,
      lastActivity: '3일 전',
      status: 'at-risk',
      satisfactionScore: 3.2,
      aiInteractions: 12,
      strugglingTopics: ['AI 프롬프트 작성', '구체적 질문 기법'],
      strengths: ['창의적 사고', '분석적 접근'],
      averageSessionTime: 25,
      streak: 0
    },
    {
      id: '2',
      name: '이영희',
      email: 'lee@example.com',
      enrollmentDate: '2025-01-08',
      currentWeek: 3,
      currentPhase: 2,
      completedPhases: 8,
      totalPhases: 12,
      progress: 67,
      lastActivity: '오늘',
      status: 'excellent',
      satisfactionScore: 4.9,
      aiInteractions: 47,
      strugglingTopics: [],
      strengths: ['꾸준한 실행력', '깊이 있는 질문', 'AI 협업 숙련'],
      averageSessionTime: 45,
      streak: 5
    },
    {
      id: '3',
      name: '박민준',
      email: 'park@example.com',
      enrollmentDate: '2025-01-12',
      currentWeek: 1,
      currentPhase: 3,
      completedPhases: 2,
      totalPhases: 12,
      progress: 17,
      lastActivity: '1일 전',
      status: 'active',
      satisfactionScore: 4.2,
      aiInteractions: 8,
      strugglingTopics: ['시간 관리'],
      strengths: ['체계적 사고'],
      averageSessionTime: 30,
      streak: 2
    }
  ]);

  const [courseAnalytics] = useState<CourseAnalytics>({
    totalStudents: 47,
    activeStudents: 35,
    completionRate: 89,
    averageSatisfaction: 4.6,
    totalAIInteractions: 156,
    averageProgress: 58,
    weeklyMetrics: [
      { week: 1, completionRate: 96, satisfaction: 4.8, dropoutRate: 4 },
      { week: 2, completionRate: 91, satisfaction: 4.5, dropoutRate: 9 },
      { week: 3, completionRate: 87, satisfaction: 4.4, dropoutRate: 13 },
      { week: 4, completionRate: 82, satisfaction: 4.7, dropoutRate: 18 }
    ]
  });

  const [feedbackTemplates] = useState<FeedbackTemplate[]>([
    {
      id: '1',
      title: '격려 메시지',
      content: '좋은 진전이에요! 계속 이런 식으로 진행해보세요. 특히 {strength} 부분에서 뛰어난 모습을 보여주고 계시네요.',
      category: 'encouragement'
    },
    {
      id: '2',
      title: '방향 제시',
      content: '다음 단계는 {topic}에 집중해보시면 좋겠어요. 이 부분을 더 깊이 탐구하시면 큰 도움이 될 것 같습니다.',
      category: 'guidance'
    },
    {
      id: '3',
      title: '질문 유도',
      content: '{topic}에 대해 더 구체적으로 생각해보시면 어떨까요? 예를 들어, 어떤 상황에서 이것이 가장 유용할지 고민해보세요.',
      category: 'guidance'
    },
    {
      id: '4',
      title: '성취 축하',
      content: '🎉 축하합니다! {achievement}를 완성하셨네요. 이제 한 단계 더 발전하실 준비가 되었습니다.',
      category: 'achievement'
    }
  ]);

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'at-risk': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Student['status']) => {
    switch (status) {
      case 'excellent': return <Star className="w-4 h-4" />;
      case 'active': return <UserCheck className="w-4 h-4" />;
      case 'at-risk': return <AlertTriangle className="w-4 h-4" />;
      case 'inactive': return <UserX className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: Student['status']) => {
    switch (status) {
      case 'excellent': return language === 'ko' ? '우수' : 'Excellent';
      case 'active': return language === 'ko' ? '활성' : 'Active';
      case 'at-risk': return language === 'ko' ? '위험' : 'At Risk';
      case 'inactive': return language === 'ko' ? '비활성' : 'Inactive';
      default: return '';
    }
  };

  const handleSendFeedback = async (studentId: string, message: string) => {
    // 실제로는 API 호출로 피드백 전송
    console.log('Sending feedback to student:', studentId, message);
    setFeedbackMessage('');
    setShowFeedbackForm(false);
    // 성공 토스트 표시
  };

  const handleUseTemplate = (template: FeedbackTemplate, student: Student) => {
    let content = template.content;
    
    // 템플릿 변수 치환
    if (student.strengths.length > 0) {
      content = content.replace('{strength}', student.strengths[0]);
    }
    if (student.strugglingTopics.length > 0) {
      content = content.replace('{topic}', student.strugglingTopics[0]);
    }
    content = content.replace('{achievement}', `${student.currentWeek}주차 Phase ${student.currentPhase}`);
    
    setFeedbackMessage(content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-iwl-purple-50 to-iwl-blue-50">
      <div className="container mx-auto py-8 space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-iwl-gradient">
            {language === 'ko' ? '강사 대시보드' : 'Instructor Dashboard'}
          </h1>
          <p className="text-gray-600">
            {language === 'ko' 
              ? '수강생들과 함께 성장하는 AI 학습 여정을 관리하세요' 
              : 'Manage the AI learning journey with your students'}
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              {language === 'ko' ? '전체 현황' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {language === 'ko' ? '수강생 관리' : 'Students'}
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {language === 'ko' ? '콘텐츠 관리' : 'Content'}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {language === 'ko' ? '성과 분석' : 'Analytics'}
            </TabsTrigger>
          </TabsList>

          {/* 전체 현황 탭 */}
          <TabsContent value="overview" className="space-y-6">
            {/* 핵심 지표 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === 'ko' ? '전체 수강생' : 'Total Students'}
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-iwl-gradient">{courseAnalytics.totalStudents}명</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12명</span> {language === 'ko' ? '이번 달' : 'this month'}
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === 'ko' ? '활성 학습자' : 'Active Learners'}
                  </CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-iwl-gradient">{courseAnalytics.activeStudents}명</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((courseAnalytics.activeStudents / courseAnalytics.totalStudents) * 100)}% {language === 'ko' ? '활성화율' : 'activity rate'}
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === 'ko' ? '평균 만족도' : 'Avg Satisfaction'}
                  </CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-iwl-gradient">{courseAnalytics.averageSatisfaction}/5</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+0.2</span> {language === 'ko' ? '지난 주 대비' : 'vs last week'}
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === 'ko' ? 'AI 대화 수' : 'AI Conversations'}
                  </CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-iwl-gradient">{courseAnalytics.totalAIInteractions}회</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+23회</span> {language === 'ko' ? '이번 주' : 'this week'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 우선 처리 알림 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  {language === 'ko' ? '우선 처리 알림' : 'Priority Alerts'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription>
                    <strong>김민수</strong> 학습자가 3일째 접속하지 않았습니다. 
                    <Button variant="link" className="p-0 h-auto text-red-600 ml-2">
                      연락하기
                    </Button>
                  </AlertDescription>
                </Alert>

                <Alert className="border-yellow-200 bg-yellow-50">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <AlertDescription>
                    12개의 과제 제출이 검토를 기다리고 있습니다. 
                    <Button variant="link" className="p-0 h-auto text-yellow-600 ml-2">
                      검토하기
                    </Button>
                  </AlertDescription>
                </Alert>

                <Alert className="border-blue-200 bg-blue-50">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    오늘 2건의 1:1 상담이 예정되어 있습니다. 
                    <Button variant="link" className="p-0 h-auto text-blue-600 ml-2">
                      준비하기
                    </Button>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* 이번 주 우수 수강생 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  {language === 'ko' ? '이번 주 우수 수강생' : 'Top Performers This Week'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.filter(s => s.status === 'excellent').map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Star className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            진도 {student.progress}% • 만족도 {student.satisfactionScore}/5 • {student.streak}일 연속
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {language === 'ko' ? '우수' : 'Excellent'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 수강생 관리 탭 */}
          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 수강생 목록 */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'ko' ? '수강생 목록' : 'Student List'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-4">
                        {students.map((student) => (
                          <div 
                            key={student.id} 
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              selectedStudent?.id === student.id 
                                ? 'border-iwl-purple bg-iwl-purple-50' 
                                : 'hover:border-iwl-blue hover:bg-iwl-blue-50'
                            }`}
                            onClick={() => setSelectedStudent(student)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                  {getStatusIcon(student.status)}
                                </div>
                                <div>
                                  <h4 className="font-medium">{student.name}</h4>
                                  <p className="text-sm text-muted-foreground">{student.email}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className={getStatusColor(student.status)}>
                                      {getStatusText(student.status)}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {student.currentWeek}주차 Phase {student.currentPhase}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">{student.progress}%</div>
                                <Progress value={student.progress} className="w-20 mt-1" />
                                <div className="text-xs text-muted-foreground mt-1">
                                  {student.lastActivity}
                                </div>
                              </div>
                            </div>

                            {/* 상세 정보 (선택된 경우) */}
                            {selectedStudent?.id === student.id && (
                              <div className="mt-4 pt-4 border-t space-y-3">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">등록일:</span>
                                    <span className="ml-2">{student.enrollmentDate}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">AI 대화:</span>
                                    <span className="ml-2">{student.aiInteractions}회</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">평균 세션:</span>
                                    <span className="ml-2">{student.averageSessionTime}분</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">연속일:</span>
                                    <span className="ml-2">{student.streak}일</span>
                                  </div>
                                </div>

                                {student.strugglingTopics.length > 0 && (
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-2">어려움을 겪는 부분:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {student.strugglingTopics.map((topic, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {topic}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {student.strengths.length > 0 && (
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-2">강점:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {student.strengths.map((strength, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-800">
                                          {strength}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="flex gap-2 mt-4">
                                  <Button 
                                    size="sm" 
                                    onClick={() => setShowFeedbackForm(true)}
                                    className="bg-iwl-gradient text-white"
                                  >
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    피드백 보내기
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-4 h-4 mr-2" />
                                    학습 기록 보기
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* 피드백 도구 */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'ko' ? '빠른 피드백 도구' : 'Quick Feedback Tools'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {feedbackTemplates.map((template) => (
                      <Button
                        key={template.id}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto p-3"
                        onClick={() => selectedStudent && handleUseTemplate(template, selectedStudent)}
                        disabled={!selectedStudent}
                      >
                        <div>
                          <div className="font-medium text-sm">{template.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {template.content.substring(0, 50)}...
                          </div>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* 피드백 작성 폼 */}
                {showFeedbackForm && selectedStudent && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        {selectedStudent.name}님에게 피드백 보내기
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <textarea
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        placeholder="개인화된 피드백을 작성해주세요..."
                        className="w-full h-32 p-3 border rounded-md resize-none"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSendFeedback(selectedStudent.id, feedbackMessage)}
                          disabled={!feedbackMessage.trim()}
                          className="bg-iwl-gradient text-white"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          전송
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowFeedbackForm(false)}
                        >
                          취소
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* 콘텐츠 관리 탭 */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ko' ? '콘텐츠 관리' : 'Content Management'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {language === 'ko' ? '콘텐츠 관리 기능' : 'Content Management Features'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {language === 'ko' 
                      ? '강의 콘텐츠 업로드, 수정, 성과 분석 기능이 곧 추가됩니다.' 
                      : 'Course content upload, editing, and performance analysis features coming soon.'}
                  </p>
                  <Button className="bg-iwl-gradient text-white">
                    {language === 'ko' ? '새 콘텐츠 추가' : 'Add New Content'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 성과 분석 탭 */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ko' ? '주차별 성과' : 'Weekly Performance'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseAnalytics.weeklyMetrics.map((metric) => (
                      <div key={metric.week} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{metric.week}주차</span>
                          <span className="text-sm text-muted-foreground">
                            완료율 {metric.completionRate}%
                          </span>
                        </div>
                        <Progress value={metric.completionRate} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>만족도: {metric.satisfaction}/5</span>
                          <span>이탈률: {metric.dropoutRate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ko' ? 'AI 분석 제안' : 'AI Analysis Suggestions'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-blue-200 bg-blue-50">
                    <Brain className="h-4 w-4 text-blue-600" />
                    <AlertDescription>
                      <strong>인사이트:</strong> 2주차 Phase 3에서 이탈률이 높습니다. 
                      추가 가이드나 1:1 지원을 고려해보세요.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-green-200 bg-green-50">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <AlertDescription>
                      <strong>성과:</strong> AI 프롬프트 템플릿 사용률이 95%로 
                      매우 높습니다. 추가 템플릿 제공을 고려해보세요.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription>
                      <strong>주의:</strong> 커뮤니티 참여율이 낮습니다. 
                      참여 유도 방안이 필요할 것 같습니다.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            {/* 상세 통계 */}
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ko' ? '상세 통계' : 'Detailed Statistics'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-iwl-gradient">89%</div>
                    <p className="text-sm text-muted-foreground">완주율</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-iwl-gradient">23%</div>
                    <p className="text-sm text-muted-foreground">재수강률</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-iwl-gradient">87%</div>
                    <p className="text-sm text-muted-foreground">추천율</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-iwl-gradient">4.6/5</div>
                    <p className="text-sm text-muted-foreground">전체 만족도</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 하단 빠른 액션 */}
        <div className="flex justify-center gap-4">
          <Button onClick={() => onNavigate('dashboard')} variant="outline">
            {language === 'ko' ? '메인 대시보드로' : 'Back to Dashboard'}
          </Button>
          <Button onClick={() => onNavigate('ai-practice')} className="bg-iwl-gradient text-white">
            <Brain className="w-4 h-4 mr-2" />
            {language === 'ko' ? 'AI 실습 참여' : 'Join AI Practice'}
          </Button>
        </div>
      </div>
    </div>
  );
};