
import { GoogleGenAI, Type } from "@google/genai";
import type { TriageResult } from '../types';

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
    }
  },
  required: ['urgency', 'keywords']
};

export async function getAITriage(symptoms: string): Promise<TriageResult> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `You are a medical triage AI. Your purpose is to analyze a user's symptoms and classify them into one of three urgency levels: EMERGENCY (life-threatening, go to ER immediately), URGENT (requires medical attention soon but not life-threatening), or ROUTINE (can be scheduled with a doctor at a regular appointment). You must also identify the most appropriate medical specialist and extract relevant keywords.

  - EMERGENCY examples: 'crushing chest pain', 'can't feel one side of my body', 'severe difficulty breathing', 'uncontrolled bleeding'.
  - URGENT examples: 'sudden severe headache unlike any other', 'seeing flashing lights and floaters', 'painful urination with fever', 'a rash that is spreading quickly'.
  - ROUTINE examples: 'mildly sore knee for a week', 'acne breakout', 'annual physical checkup'.

  You MUST return your analysis in a valid JSON format according to the provided schema. Do not include any explanatory text, markdown formatting, or anything outside of the JSON object.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following symptoms: "${symptoms}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: triageSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as TriageResult;
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get triage analysis from AI. Please try again.");
  }
}
