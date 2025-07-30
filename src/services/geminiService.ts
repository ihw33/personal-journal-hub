import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI | null = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} else {
  console.warn('GEMINI_API_KEY is not set. AI functionality will be disabled.');
}

const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }) : null;

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  if (!model) {
    return 'AI service is not configured. Please set the GEMINI_API_KEY.';
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    return 'AI 응답 생성에 실패했습니다. 잠시 후 다시 시도해주세요.';
  }
};