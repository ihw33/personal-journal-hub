/**
 * IdeaWorkLab v3.0 Character Profile
 * 개별 캐릭터 상세 프로필 시스템
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft, Heart, Brain, Lightbulb, User, Target, Sparkles,
  Award, Star, Compass, Zap, Smile, Book, Palette, 
  TrendingUp, ShoppingBag, MessageCircle, CheckCircle2
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Character, characterContent } from './characterData';

interface CharacterProfileProps {
  character: Character;
  language: 'ko' | 'en';
  onBack: () => void;
  onNavigate?: (page: string, params?: any) => void;
}

export const CharacterProfile: React.FC<CharacterProfileProps> = ({
  character,
  language,
  onBack,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const t = characterContent[language];

  // 캐릭터별 특별 컨텐츠 탭 결정
  const getSpecialTabs = () => {
    const baseTabs = [
      { id: 'overview', label: '프로필', icon: User },
      { id: 'abilities', label: '능력', icon: Zap }
    ];

    if (character.emotions) {
      baseTabs.push({ id: 'emotions', label: t.emotions, icon: Smile });
    }
    
    if (character.growthStages) {
      baseTabs.push({ id: 'growth', label: t.growth, icon: TrendingUp });
    }
    
    if (character.situations) {
      baseTabs.push({ id: 'situations', label: t.situations, icon: Target });
    }
    
    if (character.inspirationModes) {
      baseTabs.push({ id: 'inspiration', label: t.inspiration, icon: Sparkles });
    }

    return baseTabs;
  };

  const specialTabs = getSpecialTabs();

  // 레벨별 스타일
  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-architect-success/10 text-architect-success border-architect-success/20';
      case 'intermediate':
        return 'bg-architect-info/10 text-architect-info border-architect-info/20';
      case 'advanced':
        return 'bg-architect-warning/10 text-architect-warning border-architect-warning/20';
      default:
        return 'bg-architect-gray-100 text-architect-gray-700 border-architect-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5">
      <div className="container mx-auto py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-architect-gray-300 hover:border-architect-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToGallery}
          </Button>
        </div>

        {/* Character Header */}
        <Card className="mb-8 overflow-hidden shadow-architect-xl">
          <div 
            className="h-32 bg-gradient-to-r"
            style={{ 
              background: `linear-gradient(135deg, ${character.colors.primary}20 0%, ${character.colors.secondary}20 50%, ${character.colors.accent}20 100%)`
            }}
          />
          
          <CardHeader className="relative -mt-16 text-center pb-8">
            {/* 캐릭터 이미지 */}
            <div className="relative mx-auto mb-6">
              <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-architect-xl bg-white p-4 border-4 border-white">
                <ImageWithFallback 
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <CardTitle className="text-architect-h1 font-architect-black text-architect-gray-900 mb-2">
              {character.name}
            </CardTitle>
            
            <CardDescription className="text-architect-h4 font-architect-medium text-architect-gradient mb-4">
              {character.nameEn}
            </CardDescription>

            <Badge 
              className="text-architect-body px-6 py-2"
              style={{ 
                backgroundColor: `${character.colors.primary}20`,
                color: character.colors.primary,
                borderColor: `${character.colors.primary}40`
              }}
            >
              {character.role}
            </Badge>

            {/* 대표 대사 */}
            <div 
              className="mt-6 p-6 rounded-2xl max-w-2xl mx-auto"
              style={{ 
                backgroundColor: `${character.colors.accent}10`,
                border: `2px solid ${character.colors.accent}40`
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: character.colors.accent }}
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-architect-body font-architect-semibold text-architect-gray-900">
                  {t.catchPhrase}
                </span>
              </div>
              <p className="text-architect-body-lg text-architect-gray-800 italic text-center leading-architect-relaxed">
                "{character.catchPhrase}"
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full h-16 bg-architect-gray-100 mb-8" style={{ gridTemplateColumns: `repeat(${specialTabs.length}, 1fr)` }}>
            {specialTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id} 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-architect-sm flex flex-col gap-1 py-2"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-architect-small">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* 캐릭터 소개 */}
              <Card className="p-8 shadow-architect-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-architect-h3 font-architect-bold text-architect-gray-900 flex items-center gap-3">
                    <Book className="w-6 h-6 text-architect-primary" />
                    캐릭터 소개
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-architect-body text-architect-gray-700 leading-architect-relaxed mb-6">
                    {character.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-architect-body font-architect-semibold text-architect-gray-900 mb-3">
                        {t.personality}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {character.personality.map((trait, index) => (
                          <Badge 
                            key={index}
                            variant="outline"
                            className="text-architect-small"
                            style={{ 
                              borderColor: character.colors.secondary,
                              color: character.colors.secondary
                            }}
                          >
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 컬러 팔레트 */}
              <Card className="p-8 shadow-architect-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-architect-h3 font-architect-bold text-architect-gray-900 flex items-center gap-3">
                    <Palette className="w-6 h-6 text-architect-primary" />
                    캐릭터 컬러
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg shadow-architect-sm border-2 border-white"
                        style={{ backgroundColor: character.colors.primary }}
                      />
                      <div>
                        <div className="text-architect-body font-architect-semibold text-architect-gray-900">
                          Primary Color
                        </div>
                        <div className="text-architect-small text-architect-gray-600">
                          {character.colors.primary}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg shadow-architect-sm border-2 border-white"
                        style={{ backgroundColor: character.colors.secondary }}
                      />
                      <div>
                        <div className="text-architect-body font-architect-semibold text-architect-gray-900">
                          Secondary Color
                        </div>
                        <div className="text-architect-small text-architect-gray-600">
                          {character.colors.secondary}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg shadow-architect-sm border-2 border-white"
                        style={{ backgroundColor: character.colors.accent }}
                      />
                      <div>
                        <div className="text-architect-body font-architect-semibold text-architect-gray-900">
                          Accent Color
                        </div>
                        <div className="text-architect-small text-architect-gray-600">
                          {character.colors.accent}
                        </div>
                      </div>
                    </div>

                    {/* 그라데이션 미리보기 */}
                    <div className="mt-6">
                      <div className="text-architect-body font-architect-semibold text-architect-gray-900 mb-3">
                        캐릭터 그라데이션
                      </div>
                      <div 
                        className="w-full h-16 rounded-xl shadow-architect-sm"
                        style={{ 
                          background: `linear-gradient(135deg, ${character.colors.primary} 0%, ${character.colors.secondary} 50%, ${character.colors.accent} 100%)`
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Abilities Tab */}
          <TabsContent value="abilities" className="space-y-8">
            <Card className="p-8 shadow-architect-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-architect-h3 font-architect-bold text-architect-gray-900 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-architect-accent" />
                  {t.abilities}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {character.specialAbilities.map((ability, index) => (
                    <div 
                      key={index}
                      className="p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-architect-md"
                      style={{ 
                        backgroundColor: `${character.colors.primary}05`,
                        borderColor: `${character.colors.primary}20`
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: character.colors.primary }}
                        >
                          <Star className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-architect-body font-architect-semibold text-architect-gray-900">
                          {ability}
                        </span>
                      </div>
                      <div className="ml-13">
                        <div 
                          className="w-full bg-architect-gray-200 rounded-full h-2"
                        >
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              backgroundColor: character.colors.primary,
                              width: `${Math.random() * 30 + 70}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emotions Tab (생각이) */}
          {character.emotions && (
            <TabsContent value="emotions" className="space-y-8">
              <Card className="p-8 shadow-architect-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-architect-h3 font-architect-bold text-architect-gray-900 flex items-center gap-3">
                    <Smile className="w-6 h-6 text-architect-accent" />
                    {t.emotions}
                  </CardTitle>
                  <CardDescription className="text-architect-body text-architect-gray-700">
                    {character.name}의 다양한 감정 표현을 확인해보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(character.emotions).map(([key, emotion]) => (
                      <div 
                        key={key}
                        className="p-6 rounded-xl border-2 text-center hover:shadow-architect-md transition-all duration-200"
                        style={{ 
                          backgroundColor: `${character.colors.accent}10`,
                          borderColor: `${character.colors.accent}30`
                        }}
                      >
                        <div className="text-4xl mb-4">{emotion.icon}</div>
                        <h4 className="text-architect-h4 font-architect-semibold text-architect-gray-900 mb-2">
                          {emotion.name}
                        </h4>
                        <p className="text-architect-body text-architect-gray-700 leading-architect-relaxed">
                          {emotion.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Growth Tab (생각이) */}
          {character.growthStages && (
            <TabsContent value="growth" className="space-y-8">
              <Card className="p-8 shadow-architect-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-architect-h3 font-architect-bold text-architect-gray-900 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-architect-success" />
                    {t.growth}
                  </CardTitle>
                  <CardDescription className="text-architect-body text-architect-gray-700">
                    사용자와 함께 성장하는 {character.name}의 단계별 변화
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {character.growthStages.map((stage, index) => (
                      <div key={stage.stage} className="relative">
                        {index < character.growthStages!.length - 1 && (
                          <div className="absolute left-8 top-16 w-0.5 h-20 bg-architect-gray-300" />
                        )}
                        
                        <div className="flex gap-6">
                          <div 
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-architect-md ${getLevelStyle(stage.level)}`}
                          >
                            <span className="text-architect-h4 font-architect-bold">
                              {stage.stage}
                            </span>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-architect-h4 font-architect-bold text-architect-gray-900">
                                {stage.title}
                              </h4>
                              <Badge className={getLevelStyle(stage.level)}>
                                {t.level[stage.level as keyof typeof t.level]}
                              </Badge>
                            </div>
                            
                            <p className="text-architect-body text-architect-gray-700 mb-4 leading-architect-relaxed">
                              {stage.description}
                            </p>
                            
                            <div>
                              <div className="text-architect-body font-architect-semibold text-architect-gray-900 mb-3">
                                {t.items}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {stage.items.map((item, itemIndex) => (
                                  <Badge 
                                    key={itemIndex}
                                    variant="outline"
                                    className="text-architect-small"
                                    style={{ 
                                      borderColor: character.colors.primary,
                                      color: character.colors.primary
                                    }}
                                  >
                                    <ShoppingBag className="w-3 h-3 mr-1" />
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Situations Tab (미루미) */}
          {character.situations && (
            <TabsContent value="situations" className="space-y-8">
              <Card className="p-8 shadow-architect-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-architect-h3 font-architect-bold text-architect-gray-900 flex items-center gap-3">
                    <Target className="w-6 h-6 text-architect-error" />
                    {t.situations}
                  </CardTitle>
                  <CardDescription className="text-architect-body text-architect-gray-700">
                    {character.name}가 만드는 다양한 방해 상황들
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {Object.entries(character.situations).map(([key, situation]) => (
                      <div 
                        key={key}
                        className="p-6 rounded-xl border-2 text-center hover:shadow-architect-md transition-all duration-200"
                        style={{ 
                          backgroundColor: `${character.colors.accent}10`,
                          borderColor: `${character.colors.accent}30`
                        }}
                      >
                        <div className="text-4xl mb-4">{situation.icon}</div>
                        <h4 className="text-architect-h4 font-architect-semibold text-architect-gray-900 mb-2">
                          {situation.name}
                        </h4>
                        <p className="text-architect-body text-architect-gray-700 leading-architect-relaxed">
                          {situation.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Inspiration Tab (반짝이) */}
          {character.inspirationModes && (
            <TabsContent value="inspiration" className="space-y-8">
              <Card className="p-8 shadow-architect-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-architect-h3 font-architect-bold text-architect-gray-900 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-architect-ai-accent" />
                    {t.inspiration}
                  </CardTitle>
                  <CardDescription className="text-architect-body text-architect-gray-700">
                    {character.name}가 영감을 주는 다양한 방식들
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {Object.entries(character.inspirationModes).map(([key, mode]) => (
                      <div 
                        key={key}
                        className="p-6 rounded-xl border-2 text-center hover:shadow-architect-md transition-all duration-200"
                        style={{ 
                          backgroundColor: `${character.colors.primary}10`,
                          borderColor: `${character.colors.primary}30`
                        }}
                      >
                        <div className="text-4xl mb-4">{mode.icon}</div>
                        <h4 className="text-architect-h4 font-architect-semibold text-architect-gray-900 mb-2">
                          {mode.name}
                        </h4>
                        <p className="text-architect-body text-architect-gray-700 leading-architect-relaxed">
                          {mode.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {/* Action Section */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-architect-primary/5 to-architect-accent/5 border-architect-primary/20 shadow-architect-lg">
          <div className="text-center">
            <h2 className="text-architect-h2 font-architect-bold text-architect-gray-900 mb-4">
              {character.name}와 함께 학습하기
            </h2>
            <p className="text-architect-body text-architect-gray-700 mb-8 max-w-2xl mx-auto leading-architect-relaxed">
              이제 {character.name}와 함께 실제 사고력 학습을 시작해보세요. 
              체계적인 8단계 방법론으로 여러분의 사고력을 한 단계 더 발전시킬 수 있습니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate?.('courses')}
                className="btn-architect-primary px-8 py-4"
              >
                <Brain className="w-5 h-5 mr-2" />
                사고력 학습 시작
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => onNavigate?.('course-phase')}
                className="border-architect-accent text-architect-accent hover:bg-architect-accent hover:text-white px-8 py-4"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                AI 실습 체험
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CharacterProfile;