import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FileText, Send, ArrowRight, MessageSquare, Lightbulb } from 'lucide-react';

interface SubmissionOptionsProps {
  language: 'ko' | 'en';
  week: number;
  phase: number;
  hasNextPhase: boolean;
  onSubmissionChoice: (type: 'phase-submit' | 'weekly-submit' | 'continue') => void;
}

export function SubmissionOptions({ 
  language, 
  week, 
  phase, 
  hasNextPhase, 
  onSubmissionChoice 
}: SubmissionOptionsProps) {
  const content = {
    ko: {
      title: '실습 완료 후 어떻게 진행하시겠어요?',
      subtitle: 'AI 대화 내용이 자동으로 저장되어 제출됩니다',
      phaseSubmit: {
        title: 'Phase별 즉시 제출',
        description: 'AI 대화 내용을 포함하여 지금 바로 제출하고 개별 피드백 받기',
        benefits: ['즉시 피드백', 'AI 대화 자동 포함', '세밀한 지도']
      },
      continueNext: {
        title: '계속 진행하기',
        description: 'AI 대화를 이어가며 다음 Phase로 바로 이동',
        benefits: ['대화 맥락 유지', '빠른 진행', '통합적 사고']
      },
      weeklySubmit: {
        title: '주차별 통합 제출',
        description: '전체 AI 대화 내용을 포함하여 주차 결과를 한번에 제출',
        benefits: ['통합 피드백', '전체 대화 포함', '기존 방식']
      },
      autoInclude: {
        title: 'AI 대화 자동 포함',
        subtitle: '모든 제출 방식에 AI 대화 내용이 자동으로 포함됩니다:',
        items: [
          '📝 대화 전체 기록 (Phase별 구분)',
          '🎯 Phase별 주요 인사이트',
          '⏰ 대화 시간 및 진행 과정',
          '🔗 Phase 간 연결성 분석'
        ]
      },
      buttons: {
        phaseSubmit: `Phase ${phase} 제출하기`,
        continueNext: hasNextPhase ? `Phase ${phase + 1} 시작` : '주차 완료',
        weeklySubmit: `${week}주차 통합 제출`
      }
    },
    en: {
      title: 'How would you like to proceed after completing the practice?',
      subtitle: 'AI conversation content will be automatically saved and submitted'
    }
  };

  const t = content[language];

  return (
    <Card className="border-2 border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-xl text-orange-900 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          {t.title}
        </CardTitle>
        <p className="text-orange-700">{t.subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Phase별 즉시 제출 */}
          <Card className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-blue-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t.phaseSubmit.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{t.phaseSubmit.description}</p>
              <ul className="text-xs text-gray-500 space-y-1 mb-4">
                {t.phaseSubmit.benefits.map((benefit, index) => (
                  <li key={index}>✅ {benefit}</li>
                ))}
              </ul>
              <Button 
                onClick={() => onSubmissionChoice('phase-submit')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                {t.buttons.phaseSubmit}
              </Button>
            </CardContent>
          </Card>

          {/* 다음 Phase 계속 */}
          <Card className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-green-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t.continueNext.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{t.continueNext.description}</p>
              <ul className="text-xs text-gray-500 space-y-1 mb-4">
                {t.continueNext.benefits.map((benefit, index) => (
                  <li key={index}>✅ {benefit}</li>
                ))}
              </ul>
              <Button 
                onClick={() => onSubmissionChoice('continue')}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                disabled={!hasNextPhase}
              >
                {t.buttons.continueNext}
              </Button>
            </CardContent>
          </Card>

          {/* 주차별 통합 제출 */}
          <Card className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-purple-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t.weeklySubmit.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{t.weeklySubmit.description}</p>
              <ul className="text-xs text-gray-500 space-y-1 mb-4">
                {t.weeklySubmit.benefits.map((benefit, index) => (
                  <li key={index}>✅ {benefit}</li>
                ))}
              </ul>
              <Button 
                onClick={() => onSubmissionChoice('weekly-submit')}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white"
              >
                {t.buttons.weeklySubmit}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border border-orange-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-orange-900 mb-2">{t.autoInclude.title}</h5>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>{t.autoInclude.subtitle}</strong></p>
                {t.autoInclude.items.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}