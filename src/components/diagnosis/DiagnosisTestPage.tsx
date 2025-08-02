/**
 * IdeaWorkLab v4.0 DiagnosisTestPage
 * 사고 유형 진단 테스트 실행 페이지
 */

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Brain, ChevronLeft, ChevronRight, Clock, Target } from 'lucide-react';

interface DiagnosisTestPageProps {
  onComplete?: (answers: TestAnswer[]) => void;
  onBack?: () => void;
}

interface TestQuestion {
  id: string;
  category: '관찰' | '질문' | '분석' | '연결' | '상상' | '종합' | '평가' | '실행';
  question: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    value: number;
    style: string;
  }[];
}

interface TestAnswer {
  questionId: string;
  optionId: string;
  category: string;
  value: number;
  style: string;
}

const questions: TestQuestion[] = [
  {
    id: 'q1',
    category: '관찰',
    question: '새로운 프로젝트를 시작할 때 가장 먼저 하는 일은?',
    scenario: '회사에서 새로운 마케팅 캠페인을 기획하게 되었습니다.',
    options: [
      { id: 'a', text: '성공한 유사 사례들을 자세히 분석한다', value: 4, style: '분석적' },
      { id: 'b', text: '시장 동향과 고객 데이터를 꼼꼼히 살펴본다', value: 4, style: '체계적' },
      { id: 'c', text: '팀원들과 브레인스토밍을 진행한다', value: 3, style: '협력적' },
      { id: 'd', text: '일단 작은 실험부터 시작해본다', value: 3, style: '실험적' }
    ]
  },
  {
    id: 'q2',
    category: '질문',
    question: '문제 상황에서 가장 중요하게 생각하는 질문은?',
    scenario: '프로젝트 진행 중 예상치 못한 문제가 발생했습니다.',
    options: [
      { id: 'a', text: '왜 이런 일이 발생했을까?', value: 4, style: '원인탐구형' },
      { id: 'b', text: '어떻게 해결할 수 있을까?', value: 4, style: '해결중심형' },
      { id: 'c', text: '이것이 다른 부분에 어떤 영향을 줄까?', value: 3, style: '연결사고형' },
      { id: 'd', text: '이 기회를 어떻게 활용할 수 있을까?', value: 3, style: '기회탐색형' }
    ]
  },
  {
    id: 'q3',
    category: '분석',
    question: '복잡한 데이터를 분석할 때 선호하는 방식은?',
    scenario: '수백 페이지의 시장 조사 보고서를 검토해야 합니다.',
    options: [
      { id: 'a', text: '핵심 지표부터 차례대로 분석한다', value: 4, style: '구조적' },
      { id: 'b', text: '전체적인 패턴을 먼저 파악한다', value: 4, style: '직관적' },
      { id: 'c', text: '다양한 관점에서 교차 검증한다', value: 3, style: '다각적' },
      { id: 'd', text: '가설을 세우고 검증해나간다', value: 3, style: '가설검증형' }
    ]
  },
  {
    id: 'q4',
    category: '연결',
    question: '아이디어를 발전시킬 때 주로 사용하는 방법은?',
    scenario: '새로운 서비스 아이디어를 더 발전시켜야 합니다.',
    options: [
      { id: 'a', text: '다른 업계의 성공 사례와 연결해본다', value: 4, style: '연결사고형' },
      { id: 'b', text: '기존 지식과 경험을 조합한다', value: 4, style: '경험활용형' },
      { id: 'c', text: '전혀 다른 분야에서 영감을 찾는다', value: 3, style: '창의적' },
      { id: 'd', text: '사용자 관점에서 다시 생각한다', value: 3, style: '사용자중심형' }
    ]
  },
  {
    id: 'q5',
    category: '상상',
    question: '미래 계획을 세울 때 가장 중요하게 생각하는 것은?',
    scenario: '5년 후 회사의 비전을 설계해야 합니다.',
    options: [
      { id: 'a', text: '현실적으로 달성 가능한 목표 설정', value: 3, style: '현실적' },
      { id: 'b', text: '혁신적이고 도전적인 비전 제시', value: 4, style: '혁신적' },
      { id: 'c', text: '다양한 시나리오 준비', value: 4, style: '전략적' },
      { id: 'd', text: '변화에 유연하게 대응할 수 있는 계획', value: 3, style: '적응적' }
    ]
  },
  {
    id: 'q6',
    category: '종합',
    question: '여러 의견이 충돌할 때 주로 취하는 접근법은?',
    scenario: '팀 회의에서 서로 다른 세 가지 의견이 제시되었습니다.',
    options: [
      { id: 'a', text: '각 의견의 장단점을 체계적으로 정리한다', value: 4, style: '분석적' },
      { id: 'b', text: '모든 의견을 통합할 수 있는 방안을 찾는다', value: 4, style: '통합적' },
      { id: 'c', text: '가장 합리적인 의견을 선택한다', value: 3, style: '논리적' },
      { id: 'd', text: '새로운 대안을 제시한다', value: 3, style: '창의적' }
    ]
  },
  {
    id: 'q7',
    category: '평가',
    question: '프로젝트 성과를 평가할 때 가장 중요한 기준은?',
    scenario: '진행 중인 프로젝트의 중간 평가를 해야 합니다.',
    options: [
      { id: 'a', text: '설정된 목표 달성도', value: 4, style: '목표지향적' },
      { id: 'b', text: '과정에서의 학습과 개선점', value: 4, style: '학습지향적' },
      { id: 'c', text: '예상치 못한 긍정적 효과', value: 3, style: '발견적' },
      { id: 'd', text: '팀워크와 협업 수준', value: 3, style: '협력지향적' }
    ]
  },
  {
    id: 'q8',
    category: '실행',
    question: '새로운 아이디어를 실행할 때 가장 먼저 하는 일은?',
    scenario: '혁신적인 아이디어가 떠올랐고 실행에 옮겨야 합니다.',
    options: [
      { id: 'a', text: '구체적인 실행 계획을 수립한다', value: 4, style: '계획적' },
      { id: 'b', text: '작은 규모로 시범 운영한다', value: 4, style: '실험적' },
      { id: 'c', text: '필요한 자원과 인력을 확보한다', value: 3, style: '준비적' },
      { id: 'd', text: '관련자들의 동의를 구한다', value: 3, style: '소통적' }
    ]
  }
];

export const DiagnosisTestPage: React.FC<DiagnosisTestPageProps> = ({
  onComplete = () => {},
  onBack = () => {}
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const progress = ((currentQuestion) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleOptionSelect = useCallback((optionId: string) => {
    setSelectedOption(optionId);
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedOption) return;

    const selectedOptionData = question.options.find(opt => opt.id === selectedOption);
    if (!selectedOptionData) return;

    const newAnswer: TestAnswer = {
      questionId: question.id,
      optionId: selectedOption,
      category: question.category,
      value: selectedOptionData.value,
      style: selectedOptionData.style
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption('');
    } else {
      setIsLoading(true);
      setTimeout(() => {
        onComplete(updatedAnswers);
      }, 1500);
    }
  }, [selectedOption, question, answers, currentQuestion, onComplete]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setAnswers(prev => prev.slice(0, -1));
      setSelectedOption('');
    } else {
      onBack();
    }
  }, [currentQuestion, onBack]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Brain className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            AI 아키가 분석 중입니다...
          </h2>
          <p className="text-lg text-gray-600">
            당신의 사고 패턴을 정밀하게 분석하고 있어요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                className="text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                이전
              </Button>
              
              <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                {currentQuestion + 1} / {questions.length}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>약 {Math.ceil((questions.length - currentQuestion) * 1.5)}분 남음</span>
            </div>
          </div>

          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <Badge 
                  variant="outline" 
                  className="bg-purple-50 text-purple-600 border-purple-200 text-sm font-medium"
                >
                  {question.category} 단계
                </Badge>
              </div>

              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
                {question.question}
              </CardTitle>

              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-purple-500">
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  <strong>상황:</strong> {question.scenario}
                </p>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full p-4 md:p-6 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      selectedOption === option.id
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        selectedOption === option.id
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedOption === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <p className={`text-base md:text-lg font-medium mb-2 ${
                          selectedOption === option.id ? 'text-purple-900' : 'text-gray-900'
                        }`}>
                          {option.text}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            selectedOption === option.id 
                              ? 'bg-purple-100 text-purple-700 border-purple-300' 
                              : 'bg-gray-100 text-gray-600 border-gray-300'
                          }`}
                        >
                          {option.style}
                        </Badge>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion < questions.length - 1 ? '다음 질문' : '진단 완료'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisTestPage;