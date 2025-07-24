'use client';

import { marked } from 'marked';

// 유튜브 URL을 임베드로 변환하는 함수
const processYouTubeLinks = (html: string) => {
  // 이미 iframe이 있는 HTML인지 확인 (중복 처리 방지)
  if (html.includes('youtube.com/embed/') || html.includes('youtube-embed')) {
    return html;
  }
  
  // 유튜브 비디오 ID 추출 함수
  const extractVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };
  
  // 유튜브 iframe 생성 함수
  const createYouTubeEmbed = (videoId: string) => {
    return `
      <div class="youtube-embed my-6">
        <div class="relative w-full" style="padding-bottom: 56.25%; height: 0;">
          <iframe
            class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/${videoId}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    `;
  };
  
  let processedHtml = html;
  
  // 1. 먼저 <a> 태그로 감싸진 유튜브 링크 처리
  processedHtml = processedHtml.replace(
    /<a[^>]*href=["']((?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)[^"']*)["'][^>]*>[^<]*<\/a>/gi,
    (match, url) => {
      const videoId = extractVideoId(url);
      return videoId ? createYouTubeEmbed(videoId) : match;
    }
  );
  
  // 2. 그 다음 일반 유튜브 URL 처리 (줄 시작, 공백 후, 또는 <p> 태그 내부)
  processedHtml = processedHtml.replace(
    /(^|\s|<p[^>]*>)((?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)[^\s<]+)/gi,
    (match, prefix, url) => {
      const videoId = extractVideoId(url);
      return videoId ? prefix + createYouTubeEmbed(videoId) : match;
    }
  );
  
  return processedHtml;
};

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

  // 마크다운을 HTML로 변환하고 유튜브 링크를 임베드로 처리
  const processedContent = processYouTubeLinks(marked(journal.content) as string);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div 
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-img:rounded-lg prose-img:shadow-lg prose-img:max-w-full prose-img:h-auto"
        dangerouslySetInnerHTML={{ __html: processedContent }}
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