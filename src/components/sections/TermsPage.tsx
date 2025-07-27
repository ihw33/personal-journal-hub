import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, FileText, Users, AlertTriangle, CreditCard, Shield, Gavel } from 'lucide-react';

interface TermsPageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function TermsPage({ language, onNavigate }: TermsPageProps) {
  const content = {
    ko: {
      title: "이용약관",
      subtitle: "Idea Work Lab 서비스 이용을 위한 약관",
      lastUpdated: "최종 업데이트: 2024년 1월 26일",
      backToHome: "홈으로 돌아가기",
      
      sections: [
        {
          title: "서비스 개요",
          icon: FileText,
          content: [
            "Idea Work Lab은 AI 기반 저널링 및 사고 정리 서비스입니다",
            "개인의 창의적 사고 향상을 위한 도구와 콘텐츠를 제공합니다",
            "AI 협력을 통한 깊이 있는 인사이트 창출을 지원합니다",
            "뉴스레터, 강의, 커뮤니티 서비스를 포함합니다",
            "본 약관은 모든 서비스 이용에 적용됩니다"
          ]
        },
        {
          title: "사용자 의무",
          icon: Users,
          content: [
            "정확한 개인정보를 제공하고 최신 상태로 유지",
            "타인의 권리를 침해하지 않는 콘텐츠 작성",
            "서비스를 불법적이거나 부적절한 목적으로 사용 금지",
            "타인의 계정을 무단으로 사용하거나 접근 금지",
            "서비스의 보안이나 성능을 저해하는 행위 금지",
            "저작권, 상표권 등 지식재산권 존중"
          ]
        },
        {
          title: "금지 행위",
          icon: AlertTriangle,
          content: [
            "스팸, 광고, 불법 콘텐츠 게시",
            "다른 사용자를 괴롭히거나 위협하는 행위",
            "허위 정보나 오해를 불러일으키는 콘텐츠",
            "바이러스나 악성 코드 전파",
            "서비스의 취약점을 악용하는 행위",
            "자동화된 도구를 통한 무단 접근",
            "미성년자에게 부적절한 콘텐츠"
          ]
        },
        {
          title: "결제 및 환불",
          icon: CreditCard,
          content: [
            "유료 서비스는 사전 결제를 통해 이용 가능합니다",
            "결제는 안전한 제3자 결제 시스템을 통해 처리됩니다",
            "7일 이내 사용하지 않은 강의는 전액 환불 가능합니다",
            "부분 사용한 서비스는 사용 비율에 따라 환불됩니다",
            "환불 요청은 고객센터를 통해 접수하실 수 있습니다",
            "정당한 사유 없는 반복적 환불 요청은 제한될 수 있습니다"
          ]
        },
        {
          title: "지적재산권",
          icon: Shield,
          content: [
            "서비스의 모든 콘텐츠는 Idea Work Lab의 지적재산입니다",
            "사용자가 작성한 콘텐츠의 저작권은 사용자에게 있습니다",
            "AI 분석 결과물의 권리는 사용자와 공유됩니다",
            "서비스 로고, 브랜드명 등의 무단 사용을 금지합니다",
            "오픈소스 라이선스가 적용되는 부분은 별도 명시됩니다",
            "타인의 저작권을 침해하지 않도록 주의해주세요"
          ]
        },
        {
          title: "책임 제한",
          icon: Gavel,
          content: [
            "서비스는 '있는 그대로' 제공되며 완전성을 보장하지 않습니다",
            "AI 분석 결과의 정확성이나 유용성을 보장하지 않습니다",
            "사용자의 데이터 손실에 대한 책임을 지지 않습니다",
            "제3자 서비스 장애로 인한 손해에 대한 책임 제한",
            "천재지변, 전쟁 등 불가항력적 사유로 인한 서비스 중단",
            "손해배상 한도는 최근 12개월 결제 금액으로 제한됩니다"
          ]
        }
      ],
      
      contact: {
        title: "문의 및 신고",
        content: "약관 관련 문의나 신고사항이 있으시면 연락주세요.",
        email: "terms@ideaworklab.com"
      }
    },
    en: {
      title: "Terms of Service",
      subtitle: "Terms and conditions for using Idea Work Lab services",
      lastUpdated: "Last updated: January 26, 2024",
      backToHome: "Back to Home",
      
      sections: [
        {
          title: "Service Overview",
          icon: FileText,
          content: [
            "Idea Work Lab is an AI-based journaling and thought organization service",
            "We provide tools and content to enhance personal creative thinking",
            "We support deep insight creation through AI collaboration",
            "Includes newsletter, courses, and community services",
            "These terms apply to all service usage"
          ]
        },
        {
          title: "User Obligations",
          icon: Users,
          content: [
            "Provide accurate personal information and keep it up to date",
            "Create content that does not infringe on others' rights",
            "Prohibit using the service for illegal or inappropriate purposes",
            "Prohibit unauthorized use or access to others' accounts",
            "Prohibit acts that impair service security or performance",
            "Respect intellectual property rights such as copyrights and trademarks"
          ]
        },
        {
          title: "Prohibited Activities",
          icon: AlertTriangle,
          content: [
            "Posting spam, advertisements, or illegal content",
            "Harassing or threatening other users",
            "False information or misleading content",
            "Spreading viruses or malicious code",
            "Exploiting service vulnerabilities",
            "Unauthorized access through automated tools",
            "Content inappropriate for minors"
          ]
        },
        {
          title: "Payment and Refunds",
          icon: CreditCard,
          content: [
            "Paid services are available through advance payment",
            "Payments are processed through secure third-party payment systems",
            "Full refund available for unused courses within 7 days",
            "Partially used services are refunded based on usage ratio",
            "Refund requests can be submitted through customer service",
            "Repeated refund requests without valid reasons may be limited"
          ]
        },
        {
          title: "Intellectual Property",
          icon: Shield,
          content: [
            "All service content is the intellectual property of Idea Work Lab",
            "Copyright of user-created content belongs to the user",
            "Rights to AI analysis results are shared with users",
            "Unauthorized use of service logos and brand names is prohibited",
            "Open source license applicable parts are separately specified",
            "Please be careful not to infringe on others' copyrights"
          ]
        },
        {
          title: "Limitation of Liability",
          icon: Gavel,
          content: [
            "Services are provided 'as is' without guaranteeing completeness",
            "We do not guarantee the accuracy or usefulness of AI analysis results",
            "We are not responsible for user data loss",
            "Limited liability for damages due to third-party service failures",
            "Service interruption due to force majeure events",
            "Compensation limit is restricted to payment amount in recent 12 months"
          ]
        }
      ],
      
      contact: {
        title: "Inquiries and Reports",
        content: "Please contact us for terms-related inquiries or reports.",
        email: "terms@ideaworklab.com"
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

          {/* Contact Information */}
          <Card className="bg-iwl-blue-50 border-iwl-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-iwl-gradient rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span>{t.contact.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{t.contact.content}</p>
              <div className="flex items-center space-x-3">
                <span className="w-4 h-4 text-iwl-blue">📧</span>
                <a href={`mailto:${t.contact.email}`} className="text-iwl-blue hover:underline">
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