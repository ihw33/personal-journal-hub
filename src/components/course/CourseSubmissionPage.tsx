import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  ArrowLeft,
  Upload,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  FileText,
  MessageSquare,
  Star,
  Settings,
  Target,
  Brain,
  Zap,
  BookOpen,
  Rocket
} from 'lucide-react';

interface CourseSubmissionPageProps {
  language: 'ko' | 'en';
  week: number;
  onNavigate: (page: string, journalId?: string, category?: string, week?: number) => void;
}

interface SubmissionData {
  studentName: string;
  email: string;
  week: number;
  submissionDate: string;
  learningMode: 'guided' | 'self-directed' | 'mixed';
  phaseBreakdown: Array<{
    phase: number;
    mode: 'guided' | 'self-directed';
    duration: string;
    satisfaction: number;
  }>;
  aiToolUsed: string;
  conversationLinks: string[];
  reflection: string;
  challenges: string;
  improvements: string;
  overallSatisfaction: number;
}

export function CourseSubmissionPage({ language, week, onNavigate }: CourseSubmissionPageProps) {
  const [submissionData, setSubmissionData] = useState<SubmissionData>({
    studentName: '',
    email: '',
    week: week,
    submissionDate: new Date().toISOString().split('T')[0],
    learningMode: 'guided',
    phaseBreakdown: [
      { phase: 1, mode: 'guided', duration: '30분', satisfaction: 5 },
      { phase: 2, mode: 'guided', duration: '30분', satisfaction: 5 },
      { phase: 3, mode: 'guided', duration: '30분', satisfaction: 5 }
    ],
    aiToolUsed: 'claude',
    conversationLinks: [''],
    reflection: '',
    challenges: '',
    improvements: '',
    overallSatisfaction: 5
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    ko: {
      title: `${week}주차 과제 제출`,
      subtitle: "AI와의 대화 결과물과 학습 경험을 공유해주세요",
      
      sections: {
        basicInfo: "기본 정보",
        learningMode: "학습 방식 정보",
        aiConversation: "AI 대화 결과",
        reflection: "학습 성찰",
        submission: "제출하기"
      },
      
      fields: {
        studentName: "이름",
        email: "이메일",
        week: "주차",
        submissionDate: "제출일",
        learningMode: "주요 학습 방식",
        phaseBreakdown: "Phase별 상세 정보",
        aiToolUsed: "사용한 AI 도구",
        conversationLinks: "대화 링크",
        reflection: "학습 성찰",
        challenges: "도전과 어려움",
        improvements: "개선점 및 제안",
        overallSatisfaction: "전체 만족도"
      },
      
      modeOptions: {
        guided: "가이드형 중심",
        selfDirected: "자기주도형 중심", 
        mixed: "혼합형 (Phase별 다름)"
      },
      
      aiTools: {
        claude: "Claude",
        chatgpt: "ChatGPT",
        both: "둘 다 사용",
        other: "기타"
      },
      
      placeholders: {
        studentName: "홍길동",
        email: "student@example.com",
        conversationLink: "https://claude.ai/chat/...",
        reflection: "이번 주차에서 가장 인상 깊었던 점은...",
        challenges: "가장 어려웠던 부분이나 예상과 달랐던 점...",
        improvements: "다음 주차나 코스 개선을 위한 제안..."
      },
      
      phaseLabels: {
        1: "Phase 1: 최초 탐색",
        2: "Phase 2: 심화 탐색", 
        3: "Phase 3: 수집 정리"
      },
      
      satisfactionLabels: {
        1: "매우 불만족",
        2: "불만족", 
        3: "보통",
        4: "만족",
        5: "매우 만족"
      },
      
      submitButton: "과제 제출하기",
      submittedTitle: "제출 완료!",
      submittedMessage: "과제가 성공적으로 제출되었습니다. 강사 검토 후 피드백을 받으실 수 있습니다.",
      
      backToCourse: "강의로 돌아가기",
      viewFeedback: "피드백 확인하기",
      
      instructorInfo: {
        title: "강사 검토용 정보",
        subtitle: "제출된 정보가 강사에게 이렇게 전달됩니다",
        learningPattern: "학습 패턴",
        timeSpent: "소요 시간",
        toolPreference: "도구 선호도",
        engagementLevel: "참여도"
      }
    },
    en: {
      title: `Week ${week} Assignment Submission`,
      subtitle: "Please share your AI conversation results and learning experience",
      
      sections: {
        basicInfo: "Basic Information",
        learningMode: "Learning Method Information", 
        aiConversation: "AI Conversation Results",
        reflection: "Learning Reflection",
        submission: "Submit"
      },
      
      fields: {
        studentName: "Name",
        email: "Email",
        week: "Week",
        submissionDate: "Submission Date",
        learningMode: "Primary Learning Method",
        phaseBreakdown: "Phase Details",
        aiToolUsed: "AI Tool Used",
        conversationLinks: "Conversation Links",
        reflection: "Learning Reflection",
        challenges: "Challenges and Difficulties",
        improvements: "Improvements and Suggestions",
        overallSatisfaction: "Overall Satisfaction"
      },
      
      modeOptions: {
        guided: "Guided-focused",
        selfDirected: "Self-directed-focused",
        mixed: "Mixed (Different per Phase)"
      },
      
      aiTools: {
        claude: "Claude",
        chatgpt: "ChatGPT",
        both: "Both Used",
        other: "Other"
      },
      
      placeholders: {
        studentName: "John Doe",
        email: "student@example.com",
        conversationLink: "https://claude.ai/chat/...",
        reflection: "The most impressive aspect of this week was...",
        challenges: "The most difficult part or unexpected aspects...",
        improvements: "Suggestions for next week or course improvements..."
      },
      
      phaseLabels: {
        1: "Phase 1: Initial Exploration",
        2: "Phase 2: Deep Exploration",
        3: "Phase 3: Collection Organization"
      },
      
      satisfactionLabels: {
        1: "Very Unsatisfied",
        2: "Unsatisfied",
        3: "Neutral", 
        4: "Satisfied",
        5: "Very Satisfied"
      },
      
      submitButton: "Submit Assignment",
      submittedTitle: "Submission Complete!",
      submittedMessage: "Your assignment has been submitted successfully. You will receive feedback after instructor review.",
      
      backToCourse: "Back to Course",
      viewFeedback: "View Feedback",
      
      instructorInfo: {
        title: "Instructor Review Information",
        subtitle: "This is how the submitted information is delivered to the instructor",
        learningPattern: "Learning Pattern",
        timeSpent: "Time Spent",
        toolPreference: "Tool Preference", 
        engagementLevel: "Engagement Level"
      }
    }
  };

  const t = content[language];

  const handleInputChange = (field: keyof SubmissionData, value: unknown) => {
    setSubmissionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhaseUpdate = (phaseIndex: number, field: keyof typeof submissionData.phaseBreakdown[0], value: unknown) => {
    setSubmissionData(prev => ({
      ...prev,
      phaseBreakdown: prev.phaseBreakdown.map((phase, index) => 
        index === phaseIndex ? { ...phase, [field]: value } : phase
      )
    }));
  };

  const addConversationLink = () => {
    setSubmissionData(prev => ({
      ...prev,
      conversationLinks: [...prev.conversationLinks, '']
    }));
  };

  const updateConversationLink = (index: number, value: string) => {
    setSubmissionData(prev => ({
      ...prev,
      conversationLinks: prev.conversationLinks.map((link, i) => 
        i === index ? value : link
      )
    }));
  };

  const removeConversationLink = (index: number) => {
    setSubmissionData(prev => ({
      ...prev,
      conversationLinks: prev.conversationLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Mock submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would normally send data to your backend
    console.log('Submission Data for Instructor:', submissionData);
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const getModeIcon = (mode: 'guided' | 'self-directed') => {
    return mode === 'guided' ? (
      <BookOpen className="w-4 h-4 text-blue-500" />
    ) : (
      <Rocket className="w-4 h-4 text-green-500" />
    );
  };

  const getModeColor = (mode: 'guided' | 'self-directed') => {
    return mode === 'guided' 
      ? 'bg-blue-50 border-blue-200 text-blue-700'
      : 'bg-green-50 border-green-200 text-green-700';
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="container mx-auto px-6 py-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('course-week', undefined, undefined, week)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToCourse}
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-6 py-16 text-center">
          <Card className="max-w-2xl mx-auto border-2 border-green-200 bg-green-50">
            <CardContent className="p-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.submittedTitle}</h2>
              <p className="text-lg text-gray-600 mb-8">{t.submittedMessage}</p>
              
              {/* 제출 정보 요약 */}
              <div className="bg-white rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">📋 제출 정보 요약</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">주요 학습 방식:</span>
                    <Badge className={`ml-2 ${getModeColor(submissionData.learningMode as 'guided' | 'self-directed')}`}>
                      {submissionData.learningMode === 'guided' ? '🎓 가이드형' : 
                       submissionData.learningMode === 'self-directed' ? '🚀 자기주도형' : '🔄 혼합형'}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-600">AI 도구:</span>
                    <span className="ml-2 font-medium">{t.aiTools[submissionData.aiToolUsed as keyof typeof t.aiTools]}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">대화 링크:</span>
                    <span className="ml-2 font-medium">{submissionData.conversationLinks.filter(link => link.trim()).length}개</span>
                  </div>
                  <div>
                    <span className="text-gray-600">전체 만족도:</span>
                    <div className="ml-2 inline-flex">
                      {Array.from({ length: submissionData.overallSatisfaction }, (_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => onNavigate('course-week', undefined, undefined, week)}
                  className="bg-iwl-purple hover:bg-iwl-purple/90 text-white font-semibold px-8 py-3"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t.backToCourse}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => onNavigate('course-feedback', undefined, undefined, week)}
                  className="border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white font-semibold px-8 py-3"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  {t.viewFeedback}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('course-week', undefined, undefined, week)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                강의로 돌아가기
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-iwl-purple" />
                    {t.sections.basicInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="studentName">{t.fields.studentName}</Label>
                      <Input
                        id="studentName"
                        placeholder={t.placeholders.studentName}
                        value={submissionData.studentName}
                        onChange={(e) => handleInputChange('studentName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t.fields.email}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t.placeholders.email}
                        value={submissionData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="week">{t.fields.week}</Label>
                      <Input
                        id="week"
                        value={`${submissionData.week}주차`}
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="submissionDate">{t.fields.submissionDate}</Label>
                      <Input
                        id="submissionDate"
                        type="date"
                        value={submissionData.submissionDate}
                        onChange={(e) => handleInputChange('submissionDate', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Mode Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-iwl-blue" />
                    {t.sections.learningMode}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Learning Mode */}
                  <div>
                    <Label htmlFor="learningMode">{t.fields.learningMode}</Label>
                    <Select
                      value={submissionData.learningMode}
                      onValueChange={(value) => handleInputChange('learningMode', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guided">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-500" />
                            {t.modeOptions.guided}
                          </div>
                        </SelectItem>
                        <SelectItem value="self-directed">
                          <div className="flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-green-500" />
                            {t.modeOptions.selfDirected}
                          </div>
                        </SelectItem>
                        <SelectItem value="mixed">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-purple-500" />
                            {t.modeOptions.mixed}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Phase Breakdown */}
                  <div>
                    <Label className="text-base font-medium">{t.fields.phaseBreakdown}</Label>
                    <div className="mt-3 space-y-4">
                      {submissionData.phaseBreakdown.map((phase, index) => (
                        <Card key={index} className="border border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900">
                                {t.phaseLabels[phase.phase as keyof typeof t.phaseLabels]}
                              </h4>
                              <Badge className={getModeColor(phase.mode)}>
                                {getModeIcon(phase.mode)}
                                <span className="ml-1">
                                  {phase.mode === 'guided' ? '가이드형' : '자기주도형'}
                                </span>
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <Label className="text-sm">모드</Label>
                                <Select
                                  value={phase.mode}
                                  onValueChange={(value) => handlePhaseUpdate(index, 'mode', value)}
                                >
                                  <SelectTrigger className="h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="guided">🎓 가이드형</SelectItem>
                                    <SelectItem value="self-directed">🚀 자기주도형</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-sm">소요 시간</Label>
                                <Input
                                  className="h-8"
                                  value={phase.duration}
                                  onChange={(e) => handlePhaseUpdate(index, 'duration', e.target.value)}
                                  placeholder="30분"
                                />
                              </div>
                              <div>
                                <Label className="text-sm">만족도</Label>
                                <Select
                                  value={phase.satisfaction.toString()}
                                  onValueChange={(value) => handlePhaseUpdate(index, 'satisfaction', parseInt(value))}
                                >
                                  <SelectTrigger className="h-8">
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
                                          <span className="text-xs text-gray-600">
                                            {t.satisfactionLabels[rating as keyof typeof t.satisfactionLabels]}
                                          </span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Conversation Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-green-500" />
                    {t.sections.aiConversation}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="aiToolUsed">{t.fields.aiToolUsed}</Label>
                    <Select
                      value={submissionData.aiToolUsed}
                      onValueChange={(value) => handleInputChange('aiToolUsed', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="claude">{t.aiTools.claude}</SelectItem>
                        <SelectItem value="chatgpt">{t.aiTools.chatgpt}</SelectItem>
                        <SelectItem value="both">{t.aiTools.both}</SelectItem>
                        <SelectItem value="other">{t.aiTools.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>{t.fields.conversationLinks}</Label>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        onClick={addConversationLink}
                      >
                        링크 추가
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {submissionData.conversationLinks.map((link, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder={t.placeholders.conversationLink}
                            value={link}
                            onChange={(e) => updateConversationLink(index, e.target.value)}
                            className="flex-1"
                          />
                          {submissionData.conversationLinks.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeConversationLink(index)}
                            >
                              삭제
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Reflection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-500" />
                    {t.sections.reflection}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="reflection">{t.fields.reflection}</Label>
                    <Textarea
                      id="reflection"
                      placeholder={t.placeholders.reflection}
                      value={submissionData.reflection}
                      onChange={(e) => handleInputChange('reflection', e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="challenges">{t.fields.challenges}</Label>
                    <Textarea
                      id="challenges"
                      placeholder={t.placeholders.challenges}
                      value={submissionData.challenges}
                      onChange={(e) => handleInputChange('challenges', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="improvements">{t.fields.improvements}</Label>
                    <Textarea
                      id="improvements"
                      placeholder={t.placeholders.improvements}
                      value={submissionData.improvements}
                      onChange={(e) => handleInputChange('improvements', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="overallSatisfaction">{t.fields.overallSatisfaction}</Label>
                    <Select
                      value={submissionData.overallSatisfaction.toString()}
                      onValueChange={(value) => handleInputChange('overallSatisfaction', parseInt(value))}
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
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                              <span>{t.satisfactionLabels[rating as keyof typeof t.satisfactionLabels]}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Card>
                <CardContent className="p-6 text-center">
                  <Button 
                    onClick={handleSubmit}
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
                        <Upload className="w-5 h-5 mr-2" />
                        {t.submitButton}
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-gray-600 mt-3">
                    제출 후에는 수정할 수 없으니 내용을 다시 한 번 확인해주세요.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Instructor Preview Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-2 border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-800">
                      <FileText className="w-5 h-5" />
                      {t.instructorInfo.title}
                    </CardTitle>
                    <p className="text-sm text-amber-700">{t.instructorInfo.subtitle}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Learning Pattern */}
                    <div className="bg-white rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 text-sm mb-2">
                        📊 {t.instructorInfo.learningPattern}
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>주요 방식:</span>
                          <Badge className={getModeColor(submissionData.learningMode as 'guided' | 'self-directed')}>
                            {submissionData.learningMode === 'guided' ? '가이드형' : 
                             submissionData.learningMode === 'self-directed' ? '자기주도형' : '혼합형'}
                          </Badge>
                        </div>
                        {submissionData.phaseBreakdown.map((phase, index) => (
                          <div key={index} className="flex justify-between">
                            <span>Phase {phase.phase}:</span>
                            <span className={`px-2 py-1 rounded text-xs ${getModeColor(phase.mode)}`}>
                              {phase.mode === 'guided' ? '🎓' : '🚀'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Time Spent */}
                    <div className="bg-white rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 text-sm mb-2">
                        ⏰ {t.instructorInfo.timeSpent}
                      </h4>
                      <div className="space-y-2 text-xs">
                        {submissionData.phaseBreakdown.map((phase, index) => (
                          <div key={index} className="flex justify-between">
                            <span>Phase {phase.phase}:</span>
                            <span className="font-medium">{phase.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tool Preference */}
                    <div className="bg-white rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 text-sm mb-2">
                        🤖 {t.instructorInfo.toolPreference}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {t.aiTools[submissionData.aiToolUsed as keyof typeof t.aiTools]}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        대화 링크: {submissionData.conversationLinks.filter(link => link.trim()).length}개
                      </p>
                    </div>

                    {/* Engagement Level */}
                    <div className="bg-white rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 text-sm mb-2">
                        📈 {t.instructorInfo.engagementLevel}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: submissionData.overallSatisfaction }, (_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {submissionData.overallSatisfaction}/5
                        </span>
                      </div>
                      <div className="mt-2 space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>성찰:</span>
                          <span className={submissionData.reflection.length > 0 ? 'text-green-600' : 'text-gray-400'}>
                            {submissionData.reflection.length > 0 ? '작성됨' : '미작성'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>도전과제:</span>
                          <span className={submissionData.challenges.length > 0 ? 'text-green-600' : 'text-gray-400'}>
                            {submissionData.challenges.length > 0 ? '작성됨' : '미작성'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}