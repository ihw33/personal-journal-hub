'use client';

import React from 'react';
import { useTheme, useThemeStyles } from '@/components/theme/ThemeProvider';
import { ThemeAwareButton } from '@/components/ui/theme-aware/ThemeAwareButton';
import { ThemeAwareCard, ThemeAwareCardContent, ThemeAwareCardDescription, ThemeAwareCardHeader, ThemeAwareCardTitle } from '@/components/ui/theme-aware/ThemeAwareCard';
import { ThemeAwareInput, ThemeAwareFormField } from '@/components/ui/theme-aware/ThemeAwareInput';
import { RoleSpecificDemo } from '@/components/ui/theme-aware/InstructorComponents';
import type { UserLevel } from '@/types/iwl4-integration';

const LEVEL_DESCRIPTIONS: Record<UserLevel, string> = {
  junior: '밝고 생동감 넘치는 디자인으로 어린이들의 창의력을 자극하고 학습 동기를 높입니다',
  youth: '역동적이고 현대적인 스타일로 청소년의 에너지를 표현하고 자기주도 학습을 지원합니다',
  adult: '전문적이고 깔끔한 디자인으로 성인 학습자의 집중력과 효율성을 극대화합니다',
  instructor: '권위있고 세련된 스타일로 교육자의 전문성과 신뢰성을 강조합니다',
  admin: '간결하고 강력한 디자인으로 관리 업무의 효율성과 정확성을 보장합니다'
};

export function ThemeShowcase() {
  const { currentLevel, setLevel } = useTheme();
  const { theme, colors } = useThemeStyles();

  const handleLevelChange = (level: UserLevel) => {
    setLevel(level);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Level Selector */}
      <ThemeAwareCard useIWLTheme variant="iwl">
        <ThemeAwareCardHeader useIWLTheme>
          <ThemeAwareCardTitle useIWLTheme>
            IWL 4.0 레벨별 테마 시스템
          </ThemeAwareCardTitle>
          <ThemeAwareCardDescription useIWLTheme>
            현재 테마: <strong>{currentLevel}</strong> - {LEVEL_DESCRIPTIONS[currentLevel]}
          </ThemeAwareCardDescription>
        </ThemeAwareCardHeader>
        <ThemeAwareCardContent useIWLTheme>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {(Object.keys(LEVEL_DESCRIPTIONS) as UserLevel[]).map((level) => (
              <ThemeAwareButton
                key={level}
                variant={currentLevel === level ? 'iwl' : 'outline'}
                size="sm"
                useIWLTheme={currentLevel === level}
                onClick={() => handleLevelChange(level)}
                className={currentLevel === level ? 'ring-2 ring-offset-2' : ''}
              >
                {level === 'junior' && '🎨 초등학생'}
                {level === 'youth' && '⚡ 중고등학생'}
                {level === 'adult' && '💼 성인 학습자'}
                {level === 'instructor' && '🎓 교육자'}
                {level === 'admin' && '⚙️ 관리자'}
              </ThemeAwareButton>
            ))}
          </div>
        </ThemeAwareCardContent>
      </ThemeAwareCard>

      {/* Color Palette */}
      <ThemeAwareCard useIWLTheme variant="iwl">
        <ThemeAwareCardHeader useIWLTheme>
          <ThemeAwareCardTitle useIWLTheme>컬러 팔레트</ThemeAwareCardTitle>
          <ThemeAwareCardDescription useIWLTheme>
            현재 {currentLevel} 테마의 색상 구성
          </ThemeAwareCardDescription>
        </ThemeAwareCardHeader>
        <ThemeAwareCardContent useIWLTheme>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(colors).map(([colorName, colorValue]) => (
              <div key={colorName} className="text-center">
                <div
                  className="w-full h-16 rounded-lg border-2 shadow-sm mb-2"
                  style={{ backgroundColor: colorValue, borderColor: colors.border }}
                />
                <div className="text-sm font-medium" style={{ color: colors.text }}>
                  {colorName}
                </div>
                <div className="text-xs" style={{ color: colors.textMuted }}>
                  {colorValue}
                </div>
              </div>
            ))}
          </div>
        </ThemeAwareCardContent>
      </ThemeAwareCard>

      {/* Component Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buttons */}
        <ThemeAwareCard useIWLTheme variant="iwl">
          <ThemeAwareCardHeader useIWLTheme>
            <ThemeAwareCardTitle useIWLTheme>버튼 컴포넌트</ThemeAwareCardTitle>
          </ThemeAwareCardHeader>
          <ThemeAwareCardContent useIWLTheme>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <ThemeAwareButton useIWLTheme variant="iwl" size="sm">
                  사고력 진단
                </ThemeAwareButton>
                <ThemeAwareButton useIWLTheme variant="iwl" size="default">
                  학습 시작하기
                </ThemeAwareButton>
                <ThemeAwareButton useIWLTheme variant="iwl" size="lg">
                  전문가 상담 신청
                </ThemeAwareButton>
              </div>
              <div className="flex flex-wrap gap-3">
                <ThemeAwareButton useIWLTheme variant="iwl">
                  수강 신청하기
                </ThemeAwareButton>
                <ThemeAwareButton variant="outline">
                  미리보기
                </ThemeAwareButton>
                <ThemeAwareButton variant="secondary">
                  저장하기
                </ThemeAwareButton>
              </div>
            </div>
          </ThemeAwareCardContent>
        </ThemeAwareCard>

        {/* Form Components */}
        <ThemeAwareCard useIWLTheme variant="iwl">
          <ThemeAwareCardHeader useIWLTheme>
            <ThemeAwareCardTitle useIWLTheme>입력 컴포넌트</ThemeAwareCardTitle>
          </ThemeAwareCardHeader>
          <ThemeAwareCardContent useIWLTheme>
            <div className="space-y-4">
              <ThemeAwareFormField
                useIWLTheme
                label="학습자 이메일"
                required
                hint="학습 진도와 피드백을 받을 이메일 주소를 입력하세요"
              >
                <ThemeAwareInput
                  useIWLTheme
                  variant="iwl"
                  placeholder="학습자@example.com"
                  type="email"
                />
              </ThemeAwareFormField>

              <ThemeAwareFormField
                useIWLTheme
                label="학습 목표 및 관심사"
                hint="어떤 분야의 사고력을 키우고 싶으신지 자세히 적어주세요 (최소 10자)"
              >
                <ThemeAwareInput
                  useIWLTheme
                  variant="iwl"
                  placeholder="창의적 문제해결, 논리적 사고, 비판적 분석 등..."
                />
              </ThemeAwareFormField>
            </div>
          </ThemeAwareCardContent>
        </ThemeAwareCard>
      </div>

      {/* Theme Information */}
      <ThemeAwareCard useIWLTheme variant="iwl">
        <ThemeAwareCardHeader useIWLTheme>
          <ThemeAwareCardTitle useIWLTheme>테마 정보</ThemeAwareCardTitle>
          <ThemeAwareCardDescription useIWLTheme>
            현재 적용된 테마의 상세 설정
          </ThemeAwareCardDescription>
        </ThemeAwareCardHeader>
        <ThemeAwareCardContent useIWLTheme>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: colors.text }}>
                폰트
              </h4>
              <div className="space-y-1 text-sm" style={{ color: colors.textMuted }}>
                <div>제목: {theme.fonts.heading.split(',')[0]}</div>
                <div>본문: {theme.fonts.body.split(',')[0]}</div>
                <div>코드: {theme.fonts.mono.split(',')[0]}</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2" style={{ color: colors.text }}>
                간격
              </h4>
              <div className="space-y-1 text-sm" style={{ color: colors.textMuted }}>
                <div>기본: {theme.spacing.base}px</div>
                <div>비율: {theme.spacing.scale}</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2" style={{ color: colors.text }}>
                애니메이션
              </h4>
              <div className="space-y-1 text-sm" style={{ color: colors.textMuted }}>
                <div>빠름: {theme.animations.duration.fast}</div>
                <div>보통: {theme.animations.duration.normal}</div>
                <div>느림: {theme.animations.duration.slow}</div>
              </div>
            </div>
          </div>
        </ThemeAwareCardContent>
      </ThemeAwareCard>

      {/* Role-Specific Components - 드미트리 의견 반영 */}
      {(currentLevel === 'instructor' || currentLevel === 'admin') && (
        <RoleSpecificDemo />
      )}
    </div>
  );
}