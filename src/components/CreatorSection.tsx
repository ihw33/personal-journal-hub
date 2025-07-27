import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Quote, ExternalLink, MapPin, Calendar } from 'lucide-react';

interface CreatorSectionProps {
  language: 'ko' | 'en';
}

export function CreatorSection({ language }: CreatorSectionProps) {
  const content = {
    ko: {
      title: '크리에이터 소개',
      subtitle: 'Idea Work Lab을 만든 사람들을 만나보세요',
      meetCreator: '크리에이터 만나기',
      experience: '년 경험',
      location: '위치',
      joined: '참여',
      creators: [
        {
          name: '김지혜',
          role: 'AI 사고 전문가',
          bio: '10년간 AI와 인간의 사고 과정을 연구해온 전문가입니다. 깊이 있는 사고와 AI의 조화로운 협력을 통해 새로운 가치를 창출합니다.',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1a5?w=150&h=150&fit=crop&crop=face',
          experience: 10,
          location: '서울, 한국',
          joinDate: '2023년 3월',
          specialties: ['AI 윤리', '창의적 사고', '디자인 씽킹'],
          quote: '진정한 혁신은 인간의 창의성과 AI의 능력이 만날 때 일어납니다.'
        },
        {
          name: '박민수',
          role: '디지털 교육 디자이너',
          bio: '교육 기술과 학습 경험 디자인 분야에서 8년간 활동해온 전문가입니다. 개인화된 학습 여정을 통해 깊이 있는 사고를 촉진합니다.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          experience: 8,
          location: '부산, 한국',
          joinDate: '2023년 5월',
          specialties: ['학습 설계', '사용자 경험', '교육 기술'],
          quote: '최고의 학습은 개인의 호기심과 체계적인 가이드가 만날 때 발생합니다.'
        }
      ]
    },
    en: {
      title: 'Meet the Creators',
      subtitle: 'Get to know the people behind Idea Work Lab',
      meetCreator: 'Meet the Creator',
      experience: 'years experience',
      location: 'Location',
      joined: 'Joined',
      creators: [
        {
          name: 'Kim Jihye',
          role: 'AI Thinking Specialist',
          bio: 'An expert who has researched AI and human thought processes for 10 years. Creates new value through harmonious collaboration between deep thinking and AI.',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1a5?w=150&h=150&fit=crop&crop=face',
          experience: 10,
          location: 'Seoul, Korea',
          joinDate: 'March 2023',
          specialties: ['AI Ethics', 'Creative Thinking', 'Design Thinking'],
          quote: 'True innovation happens when human creativity meets AI capabilities.'
        },
        {
          name: 'Park Minsu',
          role: 'Digital Education Designer',
          bio: 'An expert with 8 years of experience in educational technology and learning experience design. Promotes deep thinking through personalized learning journeys.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          experience: 8,
          location: 'Busan, Korea',
          joinDate: 'May 2023',
          specialties: ['Learning Design', 'User Experience', 'Educational Technology'],
          quote: 'The best learning occurs when personal curiosity meets systematic guidance.'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-iwl-gradient mb-4">{t.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {t.creators.map((creator, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8">
                {/* Quote Section */}
                <div className="mb-8 p-6 bg-iwl-purple-50 rounded-lg relative">
                  <Quote className="w-8 h-8 text-iwl-purple/30 absolute top-4 left-4" />
                  <p className="text-iwl-purple italic pl-8 leading-relaxed">
                    "{creator.quote}"
                  </p>
                </div>

                {/* Creator Info */}
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <ImageWithFallback
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-iwl-gradient rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{creator.name}</h3>
                    <p className="text-iwl-purple mb-4">{creator.role}</p>
                    
                    <div className="grid grid-cols-1 gap-3 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>{creator.experience}{t.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{t.location}: {creator.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{t.joined}: {creator.joinDate}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {creator.bio}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {creator.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-iwl-blue-50 text-iwl-blue hover:bg-iwl-blue-100">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full group-hover:bg-iwl-gradient group-hover:text-white group-hover:border-transparent transition-all duration-300">
                      {t.meetCreator}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}