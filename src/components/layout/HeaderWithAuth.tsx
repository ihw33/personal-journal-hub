'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/supabase/auth-context';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useDesignMode } from '@/components/design-mode/DesignModeProvider';
import { DesignModeToggle, DesignModeIndicator } from '@/components/design-mode/DesignModeToggle';
import { ThemeSelector } from '@/components/theme/ThemeSelector';
import { 
  User, 
  ChevronDown, 
  LogOut, 
  Settings, 
  BookOpen,
  PenTool,
  Home,
  Menu,
  X,
  Shield
} from 'lucide-react';

export default function HeaderWithAuth() {
  const { user, signOut, userProfile } = useAuth();
  const { currentLevel } = useTheme();
  const { currentMode } = useDesignMode();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      // signOut에서 이미 리다이렉션을 처리하므로 추가 처리 불필요
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const isInstructor = userProfile?.role === 'instructor';
  const isAdmin = userProfile?.role === 'admin';

  return (
    <header 
      className="sticky top-0 z-50 border-b design-mode-transition"
      style={{ 
        backgroundColor: 'var(--iwl-design-surface)', 
        borderColor: 'var(--iwl-design-border)' 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 및 브랜드 */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center design-mode-transition"
                style={{ backgroundColor: 'var(--iwl-design-primary)' }}
              >
                <span className="text-white font-bold text-sm">IWL</span>
              </div>
              <div>
                <h1 
                  className="text-lg font-bold design-mode-transition"
                  style={{ color: 'var(--iwl-design-text)' }}
                >
                  IdeaWork Lab
                </h1>
                <p 
                  className="text-xs design-mode-transition"
                  style={{ color: 'var(--iwl-design-text-muted)' }}
                >
                  v4.0 - {currentMode === 'helena' ? 'Helena' : 'Rio'} 모드
                </p>
              </div>
            </Link>

            {/* 디자인 모드 인디케이터 */}
            <div className="hidden md:block">
              <DesignModeIndicator />
            </div>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-opacity-80"
              style={{ 
                color: 'var(--iwl-design-text)',
                borderRadius: 'var(--iwl-border-radius)'
              }}
            >
              <Home className="w-4 h-4" />
              홈
            </Link>

            <Link
              href="/courses"
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-opacity-80"
              style={{ 
                color: 'var(--iwl-design-text)',
                borderRadius: 'var(--iwl-border-radius)'
              }}
            >
              <BookOpen className="w-4 h-4" />
              코스
            </Link>

            <Link
              href="/journal"
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-opacity-80"
              style={{ 
                color: 'var(--iwl-design-text)',
                borderRadius: 'var(--iwl-border-radius)'
              }}
            >
              <PenTool className="w-4 h-4" />
              저널
            </Link>

            {isInstructor && (
              <Link
                href="/instructor"
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-opacity-80"
                style={{ 
                  color: 'var(--iwl-design-accent)',
                  borderRadius: 'var(--iwl-border-radius)'
                }}
              >
                <BookOpen className="w-4 h-4" />
                강사
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-opacity-80"
                style={{ 
                  color: 'var(--iwl-design-accent)',
                  borderRadius: 'var(--iwl-border-radius)'
                }}
              >
                <Shield className="w-4 h-4" />
                관리자
              </Link>
            )}
          </nav>

          {/* 우측 메뉴 */}
          <div className="flex items-center space-x-3">
            {/* 디자인 모드 토글 */}
            <div className="hidden md:block">
              <DesignModeToggle />
            </div>

            {/* 테마 선택기 */}
            <div className="hidden md:block">
              <ThemeSelector />
            </div>

            {user ? (
              /* 로그인된 사용자 메뉴 */
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-opacity-80"
                  style={{ 
                    backgroundColor: showUserMenu ? 'var(--iwl-design-surface-elevated)' : 'transparent',
                    borderRadius: 'var(--iwl-border-radius)'
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                    style={{ 
                      backgroundColor: 'var(--iwl-design-primary)',
                      color: 'white'
                    }}
                  >
                    {user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span 
                    className="hidden sm:block text-sm font-medium"
                    style={{ color: 'var(--iwl-design-text)' }}
                  >
                    {userProfile?.full_name || user.email}
                  </span>
                  <ChevronDown className="w-4 h-4" style={{ color: 'var(--iwl-design-text-muted)' }} />
                </button>

                {/* 드롭다운 메뉴 */}
                {showUserMenu && (
                  <div 
                    className="absolute right-0 mt-2 w-56 py-2 shadow-lg border design-mode-transition z-50"
                    style={{ 
                      backgroundColor: 'var(--iwl-design-surface)',
                      borderColor: 'var(--iwl-design-border)',
                      borderRadius: 'var(--iwl-border-radius)',
                      boxShadow: 'var(--iwl-shadow)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--iwl-design-border)' }}>
                      <p 
                        className="text-sm font-medium"
                        style={{ color: 'var(--iwl-design-text)' }}
                      >
                        {userProfile?.full_name || '사용자'}
                      </p>
                      <p 
                        className="text-xs"
                        style={{ color: 'var(--iwl-design-text-muted)' }}
                      >
                        {user.email} • {currentLevel} 레벨
                      </p>
                    </div>

                    <Link
                      href="/member/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-opacity-80 transition-colors"
                      style={{ color: 'var(--iwl-design-text)' }}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      대시보드
                    </Link>

                    <Link
                      href="/member/account"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-opacity-80 transition-colors"
                      style={{ color: 'var(--iwl-design-text)' }}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      계정 설정
                    </Link>

                    <div className="border-t mt-2 pt-2" style={{ borderColor: 'var(--iwl-design-border)' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSignOut();
                        }}
                        className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm hover:bg-opacity-80 transition-colors"
                        style={{ color: 'var(--iwl-design-text)' }}
                      >
                        <LogOut className="w-4 h-4" />
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* 로그인하지 않은 사용자 메뉴 */
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-opacity-80"
                  style={{ 
                    color: 'var(--iwl-design-text)',
                    borderRadius: 'var(--iwl-border-radius)'
                  }}
                >
                  로그인
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-opacity-90"
                  style={{ 
                    backgroundColor: 'var(--iwl-design-primary)',
                    color: 'white',
                    borderRadius: 'var(--iwl-border-radius)'
                  }}
                >
                  회원가입
                </Link>
              </div>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'var(--iwl-design-text)' }}
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {showMobileMenu && (
          <div 
            className="md:hidden mt-2 py-4 border-t design-mode-transition"
            style={{ borderColor: 'var(--iwl-design-border)' }}
          >
            <div className="space-y-2">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ color: 'var(--iwl-design-text)' }}
                onClick={() => setShowMobileMenu(false)}
              >
                <Home className="w-4 h-4" />
                홈
              </Link>
              
              <Link
                href="/courses"
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ color: 'var(--iwl-design-text)' }}
                onClick={() => setShowMobileMenu(false)}
              >
                <BookOpen className="w-4 h-4" />
                코스
              </Link>

              <Link
                href="/journal"
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ color: 'var(--iwl-design-text)' }}
                onClick={() => setShowMobileMenu(false)}
              >
                <PenTool className="w-4 h-4" />
                저널
              </Link>

              {/* 모바일 디자인 모드 토글 */}
              <div className="px-3 py-2">
                <DesignModeToggle />
              </div>

              {/* 모바일 테마 선택기 */}
              <div className="px-3 py-2">
                <ThemeSelector />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 배경 클릭으로 메뉴 닫기 */}
      {(showUserMenu || showMobileMenu) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </header>
  );
}