import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Plus, 
  X, 
  Bold,
  Italic,
  Underline,
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Youtube,
  Palette,
  FileText,
  Clock,
  Download,
  Upload
} from 'lucide-react';

interface JournalEditorProps {
  language: 'ko' | 'en';
  onNavigate: (page: 'home' | 'signup' | 'journal' | 'journal-write' | 'journal-detail' | 'courses' | 'about') => void;
}

// 저널 템플릿들
const journalTemplates = {
  ko: [
    {
      id: 'daily',
      name: '일상 저널',
      description: '매일의 생각과 경험을 기록',
      content: `# 오늘의 하루

## 🌅 오늘 어땠나요?


## 💭 깊이 생각해본 것


## 📚 배운 것


## 🎯 내일 해보고 싶은 것


## ✨ 감사한 것

`
    },
    {
      id: 'learning',
      name: '학습 노트',
      description: '새로 배운 내용을 체계적으로 정리',
      content: `# 학습 노트: [주제명]

## 📖 핵심 개념


## 🔍 상세 내용


## 💡 인사이트 및 깨달음


## 🔗 관련 자료
- 
- 

## 🎯 적용 방안


## ❓ 추가로 알아볼 것

`
    },
    {
      id: 'project',
      name: '프로젝트 회고',
      description: '프로젝트 진행 과정과 결과를 돌아보기',
      content: `# 프로젝트 회고: [프로젝트명]

## 🎯 목표


## 📋 진행 과정


## ✅ 성과 및 결과


## 🚧 어려웠던 점


## 💡 배운 점


## 🔄 다음에 개선할 점

`
    },
    {
      id: 'idea',
      name: '아이디어 노트',
      description: '창의적 아이디어를 발전시키기',
      content: `# 아이디어: [아이디어명]

## 💡 핵심 아이디어


## 🎯 해결하고자 하는 문제


## 🔍 현재 상황 분석


## 📈 실현 가능성


## 🛠️ 구체적 실행 방안


## 🎉 기대 효과

`
    },
    {
      id: 'blank',
      name: '빈 문서',
      description: '자유롭게 작성하기',
      content: ''
    }
  ],
  en: [
    {
      id: 'daily',
      name: 'Daily Journal',
      description: 'Record daily thoughts and experiences',
      content: `# Today's Journal

## 🌅 How was your day?


## 💭 Deep thoughts


## 📚 What I learned


## 🎯 What I want to try tomorrow


## ✨ What I'm grateful for

`
    },
    {
      id: 'learning',
      name: 'Learning Notes',
      description: 'Systematically organize new knowledge',
      content: `# Learning Notes: [Topic]

## 📖 Key Concepts


## 🔍 Detailed Content


## 💡 Insights & Realizations


## 🔗 Related Resources
- 
- 

## 🎯 Application Plans


## ❓ Further Investigation

`
    },
    {
      id: 'project',
      name: 'Project Reflection',
      description: 'Reflect on project process and results',
      content: `# Project Reflection: [Project Name]

## 🎯 Objectives


## 📋 Process


## ✅ Results & Achievements


## 🚧 Challenges


## 💡 Lessons Learned


## 🔄 Improvements for Next Time

`
    },
    {
      id: 'idea',
      name: 'Idea Notes',
      description: 'Develop creative ideas',
      content: `# Idea: [Idea Name]

## 💡 Core Idea


## 🎯 Problem to Solve


## 🔍 Current Situation Analysis


## 📈 Feasibility


## 🛠️ Specific Action Plans


## 🎉 Expected Impact

`
    },
    {
      id: 'blank',
      name: 'Blank Document',
      description: 'Start from scratch',
      content: ''
    }
  ]
};

export function JournalEditor({ language, onNavigate }: JournalEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [fontSize, setFontSize] = useState('base');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showYoutubeDialog, setShowYoutubeDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const contentText = {
    ko: {
      // 헤더
      backToJournal: "저널로 돌아가기",
      newEntry: "새로운 저널 작성",
      
      // 에디터 모드
      writeTab: "작성",
      previewTab: "미리보기",
      
      // 템플릿
      selectTemplate: "템플릿 선택",
      useTemplate: "템플릿 사용하기",
      
      // 툴바
      formatting: "서식",
      fontSize: "글꼴 크기",
      insertContent: "콘텐츠 삽입",
      
      // 입력 필드
      titlePlaceholder: "저널 제목을 입력하세요...",
      contentPlaceholder: "오늘 어떤 생각을 하셨나요? 자유롭게 작성해보세요...",
      
      // 다이얼로그
      insertYoutube: "유튜브 영상 삽입",
      youtubeDescription: "유튜브 URL을 입력하면 썸네일과 링크가 자동으로 생성됩니다.",
      youtubeUrlPlaceholder: "유튜브 URL을 입력하세요",
      insertImage: "이미지 삽입",
      imageDescription: "이미지 URL을 입력하여 저널에 이미지를 추가하세요.",
      imageUrlPlaceholder: "이미지 URL을 입력하세요",
      insertLink: "링크 삽입",
      linkDescription: "웹사이트나 다른 리소스에 대한 링크를 추가하세요.",
      linkUrlPlaceholder: "링크 URL을 입력하세요",
      linkTextPlaceholder: "링크 텍스트를 입력하세요",
      cancel: "취소",
      insert: "삽입",
      
      // 태그
      addTag: "태그 추가",
      tagPlaceholder: "태그 입력...",
      
      // 버튼
      saveDraft: "임시저장",
      publish: "발행하기",
      
      // 상태
      wordCount: "단어",
      charCount: "글자",
      readingTime: "읽기 시간",
      minutes: "분"
    },
    en: {
      // 헤더
      backToJournal: "Back to Journal",
      newEntry: "New Journal Entry",
      
      // 에디터 모드
      writeTab: "Write",
      previewTab: "Preview",
      
      // 템플릿
      selectTemplate: "Select Template",
      useTemplate: "Use Template",
      
      // 툴바
      formatting: "Formatting",
      fontSize: "Font Size",
      insertContent: "Insert Content",
      
      // 입력 필드
      titlePlaceholder: "Enter journal title...",
      contentPlaceholder: "What are you thinking about today? Write freely...",
      
      // 다이얼로그
      insertYoutube: "Insert YouTube Video",
      youtubeDescription: "Enter a YouTube URL to automatically generate a thumbnail and link.",
      youtubeUrlPlaceholder: "Enter YouTube URL",
      insertImage: "Insert Image",
      imageDescription: "Enter an image URL to add an image to your journal.",
      imageUrlPlaceholder: "Enter image URL",
      insertLink: "Insert Link",
      linkDescription: "Add a link to a website or other resource.",
      linkUrlPlaceholder: "Enter link URL",
      linkTextPlaceholder: "Enter link text",
      cancel: "Cancel",
      insert: "Insert",
      
      // 태그
      addTag: "Add Tag",
      tagPlaceholder: "Enter tag...",
      
      // 버튼
      saveDraft: "Save Draft",
      publish: "Publish",
      
      // 상태
      wordCount: "words",
      charCount: "characters",
      readingTime: "reading time",
      minutes: "min"
    }
  };

  const t = contentText[language];
  const templates = journalTemplates[language];

  // 템플릿 적용
  const applyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setContent(template.content);
      setSelectedTemplate(templateId);
      setShowTemplateDialog(false);
    }
  };

  // 태그 관리
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // 텍스트 삽입 함수들
  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + text + content.substring(end);
      setContent(newContent);
      
      // 커서 위치 조정
      setTimeout(() => {
        textarea.setSelectionRange(start + text.length, start + text.length);
        textarea.focus();
      }, 0);
    }
  };

  const wrapSelection = (prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      const newContent = content.substring(0, start) + prefix + selectedText + suffix + content.substring(end);
      setContent(newContent);
      
      setTimeout(() => {
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        textarea.focus();
      }, 0);
    }
  };

  // 서식 기능들
  const formatBold = () => wrapSelection('**');
  const formatItalic = () => wrapSelection('*');
  const formatUnderline = () => wrapSelection('<u>', '</u>');
  const insertHeading1 = () => insertAtCursor('\n# ');
  const insertHeading2 = () => insertAtCursor('\n## ');
  const insertHeading3 = () => insertAtCursor('\n### ');
  const insertBulletList = () => insertAtCursor('\n- ');
  const insertNumberedList = () => insertAtCursor('\n1. ');
  const insertQuote = () => insertAtCursor('\n> ');
  const insertCodeBlock = () => insertAtCursor('\n```\n\n```\n');

  // 콘텐츠 삽입 기능들
  const handleInsertYoutube = () => {
    if (youtubeUrl) {
      const videoId = extractYouTubeVideoId(youtubeUrl);
      if (videoId) {
        insertAtCursor(`\n\n[![YouTube Video](https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)](${youtubeUrl})\n\n`);
      } else {
        insertAtCursor(`\n\n[YouTube Video](${youtubeUrl})\n\n`);
      }
    }
    setYoutubeUrl('');
    setShowYoutubeDialog(false);
  };

  const handleInsertImage = () => {
    if (imageUrl) {
      insertAtCursor(`\n\n![이미지](${imageUrl})\n\n`);
    }
    setImageUrl('');
    setShowImageDialog(false);
  };

  const handleInsertLink = () => {
    if (linkUrl && linkText) {
      insertAtCursor(`[${linkText}](${linkUrl})`);
    }
    setLinkUrl('');
    setLinkText('');
    setShowLinkDialog(false);
  };

  // 유튜브 비디오 ID 추출
  const extractYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // 통계 계산
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // 폰트 크기 클래스
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-sm';
      case 'base': return 'text-base';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      default: return 'text-base';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 상단 네비게이션 */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('journal')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToJournal}
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl">{t.newEntry}</h1>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
                <Eye className="w-4 h-4 mr-2" />
                {isPreview ? t.writeTab : t.previewTab}
              </Button>

              <Button variant="ghost">
                <Save className="w-4 h-4 mr-2" />
                {t.saveDraft}
              </Button>

              <Button className="bg-iwl-gradient hover:opacity-90 text-white">
                {t.publish}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* 메인 에디터 */}
          <div className="lg:col-span-3 space-y-6">
            {/* 제목 입력 */}
            <div className="space-y-2">
              <Input
                placeholder={t.titlePlaceholder}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl border-none px-0 py-3 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground"
              />
            </div>

            {/* 태그 섹션 */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-iwl-purple-50 text-iwl-purple">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-iwl-purple hover:text-iwl-purple/70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder={t.tagPlaceholder}
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="w-32 h-7 text-sm"
                  />
                  <Button onClick={addTag} size="sm" variant="ghost">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 툴바 */}
            {!isPreview && (
              <Card className="p-4">
                <div className="space-y-4">
                  {/* 서식 도구 */}
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">{t.formatting}</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={formatBold}>
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={formatItalic}>
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={formatUnderline}>
                        <Underline className="w-4 h-4" />
                      </Button>
                      <Separator orientation="vertical" className="h-6" />
                      <Button variant="outline" size="sm" onClick={insertHeading1}>
                        <Heading1 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={insertHeading2}>
                        <Heading2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={insertHeading3}>
                        <Heading3 className="w-4 h-4" />
                      </Button>
                      <Separator orientation="vertical" className="h-6" />
                      <Button variant="outline" size="sm" onClick={insertBulletList}>
                        <List className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={insertNumberedList}>
                        <ListOrdered className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={insertQuote}>
                        <Quote className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={insertCodeBlock}>
                        <Code className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* 글꼴 크기 */}
                  <div className="flex items-center space-x-3">
                    <Label className="text-sm text-muted-foreground">{t.fontSize}</Label>
                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="base">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 콘텐츠 삽입 */}
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">{t.insertContent}</Label>
                    <div className="flex flex-wrap gap-2">
                      <Dialog open={showYoutubeDialog} onOpenChange={setShowYoutubeDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Youtube className="w-4 h-4 mr-2" />
                            YouTube
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t.insertYoutube}</DialogTitle>
                            <DialogDescription>
                              {t.youtubeDescription}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input
                              placeholder={t.youtubeUrlPlaceholder}
                              value={youtubeUrl}
                              onChange={(e) => setYoutubeUrl(e.target.value)}
                            />
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setShowYoutubeDialog(false)}>
                                {t.cancel}
                              </Button>
                              <Button onClick={handleInsertYoutube}>
                                {t.insert}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Image className="w-4 h-4 mr-2" />
                            Image
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t.insertImage}</DialogTitle>
                            <DialogDescription>
                              {t.imageDescription}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input
                              placeholder={t.imageUrlPlaceholder}
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                            />
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setShowImageDialog(false)}>
                                {t.cancel}
                              </Button>
                              <Button onClick={handleInsertImage}>
                                {t.insert}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Link className="w-4 h-4 mr-2" />
                            Link
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t.insertLink}</DialogTitle>
                            <DialogDescription>
                              {t.linkDescription}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input
                              placeholder={t.linkTextPlaceholder}
                              value={linkText}
                              onChange={(e) => setLinkText(e.target.value)}
                            />
                            <Input
                              placeholder={t.linkUrlPlaceholder}
                              value={linkUrl}
                              onChange={(e) => setLinkUrl(e.target.value)}
                            />
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
                                {t.cancel}
                              </Button>
                              <Button onClick={handleInsertLink}>
                                {t.insert}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* 에디터 탭 */}
            <Tabs value={isPreview ? "preview" : "write"} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="write" onClick={() => setIsPreview(false)}>
                  <FileText className="w-4 h-4 mr-2" />
                  {t.writeTab}
                </TabsTrigger>
                <TabsTrigger value="preview" onClick={() => setIsPreview(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  {t.previewTab}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="write" className="mt-6">
                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    placeholder={t.contentPlaceholder}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={`min-h-[500px] leading-relaxed resize-none border-none bg-transparent focus-visible:ring-0 p-0 ${getFontSizeClass()}`}
                  />
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-6">
                <Card className="min-h-[500px]">
                  <CardContent className="p-8">
                    {title && <h1 className="text-3xl mb-6">{title}</h1>}
                    <div className={`prose prose-lg max-w-none ${getFontSizeClass()}`}>
                      {content.split('\n').map((line, index) => {
                        // 간단한 마크다운 렌더링
                        if (line.startsWith('# ')) {
                          return <h1 key={index} className="text-3xl mt-8 mb-4">{line.replace('# ', '')}</h1>;
                        }
                        if (line.startsWith('## ')) {
                          return <h2 key={index} className="text-2xl mt-6 mb-3">{line.replace('## ', '')}</h2>;
                        }
                        if (line.startsWith('### ')) {
                          return <h3 key={index} className="text-xl mt-4 mb-2">{line.replace('### ', '')}</h3>;
                        }
                        if (line.startsWith('> ')) {
                          return <blockquote key={index} className="border-l-4 border-iwl-purple pl-4 italic my-4">{line.replace('> ', '')}</blockquote>;
                        }
                        if (line.startsWith('- ')) {
                          return <ul key={index} className="ml-4"><li>{line.replace('- ', '')}</li></ul>;
                        }
                        if (line.trim() === '') {
                          return <div key={index} className="h-4"></div>;
                        }
                        return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* 하단 상태 바 */}
            <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/30 rounded-lg px-4 py-3">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  <span>{wordCount}</span>
                  <span>{t.wordCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>{charCount}</span>
                  <span>{t.charCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime}</span>
                  <span>{t.minutes}</span>
                  <span>{t.readingTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 템플릿 사이드패널 */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* 템플릿 선택 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-iwl-gradient">
                    <Palette className="w-5 h-5 mr-2" />
                    {t.selectTemplate}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => applyTemplate(template.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors border ${
                        selectedTemplate === template.id 
                          ? 'bg-iwl-purple-50 border-iwl-purple' 
                          : 'hover:bg-muted border-transparent'
                      }`}
                    >
                      <h4 className="text-sm mb-1">{template.name}</h4>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* 도움말 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-iwl-purple" />
                    Markdown 도움말
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><code>**굵게**</code> → <strong>굵게</strong></div>
                  <div><code>*기울임*</code> → <em>기울임</em></div>
                  <div><code># 제목1</code></div>
                  <div><code>## 제목2</code></div>
                  <div><code>- 목록</code></div>
                  <div><code>&gt; 인용구</code></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}