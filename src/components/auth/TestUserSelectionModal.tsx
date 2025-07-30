
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User as UserIcon, UserCheck, UserPlus, GraduationCap, Briefcase, Crown, MinusCircle } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  user_type: 'guest' | 'member' | 'instructor' | 'admin' | 'demo' | 'enrolled';
  subscription_status?: 'active' | 'inactive' | 'trial';
  personalizationData?: any;
}

interface TestUserSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: User | null) => void;
}

export function TestUserSelectionModal({ isOpen, onClose, onSelectUser }: TestUserSelectionModalProps) {
  const testUsers: User[] = [
    {
      id: 'guest',
      email: 'guest@example.com',
      name: '비로그인 사용자',
      user_type: 'guest',
    },
    {
      id: 'demo',
      email: 'demo@example.com',
      name: '데모 사용자',
      user_type: 'demo',
      subscription_status: 'trial',
    },
    {
      id: 'member',
      email: 'member@example.com',
      name: '일반 회원',
      user_type: 'member',
      subscription_status: 'active',
    },
    {
      id: 'enrolled',
      email: 'enrolled@example.com',
      name: '강의 수강생',
      user_type: 'member',
      subscription_status: 'active',
      personalizationData: { enrolledCourses: ['jeju-8-week'] },
    },
    {
      id: 'instructor',
      email: 'instructor@example.com',
      name: '강사',
      user_type: 'instructor',
      subscription_status: 'active',
    },
    {
      id: 'admin',
      email: 'admin@example.com',
      name: '관리자',
      user_type: 'admin',
      subscription_status: 'active',
    },
  ];

  const handleSelect = (user: User | null) => {
    onSelectUser(user);
    onClose();
  };

  const getUserIcon = (userType: string) => {
    switch (userType) {
      case 'guest': return <UserIcon className="w-5 h-5 text-gray-500" />;
      case 'demo': return <UserPlus className="w-5 h-5 text-blue-500" />;
      case 'member': return <UserCheck className="w-5 h-5 text-green-500" />;
      case 'enrolled': return <GraduationCap className="w-5 h-5 text-purple-500" />;
      case 'instructor': return <Briefcase className="w-5 h-5 text-orange-500" />;
      case 'admin': return <Crown className="w-5 h-5 text-red-500" />;
      default: return <UserIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>테스트 사용자 선택</DialogTitle>
          <DialogDescription>
            다양한 역할의 테스트 사용자로 로그인하여 기능을 확인합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {testUsers.map((user) => (
            <Button
              key={user.id}
              variant="outline"
              className="w-full justify-start gap-3 py-6"
              onClick={() => handleSelect(user)}
            >
              {getUserIcon(user.user_type)}
              <div className="flex flex-col items-start">
                <span className="font-semibold text-base">{user.name}</span>
                <Badge variant="secondary" className="mt-1 text-xs">{user.user_type}</Badge>
              </div>
            </Button>
          ))}
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 py-6 text-gray-500"
            onClick={() => handleSelect(null)}
          >
            <MinusCircle className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span className="font-semibold text-base">로그아웃 (비로그인 상태)</span>
              <Badge variant="secondary" className="mt-1 text-xs">guest</Badge>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
