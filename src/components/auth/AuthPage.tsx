'use client';

import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

export function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-6 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로 가기
          </Button>
          
          <Card className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {activeTab === 'login' ? '로그인' : '회원가입'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Idea Work Lab에 오신 것을 환영합니다
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 px-4 text-center ${
                    activeTab === 'login'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  로그인
                </button>
                <button
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-2 px-4 text-center ${
                    activeTab === 'signup'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  회원가입
                </button>
              </div>

              <div className="mt-6">
                {activeTab === 'login' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이메일
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="이메일을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        비밀번호
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="비밀번호를 입력하세요"
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      로그인
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이름
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="이름을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이메일
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="이메일을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        비밀번호
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="비밀번호를 입력하세요"
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      회원가입
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}