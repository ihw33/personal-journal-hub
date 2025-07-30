import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { 
  ChevronDown,
  ChevronUp,
  Play,
  BookOpen,
  Lightbulb,
  Target,
  Clock,
  Copy,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Brain,
  Zap,
  FileText,
  MessageCircle,
  ArrowRight,
  Settings,
  HelpCircle,
  Star,
  Download,
  Link as LinkIcon
} from 'lucide-react';
import { toast } from 'sonner';

// Theory Block Component
interface TheoryBlockProps {
  title: string;
  duration: string;
  concepts: Array<{
    title: string;
    content: string;
  }>;
  videoUrl?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function TheoryBlock({ 
  title, 
  duration, 
  concepts, 
  videoUrl, 
  isExpanded = false, 
  onToggle 
}: TheoryBlockProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <Collapsible open={expanded} onOpenChange={handleToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-blue-100 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-blue-900">{title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-700">{duration}</span>
                  </div>
                </div>
              </div>
              {expanded ? (
                <ChevronUp className="w-5 h-5 text-blue-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-blue-600" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {concepts.map((concept, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">{concept.title}</h4>
                  <p className="text-blue-800 leading-relaxed">{concept.content}</p>
                </div>
              ))}
              
              {videoUrl && (
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Play className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">이론 영상 학습</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      영상 보기
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

// Video Block Component
interface VideoBlockProps {
  title: string;
  duration: string;
  url: string;
  materials?: Array<{
    name: string;
    url: string;
    type: 'link' | 'download';
  }>;
  isRequired?: boolean;
}

export function VideoBlock({ title, duration, url, materials, isRequired = false }: VideoBlockProps) {
  return (
    <Card className="border-2 border-purple-200 bg-purple-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-purple-900">{title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-700">{duration}</span>
                {isRequired && (
                  <Badge variant="destructive" className="text-xs">필수</Badge>
                )}
              </div>
            </div>
          </div>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white">
            <Play className="w-4 h-4 mr-2" />
            재생
          </Button>
        </div>
      </CardHeader>
      
      {materials && materials.length > 0 && (
        <CardContent>
          <h4 className="font-medium text-purple-900 mb-3">📋 학습 자료</h4>
          <div className="space-y-2">
            {materials.map((material, index) => (
              <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border border-purple-200">
                <span className="text-purple-800">{material.name}</span>
                <Button variant="outline" size="sm">
                  {material.type === 'download' ? (
                    <>
                      <Download className="w-4 h-4 mr-1" />
                      다운로드
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-4 h-4 mr-1" />
                      링크 열기
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// Concept Block Component
interface ConceptBlockProps {
  title: string;
  content: string;
  keyPoints: string[];
}

export function ConceptBlock({ title, content, keyPoints }: ConceptBlockProps) {
  return (
    <Card className="border-2 border-yellow-200 bg-yellow-50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-yellow-900">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-yellow-800 leading-relaxed mb-4">{content}</p>
        
        <div className="bg-white rounded-lg p-4 border border-yellow-200">
          <h4 className="font-medium text-yellow-900 mb-3">🔑 핵심 포인트</h4>
          <ul className="space-y-2">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span className="text-yellow-800">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

// Practice Block Component - 통합 실습 버튼으로 간소화
interface PracticeBlockProps {
  phaseNumber: number;
  title: string;
  duration: string;
  description: string;
  objective: string;
  thinkingProcess: string;
  selfGuideQuestions: string[];
  examplePrompts: Array<{
    id: string;
    title: string;
    content: string;
    variables?: string[];
    aiTool: 'claude' | 'chatgpt' | 'both' | 'integrated';
    isExample?: boolean;
  }>;
  tips: string[];
  warnings: string[];
  mode?: 'guided' | 'self-directed'; // 모드 정보 추가
  onStartPractice?: () => void;
}

export function PracticeBlock({
  phaseNumber,
  title,
  duration,
  description,
  objective,
  thinkingProcess,
  selfGuideQuestions,
  examplePrompts,
  tips,
  warnings,
  mode = 'guided', // 기본값 가이드형
  onStartPractice
}: PracticeBlockProps) {
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [selfCreatedQuestions, setSelfCreatedQuestions] = useState<{[key: number]: string}>({});

  const copyPrompt = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('프롬프트가 복사되었습니다! AI 실습에서 사용해보세요.');
  };

  // 가이드형 질문에 설명 추가 함수
  const getGuidedQuestionsWithExplanations = (questions: string[], phase: number) => {
    const explanations = {
      1: [ // Phase 1 - 최초 탐색
        "기본적인 연상을 통해 자신의 제주도에 대한 인식을 파악하고 AI와의 대화 출발점을 마련합니다.",
        "제주도의 독특함을 인식함으로써 여행 계획의 차별화 포인트를 찾아내는 데 도움이 됩니다.",
        "구체적인 활동 계획을 세우기 위해 개인의 관심사와 선호도를 명확히 파악하는 질문입니다.",
        "여행의 우선순위를 정하고 의사결정 기준을 설정하기 위한 가치관 확인 질문입니다."
      ],
      2: [ // Phase 2 - 심화 탐색
        "1단계에서 수집한 정�� 중 가장 인상 깊었던 부분을 파악하여 개인화된 여행 방향을 설정합니다.",
        "이상적인 계획과 현실적 제약 사이의 균형점을 찾아 실행 가능한 계획을 수립합니다.",
        "함께 여행하는 사람들의 만족도를 고려하여 조화로운 여행 계획을 만드는 데 필요합니다.",
        "여행 시기에 따른 최적의 활동을 선별하여 날씨와 계절적 요인을 고려한 계획을 세웁니다."
      ],
      3: [ // Phase 3 - 수집 정리
        "여러 옵션을 객관적으로 평가하여 가장 적합한 여행 컨셉을 선택하는 데 필요한 질문입니다.",
        "예산과 시간이라는 핵심 제약 조건을 고려하여 현실적인 선택을 하기 위한 질문입니다.",
        "동행인들의 기대치와 만족도를 예측하여 갈등 없는 여행을 만들기 위한 고려사항입니다.",
        "여행 후 만족도를 예상해보며 최종 결정에 대한 확신을 갖기 위한 질문입니다."
      ]
    };

    return questions.map((question, index) => ({
      question,
      explanation: explanations[phase as keyof typeof explanations]?.[index] || "이 질문을 통해 더 깊이 있는 사고와 분석이 가능합니다."
    }));
  };

  // 가이드형 질문 선택 핸들러
  const handleQuestionSelect = (index: number, question: string, checked: boolean) => {
    if (checked) {
      setSelectedQuestions(prev => [...prev, question]);
    } else {
      setSelectedQuestions(prev => prev.filter(q => q !== question));
    }
  };

  // 자기주도형 질문 작성 핸들러
  const handleSelfQuestionChange = (questionNum: number, value: string) => {
    setSelfCreatedQuestions(prev => ({
      ...prev,
      [questionNum]: value
    }));
  };

  // 선택된 질문들 저장하기 (채팅방에서 사용할 수 있도록)
  const saveSelectedQuestions = () => {
    const questionsData = {
      mode,
      phase: phaseNumber,
      selectedQuestions: mode === 'guided' ? selectedQuestions : Object.values(selfCreatedQuestions).filter(q => q.trim())
    };
    
    localStorage.setItem(`questions-phase-${phaseNumber}`, JSON.stringify(questionsData));
    
    if (onStartPractice) {
      onStartPractice();
    }
  };

  return (
    <Card className="border-2 border-iwl-purple/20 bg-gradient-to-br from-iwl-purple-50 to-iwl-blue-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-iwl-purple rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-iwl-purple">{title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-iwl-blue" />
                <span className="text-sm text-iwl-blue">{duration}</span>
                <Badge variant="outline" className="border-iwl-purple text-iwl-purple text-xs">
                  Phase {phaseNumber}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Practice Overview */}
        <div className="bg-white/80 rounded-lg p-4 border border-iwl-purple/20">
          <h4 className="font-semibold text-gray-900 mb-2">📝 실습 개요</h4>
          <p className="text-gray-700 mb-3">{description}</p>
          <div className="bg-iwl-purple-50 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-iwl-purple mt-0.5" />
              <div>
                <span className="font-medium text-iwl-purple">목표: </span>
                <span className="text-gray-700">{objective}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thinking Process */}
        <div className="bg-white/80 rounded-lg p-4 border border-iwl-blue/20">
          <h4 className="font-semibold text-iwl-blue mb-2">🧠 생각하는 과정</h4>
          <p className="text-gray-700 leading-relaxed">{thinkingProcess}</p>
        </div>

        {/* Questions Section - 모드별 차별화 */}
        <div className="bg-white/80 rounded-lg p-4 border border-iwl-purple/20">
          {mode === 'guided' ? (
            <>
              <h4 className="font-semibold text-iwl-purple mb-3">📋 제공된 질문 중에서 선택하세요</h4>
              <p className="text-sm text-gray-600 mb-4">
                아래 제공된 질문들 중에서 관심 있는 것들을 선택하여 AI와 대화해보세요. 
                체크박스를 클릭하여 선택한 후 AI 실습에서 활용하세요.
              </p>
              <div className="space-y-3">
                {getGuidedQuestionsWithExplanations(selfGuideQuestions, phaseNumber).map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3 p-3">
                      <input 
                        type="checkbox" 
                        id={`question-${index}`}
                        className="mt-1 w-4 h-4 text-iwl-purple border-gray-300 rounded focus:ring-iwl-purple"
                        onChange={(e) => handleQuestionSelect(index, item.question, e.target.checked)}
                      />
                      <label htmlFor={`question-${index}`} className="text-gray-700 cursor-pointer flex-1">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="font-medium text-iwl-purple">{index + 1}.</span>
                          <span className="font-medium">{item.question}</span>
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-50 rounded p-2 border-l-2 border-iwl-purple/30">
                          <span className="font-medium">💡 왜 이 질문이 필요한가요?</span><br/>
                          {item.explanation}
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-iwl-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-iwl-purple">
                    💡 <strong>가이드형 방식</strong>
                  </p>
                  {selectedQuestions.length > 0 && (
                    <Badge className="bg-iwl-purple text-white text-xs">
                      {selectedQuestions.length}개 선택됨
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-iwl-purple">
                  {selectedQuestions.length > 0 
                    ? '선택한 질문들이 AI 실습 시작 시 표시되어 체계적으로 대화를 진행할 수 있습니다!'
                    : '질문을 선택하지 않아도 AI 실습을 시작할 수 있습니다. 자유롭게 대화해보세요!'
                  }
                </p>
              </div>
            </>
          ) : (
            <>
              <h4 className="font-semibold text-iwl-purple mb-3">🧠 스스로 질문을 만들어보세요</h4>
              <p className="text-sm text-gray-600 mb-4">
                아래는 참고용 예시입니다. 이것들을 힌트로 삼아 나만의 질문을 직접 만들어보세요.
              </p>
              
              {/* 예시 질문들 (참고용) */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h5 className="font-medium text-gray-800 mb-3">📖 질문 만들기 참고 예시:</h5>
                <div className="space-y-2">
                  {selfGuideQuestions.slice(0, 2).map((question, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-gray-400 text-sm mt-0.5">•</span>
                      <p className="text-gray-600 text-sm italic">{question}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 나만의 질문 만들기 영역 */}
              <div className="space-y-3">
                <h5 className="font-medium text-iwl-purple">✍️ 나만의 질문 만들기:</h5>
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-green-600">{num}</span>
                    </div>
                    <div className="flex-1">
                      <textarea
                        id={`self-question-${num}`}
                        placeholder={`${num}번째 질문을 자유롭게 만들어보세요...`}
                        className="w-full p-3 border border-gray-200 rounded-lg resize-none text-sm focus:ring-2 focus:ring-iwl-purple focus:border-iwl-purple"
                        rows={2}
                        onChange={(e) => handleSelfQuestionChange(num, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-green-800">
                    💡 <strong>자기주도형 방식</strong>
                  </p>
                  {Object.values(selfCreatedQuestions).filter(q => q.trim()).length > 0 && (
                    <Badge className="bg-green-600 text-white text-xs">
                      {Object.values(selfCreatedQuestions).filter(q => q.trim()).length}개 작성됨
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-green-800">
                  {Object.values(selfCreatedQuestions).filter(q => q.trim()).length > 0
                    ? '작성한 나만의 질문들이 AI 실습 시작 시 표시되어 창의적으로 대화를 진행할 수 있습니다!'
                    : '질문을 작성하지 않아도 AI 실습을 시작할 수 있습니다. 자유롭게 대화해보세요!'
                  }
                </p>
              </div>
            </>
          )}
        </div>

        {/* Example Prompts - 간소화 */}
        <div className="bg-white/80 rounded-lg p-4 border border-iwl-blue/20">
          <h4 className="font-semibold text-iwl-blue mb-3">💬 AI 대화 예시 프롬프트</h4>
          <p className="text-sm text-gray-600 mb-4">
            참고용 프롬프트입니다. 복사해서 AI 실습에서 활용하거나 아이디어로 삼아 보세요.
          </p>
          
          <div className="space-y-3">
            {examplePrompts.slice(0, 2).map((prompt) => (
              <div key={prompt.id} className="border border-gray-200 rounded-lg">
                <div 
                  className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setExpandedPrompt(expandedPrompt === prompt.id ? null : prompt.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-iwl-blue" />
                      <span className="font-medium text-gray-900 text-sm">{prompt.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyPrompt(prompt.content);
                        }}
                        className="text-xs px-2 py-1 h-7"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        복사
                      </Button>
                      {expandedPrompt === prompt.id ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
                
                {expandedPrompt === prompt.id && (
                  <div className="p-4 bg-white border-t">
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg mb-3 leading-relaxed">
                      {prompt.content}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyPrompt(prompt.content)}
                      className="w-full text-xs"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      프롬프트 복사하기
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-3 p-3 bg-iwl-blue-50 rounded-lg">
            <p className="text-xs text-iwl-blue">
              💡 <strong>프롬프트 활용 팁:</strong> 이 예시들을 참고하여 자신만의 질문을 만들거나, 
              복사해서 AI 실습에서 바로 사용해보세요.
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            💡 성공 팁
          </h4>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <Star className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-green-800 text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              ⚠️ 주의사항
            </h4>
            <ul className="space-y-2">
              {warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-orange-800 text-sm">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Reference Block Component
interface ReferenceBlockProps {
  title: string;
  content: string;
  links: Array<{
    title: string;
    url: string;
  }>;
}

export function ReferenceBlock({ title, content, links }: ReferenceBlockProps) {
  return (
    <Card className="border-2 border-gray-200 bg-gray-50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-gray-900">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed mb-4">{content}</p>
        
        <div className="space-y-2">
          {links.map((link, index) => (
            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
              <span className="text-gray-800">{link.title}</span>
              <Button variant="outline" size="sm">
                <LinkIcon className="w-4 h-4 mr-1" />
                링크 열기
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}