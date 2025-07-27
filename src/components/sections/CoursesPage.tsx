import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Star, 
  Clock, 
  Users, 
  ArrowRight, 
  BookOpen, 
  Target,
  Award,
  TrendingUp,
  MessageSquare,
  FileText,
  CheckCircle,
  Rocket,
  MapPin
} from 'lucide-react';

interface CoursesPageProps {
  language: 'ko' | 'en';
  onNavigate?: (page: string) => void;
}

export function CoursesPage({ language, onNavigate }: CoursesPageProps) {
  const content = {
    ko: {
      title: "AI와 함께하는 창의적 사고법 강의",
      subtitle: "깊이 있는 사고와 창의적 아이디어 발굴을 위한 체계적인 강의와 개인 코칭",
      
      // Featured Course
      featuredTitle: "🔥 인기 강의",
      featuredCourse: {
        title: "제주도 2박 3일 여행 기획 8주 과정",
        subtitle: "AI와 함께 제주도 여행을 기획하며 배우는 창의적 사고법",
        description: "8주 만에 AI 협업 전문가가 되는 실습 중심 프로그램. 제주도 2박 3일 완벽한 여행 계획을 만들어가며 체득하는 체계적 AI 협업 방법론입니다.",
        price: "₩299,000",
        duration: "8주 과정",
        students: "342명 수료",
        rating: "4.9",
        highlights: [
          "실제 AI 도구 활용 (Claude, ChatGPT)",
          "완성되는 제주도 여행 가이드북",
          "AI 협업 사고 방법론 체득",
          "매주 개별 피드백 제공"
        ],
        badge: "베스트셀러"
      },
      
      // Other Courses
      otherCoursesTitle: "다른 강의들",
      courses: [
        {
          title: "AI와 함께하는 창의적 사고법",
          description: "AI 도구를 활용하여 창의적 사고를 확장하고 혁신적인 아이디어를 생성하는 방법을 배웁니다.",
          price: "₩199,000",
          duration: "4주",
          rating: "4.8",
          students: "1,247명",
          category: "사고법"
        },
        {
          title: "개인 맞춤 사고력 코칭",
          description: "1:1 개인 코칭을 통해 개인의 사고 패턴을 분석하고 최적화된 사고법을 개발합니다.",
          price: "₩899,000",
          duration: "12주",
          rating: "5.0",
          students: "89명",
          category: "개인코칭"
        },
        {
          title: "디지털 저널링 워크샵",
          description: "디지털 도구를 활용한 효과적인 저널링 방법과 생각 정리 기술을 습득합니다.",
          price: "₩189,000",
          duration: "3주",
          rating: "4.7",
          students: "567명",
          category: "저널링"
        }
      ],
      
      // Learning Path
      learningPathTitle: "추천 학습 경로",
      learningPath: [
        {
          step: 1,
          title: "디지털 저널링 워크샵",
          description: "기본적인 생각 정리 방법 습득",
          duration: "3주"
        },
        {
          step: 2,
          title: "제주도 여행 기획 과정",
          description: "AI 협업을 통한 실전 프로젝트",
          duration: "8주"
        },
        {
          step: 3,
          title: "개인 맞춤 사고력 코칭",
          description: "심화 학습 및 개인별 최적화",
          duration: "12주"
        }
      ],
      
      // Why Choose Us
      whyChooseTitle: "왜 IdeaWorkLab인가?",
      benefits: [
        {
          icon: Target,
          title: "실용적 결과물",
          description: "단순한 이론이 아닌 실제 사용할 수 있는 결과물을 만들어갑니다"
        },
        {
          icon: MessageSquare,
          title: "AI 실전 활용",
          description: "최신 AI 도구를 직접 사용하며 실무 역량을 키웁니다"
        },
        {
          icon: Users,
          title: "개별 피드백",
          description: "모든 과정에서 강사의 개별 맞춤 피드백을 제공합니다"
        },
        {
          icon: Award,
          title: "검증된 방법론",
          description: "15년간 연구된 생각정리 방법론과 AI의 만남입니다"
        }
      ],
      
      // CTA
      ctaTitle: "지금 시작하세요",
      ctaSubtitle: "AI와 함께하는 새로운 사고법의 여정을 시작해보세요",
      startJeju: "제주도 과정 시작하기",
      viewAll: "모든 강의 보기",
      consultation: "무료 상담 신청"
    },
    en: {
      title: "Creative Thinking with AI Courses",
      subtitle: "Systematic courses and personal coaching for deep thinking and creative idea development",
      
      // Featured Course
      featuredTitle: "🔥 Popular Course",
      featuredCourse: {
        title: "Jeju Island 2N3D Travel Planning 8-Week Course",
        subtitle: "Learn Creative Thinking by Planning Jeju Trip with AI",
        description: "8-week hands-on program to become an AI collaboration expert. A systematic AI collaboration methodology learned through creating a perfect 2-night 3-day Jeju travel plan.",
        price: "$299",
        duration: "8 weeks",
        students: "342 graduates",
        rating: "4.9",
        highlights: [
          "Real AI tool usage (Claude, ChatGPT)",
          "Complete Jeju travel guidebook",
          "AI collaboration thinking methodology",
          "Weekly individual feedback"
        ],
        badge: "Bestseller"
      },
      
      // Other Courses
      otherCoursesTitle: "Other Courses",
      courses: [
        {
          title: "Creative Thinking with AI",
          description: "Learn to expand creative thinking and generate innovative ideas using AI tools.",
          price: "$199",
          duration: "4 weeks",
          rating: "4.8",
          students: "1,247",
          category: "Thinking"
        },
        {
          title: "Personal Thinking Coaching",
          description: "Analyze personal thinking patterns and develop optimized thinking methods through 1:1 coaching.",
          price: "$899",
          duration: "12 weeks",
          rating: "5.0",
          students: "89",
          category: "Coaching"
        },
        {
          title: "Digital Journaling Workshop",
          description: "Learn effective journaling methods and thought organization techniques using digital tools.",
          price: "$189",
          duration: "3 weeks",
          rating: "4.7",
          students: "567",
          category: "Journaling"
        }
      ],
      
      // Learning Path
      learningPathTitle: "Recommended Learning Path",
      learningPath: [
        {
          step: 1,
          title: "Digital Journaling Workshop",
          description: "Master basic thought organization methods",
          duration: "3 weeks"
        },
        {
          step: 2,
          title: "Jeju Travel Planning Course",
          description: "Real project through AI collaboration",
          duration: "8 weeks"
        },
        {
          step: 3,
          title: "Personal Thinking Coaching",
          description: "Advanced learning and personal optimization",
          duration: "12 weeks"
        }
      ],
      
      // Why Choose Us
      whyChooseTitle: "Why IdeaWorkLab?",
      benefits: [
        {
          icon: Target,
          title: "Practical Results",
          description: "Create actual usable outcomes, not just theory"
        },
        {
          icon: MessageSquare,
          title: "Real AI Usage",
          description: "Build practical skills using latest AI tools directly"
        },
        {
          icon: Users,
          title: "Individual Feedback",
          description: "Personalized instructor feedback throughout all courses"
        },
        {
          icon: Award,
          title: "Proven Methodology",
          description: "15 years of thinking methodology research meets AI"
        }
      ],
      
      // CTA
      ctaTitle: "Start Now",
      ctaSubtitle: "Begin your journey of new thinking methods with AI",
      startJeju: "Start Jeju Course",
      viewAll: "View All Courses",
      consultation: "Free Consultation"
    }
  };

  const t = content[language];

  const handleJejuCourse = () => {
    if (onNavigate) {
      onNavigate('course-jeju');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-iwl-purple-50 to-iwl-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Course */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.featuredTitle}
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden border-2 border-iwl-purple/20 hover:border-iwl-purple/40 transition-all duration-300 hover:shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Content */}
                <CardContent className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-iwl-purple text-white">
                        {t.featuredCourse.badge}
                      </Badge>
                      <Badge variant="outline" className="border-orange-500 text-orange-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        제주도
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                      {t.featuredCourse.title}
                    </h3>
                    <p className="text-lg text-iwl-purple font-medium mb-4">
                      {t.featuredCourse.subtitle}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {t.featuredCourse.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-3 mb-8">
                      {t.featuredCourse.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-iwl-purple flex-shrink-0" />
                          <span className="text-sm text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-bold text-gray-900">{t.featuredCourse.rating}</span>
                        </div>
                        <span className="text-xs text-gray-600">평점</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Users className="w-4 h-4 text-iwl-purple" />
                          <span className="font-bold text-gray-900">342</span>
                        </div>
                        <span className="text-xs text-gray-600">수료생</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="w-4 h-4 text-iwl-blue" />
                          <span className="font-bold text-gray-900">8주</span>
                        </div>
                        <span className="text-xs text-gray-600">기간</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-iwl-purple">
                          {t.featuredCourse.price}
                        </div>
                        <div className="text-sm text-gray-600">{t.featuredCourse.duration}</div>
                      </div>
                      <Link href="/course">
                        <Button 
                          className="bg-iwl-purple hover:bg-iwl-purple/90 text-white px-8 py-3"
                        >
                          <Rocket className="w-4 h-4 mr-2" />
                          {t.startJeju}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>

                {/* Right Visual */}
                <div className="bg-gradient-to-br from-iwl-purple-50 to-iwl-blue-50 p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-iwl-gradient rounded-full flex items-center justify-center mb-6 mx-auto">
                      <MapPin className="w-16 h-16 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">제주도 완벽 가이드</h4>
                    <p className="text-gray-600 text-sm mb-4">AI와 함께 만드는<br />나만의 여행 계획</p>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-2xl font-bold text-iwl-purple mb-1">89%</div>
                      <div className="text-xs text-gray-600">실제 여행 실행률</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Other Courses */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.otherCoursesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.courses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {course.students}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-iwl-purple">
                      {course.price}
                    </div>
                    <Button variant="outline" size="sm">
                      <ArrowRight className="w-4 h-4 mr-1" />
                      자세히
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.learningPathTitle}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {t.learningPath.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < t.learningPath.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-iwl-purple-100 hidden md:block"></div>
                  )}
                  
                  <div className="flex items-start gap-6">
                    {/* Step Number */}
                    <div className="w-12 h-12 bg-iwl-gradient rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                            <Badge variant="outline" className="border-iwl-purple text-iwl-purple">
                              {step.duration}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{step.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.whyChooseTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {t.benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="bg-iwl-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-iwl-purple" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-iwl-gradient text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t.ctaSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/course">
              <Button 
                size="lg"
                className="bg-white text-iwl-purple hover:bg-gray-50 font-semibold"
              >
                <MapPin className="w-5 h-5 mr-2" />
                {t.startJeju}
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-iwl-purple font-semibold"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              {t.consultation}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}