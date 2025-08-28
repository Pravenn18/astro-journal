export interface FeatureConfig {
  name: string;
  enabled: boolean;
  version: string;
  settings: Record<string, any>;
}

export const FEATURES: Record<string, FeatureConfig> = {
  HOROSCOPES: {
    name: 'Daily Horoscopes',
    enabled: true,
    version: '1.0.0',
    settings: {
      autoRefresh: true,
      offlineFallback: true,
      zodiacSigns: 12,
    },
  },
  
  JOURNAL: {
    name: 'Journal System',
    enabled: true,
    version: '1.0.0',
    settings: {
      autoSave: true,
      autoSaveDelay: 2000,
      moodTracking: true,
      tags: false,
      search: false,
    },
  },

  CHAT: {
    name: 'Chat System',
    enabled: false,
    version: '2.0.0',
    settings: {
      realTimeMessaging: true,
      groupChats: true,
      zodiacRooms: true,
      encryption: true,
      fileSharing: false,
      voiceMessages: false,
    },
  },

  CALLS: {
    name: 'Call Features',
    enabled: false,
    version: '2.0.0',
    settings: {
      voiceCalls: true,
      videoCalls: true,
      groupCalls: true,
      screenSharing: true,
      recording: false,
      transcription: false,
    },
  },

  BIRTH_CHARTS: {
    name: 'Birth Chart Analysis',
    enabled: false,
    version: '3.0.0',
    settings: {
      natalChart: true,
      transits: true,
      progressions: true,
      compatibility: true,
      interpretations: true,
    },
  },

  TAROT: {
    name: 'Tarot Integration',
    enabled: false,
    version: '3.0.0',
    settings: {
      dailyCards: true,
      spreads: true,
      interpretations: true,
      cardLibrary: true,
      personalDeck: false,
    },
  },

  AI_FEATURES: {
    name: 'AI & Personalization',
    enabled: false,
    version: '4.0.0',
    settings: {
      horoscopeGeneration: true,
      moodAnalysis: true,
      predictions: true,
      recommendations: true,
      learning: true,
    },
  },

  COMMUNITY: {
    name: 'Community Features',
    enabled: false,
    version: '5.0.0',
    settings: {
      forums: true,
      events: true,
      marketplace: true,
      subscriptions: true,
      socialSharing: true,
    },
  },
};

export const isFeatureEnabled = (featureName: string): boolean => {
  return FEATURES[featureName]?.enabled || false;
};

export const getFeatureSettings = (featureName: string): Record<string, any> => {
  return FEATURES[featureName]?.settings || {};
};

export const CHAT_CONFIG = {
  maxMessageLength: 1000,
  maxGroupSize: 50,
  messageRetentionDays: 30,
  typingIndicator: true,
  readReceipts: true,
  onlineStatus: true,
};

export const CALL_CONFIG = {
  maxParticipants: 10,
  maxCallDuration: 3600,
  recordingEnabled: false,
  screenSharingEnabled: true,
  bandwidthOptimization: true,
  fallbackToAudio: true,
};

export const API_ENDPOINTS = {
  horoscopes: 'https://aztro.sameerkumar.website',
  chat: 'https://api.astrojournal.app/chat',
  calls: 'https://api.astrojournal.app/calls',
  users: 'https://api.astrojournal.app/users',
  analytics: 'https://api.astrojournal.app/analytics',
};

export const WEBSOCKET_CONFIG = {
  chat: 'wss://api.astrojournal.app/chat',
  calls: 'wss://api.astrojournal.app/calls',
  notifications: 'wss://api.astrojournal.app/notifications',
  reconnectAttempts: 5,
  reconnectDelay: 1000,
};
