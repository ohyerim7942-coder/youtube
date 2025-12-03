import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ScriptResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeTextAndSuggest = async (inputText: string): Promise<AnalysisResult> => {
  const modelId = "gemini-2.5-flash"; // Fast and capable for structured analysis

  const prompt = `
    당신은 전문 유튜브 컨텐츠 전략가입니다.
    사용자가 제공한 대본(또는 아이디어)을 분석하고, 이 채널의 성장에 도움이 될 새로운 주제 3가지를 제안해주세요.

    입력 텍스트:
    """
    ${inputText}
    """
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      systemInstruction: "분석 결과는 반드시 한국어로 작성되어야 합니다.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tone: {
            type: Type.STRING,
            description: "입력된 텍스트의 어조와 스타일 (예: 유머러스함, 진지함, 정보 전달 중심)",
          },
          targetAudience: {
            type: Type.STRING,
            description: "예상되는 타겟 시청자층",
          },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "제안하는 영상의 매력적인 제목 (클릭을 유도하는)" },
                description: { type: Type.STRING, description: "영상 내용 요약" },
                reasoning: { type: Type.STRING, description: "이 주제를 추천하는 이유" },
              },
              required: ["title", "description", "reasoning"],
            },
          },
        },
        required: ["tone", "targetAudience", "suggestions"],
      },
    },
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text) as AnalysisResult;
};

export const generateScript = async (topicTitle: string, tone: string, audience: string): Promise<ScriptResult> => {
  // Using Pro for higher quality creative writing
  const modelId = "gemini-3-pro-preview"; 

  const prompt = `
    다음 정보를 바탕으로 유튜브 영상 전체 대본을 작성해주세요.
    
    주제: ${topicTitle}
    원하는 톤앤매너: ${tone}
    타겟 시청자: ${audience}

    대본 구조:
    1. [후킹]: 초반 5초 안에 시청자를 사로잡을 강렬한 멘트나 상황
    2. [오프닝]: 주제 소개 및 시청자가 얻갈 수 있는 가치 설명
    3. [본론]: 논리적이고 흥미로운 전개 (최소 3가지 포인트)
    4. [결론/요약]: 핵심 내용 정리
    5. [아웃트로]: 구독, 좋아요 유도 및 시청자 참여 질문
    
    읽기 편하게 마크다운 형식으로 작성해주고, 촬영 가이드(화면 전환, 효과음 등)도 괄호() 안에 포함시켜주세요.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      // High thinking budget for better structure and creativity
      thinkingConfig: { thinkingBudget: 2048 },
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate script");
  }

  return {
    title: topicTitle,
    content: response.text
  };
};
