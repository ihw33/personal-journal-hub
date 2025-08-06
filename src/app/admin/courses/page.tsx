'use client';

import { useState } from 'react';
import { BookOpen, Plus, Edit, Trash2, Users, Eye, Settings } from 'lucide-react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  subtitle: string;
  level: 'elementary' | 'middle' | 'adult';
  price: number;
  duration: number; // in sessions
  enrolled_count: number;
  status: 'draft' | 'published' | 'archived';
  created_date: string;
  instructor: string;
  thumbnail: string;
  completion_rate: number;
}

const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: '초등 3학년 ~ 중등 1학년',
    subtitle: '놀이를 통해 자연스럽게 사고력을 기르는 과정',
    level: 'elementary',
    price: 19900,
    duration: 10,
    enrolled_count: 234,
    status: 'published',
    created_date: '2025.06.15',
    instructor: 'Klaus Kim',
    thumbnail: '🎯',
    completion_rate: 78
  },
  {
    id: 'course-2',
    title: '중등 2학년 ~ 고등 3학년',
    subtitle: '실생활 문제를 체계적으로 해결하는 사고 훈련',
    level: 'middle',
    price: 29900,
    duration: 12,
    enrolled_count: 189,
    status: 'published',
    created_date: '2025.06.20',
    instructor: 'Amelia Chen',
    thumbnail: '🚀',
    completion_rate: 85
  },
  {
    id: 'course-3',
    title: '대학생 ~ 직장인',
    subtitle: '전문적 사고 기술을 활용한 고급 문제 해결',
    level: 'adult',
    price: 39900,
    duration: 16,
    enrolled_count: 156,
    status: 'published',
    created_date: '2025.06.25',
    instructor: 'Thomas Lee',
    thumbnail: '💡',
    completion_rate: 72
  },
  {
    id: 'course-4',
    title: '비판적 사고력 마스터',
    subtitle: '논리적 분석과 비판적 평가 능력 향상',
    level: 'adult',
    price: 49900,
    duration: 20,
    enrolled_count: 0,
    status: 'draft',
    created_date: '2025.07.30',
    instructor: 'Klaus Kim',
    thumbnail: '🧠',
    completion_rate: 0
  }
];

export default function AdminCoursesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'elementary' | 'middle' | 'adult'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  if (!user || user.user_metadata?.user_type !== 'admin') {
    router.push('/dashboard');
    return null;
  }

  const filteredCourses = courses.filter(course => {
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    return matchesLevel && matchesStatus;
  });

  const handleStatusChange = (courseId: string, newStatus: Course['status']) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, status: newStatus }
        : course
    ));
  };

  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (courseToDelete) {
      setCourses(courses.filter(course => course.id !== courseToDelete.id));
      setShowDeleteModal(false);
      setCourseToDelete(null);
    }
  };

  const totalRevenue = courses
    .filter(c => c.status === 'published')
    .reduce((sum, c) => sum + (c.price * c.enrolled_count), 0);

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
              <h1 className="text-3xl font-bold">수업 관리</h1>
            </div>
            <button className="px-4 py-2 bg-architect-primary text-white rounded-lg hover:bg-architect-secondary transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              새 수업 만들기
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold">{courses.length}</div>
            <div className="text-sm text-architect-gray-600">전체 수업</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{courses.filter(c => c.status === 'published').length}</div>
            <div className="text-sm text-architect-gray-600">게시된 수업</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{courses.reduce((sum, c) => sum + c.enrolled_count, 0)}</div>
            <div className="text-sm text-architect-gray-600">총 수강생</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">₩{(totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-architect-gray-600">총 매출</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex gap-4">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as any)}
              className="px-4 py-2 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary"
            >
              <option value="all">모든 레벨</option>
              <option value="elementary">초등 과정</option>
              <option value="middle">중고등 과정</option>
              <option value="adult">성인 과정</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-4 py-2 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary"
            >
              <option value="all">모든 상태</option>
              <option value="draft">초안</option>
              <option value="published">게시됨</option>
              <option value="archived">보관됨</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{course.thumbnail}</div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === 'published' ? 'bg-green-100 text-green-700' :
                      course.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {course.status === 'published' ? '게시됨' :
                       course.status === 'draft' ? '초안' : '보관됨'}
                    </span>
                    <select
                      value={course.status}
                      onChange={(e) => handleStatusChange(course.id, e.target.value as Course['status'])}
                      className="text-xs px-1 py-1 border rounded"
                    >
                      <option value="draft">초안</option>
                      <option value="published">게시됨</option>
                      <option value="archived">보관됨</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                <p className="text-sm text-architect-gray-600 mb-4">{course.subtitle}</p>

                <div className="flex items-center justify-between text-sm text-architect-gray-600 mb-4">
                  <span>강사: {course.instructor}</span>
                  <span>{course.duration}세션</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="font-bold text-lg">₩{course.price.toLocaleString()}</div>
                  <div className="text-sm text-architect-gray-600">
                    수강생: {course.enrolled_count}명
                  </div>
                </div>

                {course.enrolled_count > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>완료율</span>
                      <span>{course.completion_rate}%</span>
                    </div>
                    <div className="w-full bg-architect-gray-200 rounded-full h-2">
                      <div
                        className="bg-architect-primary h-2 rounded-full transition-all"
                        style={{ width: `${course.completion_rate}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link
                    href={`/courses/${course.id}`}
                    className="flex-1 px-3 py-2 bg-architect-gray-100 text-architect-gray-700 rounded-lg hover:bg-architect-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    미리보기
                  </Link>
                  <button className="px-3 py-2 bg-architect-primary text-white rounded-lg hover:bg-architect-secondary transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-architect-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">수업이 없습니다</h3>
            <p className="text-architect-gray-600">새로운 수업을 만들어보세요.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && courseToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">수업 삭제</h3>
            <p className="text-architect-gray-700 mb-6">
              '<strong>{courseToDelete.title}</strong>' 수업을 정말 삭제하시겠습니까?
              <br />
              <span className="text-red-600 text-sm">이 작업은 되돌릴 수 없습니다.</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-architect-gray-200 text-architect-gray-700 rounded-lg hover:bg-architect-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}