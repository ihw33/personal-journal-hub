import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Lightbulb, Brain, Sparkles, Zap } from 'lucide-react';

interface HeroSectionProps {
  language: 'ko' | 'en';
  onNavigate?: (page: 'journal' | 'courses') => void;
}

export function HeroSection({ language, onNavigate }: HeroSectionProps) {
  const content = {
    ko: {
      badge: 'Where AI Meets Deep Thinking',
      title: 'AI와 함께하는',
      titleHighlight: '새로운 생각정리',
      subtitle: '현대인을 위한 AI 강화 사고법',
      description: 'AI 기반 도구로 인지적 잠재력을 해제하고, 사고 과정을 증폭시키며, 창의성을 향상시키고, 아이디어를 실행 가능한 통찰력으로 변환하세요.',
      startJournal: '🧠 AI 저널 시작하기',
      exploreCourses: 'AI 사고법 더보기',
      deepAnalysis: '깊이 있는 분석',
      aiInsights: 'AI 통찰력',
      creativeFlow: '창의적 흐름',
      aiEnhanced: 'AI 강화 사고',
      deepThought: '깊이 있는 사고 분석',
      insightGeneration: '통찰력 생성',
      actionPlanning: '실행 계획',
      clarityBoost: '명확성 향상',
      fasterInsights: '더 빠른 통찰력'
    },
    en: {
      badge: 'Where AI Meets Deep Thinking',
      title: 'Think Deeper',
      titleHighlight: 'with AI',
      subtitle: 'AI-Enhanced Thinking for Modern Minds',
      description: 'Unlock your cognitive potential with AI-powered tools that amplify your thinking process, enhance creativity, and transform ideas into actionable insights.',
      startJournal: '🧠 Start AI Journal',
      exploreCourses: 'Learn AI Thinking',
      deepAnalysis: 'Deep Analysis',
      aiInsights: 'AI Insights',
      creativeFlow: 'Creative Flow',
      aiEnhanced: 'AI-Enhanced Thinking',
      deepThought: 'Deep Thought Analysis',
      insightGeneration: 'Insight Generation',
      actionPlanning: 'Action Planning',
      clarityBoost: 'Clarity Boost',
      fasterInsights: 'Faster Insights'
    }
  };

  const t = content[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-iwl-purple-50/30 to-iwl-blue-50/30 py-20 lg:py-32 min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-iwl-purple/5 rounded-full animate-pulse" />
        <div className="absolute bottom-32 left-16 w-48 h-48 bg-iwl-blue/5 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-iwl-purple/3 to-iwl-blue/3 rounded-full animate-pulse delay-500" />
      </div>

      {/* Max width container - 1440px */}
      <div className="container relative z-10 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <Badge className="bg-iwl-gradient text-white border-0 px-4 py-2 text-sm">
                {t.badge}
              </Badge>
              
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl text-gray-900 leading-[1.1] tracking-tight">
                  {t.title}{' '}
                  <span className="text-iwl-gradient">{t.titleHighlight}</span>
                </h1>
                
                <p className="text-2xl text-gray-600 leading-relaxed max-w-xl">
                  {t.subtitle}
                </p>
                
                <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
                  {t.description}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-iwl-gradient hover:opacity-90 text-white px-8 py-4 text-lg"
                onClick={() => onNavigate?.('journal')}
              >
                {t.startJournal}
                <BookOpen className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-iwl-purple text-iwl-purple hover:bg-iwl-purple-50 px-8 py-4 text-lg"
                onClick={() => onNavigate?.('courses')}
              >
                {t.exploreCourses}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-iwl-purple-100 rounded-xl flex items-center justify-center mx-auto">
                  <Brain className="w-6 h-6 text-iwl-purple" />
                </div>
                <div className="text-sm text-gray-600">{t.deepAnalysis}</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-iwl-blue-100 rounded-xl flex items-center justify-center mx-auto">
                  <Lightbulb className="w-6 h-6 text-iwl-blue" />
                </div>
                <div className="text-sm text-gray-600">{t.aiInsights}</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-iwl-purple-100 to-iwl-blue-100 rounded-xl flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-iwl-purple" />
                </div>
                <div className="text-sm text-gray-600">{t.creativeFlow}</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className="relative">
            {/* Main visual card */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              {/* AI + Thinking visualization */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl text-gray-900">{t.aiEnhanced}</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                {/* Thinking process visualization */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-iwl-purple-50 rounded-xl">
                    <div className="w-10 h-10 bg-iwl-gradient rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{t.deepThought}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-iwl-gradient h-2 rounded-full w-4/5 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-iwl-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-iwl-blue rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{t.insightGeneration}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-iwl-blue h-2 rounded-full w-3/5 animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-iwl-gradient rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{t.actionPlanning}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-iwl-gradient h-2 rounded-full w-5/6 animate-pulse delay-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl text-iwl-purple">87%</div>
                    <div className="text-xs text-gray-600">{t.clarityBoost}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-iwl-blue">3.2x</div>
                    <div className="text-xs text-gray-600">{t.fasterInsights}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-iwl-gradient rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-100">
              <div className="text-2xl">🧠</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}