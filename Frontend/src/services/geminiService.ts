
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  // In a real app, you might have better error handling or a fallback.
  // For this context, we'll log an error.
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

let chat: Chat | null = null;

export const startChat = () => {
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "You are MindfulU's AI assistant. You are a friendly and supportive chatbot designed to help students with their mental wellness. Provide safe, confidential, and helpful advice. If a user mentions a crisis, strongly advise them to use the 'Crisis Support' button and provide a number like 988 (Suicide & Crisis Lifeline). Keep your responses concise and easy to read.",
    },
  });
};

export async function* sendMessage(message: string) {
  if (!chat) {
    startChat();
  }

  const responseStream = await chat!.sendMessageStream({ message });

  for await (const chunk of responseStream) {
    yield chunk.text;
  }
}
