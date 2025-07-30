import React from 'react';
import { Mail, Globe, BookOpen, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language }) => {
  const content = {
    ko: {
      brandTagline: 'AI와 함께하는 새로운 생각정리',
      description: 'Idea Work Lab에서 AI와 협력하여 더 깊이 있는 사고를 경험하세요.',
      sections: {
        platform: {
          title: '플랫폼',
          links: [
            { id: 'about', name: '소개', page: 'about' },
            { id: 'courses', name: '강의', page: 'courses' },
            { id: 'journal', name: '저널', page: 'journal' },
            { id: 'ai-practice', name: 'AI 실습', page: 'ai-practice' }
          ]
        },
        support: {
          title: '지원',
          links: [
            { id: 'help', name: '도움말', page: 'help' },
            { id: 'contact', name: '문의하기', page: 'coming-soon' },
            { id: 'community', name: '커뮤니티', page: 'coming-soon' }
          ]
        },
        legal: {
          title: '법적 고지',
          links: [
            { id: 'terms', name: '이용약관', page: 'terms' },
            { id: 'privacy', name: '개인정보처리방침', page: 'privacy' },
            { id: 'cookies', name: '쿠키 정책', page: 'cookies' },
            { id: 'license', name: '라이선스', page: 'license' }
          ]
        },
        company: {
          title: '회사',
          links: [
            { id: 'sitemap', name: '사이트맵', page: 'sitemap' },
            { id: 'version-history', name: '버전 히스토리', page: 'version-history' }
          ]
        }
      },
      newsletter: {
        title: 'AI 인사이트 레터',
        description: 'AI와 함께하는 생각정리 팁과 인사이트를 받아보세요',
        placeholder: '이메일 주소를 입력하세요',
        subscribe: '구독하기'
      },
      copyright: '© 2024 Idea Work Lab. All rights reserved.',
      adminAccess: '관리자 접근'
    },
    en: {
      brandTagline: 'Think Deeper with AI',
      description: 'Experience deeper thinking through AI collaboration at Idea Work Lab.',
      sections: {
        platform: {
          title: 'Platform',
          links: [
            { id: 'about', name: 'About', page: 'about' },
            { id: 'courses', name: 'Courses', page: 'courses' },
            { id: 'journal', name: 'Journal', page: 'journal' },
            { id: 'ai-practice', name: 'AI Practice', page: 'ai-practice' }
          ]
        },
        support: {
          title: 'Support',
          links: [
            { id: 'help', name: 'Help', page: 'help' },
            { id: 'contact', name: 'Contact', page: 'coming-soon' },
            { id: 'community', name: 'Community', page: 'coming-soon' }
          ]
        },
        legal: {
          title: 'Legal',
          links: [
            { id: 'terms', name: 'Terms of Service', page: 'terms' },
            { id: 'privacy', name: 'Privacy Policy', page: 'privacy' },
            { id: 'cookies', name: 'Cookie Policy', page: 'cookies' },
            { id: 'license', name: 'License', page: 'license' }
          ]
        },
        company: {
          title: 'Company',
          links: [
            { id: 'sitemap', name: 'Sitemap', page: 'sitemap' },
            { id: 'version-history', name: 'Version History', page: 'version-history' }
          ]
        }
      },
      newsletter: {
        title: 'AI Insights Newsletter',
        description: 'Get tips and insights on AI-enhanced thinking',
        placeholder: 'Enter your email address',
        subscribe: 'Subscribe'
      },
      copyright: '© 2024 Idea Work Lab. All rights reserved.',
      adminAccess: 'Admin Access'
    }
  };

  const t = content[language];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="text-3xl font-bold text-iwl-gradient">
                IWL
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-800">Idea Work Lab</div>
                <div className="text-sm text-iwl-gradient">{t.brandTagline}</div>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-sm">
              {t.description}
            </p>
            <div className="flex space-x-4">
              <div className="p-2 bg-iwl-purple-100 rounded-lg">
                <MessageCircle className="w-5 h-5 text-iwl-purple" />
              </div>
              <div className="p-2 bg-iwl-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-iwl-blue" />
              </div>
              <div className="p-2 bg-iwl-purple-100 rounded-lg">
                <Globe className="w-5 h-5 text-iwl-purple" />
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">{t.sections.platform.title}</h3>
            <ul className="space-y-2">
              {t.sections.platform.links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-600 hover:text-iwl-purple transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">{t.sections.support.title}</h3>
            <ul className="space-y-2">
              {t.sections.support.links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-600 hover:text-iwl-purple transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">{t.sections.legal.title}</h3>
            <ul className="space-y-2">
              {t.sections.legal.links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-600 hover:text-iwl-purple transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">{t.sections.company.title}</h3>
            <ul className="space-y-2">
              {t.sections.company.links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-600 hover:text-iwl-purple transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-iwl-gradient mb-2">
                {t.newsletter.title}
              </h3>
              <p className="text-gray-600">{t.newsletter.description}</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder={t.newsletter.placeholder}
                className="flex-1 md:w-64 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-iwl-purple"
              />
              <button className="bg-iwl-gradient hover:opacity-90 text-white px-6 py-2 rounded-r-lg transition-opacity">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4 md:mb-0">{t.copyright}</p>
          
          {/* Admin Access Link */}
          <button
            onClick={() => onNavigate('admin-login')}
            className="text-sm text-gray-500 hover:text-iwl-purple transition-colors duration-200 border border-gray-300 hover:border-iwl-purple rounded-md px-3 py-1"
            title={t.adminAccess}
          >
            {t.adminAccess}
          </button>
        </div>
      </div>
    </footer>
  );
};