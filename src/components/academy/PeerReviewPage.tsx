import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface PeerReviewPageProps {
  user: any;
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
}

export function PeerReviewPage({ user, onNavigate, language }: PeerReviewPageProps) {
  const [reviews, setReviews] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            {language === 'ko' ? '동료 평가' : 'Peer Review'}
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>내가 받은 리뷰</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">제주도 여행 계획</h4>
                      <Badge>완료</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      매우 체계적이고 실용적인 계획입니다. 특히 날씨를 고려한 일정이 인상적이었습니다.
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      김학습자 • 2일 전
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>내가 한 리뷰</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">AI 협업 경험담</h4>
                      <Badge variant="outline">진행중</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      AI와의 협업 과정이 잘 드러나 있습니다. 구체적인 예시가 더 있으면 좋겠습니다.
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      박학습자님의 작업 • 1일 전
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              onClick={() => onNavigate('group-dashboard')}
              className="mr-4"
            >
              그룹 대시보드로
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate('dashboard')}
            >
              개인 대시보드로
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}