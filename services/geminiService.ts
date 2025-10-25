
import { GoogleGenAI, Type } from "@google/genai";
import type { TriageResult, Message } from '../types';

const triageSchema = {
  type: Type.OBJECT,
  properties: {
    urgency: {
      type: Type.STRING,
      enum: ["EMERGENCY", "URGENT", "ROUTINE"],
      description: "Triage urgency level.",
    },
    specialist: {
      type: Type.STRING,
      description: "The medical specialty most relevant to the symptoms. E.g., Cardiology, Neurology, Dermatology.",
    },
    keywords: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of 2-4 medical keywords or conditions related to the symptoms. E.g., 'stroke', 'migraine', 'arrhythmia'."
    },
    confidenceScore: {
        type: Type.NUMBER,
        description: "A confidence score from 0 to 1 representing the certainty of the analysis."
    },
    recommendation: {
        type: Type.STRING,
        description: "A detailed, content-rich recommendation for the user."
    },
    question: {
        type: Type.STRING,
        description: "A follow-up question to the user to get more information about their symptoms."
    }
  },
  required: []
};

export async function continueAITriage(messages: Message[]): Promise<any> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `You are Nurse Eva, a friendly and professional AI triage nurse. Your goal is to have a short, focused conversation with a user to understand their symptoms and provide a recommendation.

1. Start by introducing yourself and asking clarifying questions about the user's initial symptoms.
2. Ask one question at a time.
3. Your questions should be designed to determine the urgency of the situation and the most appropriate medical specialty.
4. After you have enough information (usually 3-5 questions), analyze the conversation and provide a final recommendation.
5. The final recommendation must be in a valid JSON format according to the provided schema. It should include the urgency, specialist, keywords, a confidence score (from 0 to 1), and a detailed recommendation.
6. Do not provide a recommendation until you have asked at least a few follow-up questions.

- EMERGENCY examples: 'crushing chest pain', 'can\'t feel one side of my body', 'severe difficulty breathing', 'uncontrolled bleeding'.
- URGENT examples: 'a painful rash that is spreading', 'a deep cut that may need stitches', 'a fever that won\'t go down'.
- ROUTINE examples: 'mildly sore knee for a week', 'acne breakout', 'annual physical checkup', 'a persistent cough', 'seasonal allergies', 'a mole that has changed slightly'.

Remember to consider ROUTINE for any symptoms that are not life-threatening and do not require immediate attention.`;

  const contents = messages.map(msg => ({ role: msg.sender === 'ai' ? 'model' : 'user', parts: [{ text: msg.text }] }));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: triageSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get triage analysis from AI. Please try again.");
  }
}

export const getAITriage = continueAITriage;
