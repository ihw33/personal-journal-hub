import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Menu, 
  X, 
  Globe, 
  User, 
  LogOut, 
  Settings,
  BookOpen,
  MessageCircle,
  BarChart3,
  FileText,
  Shield,
  Users
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export type Language = 'ko' | 'en';
export type Page = 'home' | 'journal' | 'courses' | 'about' | 'methodology' | 'admin' | 'dashboard' | 'auth' | 'beta';

interface HeaderProps {
  language: Language;
  onLanguageToggle: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ 
  language, 
  onLanguageToggle, 
  currentPage,
  onNavigate 
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, getUserType } = useAuth();
  const userType = getUserType();

  const content = {
    ko: {
      home: '홈',
      journal: '저널',
      courses: '강의',
      about: '소개',
      methodology: '방법론',
      beta: '베타 테스트',
      login: '로그인',
      signup: '회원가입',
      dashboard: '대시보드',
      profile: '프로필',
      settings: '설정',
      logout: '로그아웃',
      myLearning: '내 학습',
      aiChat: 'AI 챗봇',
      admin: '관리자',
      adminPanel: '관��자 패널'
    },
    en: {
      home: 'Home',
      journal: 'Journal', 
      courses: 'Courses',
      about: 'About',
      methodology: 'Methodology',
      login: 'Login',
      signup: 'Sign Up',
      dashboard: 'Dashboard',
      profile: 'Profile', 
      settings: 'Settings',
      logout: 'Logout',
      myLearning: 'My Learning',
      aiChat: 'AI Chat',
      admin: 'Admin',
      adminPanel: 'Admin Panel'
    }
  };

  const t = content[language];

  // 사용자 타입별 네비게이션 메뉴
  const getNavigationItems = () => {
    const baseItems = [
      { key: 'home', label: t.home, page: 'home' as Page },
      { key: 'courses', label: t.courses, page: 'courses' as Page },
      { key: 'beta', label: t.beta, page: 'beta' as Page, badge: 'NEW' },
      { key: 'about', label: t.about, page: 'about' as Page }
    ];

    if (userType === 'guest') {
      // 비회원은 기본 메뉴만
      return baseItems;
    }

    if (userType === 'member') {
      // 일반 회원
      return [
        ...baseItems,
        { key: 'dashboard', label: t.myLearning, page: 'dashboard' as Page },
        { key: 'ai-practice', label: t.aiChat, page: 'ai-practice' as Page },
        { key: 'journal', label: t.journal, page: 'journal' as Page }
      ];
    }

    if (userType === 'admin') {
      // 관리자는 모든 기능 접근 가능
      return [
        ...baseItems,
        { key: 'dashboard', label: t.myLearning, page: 'dashboard' as Page },
        { key: 'ai-practice', label: t.aiChat, page: 'ai-practice' as Page },
        { key: 'journal', label: t.journal, page: 'journal' as Page },
        { key: 'admin', label: t.adminPanel, page: 'admin' as Page }
      ];
    }

    return baseItems;
  };

  const handleLogout = async () => {
    try {
      await signOut();
      onNavigate('home');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserDisplayInfo = () => {
    if (userType === 'admin') {
      return {
        name: '관리자',
        email: 'admin@ideaworklab.com',
        role: '관리자',
        roleColor: 'bg-gradient-to-r from-red-500 to-orange-500 text-white',
        RoleIcon: Shield,
        isDemoUser: false
      };
    }

    if (!user) return null;

    return {
      name: user.name || '사용자',
      email: user.email,
      role: '회원',
      roleColor: 'bg-iwl-gradient text-white',
      RoleIcon: User,
      isDemoUser: user.id.startsWith('demo-')
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="text-2xl font-bold text-iwl-gradient">IWL</div>
            <div className="hidden sm:block text-lg font-medium text-gray-900">
              Idea Work Lab
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {getNavigationItems().map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.page)}
                className={`text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentPage === item.page
                    ? 'text-iwl-purple border-b-2 border-iwl-purple pb-1'
                    : 'text-gray-700 hover:text-iwl-purple'
                }`}
              >
                {item.label}
                {item.badge && (
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-0.5">
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLanguageToggle}
              className="text-gray-600 hover:text-iwl-purple"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language.toUpperCase()}
            </Button>

            {/* User Section */}
            {(user || userType === 'admin') && userInfo ? (
              <div className="hidden md:flex items-center space-x-3">
                {/* User Info */}
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {userInfo.name}
                      {userInfo.isDemoUser && (
                        <Badge className="ml-2 text-xs bg-orange-100 text-orange-700">
                          데모
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{userInfo.email}</div>
                  </div>
                  <Badge className={`text-xs ${userInfo.roleColor}`}>
                    <userInfo.RoleIcon className="w-3 h-3 mr-1" />
                    {userInfo.role}
                  </Badge>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate('dashboard')}
                    className="text-gray-600 hover:text-iwl-purple"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('auth')}
                  className="text-gray-700 hover:text-iwl-purple"
                >
                  {t.login}
                </Button>
                <Button
                  onClick={() => onNavigate('auth')}
                  className="bg-iwl-gradient hover:opacity-90 text-white"
                >
                  {t.signup}
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {getNavigationItems().map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                    currentPage === item.page
                      ? 'text-iwl-purple bg-iwl-purple-50'
                      : 'text-gray-700 hover:text-iwl-purple hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-0.5">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}

              <div className="border-t border-gray-200 pt-4 mt-4">
                {user && userInfo ? (
                  <div className="space-y-2">
                    {/* Mobile User Info */}
                    <div className="px-4 py-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm text-gray-900">
                            {userInfo.name}
                            {userInfo.isDemoUser && (
                              <Badge className="ml-2 text-xs bg-orange-100 text-orange-700">
                                데모
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{userInfo.email}</div>
                        </div>
                        <Badge className={`text-xs ${userInfo.roleColor}`}>
                          <userInfo.RoleIcon className="w-3 h-3 mr-1" />
                          {userInfo.role}
                        </Badge>
                      </div>
                    </div>

                    {/* Mobile User Actions */}
                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:text-iwl-purple hover:bg-gray-50"
                    >
                      <BarChart3 className="w-4 h-4 mr-3" />
                      {t.dashboard}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      {t.logout}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        onNavigate('auth');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-iwl-purple hover:bg-gray-50"
                    >
                      {t.login}
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('auth');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-white bg-iwl-gradient hover:opacity-90 rounded-md"
                    >
                      {t.signup}
                    </button>
                  </div>
                )}

                {/* Language Toggle Mobile */}
                <button
                  onClick={() => {
                    onLanguageToggle();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:text-iwl-purple hover:bg-gray-50 border-t border-gray-200 mt-4 pt-4"
                >
                  <Globe className="w-4 h-4 mr-3" />
                  Language: {language.toUpperCase()}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}