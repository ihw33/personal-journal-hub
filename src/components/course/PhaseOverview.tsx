import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Target, Clock } from 'lucide-react';
import { PhaseData, PracticeContent } from './types';

interface PhaseOverviewProps {
  phase: number;
  phaseData: PhaseData;
  practiceContent: PracticeContent;
  language: 'ko' | 'en';
}

export function PhaseOverview({ phase, phaseData, practiceContent, language }: PhaseOverviewProps) {
  const t = {
    ko: {
      objective: '이 Phase의 목표'
    },
    en: {
      objective: 'Phase Objective'
    }
  };

  const content = t[language];

  return (
    <Card className="border-2 border-iwl-purple/20 bg-gradient-to-br from-iwl-purple-50 to-iwl-blue-50">
      <CardContent className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Phase {phase}: {phaseData.title}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{phaseData.description}</p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="border-iwl-purple text-iwl-purple text-lg px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              {phaseData.duration}
            </Badge>
          </div>
        </div>
        
        <div className="bg-white/80 rounded-xl p-6 border border-iwl-purple/20">
          <div className="flex items-start gap-3">
            <Target className="w-6 h-6 text-iwl-purple mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">🎯 {content.objective}</h4>
              <p className="text-gray-700 leading-relaxed">{practiceContent.objective}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}