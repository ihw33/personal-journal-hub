import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, FileText, Code, Image, Music, Video, Users } from 'lucide-react';

interface LicensePageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function LicensePage({ language, onNavigate }: LicensePageProps) {
  const content = {
    ko: {
      title: "라이선스",
      subtitle: "오픈소스 및 제3자 라이선스 정보",
      lastUpdated: "최종 업데이트: 2024년 1월 26일",
      backToHome: "홈으로 돌아가기",
      
      intro: "Idea Work Lab은 다양한 오픈소스 소프트웨어와 제3자 라이브러리를 사용하여 구축되었습니다. 여기에 사용된 모든 라이선스 정보를 투명하게 공개합니다.",
      
      sections: [
        {
          title: "소프트웨어 라이선스",
          icon: Code,
          libraries: [
            { name: "React", version: "18.x", license: "MIT License", description: "사용자 인터페이스 구축을 위한 라이브러리" },
            { name: "Next.js", version: "14.x", license: "MIT License", description: "React 기반 풀스택 웹 프레임워크" },
            { name: "Tailwind CSS", version: "4.x", license: "MIT License", description: "유틸리티 기반 CSS 프레임워크" },
            { name: "Lucide React", version: "latest", license: "ISC License", description: "아이콘 라이브러리" },
            { name: "Recharts", version: "2.x", license: "MIT License", description: "React 차트 라이브러리" },
            { name: "Radix UI", version: "1.x", license: "MIT License", description: "접근성 높은 UI 컴포넌트" }
          ]
        },
        {
          title: "서비스 및 API",
          icon: Users,
          libraries: [
            { name: "Supabase", license: "Apache License 2.0", description: "백엔드 서비스 및 데이터베이스" },
            { name: "Vercel", license: "상용 라이선스", description: "호스팅 및 배포 플랫폼" },
            { name: "OpenAI API", license: "상용 라이선스", description: "AI 언어 모델 서비스" },
            { name: "Google Analytics", license: "상용 라이선스", description: "웹 분석 서비스" },
            { name: "Cloudflare", license: "상용 라이선스", description: "CDN 및 보안 서비스" }
          ]
        },
        {
          title: "폰트 라이선스",
          icon: FileText,
          libraries: [
            { name: "Inter", license: "SIL Open Font License", description: "영문 본문 및 제목 폰트" },
            { name: "Pretendard", license: "SIL Open Font License", description: "한글 본문 및 제목 폰트" },
            { name: "JetBrains Mono", license: "Apache License 2.0", description: "코드 표시용 모노스페이스 폰트" }
          ]
        },
        {
          title: "이미지 및 아이콘",
          icon: Image,
          libraries: [
            { name: "Unsplash", license: "Unsplash License", description: "무료 스톡 이미지" },
            { name: "Lucide Icons", license: "ISC License", description: "인터페이스 아이콘" },
            { name: "Heroicons", license: "MIT License", description: "보조 아이콘 세트" },
            { name: "Custom Illustrations", license: "All Rights Reserved", description: "자체 제작 일러스트레이션" }
          ]
        }
      ],
      
      mitLicense: {
        title: "MIT License",
        content: `MIT License

Copyright (c) 2024 Idea Work Lab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
      },
      
      contact: {
        title: "라이선스 문의",
        content: "라이선스 관련 문의사항이 있으시면 연락주세요.",
        email: "license@ideaworklab.com"
      }
    },
    en: {
      title: "License",
      subtitle: "Open source and third-party license information",
      lastUpdated: "Last updated: January 26, 2024",
      backToHome: "Back to Home",
      
      intro: "Idea Work Lab is built using various open source software and third-party libraries. We transparently disclose all license information used here.",
      
      sections: [
        {
          title: "Software Licenses",
          icon: Code,
          libraries: [
            { name: "React", version: "18.x", license: "MIT License", description: "Library for building user interfaces" },
            { name: "Next.js", version: "14.x", license: "MIT License", description: "React-based full-stack web framework" },
            { name: "Tailwind CSS", version: "4.x", license: "MIT License", description: "Utility-based CSS framework" },
            { name: "Lucide React", version: "latest", license: "ISC License", description: "Icon library" },
            { name: "Recharts", version: "2.x", license: "MIT License", description: "React chart library" },
            { name: "Radix UI", version: "1.x", license: "MIT License", description: "Accessible UI components" }
          ]
        },
        {
          title: "Services and APIs",
          icon: Users,
          libraries: [
            { name: "Supabase", license: "Apache License 2.0", description: "Backend service and database" },
            { name: "Vercel", license: "Commercial License", description: "Hosting and deployment platform" },
            { name: "OpenAI API", license: "Commercial License", description: "AI language model service" },
            { name: "Google Analytics", license: "Commercial License", description: "Web analytics service" },
            { name: "Cloudflare", license: "Commercial License", description: "CDN and security service" }
          ]
        },
        {
          title: "Font Licenses",
          icon: FileText,
          libraries: [
            { name: "Inter", license: "SIL Open Font License", description: "English body and heading font" },
            { name: "Pretendard", license: "SIL Open Font License", description: "Korean body and heading font" },
            { name: "JetBrains Mono", license: "Apache License 2.0", description: "Monospace font for code display" }
          ]
        },
        {
          title: "Images and Icons",
          icon: Image,
          libraries: [
            { name: "Unsplash", license: "Unsplash License", description: "Free stock images" },
            { name: "Lucide Icons", license: "ISC License", description: "Interface icons" },
            { name: "Heroicons", license: "MIT License", description: "Auxiliary icon set" },
            { name: "Custom Illustrations", license: "All Rights Reserved", description: "Self-created illustrations" }
          ]
        }
      ],
      
      mitLicense: {
        title: "MIT License",
        content: `MIT License

Copyright (c) 2024 Idea Work Lab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
      },
      
      contact: {
        title: "License Inquiries",
        content: "Please contact us if you have any license-related questions.",
        email: "license@ideaworklab.com"
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

          {/* License Sections */}
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
                  <div className="space-y-4">
                    {section.libraries.map((lib, libIndex) => (
                      <div key={libIndex} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-foreground">{lib.name}</h4>
                            {lib.version && (
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {lib.version}
                              </span>
                            )}
                          </div>
                          <span className="text-xs bg-iwl-purple-50 text-iwl-purple px-2 py-1 rounded">
                            {lib.license}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{lib.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* MIT License Text */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-iwl-gradient rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span>{t.mitLicense.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap bg-white p-4 rounded border overflow-x-auto">
                {t.mitLicense.content}
              </pre>
            </CardContent>
          </Card>

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