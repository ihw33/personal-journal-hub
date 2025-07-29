'use client';

import React, { useState, useEffect } from 'react';
import { usePersonalization } from '../../contexts/PersonalizationContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Brain, 
  Target, 
  Clock, 
  Star, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Lightbulb,
  Calendar,
  Award,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface RecommendationEngineProps {
  language: 'ko' | 'en';
}

export const RecommendationEngine: React.FC<RecommendationEngineProps> = ({
  language
}) => {
  const { 
    personalizationData, 
    getPersonalizedRecommendations, 
    markActionCompleted,
    analyzeUserBehavior 
  } = usePersonalization();
  
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [behaviorInsights, setBehaviorInsights] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
    loadBehaviorInsights();
  }, [personalizationData]);

  const loadRecommendations = async () => {
    try {
      const recs = await getPersonalizedRecommendations();
      setRecommendations(recs);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    }
  };

  const loadBehaviorInsights = async () => {
    try {
      const insights = await analyzeUserBehavior();
      setBehaviorInsights(insights);
    } catch (error) {
      console.error('Failed to load behavior insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteAction = async (actionId: string) => {
    await markActionCompleted(actionId);
    await loadRecommendations(); // 새로운 추천 로드
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'learning': return <BookOpen className="w-5 h-5" />;
      case 'practice': return <Brain className="w-5 h-5" />;
      case 'review': return <Star className="w-5 h-5" />;
      case 'community': return <Users className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI 인사이트 요약 */}
      <Card className="border-iwl-purple border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-iwl-purple" />
            {language === 'ko' ? 'AI 개인화 인사이트' : 'AI Personalized Insights'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {personalizationData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-iwl-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-iwl-purple">
                  {personalizationData.behaviorAnalytics.engagementScore}
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'ko' ? '참여도 점수' : 'Engagement Score'}
                </p>
              </div>
              <div className="text-center p-4 bg-iwl-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-iwl-blue">
                  {personalizationData.behaviorAnalytics.learningVelocity}x
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'ko' ? '학습 속도' : 'Learning Velocity'}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {personalizationData.learningProgress.currentStreak}일
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'ko' ? '연속 학습' : 'Learning Streak'}
                </p>
              </div>
            </div>
          )}

          {behaviorInsights && (
            <Alert className={`border-2 ${
              behaviorInsights.dropoffRisk === 'high' ? 'border-red-200 bg-red-50' :
              behaviorInsights.dropoffRisk === 'medium' ? 'border-yellow-200 bg-yellow-50' :
              'border-green-200 bg-green-50'
            }`}>
              <Lightbulb className={`h-4 w-4 ${
                behaviorInsights.dropoffRisk === 'high' ? 'text-red-600' :
                behaviorInsights.dropoffRisk === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`} />
              <AlertDescription>
                <strong>
                  {language === 'ko' ? 'AI 분석 결과:' : 'AI Analysis:'}
                </strong>
                {' '}
                {behaviorInsights.dropoffRisk === 'low' 
                  ? (language === 'ko' 
                      ? '매우 안정적인 학습 패턴을 보이고 있습니다. 현재 속도를 유지하세요!' 
                      : 'You show very stable learning patterns. Keep up the current pace!')
                  : behaviorInsights.dropoffRisk === 'medium'
                  ? (language === 'ko'
                      ? '학습 참여도가 다소 감소하고 있습니다. 새로운 도전을 고려해보세요.'
                      : 'Your learning engagement is slightly decreasing. Consider new challenges.')
                  : (language === 'ko'
                      ? '학습 지속성에 주의가 필요합니다. 맞춤 지원을 제공드릴게요.'
                      : 'Your learning continuity needs attention. We\'ll provide customized support.')
                }
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* 개인화된 추천 액션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            {language === 'ko' ? '오늘의 맞춤 추천' : 'Today\'s Personalized Recommendations'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.length === 0 ? (
              <div className="text-center py-8">
                <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {language === 'ko' 
                    ? '새로운 추천을 준비하고 있습니다...' 
                    : 'Preparing new recommendations...'}
                </p>
              </div>
            ) : (
              recommendations.map((action) => (
                <div 
                  key={action.id} 
                  className={`p-4 border rounded-lg transition-all ${
                    action.completed ? 'bg-gray-50 opacity-60' : 'hover:border-iwl-purple'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        action.completed ? 'bg-gray-200' : 'bg-iwl-purple-100'
                      }`}>
                        {getTypeIcon(action.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-medium ${
                            action.completed ? 'line-through text-muted-foreground' : ''
                          }`}>
                            {action.title}
                          </h4>
                          <Badge className={getPriorityColor(action.priority)}>
                            {getPriorityIcon(action.priority)}
                            <span className="ml-1 capitalize">{action.priority}</span>
                          </Badge>
                        </div>
                        <p className={`text-sm mb-2 ${
                          action.completed ? 'text-muted-foreground' : 'text-gray-600'
                        }`}>
                          {action.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {action.estimatedTime}분
                          </span>
                          {action.deadline && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {action.deadline.toLocaleDateString('ko-KR')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {action.completed ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          완료
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleCompleteAction(action.id)}
                          className="bg-iwl-gradient text-white"
                        >
                          시작하기
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* 진행률 바 (해당하는 경우) */}
                  {action.type === 'learning' && personalizationData && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>전체 진행률</span>
                        <span>{personalizationData.learningProgress.completionRate}%</span>
                      </div>
                      <Progress 
                        value={personalizationData.learningProgress.completionRate} 
                        className="h-2"
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* 학습 패턴 분석 */}
      {personalizationData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {language === 'ko' ? '학습 패턴 분석' : 'Learning Pattern Analysis'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">
                  {language === 'ko' ? '강점 영역' : 'Strength Areas'}
                </h4>
                <div className="space-y-2">
                  {personalizationData.behaviorAnalytics.strongTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{topic.topic}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={topic.mastery} className="w-20 h-2" />
                        <span className="text-xs text-muted-foreground">
                          {topic.mastery}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">
                  {language === 'ko' ? '개선 필요 영역' : 'Areas for Improvement'}
                </h4>
                <div className="space-y-2">
                  {personalizationData.behaviorAnalytics.strugglingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{topic.topic}</span>
                      <Badge variant="outline" className="text-xs">
                        {topic.frequency}회 언급
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 성취 및 배지 */}
      {personalizationData && personalizationData.achievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              {language === 'ko' ? '최근 성취' : 'Recent Achievements'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalizationData.achievements.slice(-4).map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    <span className="text-xs text-yellow-600">
                      +{achievement.points} 포인트
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};