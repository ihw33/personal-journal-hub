import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Header } from './Header';
import { Footer } from './Footer';
import { 
  Lightbulb, 
  Users, 
  FileText, 
  Activity, 
  Layout, 
  Zap, 
  BarChart3, 
  BookOpen, 
  Briefcase, 
  Mail,
  UserPlus,
  ArrowRight,
  Star,
  Heart,
  Sparkles
} from 'lucide-react';

interface ComingSoonPageProps {
  language: 'ko' | 'en';
  pageName: string;
  pageKey: string;
  onNavigate: (page: string) => void;
  onLanguageToggle: () => void;
  currentPage: string;
}

export function ComingSoonPage({ 
  language, 
  pageName, 
  pageKey, 
  onNavigate, 
  onLanguageToggle,
  currentPage
}: ComingSoonPageProps) {
  const content = {
    ko: {
      title: "곧 출시 예정",
      subtitle: `${pageName} 페이지를 준비 중입니다`,
      description: "더 나은 경험을 위해 열심히 개발하고 있습니다.",
      backToHome: "홈으로 돌아가기",
      newsletter: "출시 소식 받기",
      featuresTitle: "예정된 기능들",
      roadmapTitle: "개발 로드맵",
      notifyMe: "출시 알림 받기",
      
      pages: {
        'journal-write': {
          title: "AI 저널 작성",
          description: "AI와 함께하는 새로운 저널 작성 경험",
          longDescription: "AI 도우미와 함께 깊이 있는 생각을 정리하고 창의적인 아이디어를 발굴할 수 있는 스마트 저널 에디터입니다.",
          features: [
            { icon: Lightbulb, title: "AI 아이디어 확장", description: "주제에 대한 새로운 관점과 아이디어 제안" },
            { icon: Layout, title: "구조화 제안", description: "논리적인 글 구조와 목차 자동 생성" },
            { icon: Zap, title: "실시간 피드백", description: "작성 중 AI가 제공하는 실시간 개선 제안" },
            { icon: BookOpen, title: "템플릿 라이브러리", description: "다양한 목적별 저널 템플릿 제공" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "기본 에디터", status: "개발 중", progress: 80 },
            { phase: "Phase 2", title: "AI 통합", status: "설계 중", progress: 30 },
            { phase: "Phase 3", title: "고급 기능", status: "예정", progress: 0 }
          ]
        },
        'journal-category': {
          title: "카테고리별 저널",
          description: "체계적인 저널 분류 및 탐색",
          longDescription: "다양한 주제와 카테고리로 정리된 저널을 쉽게 찾고 탐색할 수 있는 스마트 분류 시스템입니다.",
          features: [
            { icon: Layout, title: "스마트 분류", description: "AI 기반 자동 카테고리 분류" },
            { icon: BarChart3, title: "관련 글 추천", description: "사용자 관심사 기반 맞춤 추천" },
            { icon: Users, title: "인기 카테고리", description: "트렌딩 주제와 인기 카테고리 표시" },
            { icon: Activity, title: "활동 통계", description: "카테고리별 작성 활동 분석" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "기본 분류", status: "개발 중", progress: 60 },
            { phase: "Phase 2", title: "AI 분류", status: "설계 중", progress: 20 },
            { phase: "Phase 3", title: "추천 시스템", status: "예정", progress: 0 }
          ]
        },
        'auth': {
          title: "사용자 인증",
          description: "안전하고 편리한 로그인 시스템",
          longDescription: "소셜 로그인과 다양한 인증 방법을 지원하는 사용자 친화적인 인증 시스템입니다.",
          features: [
            { icon: UserPlus, title: "소셜 로그인", description: "Google, GitHub, Discord 로그인 지원" },
            { icon: Activity, title: "보안 강화", description: "2FA 및 고급 보안 기능" },
            { icon: Users, title: "프로필 관리", description: "개인화된 사용자 프로필 설정" },
            { icon: Mail, title: "이메일 인증", description: "안전한 이메일 기반 인증" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "기본 인증", status: "개발 중", progress: 90 },
            { phase: "Phase 2", title: "소셜 로그인", status: "개발 중", progress: 70 },
            { phase: "Phase 3", title: "고급 보안", status: "예정", progress: 0 }
          ]
        },
        'community': {
          title: "커뮤니티",
          description: "AI 사고법 전문가들과의 소통 공간",
          longDescription: "깊이 있는 사고와 창의적 아이디어를 공유하고 토론할 수 있는 전문가 커뮤니티입니다.",
          features: [
            { icon: Users, title: "전문가 네트워크", description: "AI 사고법 전문가들과의 직접 소통" },
            { icon: BookOpen, title: "지식 공유", description: "사고법 노하우와 경험 공유" },
            { icon: Heart, title: "피어 리뷰", description: "동료들의 피드백과 조언" },
            { icon: Star, title: "우수 콘텐츠", description: "엄선된 고품질 콘텐츠 큐레이션" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "기본 커뮤니티", status: "설계 중", progress: 40 },
            { phase: "Phase 2", title: "전문가 매칭", status: "예정", progress: 0 },
            { phase: "Phase 3", title: "고급 기능", status: "예정", progress: 0 }
          ]
        },
        'docs': {
          title: "API 문서",
          description: "개발자를 위한 완전한 API 가이드",
          longDescription: "Idea Work Lab의 모든 기능을 외부 앱과 연동할 수 있는 RESTful API 문서입니다.",
          features: [
            { icon: FileText, title: "완전한 레퍼런스", description: "모든 API 엔드포인트 상세 설명" },
            { icon: Zap, title: "실시간 테스트", description: "브라우저에서 직접 API 테스트 가능" },
            { icon: BookOpen, title: "예제 코드", description: "다양한 언어별 샘플 코드" },
            { icon: Users, title: "SDK 제공", description: "JavaScript, Python SDK 제공" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "기본 API", status: "예정", progress: 10 },
            { phase: "Phase 2", title: "SDK 개발", status: "예정", progress: 0 },
            { phase: "Phase 3", title: "고급 기능", status: "예정", progress: 0 }
          ]
        },
        'status': {
          title: "서비스 상태",
          description: "실시간 시스템 상태 모니터링",
          longDescription: "모든 서비스의 실시간 상태를 확인하고 장애 발생 시 즉시 알림을 받을 수 있는 상태 페이지입니다.",
          features: [
            { icon: Activity, title: "실시간 모니터링", description: "24/7 시스템 상태 실시간 추적" },
            { icon: BarChart3, title: "성능 지표", description: "응답 시간, 가동률 등 상세 지표" },
            { icon: Mail, title: "알림 서비스", description: "장애 발생 시 즉시 알림" },
            { icon: FileText, title: "상태 히스토리", description: "과거 장애 이력 및 해결 과정" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "기본 모니터링", status: "예정", progress: 0 },
            { phase: "Phase 2", title: "고급 지표", status: "예정", progress: 0 },
            { phase: "Phase 3", title: "자동화", status: "예정", progress: 0 }
          ]
        },
        'templates': {
          title: "템플릿 라이브러리",
          description: "다양한 목적별 저널 템플릿",
          longDescription: "창의적 사고, 문제 해결, 일일 회고 등 다양한 목적에 맞는 전문적인 저널 템플릿 모음입니다.",
          features: [
            { icon: Layout, title: "다양한 템플릿", description: "목적별 전문 템플릿 라이브러리" },
            { icon: Sparkles, title: "AI 최적화", description: "AI가 추천하는 맞춤형 템플릿" },
            { icon: Users, title: "커뮤니티 템플릿", description: "사용자 제작 템플릿 공유" },
            { icon: BookOpen, title: "가이드 제공", description: "템플릿 활용 가이드 및 예제" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "기본 템플릿", status: "개발 중", progress: 50 },
            { phase: "Phase 2", title: "AI 추천", status: "설계 중", progress: 20 },
            { phase: "Phase 3", title: "커뮤니티 기능", status: "예정", progress: 0 }
          ]
        },
        'ai-tools': {
          title: "AI 도구 모음",
          description: "생각정리를 위한 AI 도구들",
          longDescription: "창의적 사고와 문제 해결을 돕는 다양한 AI 기반 도구들을 한곳에서 사용할 수 있습니다.",
          features: [
            { icon: Lightbulb, title: "아이디어 생성기", description: "주제별 창의적 아이디어 자동 생성" },
            { icon: BarChart3, title: "사고 분석기", description: "사고 패턴 분석 및 개선 제안" },
            { icon: Zap, title: "문제 해결 도구", description: "체계적 문제 해결 프로세스 지원" },
            { icon: Layout, title: "마인드맵 생성", description: "AI 기반 자동 마인드맵 생성" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "기본 도구", status: "개발 중", progress: 30 },
            { phase: "Phase 2", title: "고급 AI", status: "설계 중", progress: 10 },
            { phase: "Phase 3", title: "통합 플랫폼", status: "예정", progress: 0 }
          ]
        },
        'analytics': {
          title: "분석 대시보드",
          description: "저널 활동과 성장 추적",
          longDescription: "개인의 저널 활동을 분석하고 사고 패턴의 변화를 추적할 수 있는 인사이트 대시보드입니다.",
          features: [
            { icon: BarChart3, title: "활동 분석", description: "저널 작성 패턴과 주제 분석" },
            { icon: Activity, title: "성장 추적", description: "창의성과 사고력 향상 지표" },
            { icon: Lightbulb, title: "인사이트 제공", description: "개인화된 개선 방향 제안" },
            { icon: Star, title: "목표 설정", description: "개인 목표 설정 및 달성 추적" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "기본 분석", status: "설계 중", progress: 20 },
            { phase: "Phase 2", title: "AI 인사이트", status: "예정", progress: 0 },
            { phase: "Phase 3", title: "고급 추적", status: "예정", progress: 0 }
          ]
        },
        'blog': {
          title: "블로그",
          description: "AI 사고법 전문 블로그",
          longDescription: "AI와 함께하는 깊이 있는 사고법에 대한 전문적인 인사이트와 경험을 공유하는 블로그입니다.",
          features: [
            { icon: BookOpen, title: "전문 콘텐츠", description: "AI 사고법 전문가의 깊이 있는 글" },
            { icon: Users, title: "게스트 포스트", description: "업계 전문가들의 기고문" },
            { icon: Heart, title: "커뮤니티 참여", description: "댓글과 토론을 통한 소통" },
            { icon: Activity, title: "정기 업데이트", description: "주간 인사이트 및 트렌드 분석" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "기본 블로그", status: "개발 중", progress: 70 },
            { phase: "Phase 2", title: "커뮤니티 기능", status: "설계 중", progress: 30 },
            { phase: "Phase 3", title: "고급 기능", status: "예정", progress: 0 }
          ]
        },
        'careers': {
          title: "채용 정보",
          description: "함께 성장할 팀원을 찾습니다",
          longDescription: "AI와 함께하는 새로운 사고법을 세상에 널리 알리는 사명에 동참할 열정적인 팀원을 찾습니다.",
          features: [
            { icon: Briefcase, title: "다양한 포지션", description: "개발자, 디자이너, 마케터 등 다양한 역할" },
            { icon: Users, title: "원격 근무", description: "전 세계 어디서나 함께 일할 수 있어요" },
            { icon: Star, title: "성장 기회", description: "AI 분야 최신 기술과 함께 성장" },
            { icon: Heart, title: "좋은 문화", description: "자유롭고 창의적인 업무 환경" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "채용 페이지", status: "예정", progress: 0 },
            { phase: "Phase 2", title: "지원 시스템", status: "예정", progress: 0 },
            { phase: "Phase 3", title: "온보딩", status: "예정", progress: 0 }
          ]
        },
        'contact': {
          title: "연락처",
          description: "언제든 연락주세요",
          longDescription: "문의사항, 제안, 협업 요청 등 어떤 이야기든 편하게 연락해주세요. 빠른 시일 내에 답변드리겠습니다.",
          features: [
            { icon: Mail, title: "이메일 문의", description: "24시간 내 답변 보장" },
            { icon: Users, title: "파트너십", description: "비즈니스 파트너십 및 협업 문의" },
            { icon: BookOpen, title: "미디어 문의", description: "인터뷰 및 미디어 협력 요청" },
            { icon: Lightbulb, title: "아이디어 제안", description: "서비스 개선 아이디어 제안" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "기본 연락처", status: "개발 중", progress: 80 },
            { phase: "Phase 2", title: "지원 시스템", status: "설계 중", progress: 40 },
            { phase: "Phase 3", title: "실시간 채팅", status: "예정", progress: 0 }
          ]
        }
      }
    },
    en: {
      title: "Coming Soon",
      subtitle: `${pageName} page is under development`,
      description: "We're working hard to bring you a better experience.",
      backToHome: "Back to Home",
      newsletter: "Get Notified",
      featuresTitle: "Planned Features",
      roadmapTitle: "Development Roadmap",
      notifyMe: "Notify Me",
      
      pages: {
        'journal-write': {
          title: "AI Journal Writing",
          description: "A new journal writing experience with AI",
          longDescription: "Smart journal editor that helps you organize deep thoughts and discover creative ideas with AI assistance.",
          features: [
            { icon: Lightbulb, title: "AI Idea Expansion", description: "New perspectives and ideas on your topics" },
            { icon: Layout, title: "Structure Suggestions", description: "Logical structure and outline generation" },
            { icon: Zap, title: "Real-time Feedback", description: "Live improvement suggestions while writing" },
            { icon: BookOpen, title: "Template Library", description: "Various purpose-specific journal templates" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "Basic Editor", status: "In Development", progress: 80 },
            { phase: "Phase 2", title: "AI Integration", status: "In Design", progress: 30 },
            { phase: "Phase 3", title: "Advanced Features", status: "Planned", progress: 0 }
          ]
        },
        'journal-category': {
          title: "Journal Categories",
          description: "Systematic journal classification and exploration",
          longDescription: "Smart classification system to easily find and explore journals organized by various topics and categories.",
          features: [
            { icon: Layout, title: "Smart Classification", description: "AI-based automatic category classification" },
            { icon: BarChart3, title: "Related Recommendations", description: "Personalized recommendations based on interests" },
            { icon: Users, title: "Popular Categories", description: "Trending topics and popular categories" },
            { icon: Activity, title: "Activity Statistics", description: "Writing activity analysis by category" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "Basic Classification", status: "In Development", progress: 60 },
            { phase: "Phase 2", title: "AI Classification", status: "In Design", progress: 20 },
            { phase: "Phase 3", title: "Recommendation System", status: "Planned", progress: 0 }
          ]
        },
        'auth': {
          title: "User Authentication",
          description: "Secure and convenient login system",
          longDescription: "User-friendly authentication system supporting social login and various authentication methods.",
          features: [
            { icon: UserPlus, title: "Social Login", description: "Google, GitHub, Discord login support" },
            { icon: Activity, title: "Enhanced Security", description: "2FA and advanced security features" },
            { icon: Users, title: "Profile Management", description: "Personalized user profile settings" },
            { icon: Mail, title: "Email Verification", description: "Secure email-based authentication" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "Basic Auth", status: "In Development", progress: 90 },
            { phase: "Phase 2", title: "Social Login", status: "In Development", progress: 70 },
            { phase: "Phase 3", title: "Advanced Security", status: "Planned", progress: 0 }
          ]
        },
        'community': {
          title: "Community",
          description: "Communication space with AI thinking experts",
          longDescription: "Expert community where you can share and discuss deep thoughts and creative ideas.",
          features: [
            { icon: Users, title: "Expert Network", description: "Direct communication with AI thinking experts" },
            { icon: BookOpen, title: "Knowledge Sharing", description: "Sharing thinking methodologies and experiences" },
            { icon: Heart, title: "Peer Review", description: "Feedback and advice from peers" },
            { icon: Star, title: "Quality Content", description: "Curated high-quality content" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "Basic Community", status: "In Design", progress: 40 },
            { phase: "Phase 2", title: "Expert Matching", status: "Planned", progress: 0 },
            { phase: "Phase 3", title: "Advanced Features", status: "Planned", progress: 0 }
          ]
        },
        'docs': {
          title: "API Documentation",
          description: "Complete API guide for developers",
          longDescription: "RESTful API documentation to integrate all Idea Work Lab features with external apps.",
          features: [
            { icon: FileText, title: "Complete Reference", description: "Detailed description of all API endpoints" },
            { icon: Zap, title: "Live Testing", description: "Direct API testing in browser" },
            { icon: BookOpen, title: "Sample Code", description: "Sample code in various languages" },
            { icon: Users, title: "SDK Support", description: "JavaScript, Python SDK provided" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "Basic API", status: "Planned", progress: 10 },
            { phase: "Phase 2", title: "SDK Development", status: "Planned", progress: 0 },
            { phase: "Phase 3", title: "Advanced Features", status: "Planned", progress: 0 }
          ]
        },
        'status': {
          title: "Service Status",
          description: "Real-time system status monitoring",
          longDescription: "Status page to check real-time status of all services and receive instant notifications during outages.",
          features: [
            { icon: Activity, title: "Real-time Monitoring", description: "24/7 real-time system status tracking" },
            { icon: BarChart3, title: "Performance Metrics", description: "Detailed metrics like response time, uptime" },
            { icon: Mail, title: "Notification Service", description: "Instant notifications during outages" },
            { icon: FileText, title: "Status History", description: "Past incident history and resolution process" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "Basic Monitoring", status: "Planned", progress: 0 },
            { phase: "Phase 2", title: "Advanced Metrics", status: "Planned", progress: 0 },
            { phase: "Phase 3", title: "Automation", status: "Planned", progress: 0 }
          ]
        },
        'templates': {
          title: "Template Library",
          description: "Various purpose-specific journal templates",
          longDescription: "Collection of professional journal templates for various purposes like creative thinking, problem solving, and daily reflection.",
          features: [
            { icon: Layout, title: "Diverse Templates", description: "Professional template library by purpose" },
            { icon: Sparkles, title: "AI Optimization", description: "AI-recommended personalized templates" },
            { icon: Users, title: "Community Templates", description: "User-created template sharing" },
            { icon: BookOpen, title: "Guide Provided", description: "Template usage guide and examples" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "Basic Templates", status: "In Development", progress: 50 },
            { phase: "Phase 2", title: "AI Recommendations", status: "In Design", progress: 20 },
            { phase: "Phase 3", title: "Community Features", status: "Planned", progress: 0 }
          ]
        },
        'ai-tools': {
          title: "AI Tools Collection",
          description: "AI tools for thought organization",
          longDescription: "Various AI-based tools to help with creative thinking and problem solving, all in one place.",
          features: [
            { icon: Lightbulb, title: "Idea Generator", description: "Automatic creative idea generation by topic" },
            { icon: BarChart3, title: "Thought Analyzer", description: "Thinking pattern analysis and improvement suggestions" },
            { icon: Zap, title: "Problem Solver", description: "Systematic problem-solving process support" },
            { icon: Layout, title: "Mind Map Creator", description: "AI-based automatic mind map generation" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "Basic Tools", status: "In Development", progress: 30 },
            { phase: "Phase 2", title: "Advanced AI", status: "In Design", progress: 10 },
            { phase: "Phase 3", title: "Integrated Platform", status: "Planned", progress: 0 }
          ]
        },
        'analytics': {
          title: "Analytics Dashboard",
          description: "Track journal activity and growth",
          longDescription: "Insight dashboard to analyze personal journal activity and track changes in thinking patterns.",
          features: [
            { icon: BarChart3, title: "Activity Analysis", description: "Journal writing patterns and topic analysis" },
            { icon: Activity, title: "Growth Tracking", description: "Creativity and thinking improvement metrics" },
            { icon: Lightbulb, title: "Insights Provided", description: "Personalized improvement direction suggestions" },
            { icon: Star, title: "Goal Setting", description: "Personal goal setting and achievement tracking" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "Basic Analytics", status: "In Design", progress: 20 },
            { phase: "Phase 2", title: "AI Insights", status: "Planned", progress: 0 },
            { phase: "Phase 3", title: "Advanced Tracking", status: "Planned", progress: 0 }
          ]
        },
        'blog': {
          title: "Blog",
          description: "AI thinking methodology expert blog",
          longDescription: "Blog sharing professional insights and experiences about deep thinking methodologies with AI.",
          features: [
            { icon: BookOpen, title: "Expert Content", description: "Deep articles by AI thinking experts" },
            { icon: Users, title: "Guest Posts", description: "Contributions from industry experts" },
            { icon: Heart, title: "Community Engagement", description: "Communication through comments and discussions" },
            { icon: Activity, title: "Regular Updates", description: "Weekly insights and trend analysis" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "Basic Blog", status: "In Development", progress: 70 },
            { phase: "Phase 2", title: "Community Features", status: "In Design", progress: 30 },
            { phase: "Phase 3", title: "Advanced Features", status: "Planned", progress: 0 }
          ]
        },
        'careers': {
          title: "Careers",
          description: "Looking for team members to grow together",
          longDescription: "Looking for passionate team members to join the mission of spreading new thinking methodologies with AI to the world.",
          features: [
            { icon: Briefcase, title: "Various Positions", description: "Developers, designers, marketers, and more" },
            { icon: Users, title: "Remote Work", description: "Work together from anywhere in the world" },
            { icon: Star, title: "Growth Opportunities", description: "Grow with the latest AI technologies" },
            { icon: Heart, title: "Great Culture", description: "Free and creative work environment" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "Careers Page", status: "Planned", progress: 0 },
            { phase: "Phase 2", title: "Application System", status: "Planned", progress: 0 },
            { phase: "Phase 3", title: "Onboarding", status: "Planned", progress: 0 }
          ]
        },
        'contact': {
          title: "Contact",
          description: "Feel free to contact us anytime",
          longDescription: "Feel free to contact us with any questions, suggestions, or collaboration requests. We'll respond as soon as possible.",
          features: [
            { icon: Mail, title: "Email Inquiry", description: "Response guaranteed within 24 hours" },
            { icon: Users, title: "Partnership", description: "Business partnership and collaboration inquiries" },
            { icon: BookOpen, title: "Media Inquiries", description: "Interview and media collaboration requests" },
            { icon: Lightbulb, title: "Idea Suggestions", description: "Service improvement idea suggestions" }
          ],
          roadmap: [
            { phase: "Phase 1", title: "Basic Contact", status: "In Development", progress: 80 },
            { phase: "Phase 2", title: "Support System", status: "In Design", progress: 40 },
            { phase: "Phase 3", title: "Live Chat", status: "Planned", progress: 0 }
          ]
        }
      }
    }
  };

  const t = content[language];
  const pageInfo = t.pages[pageKey as keyof typeof t.pages];

  if (!pageInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          language={language} 
          onLanguageToggle={onLanguageToggle} 
          currentPage={currentPage} 
          onNavigate={onNavigate} 
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
            <p className="text-muted-foreground mb-8">{t.subtitle}</p>
            <Button onClick={() => onNavigate('home')} className="bg-iwl-gradient">
              {t.backToHome}
            </Button>
          </div>
        </div>
        <Footer language={language} onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        language={language} 
        onLanguageToggle={onLanguageToggle} 
        currentPage={currentPage} 
        onNavigate={onNavigate} 
      />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-iwl-gradient text-white py-20">
          <div className="container text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-3xl">🚀</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">{pageInfo.title}</h1>
            <p className="text-xl text-white/90 mb-4">{pageInfo.description}</p>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">{pageInfo.longDescription}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate('home')} 
                variant="outline" 
                className="bg-white text-iwl-purple hover:bg-white/90"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                {t.backToHome}
              </Button>
              <Button 
                onClick={() => onNavigate('home')} 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Mail className="w-4 h-4 mr-2" />
                {t.notifyMe}
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{t.featuresTitle}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'ko' 
                  ? "출시 예정인 주요 기능들을 미리 살펴보세요" 
                  : "Preview the key features coming soon"
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pageInfo.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="card-hover text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-iwl-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Roadmap Section */}
        <div className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{t.roadmapTitle}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'ko' 
                  ? "개발 진행 상황을 투명하게 공개합니다" 
                  : "We transparently share our development progress"
                }
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {pageInfo.roadmap.map((phase, index) => (
                <Card key={index} className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{phase.phase}</Badge>
                        <span>{phase.title}</span>
                      </div>
                      <Badge 
                        variant={phase.status === 'In Development' || phase.status === '개발 중' ? 'default' : 'secondary'}
                      >
                        {phase.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{phase.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-iwl-gradient h-2 rounded-full transition-all duration-300"
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-20 bg-iwl-gradient text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">
              {language === 'ko' ? '출시 소식을 가장 먼저 받아보세요' : 'Be the first to know when we launch'}
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              {language === 'ko' 
                ? `${pageInfo.title} 출시 소식과 베타 테스트 기회를 이메일로 받아보세요`
                : `Get ${pageInfo.title} launch news and beta testing opportunities via email`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder={language === 'ko' ? '이메일 주소' : 'Email address'}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder:text-gray-500"
              />
              <Button className="bg-white text-iwl-purple hover:bg-white/90">
                {t.newsletter}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer language={language} onNavigate={onNavigate} />
    </div>
  );
}