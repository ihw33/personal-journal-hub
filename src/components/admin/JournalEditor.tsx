'use client'

import { useState } from 'react'
import { marked } from 'marked'

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

interface JournalEditorProps {
  onCancel: () => void
  onSave: () => void
  existingJournal?: {
    id: string
    title: string
    content: string
    excerpt: string
    category: string
    status: string
    published_at: string
    user_id: string
    created_at: string
    updated_at: string
  }
}

export default function JournalEditor({ onCancel, onSave, existingJournal }: JournalEditorProps) {
  
  const [title, setTitle] = useState(existingJournal?.title || '')
  const [content, setContent] = useState(existingJournal?.content || '')
  const [excerpt, setExcerpt] = useState(existingJournal?.excerpt || '')
  const [category, setCategory] = useState(existingJournal?.category || '일상')
  const [status, setStatus] = useState(existingJournal?.status || 'draft')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [saveStatus, setSaveStatus] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [linkText, setLinkText] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [showYouTubeModal, setShowYouTubeModal] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState('')

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    setUploadProgress(0)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '이미지 업로드에 실패했습니다.')
      }

      const result = await response.json()
      
      // 마크다운 이미지 문법으로 텍스트에 삽입
      const imageMarkdown = `![${result.originalName}](${result.url})`
      setContent(prev => prev + '\n\n' + imageMarkdown + '\n\n')
      
      setUploadProgress(100)
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
      }, 1000)

    } catch (err) {
      setError(err instanceof Error ? err.message : '이미지 업로드 중 오류가 발생했습니다.')
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
    // input 초기화
    e.target.value = ''
  }

  const insertLink = () => {
    if (linkText && linkUrl) {
      const linkMarkdown = `[${linkText}](${linkUrl})`
      setContent(prev => prev + linkMarkdown)
      setLinkText('')
      setLinkUrl('')
      setShowLinkModal(false)
    }
  }

  const insertYouTubeLink = () => {
    if (youtubeUrl) {
      setContent(prev => prev + '\n\n' + youtubeUrl + '\n\n')
      setYoutubeUrl('')
      setShowYouTubeModal(false)
    }
  }

  const insertMarkdownSyntax = (syntax: string, placeholder: string = '') => {
    const textarea = document.querySelector('textarea[rows="15"]') as HTMLTextAreaElement | null
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = content.substring(start, end)
      const replacement = selectedText || placeholder
      
      let newText = ''
      if (syntax === 'bold') {
        newText = `**${replacement}**`
      } else if (syntax === 'italic') {
        newText = `*${replacement}*`
      } else if (syntax === 'heading') {
        newText = `## ${replacement}`
      } else if (syntax === 'code') {
        newText = `\`${replacement}\``
      } else if (syntax === 'codeblock') {
        newText = `\`\`\`\n${replacement}\n\`\`\``
      } else if (syntax === 'quote') {
        newText = `> ${replacement}`
      } else if (syntax === 'list') {
        newText = `- ${replacement}`
      }
      
      const newContent = content.substring(0, start) + newText + content.substring(end)
      setContent(newContent)
      
      // 커서 위치 재설정
      setTimeout(() => {
        textarea.focus()
        const newCursorPos = start + newText.length
        textarea.setSelectionRange(newCursorPos, newCursorPos)
      }, 0)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')


    try {
      const journalData = {
        title,
        content,
        excerpt: excerpt || content.slice(0, 120) + '...',
        category,
        status
      }

      if (existingJournal && existingJournal.id) {
        // 기존 글 수정 - API 라우트 사용
        const response = await fetch(`/api/journals/${existingJournal.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(journalData)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || '수정 중 오류가 발생했습니다.')
        }

        setSaveStatus('수정 완료!')
      } else {
        // 새 글 작성 - API 라우트 사용
        console.log('=== CLIENT: Sending POST request ===')
        console.log('Journal data to send:', journalData)
        
        const response = await fetch('/api/journals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(journalData)
        })

        console.log('=== CLIENT: Response received ===')
        console.log('Response status:', response.status)
        console.log('Response ok:', response.ok)

        if (!response.ok) {
          const errorData = await response.json()
          console.log('=== CLIENT: Error response data ===', errorData)
          throw new Error(errorData.error || '저장 중 오류가 발생했습니다.')
        }

        const result = await response.json()
        console.log('=== CLIENT: Success response data ===', result)
        setSaveStatus(result.message || '저장 완료!')
      }

      setTimeout(() => {
        onSave()
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {existingJournal ? '저널 편집' : '새 저널 작성'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="저널 제목을 입력하세요"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="일상">일상</option>
            <option value="생각">생각</option>
            <option value="여행">여행</option>
            <option value="독서">독서</option>
            <option value="개발">개발</option>
            <option value="공지">공지</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            요약 (선택사항)
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="저널 미리보기용 요약을 입력하세요 (비어있으면 자동 생성)"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              내용 (마크다운 지원)
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className={`px-3 py-1 text-sm rounded ${!showPreview ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-800'}`}
              >
                편집
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className={`px-3 py-1 text-sm rounded ${showPreview ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-800'}`}
              >
                미리보기
              </button>
            </div>
          </div>
          
          {showPreview ? (
            <div className="w-full min-h-[400px] px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 prose max-w-none prose-img:rounded-lg prose-img:shadow-lg prose-img:max-w-full prose-img:h-auto">
              <div dangerouslySetInnerHTML={{ __html: processYouTubeLinks(marked(content) as string) }} />
            </div>
          ) : (
            <div>
              {/* 편집 툴바 */}
              <div className="border border-gray-300 border-b-0 rounded-t-lg bg-gray-50 px-3 py-2 flex flex-wrap gap-2">
                {/* 텍스트 서식 */}
                <button
                  type="button"
                  onClick={() => insertMarkdownSyntax('bold', '굵은 글씨')}
                  className="px-2 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                  title="굵게 (Ctrl+B)"
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdownSyntax('italic', '기울임')}
                  className="px-2 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors italic"
                  title="기울임 (Ctrl+I)"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdownSyntax('heading', '제목')}
                  className="px-2 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors font-bold"
                  title="제목"
                >
                  H
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                
                {/* 코드 */}
                <button
                  type="button"
                  onClick={() => insertMarkdownSyntax('code', '코드')}
                  className="px-2 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors font-mono"
                  title="인라인 코드"
                >
                  &lt;/&gt;
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdownSyntax('codeblock', '코드 블록')}
                  className="px-2 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                  title="코드 블록"
                >
                  { }
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                
                {/* 목록과 인용 */}
                <button
                  type="button"
                  onClick={() => insertMarkdownSyntax('list', '목록 항목')}
                  className="px-2 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                  title="목록"
                >
                  •
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdownSyntax('quote', '인용문')}
                  className="px-2 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                  title="인용"
                >
                  &quot;
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                
                {/* 링크 */}
                <button
                  type="button"
                  onClick={() => setShowLinkModal(true)}
                  className="px-2 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                  title="링크 삽입"
                >
                  🔗
                </button>
                
                {/* 유튜브 */}
                <button
                  type="button"
                  onClick={() => setShowYouTubeModal(true)}
                  className="px-2 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                  title="유튜브 동영상 삽입"
                >
                  📹
                </button>
                
                {/* 이미지 업로드 */}
                <label className="px-2 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  📷
                </label>
                
                {/* 업로드 상태 */}
                {uploading && (
                  <div className="flex items-center gap-2 ml-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">업로드 중...</span>
                  </div>
                )}
              </div>
              
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical font-mono"
                placeholder="저널 내용을 작성하세요... 위의 도구를 사용하여 텍스트를 꾸밀 수 있습니다."
                required
              />
            </div>
          )}
          
          <div className="mt-2 text-xs text-gray-500">
            💡 마크다운 문법을 사용할 수 있습니다. 미리보기 탭에서 결과를 확인하세요.
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            발행 상태
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="draft">임시저장</option>
            <option value="review">검토 대기</option>
            <option value="published">발행됨</option>
            <option value="private">비공개</option>
            <option value="archived">보관됨</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {saveStatus && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {saveStatus}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? '저장 중...' : '저장'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            취소
          </button>
        </div>
      </form>

      {/* 링크 삽입 모달 */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">링크 삽입</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    링크 텍스트
                  </label>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="표시될 텍스트를 입력하세요"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowLinkModal(false)
                    setLinkText('')
                    setLinkUrl('')
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={insertLink}
                  disabled={!linkText || !linkUrl}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                >
                  삽입
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 유튜브 링크 삽입 모달 */}
      {showYouTubeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">유튜브 동영상 삽입</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    유튜브 URL
                  </label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.youtube.com/watch?v=..."
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    유튜브 URL을 입력하면 자동으로 임베드 형태로 표시됩니다.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowYouTubeModal(false)
                    setYoutubeUrl('')
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={insertYouTubeLink}
                  disabled={!youtubeUrl}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors"
                >
                  삽입
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}