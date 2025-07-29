import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { 
  ArrowRight,
  Star,
  Clock,
  Users,
  CheckCircle,
  BookOpen,
  Target,
  Brain,
  Award,
  MessageSquare,
  Play,
  Calendar,
  Lightbulb,
  ArrowLeft,
  ExternalLink,
  DollarSign,
  GraduationCap,
  TrendingUp
} from 'lucide-react';

interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
}

interface CourseDetailData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  price: string;
  duration: string;
  students: string;
  rating: string;
  instructor: string;
  instructorBio: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  whatYouLearn: string[];
  requirements: string[];
  modules: CourseModule[];
  testimonials: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

interface CourseDetailPageProps {
  courseId: string;
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function CourseDetailPage({ courseId, language, onNavigate }: CourseDetailPageProps) {
  const { user, getUserType } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');

  // Course data based on courseId
  const getCourseData = (id: string): CourseDetailData => {
    const courses = {
      'creative-thinking': {
        id: 'creative-thinking',
        title: 'AI와 함께하는 창의적 사고법',
        subtitle: 'AI 도구를 활용한 혁신적 아이디어 발굴',
        description: 'AI 도구를 활용하여 창의적 사고를 확장하고 혁신적인 아이디어를 생성하는 방법을 배웁니다.',
        fullDescription: '현대 사회에서 가장 중요한 역량 중 하나인 창의적 사고를 AI와 함께 발전시키는 프로그램입니다. Claude, ChatGPT 등 최신 AI 도구를 활용하여 기존의 사고 한계를 뛰어넘는 혁신적인 아이디어를 생성하고, 체계적인 방법론을 통해 창의성을 극대화하는 방법을 배웁니다.',
        price: '₩199,000',
        duration: '4주',
        students: '1,247명',
        rating: '4.8',
        instructor: '김창의',
        instructorBio: '15년간 디자인 씽킹과 창의성 교육을 연구한 전문가입니다.',
        category: '사고법',
        level: 'intermediate' as const,
        whatYouLearn: [
          'AI 도구를 활용한 브레인스토밍 기법',
          '창의적 문제해결 프로세스',
          '아이디어 구체화 및 실현 방법',
          'AI와의 효과적인 협업 방법론'
        ],
        requirements: [
          '기본적인 컴퓨터 사용 능력',
          '새로운 기술에 대한 호기심',
          '창의적 사고에 대한 관심'
        ],
        modules: [
          {
            id: 'module-1',
            title: '창의성의 이해와 AI의 역할',
            description: '창의성의 본질을 이해하고 AI가 창의적 사고에 미치는 영향을 살펴봅니다.',
            duration: '1주',
            lessons: 5
          },
          {
            id: 'module-2',
            title: 'AI 브레인스토밍 실습',
            description: 'ChatGPT, Claude 등을 활용한 효과적인 아이디어 발굴 기법을 습득합니다.',
            duration: '1주',
            lessons: 6
          },
          {
            id: 'module-3',
            title: '아이디어 평가와 발전',
            description: '생성된 아이디어를 체계적으로 평가하고 발전시키는 방법을 배웁니다.',
            duration: '1주',
            lessons: 5
          },
          {
            id: 'module-4',
            title: '실전 프로젝트와 발표',
            description: '학습한 내용을 바탕으로 실제 프로젝트를 진행하고 발표합니다.',
            duration: '1주',
            lessons: 4
          }
        ],
        testimonials: [
          {
            name: '박혁신',
            rating: 5,
            comment: 'AI를 활용한 창의적 사고법을 체계적으로 배울 수 있어서 정말 유익했습니다. 실무에서 바로 적용할 수 있는 실용적인 내용들이었어요.',
            date: '2024-01-15'
          },
          {
            name: '이창작',
            rating: 5,
            comment: '기존의 창의성 교육과는 완전히 다른 접근법이었습니다. AI와 함께하니 아이디어의 질과 양이 모두 향상되었어요.',
            date: '2024-01-10'
          }
        ]
      },
      'personal-coaching': {
        id: 'personal-coaching',
        title: '개인 맞춤 사고력 코칭',
        subtitle: '1:1 맞춤형 사고 패턴 분석 및 최적화',
        description: '1:1 개인 코칭을 통해 개인의 사고 패턴을 분석하고 최적화된 사고법을 개발합니다.',
        fullDescription: '개인별 사고 패턴과 학습 스타일을 심층 분석하여 맞춤형 사고력 향상 프로그램을 제공합니다. 전문 코치와의 1:1 세션을 통해 개인의 강점을 극대화하고 약점을 보완하는 체계적인 접근법으로 사고력을 획기적으로 향상시킵니다.',
        price: '₩899,000',
        duration: '12주',
        students: '89명',
        rating: '5.0',
        instructor: '정사고',
        instructorBio: '인지과학 박사이자 20년간 개인 맞춤형 학습 프로그램을 연구해온 전문가입니다.',
        category: '개인코칭',
        level: 'advanced' as const,
        whatYouLearn: [
          '개인별 사고 패턴 심층 분석',
          '맞춤형 사고력 향상 전략',
          '실시간 피드백을 통한 개선',
          '지속 가능한 사고 습관 형성'
        ],
        requirements: [
          '사고력 향상에 대한 강한 의지',
          '12주간 꾸준한 참여 가능',
          '개인 정보 공유에 대한 동의'
        ],
        modules: [
          {
            id: 'module-1',
            title: '사고 패턴 진단 및 분석',
            description: '다양한 평가 도구를 통해 개인의 사고 패턴을 정확히 진단합니다.',
            duration: '3주',
            lessons: 8
          },
          {
            id: 'module-2',
            title: '맞춤형 전략 수립',
            description: '분석 결과를 바탕으로 개인별 최적화 전략을 수립합니다.',
            duration: '3주',
            lessons: 10
          },
          {
            id: 'module-3',
            title: '집중 훈련 및 실습',
            description: '수립된 전략을 바탕으로 집중적인 훈련을 진행합니다.',
            duration: '4주',
            lessons: 12
          },
          {
            id: 'module-4',
            title: '성과 평가 및 지속 방안',
            description: '훈련 성과를 평가하고 지속적인 발전 방안을 수립합니다.',
            duration: '2주',
            lessons: 6
          }
        ],
        testimonials: [
          {
            name: '최발전',
            rating: 5,
            comment: '12주간의 코칭을 통해 사고 방식이 완전히 바뀌었습니다. 문제 해결 능력이 눈에 띄게 향상되었어요.',
            date: '2024-01-20'
          },
          {
            name: '한성장',
            rating: 5,
            comment: '개인 맞춤형 접근법이 정말 효과적이었습니다. 1:1 코칭의 힘을 실감했어요.',
            date: '2024-01-18'
          }
        ]
      },
      'digital-journaling': {
        id: 'digital-journaling',
        title: '디지털 저널링 워크샵',
        subtitle: '효과적인 생각 정리와 디지털 도구 활용',
        description: '디지털 도구를 활용한 효과적인 저널링 방법과 생각 정리 기술을 습득합니다.',
        fullDescription: '현대적인 디지털 도구를 활용하여 효과적으로 생각을 정리하고 기록하는 방법을 배웁니다. Notion, Obsidian 등 다양한 디지털 플랫폼의 특성을 이해하고, 개인의 라이프스타일에 맞는 최적의 저널링 시스템을 구축하는 실용적인 워크샵입니다.',
        price: '₩189,000',
        duration: '3주',
        students: '567명',
        rating: '4.7',
        instructor: '문기록',
        instructorBio: '10년간 디지털 생산성 도구를 연구하고 개인 저널링 시스템을 컨설팅해온 전문가입니다.',
        category: '저널링',
        level: 'beginner' as const,
        whatYouLearn: [
          '디지털 저널링의 핵심 원리',
          'Notion, Obsidian 등 도구 활용법',
          '효과적인 템플릿 제작 방법',
          '지속 가능한 저널링 습관 형성'
        ],
        requirements: [
          '기본적인 컴퓨터 또는 모바일 사용 능력',
          '저널링에 대한 관심',
          '꾸준한 실습 의지'
        ],
        modules: [
          {
            id: 'module-1',
            title: '디지털 저널링 기초',
            description: '디지털 저널링의 개념과 장점, 그리고 기본 원리를 이해합니다.',
            duration: '1주',
            lessons: 4
          },
          {
            id: 'module-2',
            title: '도구 선택과 설정',
            description: '다양한 디지털 도구의 특성을 비교하고 개인에게 맞는 도구를 선택합니다.',
            duration: '1주',
            lessons: 5
          },
          {
            id: 'module-3',
            title: '실전 저널링 시스템 구축',
            description: '선택한 도구로 실제 저널링 시스템을 구축하고 최적화합니다.',
            duration: '1주',
            lessons: 6
          }
        ],
        testimonials: [
          {
            name: '김정리',
            rating: 5,
            comment: '혼란스러웠던 생각들을 체계적으로 정리할 수 있게 되었습니다. 디지털 도구 활용법도 정말 유용했어요.',
            date: '2024-01-25'
          },
          {
            name: '이체계',
            rating: 4,
            comment: '저널링 초보자도 쉽게 따라할 수 있는 실용적인 내용이었습니다.',
            date: '2024-01-22'
          }
        ]
      }
    };

    return courses[id as keyof typeof courses] || courses['creative-thinking'];
  };

  const courseData = getCourseData(courseId);

  const handleEnroll = () => {
    const userType = getUserType();
    if (userType === 'guest') {
      // 비로그인 사용자는 로그인 페이지로 리다이렉트
      onNavigate('auth');
      return;
    }
    
    // 결제 페이지로 이동 (추후 구현)
    onNavigate('payment');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-500 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'intermediate':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'advanced':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return '초급';
      case 'intermediate':
        return '중급';
      case 'advanced':
        return '고급';
      default:
        return '중급';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('courses')}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            강의 목록으로 돌아가기
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Course Header */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-8 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary">{courseData.category}</Badge>
                  <Badge className={getLevelBadgeColor(courseData.level)}>
                    {getLevelText(courseData.level)}
                  </Badge>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {courseData.title}
                </h1>
                <p className="text-xl text-iwl-purple font-medium mb-4">
                  {courseData.subtitle}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {courseData.fullDescription}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(parseFloat(courseData.rating))}
                    </div>
                    <span className="font-medium">{courseData.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{courseData.students} 수강생</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{courseData.duration} 과정</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-iwl-gradient rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">강사: {courseData.instructor}</p>
                    <p className="text-sm text-gray-600">{courseData.instructorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6 border-2 border-iwl-purple/20">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-iwl-purple mb-2">
                      {courseData.price}
                    </div>
                    <p className="text-gray-600">{courseData.duration} 완주 과정</p>
                  </div>

                  <Button 
                    onClick={handleEnroll}
                    className="w-full bg-iwl-gradient hover:opacity-90 text-white font-semibold py-3 mb-4"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    지금 수강하기
                  </Button>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>즉시 수강 시작</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>평생 수강 가능</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>수료증 발급</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>개별 피드백 제공</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="border-b">
              <div className="flex">
                {[
                  { id: 'overview', label: '개요', icon: BookOpen },
                  { id: 'curriculum', label: '커리큘럼', icon: Calendar },
                  { id: 'reviews', label: '수강후기', icon: MessageSquare }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id as any)}
                      className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                        selectedTab === tab.id
                          ? 'text-iwl-purple border-b-2 border-iwl-purple'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-8">
              {selectedTab === 'overview' && (
                <div className="space-y-8">
                  {/* What You'll Learn */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-iwl-purple" />
                      이 강의에서 배우는 것
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {courseData.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-iwl-purple" />
                      수강 요건
                    </h3>
                    <div className="space-y-2">
                      {courseData.requirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-iwl-purple rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-gray-700">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'curriculum' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">커리큘럼</h3>
                    <Badge variant="outline" className="border-iwl-purple text-iwl-purple">
                      총 {courseData.modules.reduce((acc, module) => acc + module.lessons, 0)}개 강의
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {courseData.modules.map((module, index) => (
                      <Card key={module.id} className="border border-gray-200">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-3">
                              <div className="w-8 h-8 bg-iwl-gradient rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              {module.title}
                            </CardTitle>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {module.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {module.lessons}개 강의
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-gray-600">{module.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">수강후기</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(parseFloat(courseData.rating))}
                      </div>
                      <span className="font-medium">{courseData.rating}</span>
                      <span className="text-gray-600">({courseData.students} 수강생)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {courseData.testimonials.map((testimonial, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-iwl-gradient rounded-full flex items-center justify-center text-white font-medium">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                                <div className="flex items-center gap-1">
                                  {renderStars(testimonial.rating)}
                                </div>
                                <span className="text-sm text-gray-500">{testimonial.date}</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">{testimonial.comment}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}