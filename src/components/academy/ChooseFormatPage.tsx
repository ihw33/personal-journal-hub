import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ChooseFormatPageProps {
  user: any;
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
}

export function ChooseFormatPage({ user, onNavigate, language }: ChooseFormatPageProps) {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            {language === 'ko' ? '학습 형태 선택' : 'Choose Learning Format'}
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>개인 학습</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  자신만의 속도로 학습하며 개인적인 성장에 집중합니다.
                </p>
                <Button 
                  onClick={() => onNavigate('dashboard')}
                  className="w-full"
                >
                  선택하기
                </Button>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>그룹 학습</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  다른 학습자들과 함께 협력하며 학습합니다.
                </p>
                <Button 
                  onClick={() => onNavigate('group-dashboard')}
                  className="w-full"
                >
                  선택하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}