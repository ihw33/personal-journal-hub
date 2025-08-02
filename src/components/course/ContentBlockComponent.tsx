'use client';

import React, { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  Circle, 
  Volume2, 
  VolumeX,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ContentBlock, QuizQuestion, ChecklistItem } from './types';
import { CONTENT_BLOCK_CONFIG } from './courseDetailConstants';

interface ContentBlockComponentProps {
  block: ContentBlock;
  onComplete?: (blockId: string) => void;
  onAnswerSubmit?: (blockId: string, answer: any) => void;
  className?: string;
}

/**
 * 콘텐츠 블록 컴포넌트
 * 다양한 타입의 학습 콘텐츠를 렌더링하는 범용 컴포넌트
 */
export const ContentBlockComponent: React.FC<ContentBlockComponentProps> = ({
  block,
  onComplete,
  onAnswerSubmit,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const blockConfig = CONTENT_BLOCK_CONFIG[block.type];

  const handleComplete = () => {
    onComplete?.(block.id);
  };

  const handleAnswerSubmit = () => {
    onAnswerSubmit?.(block.id, userAnswer);
  };

  const renderBlockHeader = () => (
    <div className="flex items-center justify-between p-4 border-b border-architect-gray-200">
      <div className="flex items-center space-x-3">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
          style={{ backgroundColor: blockConfig.color }}
        >
          {blockConfig.icon}
        </div>
        <div>
          {block.title && (
            <h3 className="text-h5 font-semibold text-architect-gray-900">
              {block.title}
            </h3>
          )}
          <p className="text-small text-architect-gray-600">
            {blockConfig.label}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {block.isCompleted && (
          <CheckCircle className="w-5 h-5 text-architect-success" />
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );

  const renderTextContent = () => {
    // Sanitize HTML content to prevent XSS attacks
    const sanitizedContent = DOMPurify.sanitize(block.content, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre'],
      ALLOWED_ATTR: ['class'],
      FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'button', 'select']
    });

    return (
      <div className="p-4 prose prose-sm max-w-none">
        <div 
          className="text-architect-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        
        {!block.isCompleted && (
          <div className="mt-6 pt-4 border-t border-architect-gray-200">
            <Button onClick={handleComplete} size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              읽기 완료
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderVideoContent = () => (
    <div className="p-4">
      <div className="relative bg-architect-gray-900 rounded-lg overflow-hidden">
        <div className="aspect-video flex items-center justify-center">
          {block.metadata?.videoUrl ? (
            <video 
              controls 
              className="w-full h-full"
              onEnded={handleComplete}
            >
              <source src={block.metadata.videoUrl} type="video/mp4" />
              동영상을 재생할 수 없습니다.
            </video>
          ) : (
            <div className="text-white text-center">
              <Play className="w-12 h-12 mx-auto mb-2" />
              <p>동영상 준비 중...</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-small text-architect-gray-600">
        <p>{block.content}</p>
      </div>
    </div>
  );

  const renderAudioContent = () => (
    <div className="p-4">
      <div className="bg-architect-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          
          <div className="flex-1 bg-architect-gray-200 rounded-full h-2">
            <div className="bg-architect-primary h-2 rounded-full w-1/3"></div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="shrink-0"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        {block.metadata?.audioUrl && (
          <audio 
            controls 
            className="w-full mt-4"
            onEnded={handleComplete}
          >
            <source src={block.metadata.audioUrl} type="audio/mpeg" />
            오디오를 재생할 수 없습니다.
          </audio>
        )}
      </div>
      
      <div className="mt-4 text-small text-architect-gray-600">
        <p>{DOMPurify.sanitize(block.content, { ALLOWED_TAGS: [] })}</p>
      </div>
    </div>
  );

  const renderImageContent = () => (
    <div className="p-4">
      {block.metadata?.imageUrl && (
        <div className="mb-4">
          <img 
            src={block.metadata.imageUrl} 
            alt={block.metadata.altText || '이미지'}
            className="w-full rounded-lg"
            onLoad={handleComplete}
          />
        </div>
      )}
      
      <div className="text-small text-architect-gray-600">
        <p>{DOMPurify.sanitize(block.content, { ALLOWED_TAGS: [] })}</p>
      </div>
    </div>
  );

  const renderQuizContent = () => {
    const questions = block.metadata?.quizQuestions || [];
    
    return (
      <div className="p-4">
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="space-y-3">
              <h4 className="text-h5 font-semibold text-architect-gray-900">
                {index + 1}. {DOMPurify.sanitize(question.question, { ALLOWED_TAGS: [] })}
              </h4>
              
              {question.type === 'multiple-choice' && question.options && (
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label 
                      key={optionIndex}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-architect-gray-200 hover:bg-architect-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={optionIndex}
                        onChange={() => setUserAnswer(optionIndex)}
                        className="w-4 h-4 text-architect-primary"
                      />
                      <span className="text-architect-gray-700">{DOMPurify.sanitize(option, { ALLOWED_TAGS: [] })}</span>
                    </label>
                  ))}
                </div>
              )}
              
              {question.type === 'true-false' && (
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value="true"
                      onChange={() => setUserAnswer(true)}
                      className="w-4 h-4 text-architect-primary"
                    />
                    <span>참</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value="false"
                      onChange={() => setUserAnswer(false)}
                      className="w-4 h-4 text-architect-primary"
                    />
                    <span>거짓</span>
                  </label>
                </div>
              )}
              
              {question.type === 'open-ended' && (
                <textarea
                  className="w-full p-3 border border-architect-gray-200 rounded-lg resize-none"
                  rows={4}
                  placeholder="답변을 입력하세요..."
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
        
        {!block.isCompleted && (
          <div className="mt-6 pt-4 border-t border-architect-gray-200">
            <Button 
              onClick={handleAnswerSubmit}
              disabled={!userAnswer}
            >
              답변 제출
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderExerciseContent = () => (
    <div className="p-4">
      <div className="bg-architect-gray-50 rounded-lg p-4 mb-4">
        <h4 className="text-h5 font-semibold text-architect-gray-900 mb-2">
          실습 과제
        </h4>
        <p className="text-architect-gray-700 leading-relaxed">
          {DOMPurify.sanitize(block.metadata?.exercisePrompt || block.content, { ALLOWED_TAGS: [] })}
        </p>
      </div>
      
      <div className="space-y-4">
        <textarea
          className="w-full p-3 border border-architect-gray-200 rounded-lg resize-none"
          rows={6}
          placeholder="실습 결과를 작성하세요..."
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        
        {!block.isCompleted && (
          <Button 
            onClick={handleAnswerSubmit}
            disabled={!userAnswer}
          >
            실습 완료
          </Button>
        )}
      </div>
    </div>
  );

  const renderReflectionContent = () => {
    const prompts = block.metadata?.reflectionPrompts || [block.content];
    
    return (
      <div className="p-4">
        <div className="space-y-6">
          {prompts.map((prompt, index) => (
            <div key={index} className="space-y-3">
              <h4 className="text-h5 font-semibold text-architect-gray-900">
                성찰 질문 {index + 1}
              </h4>
              <p className="text-architect-gray-700 bg-architect-gray-50 p-3 rounded-lg">
                {DOMPurify.sanitize(prompt, { ALLOWED_TAGS: [] })}
              </p>
              <textarea
                className="w-full p-3 border border-architect-gray-200 rounded-lg resize-none"
                rows={4}
                placeholder="생각을 자유롭게 적어보세요..."
                onChange={(e) => {
                  const answers = userAnswer || {};
                  answers[index] = e.target.value;
                  setUserAnswer(answers);
                }}
              />
            </div>
          ))}
        </div>
        
        {!block.isCompleted && (
          <div className="mt-6 pt-4 border-t border-architect-gray-200">
            <Button onClick={handleAnswerSubmit}>
              성찰 완료
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderChecklistContent = () => {
    const items = block.metadata?.checklistItems || [];
    
    return (
      <div className="p-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <Checkbox
                id={item.id}
                checked={item.isCompleted}
                onCheckedChange={(checked) => {
                  const updatedItems = items.map(i => 
                    i.id === item.id ? { ...i, isCompleted: checked as boolean } : i
                  );
                  setUserAnswer(updatedItems);
                }}
              />
              <label 
                htmlFor={item.id}
                className={`text-architect-gray-700 cursor-pointer ${
                  item.isCompleted ? 'line-through text-architect-gray-500' : ''
                }`}
              >
                {DOMPurify.sanitize(item.text, { ALLOWED_TAGS: [] })}
              </label>
            </div>
          ))}
        </div>
        
        {!block.isCompleted && (
          <div className="mt-6 pt-4 border-t border-architect-gray-200">
            <Button onClick={handleComplete}>
              체크리스트 완료
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderContentByType = () => {
    switch (block.type) {
      case 'text':
        return renderTextContent();
      case 'video':
        return renderVideoContent();
      case 'audio':
        return renderAudioContent();
      case 'image':
        return renderImageContent();
      case 'quiz':
        return renderQuizContent();
      case 'exercise':
        return renderExerciseContent();
      case 'reflection':
        return renderReflectionContent();
      case 'checklist':
        return renderChecklistContent();
      case 'code':
        return renderTextContent(); // 코드는 텍스트와 같은 방식으로 처리
      case 'diagram':
        return renderImageContent(); // 다이어그램은 이미지와 같은 방식으로 처리
      default:
        return renderTextContent();
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      {renderBlockHeader()}
      {isExpanded && renderContentByType()}
    </Card>
  );
};