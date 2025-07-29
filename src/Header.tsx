import React, { useState } from 'react';
import { Button } from './ui/button';
import { 
  Menu, 
  X, 
  Globe, 
  User, 
  LogOut,
  BookOpen,
  MessageCircle,
  Info,
  HelpCircle
} from 'lucide-react';

interface HeaderProps {
  user: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  language: 'ko' | 'en';
  onLanguageChange: (lang: 'ko' | 'en') => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onNavigate,
  onLogout,
  language,
  onLanguageChange
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const content = {
    ko: {
      nav: {
        about: '소개',
        courses: '강의',
        journal: '저널',
        aiPractice: 'AI 실습',
        help: '도움말'
      },
      auth: {
        login: '로그인',
        signup: '회원가입',
        logout: '로그아웃',
        profile: '프로필',
        dashboard: '대시보드'
      },
      admin: '관리자'
    },
    en: {
      nav: {
        about: 'About',
        courses: 'Courses',
        journal: 'Journal',
        aiPractice: 'AI Practice',
        help: 'Help'
      },
      auth: {
        login: 'Login',
        signup: 'Sign Up',
        logout: 'Logout',
        profile: 'Profile',
        dashboard: 'Dashboard'
      },
      admin: 'Admin'
    }
  };

  const t = content[language];

  const navigation = [
    { name: t.nav.about, page: 'about', icon: Info },
    { name: t.nav.courses, page: 'courses', icon: BookOpen },
    { name: t.nav.journal, page: 'journal', icon: BookOpen },
    { name: t.nav.aiPractice, page: 'ai-practice', icon: MessageCircle },
    { name: t.nav.help, page: 'help', icon: HelpCircle }
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="text-2xl font-bold text-iwl-gradient">
              IWL
            </div>
            <div className="ml-2 hidden md:block">
              <span className="text-gray-800 font-medium">Idea Work Lab</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="text-gray-600 hover:text-iwl-purple transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={() => onLanguageChange(language === 'ko' ? 'en' : 'ko')}
              className="p-2 text-gray-600 hover:text-iwl-purple transition-colors"
              title={language === 'ko' ? 'English' : '한국어'}
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-sm font-medium">
                {language === 'ko' ? 'EN' : '한'}
              </span>
            </button>

            {/* User Menu or Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-iwl-gradient rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user.name || user.email}
                  </span>
                  {user.user_type === 'admin' && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {t.admin}
                    </span>
                  )}
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t.auth.dashboard}
                    </button>
                    {user.user_type === 'admin' && (
                      <button
                        onClick={() => {
                          onNavigate('admin-dashboard');
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t.admin}
                      </button>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        onLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t.auth.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => onNavigate('auth')}
                  className="border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white"
                >
                  {t.auth.login}
                </Button>
                <Button
                  onClick={() => onNavigate('signup')}
                  className="bg-iwl-gradient hover:opacity-90 text-white"
                >
                  {t.auth.signup}
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-iwl-purple"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-gray-600 hover:text-iwl-purple hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              ))}

              {/* Mobile Auth Buttons */}
              {!user && (
                <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      onNavigate('auth');
                      setIsMenuOpen(false);
                    }}
                    className="w-full border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white"
                  >
                    {t.auth.login}
                  </Button>
                  <Button
                    onClick={() => {
                      onNavigate('signup');
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-iwl-gradient hover:opacity-90 text-white"
                  >
                    {t.auth.signup}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

