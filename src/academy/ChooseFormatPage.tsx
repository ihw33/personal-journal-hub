import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Users, User, Clock, BookOpen, MessageCircle, Trophy } from 'lucide-react';

interface ChooseFormatPageProps {
  user: any;
  onNavigate: (page: string, params?: any) => void;
  language: 'ko' | 'en';
}

const ChooseFormatPage: React.FC<ChooseFormatPageProps> = ({
  user,
  onNavigate,
  language
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'individual' | 'group' | null>(null);

  const content = {
    ko: {
      title: '학습 형태 선택',
      subtitle: 'AI와 함께 어떤 방식으로 학습하시겠습니까?',
      individual: {
        title: '개인 학습',
        description: 'AI와 1:1로 깊이 있는 학습을 진행합니다',
        features: [
          '개인 맞춤형 AI 멘토링',
          '자유로운 학습 속도 조절',
          '개인화된 피드백',
          '언제든 시작 가능'
        ],
        duration: '8주 과정',
        price: '월 49,000원'
      },
      group: {
        title: '그룹 학습',
        description: '동료들과 함께 협력하며 AI와 학습합니다',
        features: [
          '동료와의 협력 학습',
          '그룹 토론 및 피어 리뷰',
          'AI 그룹 퍼실리테이션',
          '정기 그룹 세션'
        ],
        duration: '8주 과정',
        price: '월 69,000원'
      },
      continue: '계속하기',
      back: '뒤로가기'
    },
    en: {
      title: 'Choose Learning Format',
      subtitle: 'How would you like to learn with AI?',
      individual: {
        title: 'Individual Learning',
        description: 'Deep one-on-one learning with AI',
        features: [
          'Personalized AI mentoring',
          'Flexible learning pace',
          'Personalized feedback',
          'Start anytime'
        ],
        duration: '8-week course',
        price: '$49/month'
      },
      group: {
        title: 'Group Learning',
        description: 'Collaborative learning with peers and AI',
        features: [
          'Collaborative learning',
          'Group discussions & peer review',
          'AI group facilitation',
          'Regular group sessions'
        ],
        duration: '8-week course',
        price: '$69/month'
      },
      continue: 'Continue',
      back: 'Back'
    }
  };

  const t = content[language];

  const handleFormatSelect = (format: 'individual' | 'group') => {
    setSelectedFormat(format);
  };

  const handleContinue = () => {
    if (selectedFormat === 'individual') {
      onNavigate('jeju-course');
    } else if (selectedFormat === 'group') {
      onNavigate('group-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-iwl-purple-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-iwl-gradient mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Format Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Individual Learning */}
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedFormat === 'individual' 
                ? 'ring-2 ring-iwl-purple shadow-lg transform scale-105' 
                : 'hover:scale-102'
            }`}
            onClick={() => handleFormatSelect('individual')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-iwl-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                <User className="w-8 h-8 text-iwl-purple" />
              </div>
              <CardTitle className="text-2xl text-iwl-gradient">
                {t.individual.title}
              </CardTitle>
              <CardDescription className="text-lg">
                {t.individual.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  {t.individual.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-iwl-gradient rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Duration & Price */}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{t.individual.duration}</span>
                    </div>
                    <Badge variant="secondary" className="bg-iwl-blue-100 text-iwl-blue">
                      {t.individual.price}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Group Learning */}
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedFormat === 'group' 
                ? 'ring-2 ring-iwl-blue shadow-lg transform scale-105' 
                : 'hover:scale-102'
            }`}
            onClick={() => handleFormatSelect('group')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-iwl-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Users className="w-8 h-8 text-iwl-blue" />
              </div>
              <CardTitle className="text-2xl text-iwl-gradient">
                {t.group.title}
              </CardTitle>
              <CardDescription className="text-lg">
                {t.group.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  {t.group.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-iwl-gradient rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Duration & Price */}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{t.group.duration}</span>
                    </div>
                    <Badge variant="secondary" className="bg-iwl-purple-100 text-iwl-purple">
                      {t.group.price}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Features */}
        <div className="mb-12">
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                {language === 'ko' ? '두 형태 모두 포함되는 기능' : 'Features Included in Both Formats'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <BookOpen className="w-8 h-8 text-iwl-purple mx-auto mb-2" />
                  <div className="font-medium">
                    {language === 'ko' ? 'AI 멘토링' : 'AI Mentoring'}
                  </div>
                </div>
                <div className="text-center">
                  <MessageCircle className="w-8 h-8 text-iwl-blue mx-auto mb-2" />
                  <div className="font-medium">
                    {language === 'ko' ? '실시간 대화' : 'Real-time Chat'}
                  </div>
                </div>
                <div className="text-center">
                  <Trophy className="w-8 h-8 text-iwl-purple mx-auto mb-2" />
                  <div className="font-medium">
                    {language === 'ko' ? '성취 추적' : 'Progress Tracking'}
                  </div>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-iwl-blue mx-auto mb-2" />
                  <div className="font-medium">
                    {language === 'ko' ? '24/7 접근' : '24/7 Access'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('courses')}
            className="px-8 py-3"
          >
            {t.back}
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={!selectedFormat}
            className="bg-iwl-gradient hover:opacity-90 text-white px-8 py-3"
          >
            {t.continue}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ChooseFormatPage };