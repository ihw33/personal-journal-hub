import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-architect-gray-50 to-white">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-6xl font-black text-architect-gray-900 mb-4">404</h1>
          <h2 className="text-h3 font-bold text-architect-gray-900 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-body text-architect-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full">
              홈으로 돌아가기
            </Button>
          </Link>
          
          <Link href="/courses">
            <Button variant="outline" className="w-full">
              코스 둘러보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}