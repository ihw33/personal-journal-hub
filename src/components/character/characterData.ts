/**
 * IdeaWorkLab v3.0 Character Data
 * 핵심 캐릭터 프로필 v2.0 (스타일 통일)
 */

// 제공된 정확한 개별 캐릭터 이미지 경로
import saenggagiImage from 'figma:asset/9c71be67fd345ecf4ac64431f71ce8a9e1ba2e83.png';    // 첫 번째 이미지 - 생각이
import archiFoxImage from 'figma:asset/16b02dd8e0fbe1bc1a68326ba76c8a1e1b7b46be.png';   // 두 번째 이미지 - 아키 (여우)  
import mirumiImage from 'figma:asset/b9501c47954f237f5bb07f71aadee09a48c48b1d.png';     // 세 번째 이미지 - 미루미 (왼쪽)
import banjjagiImage from 'figma:asset/b9501c47954f237f5bb07f71aadee09a48c48b1d.png';   // 세 번째 이미지 - 반짝이 (오른쪽)

// 이미지 백업을 위한 고화질 Unsplash 이미지 사용
const fallbackImages = {
  saenggagi: 'https://images.unsplash.com/photo-1596491541280-e2b2d4ac1db2?w=400&h=400&fit=crop&crop=center', // 귀여운 캐릭터
  archi: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=400&fit=crop&crop=center', // 여우
  mirumi: 'https://images.unsplash.com/photo-1554069977-f31bb2d4cac9?w=400&h=400&fit=crop&crop=center', // 귀여운 몬스터
  banjjagi: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop&crop=center' // 마법 정령
};

export interface Character {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  description: string;
  personality: string[];
  specialAbilities: string[];
  catchPhrase: string;
  image: string;
  fallbackImage: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  emotions?: {
    [key: string]: {
      name: string;
      description: string;
      icon: string;
    };
  };
  growthStages?: {
    stage: number;
    title: string;
    description: string;
    items: string[];
    level: string;
  }[];
  situations?: {
    [key: string]: {
      name: string;
      description: string;
      icon: string;
    };
  };
  inspirationModes?: {
    [key: string]: {
      name: string;
      description: string;
      icon: string;
    };
  };
}

export const characters: Character[] = [
  {
    id: 'saenggagi',
    name: '생각이',
    nameEn: 'Saeng-gagi',
    role: '주인공 - 사고력 학습자',
    description: '사용자와 함께 성장하는 귀여운 사고력 학습 파트너입니다. 크고 맑은 파란 눈과 머리에서 자라나는 초록색 새싹이 특징이며, 부드러운 크림색 몸을 가진 사랑스러운 캐릭터입니다. 새싹은 점점 발달하는 사고력을 상징합니다.',
    personality: ['호기심 많은', '성장 지향적', '순수한', '열정적', '배움을 즐기는', '따뜻한', '긍정적인'],
    specialAbilities: ['사고력 성장', '문제 해결', '창의적 발상', 'AI와 협업', '학습 동기부여', '성장 추적'],
    catchPhrase: '함께 생각하면 더 멋진 아이디어가 떠올라요!',
    image: saenggagiImage,
    fallbackImage: fallbackImages.saenggagi,
    colors: {
      primary: '#4fc3f7',    // 라이트 블루 - 순수한 사고 (눈 색깔과 일치)
      secondary: '#81c784',  // 그린 - 성장과 학습 (새싹 색깔과 일치)
      accent: '#fff3c4'      // 크림 - 따뜻함과 친근함 (몸 색깔과 일치)
    },
    emotions: {
      joy: {
        name: '기쁨',
        description: '새로운 것을 배웠을 때의 즐거움과 설렘',
        icon: '😊'
      },
      sadness: {
        name: '슬픔',
        description: '어려운 문제 앞에서 느끼는 당황함과 좌절',
        icon: '😢'
      },
      surprise: {
        name: '놀람',
        description: '예상치 못한 발견의 순간, 눈이 더욱 커짐',
        icon: '😮'
      },
      thinking: {
        name: '깊은 사고',
        description: '골똘히 생각에 잠겨 새싹이 살짝 빛나는 모습',
        icon: '🤔'
      },
      excited: {
        name: '흥분',
        description: '새로운 아이디어를 발견했을 때의 들뜬 모습',
        icon: '🤩'
      },
      confused: {
        name: '혼란',
        description: '복잡한 문제에 직면했을 때의 당황스러운 표정',
        icon: '😵‍💫'
      }
    },
    growthStages: [
      {
        stage: 1,
        title: '초급 사고가 (1~3단계)',
        description: '사고의 첫걸음을 내딛는 단계. 새싹이 조금 더 자라나고 작은 연필을 얻습니다.',
        items: ['작은 연필', '자라난 새싹', '학습 배지'],
        level: 'beginner'
      },
      {
        stage: 2,
        title: '중급 사고가 (4~6단계)',
        description: '체계적 사고력을 기르는 단계. 몸집이 약간 더 커지고 탐구 도구들을 얻습니다.',
        items: ['돋보기', '나침반', '더 큰 몸집', '사고 노트'],
        level: 'intermediate'
      },
      {
        stage: 3,
        title: '고급 사고가 (7~9단계)',
        description: '사고와 재능의 설계자로 성장. 설계자의 모자를 쓰고 빛나는 아이디어 전구를 든 모습.',
        items: ['설계자 모자', '반짝이는 아이디어 전구', '지혜의 망토', '창조의 지팡이'],
        level: 'advanced'
      }
    ]
  },
  {
    id: 'archi',
    name: '아키',
    nameEn: 'Archi the Thinking Fox',
    role: '조력자 - AI 사고 수련 파트너',
    description: '지혜로운 황금빛 여우 멘토로, 사용자의 사고 수련을 도와주는 AI 파트너입니다. 둥근 안경과 깃털펜, 푸른 책이 그의 지적인 매력을 보여주며, 머리 위에 떠다니는 아이디어 전구가 그의 창의적 영감을 상징합니다.',
    personality: ['지혜로운', '인내심 있는', '통찰력 있는', '따뜻한', '체계적인', '창의적인', '도움을 주는'],
    specialAbilities: ['사고 가이드', '창의적 질문', '피드백 제공', 'AI 협업', '지식 전수', '영감 제공'],
    catchPhrase: '좋은 질문이야! 함께 더 깊이 탐구해보자.',
    image: archiFoxImage,
    fallbackImage: fallbackImages.archi,
    colors: {
      primary: '#ff8f00',    // Golden Orange - 따뜻한 지혜 (여우 색깔과 일치)
      secondary: '#1a237e',  // Deep Navy - 전문성과 신뢰
      accent: '#0d47a1'      // Blue - 논리적 사고 (책 색깔과 일치)
    },
    emotions: {
      explaining: {
        name: '설명하는 모습',
        description: '안경을 살짝 올리며 깃털펜으로 지혜롭게 설명',
        icon: '👓'
      },
      encouraging: {
        name: '격려하는 모습',
        description: '생각이의 머리를 쓰다듬며 따뜻한 미소',
        icon: '🤗'
      },
      questioning: {
        name: '질문하는 모습',
        description: '턱을 괴고 호기심 어린 눈빛으로 바라봄',
        icon: '🤨'
      },
      inspired: {
        name: '영감을 주는 모습',
        description: '아이디어 전구가 밝게 빛나며 새로운 관점을 제시',
        icon: '💡'
      }
    }
  },
  {
    id: 'mirumi',
    name: '미루미',
    nameEn: 'Mirumi',
    role: '방해꾼 - 생각정리의 장애물',
    description: '회색빛 젤리처럼 부드러운 몸을 가진 게으름과 산만함의 화신입니다. 항상 피곤해 보이는 반쯤 감긴 눈과 살짝 열린 입이 특징이며, 바닥에 녹아내리듯 퍼져있는 모습으로 미루기와 회피를 상징합니다. 하지만 극복해야 할 도전으로서 성장의 기회를 제공합니다.',
    personality: ['게으른', '산만한', '부정적인', '회피하는', '변명 많은', '나태한', '미루는'],
    specialAbilities: ['집중력 방해', '미루기 유도', '부정적 사고 조장', '의욕 저하', '산만함 생성'],
    catchPhrase: '에이~ 나중에 해도 되지 않을까? 지금은 너무 피곤해...',
    image: mirumiImage,
    fallbackImage: fallbackImages.mirumi,
    colors: {
      primary: '#9e9e9e',    // 회색 - 침체와 무기력 (몸 색깔과 일치)
      secondary: '#757575',  // 다크 그레이 - 부정적 사고
      accent: '#f44336'      // 빨강 - 방해와 지연
    },
    situations: {
      laziness: {
        name: '게으름',
        description: '바닥에 완전히 녹아내리듯 퍼져서 자고 있는 모습',
        icon: '😴'
      },
      overwhelmed: {
        name: '막막함',
        description: '거대한 생각 덩어리 앞에서 어쩔 줄 몰라 울먹이는 모습',
        icon: '😰'
      },
      distraction: {
        name: '딴짓',
        description: '스마트폰을 보며 헤헤거리고 있는 모습',
        icon: '📱'
      },
      exhaustion: {
        name: '지침',
        description: '모든 의욕을 잃고 축 늘어져 있는 모습',
        icon: '😮‍💨'
      },
      avoidance: {
        name: '회피',
        description: '어려운 일 앞에서 몸을 더욱 작게 만드는 모습',
        icon: '🫣'
      }
    }
  },
  {
    id: 'banjjagi',
    name: '반짝이',
    nameEn: 'Banjjagi the Idea Spirit',
    role: '영감의 원천 - 아이디어 정령',
    description: '부드러운 하늘빛 몸을 가진 창의적 영감과 아이디어의 화신입니다. 머리 위의 작은 불꽃과 가슴의 황금빛 코어가 끊임없는 창조적 에너지를 상징하며, 항상 미소를 띤 채 공중에 떠다니며 생각이에게 번뜩이는 아이디어와 영감을 선사하는 신비로운 존재입니다.',
    personality: ['창의적인', '영감을 주는', '신비로운', '활기찬', '변화무쌍한', '순수한', '자유로운'],
    specialAbilities: ['영감 제공', '창의적 연결', '아이디어 생성', '혁신적 사고', '직감 깨우기', '상상력 확장'],
    catchPhrase: '✨ 번뜩! 새로운 아이디어가 떠올랐어요!',
    image: banjjagiImage,
    fallbackImage: fallbackImages.banjjagi,
    colors: {
      primary: '#00bcd4',    // 시아니 - 창의적 영감 (몸 색깔과 일치)
      secondary: '#4fc3f7',  // 라이트 블루 - 자유로운 사고
      accent: '#ffb74d'      // 황금 - 번뜩이는 아이디어 (코어 색깔과 일치)
    },
    inspirationModes: {
      hint: {
        name: '작은 힌트',
        description: '생각이의 귓가에서 작고 은은하게 빛나며 속삭이는 모습',
        icon: '💫'
      },
      eureka: {
        name: '아하! 순간',
        description: '생각이의 머리 위에서 전구처럼 밝게 빛나며 큰 깨달음을 주는 모습',
        icon: '💡'
      },
      explosion: {
        name: '창의적 폭발',
        description: '생각이의 주변을 맴돌며 화려한 빛의 파티클과 별들을 흩뿌리는 모습',
        icon: '✨'
      },
      flow: {
        name: '영감의 흐름',
        description: '부드럽게 흘러다니며 연속적인 아이디어 연결을 돕는 모습',
        icon: '🌊'
      },
      spark: {
        name: '창조의 불꽃',
        description: '머리의 불꽃이 더욱 밝게 타오르며 혁신적 사고를 자극하는 모습',
        icon: '🔥'
      }
    }
  }
];

export const characterContent = {
  ko: {
    title: '핵심 캐릭터들',
    subtitle: '사고와 재능의 설계자들을 만나보세요',
    description: 'IdeaWorkLab의 학습 여정을 함께할 네 명의 특별한 동반자들입니다.',
    emotions: '감정 표현',
    growth: '성장 단계',
    situations: '상황별 모습',
    inspiration: '영감 표현',
    viewDetails: '자세히 보기',
    backToGallery: '갤러리로 돌아가기',
    catchPhrase: '대표 대사',
    personality: '성격',
    abilities: '특별한 능력',
    role: '역할',
    stage: '단계',
    items: '획득 아이템',
    level: {
      beginner: '초급',
      intermediate: '중급',
      advanced: '고급'
    },
    features: {
      appearance: '외모 특징',
      characteristics: '캐릭터 특성',
      specialFeatures: '특별한 기능'
    },
    characterIntroduction: {
      saenggagi: '파란 눈과 초록 새싹을 가진 사랑스러운 학습 파트너',
      archi: '황금빛 여우 모습의 지혜로운 AI 멘토',
      mirumi: '회색 젤리 같은 몸을 가진 게으름의 화신',
      banjjagi: '하늘빛 몸과 황금 코어를 가진 영감의 정령'
    }
  },
  en: {
    title: 'Core Characters',
    subtitle: 'Meet the Architects of Thought and Talent',
    description: 'Four special companions who will join you on your IdeaWorkLab learning journey.',
    emotions: 'Emotions',
    growth: 'Growth Stages',
    situations: 'Situations',
    inspiration: 'Inspiration',
    viewDetails: 'View Details',
    backToGallery: 'Back to Gallery',
    catchPhrase: 'Catchphrase',
    personality: 'Personality',
    abilities: 'Special Abilities',
    role: 'Role',
    stage: 'Stage',
    items: 'Items',
    level: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    },
    features: {
      appearance: 'Appearance',
      characteristics: 'Characteristics',
      specialFeatures: 'Special Features'
    },
    characterIntroduction: {
      saenggagi: 'Lovely learning partner with blue eyes and green sprout',
      archi: 'Wise AI mentor in the form of a golden fox',
      mirumi: 'Embodiment of laziness with a gray jelly-like body',
      banjjagi: 'Spirit of inspiration with sky-blue body and golden core'
    }
  }
};