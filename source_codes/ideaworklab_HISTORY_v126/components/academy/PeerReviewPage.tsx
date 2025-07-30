import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { 
  Star, 
  FileText, 
  MessageCircle, 
  ThumbsUp, 
  Eye,
  CheckCircle,
  Clock,
  Send
} from 'lucide-react';

interface PeerReviewPageProps {
  user: any;
  onNavigate: (page: string, params?: any) => void;
  language: 'ko' | 'en';
}

const PeerReviewPage: React.FC<PeerReviewPageProps> = ({
  user,
  onNavigate,
  language
}) => {
  const [activeTab, setActiveTab] = useState('to-review');
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);
  const [reviewData, setReviewData] = useState({
    rating: '',
    strengths: '',
    improvements: '',
    overall: ''
  });

  const content = {
    ko: {
      title: '피어 리뷰',
      subtitle: '동료들의 작업을 검토하고 건설적인 피드백을 제공하세요',
      tabs: {
        toReview: '리뷰할 과제',
        myReviews: '내가 한 리뷰',
        received: '받은 리뷰'
      },
      reviewForm: {
        rating: '전체적인 평가',
        ratingOptions: [
          { value: '5', label: '매우 우수' },
          { value: '4', label: '우수' },
          { value: '3', label: '보통' },
          { value: '2', label: '개선 필요' },
          { value: '1', label: '많은 개선 필요' }
        ],
        strengths: '강점과 잘된 부분',
        strengthsPlaceholder: '이 작업에서 특히 잘된 부분이나 인상 깊었던 점을 구체적으로 작성해주세요.',
        improvements: '개선 제안',
        improvementsPlaceholder: '더 나아질 수 있는 부분이나 구체적인 개선 방안을 제안해주세요.',
        overall: '전반적인 의견',
        overallPlaceholder: '전반적인 소감이나 추가 의견을 자유롭게 작성해주세요.',
        submit: '리뷰 제출',
        cancel: '취소'
      },
      status: {
        pending: '대기 중',
        inProgress: '진행 중',
        completed: '완료',
        overdue: '기한 초과'
      },
      noData: {
        toReview: '현재 리뷰할 과제가 없습니다',
        myReviews: '아직 작성한 리뷰가 없습니다',
        received: '아직 받은 리뷰가 없습니다'
      }
    },
    en: {
      title: 'Peer Review',
      subtitle: 'Review your peers\' work and provide constructive feedback',
      tabs: {
        toReview: 'To Review',
        myReviews: 'My Reviews',
        received: 'Received Reviews'
      },
      reviewForm: {
        rating: 'Overall Rating',
        ratingOptions: [
          { value: '5', label: 'Excellent' },
          { value: '4', label: 'Good' },
          { value: '3', label: 'Average' },
          { value: '2', label: 'Needs Improvement' },
          { value: '1', label: 'Significant Improvement Needed' }
        ],
        strengths: 'Strengths and Well-Done Aspects',
        strengthsPlaceholder: 'Please describe specific strengths or impressive aspects of this work.',
        improvements: 'Improvement Suggestions',
        improvementsPlaceholder: 'Please suggest specific areas for improvement or actionable recommendations.',
        overall: 'Overall Comments',
        overallPlaceholder: 'Share your overall thoughts or additional comments freely.',
        submit: 'Submit Review',
        cancel: 'Cancel'
      },
      status: {
        pending: 'Pending',
        inProgress: 'In Progress',
        completed: 'Completed',
        overdue: 'Overdue'
      },
      noData: {
        toReview: 'No assignments to review at the moment',
        myReviews: 'No reviews written yet',
        received: 'No reviews received yet'
      }
    }
  };

  const t = content[language];

  // Mock data
  const submissionsToReview = [
    {
      id: 1,
      author: '김민수',
      authorInitials: '김민',
      title: 'Phase 1: 창의적 아이디어 도출 과제',
      submittedAt: '2024-02-10',
      dueDate: '2024-02-17',
      status: 'pending',
      content: '제주도 여행을 통한 창의적 사고 개발 방안에 대해 분석하고, AI와의 협업을 통해 새로운 관점을 도출하는 과제입니다.',
      phase: 'Phase 1'
    },
    {
      id: 2,
      author: '이지은',
      authorInitials: '이지',
      title: 'Phase 2: 분석적 사고 실습',
      submittedAt: '2024-02-12',
      dueDate: '2024-02-19',
      status: 'inProgress',
      content: '복잡한 문제를 체계적으로 분석하고 해결책을 도출하는 과정을 AI와 함께 실습한 결과를 정리했습니다.',
      phase: 'Phase 2'
    }
  ];

  const myReviews = [
    {
      id: 1,
      reviewee: '박성호',
      title: 'Phase 1: 기초 사고법 이해',
      reviewedAt: '2024-02-08',
      rating: 4,
      status: 'completed'
    }
  ];

  const receivedReviews = [
    {
      id: 1,
      reviewer: '최유진',
      title: '내 Phase 1 과제',
      reviewedAt: '2024-02-09',
      rating: 5,
      strengths: '창의적인 접��� 방식이 돋보였고, AI와의 협업 과정이 체계적으로 잘 정리되어 있습니다.',
      improvements: '결론 부분에서 실제 적용 방안을 더 구체적으로 제시하면 좋겠습니다.',
      overall: '전반적으로 매우 우수한 과제였습니다. 특히 새로운 관점 도출 부분이 인상적이었어요.'
    }
  ];

  const handleSubmitReview = () => {
    // Handle review submission
    console.log('Review submitted:', reviewData);
    setSelectedSubmission(null);
    setReviewData({
      rating: '',
      strengths: '',
      improvements: '',
      overall: ''
    });
  };

  const renderReviewForm = (submission: any) => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-iwl-purple" />
          리뷰 작성: {submission.title}
        </CardTitle>
        <CardDescription>
          {submission.author}님의 과제에 대한 피드백을 작성해주세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating */}
        <div>
          <Label className="text-base font-medium mb-3 block">
            {t.reviewForm.rating}
          </Label>
          <RadioGroup 
            value={reviewData.rating} 
            onValueChange={(value) => setReviewData({...reviewData, rating: value})}
          >
            {t.reviewForm.ratingOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`rating-${option.value}`} />
                <Label htmlFor={`rating-${option.value}`} className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        className={`w-4 h-4 ${
                          star <= parseInt(option.value) 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Strengths */}
        <div>
          <Label htmlFor="strengths" className="text-base font-medium mb-2 block">
            {t.reviewForm.strengths}
          </Label>
          <Textarea
            id="strengths"
            placeholder={t.reviewForm.strengthsPlaceholder}
            value={reviewData.strengths}
            onChange={(e) => setReviewData({...reviewData, strengths: e.target.value})}
            className="min-h-[100px]"
          />
        </div>

        {/* Improvements */}
        <div>
          <Label htmlFor="improvements" className="text-base font-medium mb-2 block">
            {t.reviewForm.improvements}
          </Label>
          <Textarea
            id="improvements"
            placeholder={t.reviewForm.improvementsPlaceholder}
            value={reviewData.improvements}
            onChange={(e) => setReviewData({...reviewData, improvements: e.target.value})}
            className="min-h-[100px]"
          />
        </div>

        {/* Overall Comments */}
        <div>
          <Label htmlFor="overall" className="text-base font-medium mb-2 block">
            {t.reviewForm.overall}
          </Label>
          <Textarea
            id="overall"
            placeholder={t.reviewForm.overallPlaceholder}
            value={reviewData.overall}
            onChange={(e) => setReviewData({...reviewData, overall: e.target.value})}
            className="min-h-[80px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleSubmitReview}
            className="bg-iwl-gradient hover:opacity-90 text-white"
            disabled={!reviewData.rating || !reviewData.strengths}
          >
            <Send className="w-4 h-4 mr-2" />
            {t.reviewForm.submit}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setSelectedSubmission(null)}
          >
            {t.reviewForm.cancel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-iwl-purple-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-iwl-gradient mb-2">
            {t.title}
          </h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="to-review">{t.tabs.toReview}</TabsTrigger>
            <TabsTrigger value="my-reviews">{t.tabs.myReviews}</TabsTrigger>
            <TabsTrigger value="received">{t.tabs.received}</TabsTrigger>
          </TabsList>

          {/* To Review Tab */}
          <TabsContent value="to-review" className="space-y-4">
            {submissionsToReview.length > 0 ? (
              submissionsToReview.map((submission) => (
                <div key={submission.id}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-iwl-purple-100 text-iwl-purple">
                              {submission.authorInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{submission.title}</h3>
                            <p className="text-gray-600">{submission.author}님의 과제</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant="secondary"
                            className={`mb-2 ${
                              submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              submission.status === 'inProgress' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            {t.status[submission.status as keyof typeof t.status]}
                          </Badge>
                          <p className="text-sm text-gray-500">
                            마감: {submission.dueDate}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{submission.content}</p>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-iwl-purple text-iwl-purple">
                          {submission.phase}
                        </Badge>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {/* View submission */}}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            과제 보기
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-iwl-gradient hover:opacity-90 text-white"
                            onClick={() => setSelectedSubmission(submission.id)}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            리뷰 작성
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Review Form */}
                  {selectedSubmission === submission.id && renderReviewForm(submission)}
                </div>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">{t.noData.toReview}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* My Reviews Tab */}
          <TabsContent value="my-reviews">
            {myReviews.length > 0 ? (
              <div className="space-y-4">
                {myReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{review.title}</h3>
                          <p className="text-gray-600">{review.reviewee}님에게 작성</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating 
                                    ? 'text-yellow-500 fill-yellow-500' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-500">{review.reviewedAt}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">{t.noData.myReviews}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Received Reviews Tab */}
          <TabsContent value="received">
            {receivedReviews.length > 0 ? (
              <div className="space-y-4">
                {receivedReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{review.title}</h3>
                          <p className="text-gray-600">{review.reviewer}님의 리뷰</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating 
                                    ? 'text-yellow-500 fill-yellow-500' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-500">{review.reviewedAt}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-green-700 mb-2">💪 강점</h4>
                          <p className="text-gray-700 bg-green-50 p-3 rounded-lg">
                            {review.strengths}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-700 mb-2">🔍 개선 제안</h4>
                          <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
                            {review.improvements}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-700 mb-2">💭 전반적인 의견</h4>
                          <p className="text-gray-700 bg-purple-50 p-3 rounded-lg">
                            {review.overall}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <ThumbsUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">{t.noData.received}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export { PeerReviewPage };