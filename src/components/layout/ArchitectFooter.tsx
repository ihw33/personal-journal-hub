import Link from 'next/link';
import { footerSections, socialLinks } from '@/types/navigation';

interface ArchitectFooterProps {
  className?: string;
}

const ArchitectFooter = ({ className }: ArchitectFooterProps = {}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-architect-gray-900 text-white ${className || ''}`}>
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-architect-gradient-main rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <div className="flex flex-col">
                <span className="text-h3 font-bold text-white leading-tight">
                  IdeaWorkLab
                </span>
                <span className="text-small text-architect-gray-300 leading-tight">
                  사고와 재능의 설계자
                </span>
              </div>
            </div>
            <p className="text-body text-architect-gray-300 mb-6 leading-relaxed max-w-md">
              AI와 함께 체계적으로 사고력을 훈련하는 통합 학습 플랫폼입니다. 
              독자적인 8단계 사고 확장 모델을 통해 창의적 사고와 문제해결 능력을 키워보세요.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.platform}
                  href={social.href}
                  className="w-10 h-10 bg-architect-gray-700 hover:bg-architect-primary rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label={`${social.platform} 팔로우`}
                >
                  <span className="sr-only">{social.platform}</span>
                  <span className="text-small font-medium" aria-hidden="true">
                    {social.platform === 'LinkedIn' && 'in'}
                    {social.platform === 'Twitter' && 'tw'}
                    {social.platform === 'GitHub' && 'gh'}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-body-lg font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body text-architect-gray-300 hover:text-architect-ai-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-architect-gray-700">
        <div className="max-w-screen-xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-small text-architect-gray-400">
                © {currentYear} IdeaWorkLab. All rights reserved.
              </p>
              <div className="hidden md:block w-1 h-1 bg-architect-gray-500 rounded-full" />
              <p className="text-small text-architect-gray-400">
                사업자등록번호: {process.env.NEXT_PUBLIC_BUSINESS_REG_NUMBER || '000-00-00000'}
              </p>
            </div>
            
            <div className="flex items-center space-x-1 text-small text-architect-gray-400">
              <span>Powered by</span>
              <span className="text-architect-ai-primary font-medium">AI</span>
              <span>&</span>
              <span className="bg-architect-gradient-main bg-clip-text text-transparent font-medium">
                Innovation
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ArchitectFooter;