import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Award, 
  Star, 
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  Play,
  CheckCircle,
  User,
  Bell
} from 'lucide-react';
import { getCourseEnrollments, getCourses } from '../../lib/supabase';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  user_type: 'guest' | 'member' | 'instructor' | 'admin';
  subscription_status?: 'active' | 'inactive' | 'trial';
  personalizationData?: any;
}

interface MemberDashboardProps {
  user: User;
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function MemberDashboard({ user, language, onNavigate }: MemberDashboardProps) {
  const { signOut } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // 사용자 ID가 없으면 에러 처리
      if (!user?.id) {
        throw new Error('사용자 정보가 없습니다.');
      }
      
      // 데모 모드에서는 실제 API를 호출하지 않고 mock 데이터 사용
      if (true) { // 데모 모드
        // Mock 수강 데이터
        const mockEnrollments = user.personalizationData?.learningProgress?.enrolledCourses?.map((courseId: string) => ({
          id: `enrollment-${courseId}`,
          courses: {
            id: courseId,
            title: courseId === 'jeju-course' ? '제주도 여행 AI 협업 코스' : '강의 제목',
            description: 'AI와 함께하는 여행 계획 수립 및 협업 방법론 학습',
            rating: 4.8,
            thumbnail_url: null
          },
          progress: user.personalizationData?.learningProgress?.completionRate || 0,
          enrolled_at: new Date().toISOString()
        })) || [];
        
        // Mock 추천 강의 데이터
        const mockRecommendedCourses = [
          {
            id: 'course-1',
            title: 'AI 창의적 사고 마스터',
            description: 'AI와 함께하는 창의적 문제 해결',
            rating: 4.9,
            price: 99000,
            duration_weeks: 4
          },
          {
            id: 'course-2', 
            title: '분석적 사고와 AI',
            description: 'AI를 활용한 데이터 분석 및 인사이트 도출',
            rating: 4.7,
            price: 129000,
            duration_weeks: 6
          },
          {
            id: 'course-3',
            title: 'AI 협업 실무',
            description: '실무에서 AI와 효과적으로 협업하는 방법',
            rating: 4.8,
            price: 149000,
            duration_weeks: 8
          }
        ];
        
        setEnrollments(mockEnrollments);
        setRecommendedCourses(mockRecommendedCourses);
      } else {
        // 실제 API 호출 (프로덕션 환경)
        const { data: enrollmentData, error: enrollmentError } = await getCourseEnrollments(user.id);
        if (enrollmentError) throw enrollmentError;
        setEnrollments(enrollmentData || []);

        // 추천 강의 로드 (공개된 강의 중 랜덤)
        const { data: coursesData, error: coursesError } = await getCourses({ status: 'published' });
        if (coursesError) throw coursesError;
        setRecommendedCourses((coursesData || []).slice(0, 3));
      }
      
    } catch (error: any) {
      console.error('대시보드 데이터 로드 실패:', error);
      toast.error('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  const getSubscriptionBadge = () => {
    const status = user?.subscription_status;
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-300">프리미엄</Badge>;
      case 'trial':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">체험판</Badge>;
      default:
        return <Badge variant="outline">무료</Badge>;
    }
  };

  const calculateOverallProgress = () => {
    if (enrollments.length === 0) return 0;
    const totalProgress = enrollments.reduce((sum, enrollment) => sum + (enrollment.progress || 0), 0);
    return Math.round(totalProgress / enrollments.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-iwl-gradient rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  안녕하세요, {user?.name || '회원'}님!
                </h1>
                <div className="flex items-center gap-2">
                  {getSubscriptionBadge()}
                  <span className="text-sm text-gray-600">•</span>
                  <span className="text-sm text-gray-600">Idea Work Lab 회원</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="w-4 h-4" />
                알림
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                설정
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">수강 중인 강의</p>
                  <p className="text-2xl font-bold text-gray-900">{enrollments.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-iwl-purple" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">전체 진행률</p>
                  <p className="text-2xl font-bold text-gray-900">{calculateOverallProgress()}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">학습 시간</p>
                  <p className="text-2xl font-bold text-gray-900">24시간</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">획득 배지</p>
                  <p className="text-2xl font-bold text-gray-900">3개</p>
                </div>
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">내 강의</TabsTrigger>
            <TabsTrigger value="recommendations">추천 강의</TabsTrigger>
            <TabsTrigger value="progress">학습 진도</TabsTrigger>
            <TabsTrigger value="achievements">성취도</TabsTrigger>
          </TabsList>

          {/* 내 강의 */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>수강 중인 강의</CardTitle>
              </CardHeader>
              <CardContent>
                {enrollments.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">아직 수강 중인 강의가 없습니다</h3>
                    <p className="text-gray-600 mb-4">새로운 강의를 시작해보세요!</p>
                    <Button onClick={() => onNavigate('courses')} className="bg-iwl-gradient text-white">
                      강의 둘러보기
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {enrollments.map((enrollment) => (
                      <Card key={enrollment.id} className="border border-iwl-purple/20">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {enrollment.courses.title}
                                </h3>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm text-gray-600">{enrollment.courses.rating}</span>
                                </div>
                              </div>
                              <p className="text-gray-600 mb-4">{enrollment.courses.description}</p>
                              
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                  <div className="text-sm text-gray-600">
                                    진행률: {enrollment.progress || 0}%
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    등록일: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              
                              <Progress value={enrollment.progress || 0} className="mb-4" />
                              
                              <div className="flex gap-3">
                                <Button 
                                  onClick={() => onNavigate('course-jeju')}
                                  className="bg-iwl-gradient text-white gap-2"
                                >
                                  <Play className="w-4 h-4" />
                                  {enrollment.progress > 0 ? '계속 학습하기' : '학습 시작하기'}
                                </Button>
                                <Button variant="outline">상세보기</Button>
                              </div>
                            </div>
                            
                            {enrollment.courses.thumbnail_url && (
                              <div className="w-32 h-20 bg-gray-200 rounded-lg ml-6 flex-shrink-0">
                                <img 
                                  src={enrollment.courses.thumbnail_url} 
                                  alt={enrollment.courses.title}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 추천 강의 */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>추천 강의</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">{course.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-bold text-iwl-purple">
                            ₩{course.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-600">
                            {course.duration_weeks}주 과정
                          </span>
                        </div>
                        <Button 
                          onClick={() => onNavigate('courses')}
                          className="w-full bg-iwl-gradient text-white"
                        >
                          수강신청
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 학습 진도 */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>학습 진도 현황</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-iwl-purple-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-iwl-purple">전체 학습 진행률</h3>
                      <p className="text-sm text-gray-600">모든 강의의 평균 진행률</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-iwl-purple">{calculateOverallProgress()}%</div>
                      <Progress value={calculateOverallProgress()} className="w-32 mt-2" />
                    </div>
                  </div>

                  {enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{enrollment.courses.title}</h4>
                        <Badge variant={enrollment.progress === 100 ? "default" : "secondary"}>
                          {enrollment.progress === 100 ? '완료' : '진행중'}
                        </Badge>
                      </div>
                      <Progress value={enrollment.progress || 0} className="mb-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{enrollment.progress || 0}% 완료</span>
                        <span>등록일: {new Date(enrollment.enrolled_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 성취도 */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>성취도 및 배지</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
                    <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">첫 강의 완주</h3>
                    <p className="text-sm text-gray-600">첫 번째 강의를 완주하세요</p>
                    <Badge variant="outline" className="mt-2">잠김</Badge>
                  </div>
                  
                  <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">연속 학습자</h3>
                    <p className="text-sm text-gray-600">7일 연속 학습하기</p>
                    <Badge variant="outline" className="mt-2">잠김</Badge>
                  </div>
                  
                  <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
                    <Star className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">AI 마스터</h3>
                    <p className="text-sm text-gray-600">AI 강의 3개 완주하기</p>
                    <Badge variant="outline" className="mt-2">잠김</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}