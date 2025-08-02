'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Lock, 
  CheckCircle, 
  Clock, 
  Users, 
  Star,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ContentBlockComponent } from './ContentBlockComponent';
import { 
  Course, 
  CourseSession, 
  UserProgress, 
  CourseLevel 
} from './types';
import { 
  calculateOverallProgress, 
  calculateLevelProgress,
  getNextRecommendedSession,
  analyzeThinkingPhaseProgress,
  calculateLearningStats,
  getCategoryInfo,
  getDifficultyInfo,
  formatDuration
} from './courseDetailHelpers';
import { THINKING_PHASES } from './types';

interface CourseDetailPageProps {
  courseId: string;
  userProgress?: UserProgress;
  onSessionStart?: (sessionId: string) => void;
  onSessionComplete?: (sessionId: string) => void;
  onEnroll?: (courseId: string) => void;
}

/**
 * 코스 상세 페이지 컴포넌트
 * 8단계 사고 확장 시스템의 개별 코스 정보와 학습 진행 상황을 표시
 */
export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseId,
  userProgress,
  onSessionStart,
  onSessionComplete,
  onEnroll
}) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSession, setSelectedSession] = useState<CourseSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock course data - 실제로는 Supabase에서 불러옴
  useEffect(() => {
    const loadCourse = async () => {
      try {
        setIsLoading(true);
        
        // Mock data for demonstration
        const mockCourse: Course = {
          id: courseId,
          title: '사고 확장 8단계 마스터 과정',
          description: '창의적 사고와 문제해결 능력을 8단계로 체계화한 혁신적 학습 프로그램입니다. 관찰부터 실행까지, 사고의 전 과정을 체험하며 진정한 사고의 달인이 되어보세요.',
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
              isLocked: userProgress ? phase > userProgress.currentLevelId + 1 : phase > 1,
              progress: userProgress ? calculateLevelProgress({
                id: phase,
                totalSessions: 4
              } as CourseLevel, userProgress.completedSessions) : 0,
              totalSessions: 4,
              completedSessions: userProgress ? userProgress.completedSessions.filter(s => 
                s.startsWith(`${phase}-`)
              ).length : 0,
              estimatedDuration: '1주',
              skills: [`${phaseInfo.title} 스킬`],
              prerequisites: phase > 1 ? [phase - 1] : undefined
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
          tags: ['사고력', '창의성', '문제해결', '혁신', '디자인씽킹'],
          isEnrolled: !!userProgress,
          currentLevel: userProgress?.currentLevelId || 1,
          overallProgress: userProgress ? calculateOverallProgress(mockCourse, userProgress) : 0
        };

        setCourse(mockCourse);
      } catch (err) {
        setError('코스 정보를 불러오는데 실패했습니다.');
        console.error('Failed to load course:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourse();
  }, [courseId, userProgress]);

  const handleSessionClick = (session: CourseSession) => {
    if (!session.isLocked) {
      setSelectedSession(session);
      onSessionStart?.(session.id);
    }
  };

  const handleEnroll = () => {
    onEnroll?.(courseId);
  };

  const renderLoadingState = () => (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-architect-gray-200 rounded w-1/3 mb-8"></div>
          <div className="h-64 bg-architect-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-32 bg-architect-gray-200 rounded"></div>
              <div className="h-48 bg-architect-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-64 bg-architect-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourseHeader = () => {
    if (!course) return null;

    const categoryInfo = getCategoryInfo(course.category);
    const difficultyInfo = getDifficultyInfo(course.difficulty);

    return (
      <div className="bg-gradient-to-r from-architect-primary to-architect-secondary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로가기
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Badge 
                  variant="secondary" 
                  className="bg-white/20 text-white border-white/20"
                >
                  {categoryInfo.icon} {categoryInfo.label}
                </Badge>
                <Badge 
                  variant="secondary"
                  className="bg-white/20 text-white border-white/20"
                >
                  {difficultyInfo.icon} {difficultyInfo.label}
                </Badge>
              </div>

              <h1 className="text-h1 font-black mb-4">{course.title}</h1>
              <p className="text-body opacity-90 mb-6 max-w-2xl">{course.description}</p>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{course.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{course.enrolledCount.toLocaleString()}명 수강</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.estimatedDuration}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-center mb-6">
                  <div className="text-h2 font-bold mb-2">
                    {course.isEnrolled ? `${course.overallProgress}%` : '미수강'}
                  </div>
                  <div className="text-small opacity-80">
                    {course.isEnrolled ? '전체 진행률' : '수강 등록이 필요합니다'}
                  </div>
                </div>

                {course.isEnrolled ? (
                  <div className="space-y-4">
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.overallProgress}%` }}
                      />
                    </div>
                    <Button className="w-full bg-white text-architect-primary hover:bg-white/90">
                      <Play className="w-4 h-4 mr-2" />
                      학습 계속하기
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={handleEnroll}
                    className="w-full bg-white text-architect-primary hover:bg-white/90"
                  >
                    지금 시작하기
                  </Button>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLevelRoadmap = () => {
    if (!course) return null;

    return (
      <div className="space-y-6">
        <h2 className="text-h3 font-bold text-architect-gray-900">
          8단계 사고 확장 로드맵
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {course.levels.map((level, index) => (
            <Card 
              key={level.id}
              className={`p-6 transition-all duration-200 ${
                level.isLocked 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:shadow-lg cursor-pointer'
              }`}
              style={{ 
                borderLeft: `4px solid ${level.color}`,
                backgroundColor: level.progress > 0 ? `${level.color}10` : undefined
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg"
                  style={{ backgroundColor: level.color }}
                >
                  {level.icon}
                </div>
                
                <div className="flex items-center space-x-1">
                  {level.isLocked ? (
                    <Lock className="w-4 h-4 text-architect-gray-400" />
                  ) : level.progress >= 100 ? (
                    <CheckCircle className="w-4 h-4 text-architect-success" />
                  ) : (
                    <div className="text-small font-semibold" style={{ color: level.color }}>
                      {level.progress}%
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-h5 font-semibold text-architect-gray-900 mb-2">
                {level.title}
              </h3>
              <p className="text-small text-architect-gray-600 mb-4">
                {level.description}
              </p>

              <div className="flex items-center justify-between text-xs text-architect-gray-500">
                <span>{level.completedSessions}/{level.totalSessions} 세션</span>
                <span>{level.estimatedDuration}</span>
              </div>

              {level.progress > 0 && (
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
          ))}
        </div>
      </div>
    );
  };

  const renderProgressAnalysis = () => {
    if (!course || !userProgress) return null;

    const thinkingProgress = analyzeThinkingPhaseProgress(userProgress);
    const learningStats = calculateLearningStats(userProgress);

    return (
      <div className="space-y-6">
        <h2 className="text-h3 font-bold text-architect-gray-900">
          학습 진행 분석
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-architect-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-architect-primary" />
              </div>
              <div>
                <div className="text-h4 font-bold text-architect-gray-900">
                  {learningStats.sessionsCompleted}
                </div>
                <div className="text-small text-architect-gray-600">완료한 세션</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-architect-success/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-architect-success" />
              </div>
              <div>
                <div className="text-h4 font-bold text-architect-gray-900">
                  {formatDuration(learningStats.totalTimeSpent)}
                </div>
                <div className="text-small text-architect-gray-600">총 학습 시간</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-architect-warning/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-architect-warning" />
              </div>
              <div>
                <div className="text-h4 font-bold text-architect-gray-900">
                  {learningStats.currentStreak}일
                </div>
                <div className="text-small text-architect-gray-600">연속 학습</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-architect-error/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-architect-error" />
              </div>
              <div>
                <div className="text-h4 font-bold text-architect-gray-900">
                  {formatDuration(learningStats.averageSessionTime)}
                </div>
                <div className="text-small text-architect-gray-600">평균 세션 시간</div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-h4 font-semibold text-architect-gray-900 mb-4">
            사고 단계별 진행 상황
          </h3>
          <div className="space-y-4">
            {thinkingProgress.map((phase) => (
              <div key={phase.phase} className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-lg bg-architect-primary/10 flex items-center justify-center">
                  <span className="text-small font-bold text-architect-primary">
                    {phase.phase}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-small font-medium text-architect-gray-900">
                      {THINKING_PHASES[phase.phase].title}
                    </span>
                    <span className="text-small text-architect-gray-600">
                      {phase.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-architect-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-architect-primary h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                </div>
                {phase.isCompleted && (
                  <CheckCircle className="w-5 h-5 text-architect-success" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  const renderAuthorInfo = () => {
    if (!course) return null;

    return (
      <Card className="p-6">
        <h3 className="text-h4 font-semibold text-architect-gray-900 mb-4">
          강사 소개
        </h3>
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16">
            <img 
              src={course.author.avatar || '/default-avatar.png'} 
              alt={course.author.name}
              className="w-full h-full object-cover"
            />
          </Avatar>
          <div className="flex-1">
            <h4 className="text-h5 font-semibold text-architect-gray-900 mb-2">
              {course.author.name}
            </h4>
            <p className="text-small text-architect-gray-600">
              {course.author.bio}
            </p>
          </div>
        </div>
      </Card>
    );
  };

  if (isLoading) return renderLoadingState();

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-h3 font-bold text-architect-gray-900 mb-2">
            오류가 발생했습니다
          </div>
          <p className="text-architect-gray-600 mb-4">
            {error || '코스를 찾을 수 없습니다.'}
          </p>
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
        {renderCourseHeader()}
        
        <div className="container mx-auto px-4 py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="curriculum">커리큘럼</TabsTrigger>
              <TabsTrigger value="progress">진행 상황</TabsTrigger>
              <TabsTrigger value="instructor">강사</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {renderLevelRoadmap()}
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-h3 font-bold text-architect-gray-900 mb-6">
                    상세 커리큘럼
                  </h2>
                  {/* 세션별 상세 내용 */}
                  <div className="space-y-6">
                    {course.levels.map((level) => (
                      <Card key={level.id} className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                            style={{ backgroundColor: level.color }}
                          >
                            {level.icon}
                          </div>
                          <div>
                            <h3 className="text-h4 font-semibold text-architect-gray-900">
                              {level.title}
                            </h3>
                            <p className="text-small text-architect-gray-600">
                              {level.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-small text-architect-gray-600">
                          {level.totalSessions}개 세션 • {level.estimatedDuration}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  {renderAuthorInfo()}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-8">
              {course.isEnrolled ? (
                renderProgressAnalysis()
              ) : (
                <Card className="p-12 text-center">
                  <Lock className="w-16 h-16 text-architect-gray-400 mx-auto mb-4" />
                  <h3 className="text-h4 font-semibold text-architect-gray-900 mb-2">
                    수강 등록이 필요합니다
                  </h3>
                  <p className="text-architect-gray-600 mb-6">
                    진행 상황을 확인하려면 먼저 코스에 등록해주세요.
                  </p>
                  <Button onClick={handleEnroll}>
                    지금 등록하기
                  </Button>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="instructor" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {renderAuthorInfo()}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ErrorBoundary>
  );
};