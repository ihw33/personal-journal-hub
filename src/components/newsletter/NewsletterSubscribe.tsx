'use client';

import { useState } from 'react';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreePrivacy) {
      setMessage('개인정보 처리방침에 동의해주세요.');
      setIsSuccess(false);
      return;
    }
    
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('구독 신청이 완료되었습니다! 이메일을 확인하여 구독을 완료해주세요.');
        setIsSuccess(true);
        setEmail('');
        setName('');
        setAgreePrivacy(false);
      } else {
        setMessage(data.error || '구독 중 오류가 발생했습니다.');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('네트워크 오류가 발생했습니다.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">📧 뉴스레터 구독</h3>
      <p className="text-gray-600 mb-6">
        새로운 저널과 독점 콘텐츠를 이메일로 받아보세요.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="이름 (선택사항)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="agreePrivacy"
            checked={agreePrivacy}
            onChange={(e) => setAgreePrivacy(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="agreePrivacy" className="text-sm text-gray-600">
            <a 
              href="/privacy" 
              target="_blank" 
              className="text-blue-600 hover:text-blue-700 underline"
            >
              개인정보 처리방침
            </a>에 동의합니다. (필수)
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !agreePrivacy}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors shadow-lg hover:shadow-xl"
        >
          {isLoading ? '구독 중...' : '📬 구독하기'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-md ${
          isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}