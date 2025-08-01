'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  Globe, 
  User, 
  LogOut,
  ChevronDown,
  Settings
} from 'lucide-react';
import { getMainNavigation, languageContent, UserProfile } from '@/types/navigation';

interface ArchitectHeaderProps {
  className?: string;
  onMenuToggle?: (isOpen: boolean) => void;
  user?: UserProfile | null;
  language?: 'ko' | 'en';
  onLanguageChange?: (lang: 'ko' | 'en') => void;
  onLogout?: () => void;
}

const ArchitectHeader = ({ 
  className, 
  onMenuToggle, 
  user, 
  language = 'ko', 
  onLanguageChange,
  onLogout 
}: ArchitectHeaderProps = {}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    onMenuToggle?.(newState);
  };

  const navigation = getMainNavigation(language);
  const t = languageContent[language];

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
            {navigation.map((item) => (
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

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            {onLanguageChange && (
              <button
                onClick={() => onLanguageChange(language === 'ko' ? 'en' : 'ko')}
                className="flex items-center gap-2 p-2 rounded-lg text-architect-gray-700 hover:text-architect-primary hover:bg-architect-gray-100/50 transition-all duration-300"
                title={language === 'ko' ? 'English' : '한국어'}
                aria-label={language === 'ko' ? 'Switch to English' : '한국어로 전환'}
              >
                <Globe className="w-4 h-4" />
                <span className="text-small font-medium">
                  {language === 'ko' ? 'EN' : '한'}
                </span>
              </button>
            )}

            {/* User Menu or Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-architect-gray-100/60 transition-all duration-300 group"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                  aria-label="사용자 메뉴"
                >
                  <div className="w-9 h-9 bg-architect-gradient-main rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden md:block">
                    <div className="text-small font-medium text-architect-gray-900">
                      {user.name || user.email}
                    </div>
                    {user.user_type === 'admin' && (
                      <span className="inline-flex items-center gap-1 bg-architect-error text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        {t.admin}
                      </span>
                    )}
                  </div>
                  <ChevronDown className="w-4 h-4 text-architect-gray-500" />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl py-2 z-50 border border-architect-gray-300/50 backdrop-blur-sm">
                    <div className="px-4 py-3 border-b border-architect-gray-300/30">
                      <div className="text-small font-semibold text-architect-gray-900">
                        {user.name || user.email}
                      </div>
                      <div className="text-xs text-architect-gray-500 mt-1">
                        {user.user_type} • {user.subscription_status || 'active'}
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center w-full text-left px-4 py-3 text-body font-medium text-architect-gray-700 hover:bg-architect-gray-100/60 hover:text-architect-primary transition-all duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        {t.auth.dashboard}
                      </Link>
                      
                      {user.user_type === 'admin' && (
                        <Link
                          href="/admin"
                          className="flex items-center w-full text-left px-4 py-3 text-body font-medium text-architect-error hover:bg-architect-error/10 transition-all duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          {t.admin}
                        </Link>
                      )}
                    </div>
                    
                    <div className="border-t border-architect-gray-300/30 pt-2">
                      <button
                        onClick={() => {
                          onLogout?.();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-3 text-body font-medium text-architect-gray-700 hover:bg-architect-gray-100/60 hover:text-architect-error transition-all duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        {t.auth.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-6 py-2 text-body font-medium text-architect-primary hover:text-architect-secondary transition-colors duration-200"
                >
                  {t.auth.login}
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2 bg-architect-gradient-main text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  {t.auth.signup}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-architect-gray-100 transition-colors duration-200"
              aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen pb-6' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col space-y-2 pt-4 border-t border-architect-gray-200">
            {navigation.map((item) => (
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

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="flex flex-col space-y-3 pt-4 border-t border-architect-gray-200">
                <Link
                  href="/login"
                  className="px-4 py-3 text-center text-body font-medium text-architect-primary hover:bg-architect-gray-100 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.auth.login}
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-3 bg-architect-gradient-main text-white text-center rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.auth.signup}
                </Link>
              </div>
            )}

            {/* Mobile User Menu */}
            {user && (
              <div className="pt-4 border-t border-architect-gray-200">
                <div className="px-4 py-3 bg-architect-gray-100/50 rounded-lg mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-architect-gradient-main rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-small font-medium text-architect-gray-900">
                        {user.name || user.email}
                      </div>
                      <div className="text-xs text-architect-gray-500">
                        {user.user_type}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link
                  href="/dashboard"
                  className="flex items-center px-4 py-3 text-body font-medium text-architect-gray-700 hover:text-architect-primary hover:bg-architect-gray-100 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4 mr-3" />
                  {t.auth.dashboard}
                </Link>
                
                {user.user_type === 'admin' && (
                  <Link
                    href="/admin"
                    className="flex items-center px-4 py-3 text-body font-medium text-architect-error hover:bg-architect-error/10 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    {t.admin}
                  </Link>
                )}
                
                <button
                  onClick={() => {
                    onLogout?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-3 text-body font-medium text-architect-gray-700 hover:text-architect-error hover:bg-architect-gray-100 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  {t.auth.logout}
                </button>
              </div>
            )}

            {/* Mobile Language Toggle */}
            {onLanguageChange && (
              <div className="pt-4 border-t border-architect-gray-200">
                <button
                  onClick={() => {
                    onLanguageChange(language === 'ko' ? 'en' : 'ko');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full px-4 py-3 text-body font-medium text-architect-gray-700 hover:text-architect-primary hover:bg-architect-gray-100 rounded-lg transition-all duration-200"
                >
                  <Globe className="w-4 h-4 mr-3" />
                  {language === 'ko' ? 'English' : '한국어'}
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ArchitectHeader;