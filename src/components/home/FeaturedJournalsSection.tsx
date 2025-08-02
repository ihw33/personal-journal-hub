/**
 * IdeaWorkLab v4.0 FeaturedJournalsSection
 * 전문가 저널 맛보기 섹션
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { User, Clock, Eye, ThumbsUp, ChevronRight, BookOpen } from 'lucide-react';
import { featuredJournals, FeaturedJournal } from '@/data/homePageData';

interface FeaturedJournalsSectionProps {
  language?: 'ko' | 'en';
  onNavigate?: (page: string, params?: any) => void;
}

export const FeaturedJournalsSection: React.FC<FeaturedJournalsSectionProps> = ({
  language = 'ko',
  onNavigate = () => {}
}) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            우리의 방법론은 깊이 있는 연구에 기반합니다
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            국내외 교육 전문가들의 최신 연구와 실제 적용 사례를 통해 검증된 학습 방법론을 만나보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {featuredJournals.map((journal: FeaturedJournal, index) => (
            <Card 
              key={journal.id}
              className="group cursor-pointer overflow-hidden bg-white border border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              onClick={() => onNavigate('journal-detail', { journalId: journal.id })}
            >
              {/* 저널 이미지 */}
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback 
                  src={journal.image} 
                  alt={journal.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge 
                    variant="outline" 
                    className="bg-purple-50 text-purple-600 border-purple-200 font-medium text-xs md:text-sm"
                  >
                    {journal.category}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {journal.publishedAt}
                  </div>
                </div>
                
                <CardTitle className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors leading-tight">
                  {journal.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 line-clamp-3">
                  {journal.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 flex-shrink-0" />
                      <span>{journal.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>{journal.readTime} 읽기</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 flex-shrink-0" />
                      <span>{journal.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3 flex-shrink-0" />
                      <span>{journal.likes}</span>
                    </div>
                  </div>
                  
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => onNavigate('journal')}
            size="lg"
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold transition-colors"
          >
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            더 많은 인사이트 보기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJournalsSection;