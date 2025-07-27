// v116: 베타 대기열 관리 컴포넌트
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  Mail, 
  Gift,
  Plus,
  Download,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  RefreshCw,
  Calendar,
  Target,
  Eye,
  Send
} from 'lucide-react';
import { toast } from 'sonner';
import { BetaWaitlistService, type BetaWaitlistEntry, type BetaInviteCode } from '../../lib/betaWaitlist';

interface BetaWaitlistManagerProps {
  className?: string;
}

export function BetaWaitlistManager({ className = "" }: BetaWaitlistManagerProps) {
  const [waitlistService] = useState(() => BetaWaitlistService.getInstance());
  const [waitlistEntries, setWaitlistEntries] = useState<BetaWaitlistEntry[]>([]);
  const [inviteCodes, setInviteCodes] = useState<BetaInviteCode[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    availableSpots: 0
  });
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 새 초대 코드 생성 폼
  const [newCodeForm, setNewCodeForm] = useState({
    description: '',
    maxUses: 10,
    expiresInDays: 30
  });

  // 데이터 로드
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    try {
      const entries = waitlistService.getAllWaitlistEntries();
      const codes = waitlistService.getInviteCodes();
      const waitlistStats = waitlistService.getWaitlistStats();

      setWaitlistEntries(entries);
      setInviteCodes(codes);
      setStats(waitlistStats);
    } catch (error) {
      console.error('Failed to load waitlist data:', error);
      toast.error('데이터 로드 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 필터링된 대기열 엔트리
  const filteredEntries = waitlistEntries.filter(entry => {
    const matchesFilter = filter === 'all' || entry.status === filter;
    const matchesSearch = !searchTerm || 
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // 사용자 승인
  const handleApproveUser = async (email: string) => {
    const result = await waitlistService.approveUser(email);
    if (result.success) {
      toast.success('사용자가 승인되었습니다.');
      loadData();
    } else {
      toast.error(result.error || '승인 중 오류가 발생했습니다.');
    }
  };

  // 사용자 거부
  const handleRejectUser = async (email: string) => {
    const result = await waitlistService.rejectUser(email);
    if (result.success) {
      toast.success('사용자가 거부되었습니다.');
      loadData();
    } else {
      toast.error(result.error || '거부 중 오류가 발생했습니다.');
    }
  };

  // 새 초대 코드 생성
  const handleCreateInviteCode = () => {
    if (!newCodeForm.description.trim()) {
      toast.error('설명을 입력해주세요.');
      return;
    }

    try {
      const code = waitlistService.generateInviteCode(
        newCodeForm.description.trim(),
        newCodeForm.maxUses,
        newCodeForm.expiresInDays || undefined
      );

      toast.success(`초대 코드가 생성되었습니다: ${code}`);
      setNewCodeForm({ description: '', maxUses: 10, expiresInDays: 30 });
      loadData();
    } catch (error) {
      toast.error('초대 코드 생성 중 오류가 발생했습니다.');
    }
  };

  // 초대 코드 복사
  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('초대 코드가 복사되었습니다.');
  };

  // 데이터 내보내기
  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      stats,
      waitlist: waitlistEntries,
      inviteCodes
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beta-waitlist-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 헤더 및 통계 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">베타 대기열 관리</h1>
          <p className="text-gray-600">베타 테스터 신청자 관리 및 초대 코드 생성</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={loadData} variant="outline" size="sm" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            새로고침
          </Button>
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            데이터 내보내기
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 신청자</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">대기 중</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">승인됨</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">거부됨</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">남은 자리</p>
                <p className="text-2xl font-bold text-gray-900">{stats.availableSpots}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 초대 코드 관리 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            초대 코드 관리
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 새 코드 생성 폼 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <Input
              placeholder="코드 설명 (예: VIP 얼리액세스)"
              value={newCodeForm.description}
              onChange={(e) => setNewCodeForm({ ...newCodeForm, description: e.target.value })}
            />
            <Input
              type="number"
              placeholder="최대 사용 횟수"
              value={newCodeForm.maxUses}
              onChange={(e) => setNewCodeForm({ ...newCodeForm, maxUses: parseInt(e.target.value) || 10 })}
            />
            <Input
              type="number"
              placeholder="만료일 (일)"
              value={newCodeForm.expiresInDays}
              onChange={(e) => setNewCodeForm({ ...newCodeForm, expiresInDays: parseInt(e.target.value) || 30 })}
            />
            <Button onClick={handleCreateInviteCode} className="bg-purple-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              코드 생성
            </Button>
          </div>

          {/* 기존 초대 코드 목록 */}
          <div className="space-y-2">
            {inviteCodes.map((code, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">
                    {code.code}
                  </code>
                  <div className="text-sm">
                    <div className="font-medium">{code.description}</div>
                    <div className="text-gray-600">
                      사용: {code.currentUses}/{code.maxUses} | 
                      만료: {code.expiresAt ? new Date(code.expiresAt).toLocaleDateString() : '없음'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={code.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                    {code.isActive ? '활성' : '비활성'}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyInviteCode(code.code)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 대기열 관리 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              베타 대기열 ({filteredEntries.length}명)
            </CardTitle>
            <div className="flex items-center gap-3">
              {/* 검색 */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="이름 또는 이메일 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              {/* 필터 */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">전체</option>
                <option value="pending">대기 중</option>
                <option value="approved">승인됨</option>
                <option value="rejected">거부됨</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(entry.status)}
                    <Badge className={getStatusColor(entry.status)}>
                      {entry.status === 'pending' ? '대기중' : 
                       entry.status === 'approved' ? '승인됨' : '거부됨'}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="font-medium text-gray-900">{entry.name}</div>
                    <div className="text-sm text-gray-600">{entry.email}</div>
                  </div>
                  
                  {entry.inviteCode && (
                    <Badge variant="outline" className="text-xs">
                      코드: {entry.inviteCode}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right text-sm text-gray-600">
                    <div>신청: {new Date(entry.registeredAt).toLocaleDateString()}</div>
                    {entry.position && entry.status === 'pending' && (
                      <div>순번: {entry.position}번째</div>
                    )}
                  </div>

                  {entry.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveUser(entry.email)}
                        className="bg-green-600 text-white"
                      >
                        <UserCheck className="w-4 h-4 mr-1" />
                        승인
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectUser(entry.email)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <UserX className="w-4 h-4 mr-1" />
                        거부
                      </Button>
                    </div>
                  )}

                  {entry.status === 'approved' && (
                    <Badge className="bg-green-100 text-green-700">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(entry.approvedAt!).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </div>
            ))}

            {filteredEntries.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>조건에 맞는 신청자가 없습니다.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}