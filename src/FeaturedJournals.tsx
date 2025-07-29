import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight,
  Brain,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

interface FeaturedJournalsProps {
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
}

export const FeaturedJournals: React.FC<FeaturedJournalsProps> = ({ onNavigate, language }) => {
  const content = {
    ko: {
      title: '추천 저널',
      subtitle: 'AI와 함께 작성된 깊이 있는 생각정리를 만나보세요',
      badge: '인기 저널',
      readMore: '더 읽기',
      readTime: '분 읽기',
      author: '작성자',
      category: '카테고리',
      viewAll: '모든 저널 보기',
      noJournals: '아직 저널이 없습니다',
      createFirst: '첫 번째 저널 작성하기',
      journals: [
        {
          id: 1,
          title: 'AI와 함께 제주도 여행 계획 세우기',
          excerpt: 'AI 파트너와 함께 효과적인 제주도 여행 계획을 세우는 과정을 통해 창의적 사고법을 학습했습니다. 단순한 일정 작성을 넘어서 깊이 있는 통찰을 얻은 경험을 공유합니다.',
          author: '김지은',
          category: '여행 계획',
          readTime: 5,
          date: '2024-01-15',
          featured: true,
          tags: ['AI협업', '창의사고', '여행']
        },
        {
          id: 2,
          title: '분석적 사고로 문제 해결하기',
          excerpt: 'AI와의 대화를 통해 복잡한 업무 문제를 체계적으로 분석하고 해결책을 도출하는 방법을 배웠습니다. 논리적 접근과 창의적 발상의 균형을 찾아가는 과정을 정리했습니다.',
          author: '박민수',
          category: '문제해결',
          readTime: 8,
          date: '2024-01-12',
          featured: false,
          tags: ['분석사고', '문제해결', 'AI협업']
        },
        {
          id: 3,
          title: 'AI 멘토와의 창의적 브레인스토밍',
          excerpt: 'AI와 함께 아이디어를 발전시키고 새로운 관점을 발견하는 과정을 기록했습니다. 인간의 직관과 AI의 논리적 사고가 만나 시너지를 내는 경험을 나누고 싶습니다.',
          author: '이서연',
          category: '창의사고',
          readTime: 6,
          date: '2024-01-10',
          featured: true,
          tags: ['창의사고', '브레인스토밍', 'AI멘토']
        }
      ]
    },
    en: {
      title: 'Featured Journals',
      subtitle: 'Discover profound thinking developed through AI collaboration',
      badge: 'Popular Journals',
      readMore: 'Read More',
      readTime: 'min read',
      author: 'Author',
      category: 'Category',
      viewAll: 'View All Journals',
      noJournals: 'No journals yet',
      createFirst: 'Create First Journal',
      journals: [
        {
          id: 1,
          title: 'Planning Jeju Island Trip with AI',
          excerpt: 'Learning creative thinking through effective Jeju Island travel planning with an AI partner. Sharing experiences of gaining deeper insights beyond simple scheduling.',
          author: 'Kim Jieun',
          category: 'Travel Planning',
          readTime: 5,
          date: '2024-01-15',
          featured: true,
          tags: ['AI Collaboration', 'Creative Thinking', 'Travel']
        },
        {
          id: 2,
          title: 'Problem Solving with Analytical Thinking',
          excerpt: 'Learning systematic analysis and solution development for complex work problems through AI conversations. Documenting the process of finding balance between logical approach and creative thinking.',
          author: 'Park Minsu',
          category: 'Problem Solving',
          readTime: 8,
          date: '2024-01-12',
          featured: false,
          tags: ['Analytical Thinking', 'Problem Solving', 'AI Collaboration']
        },
        {
          id: 3,
          title: 'Creative Brainstorming with AI Mentor',
          excerpt: 'Recording the process of developing ideas and discovering new perspectives with AI. Sharing experiences where human intuition meets AI logical thinking to create synergy.',
          author: 'Lee Seoyeon',
          category: 'Creative Thinking',
          readTime: 6,
          date: '2024-01-10',
          featured: true,
          tags: ['Creative Thinking', 'Brainstorming', 'AI Mentor']
        }
      ]
    }
  };

  const t = content[language];

  const getCategoryIcon = (category: string) => {
    if (category.includes('여행') || category.includes('Travel')) return BookOpen;
    if (category.includes('문제해결') || category.includes('Problem')) return TrendingUp;
    if (category.includes('창의') || category.includes('Creative')) return Brain;
    return MessageCircle;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-iwl-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-iwl-purple-100 rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 text-iwl-purple" />
            <span className="text-sm font-medium text-iwl-purple">{t.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Featured Journals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {t.journals.map((journal, index) => {
            const CategoryIcon = getCategoryIcon(journal.category);
            return (
              <Card 
                key={journal.id} 
                className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  journal.featured ? 'ring-2 ring-iwl-purple-200' : ''
                }`}
                onClick={() => onNavigate('journal-detail')}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant="secondary" 
                      className="bg-iwl-purple-100 text-iwl-purple hover:bg-iwl-purple-200"
                    >
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      {journal.category}
                    </Badge>
                    {journal.featured && (
                      <Badge className="bg-iwl-gradient text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-iwl-purple transition-colors">
                    {journal.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-3">
                    {journal.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {journal.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {journal.readTime}{t.readTime}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {journal.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white group-hover:bg-iwl-purple group-hover:text-white transition-colors"
                  >
                    {t.readMore}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            onClick={() => onNavigate('journal')}
            className="bg-iwl-gradient hover:opacity-90 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t.viewAll}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Empty State (for when no journals exist) */}
        {t.journals.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t.noJournals}
            </h3>
            <p className="text-gray-500 mb-6">
              AI와 함께 첫 번째 저널을 작성해보세요
            </p>
            <Button 
              onClick={() => onNavigate('journal-editor')}
              className="bg-iwl-gradient hover:opacity-90 text-white"
            >
              {t.createFirst}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

