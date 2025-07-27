import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  CheckCircle, 
  XCircle, 
  Settings, 
  ExternalLink, 
  Copy,
  AlertTriangle,
  Database,
  CreditCard
} from 'lucide-react';
import { toast } from 'sonner';

interface EnvironmentGuideProps {
  language: 'ko' | 'en';
  onClose: () => void;
}

export function EnvironmentGuide({ language, onClose }: EnvironmentGuideProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const content = {
    ko: {
      title: '환경 설정 가이드',
      subtitle: '실제 데이터베이스 연결을 위한 설정 방법',
      currentStatus: '현재 상태',
      demoMode: '데모 모드',
      productionMode: '프로덕션 모드',
      demoDescription: '모든 기능을 체험할 수 있지만 데이터는 저장되지 않습니다',
      productionDescription: '실제 데이터베이스에 연결되어 모든 데이터가 영구 저장됩니다',
      setupGuide: '설정 가이드',
      step1: 'Supabase 프로젝트 생성',
      step1Desc: 'supabase.com에서 무료 계정 생성 후 새 프로젝트 만들기',
      step2: '환경 변수 설정',
      step2Desc: '프로젝트 루트에 .env.local 파일 생성',
      step3: 'SQL 스크립트 실행',
      step3Desc: 'Supabase SQL Editor에서 supabase-setup.sql 실행',
      step4: '서버 재시작',
      step4Desc: '개발 서버를 재시작하여 변경사항 적용',
      envExample: '환경 변수 예시',
      copyToClipboard: '클립보드에 복사',
      copied: '복사되었습니다!',
      optionalFeatures: '선택적 기능',
      stripeSetup: 'Stripe 결제 설정',
      stripeDesc: '실제 결제 기능을 사용하려면 Stripe 설정이 필요합니다',
      continueDemo: '데모 계속하기',
      openSupabase: 'Supabase 열기',
      needHelp: '도움이 필요하신가요?',
      documentation: '문서 보기',
      benefits: {
        title: '프로덕션 모드의 장점',
        items: [
          '데이터 영구 저장',
          '사용자 계정 관리',
          '실시간 동기화',
          '백업 및 복원',
          '성능 모니터링'
        ]
      }
    },
    en: {
      title: 'Environment Setup Guide',
      subtitle: 'How to connect to real database',
      currentStatus: 'Current Status',
      demoMode: 'Demo Mode',
      productionMode: 'Production Mode',
      demoDescription: 'You can experience all features but data is not saved',
      productionDescription: 'Connected to real database with permanent data storage',
      setupGuide: 'Setup Guide',
      step1: 'Create Supabase Project',
      step1Desc: 'Create free account at supabase.com and create new project',
      step2: 'Set Environment Variables',
      step2Desc: 'Create .env.local file in project root',
      step3: 'Run SQL Script',
      step3Desc: 'Execute supabase-setup.sql in Supabase SQL Editor',
      step4: 'Restart Server',
      step4Desc: 'Restart development server to apply changes',
      envExample: 'Environment Variables Example',
      copyToClipboard: 'Copy to Clipboard',
      copied: 'Copied!',
      optionalFeatures: 'Optional Features',
      stripeSetup: 'Stripe Payment Setup',
      stripeDesc: 'Stripe setup required for real payment functionality',
      continueDemo: 'Continue Demo',
      openSupabase: 'Open Supabase',
      needHelp: 'Need Help?',
      documentation: 'View Documentation',
      benefits: {
        title: 'Production Mode Benefits',
        items: [
          'Permanent data storage',
          'User account management',
          'Real-time sync',
          'Backup & restore',
          'Performance monitoring'
        ]
      }
    }
  };

  const t = content[language];

  // Check environment status
  const isDemo = !import.meta.env?.VITE_SUPABASE_URL || 
                 import.meta.env?.VITE_SUPABASE_URL === 'your_supabase_project_url_here';

  const envTemplate = `# Idea Work Lab - Environment Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: For payment functionality
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(t.copied);
    }).catch(() => {
      toast.error('Failed to copy');
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-iwl-purple" />
                {t.title}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">{t.subtitle}</p>
            </div>
            <Button variant="ghost" onClick={onClose} size="sm">
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Status */}
          <div>
            <h3 className="font-medium mb-3">{t.currentStatus}</h3>
            <Card className={`border-2 ${isDemo ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  {isDemo ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {isDemo ? t.demoMode : t.productionMode}
                      </span>
                      <Badge variant={isDemo ? 'secondary' : 'default'}>
                        {isDemo ? 'Demo' : 'Production'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {isDemo ? t.demoDescription : t.productionDescription}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Setup Guide */}
          {isDemo && (
            <div>
              <h3 className="font-medium mb-3">{t.setupGuide}</h3>
              <div className="space-y-3">
                {/* Step 1 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-iwl-purple text-white rounded-full flex items-center justify-center text-sm font-medium">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{t.step1}</h4>
                        <p className="text-sm text-gray-600 mt-1">{t.step1Desc}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t.openSupabase}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 2 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-iwl-purple text-white rounded-full flex items-center justify-center text-sm font-medium">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{t.step2}</h4>
                        <p className="text-sm text-gray-600 mt-1">{t.step2Desc}</p>
                        
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{t.envExample}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(envTemplate)}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              {t.copyToClipboard}
                            </Button>
                          </div>
                          <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                            {envTemplate}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 3 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-iwl-purple text-white rounded-full flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{t.step3}</h4>
                        <p className="text-sm text-gray-600 mt-1">{t.step3Desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 4 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-iwl-purple text-white rounded-full flex items-center justify-center text-sm font-medium">
                        4
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{t.step4}</h4>
                        <p className="text-sm text-gray-600 mt-1">{t.step4Desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Production Benefits */}
          <div>
            <h3 className="font-medium mb-3">{t.benefits.title}</h3>
            <div className="grid grid-cols-2 gap-2">
              {t.benefits.items.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Optional Features */}
          <div>
            <h3 className="font-medium mb-3">{t.optionalFeatures}</h3>
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">{t.stripeSetup}</h4>
                    <p className="text-sm text-blue-700 mt-1">{t.stripeDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onClose}>
              {t.continueDemo}
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('/README.md', '_blank')}
              >
                {t.documentation}
              </Button>
              {isDemo && (
                <Button 
                  onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                  className="bg-iwl-gradient hover:opacity-90 text-white"
                >
                  <Database className="w-4 h-4 mr-2" />
                  {t.openSupabase}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}