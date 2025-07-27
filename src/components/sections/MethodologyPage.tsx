import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Footer } from './Footer';
import { 
  Brain, 
  Lightbulb, 
  Target, 
  Eye,
  TrendingUp,
  Zap,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Layers,
  Search,
  PuzzleIcon as Puzzle,
  Rocket,
  RefreshCw,
  ArrowDown,
  ChevronRight,
  Sprout,
  Star,
  Award,
  GraduationCap
} from 'lucide-react';

interface MethodologyPageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function MethodologyPage({ language, onNavigate }: MethodologyPageProps) {
  const [visibleStages, setVisibleStages] = useState<number[]>([]);

  // 스크롤 시 단계별로 나타나는 효과
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stageIndex = parseInt(entry.target.getAttribute('data-stage') || '0');
          setVisibleStages(prev => [...prev.filter(i => i !== stageIndex), stageIndex].sort());
        }
      });
    }, observerOptions);

    // 관찰할 요소들 등록
    const stageElements = document.querySelectorAll('[data-stage]');
    stageElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const content = {
    ko: {
      // 헤더 섹션
      pageTitle: "생각의 지도를 드립니다: IdeaWorkLab의 사고 확장 8단계 모델",
      pageSubtitle: "우리는 매일 생각하지만, 생각의 '과정'은 눈에 보이지 않습니다. IdeaWorkLab은 보이지 않는 생각을 보이게 만드는 체계적인 '사고의 지도'를 제시합니다. 8단계로 구성된 이 모델을 통해 당신은 현재 자신의 사고가 어느 단계에 있는지 객관적으로 파악하고, 다음 단계로 성장하기 위한 명확한 길을 발견하게 될 것입니다.",
      
      // 1. 자기 인식의 사다리 (기존 3번을 1번으로)
      section1Title: "1. 성장의 핵심, 나를 아는 힘: 자기 인식의 사다리",
      section1Subtitle: "모든 사고 발전의 핵심 동력인 '자기 인식'의 중요성을 강조합니다.",
      
      selfAwarenessLevels: [
        {
          level: 1,
          title: "나도 모르게 하는 생각",
          description: "무의식적으로 이루어지는 자동적 사고 패턴. 습관적이고 반사적인 사고 상태로, 자신이 어떤 생각을 하고 있는지조차 인식하지 못하는 단계입니다."
        },
        {
          level: 2,
          title: "내가 생각하고 있음을 아는 상태",
          description: "자신이 현재 생각하고 있다는 사실을 인지하는 단계. 사고 활동 자체에 대한 기본적인 자각이 생기기 시작하는 의식적 전환점입니다."
        },
        {
          level: 3,
          title: "내가 어떻게 생각하는지 아는 상태",
          description: "자신의 사고 방식과 패턴을 구체적으로 관찰하고 이해하는 단계. 사고 과정의 특징과 습관을 객관적으로 파악할 수 있게 됩니다."
        },
        {
          level: 4,
          title: "내 생각의 패턴을 조절할 수 있는 상태",
          description: "사고 패턴을 의식적으로 선택하고 조절할 수 있는 최고 수준의 메타인지 단계. 상황에 맞는 최적의 사고 방식을 능동적으로 선택할 수 있습니다."
        }
      ],
      
      // 2. 구분 기준 (기존 2번 유지)
      section2Title: "2. 무엇이 생각의 수준을 결정하는가: 4가지 기준",
      section2Subtitle: "사고의 발전을 구분 짓는 4가지 핵심 기준입니다.",
      
      criteria: [
        {
          name: "정보 처리의 깊이",
          description: "정보를 얼마나 깊이 있게 해석하는가",
          detail: "표면적 이해에서 본질적 의미까지, 정보를 다층적으로 분석하고 해석하는 능력의 깊이를 의미합니다.",
          icon: Brain,
          color: "#7C3AED"
        },
        {
          name: "추상화 수준",
          description: "구체적인 사실에서 얼마나 보편적인 원리를 이끌어내는가",
          detail: "개별 사례에서 일반 법칙을, 구체적 현상에서 추상적 개념을 도출해내는 사고의 고도화 정도입니다.",
          icon: TrendingUp,
          color: "#3B82F6"
        },
        {
          name: "사고 조작 방식",
          description: "정보를 어떻게 분석, 조합, 통합하는가",
          detail: "다양한 정보를 체계적으로 분석하고, 창의적으로 조합하며, 논리적으로 통합하는 사고 운용 능력입니다.",
          icon: Zap,
          color: "#10B981"
        },
        {
          name: "자기 인식 수준",
          description: "자신의 사고 과정을 얼마나 스스로 인지하고 통제하는가",
          detail: "자신의 사고 방식을 객관적으로 관찰하고, 필요에 따라 의식적으로 조절할 수 있는 메타인지 능력입니다.",
          icon: Lightbulb,
          color: "#F59E0B"
        }
      ],
      
      // 3. 8단계 모델 (기존 1번을 3번으로)
      section3Title: "3. 사고 확장 8단계 모델: 생각의 성장 로드맵",
      section3Subtitle: "생각이 깊어지고 확장되는 과정을 8개의 단계로 구조화한 IdeaWorkLab의 핵심 인지 모델입니다.",
      
      // 블룸의 분류학 기반 인지 발전 수준 (학술적 근거 명시)
      cognitiveLevel: {
        understanding: {
          name: "이해 단계",
          description: "정보를 받아들이고 의미를 파악하는 기초 인지 과정",
          englishName: "Understanding (Bloom's Taxonomy)",
          academicBasis: "블룸 분류학의 '이해' 단계",
          icon: Sprout,
          color: "#22C55E",
          bgColor: "#F0FDF4"
        },
        analyzing: {
          name: "분석 단계", 
          description: "정보를 구성요소로 분해하고 관계를 파악하는 분석적 사고",
          englishName: "Analyzing (Bloom's Taxonomy)",
          academicBasis: "블룸 분류학의 '분석' 단계",
          icon: Search,
          color: "#F59E0B",
          bgColor: "#FFFBEB"
        },
        evaluating: {
          name: "평가 단계",
          description: "기준에 따라 판단하고 가치를 평가하는 비판적 사고",
          englishName: "Evaluating (Bloom's Taxonomy)", 
          academicBasis: "블룸 분류학의 '평가' 단계",
          icon: Star,
          color: "#3B82F6",
          bgColor: "#EFF6FF"
        },
        creating: {
          name: "창조 단계",
          description: "새로운 아이디어를 생성하고 실행하는 최고 수준의 사고",
          englishName: "Creating (Bloom's Taxonomy)",
          academicBasis: "블룸 분류학의 '창조' 단계",
          icon: Award,
          color: "#7C3AED", 
          bgColor: "#F5F3FF"
        }
      },
      
      stages: [
        {
          level: "1단계",
          name: "지각 인지",
          englishName: "Perception",
          description: "감각 정보를 수동적으로 받아들이는 단계",
          detail: "외부 자극을 인식하고 기본적인 정보를 수집하는 가장 기초적인 사고 과정입니다. 오감을 통해 들어오는 정보를 단순히 받아들이는 수동적 인지 상태로, 모든 사고 활동의 출발점이 됩니다.",
          icon: Eye,
          color: "#EF4444",
          bgColor: "#FEF2F2",
          cognitiveLevel: 'understanding'
        },
        {
          level: "2단계",
          name: "요약 및 맥락 이해",
          englishName: "Comprehension",
          description: "정보의 핵심을 파악하고 의미 단위로 묶는 단계",
          detail: "받아들인 정보를 정리하고 기본적인 의미를 파악하는 과정입니다. 흩어진 정보들 사이의 연관성을 찾아 의미 있는 단위로 조직화하며, 전체적인 맥락 안에서 정보를 이해하기 시작합니다.",
          icon: BookOpen,
          color: "#F97316",
          bgColor: "#FFF7ED",
          cognitiveLevel: 'understanding'
        },
        {
          level: "3단계",
          name: "구조적 이해",
          englishName: "Structural Comprehension",
          description: "정보 간의 논리적 관계와 구조를 파악하는 단계",
          detail: "정보들 간의 연결점과 체계를 이해하고 전체적인 틀을 구성하는 과정입니다. 인과관계, 위계구조, 상호작용 등 정보들 사이의 복잡한 관계망을 체계적으로 파악하여 논리적 구조를 만들어냅니다.",
          icon: Layers,
          color: "#F59E0B",
          bgColor: "#FFFBEB",
          cognitiveLevel: 'analyzing'
        },
        {
          level: "4단계",
          name: "비판적 사고",
          englishName: "Critical Thinking",
          description: "정보를 분석하고 타당성을 평가하며 의견을 생성하는 단계",
          detail: "객관적인 분석을 통해 정보의 신뢰성을 판단하고 논리적 결론을 도출하는 과정입니다. 증거의 질을 평가하고, 논리적 오류를 찾아내며, 다양한 관점을 고려하여 균형 잡힌 판단을 내립니다.",
          icon: Search,
          color: "#84CC16",
          bgColor: "#F7FEE7",
          cognitiveLevel: 'analyzing'
        },
        {
          level: "5단계",
          name: "보이지 않는 의미 파악",
          englishName: "Inferential Thinking",
          description: "정보 표면 아래 숨은 의도나 함의를 추론하는 단계",
          detail: "명시되지 않은 의미를 읽어내고 행간의 뜻을 파악하는 고차원적 사고 과정입니다. 직접적으로 표현되지 않은 의도, 가정, 전제조건들을 추론하여 더 깊은 층위의 이해에 도달합니다.",
          icon: Target,
          color: "#22C55E",
          bgColor: "#F0FDF4",
          cognitiveLevel: 'evaluating'
        },
        {
          level: "6단계",
          name: "창조적 통합",
          englishName: "Creative Synthesis",
          description: "서로 다른 정보들을 연결하여 새로운 개념을 만들어내는 단계",
          detail: "기존의 아이디어들을 조합하고 재구성하여 혁신적인 통찰을 창출하는 과정입니다. 전혀 다른 영역의 개념들을 연결하고, 기존 패러다임을 뛰어넘는 새로운 관점과 해결책을 만들어냅니다.",
          icon: Puzzle,
          color: "#3B82F6",
          bgColor: "#EFF6FF",
          cognitiveLevel: 'evaluating'
        },
        {
          level: "7단계",
          name: "실행",
          englishName: "Execution",
          description: "생각을 바탕으로 목표 지향적 계획을 세우고 현실에 구현하는 단계",
          detail: "아이디어를 실제 행동으로 옮기고 구체적인 결과물을 만들어내는 실천 과정입니다. 전략적 계획 수립부터 단계별 실행, 성과 측정까지 사고를 현실 세계의 가치로 전환시킵니다.",
          icon: Rocket,
          color: "#7C3AED",
          bgColor: "#F5F3FF",
          cognitiveLevel: 'creating'
        },
        {
          level: "8단계",
          name: "메타인지",
          englishName: "Metacognition",
          description: "자신의 사고 과정을 객관적으로 관찰하고 조절하는 최상위 단계",
          detail: "사고에 대한 사고를 통해 자신의 인지 능력을 성찰하고 개선하는 최고 수준의 사고입니다. 자신의 사고 과정을 모니터링하고, 사고 전략을 의식적으로 선택하며, 지속적으로 사고 능력을 발전시켜 나갑니다.",
          icon: RefreshCw,
          color: "#EC4899",
          bgColor: "#FDF2F8",
          cognitiveLevel: 'creating'
        }
      ],
      
      // 블룸의 분류학 근거 섹션 (페이지 맨 아래로 이동)
      academicBasisTitle: "학술적 근거: 블룸의 분류학 기반 사고 발전 모델",
      academicBasisSubtitle: "이 모델은 교육학계에서 60년 이상 검증된 '블룸의 분류학(Bloom's Taxonomy)'을 기반으로 설계되었습니다.",
      bloomsReference: "Benjamin Bloom(1956)과 Anderson & Krathwohl(2001)의 개정된 인지 분류학을 사고확장 관점에서 재해석한 체계적 학습 모델입니다.",
      
      // CTA 섹션
      ctaTitle: "나의 현재 위치는 어디일까요?",
      ctaSubtitle: "지금 바로 자신의 사고 수준을 진단하고, 다음 단계로 성장하는 여정을 시작하세요.",
      primaryCTA: "자기 진단 테스트 시작하기",
      secondaryCTA: "강의/코칭 프로그램 보기",
      
      // 추가 정보
      pyramidTitle: "사고 확장 피라미드",
      criteriaTitle: "사고 구분 기준",
      ladderTitle: "자기 인식의 사다리",
      pyramidDescription: "1단계부터 8단계로 올라갈수록 더 높은 수준의 사고 능력을 의미합니다",
      scrollHint: "아래로 스크롤하여 각 단계를 확인해보세요",
      stageProgress: "사고 수준"
    },
    en: {
      // 헤더 섹션
      pageTitle: "Here's Your Thinking Map: IdeaWorkLab's 8-Stage Cognitive Expansion Model",
      pageSubtitle: "We think every day, but the 'process' of thinking is invisible. IdeaWorkLab presents a systematic 'thinking map' that makes invisible thoughts visible. Through this 8-stage model, you will objectively understand what stage your current thinking is at and discover a clear path to grow to the next level.",
      
      // 1. 자기 인식의 사다리
      section1Title: "1. The Core of Growth, The Power of Self-Knowledge: The Ladder of Self-Awareness",
      section1Subtitle: "Emphasizing the importance of 'self-awareness' as the core driving force of all cognitive development.",
      
      selfAwarenessLevels: [
        {
          level: 1,
          title: "Unconscious thinking",
          description: "Automatic thought patterns that occur unconsciously. Habitual and reflexive thinking states where one doesn't even recognize what thoughts they are having."
        },
        {
          level: 2,
          title: "Knowing that I am thinking",
          description: "The stage of recognizing that you are currently thinking. A conscious turning point where basic awareness of thinking activity itself begins to emerge."
        },
        {
          level: 3,
          title: "Knowing how I think",
          description: "The stage of specifically observing and understanding your own thinking patterns and methods. You become able to objectively identify the characteristics and habits of your thought processes."
        },
        {
          level: 4,
          title: "Being able to control my thinking patterns",
          description: "The highest level of metacognition where you can consciously choose and regulate thinking patterns. You can actively select optimal thinking methods suited to different situations."
        }
      ],
      
      // 2. 구분 기준
      section2Title: "2. What Determines the Level of Thinking: 4 Key Criteria",
      section2Subtitle: "Four core criteria that distinguish the development of thinking.",
      
      criteria: [
        {
          name: "Depth of Processing",
          description: "How deeply information is interpreted",
          detail: "The depth of ability to analyze and interpret information on multiple levels, from superficial understanding to essential meaning.",
          icon: Brain,
          color: "#7C3AED"
        },
        {
          name: "Level of Abstraction",
          description: "How much universal principles are derived from concrete facts",
          detail: "The degree of sophisticated thinking that derives general laws from individual cases and abstract concepts from concrete phenomena.",
          icon: TrendingUp,
          color: "#3B82F6"
        },
        {
          name: "Cognitive Operation Type",
          description: "How information is analyzed, combined, and integrated",
          detail: "The cognitive operational ability to systematically analyze, creatively combine, and logically integrate various information.",
          icon: Zap,
          color: "#10B981"
        },
        {
          name: "Self-awareness Level",
          description: "How much one recognizes and controls their own thinking process",
          detail: "The metacognitive ability to objectively observe one's thinking methods and consciously regulate them as needed.",
          icon: Lightbulb,
          color: "#F59E0B"
        }
      ],
      
      // 3. 8단계 모델
      section3Title: "3. 8-Stage Cognitive Expansion Model: A Roadmap for Thinking Growth",
      section3Subtitle: "IdeaWorkLab's core cognitive model that structures the process of deepening and expanding thought into 8 stages.",
      
      // 블룸의 분류학 기반 인지 발전 수준
      cognitiveLevel: {
        understanding: {
          name: "Understanding Stage",
          description: "Basic cognitive process of receiving information and grasping meaning",
          englishName: "Understanding (Bloom's Taxonomy)",
          academicBasis: "'Understanding' stage of Bloom's Taxonomy",
          icon: Sprout,
          color: "#22C55E",
          bgColor: "#F0FDF4"
        },
        analyzing: {
          name: "Analyzing Stage",
          description: "Analytical thinking that breaks down information into components and identifies relationships",
          englishName: "Analyzing (Bloom's Taxonomy)",
          academicBasis: "'Analyzing' stage of Bloom's Taxonomy",
          icon: Search,
          color: "#F59E0B",
          bgColor: "#FFFBEB"
        },
        evaluating: {
          name: "Evaluating Stage",
          description: "Critical thinking that judges based on criteria and evaluates values",
          englishName: "Evaluating (Bloom's Taxonomy)",
          academicBasis: "'Evaluating' stage of Bloom's Taxonomy",
          icon: Star,
          color: "#3B82F6",
          bgColor: "#EFF6FF"
        },
        creating: {
          name: "Creating Stage",
          description: "Highest level thinking that generates and implements new ideas",
          englishName: "Creating (Bloom's Taxonomy)",
          academicBasis: "'Creating' stage of Bloom's Taxonomy",
          icon: Award,
          color: "#7C3AED",
          bgColor: "#F5F3FF"
        }
      },
      
      stages: [
        {
          level: "Stage 1",
          name: "Perception",
          englishName: "지각 인지",
          description: "Passively receiving sensory information",
          detail: "The most basic thinking process of recognizing external stimuli and gathering fundamental information. A passive cognitive state that simply receives information through the five senses, serving as the starting point for all thinking activities.",
          icon: Eye,
          color: "#EF4444",
          bgColor: "#FEF2F2",
          cognitiveLevel: 'understanding'
        },
        {
          level: "Stage 2",
          name: "Comprehension",
          englishName: "요약 및 맥락 이해",
          description: "Grasping key information and grouping it into meaningful units",
          detail: "The process of organizing received information and understanding its basic meaning. Finding connections between scattered information to organize them into meaningful units and beginning to understand information within an overall context.",
          icon: BookOpen,
          color: "#F97316",
          bgColor: "#FFF7ED",
          cognitiveLevel: 'understanding'
        },
        {
          level: "Stage 3",
          name: "Structural Comprehension",
          englishName: "구조적 이해",
          description: "Understanding logical relationships and structures between information",
          detail: "The process of understanding connections and systems between information and constructing an overall framework. Systematically understanding complex networks of relationships such as causality, hierarchical structures, and interactions to create logical structures.",
          icon: Layers,
          color: "#F59E0B",
          bgColor: "#FFFBEB",
          cognitiveLevel: 'analyzing'
        },
        {
          level: "Stage 4",
          name: "Critical Thinking",
          englishName: "비판적 사고",
          description: "Analyzing information, evaluating validity, and generating opinions",
          detail: "The process of judging information credibility through objective analysis and drawing logical conclusions. Evaluating the quality of evidence, identifying logical fallacies, and making balanced judgments considering various perspectives.",
          icon: Search,
          color: "#84CC16",
          bgColor: "#F7FEE7",
          cognitiveLevel: 'analyzing'
        },
        {
          level: "Stage 5",
          name: "Inferential Thinking",
          englishName: "보이지 않는 의미 파악",
          description: "Inferring hidden intentions or implications beneath the surface",
          detail: "High-level thinking process of reading unspoken meanings and grasping between-the-lines implications. Inferring intentions, assumptions, and preconditions that are not directly expressed to reach deeper levels of understanding.",
          icon: Target,
          color: "#22C55E",
          bgColor: "#F0FDF4",
          cognitiveLevel: 'evaluating'
        },
        {
          level: "Stage 6",
          name: "Creative Synthesis",
          englishName: "창조적 통합",
          description: "Connecting different information to create new concepts",
          detail: "The process of combining and reconstructing existing ideas to create innovative insights. Connecting concepts from completely different domains and creating new perspectives and solutions that transcend existing paradigms.",
          icon: Puzzle,
          color: "#3B82F6",
          bgColor: "#EFF6FF",
          cognitiveLevel: 'evaluating'
        },
        {
          level: "Stage 7",
          name: "Execution",
          englishName: "실행",
          description: "Creating goal-oriented plans and implementing them in reality",
          detail: "The practical process of translating ideas into actual actions and creating concrete results. Converting thinking into real-world value from strategic planning through step-by-step execution to performance measurement.",
          icon: Rocket,
          color: "#7C3AED",
          bgColor: "#F5F3FF",
          cognitiveLevel: 'creating'
        },
        {
          level: "Stage 8",
          name: "Metacognition",
          englishName: "메타인지",
          description: "Objectively observing and regulating one's thinking process",
          detail: "The highest level of thinking that reflects on and improves one's cognitive abilities through thinking about thinking. Monitoring one's thought processes, consciously choosing thinking strategies, and continuously developing cognitive abilities.",
          icon: RefreshCw,
          color: "#EC4899",
          bgColor: "#FDF2F8",
          cognitiveLevel: 'creating'
        }
      ],
      
      // 블룸의 분류학 근거 섹션 (페이지 맨 아래로 이동)
      academicBasisTitle: "Academic Foundation: Bloom's Taxonomy-Based Cognitive Development Model",
      academicBasisSubtitle: "This model is designed based on 'Bloom's Taxonomy', which has been validated in education for over 60 years.",
      bloomsReference: "A systematic learning model that reinterprets Benjamin Bloom's (1956) and Anderson & Krathwohl's (2001) revised cognitive taxonomy from a cognitive expansion perspective.",
      
      // CTA 섹션
      ctaTitle: "Where Am I Now?",
      ctaSubtitle: "Start diagnosing your current thinking level right now and begin your journey to grow to the next stage.",
      primaryCTA: "Start Self-Diagnosis Test",
      secondaryCTA: "View Courses/Coaching Programs",
      
      // 추가 정보
      pyramidTitle: "Cognitive Expansion Pyramid",
      criteriaTitle: "Thinking Classification Criteria",
      ladderTitle: "Ladder of Self-Awareness",
      pyramidDescription: "Higher stages from 1 to 8 represent more advanced thinking capabilities",
      scrollHint: "Scroll down to explore each stage",
      stageProgress: "Thinking Level"
    }
  };

  const t = content[language];

  // 인지 수준별 단계 그룹화
  const stagesByLevel = {
    understanding: t.stages.filter(stage => stage.cognitiveLevel === 'understanding'),
    analyzing: t.stages.filter(stage => stage.cognitiveLevel === 'analyzing'),
    evaluating: t.stages.filter(stage => stage.cognitiveLevel === 'evaluating'),
    creating: t.stages.filter(stage => stage.cognitiveLevel === 'creating')
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 섹션 */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-iwl-purple-50 to-iwl-blue-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t.pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t.pageSubtitle}
          </p>
        </div>
      </section>

      {/* 1. 자기 인식의 사다리 (기존 3번을 1번으로) */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.section1Title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t.section1Subtitle}
            </p>
          </div>

          {/* 사다리 시각화 - 1단계부터 4단계로 */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-center mb-8 text-iwl-purple">
              {t.ladderTitle}
            </h3>
            
            <div className="space-y-8">
              {t.selfAwarenessLevels.map((level, index) => {
                const colors = ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B'];
                const bgColors = ['#F5F3FF', '#EFF6FF', '#F0FDF4', '#FFFBEB'];
                
                return (
                  <div key={index} className="relative">
                    {/* 연결선 */}
                    {index < t.selfAwarenessLevels.length - 1 && (
                      <div className="absolute left-6 md:left-8 top-20 w-0.5 h-8 bg-gradient-to-b from-current to-transparent opacity-30 z-0"
                           style={{ color: colors[index] }}></div>
                    )}
                    
                    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-iwl-purple/30 group">
                      <CardContent className="p-6 md:p-8" style={{ backgroundColor: bgColors[index] }}>
                        <div className="flex items-start gap-4 md:gap-6">
                          {/* 단계 번호 */}
                          <div 
                            className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white text-lg md:text-xl font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                            style={{ backgroundColor: colors[index] }}
                          >
                            {level.level}
                          </div>
                          
                          {/* 콘텐츠 */}
                          <div className="flex-1">
                            <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                              {level.title}
                            </h4>
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                              {level.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. 사고 단계 구분 기준 (기존 2번 유지) */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.section2Title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t.section2Subtitle}
            </p>
          </div>

          {/* 4가지 기준 */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-center mb-8 text-iwl-blue">
              {t.criteriaTitle}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {t.criteria.map((criterion, index) => {
                const Icon = criterion.icon;
                return (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-iwl-blue/30 group">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-start gap-4 md:gap-6">
                        <div 
                          className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                          style={{ backgroundColor: criterion.color }}
                        >
                          <Icon className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                            {criterion.name}
                          </h4>
                          <p className="text-sm md:text-base text-gray-600 mb-3 font-medium">
                            {criterion.description}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                            {criterion.detail}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. 사고 확장 8단계 모델 (기존 1번을 3번으로) */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.section3Title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              {t.section3Subtitle}
            </p>
          </div>

          {/* 블룸의 분류학 기반 8단계 피라미드 */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-xl md:text-2xl font-semibold text-iwl-purple mb-2">
                {t.pyramidTitle}
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-4">
                {t.pyramidDescription}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <ArrowDown className="w-4 h-4 animate-bounce" />
                <span>{t.scrollHint}</span>
              </div>
            </div>

            {/* 블룸의 분류학 기반 인지 수준별 섹션 */}
            {Object.entries(stagesByLevel).map(([levelKey, stages]) => {
              const levelInfo = t.cognitiveLevel[levelKey as keyof typeof t.cognitiveLevel];
              const LevelIcon = levelInfo.icon;
              
              return (
                <div key={levelKey} className="mb-16">
                  {/* 인지 수준 헤더 - 블룸의 분류학 근거 표시 */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
                        style={{ backgroundColor: levelInfo.color }}
                      >
                        <LevelIcon className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900">
                          {levelInfo.name}
                        </h4>
                        <p className="text-sm md:text-base text-gray-600">
                          {levelInfo.description}
                        </p>
                        <p className="text-xs md:text-sm text-gray-500 italic">
                          {levelInfo.academicBasis}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 해당 수준의 단계들 */}
                  <div className="space-y-8 relative">
                    {/* 중앙 연결선 */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-current to-transparent opacity-20 z-0"
                         style={{ color: levelInfo.color }}></div>
                    
                    {stages.map((stage, stageIndex) => {
                      const Icon = stage.icon;
                      const globalIndex = t.stages.findIndex(s => s.level === stage.level);
                      const isVisible = visibleStages.includes(globalIndex);
                      
                      return (
                        <div 
                          key={stage.level} 
                          className="relative z-10"
                          data-stage={globalIndex}
                        >
                          <div className="flex justify-center relative">
                            {/* 단계 표시 원 */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 z-20">
                              <div 
                                className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs md:text-sm font-bold shadow-lg transition-all duration-500 ${
                                  isVisible ? 'scale-125 shadow-xl' : ''
                                }`}
                                style={{ backgroundColor: stage.color }}
                              >
                                {globalIndex + 1}
                              </div>
                            </div>
                            
                            {/* 메인 카드 */}
                            <Card 
                              className={`group hover:shadow-2xl transition-all duration-500 border-2 cursor-pointer ${
                                isVisible 
                                  ? 'shadow-xl border-opacity-70 -translate-y-2 bg-opacity-100' 
                                  : 'hover:border-opacity-50 hover:-translate-y-1'
                              }`}
                              style={{ 
                                width: 'min(95%, 850px)',
                                minWidth: '300px',
                                borderColor: stage.color + (isVisible ? '70' : '30'),
                                backgroundColor: isVisible ? stage.bgColor : '#ffffff'
                              }}
                            >
                              <CardContent className="p-6 md:p-8 lg:p-10">
                                <div className="flex items-start gap-4 md:gap-6">
                                  {/* 아이콘 */}
                                  <div 
                                    className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-white flex-shrink-0 transition-transform duration-300 shadow-lg ${
                                      isVisible ? 'scale-110' : 'group-hover:scale-110'
                                    }`}
                                    style={{ backgroundColor: stage.color }}
                                  >
                                    <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                                  </div>
                                  
                                  {/* 콘텐츠 */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                                      <Badge 
                                        variant="outline" 
                                        className="text-xs w-fit border-0 text-white font-medium"
                                        style={{ backgroundColor: stage.color }}
                                      >
                                        {stage.level}
                                      </Badge>
                                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                        <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                                          {stage.name}
                                        </h4>
                                        <span className="text-sm text-gray-500 hidden sm:inline">
                                          ({stage.englishName})
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-3 font-medium">
                                      {stage.description}
                                    </p>
                                    
                                    <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed">
                                      {stage.detail}
                                    </p>
                                  </div>
                                </div>
                                
                                {/* 단계별 진행률 표시 */}
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                  <div className="flex justify-between items-center text-xs md:text-sm text-gray-600 mb-2">
                                    <span>{t.stageProgress}</span>
                                    <span>{Math.round(((globalIndex + 1) / 8) * 100)}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="h-2 rounded-full transition-all duration-700 group-hover:animate-pulse"
                                      style={{ 
                                        width: `${((globalIndex + 1) / 8) * 100}%`,
                                        backgroundColor: stage.color
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          
                          {/* 화살표 (해당 수준의 마지막 단계가 아닐 때) */}
                          {stageIndex < stages.length - 1 && (
                            <div className="flex justify-center mt-6 relative z-10">
                              <div className="flex items-center">
                                <ArrowDown className="w-5 h-5 md:w-6 md:h-6 animate-bounce" style={{ color: levelInfo.color }} />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* 다음 수준으로의 화살표 (마지막 수준이 아닐 때) */}
                  {levelKey !== 'creating' && (
                    <div className="flex justify-center mt-12 mb-8">
                      <div className="flex items-center gap-3 px-6 py-3 bg-gray-100 rounded-full">
                        <ArrowDown className="w-6 h-6 text-iwl-purple animate-pulse" />
                        <span className="text-sm font-medium text-gray-700">다음 인지 수준</span>
                        <ArrowDown className="w-6 h-6 text-iwl-purple animate-pulse" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 md:py-20 bg-iwl-gradient text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t.ctaSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('auth')}
              size="lg"
              className="bg-white text-iwl-purple hover:bg-gray-50 font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {t.primaryCTA}
            </Button>
            <Button 
              onClick={() => onNavigate('courses')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-iwl-purple font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              {t.secondaryCTA}
            </Button>
          </div>
        </div>
      </section>

      {/* 학술적 근거 섹션 - 페이지 맨 아래 (Footer 바로 위) */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <GraduationCap className="w-8 h-8 text-iwl-purple" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {t.academicBasisTitle}
              </h2>
            </div>
            <p className="text-base md:text-lg text-gray-700 mb-4">
              {t.academicBasisSubtitle}
            </p>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm md:text-base text-gray-600 italic">
                {t.bloomsReference}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} onNavigate={onNavigate} />
    </div>
  );
}