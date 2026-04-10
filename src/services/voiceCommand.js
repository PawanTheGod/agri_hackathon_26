// src/services/voiceCommand.js
// Voice Command Recognition for AgriPulse
// Web: Web Speech API (SpeechRecognition)
// Native: expo-speech-recognition (if available) → graceful fallback
import { Platform } from 'react-native';

// ─── Intent Map ────────────────────────────────────────────────
// Maps spoken phrases → action tokens (multi-language)
const INTENTS = [
  {
    action: 'navigate_home',
    keywords: [
      'home', 'होम', 'मुख्य', 'dashboard', 'डैशबोर्ड', 'मुख्यपृष्ठ', 'घर',
      'मुख्य पृष्ठ', 'घरी जा',
    ],
  },
  {
    action: 'navigate_advisory',
    keywords: [
      'advisory', 'सलाह', 'सल्ला', 'counsel', 'advice', 'farming advice',
      'farming advisory', 'कृषि सलाह', 'कृषी सल्ला', 'tip', 'tips',
    ],
  },
  {
    action: 'navigate_soil',
    keywords: [
      'soil', 'मिट्टी', 'माती', 'npk', 'soil test', 'मिट्टी जाँच',
      'माती परीक्षण', 'nitrogen', 'phosphorus', 'potassium', 'npk test',
    ],
  },
  {
    action: 'navigate_map',
    keywords: [
      'map', 'नक्शा', 'नकाशा', 'farm map', 'location', 'field', 'खेत',
      'खेत का नक्शा', 'शेत', 'satellite', 'zone',
    ],
  },
  {
    action: 'speak_report',
    keywords: [
      'report', 'रिपोर्ट', 'status', 'स्थिति', 'read', 'बताओ', 'what',
      'खेत की स्थिति', 'क्या हो रहा है', 'सांगा', 'ऐका', 'listen',
      'play report', 'play audio', 'speak', 'बोलो',
    ],
  },
  {
    action: 'check_moisture',
    keywords: [
      'moisture', 'नमी', 'ओलावा', 'water level', 'पानी', 'पाणी',
      'नमी का स्तर', 'how wet', 'wet', 'dry',
    ],
  },
  {
    action: 'check_temperature',
    keywords: [
      'temperature', 'तापमान', 'temp', 'heat', 'गर्मी', 'गरम', 'hot',
      'degree', 'degrees', 'celsius',
    ],
  },
  {
    action: 'logout',
    keywords: [
      'logout', 'log out', 'sign out', 'exit', 'बाहर', 'निकलो', 'बाहेर',
      'लॉगआउट', 'बाहर जाओ', 'बाहेर जा', 'signout',
    ],
  },
];

// ─── Parse transcript to intent ────────────────────────────────
export function parseIntent(transcript) {
  if (!transcript) return null;
  const lower = transcript.toLowerCase().trim();

  for (const intent of INTENTS) {
    for (const kw of intent.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        return { action: intent.action, transcript, confidence: 0.9 };
      }
    }
  }
  return { action: 'unknown', transcript, confidence: 0 };
}

// ─── Web Speech Recognition wrapper ────────────────────────────
let recognitionInstance = null;

export function isVoiceSupported() {
  if (Platform.OS === 'web') {
    return typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);
  }
  // Native: check expo-speech-recognition or Voice module
  return false; // graceful degradation
}

export function startListening({ lang = 'hi-IN', onResult, onError, onEnd }) {
  if (Platform.OS !== 'web') {
    if (onError) onError(new Error('Voice commands are web-only in this build'));
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    if (onError) onError(new Error('SpeechRecognition not supported'));
    return;
  }

  stopListening();

  const recognition = new SpeechRecognition();
  recognitionInstance = recognition;

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = lang;
  recognition.maxAlternatives = 3;

  recognition.onresult = (event) => {
    const results = Array.from(event.results);
    const transcripts = results.flatMap(r => Array.from(r).map(alt => alt.transcript));
    const best = transcripts[0] || '';
    const intent = parseIntent(best);
    if (onResult) onResult({ transcript: best, intent, all: transcripts });
  };

  recognition.onerror = (event) => {
    if (onError) onError(new Error(event.error));
  };

  recognition.onend = () => {
    recognitionInstance = null;
    if (onEnd) onEnd();
  };

  recognition.start();
}

export function stopListening() {
  if (recognitionInstance) {
    try { recognitionInstance.stop(); } catch (_) {}
    recognitionInstance = null;
  }
}

// ─── Lang code helper ──────────────────────────────────────────
export function getRecognitionLang(appLang) {
  const map = { hi: 'hi-IN', en: 'en-IN', mr: 'mr-IN' };
  return map[appLang] || 'hi-IN';
}
