import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Zap, Rocket, Star, CheckCircle } from 'lucide-react';
import { PhaseData } from './types';

interface VersionHistoryPhasesProps {
  language: 'ko' | 'en';
  phases: PhaseData[];
}

export function VersionHistoryPhases({ language, phases }: VersionHistoryPhasesProps) {
  const content = {
    ko: {
      phaseTitle: '개발 단계'
    },
    en: {
      phaseTitle: 'Development Phases'
    }
  };

  const t = content[language];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const renderPhase = (phase: PhaseData) => {
    const isCurrentPhase = phase.status === 'current';
    
    return (
      <Card key={phase.id} className={`border-2 ${isCurrentPhase ? 'border-iwl-purple bg-iwl-purple-50' : 'border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={`flex items-center gap-3 ${isCurrentPhase ? 'text-iwl-purple' : 'text-gray-700'}`}>
              {isCurrentPhase && <Zap className="w-5 h-5" />}
              {phase.status === 'next' && <Rocket className="w-5 h-5" />}
              {phase.status === 'future' && <Star className="w-5 h-5" />}
              {phase.status === 'completed' && <CheckCircle className="w-5 h-5" />}
              <div>
                <div className="text-lg">{phase.title}</div>
                <div className="text-sm font-normal text-gray-600">{phase.description}</div>
              </div>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{phase.versions}</Badge>
              <Badge variant="outline">{phase.period}</Badge>
              {phase.status === 'current' && (
                <Badge className="bg-iwl-gradient text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  Current
                </Badge>
              )}
              {phase.status === 'completed' && (
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {phase.features.map((feature, idx) => (
              <Badge key={idx} variant="outline" className="text-xs justify-center">
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-iwl-purple" />
        {t.phaseTitle}
      </h2>
      <div className="grid gap-6">
        {phases.map((phase, index) => renderPhase(phase))}
      </div>
    </div>
  );
}