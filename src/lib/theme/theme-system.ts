// IWL 4.0 Level-based Theme System
import type { UserLevel, ThemeConfig } from '@/types/iwl4-integration';

// 레벨별 테마 정의
export const LEVEL_THEMES: Record<UserLevel, ThemeConfig> = {
  junior: {
    level: 'junior',
    colors: {
      primary: '#FF6B6B',        // 밝은 빨간색 - 생동감
      secondary: '#4ECDC4',      // 터키석 - 신선함
      accent: '#FFE66D',         // 밝은 노란색 - 활기
      background: '#FFFEF9',     // 더 밝은 크림색 - 가독성 개선
      surface: '#FFFFFF',        // 순백
      text: '#1A202C',          // 더 진한 검은색 - 가독성 개선
      textMuted: '#4A5568',      // 더 진한 중간 회색 - 가독성 개선
      border: '#E2E8F0',        // 연한 회색
      success: '#38A169',        // 초록
      warning: '#D69E2E',        // 주황
      error: '#E53E3E'          // 빨간색
    },
    fonts: {
      heading: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      body: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      mono: 'JetBrains Mono, Consolas, Monaco, monospace'
    },
    spacing: {
      base: 4,
      scale: 1.2
    },
    animations: {
      duration: {
        fast: '200ms',
        normal: '350ms',
        slow: '600ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  },
  
  youth: {
    level: 'youth',
    colors: {
      primary: '#667EEA',        // 보라빛 파랑 - 청춘
      secondary: '#764BA2',      // 진보라 - 깊이
      accent: '#F093FB',         // 핑크 그라데이션 - 역동성
      background: '#FBFCFF',     // 더 밝은 블루그레이 - 가독성 개선
      surface: '#FFFFFF',
      text: '#1A202C',          // 더 진한 검은색 - 가독성 개선
      textMuted: '#4A5568',      // 더 진한 중간 회색 - 가독성 개선
      border: '#E2E8F0',
      success: '#38A169',
      warning: '#D69E2E',
      error: '#E53E3E'
    },
    fonts: {
      heading: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      body: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      mono: 'JetBrains Mono, Consolas, Monaco, monospace'
    },
    spacing: {
      base: 4,
      scale: 1.25
    },
    animations: {
      duration: {
        fast: '250ms',
        normal: '400ms',
        slow: '700ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  },

  adult: {
    level: 'adult',
    colors: {
      primary: '#2B6CB0',        // 전문적인 파랑
      secondary: '#2D3748',      // 차분한 회색
      accent: '#ED8936',         // 따뜻한 주황
      background: '#FFFFFF',     // 순백
      surface: '#F7FAFC',        // 연한 회색
      text: '#1A202C',          // 진한 회색
      textMuted: '#4A5568',      // 중간 회색
      border: '#CBD5E0',        // 연한 테두리
      success: '#38A169',
      warning: '#D69E2E',
      error: '#C53030'
    },
    fonts: {
      heading: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      body: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      mono: 'JetBrains Mono, Consolas, Monaco, monospace'
    },
    spacing: {
      base: 4,
      scale: 1.3
    },
    animations: {
      duration: {
        fast: '300ms',
        normal: '500ms',
        slow: '800ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  },

  instructor: {
    level: 'instructor',
    colors: {
      primary: '#6B46C1',        // 전문적인 보라 - 지혜와 권위
      secondary: '#1E3A8A',      // 깊은 파랑 - 신뢰성
      accent: '#F59E0B',         // 따뜻한 골드 - 지도력
      background: '#FEFEFE',     // 순수한 흰색 - 깔끔함
      surface: '#F8FAFC',        // 연한 회색 - 고급스러움
      text: '#0F172A',          // 매우 진한 검은색 - 명확성
      textMuted: '#475569',      // 균형잡힌 회색 - 가독성
      border: '#E2E8F0',        // 부드러운 테두리
      success: '#059669',        // 전문적인 초록
      warning: '#D97706',        // 신중한 주황
      error: '#DC2626'          // 명확한 빨강
    },
    fonts: {
      heading: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      body: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      mono: 'JetBrains Mono, Consolas, Monaco, monospace'
    },
    spacing: {
      base: 4,
      scale: 1.4
    },
    animations: {
      duration: {
        fast: '350ms',
        normal: '600ms',
        slow: '900ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  },

  admin: {
    level: 'admin',
    colors: {
      primary: '#0F172A',        // 매우 진한 차콜 - 최고 권한
      secondary: '#1E293B',      // 어두운 슬레이트 - 강력함
      accent: '#EF4444',         // 강력한 빨강 - 중요한 액션
      background: '#FFFFFF',     // 순백 - 최대 명료성
      surface: '#F8FAFC',        // 매우 연한 회색 - 미니멀
      text: '#020617',          // 거의 검은색 - 최대 가독성
      textMuted: '#334155',      // 강한 회색 - 명확한 구분
      border: '#CBD5E0',        // 부드러운 테두리
      success: '#16A34A',        // 확실한 초록
      warning: '#EA580C',        // 강력한 주황
      error: '#DC2626'          // 명확한 빨강
    },
    fonts: {
      heading: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      body: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      mono: 'JetBrains Mono, Consolas, Monaco, monospace'
    },
    spacing: {
      base: 4,
      scale: 1.5
    },
    animations: {
      duration: {
        fast: '400ms',
        normal: '700ms',
        slow: '1000ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  }
};

// 레벨별 그림자 강도 함수 - 클라우스 의견 반영
function getShadowIntensity(level: UserLevel): string {
  const shadowMap = {
    junior: 'var(--iwl-shadow-lg)',     // 더 큰 그림자로 재미있는 느낌
    youth: 'var(--iwl-shadow-xl)',      // 역동적인 큰 그림자
    adult: 'var(--iwl-shadow-md)',      // 적당한 그림자
    instructor: 'var(--iwl-shadow-lg)', // 권위감 있는 그림자
    admin: 'var(--iwl-shadow-sm)'       // 미니멀한 그림자
  };
  return shadowMap[level];
}

// CSS 변수 생성 함수
export function generateThemeCSS(theme: ThemeConfig): string {
  const { colors, fonts, spacing, animations } = theme;
  
  return `
    :root {
      /* Colors */
      --iwl-primary: ${colors.primary};
      --iwl-secondary: ${colors.secondary};
      --iwl-accent: ${colors.accent};
      --iwl-background: ${colors.background};
      --iwl-surface: ${colors.surface};
      --iwl-text: ${colors.text};
      --iwl-text-muted: ${colors.textMuted};
      --iwl-border: ${colors.border};
      --iwl-success: ${colors.success};
      --iwl-warning: ${colors.warning};
      --iwl-error: ${colors.error};
      
      /* Fonts */
      --iwl-font-heading: ${fonts.heading};
      --iwl-font-body: ${fonts.body};
      --iwl-font-mono: ${fonts.mono};
      
      /* Spacing */
      --iwl-spacing-base: ${spacing.base}px;
      --iwl-spacing-scale: ${spacing.scale};
      
      /* Animations */
      --iwl-duration-fast: ${animations.duration.fast};
      --iwl-duration-normal: ${animations.duration.normal};
      --iwl-duration-slow: ${animations.duration.slow};
      --iwl-easing-ease: ${animations.easing.ease};
      --iwl-easing-bounce: ${animations.easing.bounce};
      --iwl-easing-spring: ${animations.easing.spring};
      
      /* Shadow System - 클라우스 의견 반영 */
      --iwl-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
      --iwl-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
      --iwl-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
      --iwl-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
      --iwl-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.04);
      --iwl-shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
      --iwl-shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
      
      /* Border Radius System - 클라우스 의견 반영 */
      --iwl-radius-none: 0px;
      --iwl-radius-sm: 0.125rem;   /* 2px */
      --iwl-radius-base: 0.25rem;  /* 4px */
      --iwl-radius-md: 0.375rem;   /* 6px */
      --iwl-radius-lg: 0.5rem;     /* 8px */
      --iwl-radius-xl: 0.75rem;    /* 12px */
      --iwl-radius-2xl: 1rem;      /* 16px */
      --iwl-radius-3xl: 1.5rem;    /* 24px */
      --iwl-radius-full: 9999px;
      
      /* Level-specific Shadow Intensity */
      --iwl-shadow-level: ${getShadowIntensity(theme.level)};
    }
    
    /* Level-specific gradient classes */
    .iwl-gradient-${theme.level} {
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    }
    
    .iwl-gradient-${theme.level}-accent {
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
    }
    
    /* Level-specific shadow classes */
    .iwl-shadow-${theme.level} {
      box-shadow: 0 4px 20px rgba(${hexToRgb(colors.primary)}, 0.15);
    }
    
    .iwl-shadow-${theme.level}-hover {
      box-shadow: 0 8px 30px rgba(${hexToRgb(colors.primary)}, 0.25);
    }
  `;
}

// Hex to RGB 변환 함수
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ].join(', ');
}

// 테마 적용 함수
export function applyTheme(level: UserLevel): void {
  const theme = LEVEL_THEMES[level];
  const css = generateThemeCSS(theme);
  
  // 기존 스타일 제거
  const existingStyle = document.getElementById('iwl-theme-style');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // 새 스타일 적용
  const style = document.createElement('style');
  style.id = 'iwl-theme-style';
  style.textContent = css;
  document.head.appendChild(style);
  
  // 바디에 레벨 클래스 추가
  document.body.className = document.body.className.replace(/iwl-level-\w+/, '');
  document.body.classList.add(`iwl-level-${level}`);
}

// 테마 감지 함수
export function detectUserLevel(): UserLevel {
  // localStorage에서 사용자 레벨 확인
  try {
    const testUser = localStorage.getItem('test_user');
    if (testUser) {
      const userData = JSON.parse(testUser);
      // 테스트 사용자 레벨 매핑
      const roleToLevel: Record<string, UserLevel> = {
        'admin': 'admin',
        'beta_tester': 'adult',
        'user': 'adult',
        'instructor': 'instructor'
      };
      return roleToLevel[userData.role] || 'adult';
    }
    
    // Supabase 사용자 확인 (추후 구현)
    // const user = await getCurrentUser();
    // return user?.user_metadata?.level || 'adult';
    
  } catch (error) {
    console.error('Error detecting user level:', error);
  }
  
  return 'adult'; // 기본값
}

// 레벨별 UI 컴포넌트 스타일 변형
export const levelComponentVariants = {
  button: {
    junior: 'rounded-xl shadow-lg hover:scale-105 transition-all duration-300',
    youth: 'rounded-lg shadow-md hover:shadow-xl transition-all duration-400',
    adult: 'rounded-md shadow-sm hover:shadow-md transition-all duration-300',
    instructor: 'rounded-lg shadow-md border hover:shadow-lg transition-all duration-500',
    admin: 'rounded-sm shadow-sm border-2 hover:shadow-lg transition-all duration-400'
  },
  
  card: {
    junior: 'rounded-2xl border-2 shadow-lg bg-gradient-to-br from-white to-gray-50',
    youth: 'rounded-xl border shadow-md bg-gradient-to-br from-white via-white to-gray-50',
    adult: 'rounded-lg border shadow-sm bg-white',
    instructor: 'rounded-lg border-2 shadow-md bg-gradient-to-b from-white to-gray-50',
    admin: 'rounded-md border-2 shadow-lg bg-white'
  },
  
  input: {
    junior: 'rounded-xl border-2 focus:ring-4 focus:ring-opacity-50',
    youth: 'rounded-lg border-2 focus:ring-3 focus:ring-opacity-40',
    adult: 'rounded-md border focus:ring-2 focus:ring-opacity-30',
    instructor: 'rounded-lg border-2 focus:ring-2 focus:ring-opacity-40',
    admin: 'rounded-sm border-2 focus:ring-1 focus:ring-opacity-50'
  }
};

// 레벨별 아이콘 크기
export const levelIconSizes = {
  junior: { sm: 20, md: 24, lg: 32, xl: 48 },
  youth: { sm: 18, md: 22, lg: 28, xl: 44 },
  adult: { sm: 16, md: 20, lg: 24, xl: 40 },
  instructor: { sm: 18, md: 22, lg: 28, xl: 44 },
  admin: { sm: 16, md: 20, lg: 24, xl: 40 }
};

// 레벨별 폰트 크기
export const levelFontSizes = {
  junior: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px  
    base: '1rem',    // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem'   // 36px
  },
  youth: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
  },
  adult: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
  },
  instructor: {
    xs: '0.8125rem',  // 조금 더 큰 폰트
    sm: '0.9375rem',
    base: '1.0625rem',
    lg: '1.1875rem',
    xl: '1.3125rem',
    '2xl': '1.5625rem',
    '3xl': '1.9375rem',
    '4xl': '2.3125rem'
  },
  admin: {
    xs: '0.6875rem',  // 조금 더 작고 간결한 폰트
    sm: '0.8125rem',
    base: '0.9375rem',
    lg: '1.0625rem',
    xl: '1.1875rem',
    '2xl': '1.4375rem',
    '3xl': '1.8125rem',
    '4xl': '2.1875rem'
  }
};