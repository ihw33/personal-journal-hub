'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { marked } from 'marked'

interface JournalEditorProps {
  onCancel: () => void
  onSave: () => void
  existingJournal?: {
    id: string
    title: string
    content: string
    excerpt?: string
    category: string
    status: string
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const journalData = {
        title,
        content,
        excerpt: excerpt || content.slice(0, 120) + '...', // 자동 요약 생성
        category,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null,
        user_id: '00000000-0000-0000-0000-000000000000', // 관리자 고정 ID
      }

      if (existingJournal) {
        // 기존 글 수정
        const { error } = await supabase
          .from('journals')
          .update(journalData)
          .eq('id', existingJournal.id)

        if (error) throw error
        setSaveStatus('수정 완료!')
      } else {
        // 새 글 작성
        const { error } = await supabase
          .from('journals')
          .insert([journalData])

        if (error) throw error
        setSaveStatus('저장 완료!')
      }

      setTimeout(() => {
        onSave()
      }, 1000)
    } catch (err: any) {
      setError(err.message || '저장 중 오류가 발생했습니다.')
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
            <div className="w-full min-h-[400px] px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical font-mono"
              placeholder="저널 내용을 작성하세요... (마크다운 문법 사용 가능)

# 제목
## 부제목
**굵은 글씨**
*기울임*
- 목록 항목
[링크](http://example.com)"
              required
            />
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
    </div>
  )
}