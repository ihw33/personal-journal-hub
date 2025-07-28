import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Mail,
  Github,
  Twitter,
  Linkedin,
  BookOpen,
  Users,
  FileText,
  Shield,
  Settings,
} from "lucide-react";

interface FooterProps {
  language: "ko" | "en";
  onNavigate?: (page: string) => void;
}

export const Footer = React.memo(({ language, onNavigate }: FooterProps) => {
  const content = {
    ko: {
      description:
        "AI와 함께하는 깊이 있는 사고를 위한 개인 저널 허브",
      product: "제품",
      productLinks: [
        { name: "저널", page: "journal" },
        { name: "AI 실습", page: "ai-practice" },
        { name: "템플릿", page: "templates" },
        { name: "AI 도구", page: "ai-tools" },
        { name: "분석", page: "analytics" },
      ],
      company: "회사",
      companyLinks: [
        { name: "소개", page: "about" },
        { name: "블로그", page: "blog" },
        { name: "채용", page: "careers" },
        { name: "연락처", page: "contact" },
      ],
      resources: "리소스",
      resourceLinks: [
        { name: "도움말", page: "help" },
        { name: "커뮤니티", page: "community" },
        { name: "API 문서", page: "docs" },
        { name: "상태", page: "status" },
      ],
      legal: "법적 고지",
      legalLinks: [
        { name: "개인정보처리방침", page: "privacy" },
        { name: "이용약관", page: "terms" },
        { name: "쿠키 정책", page: "cookies" },
        { name: "라이선스", page: "license" },
      ],
      newsletter: "뉴스레터",
      newsletterDesc: "최신 업데이트와 인사이트를 받아보세요",
      emailPlaceholder: "이메일 주소",
      subscribe: "구독",
      copyright: "© 2024 Idea Work Lab. 모든 권리 보유.",
      madeWith: "Made with ❤️ in Korea",
      admin: "관리",
    },
    en: {
      description:
        "Personal journal hub for deep thinking with AI",
      product: "Product",
      productLinks: [
        { name: "Journal", page: "journal" },
        { name: "Templates", page: "templates" },
        { name: "AI Tools", page: "ai-tools" },
        { name: "Analytics", page: "analytics" },
      ],
      company: "Company",
      companyLinks: [
        { name: "About", page: "about" },
        { name: "Blog", page: "blog" },
        { name: "Careers", page: "careers" },
        { name: "Contact", page: "contact" },
      ],
      resources: "Resources",
      resourceLinks: [
        { name: "Help", page: "help" },
        { name: "Community", page: "community" },
        { name: "API Docs", page: "docs" },
        { name: "Status", page: "status" },
      ],
      legal: "Legal",
      legalLinks: [
        { name: "Privacy Policy", page: "privacy" },
        { name: "Terms of Service", page: "terms" },
        { name: "Cookie Policy", page: "cookies" },
        { name: "License", page: "license" },
      ],
      newsletter: "Newsletter",
      newsletterDesc: "Get the latest updates and insights",
      emailPlaceholder: "Email address",
      subscribe: "Subscribe",
      copyright: "© 2024 Idea Work Lab. All rights reserved.",
      madeWith: "Made with ❤️ in Korea",
      admin: "Admin",
    },
  };

  const t = content[language];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6 cursor-pointer" onClick={() => onNavigate?.('home')}>
              <div className="w-8 h-8 bg-iwl-gradient rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">iWL</span>
              </div>
              <span className="text-xl">Idea Work Lab</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              {t.description}
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-6 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-iwl-purple" />
              {t.product}
            </h3>
            <ul className="space-y-3">
              {t.productLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => onNavigate?.(link.page)}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-iwl-blue" />
              {t.company}
            </h3>
            <ul className="space-y-3">
              {t.companyLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => onNavigate?.(link.page)}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-iwl-purple" />
              {t.resources}
            </h3>
            <ul className="space-y-3">
              {t.resourceLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => onNavigate?.(link.page)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="mb-2 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-iwl-blue" />
                {t.newsletter}
              </h3>
              <p className="text-gray-400 text-sm">
                {t.newsletterDesc}
              </p>
            </div>
            <div className="flex gap-3 max-w-sm">
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-iwl-purple focus:border-transparent"
              />
              <Button className="bg-iwl-gradient hover:opacity-90 px-6">
                {t.subscribe}
              </Button>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
              <h4 className="text-sm flex items-center text-gray-400">
                <Shield className="w-4 h-4 mr-2" />
                {t.legal}:
              </h4>
              {t.legalLinks.map((link, index) => (
                <span
                  key={link.name}
                  className="flex items-center"
                >
                  <button
                    onClick={() => onNavigate?.(link.page)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                  {index < t.legalLinks.length - 1 && (
                    <span className="text-gray-600 mx-2">
                      •
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-gray-800" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-400">
          <p>{t.copyright}</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <p>{t.madeWith}</p>
            {/* 관리자 링크 - 조용하게 배치 */}
            <button
              onClick={() => {
                console.log('🔗 Admin link clicked in footer');
                // 강제 URL 변경으로 관리자 페이지 이동
                window.location.href = '/admin';
              }}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-400 transition-colors opacity-60 hover:opacity-100"
              title={t.admin}
            >
              <Settings className="w-3 h-3" />
              <span className="text-xs">{t.admin}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});