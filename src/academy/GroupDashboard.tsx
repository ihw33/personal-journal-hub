import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Clock, 
  Star,
  Video,
  FileText,
  TrendingUp
} from 'lucide-react';

interface GroupDashboardProps {
  user: any;
  onNavigate: (page: string, params?: any) => void;
  language: 'ko' | 'en';
}

const GroupDashboard: React.FC<GroupDashboardProps> = ({
  user,
  onNavigate,
  language
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const content = {
    ko: {
      title: '그룹 대시보드',
      subtitle: '팀원들과 함께하는 AI 학습 여정',
      tabs: {
        overview: '개요',
        members: '멤버',
        sessions: '세션',
        reviews: '리뷰'
      },
      groupName: 'AI 협업 학습 그룹 #3',
      currentPhase: '현재 Phase: 창의적 사고 개발',
      nextSession: '다음 세션',
      upcomingSession: '2024년 2월 15일 오후 7시',
      progress: '그룹 진도',
      members: '멤버 (5/6)',
      recentActivity: '최근 활동',
      peerReview: '피어 리뷰',
      startSession: '세션 시작',
      viewDetails: '자세히 보기',
      joinDiscussion: '토론 참여'
    },
    en: {
      title: 'Group Dashboard',
      subtitle: 'AI Learning Journey with Your Team',
      tabs: {
        overview: 'Overview',
        members: 'Members',
        sessions: 'Sessions',
        reviews: 'Reviews'
      },
      groupName: 'AI Collaboration Learning Group #3',
      currentPhase: 'Current Phase: Creative Thinking Development',
      nextSession: 'Next Session',
      upcomingSession: 'Feb 15, 2024 at 7:00 PM',
      progress: 'Group Progress',
      members: 'Members (5/6)',
      recentActivity: 'Recent Activity',
      peerReview: 'Peer Review',
      startSession: 'Start Session',
      viewDetails: 'View Details',
      joinDiscussion: 'Join Discussion'
    }
  };

  const t = content[language];

  // Mock data
  const groupMembers = [
    { id: 1, name: '김민수', avatar: '', initials: '김민', status: 'online', progress: 85 },
    { id: 2, name: '이지은', avatar: '', initials: '이지', status: 'online', progress: 92 },
    { id: 3, name: '박성호', avatar: '', initials: '박성', status: 'away', progress: 78 },
    { id: 4, name: '최유진', avatar: '', initials: '최유', status: 'offline', progress: 88 },
    { id: 5, name: '정현우', avatar: '', initials: '정현', status: 'online', progress: 95 }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Phase 2: 분석적 사고 실습',
      date: '2024-02-15',
      time: '19:00',
      type: 'group',
      participants: 5
    },
    {
      id: 2,
      title: '피어 리뷰 세션',
      date: '2024-02-17',
      time: '18:00',
      type: 'review',
      participants: 4
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: '이지은',
      action: 'Phase 1 과제를 완료했습니다',
      time: '2시간 전',
      type: 'completion'
    },
    {
      id: 2,
      user: '김민수',
      action: '그룹 토론에서 새로운 아이디어를 공유했습니다',
      time: '4시간 전',
      type: 'discussion'
    },
    {
      id: 3,
      user: '정현우',
      action: '피어 리뷰를 작성했습니다',
      time: '6시간 전',
      type: 'review'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-iwl-purple-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-iwl-gradient">
                {t.title}
              </h1>
              <p className="text-gray-600 mt-1">{t.subtitle}</p>
            </div>
            <Button 
              onClick={() => onNavigate('group-dashboard')}
              className="bg-iwl-gradient hover:opacity-90 text-white"
            >
              <Video className="w-4 h-4 mr-2" />
              {t.startSession}
            </Button>
          </div>

          {/* Group Info */}
          <Card className="bg-gradient-to-r from-iwl-purple-100 to-iwl-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-iwl-gradient mb-2">
                    {t.groupName}
                  </h2>
                  <p className="text-gray-700">{t.currentPhase}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">{t.nextSession}</div>
                  <div className="font-semibold text-iwl-purple">{t.upcomingSession}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t.tabs.overview}</TabsTrigger>
            <TabsTrigger value="members">{t.tabs.members}</TabsTrigger>
            <TabsTrigger value="sessions">{t.tabs.sessions}</TabsTrigger>
            <TabsTrigger value="reviews">{t.tabs.reviews}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Group Progress */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-iwl-purple" />
                    {t.progress}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Phase 1: 기초 사고법</span>
                        <span className="text-green-600">완료</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Phase 2: 창의적 사고</span>
                        <span className="text-iwl-purple">진행 중 (65%)</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Phase 3: 분석적 사고</span>
                        <span className="text-gray-400">예정</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Group Members Quick View */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-iwl-blue" />
                    {t.members}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {groupMembers.slice(0, 4).map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs bg-iwl-purple-100 text-iwl-purple">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{member.name}</span>
                            <div className={`w-2 h-2 rounded-full ${
                              member.status === 'online' ? 'bg-green-500' : 
                              member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`} />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => setActiveTab('members')}
                    >
                      {t.viewDetails}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-iwl-purple" />
                  {t.recentActivity}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'completion' ? 'bg-green-500' :
                        activity.type === 'discussion' ? 'bg-iwl-blue' : 'bg-iwl-purple'
                      }`} />
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>님이 {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-iwl-purple-100 text-iwl-purple">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            member.status === 'online' ? 'bg-green-100 text-green-800' :
                            member.status === 'away' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>진도</span>
                        <span>{member.progress}%</span>
                      </div>
                      <Progress value={member.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-iwl-purple-100 rounded-full">
                          {session.type === 'group' ? (
                            <Users className="w-6 h-6 text-iwl-purple" />
                          ) : (
                            <FileText className="w-6 h-6 text-iwl-blue" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{session.title}</h3>
                          <p className="text-gray-600">
                            {session.date} {session.time} • {session.participants}명 참여
                          </p>
                        </div>
                      </div>
                      <Button className="bg-iwl-gradient hover:opacity-90 text-white">
                        {t.joinDiscussion}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-iwl-purple" />
                  {t.peerReview}
                </CardTitle>
                <CardDescription>
                  동료들의 작업을 리뷰하고 피드백을 주고받으세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">
                    아직 리뷰할 과제가 없습니다
                  </p>
                  <Button 
                    onClick={() => onNavigate('peer-review')}
                    className="bg-iwl-gradient hover:opacity-90 text-white"
                  >
                    피어 리뷰 시작하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export { GroupDashboard };