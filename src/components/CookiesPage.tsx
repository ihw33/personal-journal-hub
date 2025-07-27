import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Cookie, Settings, BarChart, Target, Shield } from 'lucide-react';

interface CookiesPageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function CookiesPage({ language, onNavigate }: CookiesPageProps) {
  const content = {
    ko: {
      title: "쿠키 정책",
      subtitle: "투명한 쿠키 사용을 위한 상세 정보",
      lastUpdated: "최종 업데이트: 2024년 1월 26일",
      backToHome: "홈으로 돌아가기",
      
      intro: "Idea Work Lab은 서비스 개선과 사용자 경험 향상을 위해 쿠키와 유사한 기술을 사용합니다. 이 정책은 우리가 어떤 쿠키를 사용하는지, 왜 사용하는지, 그리고 사용자가 어떻게 제어할 수 있는지 설명합니다.",
      
      sections: [
        {
          title: "쿠키란 무엇인가요?",
          icon: Cookie,
          content: [
            "쿠키는 웹사이트가 사용자의 브라우저에 저장하는 작은 텍스트 파일입니다",
            "사용자가 웹사이트를 다시 방문할 때 설정을 기억하는 데 도움이 됩니다",
            "세션 쿠키는 브라우저를 닫으면 자동으로 삭제됩니다",
            "영구 쿠키는 지정된 기간 동안 저장됩니다",
            "자사 쿠키는 Idea Work Lab에서 직접 설정합니다",
            "제3자 쿠키는 파트너 서비스에서 설정할 수 있습니다"
          ]
        },
        {
          title: "필수 쿠키",
          icon: Settings,
          content: [
            "로그인 상태 유지",
            "사용자 언어 설정 (한국어/영어)",
            "장바구니 및 결제 정보 임시 저장",
            "보안 및 인증 관련 정보",
            "사이트 기본 기능 작동",
            "CSRF 공격 방지"
          ]
        },
        {
          title: "분석 쿠키",
          icon: BarChart,
          content: [
            "Google Analytics를 통한 사이트 이용 통계",
            "페이지 조회수 및 체류시간 측정",
            "사용자 행동 패턴 분석",
            "인기 콘텐츠 및 기능 파악",
            "서비스 개선을 위한 데이터 수집",
            "A/B 테스트 실행 및 결과 분석"
          ]
        },
        {
          title: "마케팅 쿠키",
          icon: Target,
          content: [
            "개인화된 광고 표시",
            "소셜 미디어 연동 기능",
            "뉴스레터 구독 추적",
            "리마케팅 캠페인 실행",
            "제휴 파트너 추천 추적",
            "마케팅 효과 측정"
          ]
        },
        {
          title: "쿠키 제어 방법",
          icon: Shield,
          content: [
            "브라우저 설정에서 쿠키 허용/차단 설정",
            "사이트별 쿠키 관리",
            "쿠키 자동 삭제 설정",
            "시크릿/프라이빗 브라우징 모드 사용",
            "쿠키 동의 설정 변경 (설정 > 개인정보)",
            "광고 개인화 옵트아웃"
          ]
        }
      ],
      
      browsers: {
        title: "브라우저별 쿠키 설정",
        items: [
          "Chrome: 설정 > 개인정보 및 보안 > 쿠키 및 기타 사이트 데이터",
          "Firefox: 설정 > 개인정보 및 보안 > 쿠키 및 사이트 데이터",
          "Safari: 환경설정 > 개인정보 보호 > 쿠키 및 웹사이트 데이터",
          "Edge: 설정 > 쿠키 및 사이트 권한 > 쿠키 및 저장된 데이터"
        ]
      },
      
      contact: {
        title: "문의하기",
        content: "쿠키 정책에 대한 문의사항이 있으시면 연락주세요.",
        email: "cookies@ideaworklab.com"
      }
    },
    en: {
      title: "Cookie Policy",
      subtitle: "Detailed information for transparent cookie usage",
      lastUpdated: "Last updated: January 26, 2024",
      backToHome: "Back to Home",
      
      intro: "Idea Work Lab uses cookies and similar technologies to improve our services and enhance user experience. This policy explains what cookies we use, why we use them, and how users can control them.",
      
      sections: [
        {
          title: "What are Cookies?",
          icon: Cookie,
          content: [
            "Cookies are small text files that websites store in your browser",
            "They help remember your settings when you revisit the website",
            "Session cookies are automatically deleted when you close your browser",
            "Persistent cookies are stored for a specified period",
            "First-party cookies are set directly by Idea Work Lab",
            "Third-party cookies may be set by partner services"
          ]
        },
        {
          title: "Essential Cookies",
          icon: Settings,
          content: [
            "Maintaining login status",
            "User language settings (Korean/English)",
            "Temporary storage of cart and payment information",
            "Security and authentication information",
            "Basic site functionality",
            "CSRF attack prevention"
          ]
        },
        {
          title: "Analytics Cookies",
          icon: BarChart,
          content: [
            "Site usage statistics through Google Analytics",
            "Measuring page views and dwell time",
            "Analyzing user behavior patterns",
            "Identifying popular content and features",
            "Data collection for service improvement",
            "A/B testing execution and result analysis"
          ]
        },
        {
          title: "Marketing Cookies",
          icon: Target,
          content: [
            "Displaying personalized advertisements",
            "Social media integration features",
            "Newsletter subscription tracking",
            "Remarketing campaign execution",
            "Partner referral tracking",
            "Marketing effectiveness measurement"
          ]
        },
        {
          title: "How to Control Cookies",
          icon: Shield,
          content: [
            "Set cookie allow/block in browser settings",
            "Site-specific cookie management",
            "Automatic cookie deletion settings",
            "Use incognito/private browsing mode",
            "Change cookie consent settings (Settings > Privacy)",
            "Opt-out of ad personalization"
          ]
        }
      ],
      
      browsers: {
        title: "Browser-specific Cookie Settings",
        items: [
          "Chrome: Settings > Privacy and security > Cookies and other site data",
          "Firefox: Settings > Privacy & Security > Cookies and Site Data",
          "Safari: Preferences > Privacy > Cookies and website data",
          "Edge: Settings > Cookies and site permissions > Cookies and stored data"
        ]
      },
      
      contact: {
        title: "Contact Us",
        content: "Please contact us if you have any questions about our cookie policy.",
        email: "cookies@ideaworklab.com"
      }
    }
  };

  const t = content[language];

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
            <p className="text-xl text-white/90 mb-4">{t.subtitle}</p>
            <p className="text-sm text-white/70">{t.lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card>
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">{t.intro}</p>
            </CardContent>
          </Card>

          {/* Sections */}
          {t.sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-iwl-gradient rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-iwl-purple rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}

          {/* Browser Settings */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-iwl-gradient rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <span>{t.browsers.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {t.browsers.items.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-iwl-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-iwl-purple-50 border-iwl-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-iwl-gradient rounded-lg flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-white" />
                </div>
                <span>{t.contact.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{t.contact.content}</p>
              <div className="flex items-center space-x-3">
                <span className="w-4 h-4 text-iwl-purple">📧</span>
                <a href={`mailto:${t.contact.email}`} className="text-iwl-purple hover:underline">
                  {t.contact.email}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}