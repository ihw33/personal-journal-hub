'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/supabase/auth-context';
import { useDesignMode } from '@/components/design-mode/DesignModeProvider';
import { DesignModeCard } from '@/components/design-mode/DesignModeAwareComponent';
import { 
  Search, 
  Filter, 
  SortAsc, 
  Play, 
  Lock, 
  CheckCircle, 
  Star,
  Clock,
  Users,
  Target,
  TrendingUp,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { 
  Course, 
  CourseFilters, 
  CourseSortOptions, 
  UserProgress 
} from './types';
import { 
  getPublishedCourses,
  getUserAllCourseProgress 
} from '@/lib/supabase/courses';
import { 
  getCategoryInfo, 
  getDifficultyInfo, 
  calculateOverallProgress 
} from './courseDetailHelpers';
import { THINKING_PHASES } from './types';
import { CATEGORY_CONFIG, DIFFICULTY_CONFIG } from './courseDetailConstants';

interface CourseListPageProps {
  userProgress?: UserProgress[];
  onCourseClick?: (courseId: string) => void;
  onEnroll?: (courseId: string) => void;
}

/**
 * 코스 목록 페이지 컴포넌트
 * 8단계 사고 확장 시스템의 모든 코스를 표시하고 필터링/정렬 기능 제공
 */
export const CourseListPage: React.FC<CourseListPageProps> = ({
  userProgress = [],
  onCourseClick,
  onEnroll
}) => {
  const { user } = useAuth();
  const { currentMode } = useDesignMode();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 12;
  
  // Filter and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CourseFilters>({});
  const [sortOptions, setSortOptions] = useState<CourseSortOptions>({
    field: 'popularity',
    order: 'desc'
  });
  const [activeView, setActiveView] = useState<'grid' | 'roadmap'>('roadmap');

  // Load courses from Supabase
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get courses from Supabase - server-side filtering and pagination handled by RLS
        const { courses: coursesData, totalCount } = await getPublishedCourses(
          filters,
          sortOptions,
          user || undefined,
          currentPage,
          coursesPerPage
        );
        
        setCourses(coursesData);
        setTotalPages(Math.ceil(totalCount / coursesPerPage));
        
      } catch (err: any) {
        const errorMessage = err?.message || '코스 목록을 불러오는데 실패했습니다.';
        setError(errorMessage);
        console.error('Failed to load courses:', err);
        // 더미 데이터로 폴백
        setCourses([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, [user, filters, sortOptions, currentPage]);

  // Apply client-side search filter only (other filters handled server-side)
  useEffect(() => {
    let filtered = [...courses];

    // Search filter (only applied client-side for real-time search)
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery]);

  const handleCourseClick = (courseId: string) => {
    onCourseClick?.(courseId);
  };

  const handleEnroll = (courseId: string) => {
    onEnroll?.(courseId);
  };

  const renderLoadingState = () => (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-architect-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-architect-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPageHeader = () => (
    <div className="bg-gradient-to-r from-architect-primary to-architect-secondary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-h1 font-black mb-6">
            사고와 재능의 설계자가 되어보세요
          </h1>
          <p className="text-h4 opacity-90 mb-8">
            8단계 체계적 사고 확장 시스템으로 창의적 문제해결 능력을 개발합니다
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-h2 font-bold mb-2">8단계</div>
              <div className="text-small opacity-80">체계적 사고 과정</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-h2 font-bold mb-2">2,000+</div>
              <div className="text-small opacity-80">수강생</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-h2 font-bold mb-2">4.8★</div>
              <div className="text-small opacity-80">평균 평점</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-h2 font-bold mb-2">95%</div>
              <div className="text-small opacity-80">완주율</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFiltersAndSearch = () => (
    <div className="bg-white border-b border-architect-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-architect-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="코스 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Select 
              value={filters.category || 'all'} 
              onValueChange={(value) => setFilters({...filters, category: value === 'all' ? undefined : value as any})}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.icon} {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={filters.difficulty || 'all'} 
              onValueChange={(value) => setFilters({...filters, difficulty: value === 'all' ? undefined : value as any})}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="난이도" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.icon} {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={`${sortOptions.field}-${sortOptions.order}`} 
              onValueChange={(value) => {
                const [field, order] = value.split('-');
                setSortOptions({field: field as any, order: order as any});
              }}
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity-desc">인기순</SelectItem>
                <SelectItem value="rating-desc">평점순</SelectItem>
                <SelectItem value="newest-desc">최신순</SelectItem>
                <SelectItem value="progress-desc">진행률순</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Button
                variant={activeView === 'roadmap' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveView('roadmap')}
              >
                로드맵
              </Button>
              <Button
                variant={activeView === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveView('grid')}
              >
                목록
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourseCard = (course: Course) => {
    const categoryInfo = getCategoryInfo(course.category);
    const difficultyInfo = getDifficultyInfo(course.difficulty);

    return (
      <DesignModeCard 
        key={course.id}
        className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
        onClick={() => handleCourseClick(course.id)}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Badge 
                variant="secondary"
                className="text-xs"
                style={{ 
                  backgroundColor: categoryInfo.bgColor,
                  color: categoryInfo.color 
                }}
              >
                {categoryInfo.icon} {categoryInfo.label}
              </Badge>
              <Badge 
                variant="outline"
                className="text-xs"
                style={{ 
                  borderColor: difficultyInfo.color,
                  color: difficultyInfo.color 
                }}
              >
                {difficultyInfo.label}
              </Badge>
            </div>
            
            {course.isEnrolled && (
              <div className="flex items-center space-x-1 text-architect-success">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-medium">{course.overallProgress}%</span>
              </div>
            )}
          </div>

          <h3 className="text-h4 font-bold text-architect-gray-900 mb-3 group-hover:text-architect-primary transition-colors">
            {course.title}
          </h3>
          
          <p className="text-small text-architect-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center justify-between text-xs text-architect-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span>{course.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{course.enrolledCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{course.estimatedDuration}</span>
              </div>
            </div>
          </div>

          {course.isEnrolled ? (
            <div className="space-y-2">
              <div className="w-full bg-architect-gray-200 rounded-full h-2">
                <div 
                  className="bg-architect-success h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.overallProgress}%` }}
                />
              </div>
              <Button className="w-full" size="sm">
                <Play className="w-4 h-4 mr-2" />
                계속 학습하기
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleEnroll(course.id);
              }}
            >
              지금 시작하기
            </Button>
          )}
        </div>
      </DesignModeCard>
    );
  };

  const renderRoadmapView = () => {
    const mainCourse = filteredCourses.find(c => c.id === 'course-main');
    const otherCourses = filteredCourses.filter(c => c.id !== 'course-main');

    return (
      <div className="space-y-12">
        {/* Main 8-Phase Course */}
        {mainCourse && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-h2 font-bold text-architect-gray-900 mb-4">
                8단계 사고 확장 로드맵
              </h2>
              <p className="text-architect-gray-600 max-w-2xl mx-auto">
                체계적인 8단계 과정을 통해 사고의 폭과 깊이를 확장해보세요
              </p>
            </div>

            <DesignModeCard className="p-8 bg-gradient-to-br from-architect-primary/5 to-architect-secondary/5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mainCourse.levels.map((level, index) => (
                  <div key={level.id} className="relative">
                    {/* Connection line */}
                    {index < mainCourse.levels.length - 1 && (
                      <div className="hidden lg:block absolute top-12 left-full w-6 h-0.5 bg-architect-gray-300 z-0" />
                    )}
                    
                    <DesignModeCard 
                      className="relative z-10 p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
                      style={{ borderTop: `4px solid ${level.color}` }}
                      onClick={() => handleCourseClick(mainCourse.id)}
                    >
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4"
                        style={{ backgroundColor: level.color }}
                      >
                        {level.icon}
                      </div>
                      
                      <h3 className="text-h5 font-semibold text-architect-gray-900 mb-2">
                        {level.title}
                      </h3>
                      
                      <p className="text-small text-architect-gray-600 mb-4">
                        {level.description}
                      </p>
                      
                      <div className="text-xs text-architect-gray-500">
                        {level.totalSessions}개 세션
                      </div>

                      {mainCourse.isEnrolled && level.progress > 0 && (
                        <div className="mt-3 w-full bg-architect-gray-200 rounded-full h-1">
                          <div 
                            className="h-1 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${level.progress}%`,
                              backgroundColor: level.color 
                            }}
                          />
                        </div>
                      )}
                    </DesignModeCard>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                {mainCourse.isEnrolled ? (
                  <div className="space-y-4">
                    <div className="text-h4 font-semibold text-architect-gray-900">
                      진행률: {mainCourse.overallProgress}%
                    </div>
                    <Button size="lg" onClick={() => handleCourseClick(mainCourse.id)}>
                      <Play className="w-5 h-5 mr-2" />
                      학습 계속하기
                    </Button>
                  </div>
                ) : (
                  <Button 
                    size="lg" 
                    onClick={() => handleEnroll(mainCourse.id)}
                  >
                    8단계 과정 시작하기
                  </Button>
                )}
              </div>
            </DesignModeCard>
          </div>
        )}

        {/* Other specialized courses */}
        {otherCourses.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-h3 font-bold text-architect-gray-900 mb-4">
                전문 분야별 과정
              </h2>
              <p className="text-architect-gray-600">
                특정 영역에 특화된 심화 과정들
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCourses.map(course => renderCourseCard(course))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderGridView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-h3 font-bold text-architect-gray-900">
          모든 과정 ({courses.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => renderCourseCard(course))}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            이전
          </Button>
          
          <div className="flex items-center space-x-1">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
                className="w-10 h-10"
              >
                {i + 1}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );

  if (isLoading) return renderLoadingState();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-h3 font-bold text-architect-gray-900 mb-2">
            오류가 발생했습니다
          </div>
          <p className="text-architect-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-architect-gray-50 to-white">
        {renderPageHeader()}
        {renderFiltersAndSearch()}
        
        <div className="container mx-auto px-4 py-12">
          {activeView === 'roadmap' ? renderRoadmapView() : renderGridView()}
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-h4 font-semibold text-architect-gray-900 mb-2">
                검색 결과가 없습니다
              </div>
              <p className="text-architect-gray-600">
                다른 검색어나 필터를 사용해보세요
              </p>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};