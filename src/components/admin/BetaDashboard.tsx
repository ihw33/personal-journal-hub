// v115: 베타 테스트 관리 대시보드
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Activity, 
  Users, 
  MessageSquare, 
  Bug, 
  TrendingUp, 
  Settings,
  Download,
  Filter,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Eye,
  Star,
  ThumbsUp,
  ThumbsDown,
  Lightbulb
} from 'lucide-react';
import { BetaFlagService, BETA_FLAGS, type BetaFlag } from '../../lib/betaFlags';

interface BetaDashboardProps {
  className?: string;
}

interface FeedbackData {
  timestamp: string;
  featureKey: string;
  featureName: string;
  type: 'positive' | 'negative' | 'bug' | 'suggestion';
  rating?: number;
  feedback: string;
  context?: Record<string, any>;
}

interface ErrorReportData {
  timestamp: string;
  userId: string;
  error: string;
  context: Record<string, any>;
  action: string;
}

interface FeatureUsageData {
  timestamp: string;
  userId: string;
  userGroup: string;
  flagKey: string;
  action: string;
  version: string;
}

export function BetaDashboard({ className = "" }: BetaDashboardProps) {
  const [betaService] = useState(() => BetaFlagService.getInstance());
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
  const [errorReports, setErrorReports] = useState<ErrorReportData[]>([]);
  const [usageData, setUsageData] = useState<FeatureUsageData[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');

  // 데이터 로드
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    try {
      const feedback = JSON.parse(localStorage.getItem('beta-feedback') || '[]');
      const errors = JSON.parse(localStorage.getItem('beta-error-reports') || '[]');
      const usage = JSON.parse(localStorage.getItem('beta-feature-logs') || '[]');

      setFeedbackData(feedback);
      setErrorReports(errors);
      setUsageData(usage);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  // 시간 범위 필터링
  const filterByTimeRange = (data: any[]) => {
    const now = new Date();
    const cutoff = new Date();
    
    switch (timeRange) {
      case '24h':
        cutoff.setHours(now.getHours() - 24);
        break;
      case '7d':
        cutoff.setDate(now.getDate() - 7);
        break;
      case '30d':
        cutoff.setDate(now.getDate() - 30);
        break;
    }

    return data.filter(item => new Date(item.timestamp) >= cutoff);
  };

  // 통계 계산
  const getStats = () => {
    const filteredFeedback = filterByTimeRange(feedbackData);
    const filteredErrors = filterByTimeRange(errorReports);
    const filteredUsage = filterByTimeRange(usageData);

    const uniqueUsers = new Set(filteredUsage.map(item => item.userId)).size;
    const totalFeedback = filteredFeedback.length;
    const totalErrors = filteredErrors.length;
    const avgRating = filteredFeedback
      .filter(f => f.rating)
      .reduce((acc, f) => acc + (f.rating || 0), 0) / 
      filteredFeedback.filter(f => f.rating).length || 0;

    return {
      activeUsers: uniqueUsers,
      totalFeedback,
      totalErrors,
      avgRating: isNaN(avgRating) ? 0 : avgRating,
      errorRate: uniqueUsers > 0 ? ((totalErrors / uniqueUsers) * 100) : 0
    };
  };

  // 기능별 사용 통계
  const getFeatureStats = () => {
    const filteredUsage = filterByTimeRange(usageData);
    const featureStats: Record<string, { usage: number; users: Set<string> }> = {};

    filteredUsage.forEach(item => {
      if (!featureStats[item.flagKey]) {
        featureStats[item.flagKey] = { usage: 0, users: new Set() };
      }
      featureStats[item.flagKey].usage++;
      featureStats[item.flagKey].users.add(item.userId);
    });

    return Object.entries(featureStats).map(([key, stats]) => ({
      key,
      name: BETA_FLAGS.flags[key]?.name || key,
      usage: stats.usage,
      uniqueUsers: stats.users.size,
      enabled: BETA_FLAGS.flags[key]?.enabled || false
    }));
  };

  // 피드백 유형별 통계
  const getFeedbackStats = () => {
    const filteredFeedback = filterByTimeRange(feedbackData);
    const typeStats = {
      positive: filteredFeedback.filter(f => f.type === 'positive').length,
      negative: filteredFeedback.filter(f => f.type === 'negative').length,
      bug: filteredFeedback.filter(f => f.type === 'bug').length,
      suggestion: filteredFeedback.filter(f => f.type === 'suggestion').length
    };

    return typeStats;
  };

  const stats = getStats();
  const featureStats = getFeatureStats();
  const feedbackStats = getFeedbackStats();

  const exportData = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      timeRange,
      stats,
      featureStats,
      feedbackStats,
      feedback: filterByTimeRange(feedbackData),
      errors: filterByTimeRange(errorReports),
      usage: filterByTimeRange(usageData)
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beta-test-report-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">베타 테스트 대시보드</h1>
          <p className="text-gray-600">v115 베타 테스트 현황 및 피드백 관리</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="24h">최근 24시간</option>
            <option value="7d">최근 7일</option>
            <option value="30d">최근 30일</option>
          </select>
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            데이터 내보내기
          </Button>
          <Button onClick={loadDashboardData} size="sm">
            <Activity className="w-4 h-4 mr-2" />
            새로고침
          </Button>
        </div>
      </div>

      {/* 주요 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">활성 사용자</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 피드백</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFeedback}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">오류 보고</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalErrors}</p>
              </div>
              <Bug className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">평균 만족도</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : 'N/A'}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 기능별 사용 현황 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            기능별 사용 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featureStats.map((feature) => (
              <div key={feature.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge className={feature.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                    {feature.enabled ? '활성' : '비활성'}
                  </Badge>
                  <div>
                    <p className="font-medium text-gray-900">{feature.name}</p>
                    <p className="text-sm text-gray-600">{feature.key}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{feature.usage}</p>
                  <p className="text-sm text-gray-600">{feature.uniqueUsers}명 사용</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 피드백 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              피드백 유형별 분포
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { key: 'positive', label: '긍정적', icon: ThumbsUp, color: 'text-green-600 bg-green-50', count: feedbackStats.positive },
                { key: 'negative', label: '부정적', icon: ThumbsDown, color: 'text-red-600 bg-red-50', count: feedbackStats.negative },
                { key: 'bug', label: '버그 신고', icon: Bug, color: 'text-orange-600 bg-orange-50', count: feedbackStats.bug },
                { key: 'suggestion', label: '제안사항', icon: Lightbulb, color: 'text-blue-600 bg-blue-50', count: feedbackStats.suggestion }
              ].map((type) => (
                <div key={type.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${type.color}`}>
                      <type.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-900">{type.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{type.count}</span>
                    <div className="w-20">
                      <Progress 
                        value={stats.totalFeedback > 0 ? (type.count / stats.totalFeedback) * 100 : 0}
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              최근 피드백
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filterByTimeRange(feedbackData)
                .slice(0, 10)
                .map((feedback, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={
                        feedback.type === 'positive' ? 'bg-green-100 text-green-700' :
                        feedback.type === 'negative' ? 'bg-red-100 text-red-700' :
                        feedback.type === 'bug' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }>
                        {feedback.featureName}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(feedback.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{feedback.feedback}</p>
                    {feedback.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${
                              i < feedback.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 오류 보고 현황 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="w-5 h-5" />
            최근 오류 보고
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {filterByTimeRange(errorReports)
              .slice(0, 10)
              .map((error, index) => (
                <div key={index} className="p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-red-100 text-red-700">
                      {error.action}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(error.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-red-800 font-mono">{error.error}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    User: {error.userId} | Context: {JSON.stringify(error.context)}
                  </p>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}