// v115: 베타 테스트 피드백 수집 컴포넌트
"use client";

import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Textarea } from './textarea';
import { 
  MessageSquare, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Bug, 
  Lightbulb, 
  Send,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { toast } from 'sonner';
import { useBetaFlag } from '../../lib/betaFlags';

interface BetaFeedbackProps {
  featureKey: string;
  featureName: string;
  context?: Record<string, any>;
  className?: string;
}

export function BetaFeedback({ featureKey, featureName, context, className = "" }: BetaFeedbackProps) {
  const { isEnabled: isFeedbackSystemEnabled } = useBetaFlag('feedbackSystem');
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | 'bug' | 'suggestion' | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 피드백 시스템이 비활성화된 경우 렌더링하지 않음
  if (!isFeedbackSystemEnabled) {
    return null;
  }

  const handleSubmitFeedback = async () => {
    if (!feedback.trim() || !feedbackType) {
      toast.error('피드백 유형과 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const feedbackData = {
        timestamp: new Date().toISOString(),
        featureKey,
        featureName,
        type: feedbackType,
        rating,
        feedback: feedback.trim(),
        context,
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      // 로컬 스토리지에 피드백 저장 (실제로는 서버로 전송)
      const existingFeedback = JSON.parse(localStorage.getItem('beta-feedback') || '[]');
      existingFeedback.push(feedbackData);
      
      // 최대 500개 피드백만 유지
      if (existingFeedback.length > 500) {
        existingFeedback.splice(0, existingFeedback.length - 500);
      }
      
      localStorage.setItem('beta-feedback', JSON.stringify(existingFeedback));

      toast.success('소중한 피드백을 주셔서 감사합니다! 🙏');
      
      // 폼 리셋
      setFeedback('');
      setFeedbackType(null);
      setRating(0);
      setIsExpanded(false);
      
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast.error('피드백 전송 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const feedbackTypes = [
    { key: 'positive', label: '좋았어요', icon: ThumbsUp, color: 'text-green-600 bg-green-50' },
    { key: 'negative', label: '개선이 필요해요', icon: ThumbsDown, color: 'text-red-600 bg-red-50' },
    { key: 'bug', label: '버그 발견', icon: Bug, color: 'text-orange-600 bg-orange-50' },
    { key: 'suggestion', label: '제안사항', icon: Lightbulb, color: 'text-blue-600 bg-blue-50' }
  ];

  return (
    <Card className={`border-2 border-dashed border-purple-200 bg-purple-50/30 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <CardTitle className="text-sm text-purple-800">
              베타 피드백
            </CardTitle>
            <Badge variant="outline" className="text-xs border-purple-300 text-purple-700">
              {featureName}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0 text-purple-600 hover:bg-purple-100"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          <p className="text-sm text-purple-700">
            이 기능에 대한 경험을 공유해주세요. 여러분의 피드백으로 더 나은 서비스를 만들어갑니다.
          </p>

          {/* 피드백 유형 선택 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">피드백 유형</label>
            <div className="grid grid-cols-2 gap-2">
              {feedbackTypes.map((type) => (
                <Button
                  key={type.key}
                  variant={feedbackType === type.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFeedbackType(type.key as any)}
                  className={`justify-start ${
                    feedbackType === type.key 
                      ? 'bg-purple-600 text-white' 
                      : `hover:${type.color.split(' ')[1]} ${type.color}`
                  }`}
                >
                  <type.icon className="w-4 h-4 mr-2" />
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 평점 (긍정적 피드백일 때만) */}
          {feedbackType === 'positive' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">평점</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="sm"
                    onClick={() => setRating(star)}
                    className="h-8 w-8 p-0"
                  >
                    <Star 
                      className={`w-4 h-4 ${
                        star <= rating 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-gray-300'
                      }`} 
                    />
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* 피드백 내용 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              상세 피드백 {feedbackType && <span className="text-red-500">*</span>}
            </label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={
                feedbackType === 'positive' ? '어떤 점이 좋았는지 구체적으로 알려주세요...' :
                feedbackType === 'negative' ? '어떤 부분이 개선되면 좋을지 알려주세요...' :
                feedbackType === 'bug' ? '발견한 버그나 오류에 대해 상세히 설명해주세요...' :
                feedbackType === 'suggestion' ? '새로운 아이디어나 제안사항을 자유롭게 공유해주세요...' :
                '이 기능에 대한 의견을 자유롭게 작성해주세요...'
              }
              className="min-h-[80px] resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* 액션 버튼 */}
          <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsExpanded(false);
                setFeedback('');
                setFeedbackType(null);
                setRating(0);
              }}
              className="text-gray-600"
            >
              <X className="w-4 h-4 mr-1" />
              취소
            </Button>
            <Button
              onClick={handleSubmitFeedback}
              disabled={!feedback.trim() || !feedbackType || isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              size="sm"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? '전송 중...' : '피드백 전송'}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// v115: 베타 피드백 위젯 (떠 있는 버튼)
export function BetaFeedbackWidget() {
  const { isEnabled: isFeedbackSystemEnabled } = useBetaFlag('feedbackSystem');
  const [isOpen, setIsOpen] = useState(false);

  if (!isFeedbackSystemEnabled) {
    return null;
  }

  return (
    <>
      {/* 피드백 버튼 */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        size="sm"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        피드백
        <Badge className="ml-2 bg-purple-500 text-white text-xs">Beta</Badge>
      </Button>

      {/* 피드백 모달 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-w-md w-full mx-4">
            <BetaFeedback
              featureKey="general"
              featureName="전체 서비스"
              context={{ page: window.location.pathname }}
              className="bg-white"
            />
            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}