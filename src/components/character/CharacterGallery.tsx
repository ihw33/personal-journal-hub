/**
 * IdeaWorkLab v3.0 Character Gallery
 * 핵심 캐릭터 갤러리 시스템
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Sparkles, Heart, Brain, Lightbulb, User, Target, 
  ArrowRight, Star, Award, Compass, Zap, Smile, AlertCircle, ImageIcon
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { characters, characterContent, Character } from './characterData';
import { CharacterProfile } from './CharacterProfile';

interface CharacterGalleryProps {
  language: 'ko' | 'en';
  onNavigate?: (page: string, params?: any) => void;
}

export const CharacterGallery: React.FC<CharacterGalleryProps> = ({
  language,
  onNavigate
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [activeView, setActiveView] = useState<'gallery' | 'profile'>('gallery');
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

  const t = characterContent[language];

  // 이미지 로딩 에러 핸들러
  const handleImageError = (characterId: string) => {
    setImageLoadErrors(prev => new Set(prev).add(characterId));
  };

  // 캐릭터 선택 핸들러
  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setActiveView('profile');
  };

  // 갤러리로 돌아가기
  const handleBackToGallery = () => {
    setSelectedCharacter(null);
    setActiveView('gallery');
  };

  // 캐릭터 역할별 아이콘
  const getRoleIcon = (characterId: string) => {
    switch (characterId) {
      case 'saenggagi': return Brain;
      case 'archi': return Compass;
      case 'mirumi': return Target;
      case 'banjjagi': return Sparkles;
      default: return User;
    }
  };

  // 캐릭터 역할별 스타일 (실제 이미지 색상에 맞게 업데이트)
  const getRoleStyle = (characterId: string) => {
    switch (characterId) {
      case 'saenggagi': 
        return 'bg-gradient-to-br from-sky-50 to-emerald-50 border-sky-200 hover:border-sky-300';
      case 'archi': 
        return 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:border-orange-300';
      case 'mirumi': 
        return 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:border-gray-300';
      case 'banjjagi': 
        return 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-300';
      default: 
        return 'bg-gradient-to-br from-architect-gray-100 to-white border-architect-gray-300';
    }
  };

  // 강화된 캐릭터 이미지 렌더링 시스템
  const renderCharacterImage = (character: Character) => {
    const hasError = imageLoadErrors.has(character.id);
    
    if (hasError) {
      // 이미지 로딩 실패 시 더 나은 대체 표시
      const RoleIcon = getRoleIcon(character.id);
      return (
        <div 
          className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br rounded-2xl border-2 border-dashed"
          style={{
            background: `linear-gradient(135deg, ${character.colors.primary}10 0%, ${character.colors.secondary}10 100%)`,
            borderColor: character.colors.primary + '30'
          }}
        >
          <RoleIcon 
            className="w-16 h-16 mb-3" 
            style={{ color: character.colors.primary }} 
          />
          <div 
            className="text-architect-small font-architect-semibold text-center px-2 mb-2" 
            style={{ color: character.colors.primary }}
          >
            {character.name}
          </div>
          <div className="flex items-center gap-1 mb-2">
            <ImageIcon className="w-3 h-3 text-architect-gray-500" />
            <span className="text-architect-xs text-architect-gray-500">이미지 로딩 중...</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="text-architect-xs px-3 py-1"
            style={{ borderColor: character.colors.primary, color: character.colors.primary }}
            onClick={() => window.location.reload()}
          >
            새로고침
          </Button>
        </div>
      );
    }

    // 정상적인 이미지 표시
    return (
      <div className="w-full h-full relative overflow-hidden rounded-2xl bg-white">
        <img 
          src={character.image}
          alt={`${character.name} - ${t.characterIntroduction[character.id as keyof typeof t.characterIntroduction]}`}
          className="w-full h-full object-contain p-2"
          onError={() => handleImageError(character.id)}
          onLoad={() => {
            // 이미지 로딩 성공 시 에러 상태 제거
            setImageLoadErrors(prev => {
              const newSet = new Set(prev);
              newSet.delete(character.id);
              return newSet;
            });
          }}
          loading="eager" // 캐릭터 이미지는 우선순위 높게
        />
        
        {/* 로딩 상태 표시 */}
        <div className="absolute bottom-2 right-2 opacity-70">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: character.colors.primary }}
          />
        </div>
      </div>
    );
  };

  // 간단한 아이콘 기반 이미지 (백업용)
  const renderSimpleCharacterIcon = (character: Character) => {
    const RoleIcon = getRoleIcon(character.id);
    return (
      <div 
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${character.colors.primary}20 0%, ${character.colors.secondary}20 100%)`
        }}
      >
        <RoleIcon 
          className="w-8 h-8 mb-1" 
          style={{ color: character.colors.primary }} 
        />
        <div className="text-architect-xs font-architect-semibold text-center px-1" style={{ color: character.colors.primary }}>
          {character.name}
        </div>
      </div>
    );
  };

  if (activeView === 'profile' && selectedCharacter) {
    return (
      <CharacterProfile
        character={selectedCharacter}
        language={language}
        onBack={handleBackToGallery}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5">
      <div className="container mx-auto py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-architect-gradient rounded-2xl flex items-center justify-center shadow-architect-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-architect-h1 font-architect-black text-architect-gray-900 mb-4">
            {t.title}
          </h1>
          
          <p className="text-architect-h4 font-architect-medium text-architect-gradient mb-4">
            {t.subtitle}
          </p>
          
          <p className="text-architect-body-lg text-architect-gray-700 max-w-2xl mx-auto leading-architect-relaxed">
            {t.description}
          </p>
        </div>

        {/* Character Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {characters.map((character, index) => {
            const RoleIcon = getRoleIcon(character.id);
            const hasImageError = imageLoadErrors.has(character.id);
            
            return (
              <Card 
                key={character.id}
                className={`overflow-hidden transition-all duration-500 cursor-pointer transform hover:scale-105 ${getRoleStyle(character.id)} shadow-architect-md hover:shadow-architect-xl`}
                onClick={() => handleCharacterSelect(character)}
              >
                <CardHeader className="text-center pb-6">
                  {/* 캐릭터 이미지 */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-architect-lg bg-white border-2 border-white">
                      {renderCharacterImage(character)}
                    </div>
                    
                    {/* 역할 아이콘 */}
                    <div 
                      className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center shadow-architect-lg border-2 border-white"
                      style={{ backgroundColor: character.colors.primary }}
                    >
                      <RoleIcon className="w-6 h-6 text-white" />
                    </div>

                    {/* 이미지 상태 인디케이터 */}
                    {hasImageError && (
                      <div className="absolute top-2 left-2 bg-architect-warning text-white px-2 py-1 rounded text-architect-xs font-architect-medium">
                        로딩 실패
                      </div>
                    )}
                  </div>

                  <CardTitle className="text-architect-h3 font-architect-bold text-architect-gray-900 mb-2">
                    {character.name}
                  </CardTitle>
                  
                  <CardDescription className="text-architect-body text-architect-gray-700 mb-2">
                    {character.nameEn}
                  </CardDescription>
                  
                  <div className="text-architect-small text-architect-gray-600 mb-4 italic">
                    {t.characterIntroduction[character.id as keyof typeof t.characterIntroduction]}
                  </div>

                  <Badge 
                    className="mb-4 text-architect-xs font-architect-medium border"
                    style={{ 
                      backgroundColor: `${character.colors.primary}20`,
                      color: character.colors.primary,
                      borderColor: `${character.colors.primary}40`
                    }}
                  >
                    {character.role}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* 설명 */}
                  <p className="text-architect-body text-architect-gray-700 leading-architect-relaxed">
                    {character.description}
                  </p>

                  {/* 대표 대사 */}
                  <div 
                    className="p-4 rounded-xl border-l-4"
                    style={{ 
                      backgroundColor: `${character.colors.accent || character.colors.secondary}10`,
                      borderColor: character.colors.accent || character.colors.secondary
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: character.colors.accent || character.colors.secondary }}
                      >
                        <Smile className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-architect-small font-architect-semibold text-architect-gray-700 mb-1">
                          {t.catchPhrase}
                        </div>
                        <div className="text-architect-small text-architect-gray-700 italic">
                          "{character.catchPhrase}"
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 성격 특성 */}
                  <div>
                    <div className="text-architect-body font-architect-semibold text-architect-gray-900 mb-3">
                      {t.personality}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {character.personality.slice(0, 3).map((trait, index) => (
                        <Badge 
                          key={index}
                          variant="outline"
                          className="text-architect-xs font-architect-medium"
                          style={{ borderColor: character.colors.secondary }}
                        >
                          {trait}
                        </Badge>
                      ))}
                      {character.personality.length > 3 && (
                        <Badge variant="outline" className="text-architect-xs font-architect-medium">
                          +{character.personality.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* 특별 기능 미리보기 */}
                  <div>
                    <div className="text-architect-body font-architect-semibold text-architect-gray-900 mb-3">
                      {t.abilities}
                    </div>
                    <div className="space-y-2">
                      {character.specialAbilities.slice(0, 2).map((ability, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: character.colors.primary }}
                          />
                          <span className="text-architect-small text-architect-gray-700">
                            {ability}
                          </span>
                        </div>
                      ))}
                      {character.specialAbilities.length > 2 && (
                        <div className="text-architect-xs text-architect-gray-500">
                          외 {character.specialAbilities.length - 2}개 더...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <Button 
                    className="w-full mt-6 transition-all duration-200 hover:scale-105 font-architect-semibold"
                    style={{ 
                      backgroundColor: character.colors.primary,
                      color: 'white'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCharacterSelect(character);
                    }}
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {t.viewDetails}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 캐릭터 소개 카드 - 간단한 아이콘 미리보기 */}
        <Card className="p-8 bg-gradient-to-r from-architect-gray-100/30 to-white border-architect-gray-300 shadow-architect-lg mb-8">
          <div className="text-center mb-8">
            <h2 className="text-architect-h2 font-architect-bold text-architect-gray-900 mb-4">
              캐릭터 역할과 관계
            </h2>
            <p className="text-architect-body text-architect-gray-700">
              각 캐릭터는 학습 여정에서 고유한 역할을 담당합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {characters.map((character) => (
              <div key={character.id} className="text-center">
                {/* 간단한 아이콘 형태 캐릭터 */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 shadow-architect-md bg-white">
                  {renderSimpleCharacterIcon(character)}
                </div>
                <h3 className="text-architect-h4 font-architect-semibold text-architect-gray-900 mb-2">
                  {character.name}
                </h3>
                <p className="text-architect-small text-architect-gray-600">
                  {character.role.split(' - ')[1]}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-architect-primary/5 rounded-2xl border border-architect-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-5 h-5 text-architect-primary" />
              <span className="text-architect-body font-architect-semibold text-architect-gray-900">
                함께하는 학습 여정
              </span>
            </div>
            <p className="text-architect-body text-architect-gray-700 leading-architect-relaxed">
              생각이는 사용자와 함께 성장하고, 아키는 지혜로운 가이드 역할을 합니다. 
              미루미는 극복해야 할 도전을 제시하고, 반짝이는 창의적 영감을 선사합니다. 
              이들과 함께 "사고와 재능의 설계자"가 되어보세요!
            </p>
          </div>
        </Card>

        {/* 이미지 로딩 상태 정보 */}
        {imageLoadErrors.size > 0 && (
          <Card className="p-6 bg-architect-warning/5 border-architect-warning/20 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-architect-warning" />
              <span className="text-architect-body font-architect-semibold text-architect-gray-900">
                이미지 로딩 안내
              </span>
            </div>
            <p className="text-architect-body text-architect-gray-700 leading-architect-relaxed mb-4">
              일부 캐릭터 이미지가 로딩 중입니다. 개별 캐릭터 프로필에서 더 자세한 정보를 확인하거나, 
              페이지를 새로고침하여 이미지를 다시 로딩해보세요.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="border-architect-warning text-architect-warning hover:bg-architect-warning hover:text-white"
            >
              페이지 새로고침
            </Button>
          </Card>
        )}

        {/* CTA 섹션 */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-architect-h2 font-architect-bold text-architect-gray-900 mb-4">
              캐릭터들과 함께 시작하세요
            </h2>
            <p className="text-architect-body text-architect-gray-700 mb-8 leading-architect-relaxed">
              이제 이 특별한 동반자들과 함께 체계적인 사고력 학습 여정을 시작해보세요. 
              각 캐릭터는 여러분의 성장을 돕는 고유한 역할을 담당합니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate?.('courses')}
                className="btn-architect-primary px-8 py-4 font-architect-semibold"
              >
                <Brain className="w-5 h-5 mr-2" />
                사고력 학습 시작하기
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => onNavigate?.('about')}
                className="border-architect-primary text-architect-primary hover:bg-architect-primary hover:text-white px-8 py-4 font-architect-semibold"
              >
                <Star className="w-5 h-5 mr-2" />
                플랫폼 더 알아보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterGallery;