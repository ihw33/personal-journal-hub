import React, { useMemo } from 'react';
import { Button } from './ui/button';

interface CommonNavigationProps {
  userLevel?: 'guest' | 'junior' | 'youth' | 'adult' | 'instructor' | 'admin';
  onNavigate: (page: string) => void;
  currentPage?: string;
  pageTitle?: string;
  pageIcon?: string;
}

export const CommonNavigation: React.FC<CommonNavigationProps> = ({
  userLevel = 'guest',
  onNavigate,
  currentPage = '',
  pageTitle = '',
  pageIcon = '📚'
}) => {
  // Adaptive configuration based on user level
  const adaptiveConfig = useMemo(() => {
    const configs = {
      guest: {
        theme: 'discovery',
        colors: {
          primary: '#4285f4',
          gradient: 'from-blue-400 via-blue-500 to-green-400',
          bg: 'bg-gradient-to-br from-blue-50 via-white to-green-50',
          accent: 'blue'
        }
      },
      junior: {
        theme: 'playful',
        colors: {
          primary: '#ff6b6b',
          gradient: 'from-pink-400 via-red-400 to-orange-400',
          bg: 'bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50',
          accent: 'pink'
        }
      },
      youth: {
        theme: 'energetic',
        colors: {
          primary: '#667eea',
          gradient: 'from-indigo-500 via-purple-500 to-pink-500',
          bg: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50',
          accent: 'purple'
        }
      },
      adult: {
        theme: 'professional',
        colors: {
          primary: '#1a237e',
          gradient: 'from-blue-900 via-blue-800 to-blue-700',
          bg: 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50',
          accent: 'blue'
        }
      },
      instructor: {
        theme: 'educator',
        colors: {
          primary: '#2e7d32',
          gradient: 'from-green-600 via-green-500 to-blue-600',
          bg: 'bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50',
          accent: 'green'
        }
      },
      admin: {
        theme: 'system',
        colors: {
          primary: '#455a64',
          gradient: 'from-gray-600 via-blue-600 to-indigo-600',
          bg: 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50',
          accent: 'gray'
        }
      }
    };
    return configs[userLevel] || configs.guest;
  }, [userLevel]);

  const getNavigationItems = () => {
    let items = [];

    // 사용자 레벨별 메뉴 구성
    switch (userLevel) {
      case 'junior':
        items = [
          { key: 'home', label: '놀이터', icon: '🎮' },
          { key: 'helena-rio-journal', label: '일기장', icon: '📝' },
          { key: 'helena-rio-learning', label: '수업', icon: '🎨' },
          { key: 'helena-rio-community', label: '친구들', icon: '👫' }
        ];
        break;
      
      case 'youth':
        items = [
          { key: 'home', label: '홈', icon: '🏠' },
          { key: 'helena-rio-journal', label: '저널', icon: '📝' },
          { key: 'helena-rio-learning', label: '학습', icon: '📚' },
          { key: 'helena-rio-community', label: '커뮤니티', icon: '👥' },
          { key: 'helena-rio-courses', label: '코스', icon: '🎯' }
        ];
        break;
      
      case 'adult':
        items = [
          { key: 'home', label: '홈', icon: '🏠' },
          { key: 'helena-rio-journal', label: '저널', icon: '📝' },
          { key: 'helena-rio-learning', label: '학습', icon: '📚' },
          { key: 'helena-rio-courses', label: '코스', icon: '🎯' },
          { key: 'helena-rio-community', label: '커뮤니티', icon: '👥' },
          { key: 'helena-rio-dashboard', label: '진도', icon: '📊' }
        ];
        break;
      
      case 'instructor':
        items = [
          { key: 'home', label: '홈', icon: '🏠' },
          { key: 'helena-rio-courses', label: '코스 관리', icon: '🎯' },
          { key: 'helena-rio-community', label: '커뮤니티', icon: '👥' },
          { key: 'helena-rio-dashboard', label: '강사 대시보드', icon: '📊' },
          { key: 'helena-rio-admin', label: '관리', icon: '⚙️' }
        ];
        break;
      
      case 'admin':
        items = [
          { key: 'home', label: '홈', icon: '🏠' },
          { key: 'helena-rio-courses', label: '코스 관리', icon: '🎯' },
          { key: 'helena-rio-community', label: '커뮤니티', icon: '👥' },
          { key: 'helena-rio-admin', label: '관리자', icon: '⚙️' }
        ];
        break;
      
      default: // guest
        items = [
          { key: 'home', label: '홈', icon: '🏠' },
          { key: 'helena-rio-about', label: '소개', icon: '🌟' },
          { key: 'helena-rio-courses', label: '코스', icon: '📚' }
        ];
    }

    // 디자인 철학 페이지는 모든 사용자에게 표시 (마지막에 추가)
    items.push({ key: 'design-concept', label: '철학', icon: '🎨' });

    return items;
  };

  const getPageIcon = () => {
    const iconMap: { [key: string]: string } = {
      'helena-rio-journal': '📝',
      'helena-rio-learning': '📚',
      'helena-rio-community': '👥',
      'helena-rio-about': '🌟',
      'helena-rio-admin': '⚙️',
      'design-concept': '🎨',
      'journal': '📖',
      'courses': '🎓',
      'dashboard': '📊'
    };
    return iconMap[currentPage] || pageIcon;
  };

  const getPageTitle = () => {
    if (pageTitle) return pageTitle;
    
    const titleMap: { [key: string]: string } = {
      'helena-rio-journal': userLevel === 'junior' ? '내 생각 일기장' : userLevel === 'youth' ? '사고력 저널' : '생각정리 저널',
      'helena-rio-learning': userLevel === 'junior' ? '재미있는 수업' : userLevel === 'youth' ? '도전 수업' : '학습 프로그램',
      'helena-rio-community': userLevel === 'junior' ? '친구들과 함께' : userLevel === 'youth' ? '학습 커뮤니티' : '학습자 커뮤니티',
      'helena-rio-about': 'Idea Work Lab 소개',
      'helena-rio-admin': '관리 패널',
      'design-concept': 'Design Philosophy',
      'journal': '저널',
      'courses': '강의',
      'dashboard': '대시보드'
    };
    return titleMap[currentPage] || 'Idea Work Lab';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* User Level Logo */}
            {userLevel === 'junior' ? (
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-orange-400 rounded-2xl flex items-center justify-center">
                <span className="text-white text-lg">{getPageIcon()}</span>
              </div>
            ) : userLevel === 'youth' ? (
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">{getPageIcon()}</span>
              </div>
            ) : userLevel === 'instructor' ? (
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">{getPageIcon()}</span>
              </div>
            ) : userLevel === 'admin' ? (
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">{getPageIcon()}</span>
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">{getPageIcon()}</span>
              </div>
            )}
            <div>
              <h1 className={`font-bold bg-gradient-to-r ${adaptiveConfig.colors.gradient} bg-clip-text text-transparent text-lg`}>
                {getPageTitle()}
              </h1>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <div className="flex items-center space-x-2">
            {getNavigationItems().map((item) => (
              <Button
                key={item.key}
                variant={currentPage === item.key ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.key)}
                className={`flex items-center space-x-2 ${
                  currentPage === item.key 
                    ? `bg-gradient-to-r ${adaptiveConfig.colors.gradient} text-white hover:opacity-90` 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};