import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Idea Work Lab",
  description: "아이디어가 현실이 되는 창작 공간 - 개발, 디자인, 창작 프로젝트의 허브",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="font-semibold">Idea Work Lab</h3>
                <p className="text-gray-400 text-sm">아이디어가 현실이 되는 창작 공간</p>
              </div>
              <div className="flex gap-6 text-sm">
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                  소개
                </a>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  개인정보처리방침
                </a>
                <Link href="/journal" className="text-gray-400 hover:text-white transition-colors">
                  저널
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Idea Work Lab. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
