const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the generative model with friendly, casual conversation style
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  systemInstruction: `You are a friendly, caring friend who provides emotional support in a natural, conversational way.
Keep responses simple, warm, and conversational - like how real friends chat.

STRICT RULES:
- Respond in ENGLISH ONLY - no Hindi or Hinglish
- Do NOT prescribe medicines, tests, or clinical treatments
- Do NOT mention disorders, diagnosis, or medical terms
- Do NOT act like a doctor, therapist, or professional
- Talk casually, like a close friend giving emotional support
- Keep it positive, supportive, and encouraging
- Use simple, clear English
- Keep responses between 50-150 words

TONE:
- Friendly and casual
- Reassuring and hopeful
- Like talking to a trusted friend

Example style:
"Hey there! I'm here for you. When you're feeling stressed, try taking a few deep breaths. 
Maybe go for a short walk or listen to your favorite music. "`,
  generationConfig: {
    temperature: 0.9,
    topP: 0.9,
    maxOutputTokens: 1000,
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE
    }
  ]
});

// Fallback responses for when the API is unavailable
const getFallbackResponse = (message) => {
  const messageLower = message.toLowerCase();
  
  if (messageLower.includes('stress') || messageLower.includes('anxious') || messageLower.includes('overwhelmed')) {
    return {
      response: "I'm here for you. When you're feeling stressed, try taking a few deep breaths. Maybe go for a short walk or listen to your favorite music. Remember, it's okay to feel this way, and you're not alone in this.",
      suggestions: ['Breathing Exercise', 'Go for a Walk', 'Listen to Music']
    };
  }
  
  if (messageLower.includes('sad') || messageLower.includes('depressed') || messageLower.includes('down')) {
    return {
      response: "I'm really sorry you're feeling this way. It's okay to not be okay sometimes. Would you like to talk about what's on your mind? I'm here to listen and support you.",
      suggestions: ['Talk to Someone', 'Watch Something Funny', 'Write Your Thoughts']
    };
  }
  
  if (messageLower.includes('tired') || messageLower.includes('sleep') || messageLower.includes('exhausted')) {
    return {
      response: "It sounds like you could use some rest. Try to take a short break if you can. A quick walk or some gentle stretching might help refresh your mind and body.",
      suggestions: ['Take a Break', 'Drink Water', 'Short Walk']
    };
  }
  
  // Default fallback response
  return {
    response: "Thank you for sharing. I'm here to listen and support you. Could you tell me more about how you're feeling?",
    suggestions: ['I feel stressed', 'I need to talk', 'I need advice']
  };
};

// Function to remove unnecessary formatting
const removeUnnecessaryFormatting = (response) => {
  return response.trim();
};

// Send message to Gemini API
const sendMessage = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    const user = req.user; // May be null for unauthenticated users

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Message content is required'
      });
    }

    // Build conversation history for context
    let conversationText = '';
    if (conversationHistory.length > 0) {
      conversationText = conversationHistory
        .map(function(msg) {
          const role = msg.type === 'user' ? 'User' : 'Assistant';
          return role + ': ' + msg.content;
        })
        .join('\n') + '\n';
    }
    
    // Add user context if available
    let contextPrompt = '';
    if (user) {
      const userName = user.firstName || 'User';
      const userRole = user.role || 'student';
      contextPrompt = 'User context: ' + userName + ' (' + userRole + ')\n';
    }
    
    const fullPrompt = contextPrompt + conversationText + 'User: ' + message;

    let aiResponse;
    let suggestions = [];
    
    try {
      // Try to get response from Gemini API
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 300,
        }
      });
      
      const response = await result.response;
      aiResponse = response.text();
      
      // Remove unnecessary formatting
      aiResponse = removeUnnecessaryFormatting(aiResponse);
      
      // Generate suggestions based on the response
      suggestions = generateSuggestions(message, aiResponse);
      
    } catch (error) {
      console.error('Error calling Gemini API, using fallback response:', error.message);
      // Use fallback response when API fails
      const fallback = getFallbackResponse(message);
      aiResponse = fallback.response;
      suggestions = fallback.suggestions;
    }

    res.json({
      success: true,
      data: {
        response: aiResponse,
        suggestions: suggestions,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
    });

  } catch (error) {
    console.error('Error in chat controller:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate AI response',
      error: error.message
    });
  }
};

// Generate contextual suggestions based on the conversation
const generateSuggestions = (userMessage, aiResponse) => {
  const suggestions = [];
  const messageLower = userMessage.toLowerCase();
  const responseLower = aiResponse.toLowerCase();

  // Crisis/Emergency suggestions
  if (messageLower.includes('suicid') || messageLower.includes('hurt myself') || messageLower.includes('end it all') || messageLower.includes('crisis')) {
    suggestions.push('Crisis Support', 'Emergency Helpline', 'Immediate Professional Help');
  }
  // Stress and anxiety-related suggestions
  else if (messageLower.includes('stress') || messageLower.includes('anxious') || messageLower.includes('overwhelmed') || messageLower.includes('panic')) {
    suggestions.push('Breathing Techniques', 'Talk to Counselor', 'Mindfulness Exercises');
  }
  // Depression and mood-related suggestions
  else if (messageLower.includes('sad') || messageLower.includes('depressed') || messageLower.includes('down') || messageLower.includes('hopeless')) {
    suggestions.push('Professional Support', 'Mood Tracking', 'Connect with Friends');
  }
  // Sleep-related suggestions
  else if (messageLower.includes('sleep') || messageLower.includes('tired') || messageLower.includes('insomnia') || messageLower.includes('nightmare')) {
    suggestions.push('Sleep Hygiene Tips', 'Relaxation Techniques', 'Consult Sleep Specialist');
  }
  // Academic stress suggestions
  else if (messageLower.includes('study') || messageLower.includes('exam') || messageLower.includes('academic') || messageLower.includes('grade')) {
    suggestions.push('Study Techniques', 'Academic Counseling', 'Time Management');
  }
  // Relationship and social issues
  else if (messageLower.includes('lonely') || messageLower.includes('friends') || messageLower.includes('relationship') || messageLower.includes('social')) {
    suggestions.push('Social Skills Support', 'Peer Groups', 'Relationship Counseling');
  }
  // Eating and body image issues
  else if (messageLower.includes('eating') || messageLower.includes('weight') || messageLower.includes('body') || messageLower.includes('food')) {
    suggestions.push('Nutritional Counseling', 'Body Positivity Resources', 'Eating Disorder Support');
  }
  // General wellness suggestions
  else {
    suggestions.push('Wellness Check-in', 'Mental Health Resources', 'Talk to Counselor');
  }

  return suggestions.slice(0, 3); // Limit to 3 suggestions
};

module.exports = {
  sendMessage,
  generateSuggestions
};