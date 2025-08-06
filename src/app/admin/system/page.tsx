'use client';

import { useState } from 'react';
import { Settings, Bell, Shield, Database, Globe, Mail, Save, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SystemSettings {
  site_name: string;
  site_description: string;
  maintenance_mode: boolean;
  beta_signup_enabled: boolean;
  email_notifications: boolean;
  user_registration: boolean;
  payment_enabled: boolean;
  max_course_enrollment: number;
  session_timeout: number;
  announcement: {
    enabled: boolean;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
  };
}

export default function AdminSystemPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [settings, setSettings] = useState<SystemSettings>({
    site_name: 'IdeaWorkLab',
    site_description: 'AI와 함께하는 새로운 생각정리',
    maintenance_mode: false,
    beta_signup_enabled: true,
    email_notifications: true,
    user_registration: true,
    payment_enabled: true,
    max_course_enrollment: 10,
    session_timeout: 60,
    announcement: {
      enabled: true,
      message: '베타 테스터 모집 중입니다! 얼리 어답터 혜택을 놓치지 마세요.',
      type: 'info'
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'features' | 'notifications' | 'security'>('general');

  if (!user || user.user_metadata?.user_type !== 'admin') {
    router.push('/dashboard');
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: API 호출로 설정 저장
    await new Promise(resolve => setTimeout(resolve, 1000)); // 시뮬레이션
    setIsSaving(false);
  };

  const handleSettingChange = (key: string, value: any) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({ ...prev, [key]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-architect-gray-100">
      {/* Header */}
      <section className="bg-white border-b border-architect-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-architect-gray-600 hover:text-architect-primary"
              >
                관리자
              </Link>
              <span className="text-architect-gray-400">/</span>
              <h1 className="text-3xl font-bold">시스템 설정</h1>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-architect-primary text-white rounded-lg hover:bg-architect-secondary transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  저장하기
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {[
                { key: 'general', label: '일반 설정', icon: Settings },
                { key: 'features', label: '기능 설정', icon: Database },
                { key: 'notifications', label: '알림 설정', icon: Bell },
                { key: 'security', label: '보안 설정', icon: Shield }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === key
                      ? 'bg-architect-primary text-white'
                      : 'text-architect-gray-700 hover:bg-architect-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'general' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">일반 설정</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-architect-gray-700 mb-2">
                      사이트 이름
                    </label>
                    <input
                      type="text"
                      value={settings.site_name}
                      onChange={(e) => handleSettingChange('site_name', e.target.value)}
                      className="w-full px-4 py-3 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-architect-gray-700 mb-2">
                      사이트 설명
                    </label>
                    <textarea
                      value={settings.site_description}
                      onChange={(e) => handleSettingChange('site_description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary"
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">공지사항</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="announcement-enabled"
                          checked={settings.announcement.enabled}
                          onChange={(e) => handleSettingChange('announcement.enabled', e.target.checked)}
                          className="w-4 h-4 text-architect-primary focus:ring-architect-primary border-architect-gray-300 rounded"
                        />
                        <label htmlFor="announcement-enabled" className="text-sm font-medium">
                          공지사항 표시
                        </label>
                      </div>
                      
                      {settings.announcement.enabled && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-architect-gray-700 mb-2">
                              공지사항 내용
                            </label>
                            <textarea
                              value={settings.announcement.message}
                              onChange={(e) => handleSettingChange('announcement.message', e.target.value)}
                              rows={2}
                              className="w-full px-4 py-3 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-architect-gray-700 mb-2">
                              공지사항 유형
                            </label>
                            <select
                              value={settings.announcement.type}
                              onChange={(e) => handleSettingChange('announcement.type', e.target.value)}
                              className="w-full px-4 py-3 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary"
                            >
                              <option value="info">정보</option>
                              <option value="success">성공</option>
                              <option value="warning">경고</option>
                              <option value="error">오류</option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">기능 설정</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">사용자 기능</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">회원가입 허용</label>
                          <p className="text-xs text-architect-gray-500">새로운 사용자의 회원가입을 허용합니다</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.user_registration}
                            onChange={(e) => handleSettingChange('user_registration', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-architect-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-architect-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-architect-primary"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">베타 테스터 신청</label>
                          <p className="text-xs text-architect-gray-500">베타 테스터 신청을 받습니다</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.beta_signup_enabled}
                            onChange={(e) => handleSettingChange('beta_signup_enabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-architect-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-architect-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-architect-primary"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">결제 기능</label>
                          <p className="text-xs text-architect-gray-500">수업 결제를 허용합니다</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.payment_enabled}
                            onChange={(e) => handleSettingChange('payment_enabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-architect-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-architect-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-architect-primary"></div>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">시스템 제한</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-architect-gray-700 mb-2">
                          최대 수강 가능 수업 수
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={settings.max_course_enrollment}
                          onChange={(e) => handleSettingChange('max_course_enrollment', parseInt(e.target.value))}
                          className="w-full px-4 py-2 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-architect-gray-700 mb-2">
                          세션 타임아웃 (분)
                        </label>
                        <input
                          type="number"
                          min="15"
                          max="480"
                          value={settings.session_timeout}
                          onChange={(e) => handleSettingChange('session_timeout', parseInt(e.target.value))}
                          className="w-full px-4 py-2 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">알림 설정</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">이메일 알림</label>
                      <p className="text-xs text-architect-gray-500">시스템 알림을 이메일로 전송합니다</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.email_notifications}
                        onChange={(e) => handleSettingChange('email_notifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-architect-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-architect-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-architect-primary"></div>
                    </label>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">알림 받을 이벤트</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'new_user', label: '새 사용자 가입' },
                        { key: 'new_payment', label: '새 결제' },
                        { key: 'refund_request', label: '환불 요청' },
                        { key: 'course_completion', label: '수업 완료' },
                        { key: 'system_error', label: '시스템 오류' }
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={key}
                            defaultChecked
                            className="w-4 h-4 text-architect-primary focus:ring-architect-primary border-architect-gray-300 rounded"
                          />
                          <label htmlFor={key} className="text-sm">
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">보안 설정</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <label className="text-sm font-medium text-yellow-800">유지보수 모드</label>
                        <p className="text-xs text-yellow-700">사이트를 일시적으로 비활성화합니다</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.maintenance_mode}
                        onChange={(e) => handleSettingChange('maintenance_mode', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-yellow-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">접근 제한</h3>
                    <p className="text-sm text-architect-gray-600">
                      특정 IP 주소나 지역에서의 접근을 제한할 수 있습니다.
                    </p>
                    <button className="px-4 py-2 bg-architect-gray-200 text-architect-gray-700 rounded-lg hover:bg-architect-gray-300 transition-colors">
                      IP 차단 목록 관리
                    </button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">백업 설정</h3>
                    <p className="text-sm text-architect-gray-600">
                      데이터베이스와 사용자 파일을 정기적으로 백업합니다.
                    </p>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-architect-primary text-white rounded-lg hover:bg-architect-secondary transition-colors">
                        즉시 백업
                      </button>
                      <button className="px-4 py-2 bg-architect-gray-200 text-architect-gray-700 rounded-lg hover:bg-architect-gray-300 transition-colors">
                        백업 일정 설정
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}