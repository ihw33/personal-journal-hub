import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  CheckCircle,
  Clock,
  Lock,
  ArrowRight,
  Target,
  Users,
  Zap
} from 'lucide-react';

interface Phase {
  id: string;
  number: number;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
  description: string;
}

interface PhaseProgressProps {
  weekNumber: number;
  weekTitle: string;
  phases: Phase[];
  currentPhase: number;
  onPhaseClick: (phaseNumber: number, mode?: 'guided' | 'self-directed') => void;
  totalDuration: string;
  selectedMode?: 'guided' | 'self-directed' | null;
}

export function PhaseProgress({ 
  weekNumber, 
  weekTitle, 
  phases, 
  currentPhase, 
  onPhaseClick,
  totalDuration,
  selectedMode
}: PhaseProgressProps) {
  const completedPhases = phases.filter(phase => phase.status === 'completed').length;
  const progressPercentage = (completedPhases / phases.length) * 100;

  const getStatusIcon = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'current':
        return <Clock className="w-5 h-5 text-iwl-purple" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50 hover:bg-green-100';
      case 'current':
        return 'border-iwl-purple bg-iwl-purple-50 hover:bg-iwl-purple-100';
      case 'locked':
        return 'border-gray-200 bg-gray-50 cursor-not-allowed';
    }
  };

  const handlePhaseClick = (phase: Phase) => {
    if (phase.status === 'locked') return;
    
    // Phase를 클릭하면 독립 페이지로 이동
    if (selectedMode) {
      onPhaseClick(phase.number, selectedMode);
    } else {
      onPhaseClick(phase.number);
    }
  };

  return (
    <Card className="border-2 border-iwl-purple/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-gray-900 mb-2">
              📅 {weekNumber}주차 진행 상황
            </CardTitle>
            <p className="text-gray-600">{weekTitle}</p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="border-iwl-purple text-iwl-purple mb-2">
              <Target className="w-3 h-3 mr-1" />
              {totalDuration}
            </Badge>
            <div className="text-sm text-gray-600">
              {completedPhases}/{phases.length} Phase 완료
            </div>
          </div>
        </div>
        
        {/* Overall Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>전체 진행률</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              className={`relative border-2 rounded-lg p-4 transition-all duration-200 ${getStatusColor(phase.status)} ${
                phase.status !== 'locked' ? 'cursor-pointer' : ''
              }`}
              onClick={() => handlePhaseClick(phase)}
            >
              {/* Connection Line */}
              {index < phases.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-300"></div>
              )}
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-current flex items-center justify-center">
                  {getStatusIcon(phase.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">
                      Phase {phase.number}: {phase.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {phase.duration}
                      </Badge>
                      {phase.status !== 'locked' && (
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {phase.description}
                  </p>
                  
                  {/* Phase Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {phase.status === 'completed' && (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          ✅ 완료됨
                        </Badge>
                      )}
                      {phase.status === 'current' && (
                        <Badge className="bg-iwl-purple-100 text-iwl-purple text-xs">
                          🔄 진행 중
                        </Badge>
                      )}
                      {phase.status === 'locked' && (
                        <Badge variant="outline" className="border-gray-300 text-gray-500 text-xs">
                          🔒 잠김
                        </Badge>
                      )}
                    </div>
                    
                    {phase.status !== 'locked' && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-xs px-3 py-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePhaseClick(phase);
                        }}
                      >
                        {phase.status === 'completed' ? '다시 보기' : '시작하기'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Actions */}
        {selectedMode && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-iwl-purple" />
                <span className="font-medium text-gray-900">
                  {selectedMode === 'guided' ? '가이드형' : '자기주도형'} 모드로 진행 중
                </span>
              </div>
              <Badge variant="outline" className="border-iwl-purple text-iwl-purple text-xs">
                Phase별 독립 실습
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Compact version for sidebar
export function CompactPhaseProgress({ 
  phases, 
  currentPhase, 
  onPhaseClick,
  selectedMode
}: Omit<PhaseProgressProps, 'weekNumber' | 'weekTitle' | 'totalDuration'>) {
  const handlePhaseClick = (phase: Phase) => {
    if (phase.status === 'locked') return;
    
    if (selectedMode) {
      onPhaseClick(phase.number, selectedMode);
    } else {
      onPhaseClick(phase.number);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Phase 진행</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {phases.map((phase) => (
          <Button
            key={phase.id}
            variant={phase.number === currentPhase ? "default" : "ghost"}
            className={`w-full justify-start gap-3 ${
              phase.number === currentPhase ? 'bg-iwl-purple hover:bg-iwl-purple/90' : ''
            } ${phase.status === 'locked' ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handlePhaseClick(phase)}
            disabled={phase.status === 'locked'}
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
              {phase.status === 'completed' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                phase.number
              )}
            </div>
            <div className="text-left flex-1">
              <div className="text-sm font-medium">Phase {phase.number}</div>
              <div className="text-xs opacity-80">{phase.title}</div>
            </div>
            {phase.status !== 'locked' && (
              <ArrowRight className="w-3 h-3" />
            )}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}