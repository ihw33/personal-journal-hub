import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Calendar, Clock, User, Eye, Heart, MessageCircle, BookOpen, ArrowRight, X } from 'lucide-react';

interface FeaturedJournalsProps {
  language: 'ko' | 'en';
}

export function FeaturedJournals({ language }: FeaturedJournalsProps) {
  const [selectedJournal, setSelectedJournal] = useState<any>(null);

  const content = {
    ko: {
      title: '최근 저널 연재기',
      subtitle: 'AI와 함께 탐구한 깊이 있는 사고의 여정을 공유합니다',
      readMore: '전문 읽기',
      close: '닫기',
      views: '조회',
      likes: '좋아요',
      comments: '댓글',
      minRead: '분 읽기',
      author: '작성자',
      myName: '아이디어 워크랩',
      journals: [
        {
          id: 1,
          title: 'AI와 창의성의 만남: 새로운 가능성의 발견',
          excerpt: '인공지능이 창의적 사고에 미치는 영향에 대한 깊이 있는 분석과 실제 적용 사례들을 살펴봅니다.',
          fullContent: `최근 AI 기술의 발전은 우리의 창의적 사고 방식에 근본적인 변화를 가져오고 있습니다. 

## AI와 창의성의 새로운 패러다임

전통적으로 창의성은 순수하게 인간만의 영역으로 여겨졌습니다. 하지만 GPT, DALL-E, Midjourney 같은 AI 도구들이 등장하면서, 창의성의 정의 자체가 변화하고 있습니다.

## 실제 경험에서 얻은 인사이트

지난 6개월간 다양한 AI 도구를 활용하여 창작 활동을 진행하면서 발견한 것들:

1. **아이디어 확장의 속도**: AI는 하나의 아이디어에서 수십 개의 변형을 순식간에 제시합니다.
2. **관점의 다양성**: 인간이 놓치기 쉬운 새로운 관점을 제공합니다.
3. **반복 작업의 해방**: 기계적인 작업에서 벗어나 더 높은 차원의 사고에 집중할 수 있습니다.

## 창의적 협업의 미래

AI와 인간의 관계는 경쟁이 아닌 협업입니다. AI는 도구이며, 창의성의 본질은 여전히 인간의 경험, 감정, 직관에서 비롯됩니다.

앞으로의 창작자들은 AI를 활용하되, 자신만의 독특한 시각과 경험을 바탕으로 진정성 있는 작품을 만들어낼 것입니다.`,
          category: '창의성',
          readTime: 8,
          date: '2024년 1월 15일',
          views: 1247,
          likes: 93,
          comments: 24,
          color: 'from-purple-500 to-pink-500',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
        },
        {
          id: 2,
          title: '디지털 시대의 깊은 사고: 산만함과의 전쟁',
          excerpt: '디지털 기술이 우리의 사고 패턴에 미치는 영향과 깊이 있는 사고를 유지하는 방법을 탐구합니다.',
          fullContent: `현대 사회에서 깊이 있는 사고를 유지하는 것은 점점 더 어려워지고 있습니다.

## 디지털 산만함의 현실

스마트폰, 소셜미디어, 무한한 정보의 바다... 우리의 주의력은 끊임없이 분산되고 있습니다. 평균적으로 사람들은 8초마다 한 번씩 주의가 흐트러진다고 합니다.

## 깊은 사고를 위한 전략

### 1. 디지털 디톡스
- 하루 2시간씩 완전한 디지털 차단
- 스마트폰 없이 산책하기
- 아날로그 도구로 글쓰기

### 2. 집중력 훈련
- 포모도로 기법 활용
- 명상과 마음챙김 실천
- 단일 작업에 집중하기

### 3. 환경 설계
- 방해 요소 제거
- 전용 사고 공간 마련
- 시간대별 활동 구분

## 개인적 실험 결과

3개월간 이러한 방법들을 실천한 결과, 집중력이 현저히 향상되었고, 더 창의적인 아이디어들이 떠오르기 시작했습니다.

특히 아침 시간의 깊은 사고 세션이 가장 효과적이었습니다.`,
          category: '디지털',
          readTime: 12,
          date: '2024년 1월 12일',
          views: 892,
          likes: 67,
          comments: 18,
          color: 'from-blue-500 to-cyan-500',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop'
        },
        {
          id: 3,
          title: '저널링과 AI: 내면의 소리를 듣는 새로운 방법',
          excerpt: 'AI 도구를 활용한 저널링이 어떻게 자기 성찰과 통찰력을 깊게 만드는지 경험을 공유합니다.',
          fullContent: `저널링은 오래된 자기 성찰의 도구입니다. 하지만 AI와 결합하면 어떤 일이 일어날까요?

## AI 저널링의 발견

6개월 전부터 AI를 활용한 저널링을 시작했습니다. 단순히 일기를 쓰는 것이 아니라, AI와 대화하며 내 생각을 정리하고 확장해나가는 과정입니다.

## 실제 과정

### 1단계: 자유로운 글쓰기
매일 아침 10분간 생각나는 것들을 자유롭게 적습니다.

### 2단계: AI와의 대화
작성한 내용을 AI에게 보여주고 질문을 던집니다:
- "이 감정의 근본 원인은 무엇일까?"
- "다른 관점에서는 어떻게 볼 수 있을까?"
- "이 경험에서 배울 수 있는 것은?"

### 3단계: 통찰의 기록
AI의 피드백을 바탕으로 새로운 관점이나 통찰을 기록합니다.

## 놀라운 변화들

- **객관성 향상**: AI가 제3자적 관점을 제공해 감정에 휩쓸리지 않게 됨
- **패턴 인식**: 반복되는 생각이나 행동 패턴을 더 쉽게 발견
- **창의적 솔루션**: 문제에 대한 새로운 접근법들이 떠오름

저널링은 더 이상 혼자만의 작업이 아닙니다. AI라는 지혜로운 대화 상대와 함께하는 내면 탐험의 여정이 되었습니다.`,
          category: '저널링',
          readTime: 10,
          date: '2024년 1월 10일',
          views: 654,
          likes: 45,
          comments: 12,
          color: 'from-green-500 to-teal-500',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop'
        }
      ]
    },
    en: {
      title: 'Recent Journal Series',
      subtitle: 'Sharing deep thinking journeys explored together with AI',
      readMore: 'Read Full Article',
      close: 'Close',
      views: 'views',
      likes: 'likes',
      comments: 'comments',
      minRead: 'min read',
      author: 'Author',
      myName: 'Idea Work Lab',
      journals: [
        {
          id: 1,
          title: 'The Meeting of AI and Creativity: Discovering New Possibilities',
          excerpt: 'An in-depth analysis of how artificial intelligence impacts creative thinking, with real-world application examples.',
          fullContent: `Recent advances in AI technology are bringing fundamental changes to our creative thinking processes.

## A New Paradigm of AI and Creativity

Traditionally, creativity was considered purely a human domain. However, with the emergence of AI tools like GPT, DALL-E, and Midjourney, the very definition of creativity is changing.

## Insights from Real Experience

Discoveries from six months of using various AI tools for creative activities:

1. **Speed of Idea Expansion**: AI instantly presents dozens of variations from a single idea.
2. **Diversity of Perspectives**: Provides new viewpoints that humans might easily miss.
3. **Liberation from Repetitive Work**: Freed from mechanical tasks to focus on higher-level thinking.

## The Future of Creative Collaboration

The relationship between AI and humans is not competition but collaboration. AI is a tool, and the essence of creativity still stems from human experience, emotion, and intuition.

Future creators will utilize AI while creating authentic works based on their unique perspectives and experiences.`,
          category: 'Creativity',
          readTime: 8,
          date: 'January 15, 2024',
          views: 1247,
          likes: 93,
          comments: 24,
          color: 'from-purple-500 to-pink-500',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
        },
        {
          id: 2,
          title: 'Deep Thinking in the Digital Age: War Against Distraction',
          excerpt: 'Exploring the impact of digital technology on our thought patterns and methods to maintain deep thinking.',
          fullContent: `Maintaining deep thinking in modern society is becoming increasingly difficult.

## The Reality of Digital Distraction

Smartphones, social media, an infinite ocean of information... our attention is constantly being dispersed. On average, people's attention gets disrupted once every 8 seconds.

## Strategies for Deep Thinking

### 1. Digital Detox
- Complete digital shutdown for 2 hours daily
- Walking without smartphones
- Writing with analog tools

### 2. Concentration Training
- Using the Pomodoro Technique
- Practicing meditation and mindfulness
- Focusing on single tasks

### 3. Environment Design
- Removing distractions
- Creating dedicated thinking spaces
- Separating activities by time zones

## Personal Experiment Results

After practicing these methods for three months, concentration improved significantly, and more creative ideas began to emerge.

Morning deep thinking sessions were particularly effective.`,
          category: 'Digital',
          readTime: 12,
          date: 'January 12, 2024',
          views: 892,
          likes: 67,
          comments: 18,
          color: 'from-blue-500 to-cyan-500',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop'
        },
        {
          id: 3,
          title: 'Journaling and AI: A New Way to Hear Your Inner Voice',
          excerpt: 'Sharing experiences of how AI-assisted journaling deepens self-reflection and insight.',
          fullContent: `Journaling is an ancient tool for self-reflection. But what happens when combined with AI?

## The Discovery of AI Journaling

I started AI-assisted journaling six months ago. It's not just writing a diary, but a process of organizing and expanding my thoughts through conversations with AI.

## The Actual Process

### Step 1: Free Writing
Every morning, spend 10 minutes freely writing whatever comes to mind.

### Step 2: Conversation with AI
Show the written content to AI and ask questions:
- "What might be the root cause of this emotion?"
- "How could this be viewed from other perspectives?"
- "What can be learned from this experience?"

### Step 3: Recording Insights
Record new perspectives or insights based on AI feedback.

## Amazing Changes

- **Improved Objectivity**: AI provides third-person perspectives, preventing emotional overwhelm
- **Pattern Recognition**: Easier to discover recurring thought or behavior patterns
- **Creative Solutions**: New approaches to problems emerge

Journaling is no longer a solitary activity. It has become a journey of inner exploration with AI as an insightful conversation partner.`,
          category: 'Journaling',
          readTime: 10,
          date: 'January 10, 2024',
          views: 654,
          likes: 45,
          comments: 12,
          color: 'from-green-500 to-teal-500',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-iwl-gradient mb-4">{t.title}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.journals.map((journal, index) => (
            <Card 
              key={journal.id} 
              className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-2"
              onClick={() => setSelectedJournal(journal)}
            >
              {/* Hero Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={journal.image}
                  alt={journal.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${journal.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-800 border-0">
                    {journal.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center text-white bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                  <Clock className="w-3 h-3 mr-1" />
                  {journal.readTime}{t.minRead}
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="group-hover:text-iwl-purple transition-colors duration-300 leading-tight">
                  {journal.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {journal.excerpt}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {journal.views}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1 text-red-400" />
                      {journal.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {journal.comments}
                    </div>
                  </div>
                </div>

                {/* Author & Date */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-8 h-8 bg-iwl-gradient rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">iWL</span>
                    </div>
                    <div>
                      <p className="text-gray-800">{t.myName}</p>
                      <p className="text-xs text-gray-500">{journal.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-iwl-purple hover:text-iwl-blue hover:bg-iwl-purple-50">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {t.readMore}
                  </Button>
                </div>
              </CardContent>

              {/* Hover overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${journal.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
            </Card>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={!!selectedJournal} onOpenChange={() => setSelectedJournal(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedJournal && (
              <>
                <DialogHeader>
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                    <img
                      src={selectedJournal.image}
                      alt={selectedJournal.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${selectedJournal.color} opacity-30`} />
                    <div className="absolute bottom-4 left-6 right-6">
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-800 border-0 mb-3">
                        {selectedJournal.category}
                      </Badge>
                      <DialogTitle className="text-white text-2xl leading-tight">
                        {selectedJournal.title}
                      </DialogTitle>
                    </div>
                  </div>
                </DialogHeader>

                {/* Article Meta */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-10 h-10 bg-iwl-gradient rounded-full flex items-center justify-center mr-3">
                      <span className="text-white">iWL</span>
                    </div>
                    <div>
                      <p className="text-gray-800">{t.myName}</p>
                      <p className="text-gray-500">{selectedJournal.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedJournal.readTime}{t.minRead}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {selectedJournal.views}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1 text-red-400" />
                      {selectedJournal.likes}
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <DialogDescription asChild>
                  <div className="prose prose-lg max-w-none">
                    {selectedJournal.fullContent.split('\n').map((paragraph: string, idx: number) => {
                      if (paragraph.startsWith('## ')) {
                        return <h2 key={idx} className="text-xl text-iwl-purple mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                      } else if (paragraph.startsWith('### ')) {
                        return <h3 key={idx} className="text-lg text-gray-800 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                      } else if (paragraph.trim() === '') {
                        return <br key={idx} />;
                      } else if (paragraph.match(/^\d+\./)) {
                        return <p key={idx} className="text-gray-700 leading-relaxed ml-4 mb-2">{paragraph}</p>;
                      } else if (paragraph.startsWith('- ')) {
                        return <p key={idx} className="text-gray-700 leading-relaxed ml-4 mb-2">{paragraph}</p>;
                      } else {
                        return <p key={idx} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>;
                      }
                    })}
                  </div>
                </DialogDescription>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      {selectedJournal.likes} {t.likes}
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {selectedJournal.comments} {t.comments}
                    </Button>
                  </div>
                  <Button onClick={() => setSelectedJournal(null)} variant="outline">
                    {t.close}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}