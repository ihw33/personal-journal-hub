'use client';

import { useState } from 'react';
import { User, Mail, Shield, Award, Camera, Save } from 'lucide-react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const userBadges = [
  { id: 1, name: '얼리 어답터', description: '베타 테스터로 참여', icon: '🚀', earned: true },
  { id: 2, name: '첫 수업 완료', description: '첫 번째 수업을 완료했습니다', icon: '🎓', earned: true },
  { id: 3, name: '연속 학습 7일', description: '7일 연속으로 학습했습니다', icon: '🔥', earned: false },
  { id: 4, name: '사고력 마스터', description: '모든 단계를 마스터했습니다', icon: '👑', earned: false }
];

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.name || user?.email?.split('@')[0] || '',
    email: user?.email || '',
    bio: '안녕하세요! IWL에서 사고력을 확장하고 있습니다.',
    currentLevel: '중급',
    joinDate: '2025년 7월'
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-architect-gray-100">
        <div className="text-center">
          <User className="w-16 h-16 text-architect-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">로그인이 필요합니다</h2>
          <p className="text-architect-gray-600 mb-6">계정 정보를 확인하려면 로그인이 필요합니다</p>
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

  const handleSave = () => {
    // TODO: 실제 저장 로직 구현
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-architect-gray-100">
      {/* Header */}
      <section className="bg-white border-b border-architect-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">내 정보</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-bold">프로필 정보</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-architect-primary hover:bg-architect-primary/10 rounded-lg transition-colors"
              >
                수정
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-architect-gray-600 hover:bg-architect-gray-100 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-architect-primary text-white rounded-lg hover:bg-architect-secondary transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  저장
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-architect-primary to-architect-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              {isEditing && (
                <button className="flex items-center gap-2 text-sm text-architect-primary hover:text-architect-secondary">
                  <Camera className="w-4 h-4" />
                  사진 변경
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-sm text-architect-gray-600">이름</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary focus:border-architect-primary"
                  />
                ) : (
                  <p className="text-lg font-medium">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-architect-gray-600">이메일</label>
                <p className="text-lg flex items-center gap-2">
                  <Mail className="w-4 h-4 text-architect-gray-400" />
                  {profile.email}
                </p>
              </div>

              <div>
                <label className="text-sm text-architect-gray-600">자기소개</label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                    className="w-full mt-1 px-3 py-2 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary focus:border-architect-primary"
                  />
                ) : (
                  <p className="text-architect-gray-700">{profile.bio}</p>
                )}
              </div>

              <div className="flex gap-6 pt-4">
                <div>
                  <label className="text-sm text-architect-gray-600">학습 레벨</label>
                  <p className="font-medium text-architect-primary">{profile.currentLevel}</p>
                </div>
                <div>
                  <label className="text-sm text-architect-gray-600">가입일</label>
                  <p className="font-medium">{profile.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">획득한 배지</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userBadges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg text-center ${
                  badge.earned
                    ? 'bg-architect-primary/10 border-2 border-architect-primary/20'
                    : 'bg-architect-gray-100 border-2 border-architect-gray-200 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h3 className="font-medium text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-architect-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-architect-primary" />
            보안 설정
          </h2>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 border border-architect-gray-300 rounded-lg hover:bg-architect-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-medium">비밀번호 변경</span>
                <span className="text-architect-gray-500">→</span>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 border border-architect-gray-300 rounded-lg hover:bg-architect-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-medium">2단계 인증 설정</span>
                <span className="text-architect-gray-500">→</span>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold mb-6">바로가기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/account/payment"
              className="px-4 py-3 border border-architect-gray-300 rounded-lg hover:bg-architect-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">결제 내역</span>
                <span className="text-architect-gray-500">→</span>
              </div>
            </Link>
            <Link
              href="/learn"
              className="px-4 py-3 border border-architect-gray-300 rounded-lg hover:bg-architect-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">내 수업</span>
                <span className="text-architect-gray-500">→</span>
              </div>
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-3 border border-architect-gray-300 rounded-lg hover:bg-architect-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">대시보드</span>
                <span className="text-architect-gray-500">→</span>
              </div>
            </Link>
            <Link
              href="/community"
              className="px-4 py-3 border border-architect-gray-300 rounded-lg hover:bg-architect-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">커뮤니티</span>
                <span className="text-architect-gray-500">→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}