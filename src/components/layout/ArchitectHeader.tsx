'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mainNavigation } from '@/types/navigation';

interface ArchitectHeaderProps {
  className?: string;
  onMenuToggle?: (isOpen: boolean) => void;
}

const ArchitectHeader = ({ className, onMenuToggle }: ArchitectHeaderProps = {}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    onMenuToggle?.(newState);
  };

  return (
    <header className={`bg-white/95 backdrop-blur-md border-b border-architect-gray-300 sticky top-0 z-50 ${className || ''}`}>
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-architect-gradient-main rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <div className="flex flex-col">
                <span className="text-h4 font-bold text-architect-gray-900 leading-tight">
                  IdeaWorkLab
                </span>
                <span className="text-xs text-architect-gray-500 leading-tight">
                  사고와 재능의 설계자
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-body font-medium text-architect-gray-700 hover:text-architect-primary transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-architect-gradient-main group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/login"
              className="px-6 py-2 text-body font-medium text-architect-primary hover:text-architect-secondary transition-colors duration-200"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-architect-gradient-main text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              회원가입
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-architect-gray-100 transition-colors duration-200"
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`w-5 h-0.5 bg-architect-gray-700 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-architect-gray-700 mt-1 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-architect-gray-700 mt-1 transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col space-y-4 pt-4 border-t border-architect-gray-200">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-body font-medium text-architect-gray-700 hover:text-architect-primary hover:bg-architect-gray-100 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div>
                  <div>{item.label}</div>
                  {item.description && (
                    <div className="text-small text-architect-gray-500 mt-1">
                      {item.description}
                    </div>
                  )}
                </div>
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-architect-gray-200">
              <Link
                href="/login"
                className="px-4 py-3 text-center text-body font-medium text-architect-primary hover:bg-architect-gray-100 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="px-4 py-3 bg-architect-gradient-main text-white text-center rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                회원가입
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ArchitectHeader;