import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface GroupDashboardProps {
  user: any;
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
}

export function GroupDashboard({ user, onNavigate, language }: GroupDashboardProps) {
  const [activeGroups, setActiveGroups] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            {language === 'ko' ? '그룹 학습 대시보드' : 'Group Learning Dashboard'}
          </h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>내 그룹</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  현재 참여 중인 학습 그룹들을 확인하세요.
                </p>
                <Button className="w-full">
                  그룹 보기
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>새 그룹 만들기</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  새로운 학습 그룹을 만들어 보세요.
                </p>
                <Button className="w-full">
                  그룹 생성
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>그룹 찾기</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  관심 있는 주제의 그룹에 참여하세요.
                </p>
                <Button className="w-full">
                  그룹 검색
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline"
              onClick={() => onNavigate('choose-format')}
            >
              학습 형태 다시 선택
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}