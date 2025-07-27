'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu, LogIn, Globe } from 'lucide-react';

interface HeaderProps {
  language: 'ko' | 'en';
  onLanguageToggle: () => void;
}

export function HeaderV05({ language, onLanguageToggle }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
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
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-iwl-gradient rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">iWL</span>
            </div>
            <span className="text-xl text-gray-800 hidden sm:block">Idea Work Lab</span>
          </Link>
          
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
            <Link
              key={item.name}
              href={item.href}
              className={`text-gray-600 hover:text-iwl-purple transition-colors ${
                pathname === item.href ? 'text-iwl-purple font-medium' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/auth">
            <Button variant="ghost" className="text-gray-600 hover:text-iwl-purple">
              <LogIn className="w-4 h-4 mr-2" />
              {t.login}
            </Button>
          </Link>
          <Link href="/course">
            <Button className="bg-iwl-gradient hover:opacity-90 text-white">
              {t.getStarted}
            </Button>
          </Link>
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
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg transition-colors py-2 text-left ${
                      pathname === item.href ? 'text-iwl-purple font-medium' : 'text-gray-600 hover:text-iwl-purple'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <hr className="my-4" />
                <Link href="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="justify-start text-gray-600 hover:text-iwl-purple w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    {t.login}
                  </Button>
                </Link>
                <Link href="/course" onClick={() => setIsOpen(false)}>
                  <Button className="bg-iwl-gradient hover:opacity-90 text-white w-full">
                    {t.getStarted}
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}