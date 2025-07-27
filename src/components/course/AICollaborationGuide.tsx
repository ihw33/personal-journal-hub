import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Brain, MessageCircle, Lightbulb } from 'lucide-react';

interface AICollaborationGuideProps {
  language: 'ko' | 'en';
  onToggleChatbot: () => void;
  hasUnreadMessages?: boolean;
}

export function AICollaborationGuide({ 
  language, 
  onToggleChatbot, 
  hasUnreadMessages = false 
}: AICollaborationGuideProps) {
  const content = {
    ko: {
      title: 'AI와 함께 학습하기',
      description: '이 Phase에서는 오른쪽 하단의 AI 챗봇을 활용하여 실시간으로 대화하며 학습할 수 있습니다. 모든 대화 내용은 자동으로 저장되며, Phase가 바뀌어도 이전 대화 맥락이 유지됩니다.',
      features: [
        {
          title: '💬 연결된 대화',
          description: 'Phase 1→2→3까지 하나의 연결된 대화로 진행되어 맥락이 끊어지지 않습니다.'
        },
        {
          title: '💾 자동 저장',
          description: '모든 대화 내용이 실시간으로 저장되어 제출 시 자동으로 포함됩니다.'
        }
      ],
      startButton: 'AI 챗봇 시작하기'
    },
    en: {
      title: 'Learning with AI',
      description: 'Use the AI chatbot to learn interactively with real-time conversations.',
      startButton: 'Start AI Chatbot'
    }
  };

  const t = content[language];

  return (
    <Card className="border-2 border-green-200 bg-green-50">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <MessageCircle className="w-6 h-6 text-green-600 mt-1" />
          <div>
            <h4 className="font-semibold text-green-900 mb-2 text-lg">🤖 {t.title}</h4>
            <p className="text-green-800 leading-relaxed mb-4">{t.description}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {t.features?.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <h5 className="font-medium text-green-900 mb-2">{feature.title}</h5>
                  <p className="text-sm text-green-700">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={onToggleChatbot}
                className="bg-green-600 hover:bg-green-700 text-white relative"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t.startButton}
                {hasUnreadMessages && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">•</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}