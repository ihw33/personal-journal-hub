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
  onStartPractice
}: PracticeBlockProps) {
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);

  const copyPrompt = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('프롬프트가 복사되었습니다! AI 실습에서 사용해보세요.');
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

        {/* Self-Guided Questions */}
        <div className="bg-white/80 rounded-lg p-4 border border-iwl-purple/20">
          <h4 className="font-semibold text-iwl-purple mb-3">❓ 스스로 생각해볼 질문들</h4>
          <div className="space-y-3">
            {selfGuideQuestions.map((question, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-iwl-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-iwl-purple">{index + 1}</span>
                </div>
                <p className="text-gray-700">{question}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-iwl-purple-50 rounded-lg">
            <p className="text-sm text-iwl-purple">
              💡 이 질문들을 AI 실습에서 하나씩 물어보며 대화를 시작해보세요!
            </p>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="bg-white/80 rounded-lg p-4 border border-iwl-blue/20">
          <h4 className="font-semibold text-iwl-blue mb-3">💬 대화 시작 예시</h4>
          <p className="text-sm text-gray-600 mb-4">
            아래 예시들을 참고하여 AI와 대화를 시작해보세요. 복사 버튼을 눌러 실습에서 사용할 수 있습니다.
          </p>
          
          <div className="space-y-3">
            {examplePrompts.slice(0, 3).map((prompt) => (
              <div key={prompt.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setExpandedPrompt(expandedPrompt === prompt.id ? null : prompt.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-iwl-blue" />
                      <span className="font-medium text-gray-900">{prompt.title}</span>
                      {prompt.isExample && (
                        <Badge variant="secondary" className="text-xs">예시</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyPrompt(prompt.content);
                        }}
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
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 p-3 rounded-lg mb-3">
                      {prompt.content}
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyPrompt(prompt.content)}
                      className="w-full"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      복사하기
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {examplePrompts.length > 3 && (
            <div className="mt-3 text-center">
              <Badge variant="outline" className="text-xs">
                +{examplePrompts.length - 3}개 더 많은 예시가 실습에서 제공됩니다
              </Badge>
            </div>
          )}
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