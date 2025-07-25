'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users, Play, BookOpen, Target, CheckCircle } from 'lucide-react';

interface CoursesPageProps {
  language?: 'ko' | 'en';
}

export default function CoursesPage({ language = 'ko' }: CoursesPageProps) {
  const content = {
    ko: {
      title: '아이디어를 위한 완벽한 도구들',
      subtitle: '깊이 있는 사고와 창의적 아이디어 발굴을 위한 체계적인 강의와 개인 코칭',
      enroll: '지금 신청하기',
      learnMore: '자세히 알아보기',
      duration: '기간',
      format: '형태',
      level: '레벨',
      rating: '평점',
      students: '수강생',
      whatYouWillLearn: '학습 내용',
      curriculum: '커리큘럼',
      instructor: '강사',
      programs: [
        {
          id: 1,
          type: 'course',
          title: 'AI와 함께하는 창의적 사고법',
          description: '인공지능 도구를 활용하여 창의적 문제해결 능력을 키우는 체계적인 사고 훈련 과정입니다.',
          duration: '8주',
          format: '온라인 강의',
          level: '초급-중급',
          rating: 4.9,
          students: 234,
          price: '₩299,000',
          originalPrice: '₩399,000',
          features: ['AI 도구 활용법', '창의적 문제해결', '아이디어 구조화', '실습 프로젝트'],
          curriculum: [
            'AI 창의성 도구 소개',
            '창의적 사고 프로세스',
            '아이디어 발상 기법',
            '문제 정의와 해결',
            '프로토타이핑 실습',
            '피드백과 개선',
            '최종 프로젝트',
            '포트폴리오 구축'
          ],
          color: 'from-purple-500 to-blue-500',
          popular: true
        },
        {
          id: 2,
          type: 'coaching',
          title: '개인 맞춤 사고력 코칭',
          description: '1:1 개인 코칭을 통해 당신만의 사고 패턴을 분석하고 깊이 있는 사고력을 개발합니다.',
          duration: '12주',
          format: '1:1 코칭',
          level: '모든 레벨',
          rating: 5.0,
          students: 47,
          price: '₩899,000',
          originalPrice: '₩1,299,000',
          features: ['개인 분석', '맞춤 커리큘럼', '주간 세션', '24/7 피드백'],
          curriculum: [
            '개인 사고 패턴 분석',
            '목표 설정 및 계획',
            '사고 도구 맞춤화',
            '실습 및 피드백',
            '진도 점검',
            '심화 학습',
            '최종 평가',
            '지속 지원'
          ],
          color: 'from-blue-500 to-teal-500',
          premium: true
        },
        {
          id: 3,
          type: 'workshop',
          title: '디지털 저널링 워크샵',
          description: '효과적인 디지털 저널링 방법과 AI를 활용한 인사이트 도출 기법을 배우는 집중 워크샵입니다.',
          duration: '2일',
          format: '집중 워크샵',
          level: '초급',
          rating: 4.8,
          students: 156,
          price: '₩189,000',
          originalPrice: '₩249,000',
          features: ['저널링 기법', 'AI 활용법', '템플릿 제공', '실시간 피드백'],
          curriculum: [
            '저널링 기초',
            'AI 도구 활용',
            '템플릿 사용법',
            '실습 세션',
            '피드백 워크숍',
            '개인 맞춤화',
            '향후 계획',
            '커뮤니티 참여'
          ],
          color: 'from-green-500 to-teal-500',
          new: true
        }
      ]
    },
    en: {
      title: 'Perfect Tools for Ideas',
      subtitle: 'Systematic courses and personal coaching for deep thinking and creative idea development',
      enroll: 'Enroll Now',
      learnMore: 'Learn More',
      duration: 'Duration',
      format: 'Format',
      level: 'Level',
      rating: 'Rating',
      students: 'Students',
      whatYouWillLearn: 'What You Will Learn',
      curriculum: 'Curriculum',
      instructor: 'Instructor',
      programs: [
        {
          id: 1,
          type: 'course',
          title: 'Creative Thinking with AI',
          description: 'A systematic thinking training course to develop creative problem-solving skills using AI tools.',
          duration: '8 weeks',
          format: 'Online Course',
          level: 'Beginner-Intermediate',
          rating: 4.9,
          students: 234,
          price: '$249',
          originalPrice: '$329',
          features: ['AI Tool Usage', 'Creative Problem Solving', 'Idea Structuring', 'Hands-on Projects'],
          curriculum: [
            'Introduction to AI Creativity Tools',
            'Creative Thinking Process',
            'Idea Generation Techniques',
            'Problem Definition & Solution',
            'Prototyping Practice',
            'Feedback & Improvement',
            'Final Project',
            'Portfolio Building'
          ],
          color: 'from-purple-500 to-blue-500',
          popular: true
        },
        {
          id: 2,
          type: 'coaching',
          title: 'Personal Thinking Coaching',
          description: 'Develop deep thinking skills through 1:1 personal coaching by analyzing your unique thought patterns.',
          duration: '12 weeks',
          format: '1:1 Coaching',
          level: 'All Levels',
          rating: 5.0,
          students: 47,
          price: '$749',
          originalPrice: '$1,099',
          features: ['Personal Analysis', 'Custom Curriculum', 'Weekly Sessions', '24/7 Feedback'],
          curriculum: [
            'Personal Thinking Pattern Analysis',
            'Goal Setting & Planning',
            'Thinking Tools Customization',
            'Practice & Feedback',
            'Progress Review',
            'Advanced Learning',
            'Final Assessment',
            'Ongoing Support'
          ],
          color: 'from-blue-500 to-teal-500',
          premium: true
        },
        {
          id: 3,
          type: 'workshop',
          title: 'Digital Journaling Workshop',
          description: 'An intensive workshop to learn effective digital journaling methods and AI-powered insight extraction techniques.',
          duration: '2 days',
          format: 'Intensive Workshop',
          level: 'Beginner',
          rating: 4.8,
          students: 156,
          price: '$159',
          originalPrice: '$209',
          features: ['Journaling Techniques', 'AI Integration', 'Template Provision', 'Real-time Feedback'],
          curriculum: [
            'Journaling Fundamentals',
            'AI Tool Integration',
            'Template Usage',
            'Practice Sessions',
            'Feedback Workshop',
            'Personal Customization',
            'Future Planning',
            'Community Participation'
          ],
          color: 'from-green-500 to-teal-500',
          new: true
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl text-iwl-gradient mb-4">{t.title}</h1>
            <p className="text-lg text-gray-600">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {t.programs.map((program) => (
            <Card key={program.id} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden relative">
              {/* Special Badges */}
              {program.popular && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs z-10">
                  {language === 'ko' ? '인기' : 'Popular'}
                </div>
              )}
              {program.premium && (
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs z-10">
                  {language === 'ko' ? '프리미엄' : 'Premium'}
                </div>
              )}
              {program.new && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs z-10">
                  {language === 'ko' ? '신규' : 'New'}
                </div>
              )}

              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${program.color}`} />
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    {program.format}
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
                  <h4 className="text-sm text-gray-700 mb-3">{t.whatYouWillLearn}</h4>
                  <div className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curriculum Preview */}
                <div className="mb-6">
                  <h4 className="text-sm text-gray-700 mb-3">{t.curriculum}</h4>
                  <div className="space-y-1">
                    {program.curriculum.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="w-5 h-5 bg-iwl-purple-50 text-iwl-purple rounded-full text-xs flex items-center justify-center mr-2">
                          {idx + 1}
                        </span>
                        {item}
                      </div>
                    ))}
                    {program.curriculum.length > 4 && (
                      <p className="text-xs text-gray-500 ml-7">
                        +{program.curriculum.length - 4} more modules
                      </p>
                    )}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl text-iwl-purple">{program.price}</span>
                        <span className="text-sm text-gray-500 line-through">{program.originalPrice}</span>
                      </div>
                      <p className="text-xs text-green-600">
                        {language === 'ko' ? '할인 중' : 'Limited Time Offer'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      {t.learnMore}
                    </Button>
                    <Button size="sm" className="flex-1 bg-iwl-gradient hover:opacity-90 text-white">
                      {t.enroll}
                    </Button>
                  </div>
                </div>
              </CardContent>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}