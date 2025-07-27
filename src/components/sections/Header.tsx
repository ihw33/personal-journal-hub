import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Menu, Globe, Map, ChevronDown } from 'lucide-react';

export type Language = 'ko' | 'en';
export type Page = string;

interface HeaderProps {
  language: Language;
  onLanguageToggle: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ language, onLanguageToggle, currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const content = {
    ko: {
      nav: {
        journal: '저널',
        courses: '강의',
        about: '소개',
        methodology: '방법론'
      },
      sitemap: '사이트맵',
      mobileMenu: '모바일 메뉴',
      closeMobileMenu: '메뉴 닫기'
    },
    en: {
      nav: {
        journal: 'Journal',
        courses: 'Courses', 
        about: 'About',
        methodology: 'Methodology'
      },
      sitemap: 'Sitemap',
      mobileMenu: 'Mobile Menu',
      closeMobileMenu: 'Close Menu'
    }
  };

  const t = content[language];

  const navigationItems = [
    { id: 'journal', label: t.nav.journal },
    { id: 'courses', label: t.nav.courses },
    { id: 'about', label: t.nav.about },
    { id: 'methodology', label: t.nav.methodology }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-xl font-bold hover:opacity-80 transition-opacity"
          >
            <div className="text-iwl-gradient">IWL</div>
            <span className="text-gray-900">Idea Work Lab</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors hover:text-iwl-purple ${
                  currentPage === item.id ? 'text-iwl-purple' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Sitemap Button - Desktop */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('sitemap')}
              className="hidden md:flex items-center gap-2 border-iwl-purple/20 text-iwl-purple hover:bg-iwl-purple hover:text-white"
            >
              <Map className="w-4 h-4" />
              <span className="hidden lg:inline">{t.sitemap}</span>
            </Button>

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={onLanguageToggle}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ko' ? 'EN' : '한국어'}</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">{t.mobileMenu}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="text-iwl-gradient">IWL</div>
                    <span>Menu</span>
                  </SheetTitle>
                  <SheetDescription>
                    Navigate through Idea Work Lab
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {/* Navigation Items */}
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        currentPage === item.id 
                          ? 'bg-iwl-purple text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  {/* Mobile Divider */}
                  <div className="border-t border-gray-200 my-4"></div>
                  
                  {/* Sitemap Button - Mobile */}
                  <button
                    onClick={() => {
                      onNavigate('sitemap');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg font-medium text-iwl-purple hover:bg-iwl-purple-50 flex items-center gap-2"
                  >
                    <Map className="w-4 h-4" />
                    {t.sitemap}
                  </button>

                  {/* Language Toggle - Mobile */}
                  <button
                    onClick={() => {
                      onLanguageToggle();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    {language === 'ko' ? 'English' : '한국어'}
                  </button>
                </div>

                {/* Mobile Menu Footer */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-xs text-gray-500 text-center">
                    Idea Work Lab v2024
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}