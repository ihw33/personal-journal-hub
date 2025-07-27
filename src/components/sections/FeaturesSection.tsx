import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { BookOpen, Users, Brain, Target, Clock, Star, ArrowRight, Play } from 'lucide-react';

interface FeaturesSectionProps {
  language: 'ko' | 'en';
  onNavigate?: (page: 'courses') => void;
}

export function FeaturesSection({ language, onNavigate }: FeaturesSectionProps) {
  const content = {
    ko: {
      title: '아이디어를 위한 완벽한 도구들',
      subtitle: '깊이 있는 사고와 창의적 아이디어 발전을 위한 체계적인 강의와 개인 코칭',
      viewDetails: '자세히 보기',
      enroll: '신청하기',
      duration: '기간',
      format: '형태',
      level: '레벨',
      rating: '평점',
      students: '수강생',
      programs: [
        {
          type: 'course',
          title: 'AI와 함께하는 창의적 사고법',
          description: '인공지능 도구를 활용하여 창의적 문제해결 능력을 키우는 체계적인 사고 훈련 과정입니다.',
          duration: '8주',
          format: '온라인 강의',
          level: '초급-중급',
          rating: 4.9,
          students: 234,
          price: '₩299,000',
          features: ['AI 도구 활용법', '창의적 문제해결', '아이디어 구조화', '실습 프로젝트'],
          color: 'from-purple-500 to-blue-500'
        },
        {
          type: 'coaching',
          title: '개인 맞춤 사고력 코칭',
          description: '1:1 개인 코칭을 통해 당신만의 사고 패턴을 분석하고 깊이 있는 사고력을 개발합니다.',
          duration: '12주',
          format: '1:1 코칭',
          level: '모든 레벨',
          rating: 5.0,
          students: 47,
          price: '₩899,000',
          features: ['개인 분석', '맞춤 커리큘럼', '주간 세션', '24/7 피드백'],
          color: 'from-blue-500 to-teal-500'
        },
        {
          type: 'workshop',
          title: '디지털 저널링 워크샵',
          description: '효과적인 디지털 저널링 방법과 AI를 활용한 인사이트 도출 기법을 배우는 집중 워크샵입니다.',
          duration: '2일',
          format: '집중 워크샵',
          level: '초급',
          rating: 4.8,
          students: 156,
          price: '₩189,000',
          features: ['저널링 기법', 'AI 활용법', '템플릿 제공', '실시간 피드백'],
          color: 'from-teal-500 to-green-500'
        }
      ]
    },
    en: {
      title: 'Perfect Tools for Ideas',
      subtitle: 'Systematic courses and personal coaching for deep thinking and creative idea development',
      viewDetails: 'View Details',
      enroll: 'Enroll Now',
      duration: 'Duration',
      format: 'Format',
      level: 'Level',
      rating: 'Rating',
      students: 'Students',
      programs: [
        {
          type: 'course',
          title: 'Creative Thinking with AI',
          description: 'A systematic thinking training course to develop creative problem-solving skills using AI tools.',
          duration: '8 weeks',
          format: 'Online Course',
          level: 'Beginner-Intermediate',
          rating: 4.9,
          students: 234,
          price: '$249',
          features: ['AI Tool Usage', 'Creative Problem Solving', 'Idea Structuring', 'Hands-on Projects'],
          color: 'from-purple-500 to-blue-500'
        },
        {
          type: 'coaching',
          title: 'Personal Thinking Coaching',
          description: 'Develop deep thinking skills through 1:1 personal coaching by analyzing your unique thought patterns.',
          duration: '12 weeks',
          format: '1:1 Coaching',
          level: 'All Levels',
          rating: 5.0,
          students: 47,
          price: '$749',
          features: ['Personal Analysis', 'Custom Curriculum', 'Weekly Sessions', '24/7 Feedback'],
          color: 'from-blue-500 to-teal-500'
        },
        {
          type: 'workshop',
          title: 'Digital Journaling Workshop',
          description: 'An intensive workshop to learn effective digital journaling methods and AI-powered insight extraction techniques.',
          duration: '2 days',
          format: 'Intensive Workshop',
          level: 'Beginner',
          rating: 4.8,
          students: 156,
          price: '$159',
          features: ['Journaling Techniques', 'AI Integration', 'Template Provision', 'Real-time Feedback'],
          color: 'from-teal-500 to-green-500'
        }
      ]
    }
  };

  const t = content[language];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'coaching': return Users;
      case 'workshop': return Brain;
      default: return Target;
    }
  };

  const getTypeName = (type: string) => {
    if (language === 'ko') {
      switch (type) {
        case 'course': return '온라인 강의';
        case 'coaching': return '개인 코칭';
        case 'workshop': return '워크샵';
        default: return '프로그램';
      }
    } else {
      switch (type) {
        case 'course': return 'Online Course';
        case 'coaching': return 'Personal Coaching';
        case 'workshop': return 'Workshop';
        default: return 'Program';
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-iwl-gradient mb-4">{t.title}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {t.programs.map((program, index) => {
            const Icon = getTypeIcon(program.type);
            return (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden relative">
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      <Icon className="w-3 h-3 mr-1" />
                      {getTypeName(program.type)}
                    </Badge>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      <span className="text-sm">{program.rating}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="group-hover:text-iwl-purple transition-colors duration-300 mb-2">
                    {program.title}
                  </CardTitle>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {program.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Program Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-iwl-purple" />
                      <div>
                        <p className="text-xs text-gray-500">{t.duration}</p>
                        <p>{program.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Target className="w-4 h-4 mr-2 text-iwl-blue" />
                      <div>
                        <p className="text-xs text-gray-500">{t.level}</p>
                        <p>{program.level}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Play className="w-4 h-4 mr-2 text-iwl-purple" />
                      <div>
                        <p className="text-xs text-gray-500">{t.format}</p>
                        <p>{program.format}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-iwl-blue" />
                      <div>
                        <p className="text-xs text-gray-500">{t.students}</p>
                        <p>{program.students}명</p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {program.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl text-iwl-purple mb-1">{program.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="hover:bg-gray-50" onClick={() => onNavigate?.('courses')}>
                        {t.viewDetails}
                      </Button>
                      <Button size="sm" className="bg-iwl-gradient hover:opacity-90 text-white" onClick={() => onNavigate?.('courses')}>
                        {t.enroll}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            {language === 'ko' 
              ? '더 자세한 프로그램 정보가 궁금하시거나 개인 상담을 원하시나요?' 
              : 'Need more information about our programs or want a personal consultation?'
            }
          </p>
          <Button 
            className="bg-iwl-gradient hover:opacity-90 text-white px-8 py-3"
            onClick={() => onNavigate?.('courses')}
          >
            {language === 'ko' ? '무료 상담 신청' : 'Book Free Consultation'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}