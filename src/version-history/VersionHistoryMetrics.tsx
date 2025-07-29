import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { TrendingUp, Rocket, Award } from 'lucide-react';
import { MetricData } from './types';

interface VersionHistoryMetricsProps {
  language: 'ko' | 'en';
  businessMetrics: MetricData[];
  technicalMetrics: MetricData[];
  qualityMetrics: MetricData[];
}

export function VersionHistoryMetrics({ 
  language, 
  businessMetrics, 
  technicalMetrics, 
  qualityMetrics 
}: VersionHistoryMetricsProps) {
  const content = {
    ko: {
      businessMetrics: '비즈니스 지표',
      technicalMetrics: '기술 지표',
      qualityMetrics: '품질 지표'
    },
    en: {
      businessMetrics: 'Business Metrics',
      technicalMetrics: 'Technical Metrics',
      qualityMetrics: 'Quality Metrics'
    }
  };

  const t = content[language];

  const renderMetricCard = (metric: MetricData) => (
    <Card key={metric.label} className="border-2 border-gray-100 hover:border-iwl-purple-200 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {metric.icon}
            <span className="font-medium text-sm">{metric.label}</span>
          </div>
          <span className="text-lg font-bold text-iwl-purple">{metric.value}</span>
        </div>
        <p className="text-xs text-gray-600 mb-3">{metric.description}</p>
        <Progress value={metric.progress} className="h-2" />
      </CardContent>
    </Card>
  );

  return (
    <div className="grid lg:grid-cols-3 gap-8 mb-12">
      {/* 비즈니스 지표 */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          {t.businessMetrics}
        </h3>
        <div className="space-y-4">
          {businessMetrics.map(renderMetricCard)}
        </div>
      </div>

      {/* 기술 지표 */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-iwl-purple" />
          {t.technicalMetrics}
        </h3>
        <div className="space-y-4">
          {technicalMetrics.map(renderMetricCard)}
        </div>
      </div>

      {/* 품질 지표 */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-iwl-blue" />
          {t.qualityMetrics}
        </h3>
        <div className="space-y-4">
          {qualityMetrics.map(renderMetricCard)}
        </div>
      </div>
    </div>
  );
}