'use client';

import React from 'react';

const Footer: React.FC = React.memo(() => {
  return (
    <footer className="bg-architect-gray-900 text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-architect-accent to-architect-ai-primary bg-clip-text text-transparent mb-4">
            IWL
          </div>
          <p className="text-architect-gray-300 mb-8">
            AI와 함께하는 새로운 생각정리
          </p>
          <div className="flex justify-center space-x-6 text-sm text-architect-gray-400">
            <span>© 2025 Idea Work Lab</span>
            <span>•</span>
            <span>개인정보처리방침</span>
            <span>•</span>
            <span>이용약관</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;