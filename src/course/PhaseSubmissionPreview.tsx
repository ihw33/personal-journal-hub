import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { FileText, BookOpen, Rocket, Star } from 'lucide-react';
import { PhaseSubmissionData, ContentText } from './types';

interface PhaseSubmissionPreviewProps {
  submissionData: PhaseSubmissionData;
  content: ContentText;
  mode: 'guided' | 'self-directed';
  phase: number;
}

export function PhaseSubmissionPreview({ 
  submissionData, 
  content, 
  mode, 
  phase 
}: PhaseSubmissionPreviewProps) {
  const getModeColor = () => {
    return mode === 'guided' 
      ? 'bg-blue-50 border-blue-200 text-blue-700'
      : 'bg-green-50 border-green-200 text-green-700';
  };

  const getModeIcon = () => {
    return mode === 'guided' ? (
      <BookOpen className="w-4 h-4 text-blue-500" />
    ) : (
      <Rocket className="w-4 h-4 text-green-500" />
    );
  };

  return (
    <div className="sticky top-24">
      <Card className="border-2 border-emerald-200 bg-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <FileText className="w-5 h-5" />
            제출 미리보기
          </CardTitle>
          <p className="text-sm text-emerald-700">강사에게 이렇게 전달됩니다</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Phase Info */}
          <div className="bg-white rounded-lg p-3">
            <h4 className="font-medium text-gray-900 text-sm mb-2">
              📊 Phase 정보
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Week:</span>
                <span className="font-medium">{submissionData.week}주차</span>
              </div>
              <div className="flex justify-between">
                <span>Phase:</span>
                <span className="font-medium">Phase {phase}</span>
              </div>
              <div className="flex justify-between">
                <span>Mode:</span>
                <Badge className={getModeColor()}>
                  {getModeIcon()}
                  <span className="ml-1">
                    {mode === 'guided' ? '🎓 가이드형' : '🚀 자기주도형'}
                  </span>
                </Badge>
              </div>
            </div>
          </div>

          {/* Learning Results */}
          <div className="bg-white rounded-lg p-3">
            <h4 className="font-medium text-gray-900 text-sm mb-2">
              🎯 학습 성과
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>소요 시간:</span>
                <span className="font-medium">{submissionData.timeSpent}</span>
              </div>
              <div className="flex justify-between">
                <span>AI 도구:</span>
                <span className="font-medium">{content.aiTools[submissionData.aiToolUsed as keyof typeof content.aiTools]}</span>
              </div>
              <div className="flex justify-between">
                <span>AI 대화:</span>
                <span className="font-medium">
                  {submissionData.chatSession ? 
                    `${submissionData.chatSession.metadata.totalMessages}개 메시지` : 
                    '없음'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="bg-white rounded-lg p-3">
            <h4 className="font-medium text-gray-900 text-sm mb-2">
              📈 품질 지표
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>만족도:</span>
                <div className="flex">
                  {Array.from({ length: submissionData.satisfaction }, (_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span>난이도:</span>
                <span className="font-medium">{submissionData.difficultyLevel}/5</span>
              </div>
              <div className="flex justify-between">
                <span>주요 발견:</span>
                <span className={submissionData.mainFindings.length > 0 ? 'text-green-600' : 'text-gray-400'}>
                  {submissionData.mainFindings.length > 0 ? '작성됨' : '미작성'}
                </span>
              </div>
            </div>
          </div>

          {/* Next Action */}
          <div className="bg-white rounded-lg p-3">
            <h4 className="font-medium text-gray-900 text-sm mb-2">
              ➡️ 다음 액션
            </h4>
            <p className="text-xs text-gray-600">
              {submissionData.submissionType === 'phase-only' 
                ? '피드백 대기 후 계속 진행'
                : '바로 다음 Phase 진행'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}