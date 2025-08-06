import { Metadata } from 'next';
import { BookOpen, Target, Users, Award, Lightbulb, Rocket, Heart, Brain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IWL 소개 - IdeaWorkLab',
  description: 'IdeaWorkLab의 교육 철학, 비전, 그리고 글로벌 멘토 팀을 소개합니다.',
};

const teamMembers = [
  {
    name: '클라우스 킴 (Klaus Kim)',
    role: 'AI 교육 전문가',
    location: 'Boston, USA',
    university: 'MIT',
    specialty: 'Machine Learning',
    description: 'MIT 인공지능 연구소 출신으로, AI와 인간의 학습 과정을 연구하여 최적의 교육 시스템을 개발했습니다.',
    avatar: 'KK'
  },
  {
    name: '아멜리아 챈 (Amelia Chen)',
    role: '창의성 연구자',
    location: 'San Francisco, USA',
    university: 'Stanford',
    specialty: 'Design Thinking',
    description: 'Stanford 디자인스쿨에서 혁신적 창의성 개발 방법론을 연구하고, 실리콘밸리 기업들과 협업해왔습니다.',
    avatar: 'AC'
  },
  {
    name: '토마스 리 (Thomas Lee)',
    role: '교육 혁신 전문가',
    location: 'Seoul, Korea',
    university: '서울대',
    specialty: '학습과학',
    description: 'Harvard 교육대학원에서 미래 교육 시스템을 연구하며, 개인별 학습 최적화 방법론을 개발했습니다.',
    avatar: 'TL'
  }
];

const values = [
  {
    icon: Brain,
    title: '체계적인 사고력 확장',
    description: '단순한 지식 전달이 아닌, 사고력 자체를 확장시키는 체계적인 교육을 제공합니다.'
  },
  {
    icon: Heart,
    title: '개인 맞춤형 성장',
    description: '각 개인의 고유한 사고 패턴과 성장 속도에 맞춘 1:1 맞춤형 교육을 지향합니다.'
  },
  {
    icon: Rocket,
    title: 'AI와 인간의 협업',
    description: 'AI 멘토 아키와 함께 인간의 창의성과 기술의 효율성을 결합한 미래형 교육을 실현합니다.'
  },
  {
    icon: Users,
    title: '글로벌 커뮤니티',
    description: '전 세계 최고의 전문가들과 함께 성장하는 글로벌 학습 커뮤니티를 구축합니다.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-100 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-architect-primary to-architect-secondary bg-clip-text text-transparent">
            체계적인 학습 플랫폼,<br />IdeaWorkLab
          </h1>
          <p className="text-xl text-architect-gray-700 mb-8">
            단순한 업무 도구가 아닙니다. AI와 함께하는 1:1 실전 수업과 전문가들의 깊이 있는 연구를 통해 진정한 사고력을 확장합니다.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-architect-primary/10 to-architect-secondary/10 p-8 rounded-2xl">
              <Target className="w-12 h-12 text-architect-primary mb-4" />
              <h2 className="text-3xl font-bold mb-4">우리의 미션</h2>
              <p className="text-architect-gray-700">
                모든 사람이 자신만의 독특한 사고력을 발견하고 확장할 수 있도록 돕는 것. 
                AI와 인간 전문가의 협업을 통해 개인별 맞춤 교육을 제공하여, 
                누구나 자신의 잠재력을 최대한 발휘할 수 있는 세상을 만들어갑니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-architect-accent/10 to-architect-ai-primary/10 p-8 rounded-2xl">
              <Lightbulb className="w-12 h-12 text-architect-accent mb-4" />
              <h2 className="text-3xl font-bold mb-4">우리의 비전</h2>
              <p className="text-architect-gray-700">
                2030년까지 전 세계 100만 명의 사고력을 혁신적으로 향상시키는 
                글로벌 No.1 AI 기반 교육 플랫폼이 되는 것. 개인의 성장이 
                조직과 사회의 혁신으로 이어지는 선순환 생태계를 구축합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">핵심 가치</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="w-10 h-10 text-architect-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-architect-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8-Step Model */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">8단계 사고 확장 모델</h2>
          <p className="text-center text-architect-gray-700 mb-12 max-w-2xl mx-auto">
            체계적인 성장 시스템으로 사고력을 단계별로 발전시키세요
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: 1, title: '문제 현상', desc: '상황을 정확히 파악하고 문제를 인식합니다' },
              { step: 2, title: '현상 수집', desc: '관련 정보와 데이터를 체계적으로 수집합니다' },
              { step: 3, title: '분석 및 종합', desc: '수집한 정보를 분석하고 패턴을 찾습니다' },
              { step: 4, title: '통찰적 영감', desc: '새로운 관점과 창의적 아이디어를 발견합니다' },
              { step: 5, title: '비판적 평가', desc: '아이디어를 객관적으로 검증하고 개선합니다' },
              { step: 6, title: '의사 결정', desc: '최적의 해결책을 선택하고 실행 계획을 수립합니다' },
              { step: 7, title: '실행 관리', desc: '계획을 실행하고 진행 상황을 모니터링합니다' },
              { step: 8, title: '성찰 및 적용', desc: '결과를 평가하고 학습한 내용을 내재화합니다' }
            ].map((item) => (
              <div key={item.step} className="relative group">
                <div className="bg-gradient-to-br from-architect-primary to-architect-secondary p-6 rounded-xl text-white hover:scale-105 transition-transform cursor-pointer">
                  <div className="text-3xl font-bold mb-2">{item.step}</div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-xs opacity-90">{item.desc}</p>
                </div>
                {item.step < 8 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <div className="w-4 h-0.5 bg-architect-gray-400"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">글로벌 멘토 팀</h2>
          <p className="text-center text-architect-gray-700 mb-12 max-w-2xl mx-auto">
            세계 최고의 교육 전문가들이 여러분의 성장을 함께합니다
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-architect-primary to-architect-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                  <p className="text-architect-primary text-center mb-2">{member.role}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-architect-gray-600 mb-4">
                    <span>{member.university}</span>
                    <span>•</span>
                    <span>{member.location}</span>
                  </div>
                  <p className="text-architect-gray-700 text-sm text-center">{member.description}</p>
                  <div className="mt-4 text-center">
                    <span className="inline-block px-3 py-1 bg-architect-primary/10 text-architect-primary rounded-full text-xs font-medium">
                      {member.specialty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-architect-primary to-architect-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">함께 성장할 준비가 되셨나요?</h2>
          <p className="text-xl mb-8 opacity-90">
            지금 시작하여 당신의 사고력을 다음 단계로 확장해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/signup" className="px-8 py-4 bg-white text-architect-primary rounded-lg font-semibold hover:bg-architect-gray-100 transition-colors">
              베타 테스터 신청하기
            </a>
            <a href="/courses" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition-colors">
              수업 둘러보기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}