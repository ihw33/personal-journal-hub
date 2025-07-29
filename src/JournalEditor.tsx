import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Send, 
  Brain, 
  MessageCircle, 
  Sparkles,
  FileText,
  Tag,
  Settings,
  Zap
} from 'lucide-react';

interface JournalEditorProps {
  journalId: string | null;
  user: any;
  onNavigate: (page: string, params?: any) => void;
  language: 'ko' | 'en';
}

const JournalEditor: React.FC<JournalEditorProps> = ({
  journalId,
  user,
  onNavigate,
  language
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [activeTab, setActiveTab] = useState('write');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const contentData = {
    ko: {
      back: '저널 목록으로',
      title: journalId ? '저널 수정' : '새 저널 작성',
      subtitle: 'AI와 함께 깊이 있는 생각정리를 시작해보세요',
      tabs: {
        write: '작성',
        preview: '미리보기',
        aiAssist: 'AI 협업',
        settings: '설정'
      },
      form: {
        titleLabel: '제목',
        titlePlaceholder: '저널 제목을 입력하세요',
        contentLabel: '내용',
        contentPlaceholder: 'AI와 함께 생각을 정리해보세요...',
        categoryLabel: '카테고리',
        categoryPlaceholder: '카테고리 선택',
        tagsLabel: '태그',
        tagsPlaceholder: '태그를 쉼표로 구분해서 입력 (예: AI협업, 창의사고)',
        statusLabel: '상태'
      },
      categories: [
        { value: 'travel', label: '여행' },
        { value: 'business', label: '비즈니스' },
        { value: 'creative', label: '창의적 사고' },
        { value: 'analysis', label: '분석적 사고' },
        { value: 'personal', label: '개인 성장' },
        { value: 'learning', label: '학습' }
      ],
      actions: {
        save: '임시저장',
        publish: '발행하기',
        preview: '미리보기',
        saveDraft: '초안 저장'
      },
      aiAssist: {
        title: 'AI 협업 도우미',
        subtitle: 'AI와 함께 생각을 발전시켜보세요',
        promptPlaceholder: 'AI에게 도움을 요청하세요. 예: "이 주제에 대해 더 깊이 생각해보고 싶어요"',
        askAi: 'AI에게 질문하기',
        thinking: 'AI가 생각 중...',
        suggestions: '제안사항',
        insertToContent: '본문에 추가'
      },
      tips: {
        title: '작성 팁',
        items: [
          'AI와 대화하듯 자연스럽게 작성해보세요',
          '구체적인 경험과 느낌을 포함해주세요',
          '질문을 통해 생각을 깊이 파고들어보세요',
          '다양한 관점에서 주제를 바라보세요'
        ]
      }
    },
    en: {
      back: 'Back to Journals',
      title: journalId ? 'Edit Journal' : 'New Journal',
      subtitle: 'Start deep thinking with AI',
      tabs: {
        write: 'Write',
        preview: 'Preview',
        aiAssist: 'AI Assist',
        settings: 'Settings'
      },
      form: {
        titleLabel: 'Title',
        titlePlaceholder: 'Enter journal title',
        contentLabel: 'Content',
        contentPlaceholder: 'Organize your thoughts with AI...',
        categoryLabel: 'Category',
        categoryPlaceholder: 'Select category',
        tagsLabel: 'Tags',
        tagsPlaceholder: 'Enter tags separated by commas (e.g. AI Collaboration, Creative Thinking)',
        statusLabel: 'Status'
      },
      categories: [
        { value: 'travel', label: 'Travel' },
        { value: 'business', label: 'Business' },
        { value: 'creative', label: 'Creative Thinking' },
        { value: 'analysis', label: 'Analytical Thinking' },
        { value: 'personal', label: 'Personal Growth' },
        { value: 'learning', label: 'Learning' }
      ],
      actions: {
        save: 'Save Draft',
        publish: 'Publish',
        preview: 'Preview',
        saveDraft: 'Save Draft'
      },
      aiAssist: {
        title: 'AI Collaboration Assistant',
        subtitle: 'Develop your thoughts with AI',
        promptPlaceholder: 'Ask AI for help. e.g. "I want to think deeper about this topic"',
        askAi: 'Ask AI',
        thinking: 'AI is thinking...',
        suggestions: 'Suggestions',
        insertToContent: 'Insert to Content'
      },
      tips: {
        title: 'Writing Tips',
        items: [
          'Write naturally as if talking to AI',
          'Include specific experiences and feelings',
          'Dig deeper through questions',
          'Look at topics from various perspectives'
        ]
      }
    }
  };

  const t = contentData[language];

  // Load existing journal data if editing
  useEffect(() => {
    if (journalId) {
      // In real implementation, fetch journal data from API
      setTitle('AI와 함께 제주도 여행 계획 세우기');
      setContent('AI 파트너와 함께 효과적인 제주도 여행 계획을 세우는 과정...');
      setCategory('travel');
      setTags('AI협업, 제주여행, 창의사고');
      setStatus('published');
    }
  }, [journalId]);

  const handleAiAssist = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsAiThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `
AI 응답: "${aiPrompt}"에 대한 생각을 발전시켜보겠습니다.

이 주제를 더 깊이 탐구하기 위해 다음과 같은 질문들을 고려해보세요:

1. 이 경험에서 가장 인상 깊었던 순간은 무엇이었나요?
2. 예상과 달랐던 부분이 있다면 무엇인가요?
3. 이 과정에서 어떤 새로운 관점을 얻었나요?
4. 다른 사람들에게 어떤 조언을 해주고 싶나요?

이러한 질문들을 통해 단순한 경험 공유를 넘어 더 깊이 있는 인사이트를 도출할 수 있습니다.
      `;
      
      setContent(prev => prev + '\n\n' + aiResponse);
      setAiPrompt('');
      setIsAiThinking(false);
    }, 2000);
  };

  const handleSave = (saveStatus: 'draft' | 'published') => {
    // In real implementation, save to API
    console.log('Saving journal:', { title, content, category, tags, status: saveStatus });
    setStatus(saveStatus);
    onNavigate('journal');
  };

  const renderPreview = () => (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold text-iwl-gradient mb-6">{title || 'Untitled'}</h1>
      <div className="mb-6">
        {category && (
          <Badge className="mr-2 bg-iwl-purple-100 text-iwl-purple">
            {t.categories.find(c => c.value === category)?.label}
          </Badge>
        )}
        {tags.split(',').filter(tag => tag.trim()).map((tag, index) => (
          <Badge key={index} variant="outline" className="mr-2 mb-2">
            #{tag.trim()}
          </Badge>
        ))}
      </div>
      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
        {content || '내용이 없습니다.'}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 border-b">
        <div className="container mx-auto px-4">
          <Button
            variant="outline"
            onClick={() => onNavigate('journal')}
            className="mb-6 border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-iwl-gradient mb-2">
                {t.title}
              </h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => handleSave('draft')}
                className="border-iwl-blue text-iwl-blue hover:bg-iwl-blue hover:text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {t.actions.save}
              </Button>
              <Button
                onClick={() => handleSave('published')}
                className="bg-iwl-gradient hover:opacity-90 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                {t.actions.publish}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="write" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {t.tabs.write}
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {t.tabs.preview}
              </TabsTrigger>
              <TabsTrigger value="aiAssist" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                {t.tabs.aiAssist}
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                {t.tabs.settings}
              </TabsTrigger>
            </TabsList>

            {/* Write Tab */}
            <TabsContent value="write" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.form.titleLabel}
                        </label>
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder={t.form.titlePlaceholder}
                          className="text-lg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.form.contentLabel}
                        </label>
                        <Textarea
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder={t.form.contentPlaceholder}
                          className="min-h-[500px] resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Writing Tips */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-iwl-gradient">
                        <Sparkles className="w-5 h-5" />
                        {t.tips.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {t.tips.items.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-iwl-purple rounded-full mt-2 flex-shrink-0"></div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview">
              <Card>
                <CardContent className="p-8">
                  {renderPreview()}
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Assist Tab */}
            <TabsContent value="aiAssist" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-iwl-gradient">
                    <Brain className="w-5 h-5" />
                    {t.aiAssist.title}
                  </CardTitle>
                  <CardDescription>{t.aiAssist.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder={t.aiAssist.promptPlaceholder}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button
                    onClick={handleAiAssist}
                    disabled={isAiThinking || !aiPrompt.trim()}
                    className="bg-iwl-gradient hover:opacity-90 text-white"
                  >
                    {isAiThinking ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t.aiAssist.thinking}
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {t.aiAssist.askAi}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-iwl-purple" />
                    저널 설정
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.categoryLabel}
                      </label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder={t.form.categoryPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {t.categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.statusLabel}
                      </label>
                      <Select value={status} onValueChange={(value) => setStatus(value as 'draft' | 'published')}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">임시저장</SelectItem>
                          <SelectItem value="published">발행됨</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.form.tagsLabel}
                    </label>
                    <Input
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder={t.form.tagsPlaceholder}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export { JournalEditor };