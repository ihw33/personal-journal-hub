import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Gemini API 클라이언트 초기화
const getGeminiClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.');
  }
  
  return new GoogleGenerativeAI(apiKey);
};

// Gemini 모델 설정
export const getGeminiModel = (modelName: string = 'gemini-1.5-flash') => {
  const genAI = getGeminiClient();
  return genAI.getGenerativeModel({ 
    model: modelName,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1000,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  });
};

// 채팅 대화를 위한 Gemini API 호출
export async function callGeminiAPI(
  systemPrompt: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  userMessage: string
): Promise<string> {
  try {
    const model = getGeminiModel();
    
    // Gemini용 대화 히스토리 포맷 변환
    const history = conversationHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
    
    // 시스템 프롬프트를 첫 번째 메시지로 포함
    const fullHistory = [
      {
        role: 'user',
        parts: [{ text: systemPrompt + '\n\n사용자가 대화를 시작하겠습니다.' }]
      },
      {
        role: 'model',
        parts: [{ text: '네, 이해했습니다. 제주도 여행 계획을 도와드리겠습니다. 어떤 것부터 시작해볼까요?' }]
      },
      ...history
    ];
    
    // 채팅 세션 시작
    const chat = model.startChat({
      history: fullHistory,
    });
    
    // 사용자 메시지 전송
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }
    
    return text;
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // 에러 처리: 시뮬레이션 모드로 fallback
    return generateFallbackResponse(userMessage);
  }
}

// API 에러 시 사용할 fallback 응답
function generateFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('여행') || message.includes('제주')) {
    return `죄송합니다. 현재 AI 서비스에 일시적인 문제가 있습니다. 
    
제주도 여행에 대한 질문을 해주셨는데, 다음과 같은 방향으로 도움을 드릴 수 있습니다:

🌟 **인기 여행지**
- 성산일출봉: 제주의 대표적인 일출 명소
- 한라산: 등반과 자연 경관을 즐길 수 있는 곳
- 우도: 아름다운 해변과 독특한 풍경

🍽️ **추천 음식**
- 흑돼지구이
- 해물라면
- 한라봉

잠시 후 다시 시도해보시거나, 더 구체적인 질문을 해주시면 도움을 드리겠습니다.`;
  }
  
  return `죄송합니다. 현재 AI 서비스에 일시적인 문제가 있습니다. 잠시 후 다시 시도해주세요.

"${userMessage}"에 대한 답변을 준비하고 있었는데, 기술적인 문제로 응답을 생성할 수 없습니다. 조금 더 구체적인 질문으로 다시 시도해보시거나, 잠시 후 다시 시도해주세요.`;
}

// API 키 확인 함수
export function checkGeminiAPIKey(): boolean {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    return !!apiKey;
  } catch {
    return false;
  }
}

// Gemini API 사용 가능한 모델 목록
export const GEMINI_MODELS = {
  'gemini-1.5-flash': {
    name: 'Gemini 1.5 Flash',
    description: '빠른 응답, 일반적인 대화에 적합',
    maxTokens: 1000000,
    costEffective: true
  },
  'gemini-1.5-pro': {
    name: 'Gemini 1.5 Pro',
    description: '고품질 응답, 복잡한 작업에 적합', 
    maxTokens: 2000000,
    costEffective: false
  },
  'gemini-1.0-pro': {
    name: 'Gemini 1.0 Pro',
    description: '안정적인 성능, 기본 모델',
    maxTokens: 30720,
    costEffective: true
  }
} as const;

export type GeminiModelType = keyof typeof GEMINI_MODELS;