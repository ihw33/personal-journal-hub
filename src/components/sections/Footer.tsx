import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Mail,
  Github,
  Twitter,
  Linkedin,
  BookOpen,
  Users,
  FileText,
  Shield,
} from "lucide-react";

interface FooterProps {
  language: "ko" | "en";
  onNavigate?: (page: 'home' | 'journal' | 'courses' | 'about') => void;
}

export function Footer({ language, onNavigate }: FooterProps) {
  const content = {
    ko: {
      description:
        "AI와 함께하는 깊이 있는 사고를 위한 개인 저널 허브",
      product: "제품",
      productLinks: [
        { name: "저널", href: "/journal" },
        { name: "템플릿", href: "/templates" },
        { name: "AI 도구", href: "/ai-tools" },
        { name: "분석", href: "/analytics" },
      ],
      company: "회사",
      companyLinks: [
        { name: "소개", href: "/about" },
        { name: "블로그", href: "/blog" },
        { name: "채용", href: "/careers" },
        { name: "연락처", href: "/contact" },
      ],
      resources: "리소스",
      resourceLinks: [
        { name: "도움말", href: "/help" },
        { name: "커뮤니티", href: "/community" },
        { name: "API 문서", href: "/docs" },
        { name: "상태", href: "/status" },
      ],
      legal: "법적 고지",
      legalLinks: [
        { name: "개인정보처리방침", href: "/privacy" },
        { name: "이용약관", href: "/terms" },
        { name: "쿠키 정책", href: "/cookies" },
        { name: "라이선스", href: "/license" },
      ],
      newsletter: "뉴스레터",
      newsletterDesc: "최신 업데이트와 인사이트를 받아보세요",
      emailPlaceholder: "이메일 주소",
      subscribe: "구독",
      copyright: "© 2024 Idea Work Lab. 모든 권리 보유.",
      madeWith: "Made with ❤️ in Korea",
    },
    en: {
      description:
        "Personal journal hub for deep thinking with AI",
      product: "Product",
      productLinks: [
        { name: "Journal", href: "/journal" },
        { name: "Templates", href: "/templates" },
        { name: "AI Tools", href: "/ai-tools" },
        { name: "Analytics", href: "/analytics" },
      ],
      company: "Company",
      companyLinks: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
      resources: "Resources",
      resourceLinks: [
        { name: "Help", href: "/help" },
        { name: "Community", href: "/community" },
        { name: "API Docs", href: "/docs" },
        { name: "Status", href: "/status" },
      ],
      legal: "Legal",
      legalLinks: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "License", href: "/license" },
      ],
      newsletter: "Newsletter",
      newsletterDesc: "Get the latest updates and insights",
      emailPlaceholder: "Email address",
      subscribe: "Subscribe",
      copyright: "© 2024 Idea Work Lab. All rights reserved.",
      madeWith: "Made with ❤️ in Korea",
    },
  };

  const t = content[language];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-16">
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
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-iwl-purple" />
              {t.product}
            </h3>
            <ul className="space-y-3">
              {t.productLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      if (link.name === '저널' || link.name === 'Journal') {
                        onNavigate?.('journal');
                      }
                    }}
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
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-iwl-blue" />
              {t.company}
            </h3>
            <ul className="space-y-3">
              {t.companyLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      if (link.name === '소개' || link.name === 'About') {
                        onNavigate?.('about');
                      }
                    }}
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
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-iwl-purple" />
              {t.resources}
            </h3>
            <ul className="space-y-3">
              {t.resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
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
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
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
          <p className="mt-2 md:mt-0">{t.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}