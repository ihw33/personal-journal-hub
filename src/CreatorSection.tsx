import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  User, 
  ExternalLink, 
  Mail, 
  MessageCircle,
  BookOpen,
  Brain,
  Users,
  Award,
  Globe,
  Coffee
} from 'lucide-react';

interface CreatorSectionProps {
  language: 'ko' | 'en';
}

export const CreatorSection: React.FC<CreatorSectionProps> = ({ language }) => {
  const content = {
    ko: {
      badge: '창립자 소개',
      title: 'AI 사고법 전문가와\n함께하는 여정',
      subtitle: 'Idea Work Lab을 만든 사람들의 이야기와 AI 협업 학습에 대한 철학을 만나보세요',
      creators: [
        {
          id: 1,
          name: '김지훈',
          role: '창립자 & AI 학습 설계자',
          avatar: '',
          bio: '15년간 교육 기술 분야에서 활동하며, AI와 인간의 협업을 통한 새로운 학습 방법론을 연구해왔습니다. 복잡한 문제를 체계적으로 해결하는 사고법을 AI와 함께 배우는 것이 미래 교육의 핵심이라고 믿습니다.',
          expertise: ['AI 교육 설계', '사고법 연구', '학습 경험 디자인'],
          achievements: [
            '교육부 AI 교육 혁신상 수상',
            '국제 AI 교육 컨퍼런스 키노트 스피커',
            '저서: "AI와 함께하는 생각정리" (2023)'
          ],
          contact: {
            email: 'jihun@ideaworklab.com',
            linkedin: 'linkedin.com/in/jihun-kim'
          }
        },
        {
          id: 2,
          name: '이서연',
          role: '학습 경험 디자이너',
          avatar: '',
          bio: '인지과학과 UX 디자인을 전공하며, 사용자가 AI와 자연스럽게 상호작용할 수 있는 학습 환경을 설계합니다. 개인의 학습 스타일에 맞춘 맞춤형 AI 튜터링 시스템을 개발하고 있습니다.',
          expertise: ['학습 UX 디자인', '개인화 시스템', '인지과학'],
          achievements: [
            'UX 디자인 어워드 교육부문 대상',
            '개인화 학습 시스템 특허 보유',
            '사용자 경험 연구 논문 다수 발표'
          ],
          contact: {
            email: 'seoyeon@ideaworklab.com',
            linkedin: 'linkedin.com/in/seoyeon-lee'
          }
        }
      ],
      vision: {
        title: '우리의 비전',
        description: 'AI와 인간이 협력하여 더 깊이 있는 사고를 할 수 있는 세상을 만들어가고 있습니다.',
        values: [
          {
            icon: Brain,
            title: '깊이 있는 사고',
            description: 'AI와 함께 표면적 정보를 넘어 본질적 통찰을 얻습니다'
          },
          {
            icon: Users,
            title: '협력적 학습',
            description: '인간과 AI가 상호 보완하며 시너지를 창출합니다'
          },
          {
            icon: Globe,
            title: '접근 가능한 교육',
            description: '누구나 쉽게 AI 협업 학습을 시작할 수 있도록 합니다'
          }
        ]
      },
      contact: {
        title: '함께 만들어가요',
        description: '더 나은 AI 학습 경험을 위한 아이디어나 피드백을 언제든 공유해주세요',
        actions: {
          email: '이메일 보내기',
          feedback: '피드백 남기기',
          community: '커뮤니티 참여'
        }
      }
    },
    en: {
      badge: 'Meet the Creators',
      title: 'Journey with AI Thinking\nExperts',
      subtitle: 'Meet the stories of the people behind Idea Work Lab and their philosophy on AI collaborative learning',
      creators: [
        {
          id: 1,
          name: 'Jihun Kim',
          role: 'Founder & AI Learning Designer',
          avatar: '',
          bio: 'With 15 years of experience in educational technology, I have been researching new learning methodologies through AI-human collaboration. I believe that learning to solve complex problems systematically with AI is the core of future education.',
          expertise: ['AI Education Design', 'Thinking Methodology Research', 'Learning Experience Design'],
          achievements: [
            'Ministry of Education AI Education Innovation Award',
            'International AI Education Conference Keynote Speaker',
            'Author: "Thinking with AI" (2023)'
          ],
          contact: {
            email: 'jihun@ideaworklab.com',
            linkedin: 'linkedin.com/in/jihun-kim'
          }
        },
        {
          id: 2,
          name: 'Seoyeon Lee',
          role: 'Learning Experience Designer',
          avatar: '',
          bio: 'With a background in cognitive science and UX design, I design learning environments where users can naturally interact with AI. Currently developing personalized AI tutoring systems tailored to individual learning styles.',
          expertise: ['Learning UX Design', 'Personalization Systems', 'Cognitive Science'],
          achievements: [
            'UX Design Award Grand Prize in Education',
            'Personalized Learning System Patent Holder',
            'Multiple User Experience Research Publications'
          ],
          contact: {
            email: 'seoyeon@ideaworklab.com',
            linkedin: 'linkedin.com/in/seoyeon-lee'
          }
        }
      ],
      vision: {
        title: 'Our Vision',
        description: 'We are creating a world where AI and humans collaborate to achieve deeper thinking.',
        values: [
          {
            icon: Brain,
            title: 'Deep Thinking',
            description: 'Gaining essential insights beyond surface information with AI'
          },
          {
            icon: Users,
            title: 'Collaborative Learning',
            description: 'Humans and AI complement each other to create synergy'
          },
          {
            icon: Globe,
            title: 'Accessible Education',
            description: 'Making AI collaborative learning easy for everyone to start'
          }
        ]
      },
      contact: {
        title: 'Let\'s Build Together',
        description: 'Feel free to share your ideas or feedback for better AI learning experiences',
        actions: {
          email: 'Send Email',
          feedback: 'Leave Feedback',
          community: 'Join Community'
        }
      }
    }
  };

  const t = content[language];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-iwl-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-iwl-blue-100 rounded-full px-4 py-2 mb-6">
            <User className="w-4 h-4 text-iwl-blue" />
            <span className="text-sm font-medium text-iwl-blue">{t.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.title.split('\n').map((line, index) => (
              <div key={index} className={index === 0 ? 'text-iwl-gradient' : ''}>
                {line}
              </div>
            ))}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Creator Profiles */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {t.creators.map((creator) => (
            <Card key={creator.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow border-iwl-blue-200">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 bg-iwl-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-2xl text-iwl-gradient">
                  {creator.name}
                </CardTitle>
                <CardDescription className="text-lg font-medium text-gray-700">
                  {creator.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  {creator.bio}
                </p>

                {/* Expertise */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">전문 분야</h4>
                  <div className="flex flex-wrap gap-2">
                    {creator.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-iwl-blue-100 text-iwl-blue">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-iwl-blue" />
                    주요 성과
                  </h4>
                  <ul className="space-y-2">
                    {creator.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-iwl-blue rounded-full mt-2 flex-shrink-0"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-iwl-blue text-iwl-blue hover:bg-iwl-blue hover:text-white"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    연락하기
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vision Section */}
        <Card className="bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 border-iwl-purple-200 mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-iwl-gradient mb-4">
              {t.vision.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-700 max-w-2xl mx-auto">
              {t.vision.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              {t.vision.values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-iwl-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-iwl-gradient mb-2">
              {t.contact.title}
            </CardTitle>
            <CardDescription className="text-lg">
              {t.contact.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-iwl-gradient hover:opacity-90 text-white">
                <Mail className="w-4 h-4 mr-2" />
                {t.contact.actions.email}
              </Button>
              <Button variant="outline" className="border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t.contact.actions.feedback}
              </Button>
              <Button variant="outline" className="border-iwl-blue text-iwl-blue hover:bg-iwl-blue hover:text-white">
                <Users className="w-4 h-4 mr-2" />
                {t.contact.actions.community}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

