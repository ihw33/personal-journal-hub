'use client';

import { useState } from 'react';
import { CreditCard, Calendar, Download, ChevronLeft, Receipt } from 'lucide-react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const paymentHistory = [
  {
    id: 1,
    date: '2025.08.01',
    courseName: '초등 3학년 ~ 중등 1학년',
    amount: 19900,
    status: 'completed',
    paymentMethod: '신용카드',
    receiptId: 'IWL-2025-0801-001'
  },
  {
    id: 2,
    date: '2025.07.15',
    courseName: '중등 2학년 ~ 고등 3학년',
    amount: 29900,
    status: 'completed',
    paymentMethod: '신용카드',
    receiptId: 'IWL-2025-0715-002'
  },
  {
    id: 3,
    date: '2025.07.01',
    courseName: '대학생 ~ 직장인',
    amount: 39900,
    status: 'refunded',
    paymentMethod: '신용카드',
    receiptId: 'IWL-2025-0701-003',
    refundDate: '2025.07.05',
    refundReason: '단순 변심'
  }
];

export default function PaymentHistoryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'refunded'>('all');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-architect-gray-100">
        <div className="text-center">
          <CreditCard className="w-16 h-16 text-architect-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">로그인이 필요합니다</h2>
          <p className="text-architect-gray-600 mb-6">결제 내역을 확인하려면 로그인이 필요합니다</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-6 py-3 bg-architect-primary text-white rounded-lg font-medium hover:bg-architect-secondary transition-colors"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  const filteredPayments = paymentHistory.filter(payment => {
    if (selectedStatus === 'all') return true;
    return payment.status === selectedStatus;
  });

  const totalAmount = filteredPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleDownloadReceipt = (receiptId: string) => {
    // TODO: 실제 영수증 다운로드 로직 구현
    console.log('Downloading receipt:', receiptId);
  };

  return (
    <div className="min-h-screen bg-architect-gray-100">
      {/* Header */}
      <section className="bg-white border-b border-architect-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Link
              href="/account"
              className="p-2 hover:bg-architect-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold">결제 내역</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <CreditCard className="w-8 h-8 text-architect-primary mb-2" />
            <div className="text-2xl font-bold">₩{totalAmount.toLocaleString()}</div>
            <div className="text-sm text-architect-gray-600">총 결제 금액</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Calendar className="w-8 h-8 text-architect-accent mb-2" />
            <div className="text-2xl font-bold">{filteredPayments.length}건</div>
            <div className="text-sm text-architect-gray-600">결제 건수</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Receipt className="w-8 h-8 text-architect-ai-primary mb-2" />
            <div className="text-2xl font-bold">{selectedYear}년</div>
            <div className="text-sm text-architect-gray-600">조회 기간</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary focus:border-architect-primary"
            >
              <option value="2025">2025년</option>
              <option value="2024">2024년</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedStatus === 'all'
                    ? 'bg-architect-primary text-white'
                    : 'bg-architect-gray-100 text-architect-gray-700 hover:bg-architect-gray-200'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedStatus('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedStatus === 'completed'
                    ? 'bg-architect-primary text-white'
                    : 'bg-architect-gray-100 text-architect-gray-700 hover:bg-architect-gray-200'
                }`}
              >
                결제 완료
              </button>
              <button
                onClick={() => setSelectedStatus('refunded')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedStatus === 'refunded'
                    ? 'bg-architect-primary text-white'
                    : 'bg-architect-gray-100 text-architect-gray-700 hover:bg-architect-gray-200'
                }`}
              >
                환불
              </button>
            </div>
          </div>
        </div>

        {/* Payment List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-architect-gray-50 border-b border-architect-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">결제일</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">수업명</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">결제 금액</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">상태</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-architect-gray-700">영수증</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-architect-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-architect-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{payment.date}</div>
                        {payment.refundDate && (
                          <div className="text-sm text-architect-gray-500">
                            환불일: {payment.refundDate}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{payment.courseName}</div>
                      <div className="text-sm text-architect-gray-500">{payment.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">₩{payment.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        payment.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {payment.status === 'completed' ? '결제 완료' : '환불'}
                      </span>
                      {payment.refundReason && (
                        <div className="text-xs text-architect-gray-500 mt-1">
                          사유: {payment.refundReason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDownloadReceipt(payment.receiptId)}
                        className="flex items-center gap-2 text-architect-primary hover:text-architect-secondary transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm">다운로드</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <Receipt className="w-16 h-16 text-architect-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">결제 내역이 없습니다</h3>
              <p className="text-architect-gray-600">선택한 조건에 해당하는 결제 내역이 없습니다.</p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-architect-gray-100 p-6 rounded-lg">
          <h3 className="font-bold mb-3">안내사항</h3>
          <ul className="space-y-2 text-sm text-architect-gray-700">
            <li>• 영수증은 결제일로부터 5년간 다운로드 가능합니다.</li>
            <li>• 환불 관련 문의는 고객센터(support@ideaworklab.com)로 연락주세요.</li>
            <li>• 결제 수단 변경은 다음 결제부터 적용됩니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}