'use client';

import { useState } from 'react';
import { Users, Search, Filter, Mail, Calendar, Shield, Edit, Ban, MessageSquare } from 'lucide-react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  user_type: 'user' | 'beta_tester' | 'instructor' | 'admin';
  subscription_status: 'free' | 'active' | 'expired';
  join_date: string;
  last_active: string;
  courses_enrolled: number;
  total_spent: number;
  status: 'active' | 'suspended' | 'inactive';
}

const mockUsers: User[] = [
  {
    id: '1',
    name: '김민수',
    email: 'kim***@gmail.com',
    user_type: 'beta_tester',
    subscription_status: 'active',
    join_date: '2025.07.15',
    last_active: '2시간 전',
    courses_enrolled: 2,
    total_spent: 49800,
    status: 'active'
  },
  {
    id: '2',
    name: '이서연',
    email: 'lee***@naver.com',
    user_type: 'user',
    subscription_status: 'free',
    join_date: '2025.07.20',
    last_active: '1일 전',
    courses_enrolled: 0,
    total_spent: 0,
    status: 'active'
  },
  {
    id: '3',
    name: '박준호',
    email: 'park***@gmail.com',
    user_type: 'instructor',
    subscription_status: 'active',
    join_date: '2025.06.10',
    last_active: '30분 전',
    courses_enrolled: 0,
    total_spent: 0,
    status: 'active'
  },
  {
    id: '4',
    name: '최지영',
    email: 'choi***@naver.com',
    user_type: 'user',
    subscription_status: 'active',
    join_date: '2025.08.01',
    last_active: '5일 전',
    courses_enrolled: 3,
    total_spent: 89700,
    status: 'inactive'
  }
];

export default function AdminUsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'user' | 'beta_tester' | 'instructor' | 'admin'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'suspended' | 'inactive'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  if (!user || user.user_metadata?.user_type !== 'admin') {
    router.push('/dashboard');
    return null;
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || u.user_type === selectedType;
    const matchesStatus = selectedStatus === 'all' || u.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleUserTypeChange = (userId: string, newType: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, user_type: newType as User['user_type'] }
        : u
    ));
  };

  const handleUserStatusChange = (userId: string, newStatus: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: newStatus as User['status'] }
        : u
    ));
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
              <h1 className="text-3xl font-bold">사용자 관리</h1>
            </div>
            <button className="px-4 py-2 bg-architect-primary text-white rounded-lg hover:bg-architect-secondary transition-colors">
              사용자 초대
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold">{users.length}</div>
            <div className="text-sm text-architect-gray-600">전체 사용자</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{users.filter(u => u.user_type === 'beta_tester').length}</div>
            <div className="text-sm text-architect-gray-600">베타 테스터</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</div>
            <div className="text-sm text-architect-gray-600">활성 사용자</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{users.filter(u => u.user_type === 'instructor').length}</div>
            <div className="text-sm text-architect-gray-600">강사</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-architect-gray-400" />
              <input
                type="text"
                placeholder="이름 또는 이메일로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary focus:border-architect-primary"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-4 py-3 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary"
            >
              <option value="all">모든 유형</option>
              <option value="user">일반 사용자</option>
              <option value="beta_tester">베타 테스터</option>
              <option value="instructor">강사</option>
              <option value="admin">관리자</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-4 py-3 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary"
            >
              <option value="all">모든 상태</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="suspended">정지</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-architect-gray-50 border-b border-architect-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">사용자</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">유형</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">구독 상태</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">활동</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">매출</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">상태</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-architect-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-architect-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-architect-primary rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-architect-gray-500">{user.email}</div>
                          <div className="text-xs text-architect-gray-400">가입: {user.join_date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.user_type}
                        onChange={(e) => handleUserTypeChange(user.id, e.target.value)}
                        className="text-sm px-2 py-1 border rounded"
                      >
                        <option value="user">일반 사용자</option>
                        <option value="beta_tester">베타 테스터</option>
                        <option value="instructor">강사</option>
                        <option value="admin">관리자</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        user.subscription_status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : user.subscription_status === 'expired'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.subscription_status === 'active' ? '활성' :
                         user.subscription_status === 'expired' ? '만료' : '무료'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>수업: {user.courses_enrolled}개</div>
                        <div className="text-architect-gray-500">최근: {user.last_active}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">₩{user.total_spent.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.status}
                        onChange={(e) => handleUserStatusChange(user.id, e.target.value)}
                        className={`text-xs px-2 py-1 border rounded ${
                          user.status === 'active' ? 'text-green-700 bg-green-50' :
                          user.status === 'suspended' ? 'text-red-700 bg-red-50' :
                          'text-gray-700 bg-gray-50'
                        }`}
                      >
                        <option value="active">활성</option>
                        <option value="inactive">비활성</option>
                        <option value="suspended">정지</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                          }}
                          className="p-2 text-architect-primary hover:bg-architect-primary/10 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-architect-accent hover:bg-architect-accent/10 rounded-lg transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-architect-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">사용자가 없습니다</h3>
            <p className="text-architect-gray-600">검색 조건에 맞는 사용자가 없습니다.</p>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">{selectedUser.name} 상세 정보</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-architect-gray-600">이메일</label>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm text-architect-gray-600">가입일</label>
                <p className="font-medium">{selectedUser.join_date}</p>
              </div>
              <div>
                <label className="text-sm text-architect-gray-600">총 결제 금액</label>
                <p className="font-medium">₩{selectedUser.total_spent.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm text-architect-gray-600">수강 중인 수업</label>
                <p className="font-medium">{selectedUser.courses_enrolled}개</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className="flex-1 px-4 py-2 bg-architect-gray-200 text-architect-gray-700 rounded-lg hover:bg-architect-gray-300 transition-colors"
              >
                닫기
              </button>
              <button className="flex-1 px-4 py-2 bg-architect-primary text-white rounded-lg hover:bg-architect-secondary transition-colors">
                메시지 보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}