import { ContentText } from './types';

export const PHASE_SUBMISSION_CONTENT = {
  ko: {
    title: "실습 제출",
    subtitle: "AI와 함께한 결과를 공유해주세요",
    
    sections: {
      basicInfo: "기본 정보",
      chatSummary: "AI 대화 요약",
      practiceResults: "실습 결과", 
      reflection: "성찰 및 피드백",
      nextSteps: "다음 단계"
    },
    
    fields: {
      studentName: "이름",
      email: "이메일",
      timeSpent: "실제 소요 시간",
      aiToolUsed: "사용한 AI 도구",
      chatAnalysis: "AI 대화 분석",
      mainFindings: "주요 발견사항",
      challenges: "도전과 어려움",
      insights: "얻은 인사이트",
      nextStepPlans: "다음 Phase 계획",
      satisfaction: "만족도",
      difficultyLevel: "난이도"
    },
    
    phaseInfo: {
      1: {
        title: "최초 탐색",
        focus: "정보 수집 결과",
        questions: [
          "AI와의 대화에서 어떤 카테고리의 정보를 가장 많이 수집했나요?",
          "가장 유용했던 AI의 답변이나 제안은 무엇이었나요?",
          "예상과 달랐던 정보나 관점이 있었나요?"
        ]
      },
      2: {
        title: "심화 탐색",
        focus: "정보 재구성 결과",
        questions: [
          "AI와 함께 정보를 어떤 기준으로 재분류했나요?",
          "새롭게 발견한 연결점이나 패턴이 있나요?",
          "1단계와 비교해서 어떤 깊이가 추가되었나요?"
        ]
      },
      3: {
        title: "수집 정리",
        focus: "실행 계획 완성도",
        questions: [
          "AI와 함께 만든 체크리스트나 프레임워크가 실제로 사용 가능한가요?",
          "놓친 중요한 요소는 없나요?",
          "다른 상황에도 적용할 수 있을 만큼 일반화되었나요?"
        ]
      }
    },
    
    submissionTypes: {
      "phase-only": "이 Phase만 제출하고 피드백 받기",
      "continue-to-next": "제출하고 다음 Phase 계속하기"
    },
    
    placeholders: {
      mainFindings: "AI와의 대화를 통해 이 Phase에서 발견한 가장 중요한 내용들을 구체적으로 적어주세요...",
      challenges: "AI와 대화하면서 어려웠던 점이나 예상과 달랐던 부분을 솔직하게 적어주세요...",
      insights: "AI와의 협력을 통해 얻은 새로운 깨달음이나 아이디어를 적어주세요...",
      nextStepPlans: "다음 Phase에서 AI와 어떤 점에 집중하고 싶은지 적어주세요..."
    },
    
    aiTools: {
      claude: "Claude",
      chatgpt: "ChatGPT",
      integrated: "통합 AI 챗봇", 
      other: "기타"
    },
    
    timeOptions: [
      "15분 미만", "15-30분", "30-45분", "45분-1시간", "1시간 이상"
    ],
    
    submitButton: "Phase 제출하기",
    submittedTitle: "Phase 제출 완료!",
    submittedMessage: "AI 대화 내용과 함께 이 Phase의 결과가 성공적으로 제출되었습니다.",
    
    backToPhase: "Phase로 돌아가기",
    nextPhase: "다음 Phase 시작하기", 
    viewWeeklySubmission: "주차 전체 제출 보기"
  } as ContentText,
  
  en: {
    title: "Practice Submission",
    subtitle: "Share your AI collaboration results",
    submitButton: "Submit Phase",
    submittedTitle: "Phase Submitted!",
    submittedMessage: "Your Phase results with AI conversation have been submitted successfully."
  } as Partial<ContentText>
};

export const INITIAL_SUBMISSION_DATA = {
  studentName: '',
  email: '',
  submissionDate: new Date().toISOString().split('T')[0],
  timeSpent: '30분',
  aiToolUsed: 'integrated',
  chatSession: null,
  mainFindings: '',
  challenges: '',
  insights: '',
  nextStepPlans: '',
  satisfaction: 5,
  difficultyLevel: 3,
  submissionType: 'continue-to-next' as const
};