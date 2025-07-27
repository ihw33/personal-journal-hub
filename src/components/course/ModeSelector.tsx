import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  BookOpen,
  Rocket,
  Brain,
  Target,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Lightbulb,
  Award,
  Star,
  Sparkles
} from 'lucide-react';

interface ModeSelectorProps {
  language: 'ko' | 'en';
  week: number;
  currentMode?: 'guided' | 'self-directed';
  onModeSelect: (mode: 'guided' | 'self-directed') => void;
  personalStats?: {
    guidedExperience: number;
    selfDirectedExperience: number;
    aiRecommendation: 'guided' | 'self-directed' | null;
    recommendationReason?: string;
  };
}

export function ModeSelector({ 
  language, 
  week, 
  currentMode,
  onModeSelect,
  personalStats = {
    guidedExperience: 50,
    selfDirectedExperience: 50,
    aiRecommendation: null
  }
}: ModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<'guided' | 'self-directed' | null>(currentMode || null);

  const content = {
    ko: {
      title: `${week}주차 학습 방식을 선택해주세요`,
      subtitle: "개인 성향과 학습 목표에 맞는 방식을 자유롭게 선택하세요",
      
      modeOptions: {
        guided: {
          title: "🎓 가이드형으로 학습",
          subtitle: "확실하고 체계적인 접근",
          description: "단계별 상세 안내를 받으며 실수 없이 안전하게 학습하고 싶을 때 추천합니다.",
          features: [
            "단계별 상세 가이드 제공",
            "강사의 개별 피드백",
            "실수 방지 체크포인트", 
            "완벽 수료 보장",
            "질문 답변 우선 지원"
          ],
          bestFor: "체계적 학습 선호, 확실한 결과 원하는 분",
          timeCommitment: "주당 3-4시간 (체계적 진행)",
          pros: [
            "✅ 놓치는 부분 없이 완벽 학습",
            "✅ 강사의 전문적인 피드백",
            "✅ 단계별 성취감",
            "✅ 안전한 학습 환경"
          ]
        },
        selfDirected: {
          title: "🚀 자기주도형으로 학습",
          subtitle: "자유롭고 창의적인 탐구",
          description: "자유로운 실험과 창의적 접근을 통해 개성있는 결과물을 만들고 싶을 때 추천합니다.",
          features: [
            "자유로운 탐구 방식",
            "창의적 실험 권장",
            "빠른 진도 조절 가능",
            "커뮤니티 기반 학습",
            "개인화된 학습 경로"
          ],
          bestFor: "창의적 학습 선호, 자유로운 탐구 원하는 분",
          timeCommitment: "주당 2-4시간 (유연한 진행)",
          pros: [
            "✅ 창의적이고 독창적인 결과",
            "✅ 자유로운 학습 속도",
            "✅ 개인화된 접근법",
            "✅ 실험적 학습 환경"
          ]
        }
      },
      
      aiInsights: {
        title: "🤖 AI 추천",
        noRecommendation: "두 방식 모두 좋습니다! 원하는 방식을 선택해보세요.",
        guidedRecommendation: "체계적인 접근이 도움될 것 같습니다.",
        selfDirectedRecommendation: "창의적 탐구에 도전해보세요!"
      },
      
      personalStats: {
        title: "📊 나의 학습 현황",
        guidedExperience: "가이드형 경험",
        selfDirectedExperience: "자기주도형 경험",
        recommendation: "균형잡힌 경험을 위해 다른 방식도 시도해보세요",
        balanced: "두 방식 모두 균형있게 경험하고 계시네요!"
      },
      
      weekSpecificGuidance: {
        1: "첫 시작입니다! 어떤 방식이든 자신있게 선택해보세요 🌱",
        2: "지난 주 경험은 어떠셨나요? 같은 방식 또는 다른 방식 모두 좋습니다 🌿",
        3: "이제 어느 정도 익숙해지셨을 거예요. 자신만의 패턴을 찾아보세요 🌳",
        4: "중반부입니다! 지금까지의 경험을 바탕으로 편한 방식을 선택하세요 🎯",
        5: "창의적인 요소가 많아집니다. 자기주도형도 좋은 선택일 수 있어요 ✨",
        6: "개인화 작업이 중심입니다. 원하는 방식으로 자유롭게 진행하세요 🎨",
        7: "실무적인 내용이 많습니다. 가이드형이 도움될 수 있어요 📋",
        8: "마지막 주차입니다! 지금까지의 경험을 바탕으로 자신있게 선택하세요 🏆"
      },
      
      // 주차별 특화 추천
      weeklyInsights: {
        1: {
          guided: "첫 주차에는 가이드형이 기초를 탄탄히 하는데 도움됩니다",
          selfDirected: "처음부터 자유롭게 탐구하며 나만의 방식을 찾아보세요"
        },
        2: {
          guided: "컨셉 정의는 체계적 접근이 중요합니다",
          selfDirected: "창의적 컨셉 발굴에는 자유로운 사고가 유리합니다"
        },
        3: {
          guided: "구조화 작업에는 단계별 가이드가 효과적입니다",
          selfDirected: "나만의 독특한 구조를 만들어보세요"
        },
        4: {
          guided: "리스크 분석은 체계적 접근이 필요합니다",
          selfDirected: "창의적 문제 해결 방법을 탐구해보세요"
        },
        5: {
          guided: "의미 부여 작업에 체계적 프레임워크 활용",
          selfDirected: "감성적이고 개인적인 의미를 자유롭게 탐구"
        },
        6: {
          guided: "개인화 작업에도 체계적 접근 가능",
          selfDirected: "완전히 나만의 색깔로 자유롭게 표현"
        },
        7: {
          guided: "실무 준비에는 체크리스트가 중요",
          selfDirected: "나만의 실행 방식을 창의적으로 설계"
        },
        8: {
          guided: "체계적 정리로 완벽한 마무리",
          selfDirected: "나만의 방식으로 성과를 정리하고 발전시키기"
        }
      },
      
      phaseFlexibility: "💡 Phase별로도 다른 방식 선택 가능",
      phaseFlexibilityDescription: "주차 중간에도 각 Phase마다 다른 방식을 선택할 수 있어요",
      
      selectMode: "이 방식 선택",
      selectedMode: "선택된 방식",
      changeAnytime: "언제든 변경 가능",
      
      // 새로 추가된 메시지
      allWeeksAvailable: "모든 주차에서 자유 선택 가능",
      yourChoice: "당신의 선택이 정답입니다"
    },
    en: {
      title: `Choose Your Learning Method for Week ${week}`,
      subtitle: "Freely select the method that matches your personal style and learning goals",
      
      modeOptions: {
        guided: {
          title: "🎓 Learn with Guided Mode",
          subtitle: "Reliable and Systematic Approach",
          description: "Recommended when you want to learn safely without mistakes through step-by-step detailed guidance.",
          features: [
            "Step-by-step detailed guidance",
            "Individual instructor feedback",
            "Mistake prevention checkpoints",
            "Perfect completion guarantee",
            "Priority Q&A support"
          ],
          bestFor: "Prefer systematic learning, want reliable results",
          timeCommitment: "3-4 hours per week (systematic progress)",
          pros: [
            "✅ Perfect learning without missing parts",
            "✅ Professional instructor feedback",
            "✅ Step-by-step achievement",
            "✅ Safe learning environment"
          ]
        },
        selfDirected: {
          title: "🚀 Learn with Self-Directed Mode", 
          subtitle: "Free and Creative Exploration",
          description: "Recommended when you want to create personalized results through free experimentation and creative approaches.",
          features: [
            "Free exploration methods",
            "Creative experimentation encouraged",
            "Flexible pace control",
            "Community-based learning",
            "Personalized learning path"
          ],
          bestFor: "Prefer creative learning, want free exploration",
          timeCommitment: "2-4 hours per week (flexible progress)",
          pros: [
            "✅ Creative and original results",
            "✅ Free learning pace",
            "✅ Personalized approach",
            "✅ Experimental learning environment"
          ]
        }
      },
      
      selectMode: "Select This Method",
      selectedMode: "Selected Method",
      changeAnytime: "Can Change Anytime",
      allWeeksAvailable: "Free choice available for all weeks",
      yourChoice: "Your choice is the right answer"
    }
  };

  const t = content[language];
  // @ts-expect-error - weeklyInsights may not exist in all language variants
  const weekInsight = t.weeklyInsights?.[week as keyof typeof t.weeklyInsights];

  const handleModeSelect = (mode: 'guided' | 'self-directed') => {
    setSelectedMode(mode);
    onModeSelect(mode);
  };

  const getBalanceRecommendation = () => {
    const diff = Math.abs(personalStats.guidedExperience - personalStats.selfDirectedExperience);
    if (diff < 20) {
      // @ts-expect-error - personalStats may not exist in all language variants
      return t.personalStats?.balanced || "Balanced approach recommended";
    } else if (personalStats.guidedExperience > personalStats.selfDirectedExperience) {
      return "자기주도형을 시도해보시는 것은 어떨까요?";
    } else {
      return "가이드형을 시도해보시는 것은 어떨까요?";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="border-2 border-iwl-purple/20 bg-gradient-to-br from-iwl-purple-50 to-iwl-blue-50 mb-8">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl md:text-3xl text-gray-900 mb-2">
            {t.title}
          </CardTitle>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
          
          {/* Week-specific guidance */}
          {/* @ts-expect-error - weekSpecificGuidance may not exist in all language variants */}
          {t.weekSpecificGuidance?.[week as keyof typeof t.weekSpecificGuidance] && (
            <div className="mt-4">
              <Badge variant="outline" className="border-iwl-purple text-iwl-purple text-sm px-4 py-2">
                {/* @ts-expect-error - weekSpecificGuidance may not exist in all language variants */}
                💬 {t.weekSpecificGuidance?.[week as keyof typeof t.weekSpecificGuidance]}
              </Badge>
            </div>
          )}
          
          {/* 자유 선택 강조 */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <Badge className="bg-gradient-to-r from-iwl-purple to-iwl-blue text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              {t.allWeeksAvailable}
            </Badge>
            <Badge variant="outline" className="border-iwl-blue text-iwl-blue">
              <Star className="w-3 h-3 mr-1" />
              {t.yourChoice}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Guided Mode */}
        <Card className={`border-2 transition-all duration-300 hover:shadow-lg ${
          selectedMode === 'guided' 
            ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105' 
            : 'border-blue-200 hover:border-blue-300'
        }`}>
          <CardHeader className="bg-blue-100/50 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">
                    {t.modeOptions.guided.title}
                  </CardTitle>
                  <p className="text-blue-600 font-medium text-sm">
                    {t.modeOptions.guided.subtitle}
                  </p>
                </div>
              </div>
              {selectedMode === 'guided' && (
                <Badge className="bg-green-500 text-white animate-pulse">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  선택됨
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <p className="text-gray-700 mb-6 leading-relaxed">
              {t.modeOptions.guided.description}
            </p>
            
            {/* 주차별 특화 인사이트 */}
            {weekInsight && (
              <div className="bg-blue-100 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900 text-sm mb-1">{week}주차 특화 추천</p>
                    <p className="text-blue-700 text-sm">{weekInsight.guided}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3 mb-6">
              {t.modeOptions.guided.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* 장점 강조 */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h5 className="font-medium text-blue-900 text-sm mb-3">🌟 가이드형의 장점</h5>
              <div className="space-y-2">
                {t.modeOptions.guided.pros.map((pro, index) => (
                  <p key={index} className="text-blue-700 text-sm">{pro}</p>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 text-sm mb-1">추천 대상</p>
                  <p className="text-blue-700 text-sm">{t.modeOptions.guided.bestFor}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                <span className="font-medium">⏰ 예상 시간:</span> {t.modeOptions.guided.timeCommitment}
              </div>
            </div>
            
            <Button 
              onClick={() => handleModeSelect('guided')}
              className={`w-full ${
                selectedMode === 'guided'
                  ? 'bg-blue-600 hover:bg-blue-700 ring-4 ring-blue-200'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-medium py-3 transition-all duration-300`}
            >
              {selectedMode === 'guided' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t.selectedMode}
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {t.selectMode}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Self-Directed Mode */}
        <Card className={`border-2 transition-all duration-300 hover:shadow-lg ${
          selectedMode === 'self-directed' 
            ? 'border-green-500 bg-green-50 shadow-lg transform scale-105' 
            : 'border-green-200 hover:border-green-300'
        }`}>
          <CardHeader className="bg-green-100/50 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">
                    {t.modeOptions.selfDirected.title}
                  </CardTitle>
                  <p className="text-green-600 font-medium text-sm">
                    {t.modeOptions.selfDirected.subtitle}
                  </p>
                </div>
              </div>
              {selectedMode === 'self-directed' && (
                <Badge className="bg-green-500 text-white animate-pulse">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  선택됨
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <p className="text-gray-700 mb-6 leading-relaxed">
              {t.modeOptions.selfDirected.description}
            </p>
            
            {/* 주차별 특화 인사이트 */}
            {weekInsight && (
              <div className="bg-green-100 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900 text-sm mb-1">{week}주차 특화 추천</p>
                    <p className="text-green-700 text-sm">{weekInsight.selfDirected}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3 mb-6">
              {t.modeOptions.selfDirected.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* 장점 강조 */}
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <h5 className="font-medium text-green-900 text-sm mb-3">🌟 자기주도형의 장점</h5>
              <div className="space-y-2">
                {t.modeOptions.selfDirected.pros.map((pro, index) => (
                  <p key={index} className="text-green-700 text-sm">{pro}</p>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 text-sm mb-1">추천 대상</p>
                  <p className="text-green-700 text-sm">{t.modeOptions.selfDirected.bestFor}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                <span className="font-medium">⏰ 예상 시간:</span> {t.modeOptions.selfDirected.timeCommitment}
              </div>
            </div>
            
            <Button 
              onClick={() => handleModeSelect('self-directed')}
              className={`w-full ${
                selectedMode === 'self-directed'
                  ? 'bg-green-600 hover:bg-green-700 ring-4 ring-green-200'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white font-medium py-3 transition-all duration-300`}
            >
              {selectedMode === 'self-directed' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t.selectedMode}
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {t.selectMode}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Personal Stats and AI Insights */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Personal Learning Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-iwl-purple" />
              {/* @ts-expect-error - personalStats may not exist in all language variants */}
              {t.personalStats?.title || "Personal Stats"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  {/* @ts-expect-error - personalStats may not exist in all language variants */}
                  <span className="text-sm text-gray-600">{t.personalStats?.guidedExperience || "Guided Experience"}</span>
                  <span className="text-sm font-medium text-blue-600">
                    {personalStats.guidedExperience}%
                  </span>
                </div>
                <Progress value={personalStats.guidedExperience} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  {/* @ts-expect-error - personalStats may not exist in all language variants */}
                  <span className="text-sm text-gray-600">{t.personalStats?.selfDirectedExperience || "Self-Directed Experience"}</span>
                  <span className="text-sm font-medium text-green-600">
                    {personalStats.selfDirectedExperience}%
                  </span>
                </div>
                <Progress value={personalStats.selfDirectedExperience} className="h-2" />
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-iwl-purple-50 rounded-lg">
              <p className="text-sm text-iwl-purple">
                💡 {getBalanceRecommendation()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-iwl-blue" />
              {/* @ts-expect-error - aiInsights may not exist in all language variants */}
              {t.aiInsights?.title || "AI Insights"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">자유로운 선택</span>
                </div>
                <p className="text-sm text-gray-700">
                  모든 주차에서 자유롭게 선택할 수 있습니다. 당신의 직감을 믿고 편한 방식을 선택하세요!
                </p>
              </div>
              
              <div className="text-center">
                <Badge variant="outline" className="border-iwl-purple text-iwl-purple">
                  {/* @ts-expect-error - phaseFlexibility may not exist in all language variants */}
                  {t.phaseFlexibility || "Phase Flexibility"}
                </Badge>
                <p className="text-xs text-gray-600 mt-2">
                  {/* @ts-expect-error - phaseFlexibilityDescription may not exist in all language variants */}
                  {t.phaseFlexibilityDescription || "Switch between modes anytime during the course"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selection Confirmation */}
      {selectedMode && (
        <Card className="border-2 border-iwl-purple bg-iwl-purple-50 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-iwl-purple" />
              <span className="text-xl font-bold text-gray-900">
                {selectedMode === 'guided' ? '가이드형' : '자기주도형'} 선택 완료! 🎉
              </span>
            </div>
            <p className="text-gray-700 mb-4">
              훌륭한 선택입니다! 언제든 Phase별로 다른 방식으로 전환할 수 있습니다.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline" className="border-iwl-purple text-iwl-purple">
                🔄 {t.changeAnytime}
              </Badge>
              <Badge className="bg-iwl-gradient text-white">
                <Star className="w-3 h-3 mr-1" />
                완벽한 선택
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}