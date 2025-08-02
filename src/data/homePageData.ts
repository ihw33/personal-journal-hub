/**
 * IdeaWorkLab v4.0 HomePage 데이터
 * 외부화된 홈페이지 데이터 관리
 */

import { Brain, Lightbulb, Target } from 'lucide-react';

// 대표 강의 데이터 타입 정의
export interface FeaturedCourse {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  students: string;
  rating: number;
  icon: any;
  progress: number;
  gradient: string;
}

// 전문가 저널 데이터 타입 정의
export interface FeaturedJournal {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  category: string;
  publishedAt: string;
  views: string;
  likes: number;
  image: string;
}

// 대표 강의 데이터
export const featuredCourses: FeaturedCourse[] = [
  {
    id: 'level-1-3',
    title: 'Level 1-3: 체계적 사고 기초',
    description: '생각이와 함께 시작하는 사고의 첫 걸음. 체계적으로 생각하는 방법을 익히고 논리적 추론 능력을 기릅니다.',
    level: '초급',
    duration: '3주',
    students: '1,200+',
    rating: 4.9,
    icon: Brain,
    progress: 85,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'level-4-6', 
    title: 'Level 4-6: AI 협업 사고법',
    description: '아키와 함께하는 고급 사고 전략. AI와 효과적으로 협업하여 창조적 문제 해결 능력을 키웁니다.',
    level: '중급',
    duration: '3주', 
    students: '800+',
    rating: 4.8,
    icon: Lightbulb,
    progress: 72,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'level-7-9',
    title: 'Level 7-9: 사고 설계 전문가',
    description: '반짝이와 미루미를 극복하며 완성하는 전문가 과정. 복잡한 문제를 체계적으로 설계하고 해결합니다.',
    level: '고급',
    duration: '3주',
    students: '500+', 
    rating: 5.0,
    icon: Target,
    progress: 58,
    gradient: 'from-orange-500 to-red-500'
  }
];

// 전문가 저널 데이터
export const featuredJournals: FeaturedJournal[] = [
  {
    id: 'thinking-methodology-research',
    title: '체계적 사고력 개발 방법론 연구',
    excerpt: '8단계 사고 확장 모델의 이론적 배경과 실증적 검증 결과를 통해 체계적 사고력 개발의 새로운 패러다임을 제시합니다.',
    author: '김사고 박사',
    readTime: '12분',
    category: '사고력 연구',
    publishedAt: '2024.01.20',
    views: '3,500+',
    likes: 287,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop'
  },
  {
    id: 'ai-collaboration-study',
    title: 'AI 협업 기반 학습 효과성 분석',
    excerpt: 'AI 학습 파트너와의 상호작용이 학습자의 메타인지 능력과 창의적 사고력 향상에 미치는 영향을 실증적으로 분석했습니다.',
    author: '이혁신 연구원',
    readTime: '15분',
    category: 'AI 교육',
    publishedAt: '2024.01.15',
    views: '4,200+',
    likes: 356,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop'
  },
  {
    id: 'personalized-learning-framework',
    title: '개인화 학습 시스템 설계 프레임워크',
    excerpt: '개별 학습자의 인지 특성과 학습 패턴을 분석하여 최적화된 개인 맞춤형 학습 경로를 제공하는 시스템을 소개합니다.',
    author: '박미래 교수',
    readTime: '18분',
    category: '교육 기술',
    publishedAt: '2024.01.10',
    views: '2,800+',
    likes: 198,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop'
  }
];

// 소셜 프루프 데이터
export interface SocialProofStat {
  value: string;
  label: string;
  description: string;
  icon: any;
  gradient: string;
  textColor: string;
}

export const socialProofStats: SocialProofStat[] = [
  {
    value: '98%',
    label: '사용자 만족도',
    description: '실제 사용자 피드백 기반',
    icon: 'Heart',
    gradient: 'bg-iwl-gradient',
    textColor: 'text-iwl-purple'
  },
  {
    value: '1,000+',
    label: '전문가 검증',
    description: '교육·심리학 전문가 협력',
    icon: 'Award',
    gradient: 'bg-iwl-accent-gradient',
    textColor: 'text-iwl-accent'
  },
  {
    value: '92%',
    label: '학습 완료율',
    description: '업계 평균 대비 3배 높음',
    icon: 'TrendingUp',
    gradient: 'bg-iwl-ai-gradient',
    textColor: 'text-iwl-ai-primary'
  },
  {
    value: '5,000+',
    label: '활성 사용자',
    description: '매일 함께 성장하는 학습자',
    icon: 'Users',
    gradient: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    textColor: 'text-emerald-600'
  }
];