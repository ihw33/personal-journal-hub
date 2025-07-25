'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu, BookOpen, User, LogIn, Globe } from 'lucide-react';

interface HeaderProps {
  language: 'ko' | 'en';
  onLanguageToggle: () => void;
  currentPage?: string;
  onNavigate?: (page: 'home' | 'signup' | 'journal' | 'courses' | 'about') => void;
}

export function HeaderV05({ language, onLanguageToggle, currentPage, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    ko: {
      navigation: [
        { name: '홈', href: '/' },
        { name: '저널', href: '/journal' },
        { name: '강의', href: '/courses' },
        { name: '소개', href: '/about' },
      ],
      login: '로그인',
      getStarted: '시작하기'
    },
    en: {
      navigation: [
        { name: 'Home', href: '/' },
        { name: 'Journal', href: '/journal' },
        { name: 'Courses', href: '/courses' },
        { name: 'About', href: '/about' },
      ],
      login: 'Login',
      getStarted: 'Get Started'
    }
  };

  const t = content[language];
  const navigation = t.navigation;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo + Language Toggle */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate?.('home')}>
            <div className="w-8 h-8 bg-iwl-gradient rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">iWL</span>
            </div>
            <span className="text-xl text-gray-800 hidden sm:block">Idea Work Lab</span>
          </div>
          
          {/* Language Toggle Button */}
          <Button
            onClick={onLanguageToggle}
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-sm"
          >
            <Globe className="w-4 h-4 mr-2" />
            {language === 'ko' ? 'EN' : '한국어'}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => onNavigate?.(item.href.replace('/', '') as 'home' | 'journal' | 'courses' | 'about' || 'home')}
              className={`text-gray-600 hover:text-iwl-purple transition-colors ${
                currentPage === (item.href.replace('/', '') || 'home') ? 'text-iwl-purple' : ''
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-600 hover:text-iwl-purple">
            <LogIn className="w-4 h-4 mr-2" />
            {t.login}
          </Button>
          <Button 
            className="bg-iwl-gradient hover:opacity-90 text-white"
            onClick={() => onNavigate?.('signup')}
          >
            {t.getStarted}
          </Button>
        </div>

        {/* Mobile Menu + Language Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* Mobile Language Toggle */}
          <Button
            onClick={onLanguageToggle}
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-sm"
          >
            <Globe className="w-4 h-4" />
            <span className="ml-1 text-xs">{language === 'ko' ? 'EN' : '한국어'}</span>
          </Button>
          
          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>{language === 'ko' ? '메뉴' : 'Menu'}</SheetTitle>
                <SheetDescription>
                  {language === 'ko' ? '사이트 메뉴를 선택하세요' : 'Choose from the site menu'}
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      onNavigate?.(item.href.replace('/', '') as 'home' | 'journal' | 'courses' | 'about' || 'home');
                      setIsOpen(false);
                    }}
                    className="text-lg text-gray-600 hover:text-iwl-purple transition-colors py-2 text-left"
                  >
                    {item.name}
                  </button>
                ))}
                <hr className="my-4" />
                <Button variant="ghost" className="justify-start text-gray-600 hover:text-iwl-purple">
                  <LogIn className="w-4 h-4 mr-2" />
                  {t.login}
                </Button>
                <Button 
                  className="bg-iwl-gradient hover:opacity-90 text-white"
                  onClick={() => {
                    onNavigate?.('signup');
                    setIsOpen(false);
                  }}
                >
                  {t.getStarted}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}