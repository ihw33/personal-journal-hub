'use client';

import React, { useState, useEffect } from 'react';
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
import { Card } from '@/components/ui/card';
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
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CourseFilters>({});
  const [sortOptions, setSortOptions] = useState<CourseSortOptions>({
    field: 'popularity',
    order: 'desc'
  });
  const [activeView, setActiveView] = useState<'grid' | 'roadmap'>('roadmap');

  // Mock courses data - 실제로는 Supabase에서 불러옴
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        
        // Mock courses representing the 8-phase thinking expansion system
        const mockCourses: Course[] = [
          {
            id: 'course-main',
            title: '사고 확장 8단계 마스터 과정',
            description: '창의적 사고와 문제해결 능력을 8단계로 체계화한 혁신적 학습 프로그램입니다.',
            category: 'thinking-expansion',
            difficulty: 'intermediate',
            totalLevels: 8,
            estimatedDuration: '6주',
            enrolledCount: 1247,
            rating: 4.8,
            levels: Object.keys(THINKING_PHASES).map(phaseKey => {
              const phase = parseInt(phaseKey);
              const phaseInfo = THINKING_PHASES[phase as keyof typeof THINKING_PHASES];
              return {
                id: phase,
                name: phaseInfo.name,
                title: phaseInfo.title,
                description: phaseInfo.description,
                color: phaseInfo.color,
                icon: phaseInfo.icon,
                isLocked: false,
                progress: 0,
                totalSessions: 4,
                completedSessions: 0,
                estimatedDuration: '1주',
                skills: [`${phaseInfo.title} 스킬`]
              };
            }),
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-15T00:00:00Z',
            author: {
              id: 'author-1',
              name: '김사고',
              avatar: '/avatars/kim-sago.jpg',
              bio: '사고력 전문가이자 IdeaWorkLab 창립자'
            },
            tags: ['사고력', '창의성', '문제해결', '혁신'],
            isEnrolled: userProgress.some(p => p.courseId === 'course-main'),
            currentLevel: 1,
            overallProgress: 0
          },
          {
            id: 'course-creativity',
            title: '창의적 사고 심화 과정',
            description: '예술적 사고와 혁신적 아이디어 발굴에 특화된 창의성 개발 프로그램입니다.',
            category: 'creativity',
            difficulty: 'beginner',
            totalLevels: 6,
            estimatedDuration: '4주',
            enrolledCount: 892,
            rating: 4.6,
            levels: [],
            createdAt: '2024-01-10T00:00:00Z',
            updatedAt: '2024-01-20T00:00:00Z',
            author: {
              id: 'author-2',
              name: '박창의',
              avatar: '/avatars/park-creative.jpg',
              bio: '창의성 전문가'
            },
            tags: ['창의성', '예술적사고', '아이디어'],
            isEnrolled: userProgress.some(p => p.courseId === 'course-creativity'),
            currentLevel: 1,
            overallProgress: 0
          },
          {
            id: 'course-problem-solving',
            title: '체계적 문제해결 방법론',
            description: '논리적 사고와 구조화된 접근법으로 복잡한 문제를 해결하는 방법을 학습합니다.',
            category: 'problem-solving',
            difficulty: 'advanced',
            totalLevels: 5,
            estimatedDuration: '5주',
            enrolledCount: 634,
            rating: 4.7,
            levels: [],
            createdAt: '2024-01-05T00:00:00Z',
            updatedAt: '2024-01-25T00:00:00Z',
            author: {
              id: 'author-3',
              name: '최해결',
              avatar: '/avatars/choi-solver.jpg',
              bio: '문제해결 전문가'
            },
            tags: ['문제해결', '논리적사고', '분석'],
            isEnrolled: userProgress.some(p => p.courseId === 'course-problem-solving'),
            currentLevel: 1,
            overallProgress: 0
          },
          {
            id: 'course-innovation',
            title: '혁신 리더십 개발',
            description: '변화를 이끄는 혁신적 사고방식과 리더십 역량을 개발합니다.',
            category: 'innovation',
            difficulty: 'expert',
            totalLevels: 7,
            estimatedDuration: '8주',
            enrolledCount: 445,
            rating: 4.9,
            levels: [],
            createdAt: '2024-01-15T00:00:00Z',
            updatedAt: '2024-01-30T00:00:00Z',
            author: {
              id: 'author-4',
              name: '정혁신',
              avatar: '/avatars/jung-innovation.jpg',
              bio: '혁신 전문가'
            },
            tags: ['혁신', '리더십', '변화관리'],
            isEnrolled: userProgress.some(p => p.courseId === 'course-innovation'),
            currentLevel: 1,
            overallProgress: 0
          }
        ];

        // 사용자 진행률 적용
        const coursesWithProgress = mockCourses.map(course => {
          const progress = userProgress.find(p => p.courseId === course.id);
          if (progress) {
            return {
              ...course,
              overallProgress: calculateOverallProgress(course, progress),
              currentLevel: progress.currentLevelId,
              isEnrolled: true
            };
          }
          return course;
        });

        setCourses(coursesWithProgress);
        setFilteredCourses(coursesWithProgress);
      } catch (err) {
        setError('코스 목록을 불러오는데 실패했습니다.');
        console.error('Failed to load courses:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, [userProgress]);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...courses];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(course => course.category === filters.category);
    }

    // Difficulty filter
    if (filters.difficulty) {
      filtered = filtered.filter(course => course.difficulty === filters.difficulty);
    }

    // Enrollment filter
    if (filters.isEnrolled !== undefined) {
      filtered = filtered.filter(course => course.isEnrolled === filters.isEnrolled);
    }

    // Duration filter
    if (filters.duration) {
      filtered = filtered.filter(course => {
        const duration = course.estimatedDuration;
        switch (filters.duration) {
          case 'short':
            return duration.includes('1주') || duration.includes('2주');
          case 'medium':
            return duration.includes('3주') || duration.includes('4주') || duration.includes('5주');
          case 'long':
            return duration.includes('6주') || duration.includes('7주') || duration.includes('8주');
          default:
            return true;
        }
      });
    }

    // Sort logic
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortOptions.field) {
        case 'popularity':
          aValue = a.enrolledCount;
          bValue = b.enrolledCount;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'duration':
          aValue = parseInt(a.estimatedDuration);
          bValue = parseInt(b.estimatedDuration);
          break;
        case 'newest':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'progress':
          aValue = a.overallProgress;
          bValue = b.overallProgress;
          break;
        default:
          return 0;
      }

      if (sortOptions.order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCourses(filtered);
  }, [courses, searchQuery, filters, sortOptions]);

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
              value={filters.category || ''} 
              onValueChange={(value) => setFilters({...filters, category: value as any})}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">전체</SelectItem>
                {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.icon} {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={filters.difficulty || ''} 
              onValueChange={(value) => setFilters({...filters, difficulty: value as any})}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="난이도" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">전체</SelectItem>
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
      <Card 
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
      </Card>
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

            <Card className="p-8 bg-gradient-to-br from-architect-primary/5 to-architect-secondary/5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mainCourse.levels.map((level, index) => (
                  <div key={level.id} className="relative">
                    {/* Connection line */}
                    {index < mainCourse.levels.length - 1 && (
                      <div className="hidden lg:block absolute top-12 left-full w-6 h-0.5 bg-architect-gray-300 z-0" />
                    )}
                    
                    <Card 
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
                    </Card>
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
            </Card>
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
          모든 과정 ({filteredCourses.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => renderCourseCard(course))}
      </div>
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