'use client';

import { useState } from 'react';
import { CreditCard, Calendar, TrendingUp, Download, RefreshCw, DollarSign } from 'lucide-react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Payment {
  id: string;
  user_name: string;
  user_email: string;
  course_title: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  payment_method: '신용카드' | '계좌이체' | '간편결제';
  created_date: string;
  transaction_id: string;
  refund_reason?: string;
  refund_date?: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    user_name: '김민수',
    user_email: 'kim***@gmail.com',
    course_title: '초등 3학년 ~ 중등 1학년',
    amount: 19900,
    status: 'completed',
    payment_method: '신용카드',
    created_date: '2025.08.06 14:30',
    transaction_id: 'TXN-2025-0806-001'
  },
  {
    id: '2',
    user_name: '이서연',
    user_email: 'lee***@naver.com',
    course_title: '중등 2학년 ~ 고등 3학년',
    amount: 29900,
    status: 'completed',
    payment_method: '간편결제',
    created_date: '2025.08.06 10:15',
    transaction_id: 'TXN-2025-0806-002'
  },
  {
    id: '3',
    user_name: '박준호',
    user_email: 'park***@gmail.com',
    course_title: '대학생 ~ 직장인',
    amount: 39900,
    status: 'refunded',
    payment_method: '신용카드',
    created_date: '2025.08.05 16:45',
    transaction_id: 'TXN-2025-0805-003',
    refund_reason: '단순 변심',
    refund_date: '2025.08.06 09:00'
  },
  {
    id: '4',
    user_name: '최지영',
    user_email: 'choi***@naver.com',
    course_title: '초등 3학년 ~ 중등 1학년',
    amount: 19900,
    status: 'pending',
    payment_method: '계좌이체',
    created_date: '2025.08.06 11:20',
    transaction_id: 'TXN-2025-0806-004'
  },
  {
    id: '5',
    user_name: '정민호',
    user_email: 'jung***@gmail.com',
    course_title: '중등 2학년 ~ 고등 3학년',
    amount: 29900,
    status: 'failed',
    payment_method: '신용카드',
    created_date: '2025.08.06 08:30',
    transaction_id: 'TXN-2025-0806-005'
  }
];

export default function AdminPaymentsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'pending' | 'failed' | 'refunded'>('all');
  const [dateRange, setDateRange] = useState('week');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundPayment, setRefundPayment] = useState<Payment | null>(null);
  const [refundReason, setRefundReason] = useState('');

  if (!user || user.user_metadata?.user_type !== 'admin') {
    router.push('/dashboard');
    return null;
  }

  const filteredPayments = payments.filter(payment => {
    return selectedStatus === 'all' || payment.status === selectedStatus;
  });

  const stats = {
    totalRevenue: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: payments.length,
    completedPayments: payments.filter(p => p.status === 'completed').length,
    refundedAmount: payments.filter(p => p.status === 'refunded').reduce((sum, p) => sum + p.amount, 0)
  };

  const handleRefund = (payment: Payment) => {
    setRefundPayment(payment);
    setShowRefundModal(true);
  };

  const confirmRefund = () => {
    if (refundPayment) {
      setPayments(payments.map(p => 
        p.id === refundPayment.id 
          ? { 
              ...p, 
              status: 'refunded' as const, 
              refund_reason: refundReason,
              refund_date: new Date().toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              }).replace(/\./g, '.').replace(', ', ' ')
            }
          : p
      ));
      setShowRefundModal(false);
      setRefundPayment(null);
      setRefundReason('');
    }
  };

  const exportPayments = () => {
    // TODO: CSV 내보내기 기능 구현
    console.log('Exporting payments...');
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
              <h1 className="text-3xl font-bold">결제 관리</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportPayments}
                className="px-4 py-2 bg-architect-gray-600 text-white rounded-lg hover:bg-architect-gray-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                CSV 내보내기
              </button>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary"
              >
                <option value="today">오늘</option>
                <option value="week">이번 주</option>
                <option value="month">이번 달</option>
                <option value="year">올해</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10 text-green-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold">₩{stats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-architect-gray-600">총 매출</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-10 h-10 text-architect-primary" />
              <span className="text-sm font-medium">{stats.totalTransactions}</span>
            </div>
            <div className="text-2xl font-bold">{stats.completedPayments}</div>
            <div className="text-sm text-architect-gray-600">성공한 결제</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <RefreshCw className="w-10 h-10 text-red-600" />
              <span className="text-sm font-medium text-red-600">
                {payments.filter(p => p.status === 'refunded').length}건
              </span>
            </div>
            <div className="text-2xl font-bold text-red-600">₩{stats.refundedAmount.toLocaleString()}</div>
            <div className="text-sm text-architect-gray-600">환불 금액</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-10 h-10 text-architect-accent" />
              <span className="text-sm font-medium">
                {((stats.completedPayments / stats.totalTransactions) * 100 || 0).toFixed(1)}%
              </span>
            </div>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
            <div className="text-sm text-architect-gray-600">전체 거래</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex gap-2">
            {['all', 'completed', 'pending', 'failed', 'refunded'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-architect-primary text-white'
                    : 'bg-architect-gray-100 text-architect-gray-700 hover:bg-architect-gray-200'
                }`}
              >
                {status === 'all' ? '전체' :
                 status === 'completed' ? '완료' :
                 status === 'pending' ? '대기' :
                 status === 'failed' ? '실패' : '환불'}
                ({status === 'all' ? payments.length : payments.filter(p => p.status === status).length})
              </button>
            ))}
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-architect-gray-50 border-b border-architect-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">사용자</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">수업</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">결제 금액</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">결제 방법</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">상태</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">일시</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-architect-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-architect-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{payment.user_name}</div>
                        <div className="text-sm text-architect-gray-500">{payment.user_email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-sm">{payment.course_title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold">₩{payment.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{payment.payment_method}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'completed' ? 'bg-green-100 text-green-700' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        payment.status === 'failed' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {payment.status === 'completed' ? '완료' :
                         payment.status === 'pending' ? '대기' :
                         payment.status === 'failed' ? '실패' : '환불'}
                      </span>
                      {payment.refund_reason && (
                        <div className="text-xs text-architect-gray-500 mt-1">
                          사유: {payment.refund_reason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>{payment.created_date}</div>
                        {payment.refund_date && (
                          <div className="text-architect-gray-500">환불: {payment.refund_date}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-architect-primary hover:text-architect-secondary text-sm">
                          상세보기
                        </button>
                        {payment.status === 'completed' && (
                          <button
                            onClick={() => handleRefund(payment)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            환불
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-architect-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">결제 내역이 없습니다</h3>
            <p className="text-architect-gray-600">선택한 조건에 해당하는 결제가 없습니다.</p>
          </div>
        )}
      </div>

      {/* Refund Modal */}
      {showRefundModal && refundPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">환불 처리</h3>
            <div className="mb-4">
              <p className="text-sm text-architect-gray-600 mb-2">결제 정보</p>
              <div className="bg-architect-gray-100 p-3 rounded">
                <div className="font-medium">{refundPayment.user_name}</div>
                <div className="text-sm text-architect-gray-600">{refundPayment.course_title}</div>
                <div className="font-bold">₩{refundPayment.amount.toLocaleString()}</div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-architect-gray-600 mb-2">환불 사유</label>
              <textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                placeholder="환불 사유를 입력하세요"
                rows={3}
                className="w-full px-3 py-2 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowRefundModal(false);
                  setRefundReason('');
                }}
                className="flex-1 px-4 py-2 bg-architect-gray-200 text-architect-gray-700 rounded-lg hover:bg-architect-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmRefund}
                disabled={!refundReason.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                환불 처리
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}