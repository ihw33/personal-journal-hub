import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Mail, 
  BookOpen, 
  Video,
  FileText,
  Send,
  Phone,
  Clock,
  Users,
  Zap
} from 'lucide-react';

interface HelpPageProps {
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
}

const HelpPage: React.FC<HelpPageProps> = ({ onNavigate, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const content = {
    ko: {
      hero: {
        badge: '도움말 센터',
        title: '무엇을 도와드릴까요?',
        subtitle: 'Idea Work Lab 사용법부터 AI 협업 팁까지, 필요한 도움을 찾아보세요.',
        searchPlaceholder: '궁금한 것을 검색해보세요...'
      },
      tabs: {
        faq: '자주 묻는 질문',
        guides: '사용 가이드',
        contact: '문의하기',
        resources: '학습 자료'
      },
      faq: {
        title: '자주 묻는 질문',
        items: [
          {
            category: '시작하기',
            questions: [
              {
                question: 'Idea Work Lab은 무엇인가요?',
                answer: 'Idea Work Lab은 AI와 함께 깊이 있는 사고를 할 수 있도록 도와주는 학습 플랫폼입니다. AI 파트너와의 협업을 통해 창의적이고 분석적인 사고력을 체계적으로 발전시킬 수 있습니다.'
              },
              {
                question: '어떻게 시작하면 되나요?',
                answer: '회원가입 후 제주도 AI 협업 여행 코스부터 시작하는 것을 추천합니다. 이 코스는 AI 협업의 기초부터 고급 기법까지 단계별로 학습할 수 있도록 설계되었습니다.'
              },
              {
                question: '비용은 얼마인가요?',
                answer: '기본 코스는 무료로 제공되며, 고급 기능과 개인 맞춤형 멘토링이 포함된 프리미엄 플랜은 월 49,000원입니다. 언제든지 업그레이드하거나 취소할 수 있습니다.'
              }
            ]
          },
          {
            category: 'AI 협업',
            questions: [
              {
                question: 'AI와 어떻게 효과적으로 대화할 수 있나요?',
                answer: '구체적이고 명확한 질문을 하는 것이 중요합니다. 상황을 자세히 설명하고, 원하는 결과를 명시하며, 단계별로 접근하는 것이 좋습니다. 우리의 3단계 방법론을 따라하시면 됩니다.'
              },
              {
                question: 'AI가 제 질문을 이해하지 못할 때는 어떻게 하나요?',
                answer: '질문을 다시 명확하게 표현하거나, 예시를 들어 설명해보세요. AI는 컨텍스트가 많을수록 더 정확한 답변을 제공할 수 있습니다. 필요하다면 여러 번 나누어 질문하는 것도 좋은 방법입니다.'
              },
              {
                question: '대화 내용이 저장되나요?',
                answer: '네, 모든 대화 내용은 안전하게 저장되어 언제든지 다시 확인할 수 있습니다. 개인정보 보호 정책에 따라 철저히 보안 관리되며, 사용자가 원할 때 삭제할 수 있습니다.'
              }
            ]
          },
          {
            category: '기술 지원',
            questions: [
              {
                question: '로그인이 안 돼요.',
                answer: '비밀번호를 다시 확인해보시고, 대소문자와 특수문자를 정확히 입력했는지 확인해주세요. 문제가 지속되면 비밀번호 재설정을 시도하거나 고객지원팀에 문의해주세요.'
              },
              {
                question: '페이지가 느리게 로딩돼요.',
                answer: '브라우저 캐시를 지우거나 다른 브라우저를 사용해보세요. 크롬, 파이어폭스, 사파리 최신 버전을 권장합니다. 문제가 계속되면 인터넷 연결 상태를 확인해주세요.'
              },
              {
                question: '모바일에서도 사용할 수 있나요?',
                answer: '네, 모든 기능이 모바일에 최적화되어 있습니다. iOS와 Android 모두 지원하며, 웹브라우저를 통해 접속하시면 됩니다. 곧 전용 앱도 출시될 예정입니다.'
              }
            ]
          }
        ]
      },
      guides: {
        title: '사용 가이드',
        items: [
          {
            title: '첫 시작 가이드',
            description: '회원가입부터 첫 AI 대화까지',
            duration: '5분',
            type: '초보자용',
            icon: Zap
          },
          {
            title: 'AI 협업 기초',
            description: '효과적인 AI 대화 방법 익히기',
            duration: '15분',
            type: '기본',
            icon: MessageCircle
          },
          {
            title: '창의적 사고 실습',
            description: 'AI와 함께 아이디어 발산하기',
            duration: '20분',
            type: '중급',
            icon: BookOpen
          },
          {
            title: '분석적 사고 심화',
            description: '복잡한 문제 체계적으로 해결하기',
            duration: '30분',
            type: '고급',
            icon: Video
          }
        ]
      },
      contact: {
        title: '문의하기',
        description: '궁금한 점이나 건의사항이 있으시면 언제든지 연락주세요.',
        form: {
          name: '이름',
          namePlaceholder: '이름을 입력해주세요',
          email: '이메일',
          emailPlaceholder: '이메일 주소를 입력해주세요',
          subject: '제목',
          subjectPlaceholder: '문의 제목을 입력해주세요',
          message: '내용',
          messagePlaceholder: '궁금한 점이나 건의사항을 자세히 작성해주세요',
          submit: '문의 보내기'
        },
        channels: [
          {
            icon: Mail,
            title: '이메일',
            value: 'support@ideaworklab.com',
            description: '24시간 내 답변'
          },
          {
            icon: MessageCircle,
            title: '라이브 채팅',
            value: '실시간 상담',
            description: '평일 9시-18시'
          },
          {
            icon: Phone,
            title: '전화',
            value: '02-1234-5678',
            description: '평일 9시-18시'
          }
        ]
      },
      resources: {
        title: '학습 자료',
        items: [
          {
            title: 'AI 협업 가이드북',
            description: 'PDF 다운로드 (50페이지)',
            type: 'PDF',
            size: '2.3MB'
          },
          {
            title: '실습 동영상 모음',
            description: '단계별 실습 영상 (10개)',
            type: 'Video',
            size: '화질 선택'
          },
          {
            title: '질문 템플릿 집',
            description: '상황별 질문 예시 모음',
            type: 'Template',
            size: '즉시 사용'
          },
          {
            title: '사례 연구 모음',
            description: '성공 사례 및 분석',
            type: 'Case Study',
            size: '업데이트'
          }
        ]
      },
      quickLinks: {
        title: '빠른 링크',
        items: [
          { title: 'AI 실습 시작하기', page: 'ai-practice' },
          { title: '강의 둘러보기', page: 'courses' },
          { title: '저널 작성하기', page: 'journal-editor' },
          { title: '방법론 알아보기', page: 'methodology' }
        ]
      }
    },
    en: {
      hero: {
        badge: 'Help Center',
        title: 'How can we help you?',
        subtitle: 'Find help from usage instructions to AI collaboration tips.',
        searchPlaceholder: 'Search for answers...'
      },
      tabs: {
        faq: 'FAQ',
        guides: 'User Guides',
        contact: 'Contact Us',
        resources: 'Learning Resources'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            category: 'Getting Started',
            questions: [
              {
                question: 'What is Idea Work Lab?',
                answer: 'Idea Work Lab is a learning platform that helps you think deeply with AI. You can systematically develop creative and analytical thinking skills through collaboration with AI partners.'
              },
              {
                question: 'How do I get started?',
                answer: 'We recommend starting with the Jeju Island AI Collaboration Travel Course after signing up. This course is designed to learn from AI collaboration basics to advanced techniques step by step.'
              },
              {
                question: 'How much does it cost?',
                answer: 'Basic courses are provided for free, and premium plans with advanced features and personalized mentoring cost $49/month. You can upgrade or cancel anytime.'
              }
            ]
          },
          {
            category: 'AI Collaboration',
            questions: [
              {
                question: 'How can I effectively communicate with AI?',
                answer: 'It\'s important to ask specific and clear questions. Describe the situation in detail, specify desired results, and approach step by step. Follow our 3-phase methodology.'
              },
              {
                question: 'What should I do when AI doesn\'t understand my question?',
                answer: 'Try rephrasing your question more clearly or explain with examples. AI can provide more accurate answers with more context. It\'s also good to divide questions if needed.'
              },
              {
                question: 'Are conversation contents saved?',
                answer: 'Yes, all conversation contents are safely stored and can be reviewed anytime. They are thoroughly secured according to privacy policy and can be deleted when users want.'
              }
            ]
          },
          {
            category: 'Technical Support',
            questions: [
              {
                question: 'I can\'t log in.',
                answer: 'Please check your password again and make sure you entered uppercase, lowercase, and special characters correctly. If problems persist, try password reset or contact customer support.'
              },
              {
                question: 'Pages load slowly.',
                answer: 'Try clearing browser cache or using a different browser. We recommend the latest versions of Chrome, Firefox, and Safari. If problems continue, check your internet connection.'
              },
              {
                question: 'Can I use it on mobile?',
                answer: 'Yes, all features are optimized for mobile. Both iOS and Android are supported through web browsers. A dedicated app will be released soon.'
              }
            ]
          }
        ]
      },
      guides: {
        title: 'User Guides',
        items: [
          {
            title: 'Getting Started Guide',
            description: 'From sign-up to first AI conversation',
            duration: '5 min',
            type: 'Beginner',
            icon: Zap
          },
          {
            title: 'AI Collaboration Basics',
            description: 'Learn effective AI conversation methods',
            duration: '15 min',
            type: 'Basic',
            icon: MessageCircle
          },
          {
            title: 'Creative Thinking Practice',
            description: 'Generate ideas with AI',
            duration: '20 min',
            type: 'Intermediate',
            icon: BookOpen
          },
          {
            title: 'Advanced Analytical Thinking',
            description: 'Systematically solve complex problems',
            duration: '30 min',
            type: 'Advanced',
            icon: Video
          }
        ]
      },
      contact: {
        title: 'Contact Us',
        description: 'Feel free to contact us with any questions or suggestions.',
        form: {
          name: 'Name',
          namePlaceholder: 'Enter your name',
          email: 'Email',
          emailPlaceholder: 'Enter your email address',
          subject: 'Subject',
          subjectPlaceholder: 'Enter inquiry subject',
          message: 'Message',
          messagePlaceholder: 'Please write your questions or suggestions in detail',
          submit: 'Send Inquiry'
        },
        channels: [
          {
            icon: Mail,
            title: 'Email',
            value: 'support@ideaworklab.com',
            description: 'Response within 24 hours'
          },
          {
            icon: MessageCircle,
            title: 'Live Chat',
            value: 'Real-time consultation',
            description: 'Weekdays 9AM-6PM'
          },
          {
            icon: Phone,
            title: 'Phone',
            value: '02-1234-5678',
            description: 'Weekdays 9AM-6PM'
          }
        ]
      },
      resources: {
        title: 'Learning Resources',
        items: [
          {
            title: 'AI Collaboration Guidebook',
            description: 'PDF Download (50 pages)',
            type: 'PDF',
            size: '2.3MB'
          },
          {
            title: 'Practice Video Collection',
            description: 'Step-by-step practice videos (10 videos)',
            type: 'Video',
            size: 'Quality selection'
          },
          {
            title: 'Question Template Collection',
            description: 'Situational question examples',
            type: 'Template',
            size: 'Ready to use'
          },
          {
            title: 'Case Study Collection',
            description: 'Success cases and analysis',
            type: 'Case Study',
            size: 'Updated'
          }
        ]
      },
      quickLinks: {
        title: 'Quick Links',
        items: [
          { title: 'Start AI Practice', page: 'ai-practice' },
          { title: 'Explore Courses', page: 'courses' },
          { title: 'Write Journal', page: 'journal-editor' },
          { title: 'Learn Methodology', page: 'methodology' }
        ]
      }
    }
  };

  const t = content[language];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const filteredFAQ = t.faq.items.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-iwl-gradient rounded-full px-4 py-2 mb-6">
              <HelpCircle className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">{t.hero.badge}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-iwl-gradient mb-6">
              {t.hero.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>

            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={t.hero.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-iwl-purple-200 focus:border-iwl-purple"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="faq" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-12">
              <TabsTrigger value="faq">{t.tabs.faq}</TabsTrigger>
              <TabsTrigger value="guides">{t.tabs.guides}</TabsTrigger>
              <TabsTrigger value="contact">{t.tabs.contact}</TabsTrigger>
              <TabsTrigger value="resources">{t.tabs.resources}</TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t.faq.title}
                </h2>
              </div>

              {filteredFAQ.length > 0 ? (
                <div className="space-y-8">
                  {filteredFAQ.map((category, categoryIndex) => (
                    <Card key={categoryIndex}>
                      <CardHeader>
                        <CardTitle className="text-xl text-iwl-gradient">
                          {category.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {category.questions.map((item, index) => (
                            <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                              <AccordionTrigger className="text-left">
                                {item.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-600">
                                {item.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">검색 결과가 없습니다.</p>
                </div>
              )}
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t.guides.title}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {t.guides.items.map((guide, index) => {
                  const Icon = guide.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-iwl-gradient rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline">{guide.type}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {guide.duration}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-xl text-gray-900">
                          {guide.title}
                        </CardTitle>
                        <CardDescription>
                          {guide.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-iwl-gradient hover:opacity-90 text-white">
                          가이드 보기
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t.contact.title}
                </h2>
                <p className="text-gray-600">{t.contact.description}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>문의 양식</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t.contact.form.name}
                        </label>
                        <Input
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          placeholder={t.contact.form.namePlaceholder}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t.contact.form.email}
                        </label>
                        <Input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          placeholder={t.contact.form.emailPlaceholder}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t.contact.form.subject}
                        </label>
                        <Input
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                          placeholder={t.contact.form.subjectPlaceholder}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t.contact.form.message}
                        </label>
                        <Textarea
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          placeholder={t.contact.form.messagePlaceholder}
                          className="min-h-[120px]"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-iwl-gradient hover:opacity-90 text-white">
                        <Send className="w-4 h-4 mr-2" />
                        {t.contact.form.submit}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Channels */}
                <div className="space-y-6">
                  {t.contact.channels.map((channel, index) => {
                    const Icon = channel.icon;
                    return (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-iwl-gradient rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{channel.title}</h3>
                              <p className="text-iwl-purple font-medium">{channel.value}</p>
                              <p className="text-sm text-gray-500">{channel.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t.resources.title}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {t.resources.items.map((resource, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {resource.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {resource.description}
                          </p>
                        </div>
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{resource.size}</span>
                        <Button size="sm" className="bg-iwl-gradient hover:opacity-90 text-white">
                          <FileText className="w-4 h-4 mr-2" />
                          다운로드
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t.quickLinks.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {t.quickLinks.items.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => onNavigate(link.page)}
                className="p-4 h-auto border-iwl-purple-200 hover:bg-iwl-purple-50 hover:border-iwl-purple text-center"
              >
                {link.title}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export { HelpPage };