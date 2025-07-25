'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Search, Filter, Calendar, Clock, Eye, Heart, MessageCircle, BookOpen } from 'lucide-react'

interface Journal {
  id: string
  title: string
  content: string
  excerpt?: string
  category: string
  created_at: string
  updated_at?: string
  published_at?: string
  status?: string
}

export default function JournalPage() {
  const [journals, setJournals] = useState<Journal[]>([])
  const [filteredJournals, setFilteredJournals] = useState<Journal[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [loading, setLoading] = useState(true)

  const categories = ['전체', '일상', '생각', '여행', '독서', '개발', '공지']

  useEffect(() => {
    fetchJournals()
  }, [])

  useEffect(() => {
    filterAndSortJournals()
  }, [journals, searchTerm, selectedCategory, sortBy])

  const fetchJournals = async () => {
    try {
      // API를 통해 실제 저널 데이터 가져오기
      const response = await fetch('/api/journals')
      
      if (!response.ok) {
        throw new Error('저널 불러오기 실패')
      }
      
      const result = await response.json()
      
      // 발행된 저널만 필터링
      const publishedJournals = (result.journals || []).filter(
        (journal: Journal) => journal.status === 'published'
      )
      
      setJournals(publishedJournals)
    } catch (error) {
      console.error('저널 불러오기 에러:', error)
      
      // 에러 발생 시 임시 더미 데이터 사용
      const dummyJournals = [
        {
          id: '1',
          title: '디지털 노마드로서의 첫 달',
          excerpt: '새로운 라이프스타일에 적응하며 배운 것들을 공유합니다.',
          content: '디지털 노마드로서의 첫 달을 보내며 많은 것을 배웠습니다. 자유로운 라이프스타일의 장점과 도전 과제들을 경험하며...',
          category: '일상',
          status: 'published',
          created_at: '2025-01-15',
          published_at: '2025-01-15'
        },
        {
          id: '2', 
          title: '원격 근무 효율성을 높이는 방법',
          excerpt: '생산성 향상을 위한 실용적인 팁들을 정리했습니다.',
          content: '원격 근무를 하면서 깨달은 효율성 증대 방법들을 공유합니다. 시간 관리부터 도구 활용까지...',
          category: '개발',
          status: 'published',
          created_at: '2025-01-10',
          published_at: '2025-01-10'
        },
        {
          id: '3',
          title: '여행하며 일하기',
          excerpt: '새로운 도시에서 일하며 얻은 영감들',
          content: '여행과 일의 균형을 맞추는 것은 쉽지 않지만, 새로운 환경에서 얻는 영감은 정말 값진 것 같습니다...',
          category: '여행',
          status: 'published',
          created_at: '2025-01-05',
          published_at: '2025-01-05'
        }
      ]
      
      setJournals(dummyJournals)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortJournals = () => {
    let filtered = journals

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(journal => 
        journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 카테고리 필터
    if (selectedCategory && selectedCategory !== '전체') {
      filtered = filtered.filter(journal => journal.category === selectedCategory)
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime()
        case 'oldest':
          return new Date(a.published_at || a.created_at).getTime() - new Date(b.published_at || b.created_at).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredJournals(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">로딩 중...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl text-iwl-gradient font-bold mb-2">AI와 함께하는 새로운 생각정리</h1>
              <p className="text-gray-600 text-lg">깊이 있는 사고의 기록과 AI 협력 저널링</p>
            </div>
            <Button className="bg-iwl-gradient hover:opacity-90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              새 저널 작성
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="저널 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            필터
          </Button>
        </div>

        {/* Journal Grid */}
        {filteredJournals.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl text-gray-600 mb-2">저널이 없습니다</h3>
            <p className="text-gray-500 mb-6">AI와 함께 첫 번째 저널을 작성해보세요</p>
            <Button className="bg-iwl-gradient hover:opacity-90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              새 저널 작성
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJournals.map((journal, index) => (
              <Card key={journal.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-iwl-purple-50 text-iwl-purple">
                      {journal.category}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default" className="text-xs bg-green-100 text-green-700">
                        발행됨
                      </Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        {5 + (index % 10)}분 읽기
                      </div>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-iwl-purple transition-colors duration-300 leading-tight">
                    {journal.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {journal.excerpt || journal.content.slice(0, 100) + '...'}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {450 + (index * 123)}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1 text-red-400" />
                        {32 + (index * 7)}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {8 + (index * 3)}
                      </div>
                    </div>
                    <span className="text-xs">{new Date(journal.created_at).toLocaleDateString('ko-KR')}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <Link href={`/journal/${journal.id}`}>
                      <Button variant="ghost" size="sm" className="text-iwl-purple hover:text-iwl-blue hover:bg-iwl-purple-50">
                        <BookOpen className="w-4 h-4 mr-1" />
                        읽기
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      편집
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}