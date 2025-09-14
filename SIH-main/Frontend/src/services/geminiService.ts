import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  throw new Error('Gemini API key not found. Please set the VITE_API_KEY environment variable.');
}

const ai = new GoogleGenAI({ apiKey });

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
