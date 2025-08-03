/**
 * IdeaWorkLab v4.0 Diagnosis Results Page
 * 사고 유형 진단 결과 표시 페이지 (/diagnosis/results)
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiagnosisResultPage } from '@/components/diagnosis/DiagnosisResultPage';
import { secureSessionStorage } from '@/lib/security';

interface TestAnswer {
  questionId: string;
  optionId: string;
  category: string;
  value: number;
  style: string;
}

interface DiagnosisResults {
  primaryStyle: string;
  secondaryStyle: string;
  scores: Record<string, number>;
  recommendations: string[];
  growthAreas: string[];
}

// Function to calculate results from test answers
function calculateResults(answers: TestAnswer[]): DiagnosisResults {
  const categoryScores: Record<string, number[]> = {};
  const styleFrequency: Record<string, number> = {};

  answers.forEach(answer => {
    // Track category scores
    if (!categoryScores[answer.category]) {
      categoryScores[answer.category] = [];
    }
    categoryScores[answer.category].push(answer.value);

    // Track style frequency
    styleFrequency[answer.style] = (styleFrequency[answer.style] || 0) + 1;
  });

  // Calculate average scores for each category
  const scores: Record<string, number> = {};
  Object.entries(categoryScores).forEach(([category, values]) => {
    scores[category] = Math.round(values.reduce((sum, val) => sum + val, 0) / values.length * 25);
  });

  // Determine primary and secondary thinking styles
  const sortedStyles = Object.entries(styleFrequency)
    .sort(([,a], [,b]) => b - a)
    .map(([style]) => style);

  const styleMapping: Record<string, string> = {
    '분석적': '체계적분석가',
    '체계적': '체계적분석가',
    '구조적': '체계적분석가',
    '논리적': '체계적분석가',
    '창의적': '창의적탐험가',
    '혁신적': '창의적탐험가',
    '직관적': '창의적탐험가',
    '발견적': '창의적탐험가',
    '실험적': '실용적실행가',
    '계획적': '실용적실행가',
    '목표지향적': '실용적실행가',
    '해결중심형': '실용적실행가',
    '협력적': '협력적조율가',
    '소통적': '협력적조율가',
    '사용자중심형': '협력적조율가',
    '협력지향적': '협력적조율가'
  };

  const primaryStyle = styleMapping[sortedStyles[0]] || '체계적분석가';
  const secondaryStyle = styleMapping[sortedStyles[1]] || '실용적실행가';

  // Generate recommendations based on results
  const recommendations = [
    'AI 기반 데이터 분석 강의로 체계적 사고 역량 강화',
    '프로젝트 관리 및 실행 전략 과정 수강',
    '창의적 문제 해결 워크숍으로 상상력 개발',
    '팀 리더십과 소통 스킬 향상 프로그램'
  ];

  // Identify growth areas based on lowest scores
  const lowestScores = Object.entries(scores)
    .sort(([,a], [,b]) => a - b)
    .slice(0, 3)
    .map(([category]) => category);

  const growthMapping: Record<string, string> = {
    '상상': '상상력과 창의성 개발',
    '연결': '통합적 사고와 연결성 강화',
    '질문': '비판적 사고와 질문 역량 향상',
    '실행': '실행력과 행동 계획 수립 능력 개발',
    '관찰': '정보 수집과 패턴 인식 능력 강화',
    '분석': '논리적 분석과 체계적 사고 개발',
    '종합': '통합적 판단과 의사결정 역량 향상',
    '평가': '비판적 평가와 검증 능력 강화'
  };

  const growthAreas = lowestScores.map(category => 
    growthMapping[category] || `${category} 역량 강화`
  );

  return {
    primaryStyle,
    secondaryStyle,
    scores,
    recommendations,
    growthAreas
  };
}

export default function DiagnosisResultsPageRoute() {
  const router = useRouter();
  const [results, setResults] = useState<DiagnosisResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const answers = secureSessionStorage.getItem('diagnosisAnswers');
        
        if (answers && Array.isArray(answers)) {
          const calculatedResults = calculateResults(answers as TestAnswer[]);
          setResults(calculatedResults);
        } else {
          // No test data found, redirect to diagnosis start
          router.push('/diagnosis');
          return;
        }
      } catch (error) {
        console.error('Error retrieving diagnosis answers:', error);
        router.push('/diagnosis');
        return;
      }
    }
    setIsLoading(false);
  }, [router]);

  const handleNavigate = (page: string, params?: any) => {
    switch (page) {
      case 'courses':
        router.push('/courses');
        break;
      case 'journal':
        router.push('/journal');
        break;
      case 'about':
        router.push('/about');
        break;
      default:
        router.push('/');
    }
  };

  const handleRetake = () => {
    // Clear previous results
    if (typeof window !== 'undefined') {
      secureSessionStorage.removeItem('diagnosisAnswers');
    }
    router.push('/diagnosis');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-iwl-primary-50 to-iwl-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-architect-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-iwl-primary-50 to-iwl-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">진단 결과를 찾을 수 없습니다.</p>
          <button 
            onClick={() => router.push('/diagnosis')}
            className="bg-architect-primary text-white px-6 py-3 rounded-lg hover:bg-architect-secondary transition-colors"
          >
            새로 진단하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <DiagnosisResultPage
      results={results}
      onNavigate={handleNavigate}
      onRetake={handleRetake}
    />
  );
}