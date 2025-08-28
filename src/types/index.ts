export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  dates: string;
  element: string;
  quality: string;
}

export interface Horoscope {
  sign: string;
  date: string;
  horoscope: string;
  compatibility: string;
  mood: string;
  luckyNumber: string;
  luckyTime: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  selectedZodiacSign: string;
  preferences: {
    notifications: boolean;
    reminderTime: string;
    theme: 'light' | 'dark';
  };
}

export interface NavigationProps {
  navigation: any;
  route: any;
}
