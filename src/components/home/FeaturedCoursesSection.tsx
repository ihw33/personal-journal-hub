/**
 * IdeaWorkLab v4.0 FeaturedCoursesSection
 * 대표 강의 소개 섹션
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Clock, Users, Star, ChevronRight, BookOpen } from 'lucide-react';
import { featuredCourses, FeaturedCourse } from '@/data/homePageData';

interface FeaturedCoursesSectionProps {
  language?: 'ko' | 'en';
  onNavigate?: (page: string, params?: any) => void;
}

export const FeaturedCoursesSection: React.FC<FeaturedCoursesSectionProps> = ({
  language = 'ko',
  onNavigate = () => {}
}) => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            게임처럼 즐겁게, 전문가처럼 깊이있게 성장하세요
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            단계별로 설계된 체계적 커리큘럼으로 재미있으면서도 깊이 있는 사고력 학습을 경험해보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {featuredCourses.map((course: FeaturedCourse, index) => {
            const IconComponent = course.icon;
            return (
              <Card 
                key={course.id}
                className="group cursor-pointer overflow-hidden bg-white border border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => onNavigate('courses', { courseId: course.id })}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${course.gradient} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <Badge 
                      variant="outline" 
                      className="bg-white/80 backdrop-blur-sm border-gray-300 text-gray-700 font-medium text-xs md:text-sm"
                    >
                      {course.level}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors leading-tight">
                    {course.title}
                  </CardTitle>
                  
                  <CardDescription className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span>{course.students}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current flex-shrink-0" />
                      <span className="text-xs md:text-sm font-semibold text-gray-900">
                        {course.rating}
                      </span>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => onNavigate('courses')}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold"
          >
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            모든 레벨 살펴보기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;