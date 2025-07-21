'use client';

import { marked } from 'marked';

interface JournalContentProps {
  journal: {
    id: string;
    title: string;
    content: string;
    category: string;
    published_at?: string;
    created_at: string;
  };
}

export default function JournalContent({ journal }: JournalContentProps) {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = journal.title;
    
    switch (platform) {
      case 'copy':
        if (navigator.share) {
          navigator.share({ title, url });
        } else {
          navigator.clipboard.writeText(url);
          alert('링크가 클립보드에 복사되었습니다!');
        }
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div 
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
        dangerouslySetInnerHTML={{ __html: marked(journal.content) }}
      />
      
      {/* 공유 버튼 */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">이 글 공유하기</h3>
        <div className="flex gap-4">
          <button
            onClick={() => handleShare('copy')}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
          >
            🔗 링크 복사
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            🐦 트위터
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            📘 페이스북
          </button>
        </div>
      </div>
    </div>
  );
}