import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  Brain,
  MessageCircle,
  Target,
  TrendingUp,
  CheckCircle,
  Play
} from 'lucide-react';

interface CoursesPageProps {
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate, language }) => {
  const [activeTab, setActiveTab] = useState('all');

  const content = {
    ko: {
      hero: {
        badge: '강의 & 프로그램',
        title: 'AI와 함께하는\n체계적 학습 프로그램',
        subtitle: '단계별로 설계된 커리큘럼으로 AI 협업 능력을 체계적으로 발전시켜보세요.'
      },
      tabs: {
        all: '전체',
        beginner: '초급',
        intermediate: '중급',
        advanced: '고급'
      },
      courses: [
        {
          id: 'jeju-course',
          title: '제주도 AI 협업 여행 코스',
          description: 'AI와 함께 제주도 여행을 계획하며 창의적 사고와 분석적 사고를 배우는 8주 프로그램',
          level: 'beginner',
          duration: '8주',
          lessons: 24,
          students: 1200,
          rating: 4.8,
          price: '무료',
          featured: true,
          instructor: 'AI 멘토 시스템',
          skills: ['창의적 사고', '분석적 사고', '문제해결', 'AI 협업'],
          curriculum: [
            'Phase 1: 기초 사고법과 AI 협업 이해',
            'Phase 2: 창의적 사고 개발 및 아이디어 발산',
            'Phase 3: 분석적 사고와 체계적 문제해결'
          ]
        },
        {
          id: 'advanced-ai',
          title: '고급 AI 협업 마스터 클래스',
          description: '복잡한 비즈니스 문제를 AI와 함께 해결하는 고급 과정',
          level: 'advanced',
          duration: '12주',
          lessons: 36,
          students: 450,
          rating: 4.9,
          price: '월 49,000원',
          featured: false,
          instructor: '전문 AI 교육진',
          skills: ['고급 AI 활용', '전략적 사고', '비즈니스 분석', '리더십'],
          curriculum: [
            '고급 AI 프롬프트 엔지니어링',
            '복잡한 문제 해결 방법론',
            '비즈니스 전략 수립과 AI 활용'
          ]
        },
        {
          id: 'creative-thinking',
          title: '창의적 사고 집중 훈련',
          description: 'AI 파트너와 함께 창의력을 극대화하는 6주 특별 프로그램',
          level: 'intermediate',
          duration: '6주',
          lessons: 18,
          students: 800,
          rating: 4.7,
          price: '월 29,000원',
          featured: false,
          instructor: 'AI 창의성 전문가',
          skills: ['창의적 사고', '디자인 씽킹', '아이데이션', '혁신'],
          curriculum: [
            '창의적 사고의 기본 원리',
            'AI와 함께하는 브레인스토밍',
            '아이디어 구체화와 실행 계획'
          ]
        }
      ],
      features: {
        title: '모든 강의에 포함된 기능',
        items: [
          {
            icon: MessageCircle,
            title: '실시간 AI 멘토링',
            description: '24/7 AI 멘토와 대화하며 학습'
          },
          {
            icon: Target,
            title: '개인화된 학습 경로',
            description: '개인 수준에 맞춘 맞춤형 커리큘럼'
          },
          {
            icon: TrendingUp,
            title: '진도 추적 시스템',
            description: '실시간 학습 진도 확인 및 성취도 측정'
          },
          {
            icon: Users,
            title: '커뮤니티 학습',
            description: '동료 학습자들과 경험 공유'
          }
        ]
      },
      cta: {
        title: '지금 바로 AI 학습을 시작하세요',
        description: '체계적인 프로그램으로 AI 협업 능력을 발전시켜보세요',
        button: '무료 체험하기'
      }
    },
    en: {
      hero: {
        badge: 'Courses & Programs',
        title: 'Systematic Learning\nPrograms with AI',
        subtitle: 'Develop AI collaboration skills systematically through step-by-step designed curriculum.'
      },
      tabs: {
        all: 'All',
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced'
      },
      courses: [
        {
          id: 'jeju-course',
          title: 'Jeju Island AI Collaboration Travel Course',
          description: 'An 8-week program to learn creative and analytical thinking while planning a Jeju Island trip with AI',
          level: 'beginner',
          duration: '8 weeks',
          lessons: 24,
          students: 1200,
          rating: 4.8,
          price: 'Free',
          featured: true,
          instructor: 'AI Mentor System',
          skills: ['Creative Thinking', 'Analytical Thinking', 'Problem Solving', 'AI Collaboration'],
          curriculum: [
            'Phase 1: Basic thinking methods and AI collaboration understanding',
            'Phase 2: Creative thinking development and idea generation',
            'Phase 3: Analytical thinking and systematic problem solving'
          ]
        },
        {
          id: 'advanced-ai',
          title: 'Advanced AI Collaboration Master Class',
          description: 'Advanced course on solving complex business problems with AI',
          level: 'advanced',
          duration: '12 weeks',
          lessons: 36,
          students: 450,
          rating: 4.9,
          price: '$49/month',
          featured: false,
          instructor: 'Professional AI Educators',
          skills: ['Advanced AI Utilization', 'Strategic Thinking', 'Business Analysis', 'Leadership'],
          curriculum: [
            'Advanced AI Prompt Engineering',
            'Complex Problem Solving Methodology',
            'Business Strategy Development with AI'
          ]
        },
        {
          id: 'creative-thinking',
          title: 'Creative Thinking Intensive Training',
          description: '6-week special program to maximize creativity with AI partner',
          level: 'intermediate',
          duration: '6 weeks',
          lessons: 18,
          students: 800,
          rating: 4.7,
          price: '$29/month',
          featured: false,
          instructor: 'AI Creativity Expert',
          skills: ['Creative Thinking', 'Design Thinking', 'Ideation', 'Innovation'],
          curriculum: [
            'Basic principles of creative thinking',
            'Brainstorming with AI',
            'Idea concretization and execution planning'
          ]
        }
      ],
      features: {
        title: 'Features Included in All Courses',
        items: [
          {
            icon: MessageCircle,
            title: 'Real-time AI Mentoring',
            description: '24/7 AI mentor conversations for learning'
          },
          {
            icon: Target,
            title: 'Personalized Learning Path',
            description: 'Customized curriculum tailored to individual level'
          },
          {
            icon: TrendingUp,
            title: 'Progress Tracking System',
            description: 'Real-time learning progress and achievement measurement'
          },
          {
            icon: Users,
            title: 'Community Learning',
            description: 'Experience sharing with fellow learners'
          }
        ]
      },
      cta: {
        title: 'Start AI Learning Right Now',
        description: 'Develop AI collaboration skills through systematic programs',
        button: 'Try Free'
      }
    }
  };

  const t = content[language];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCourses = activeTab === 'all' 
    ? t.courses 
    : t.courses.filter(course => course.level === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-iwl-blue-100 rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4 text-iwl-blue" />
              <span className="text-sm font-medium text-iwl-blue">{t.hero.badge}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.hero.title.split('\n').map((line, index) => (
                <div key={index} className={index === 0 ? 'text-iwl-gradient' : ''}>
                  {line}
                </div>
              ))}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="all">{t.tabs.all}</TabsTrigger>
              <TabsTrigger value="beginner">{t.tabs.beginner}</TabsTrigger>
              <TabsTrigger value="intermediate">{t.tabs.intermediate}</TabsTrigger>
              <TabsTrigger value="advanced">{t.tabs.advanced}</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Course Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {filteredCourses.map((course) => (
              <Card key={course.id} className={`hover:shadow-xl transition-all duration-300 ${course.featured ? 'ring-2 ring-iwl-purple-200' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge className={getLevelColor(course.level)}>
                        {t.tabs[course.level as keyof typeof t.tabs]}
                      </Badge>
                      {course.featured && (
                        <Badge className="bg-iwl-gradient text-white">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-500 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">{course.students} students</div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl text-gray-900 mb-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Course Info */}
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.instructor}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">배울 수 있는 스킬</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Curriculum */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">커리큘럼</h4>
                    <div className="space-y-2">
                      {course.curriculum.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-iwl-purple mt-0.5 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-2xl font-bold text-iwl-gradient">
                        {course.price}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => onNavigate('trial-course')}
                        className="border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        미리보기
                      </Button>
                      <Button 
                        onClick={() => onNavigate(course.id)}
                        className="bg-iwl-gradient hover:opacity-90 text-white"
                      >
                        시작하기
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.features.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.items.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-iwl-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-iwl-purple-600 to-iwl-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t.cta.description}
            </p>
            <Button
              onClick={() => onNavigate('signup')}
              className="bg-white text-iwl-purple hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t.cta.button}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

