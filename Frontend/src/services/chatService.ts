// @ts-ignore
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export interface ChatResponse {
  success: boolean;
  data?: {
    response: string;
    suggestions: string[];
    timestamp: string;
  };
  message?: string;
  error?: string;
}

export const sendMessageToAI = async (
  message: string,
  conversationHistory: Message[] = []
): Promise<ChatResponse> => {
  try {
    const token = localStorage.getItem('authToken'); // Auth token if available

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Friendly, casual prompt to avoid clinical responses
    const prompt = `You are NOT a doctor. 
You are a friendly, caring friend who talks in a very natural way like "Hello bhai, kaise ho?".
Keep responses simple, warm, and conversational - like how real friends chat on WhatsApp. 

STRICT RULES:
- Do NOT prescribe medicines, tests, or clinical treatments
- Do NOT mention disorders, diagnosis, or medical terms
- Do NOT act like a doctor, therapist, or professional
- Talk casually, like a close friend giving emotional support
- Use simple Hindi + English (Hinglish) if it feels natural
- Keep it positive, supportive, and encouraging
- Short paragraphs, easy to read
- Length: around 80–150 words (not too long)

TONE:
- Friendly and casual
- Reassuring and hopeful
- Like talking to a trusted dost (friend)

Example style:
"Hello bhai, kya haal hai? Dekh, stress sabko hota hai, tu akela nahi hai. 
Thoda deep breath le, walk pe jaa, ya apne fav music sun. Sab thoda light lagega. 
Tu strong hai aur dheere dheere sab set ho jayega."`;

    const response = await fetch(`${API_BASE_URL}/chat/send`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message,
        prompt,
        conversationHistory: conversationHistory.slice(-10)
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send message');
    }

    const data: ChatResponse = await response.json();
    return data;

  } catch (error) {
    console.error('Error sending message to AI:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Fallback responses in case API fails or message is sensitive
export const getFallbackResponse = (message: string): { response: string; suggestions: string[] } => {
  const messageLower = message.toLowerCase();

  if (messageLower.includes('stress') || messageLower.includes('anxious') || messageLower.includes('overwhelmed')) {
    return {
      response: `Hello bhai, tension mat le. Aise moments sabke life me aate hain. Jab stress ho to ek deep breath le, aankh band kar aur 5 tak gin. Thoda walk kar le ya apna fav gaana sun. Dheere dheere sab theek lagega. Tu strong hai, sab handle kar lega!`,
      suggestions: ['Deep Breath', 'Music Sun', 'Walk Kar', 'Relax', 'Talk to Friend']
    };
  }

  if (messageLower.includes('sad') || messageLower.includes('depressed') || messageLower.includes('down')) {
    return {
      response: `Arre bhai, udaas mat ho. Har kisi ko kabhi na kabhi bura feel hota hai. Thoda time nikaal, apne pasand ki cheez kar – music sun, movie dekh, ya kisi dost ko call kar. Sab theek hoga, tu akela nahi hai. Dheere dheere sab sambhal jayega!`,
      suggestions: ['Music Sun', 'Call Friend', 'Relax', 'Take Break', 'Stay Positive']
    };
  }

  if (messageLower.includes('sleep') || messageLower.includes('tired') || messageLower.includes('insomnia')) {
    return {
      response: `Bhai, neend na aana sabko hota hai kabhi kabhi. Sone se pehle phone side me rakh, thoda stretch kar ya halka music sun. Room ko andhera aur shaant bana le. Dheere dheere body relax hogi aur neend aa jayegi. Apna khayal rakh, sab set ho jayega.`,
      suggestions: ['Relaxation', 'Stretch', 'Music', 'Dark Room', 'Better Sleep']
    };
  }

  if (messageLower.includes('study') || messageLower.includes('exam') || messageLower.includes('academic')) {
    return {
      response: `Bhai, exam ka pressure sabko hota hai. Ek time me chhote goals set kar aur dheere dheere pad. Thoda break le, paani pi aur relax kar. Apne dost ke sath milke study kar, sab asaan lagega. Tu capable hai, tension chhod aur apna best de!`,
      suggestions: ['Time Management', 'Break Lo', 'Study Group', 'Stay Calm', 'Keep Going']
    };
  }

  return {
    response: `Hey bhai, jo bhi ho, tension mat le. Har kisi ke life me ups and downs aate hain. Thoda rest le, apne pasand ka kuch kar, aur kisi dost ya family member se baat kar. Tu akela nahi hai, sab set ho jayega.`,
    suggestions: ['Talk to Friend', 'Relax', 'Take Care', 'Stay Strong']
  };
};
