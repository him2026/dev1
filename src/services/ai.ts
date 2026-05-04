/**
 * HIM - AI Service
 * Ported from includes/ai_helper.php
 */

export type Sentiment = 'positive' | 'negative' | 'neutral';

/**
 * Detect sentiment from message (simple keyword-based)
 * Line-by-line port of PHP detectSentiment
 */
export function detectSentiment(message: string): Sentiment {
  const messageLower = message.toLowerCase();
  
  const positive = ['happy', 'great', 'good', 'love', 'wonderful', 'amazing', 'better', 'excited', 'joy', 'thankful', 'grateful', 'smile', 'laugh'];
  const negative = ['sad', 'bad', 'pain', 'hurt', 'cry', 'angry', 'anxious', 'worried', 'scared', 'lonely', 'depressed', 'terrible', 'awful', 'hate'];
  const neutral = ['okay', 'fine', 'alright', 'normal', 'meh'];
  
  for (const word of positive) {
    if (messageLower.includes(word)) return 'positive';
  }
  for (const word of negative) {
    if (messageLower.includes(word)) return 'negative';
  }
  for (const word of neutral) {
    if (messageLower.includes(word)) return 'neutral';
  }
  
  return 'neutral';
}

/**
 * Build system prompt for AI
 * Line-by-line port of PHP buildSystemPrompt
 */
export function buildSystemPrompt(mood: string, cyclePhase: string, userName: string): string {
  const phaseContext: Record<string, string> = {
    menstrual: 'She is in her menstrual phase (period). She may be experiencing cramps, fatigue, and low energy. Be extra gentle, comforting, and nurturing.',
    follicular: 'She is in her follicular phase. Energy is rising, creativity is high. Be encouraging, motivating, and enthusiastic.',
    ovulation: 'She is in her ovulation phase. Peak energy and confidence. Be supportive, celebratory, and empowering.',
    luteal: 'She is in her luteal phase (PMS window). She may feel irritable, emotional, or anxious. Be patient, understanding, and soothing.'
  };
  
  const moodContext: Record<string, string> = {
    happy: 'She is feeling happy. Match her positive energy while being warm.',
    sad: 'She is feeling sad. Be extra compassionate, validating, and gentle.',
    anxious: 'She is feeling anxious. Be calming, reassuring, and grounding.',
    angry: 'She is feeling angry. Acknowledge her feelings without dismissing them. Be validating.',
    tired: 'She is feeling tired. Keep responses short and soothing. Suggest rest.',
    neutral: 'She is feeling neutral. Be warm and check in gently.',
    calm: 'She is feeling calm. Match her peaceful energy.',
    irritated: 'She is feeling irritated. Be patient, don\'t be overly cheerful. Validate her feelings.'
  };
  
  const phase = phaseContext[cyclePhase] || phaseContext.menstrual;
  const moodInfo = moodContext[mood] || moodContext.neutral;
  
  return `You are HIM (Her Intelligent Mate), a warm, empathetic AI companion for women during their menstrual cycle. 
You are talking to ${userName}. 

CONTEXT:
- ${phase}
- ${moodInfo}

RULES:
1. Be warm, empathetic, and non-judgmental. Never be clinical or cold.
2. Use her name occasionally to feel personal.
3. Keep responses concise (2-4 sentences max).
4. Offer practical suggestions when appropriate (breathing, hydration, rest).
5. Never diagnose medical conditions. If health concerns arise, gently suggest consulting a doctor.
6. Use gentle emoji sparingly (💕, 🌸, ☀️, 🌙).
7. Adapt your tone to match her mood and cycle phase.
8. If she seems in pain, acknowledge it first before offering help.
9. You are a supportive friend, not a doctor or therapist.`;
}

/**
 * Fallback responses when API is unavailable
 * Line-by-line port of PHP getFallbackResponse
 */
export function getFallbackResponse(message: string, mood: string, phase: string, name: string): string {
  const messageLower = message.toLowerCase();
  let responses: string[] = [];
  
  if (messageLower.includes('cramp') || messageLower.includes('pain')) {
    responses = [
      `I'm so sorry you're in pain, ${name} 💕 Try placing a warm heating pad on your tummy and sipping some ginger tea. You're being so brave.`,
      `Ouch, cramps are the worst 🌙 Have you tried gentle stretching? Child's pose can work wonders. I'm right here with you.`,
      `I wish I could take the pain away, ${name}. A warm bath with some lavender might help. Remember, this will pass 💕`
    ];
  } else if (messageLower.includes('sad') || messageLower.includes('cry') || messageLower.includes('low')) {
    responses = [
      `It's okay to feel this way, ${name} 💕 Your emotions are valid. Would you like to talk about it, or shall I share something comforting?`,
      `I'm here for you 🌸 Feeling low during your cycle is completely normal. You're not alone in this, and you're doing great just by being here.`,
      `Let those feelings flow, ${name}. Sometimes a good cry is the best medicine. Wrap yourself in a cozy blanket — you deserve comfort right now 💕`
    ];
  } else if (messageLower.includes('tired') || messageLower.includes('exhaust') || messageLower.includes('fatigue')) {
    responses = [
      `Rest, ${name} 🌙 Your body is working hard right now. It's okay to cancel plans and just be. You've earned this rest.`,
      `Fatigue during your cycle is your body asking for care. Take a nap, hydrate, and be kind to yourself 💕`,
      `You don't have to be productive today, ${name}. Sometimes the bravest thing is to simply rest 🌸`
    ];
  } else if (messageLower.includes('anxious') || messageLower.includes('worry') || messageLower.includes('stress')) {
    responses = [
      `Take a deep breath with me, ${name} 🌸 Breathe in for 4... hold for 4... out for 6. Anxiety during your cycle is normal, and it will ease.`,
      `I understand that anxious feeling. Try grounding: name 5 things you can see right now. I'm right here with you 💕`,
      `Your worries are valid, ${name}, but they feel bigger right now because of hormonal changes. Be gentle with yourself 🌙`
    ];
  } else if (mood === 'happy' || messageLower.includes('happy') || messageLower.includes('good')) {
    responses = [
      `That makes me so happy to hear, ${name}! ☀️ You deserve all the good vibes. What's making you smile today?`,
      `Yay! Your positive energy is beautiful! 🌸 Enjoy this feeling — you've earned it!`,
      `I love seeing you happy, ${name}! ☀️ This is the perfect time to do something you love.`
    ];
  } else {
    const phaseResponses: Record<string, string[]> = {
      menstrual: [
        `I'm here for you, ${name} 🌙 How are you feeling today? Remember, it's okay to take things slow during your period.`,
        `Hey ${name} 💕 Your body is doing something amazing right now. What can I help you with today?`,
      ],
      follicular: [
        `Hi ${name}! ☀️ You're in your follicular phase — energy is rising! What would you like to talk about?`,
        `Great time to try something new, ${name}! 🌱 Your creativity is at its peak. I'm here to chat!`,
      ],
      ovulation: [
        `Hey ${name}! ☀️ You're glowing! This is your peak — how can I support you today?`,
        `Hi there, superstar! 🌟 Ovulation energy is real. What's on your mind?`,
      ],
      luteal: [
        `Hi ${name} 🌸 How are you holding up? The luteal phase can be tricky. I'm here for whatever you need.`,
        `Hey ${name} 💕 Be extra kind to yourself right now. What's on your mind today?`,
      ]
    };
    responses = phaseResponses[phase] || phaseResponses.menstrual;
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
}
