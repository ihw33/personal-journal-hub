import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { ArrowLeft, Search, BookOpen, MessageCircle, Video, FileText, Lightbulb, Settings } from 'lucide-react';
import { useState } from 'react';

interface HelpPageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function HelpPage({ language, onNavigate }: HelpPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const content = {
    ko: {
      title: "도움말 센터",
      subtitle: "Idea Work Lab 사용법과 자주 묻는 질문",
      searchPlaceholder: "궁금한 것을 검색해보세요...",
      backToHome: "홈으로 돌아가기",
      
      categories: [
        {
          title: "시작하기",
          icon: Lightbulb,
          description: "Idea Work Lab을 처음 사용하는 방법",
          articles: [
            "계정 만들기 및 첫 설정",
            "첫 번째 저널 작성하기",
            "AI 도우미 사용법",
            "템플릿 활용하기",
            "언어 설정 변경하기"
          ]
        },
        {
          title: "저널 작성",
          icon: FileText,
          description: "효과적인 저널 작성을 위한 가이드",
          articles: [
            "마크다운 문법 사용하기",
            "카테고리와 태그 활용법",
            "이미지 및 미디어 추가",
            "AI와 협력하여 글쓰기",
            "저널 공유 및 내보내기"
          ]
        },
        {
          title: "AI 기능",
          icon: Settings,
          description: "AI 도우미 기능 활용법",
          articles: [
            "AI 아이디어 확장 사용법",
            "글 구조화 제안 받기",
            "SEO 최적화 도움받기",
            "유튜브 스크립트 생성",
            "AI 설정 개인화하기"
          ]
        },
        {
          title: "계정 관리",
          icon: Settings,
          description: "개인 설정 및 데이터 관리",
          articles: [
            "프로필 정보 수정하기",
            "비밀번호 변경 및 보안",
            "알림 설정 관리",
            "데이터 백업 및 복원",
            "계정 삭제하기"
          ]
        },
        {
          title: "구독 및 결제",
          icon: BookOpen,
          description: "뉴스레터 구독 및 강의 결제",
          articles: [
            "뉴스레터 구독하기",
            "강의 등록 및 결제",
            "환불 요청하기",
            "구독 해지하기",
            "영수증 다운로드"
          ]
        },
        {
          title: "문제 해결",
          icon: MessageCircle,
          description: "일반적인 문제와 해결책",
          articles: [
            "로그인이 안 될 때",
            "저널이 저장되지 않을 때",
            "AI가 응답하지 않을 때",
            "이미지가 업로드되지 않을 때",
            "브라우저 호환성 문제"
          ]
        }
      ],
      
      popularArticles: {
        title: "인기 도움말",
        articles: [
          "AI와 함께 효과적으로 저널 쓰는 법",
          "생각정리를 위한 템플릿 활용법",
          "마크다운 기본 문법 가이드",
          "저널 데이터 백업하고 복원하기",
          "AI 도우미 개인화 설정하기"
        ]
      },
      
      contact: {
        title: "더 많은 도움이 필요하신가요?",
        description: "찾고 계신 답변이 없다면 직접 문의해주세요.",
        email: "help@ideaworklab.com",
        community: "커뮤니티 방문하기",
        videoTutorials: "동영상 가이드 보기"
      }
    },
    en: {
      title: "Help Center",
      subtitle: "How to use Idea Work Lab and frequently asked questions",
      searchPlaceholder: "Search for what you're curious about...",
      backToHome: "Back to Home",
      
      categories: [
        {
          title: "Getting Started",
          icon: Lightbulb,
          description: "How to use Idea Work Lab for the first time",
          articles: [
            "Creating an account and initial setup",
            "Writing your first journal",
            "How to use AI assistant",
            "Utilizing templates",
            "Changing language settings"
          ]
        },
        {
          title: "Journal Writing",
          icon: FileText,
          description: "Guide for effective journal writing",
          articles: [
            "Using markdown syntax",
            "How to use categories and tags",
            "Adding images and media",
            "Writing with AI collaboration",
            "Sharing and exporting journals"
          ]
        },
        {
          title: "AI Features",
          icon: Settings,
          description: "How to utilize AI assistant features",
          articles: [
            "How to use AI idea expansion",
            "Getting text structure suggestions",
            "Getting SEO optimization help",
            "Generating YouTube scripts",
            "Personalizing AI settings"
          ]
        },
        {
          title: "Account Management",
          icon: Settings,
          description: "Personal settings and data management",
          articles: [
            "Editing profile information",
            "Password change and security",
            "Managing notification settings",
            "Data backup and restore",
            "Deleting account"
          ]
        },
        {
          title: "Subscription & Payment",
          icon: BookOpen,
          description: "Newsletter subscription and course payments",
          articles: [
            "Subscribing to newsletter",
            "Course registration and payment",
            "Requesting refunds",
            "Unsubscribing",
            "Downloading receipts"
          ]
        },
        {
          title: "Troubleshooting",
          icon: MessageCircle,
          description: "Common problems and solutions",
          articles: [
            "When login doesn't work",
            "When journals don't save",
            "When AI doesn't respond",
            "When images won't upload",
            "Browser compatibility issues"
          ]
        }
      ],
      
      popularArticles: {
        title: "Popular Help Articles",
        articles: [
          "How to effectively journal with AI",
          "How to use templates for thought organization",
          "Basic markdown syntax guide",
          "Backing up and restoring journal data",
          "Personalizing AI assistant settings"
        ]
      },
      
      contact: {
        title: "Need More Help?",
        description: "If you can't find the answer you're looking for, please contact us directly.",
        email: "help@ideaworklab.com",
        community: "Visit Community",
        videoTutorials: "Watch Video Guides"
      }
    }
  };

  const t = content[language];

  const filteredCategories = t.categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      searchQuery === '' || article.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-iwl-gradient text-white py-16">
        <div className="container">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('home')}
            className="text-white/80 hover:text-white hover:bg-white/10 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToHome}
          </Button>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl text-white/90 mb-8">{t.subtitle}</p>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-white/70" />
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-6xl mx-auto">
          {/* Popular Articles */}
          {searchQuery === '' && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-center">{t.popularArticles.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.popularArticles.articles.map((article, index) => (
                  <Card key={index} className="card-hover cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-iwl-gradient rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <p className="text-sm font-medium">{article}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(searchQuery === '' ? t.categories : filteredCategories).map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-iwl-gradient rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3>{category.title}</h3>
                        <p className="text-sm text-muted-foreground font-normal">
                          {category.description}
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <button className="text-left text-sm text-muted-foreground hover:text-iwl-purple transition-colors">
                            {article}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Section */}
          <div className="mt-16">
            <Card className="bg-iwl-purple-50 border-iwl-purple-100">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t.contact.title}</CardTitle>
                <p className="text-muted-foreground">{t.contact.description}</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 h-12"
                    onClick={() => window.open(`mailto:${t.contact.email}`)}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>이메일 문의</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 h-12"
                    onClick={() => onNavigate('community')}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{t.contact.community}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 h-12"
                  >
                    <Video className="w-4 h-4" />
                    <span>{t.contact.videoTutorials}</span>
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