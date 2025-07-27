import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  User,
  MessageCircle,
  Zap,
  MessageSquare,
  ArrowRight,
  Send,
  Target,
  Eye,
  Copy,
  Download,
  AlertCircle,
  Star
} from 'lucide-react';
import { PhaseSubmissionData, ContentText, PhaseInfo } from './types';

interface PhaseSubmissionFormProps {
  submissionData: PhaseSubmissionData;
  content: ContentText;
  phaseInfo: PhaseInfo;
  phase: number;
  onInputChange: (field: keyof PhaseSubmissionData, value: unknown) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  showChatPreview: boolean;
  onToggleChatPreview: () => void;
  onCopyConversation: () => void;
  onExportChat: () => void;
}

export function PhaseSubmissionForm({
  submissionData,
  content,
  phaseInfo,
  phase,
  onInputChange,
  onSubmit,
  isSubmitting,
  showChatPreview,
  onToggleChatPreview,
  onCopyConversation,
  onExportChat
}: PhaseSubmissionFormProps) {
  return (
    <div className="space-y-8">
      {/* Phase Overview */}
      <Card className="border-2 border-iwl-purple/20 bg-iwl-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-iwl-purple" />
            Phase {phase}: {phaseInfo.title}
          </CardTitle>
          <p className="text-iwl-purple font-medium">{phaseInfo.focus}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">💭 제출 전 점검 질문</h4>
            {phaseInfo.questions.map((question, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-iwl-purple text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-sm text-gray-700">{question}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-iwl-purple" />
            {content.sections.basicInfo}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentName">{content.fields.studentName}</Label>
              <Input
                id="studentName"
                value={submissionData.studentName}
                onChange={(e) => onInputChange('studentName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">{content.fields.email}</Label>
              <Input
                id="email"
                type="email"
                value={submissionData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeSpent">{content.fields.timeSpent}</Label>
              <Select
                value={submissionData.timeSpent}
                onValueChange={(value) => onInputChange('timeSpent', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {content.timeOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="aiToolUsed">{content.fields.aiToolUsed}</Label>
              <Select
                value={submissionData.aiToolUsed}
                onValueChange={(value) => onInputChange('aiToolUsed', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="integrated">{content.aiTools.integrated}</SelectItem>
                  <SelectItem value="claude">{content.aiTools.claude}</SelectItem>
                  <SelectItem value="chatgpt">{content.aiTools.chatgpt}</SelectItem>
                  <SelectItem value="other">{content.aiTools.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Chat Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-500" />
            {content.sections.chatSummary}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {submissionData.chatSession ? (
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-green-900">🤖 AI 대화 통계</h4>
                  <Badge variant="outline" className="border-green-500 text-green-700">
                    자동 수집됨
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-700">총 메시지:</span>
                    <span className="ml-2 font-medium">{submissionData.chatSession.metadata.totalMessages}개</span>
                  </div>
                  <div>
                    <span className="text-green-700">사용자 메시지:</span>
                    <span className="ml-2 font-medium">{submissionData.chatSession.metadata.userMessages}개</span>
                  </div>
                  <div>
                    <span className="text-green-700">AI 응답:</span>
                    <span className="ml-2 font-medium">{submissionData.chatSession.metadata.assistantMessages}개</span>
                  </div>
                  <div>
                    <span className="text-green-700">진행 Phase:</span>
                    <span className="ml-2 font-medium">
                      {submissionData.chatSession.metadata.phaseTransitions.map(pt => pt.phase).join(' → ')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleChatPreview}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  {showChatPreview ? '숨기기' : '대화 미리보기'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCopyConversation}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  대화 복사
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExportChat}
                >
                  <Download className="w-4 h-4 mr-1" />
                  내보내기
                </Button>
              </div>
              
              {showChatPreview && (
                <div className="bg-gray-50 rounded-lg p-4 border max-h-60 overflow-y-auto">
                  <h5 className="font-medium text-gray-900 mb-3">대화 내용 미리보기</h5>
                  <div className="space-y-2">
                    {submissionData.chatSession.messages.slice(-5).map((msg, index) => (
                      <div key={index} className="text-sm">
                        <span className={`font-medium ${msg.role === 'user' ? 'text-blue-600' : 'text-green-600'}`}>
                          {msg.role === 'user' ? '나' : 'AI'}:
                        </span>
                        <span className="ml-2 text-gray-700">
                          {msg.content.length > 100 ? msg.content.slice(0, 100) + '...' : msg.content}
                        </span>
                      </div>
                    ))}
                  </div>
                  {submissionData.chatSession.messages.length > 5 && (
                    <p className="text-xs text-gray-500 mt-2">
                      * 최근 5개 메시지만 표시됨. 전체 대화는 제출 시 포함됩니다.
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-yellow-900">AI 대화 기록이 없습니다</span>
              </div>
              <p className="text-sm text-yellow-800 mt-2">
                이 Phase에서 AI 챗봇을 사용하지 않았습니다. 실습을 위해 AI 챗봇을 사용하는 것을 권장합니다.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Practice Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            {content.sections.practiceResults}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="mainFindings">{content.fields.mainFindings}</Label>
            <Textarea
              id="mainFindings"
              placeholder={content.placeholders.mainFindings}
              value={submissionData.mainFindings}
              onChange={(e) => onInputChange('mainFindings', e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="insights">{content.fields.insights}</Label>
            <Textarea
              id="insights"
              placeholder={content.placeholders.insights}
              value={submissionData.insights}
              onChange={(e) => onInputChange('insights', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Reflection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            {content.sections.reflection}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="challenges">{content.fields.challenges}</Label>
            <Textarea
              id="challenges"
              placeholder={content.placeholders.challenges}
              value={submissionData.challenges}
              onChange={(e) => onInputChange('challenges', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="satisfaction">{content.fields.satisfaction}</Label>
              <Select
                value={submissionData.satisfaction.toString()}
                onValueChange={(value) => onInputChange('satisfaction', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map(rating => (
                    <SelectItem key={rating} value={rating.toString()}>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: rating }, (_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span>{rating}/5</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="difficultyLevel">{content.fields.difficultyLevel}</Label>
              <Select
                value={submissionData.difficultyLevel.toString()}
                onValueChange={(value) => onInputChange('difficultyLevel', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - 매우 쉬움</SelectItem>
                  <SelectItem value="2">2 - 쉬움</SelectItem>
                  <SelectItem value="3">3 - 보통</SelectItem>
                  <SelectItem value="4">4 - 어려움</SelectItem>
                  <SelectItem value="5">5 - 매우 어려움</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-iwl-blue" />
            {content.sections.nextSteps}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nextStepPlans">{content.fields.nextStepPlans}</Label>
            <Textarea
              id="nextStepPlans"
              placeholder={content.placeholders.nextStepPlans}
              value={submissionData.nextStepPlans}
              onChange={(e) => onInputChange('nextStepPlans', e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="submissionType">제출 후 진행 방식</Label>
            <Select
              value={submissionData.submissionType}
              onValueChange={(value) => onInputChange('submissionType', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phase-only">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-orange-500" />
                    {content.submissionTypes["phase-only"]}
                  </div>
                </SelectItem>
                <SelectItem value="continue-to-next">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-iwl-purple" />
                    {content.submissionTypes["continue-to-next"]}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Card>
        <CardContent className="p-6 text-center">
          <Button 
            onClick={onSubmit}
            disabled={isSubmitting || !submissionData.studentName || !submissionData.email}
            className="bg-iwl-purple hover:bg-iwl-purple/90 text-white font-semibold px-8 py-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                제출 중...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                {content.submitButton}
              </>
            )}
          </Button>
          <p className="text-sm text-gray-600 mt-3">
            AI 대화 내용이 자동으로 포함되어 제출됩니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}