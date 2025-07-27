import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Mail } from 'lucide-react';

interface PrivacyPageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function PrivacyPage({ language, onNavigate }: PrivacyPageProps) {
  const content = {
    ko: {
      title: "개인정보처리방침",
      subtitle: "투명하고 안전한 데이터 처리를 위한 우리의 약속",
      lastUpdated: "최종 업데이트: 2024년 1월 26일",
      backToHome: "홈으로 돌아가기",
      
      sections: [
        {
          title: "수집하는 개인정보",
          icon: Database,
          content: [
            "이메일 주소 (뉴스레터 구독, 계정 생성)",
            "이름 또는 닉네임 (서비스 개인화)",
            "저널 콘텐츠 (AI 분석 및 개선을 위함)",
            "서비스 이용 기록 (성능 개선)",
            "쿠키 및 유사 기술을 통한 정보"
          ]
        },
        {
          title: "개인정보 이용 목적",
          icon: Eye,
          content: [
            "AI 기반 저널링 서비스 제공",
            "개인화된 콘텐츠 및 추천 제공",
            "뉴스레터 및 마케팅 정보 발송",
            "서비스 개선 및 신기능 개발",
            "고객 지원 및 문의 응답",
            "법적 의무 이행"
          ]
        },
        {
          title: "개인정보 보호 조치",
          icon: Lock,
          content: [
            "암호화된 데이터 전송 (SSL/TLS)",
            "안전한 클라우드 스토리지 (Supabase)",
            "접근 권한 제한 및 모니터링",
            "정기적인 보안 점검",
            "데이터 백업 및 복구 시스템",
            "직원 보안 교육 실시"
          ]
        },
        {
          title: "개인정보 제3자 제공",
          icon: UserCheck,
          content: [
            "원칙적으로 제3자에게 제공하지 않습니다",
            "법적 요구사항이 있는 경우 예외",
            "AI 서비스 제공을 위한 OpenAI 등 필수 파트너",
            "사전 동의를 받은 마케팅 파트너",
            "서비스 운영을 위한 기술 파트너 (Vercel, Supabase)"
          ]
        },
        {
          title: "개인정보 보관 기간",
          icon: Shield,
          content: [
            "회원 탈퇴 시까지 (서비스 이용 기간)",
            "뉴스레터 구독 해지 시까지",
            "법적 의무 보관 기간 (최대 3년)",
            "AI 학습 데이터: 익명화 후 보관",
            "로그 데이터: 6개월 후 자동 삭제"
          ]
        },
        {
          title: "이용자의 권리",
          icon: Mail,
          content: [
            "개인정보 열람 요구권",
            "개인정보 정정·삭제 요구권",
            "개인정보 처리정지 요구권",
            "손해배상청구권",
            "뉴스레터 구독 해지",
            "계정 삭제 및 데이터 내보내기"
          ]
        }
      ],
      
      contact: {
        title: "개인정보보호책임자",
        content: "문의사항이 있으시면 언제든 연락주세요.",
        email: "privacy@ideaworklab.com",
        phone: "02-1234-5678"
      }
    },
    en: {
      title: "Privacy Policy",
      subtitle: "Our commitment to transparent and secure data processing",
      lastUpdated: "Last updated: January 26, 2024",
      backToHome: "Back to Home",
      
      sections: [
        {
          title: "Information We Collect",
          icon: Database,
          content: [
            "Email address (newsletter subscription, account creation)",
            "Name or nickname (service personalization)",
            "Journal content (for AI analysis and improvement)",
            "Service usage records (performance improvement)",
            "Information through cookies and similar technologies"
          ]
        },
        {
          title: "How We Use Your Information",
          icon: Eye,
          content: [
            "Providing AI-based journaling services",
            "Delivering personalized content and recommendations",
            "Sending newsletters and marketing information",
            "Improving services and developing new features",
            "Customer support and inquiry responses",
            "Legal compliance"
          ]
        },
        {
          title: "Data Protection Measures",
          icon: Lock,
          content: [
            "Encrypted data transmission (SSL/TLS)",
            "Secure cloud storage (Supabase)",
            "Access control and monitoring",
            "Regular security audits",
            "Data backup and recovery systems",
            "Staff security training"
          ]
        },
        {
          title: "Third-Party Sharing",
          icon: UserCheck,
          content: [
            "We do not share with third parties in principle",
            "Exceptions for legal requirements",
            "Essential partners for AI services like OpenAI",
            "Marketing partners with prior consent",
            "Technical partners for service operation (Vercel, Supabase)"
          ]
        },
        {
          title: "Data Retention Period",
          icon: Shield,
          content: [
            "Until account deletion (service usage period)",
            "Until newsletter unsubscription",
            "Legal retention period (maximum 3 years)",
            "AI training data: stored after anonymization",
            "Log data: automatically deleted after 6 months"
          ]
        },
        {
          title: "Your Rights",
          icon: Mail,
          content: [
            "Right to access personal information",
            "Right to correct or delete personal information",
            "Right to request processing suspension",
            "Right to claim damages",
            "Newsletter unsubscription",
            "Account deletion and data export"
          ]
        }
      ],
      
      contact: {
        title: "Data Protection Officer",
        content: "Please contact us anytime if you have any questions.",
        email: "privacy@ideaworklab.com",
        phone: "+82-2-1234-5678"
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
          <Card className="bg-iwl-purple-50 border-iwl-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-iwl-gradient rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span>{t.contact.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{t.contact.content}</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-iwl-purple" />
                  <a href={`mailto:${t.contact.email}`} className="text-iwl-purple hover:underline">
                    {t.contact.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-4 h-4 text-iwl-purple">📞</span>
                  <span className="text-muted-foreground">{t.contact.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}