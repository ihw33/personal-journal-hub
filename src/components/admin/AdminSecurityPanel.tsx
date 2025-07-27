// v117: Admin Security Panel Component
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { adminAudit, AdminAuditEvent } from '../../lib/adminAuditLog';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Download, 
  Trash2, 
  Clock,
  User,
  Monitor,
  Activity,
  Lock,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'lucide-react';

interface AdminSecurityPanelProps {
  language: 'ko' | 'en';
}

export function AdminSecurityPanel({ language }: AdminSecurityPanelProps) {
  const [securityStats, setSecurityStats] = useState(adminAudit.getSecurityStats());
  const [recentEvents, setRecentEvents] = useState<AdminAuditEvent[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<string>('ALL');

  const content = {
    ko: {
      title: '보안 관리 패널',
      overview: '보안 현황',
      auditLog: '감사 로그',
      recentActivity: '최근 활동',
      securityStats: '보안 통계',
      totalEvents: '총 이벤트',
      loginAttempts: '로그인 시도',
      successful: '성공',
      failed: '실패',
      violations: '보안 위반',
      activeUsers: '활성 사용자',
      exportLog: '로그 내보내기',
      clearOld: '오래된 로그 삭제',
      refresh: '새로고침',
      noEvents: '이벤트가 없습니다',
      eventTypes: {
        ALL: '전체',
        LOGIN: '로그인',
        LOGOUT: '로그아웃',
        PAGE_ACCESS: '페이지 접근',
        ACTION_PERFORMED: '작업 수행',
        SECURITY_VIOLATION: '보안 위반'
      }
    },
    en: {
      title: 'Security Management Panel',
      overview: 'Security Overview',
      auditLog: 'Audit Log',
      recentActivity: 'Recent Activity',
      securityStats: 'Security Statistics',
      totalEvents: 'Total Events',
      loginAttempts: 'Login Attempts',
      successful: 'Successful',
      failed: 'Failed',
      violations: 'Violations',
      activeUsers: 'Active Users',
      exportLog: 'Export Log',
      clearOld: 'Clear Old Logs',
      refresh: 'Refresh',
      noEvents: 'No events found',
      eventTypes: {
        ALL: 'All',
        LOGIN: 'Login',
        LOGOUT: 'Logout',
        PAGE_ACCESS: 'Page Access',
        ACTION_PERFORMED: 'Action Performed',
        SECURITY_VIOLATION: 'Security Violation'
      }
    }
  };

  const t = content[language];

  useEffect(() => {
    refreshData();
  }, [selectedEventType]);

  const refreshData = () => {
    setSecurityStats(adminAudit.getSecurityStats());
    
    const filter = selectedEventType === 'ALL' ? {} : { 
      event: selectedEventType as AdminAuditEvent['event'] 
    };
    setRecentEvents(adminAudit.getEvents({ ...filter, limit: 50 }));
  };

  const exportAuditLog = () => {
    const logData = adminAudit.exportLog();
    const blob = new Blob([logData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin_audit_log_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearOldLogs = () => {
    adminAudit.clearOldEvents(30);
    refreshData();
  };

  const getEventIcon = (event: AdminAuditEvent['event']) => {
    switch (event) {
      case 'LOGIN': return <User className="w-4 h-4" />;
      case 'LOGOUT': return <User className="w-4 h-4" />;
      case 'PAGE_ACCESS': return <Monitor className="w-4 h-4" />;
      case 'ACTION_PERFORMED': return <Activity className="w-4 h-4" />;
      case 'SECURITY_VIOLATION': return <AlertTriangle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getEventColor = (event: AdminAuditEvent['event'], success: boolean) => {
    if (!success) return 'text-red-500 bg-red-50';
    
    switch (event) {
      case 'LOGIN': return 'text-green-500 bg-green-50';
      case 'LOGOUT': return 'text-blue-500 bg-blue-50';
      case 'PAGE_ACCESS': return 'text-purple-500 bg-purple-50';
      case 'ACTION_PERFORMED': return 'text-orange-500 bg-orange-50';
      case 'SECURITY_VIOLATION': return 'text-red-500 bg-red-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshData} variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            {t.refresh}
          </Button>
          <Button onClick={exportAuditLog} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {t.exportLog}
          </Button>
          <Button onClick={clearOldLogs} variant="outline" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            {t.clearOld}
          </Button>
        </div>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalEvents}</p>
                <p className="text-2xl font-bold text-gray-900">{securityStats.totalEvents}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.loginAttempts}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">{securityStats.successfulLogins}</span>
                  <span className="text-sm text-gray-400">/</span>
                  <span className="text-lg text-red-600">{securityStats.failedLogins}</span>
                </div>
              </div>
              <Lock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.violations}</p>
                <p className="text-2xl font-bold text-red-600">{securityStats.securityViolations}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.activeUsers}</p>
                <p className="text-2xl font-bold text-purple-600">{securityStats.activeUsers.length}</p>
              </div>
              <User className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {t.auditLog}
            </CardTitle>
            
            {/* Event Type Filter */}
            <div className="flex gap-2">
              {Object.entries(t.eventTypes).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedEventType === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedEventType(key)}
                  className="text-xs"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {recentEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {t.noEvents}
              </div>
            ) : (
              recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getEventColor(event.event, event.success)}`}>
                      {getEventIcon(event.event)}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {t.eventTypes[event.event as keyof typeof t.eventTypes]}
                        </Badge>
                        {event.success ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {event.userId} • {event.page && `${event.page} • `}
                        {event.action && `${event.action} • `}
                      </div>
                      
                      {event.details && (
                        <div className="text-xs text-gray-500 mt-1">
                          {JSON.stringify(event.details, null, 2).slice(0, 100)}...
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {event.timestamp.toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}