'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface JournalEditorProps {
  onCancel: () => void
  onSave: () => void
  existingJournal?: {
    id: string
    title: string
    content: string
    category: string
    published: boolean
  }
}

export default function JournalEditor({ onCancel, onSave, existingJournal }: JournalEditorProps) {
  const [title, setTitle] = useState(existingJournal?.title || '')
  const [content, setContent] = useState(existingJournal?.content || '')
  const [category, setCategory] = useState(existingJournal?.category || '일상')
  const [published, setPublished] = useState(existingJournal?.published || false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const journalData = {
        title,
        content,
        category,
        published,
        user_id: '00000000-0000-0000-0000-000000000000', // 관리자 고정 ID
      }

      if (existingJournal) {
        // 기존 글 수정
        const { error } = await supabase
          .from('journals')
          .update(journalData)
          .eq('id', existingJournal.id)

        if (error) throw error
      } else {
        // 새 글 작성
        const { error } = await supabase
          .from('journals')
          .insert([journalData])

        if (error) throw error
      }

      onSave()
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
            내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="저널 내용을 작성하세요..."
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
            바로 발행하기 (체크하지 않으면 임시저장)
          </label>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
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