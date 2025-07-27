import { useAuth } from '../../contexts/AuthContext';
import { MemberDashboard } from './MemberDashboard';
import { AdminDashboard } from '../AdminDashboard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Card, CardContent } from '../ui/card';
import { AlertCircle } from 'lucide-react';

interface DashboardRouterProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function DashboardRouter({ language, onNavigate }: DashboardRouterProps) {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">인증이 필요합니다</h3>
            <p className="text-gray-600 mb-4">대시보드에 접근하려면 로그인이 필요합니다.</p>
            <button 
              onClick={() => onNavigate('auth')}
              className="bg-iwl-gradient text-white px-6 py-2 rounded-lg hover:opacity-90"
            >
              로그인하기
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 역할별 대시보드 라우팅
  switch (userProfile.role) {
    case 'member':
      return <MemberDashboard language={language} onNavigate={onNavigate} />;
    case 'instructor':
      return <MemberDashboard language={language} onNavigate={onNavigate} />; // v113에는 별도 instructor dashboard 없음
    case 'admin':
      return <AdminDashboard language={language} onNavigate={onNavigate} />;
    case 'master':
      return <AdminDashboard language={language} onNavigate={onNavigate} />; // v113에는 별도 master dashboard 없음
    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">알 수 없는 사용자 역할</h3>
              <p className="text-gray-600 mb-4">사용자 역할이 올바르지 않습니다.</p>
              <button 
                onClick={() => onNavigate('home')}
                className="bg-iwl-gradient text-white px-6 py-2 rounded-lg hover:opacity-90"
              >
                홈으로 돌아가기
              </button>
            </CardContent>
          </Card>
        </div>
      );
  }
}