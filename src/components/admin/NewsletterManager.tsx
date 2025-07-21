'use client';

import { useState, useEffect } from 'react';

interface Subscription {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  is_confirmed: boolean;
  subscribed_at: string;
  confirmed_at?: string;
}

interface Campaign {
  id: string;
  subject: string;
  content: string;
  sent_at: string;
  recipient_count: number;
  success_count: number;
  failure_count: number;
}

export default function NewsletterManager() {
  const [activeTab, setActiveTab] = useState<'send' | 'subscribers' | 'history'>('send');
  const [subscribers, setSubscribers] = useState<Subscription[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [emailForm, setEmailForm] = useState({
    subject: '',
    content: '',
  });

  useEffect(() => {
    if (activeTab === 'subscribers') {
      fetchSubscribers();
    } else if (activeTab === 'history') {
      fetchCampaigns();
    }
  }, [activeTab]);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/newsletter/subscribers');
      const data = await response.json();
      if (response.ok) {
        setSubscribers(data.subscribers);
      }
    } catch (error) {
      console.error('구독자 목록 조회 실패:', error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/admin/newsletter/campaigns');
      const data = await response.json();
      if (response.ok) {
        setCampaigns(data.campaigns);
      }
    } catch (error) {
      console.error('캠페인 목록 조회 실패:', error);
    }
  };

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailForm),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`뉴스레터가 발송되었습니다. (성공: ${data.stats.success}, 실패: ${data.stats.failure})`);
        setEmailForm({ subject: '', content: '' });
      } else {
        setMessage(data.error || '발송 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setMessage('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">📧 뉴스레터 관리</h2>

      {/* 탭 네비게이션 */}
      <div className="flex space-x-1 mb-6">
        {[
          { key: 'send', label: '발송하기' },
          { key: 'subscribers', label: '구독자 관리' },
          { key: 'history', label: '발송 기록' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 뉴스레터 발송 */}
      {activeTab === 'send' && (
        <div>
          <form onSubmit={handleSendNewsletter} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="뉴스레터 제목을 입력하세요"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내용
              </label>
              <textarea
                value={emailForm.content}
                onChange={(e) => setEmailForm({ ...emailForm, content: e.target.value })}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="뉴스레터 내용을 입력하세요"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '발송 중...' : '뉴스레터 발송'}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-md ${
              message.includes('발송되었습니다') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </div>
      )}

      {/* 구독자 관리 */}
      {activeTab === 'subscribers' && (
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              총 {subscribers.filter(s => s.is_active && s.is_confirmed).length}명의 확인된 구독자가 있습니다.
              ({subscribers.filter(s => !s.is_confirmed).length}명 확인 대기중)
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이메일
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이름
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    구독일
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {subscriber.email}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {subscriber.name || '-'}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subscriber.is_confirmed && subscriber.is_active
                          ? 'bg-green-100 text-green-800' 
                          : subscriber.is_confirmed
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {subscriber.is_confirmed && subscriber.is_active ? '활성' : 
                         subscriber.is_confirmed ? '비활성' : '확인 대기'}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {new Date(subscriber.subscribed_at).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 발송 기록 */}
      {activeTab === 'history' && (
        <div>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{campaign.subject}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(campaign.sent_at).toLocaleString('ko-KR')}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {campaign.content.slice(0, 100)}...
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-blue-600">
                    총 {campaign.recipient_count}명
                  </span>
                  <span className="text-green-600">
                    성공 {campaign.success_count}명
                  </span>
                  {campaign.failure_count > 0 && (
                    <span className="text-red-600">
                      실패 {campaign.failure_count}명
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}