import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Horoscope, JournalEntry, User } from '../types';
import { HoroscopeService } from '../services/horoscopeService';
import { JournalService } from '../services/journalService';
import { NotificationService, NotificationPreferences } from '../services/notificationService';

interface AppState {
  selectedZodiacSign: string;
  currentHoroscope: Horoscope | null;
  journalEntries: JournalEntry[];
  user: User | null;
  isLoading: boolean;
  error: string | null;
  notificationPreferences: NotificationPreferences;
  notificationPermission: string;
}

type AppAction =
  | { type: 'SET_SELECTED_ZODIAC_SIGN'; payload: string }
  | { type: 'SET_CURRENT_HOROSCOPE'; payload: Horoscope | null }
  | { type: 'SET_JOURNAL_ENTRIES'; payload: JournalEntry[] }
  | { type: 'ADD_JOURNAL_ENTRY'; payload: JournalEntry }
  | { type: 'UPDATE_JOURNAL_ENTRY'; payload: { id: string; content: string; mood?: string } }
  | { type: 'DELETE_JOURNAL_ENTRY'; payload: string }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_NOTIFICATION_PREFERENCES'; payload: NotificationPreferences }
  | { type: 'SET_NOTIFICATION_PERMISSION'; payload: string };

const initialState: AppState = {
  selectedZodiacSign: 'aries',
  currentHoroscope: null,
  journalEntries: [],
  user: null,
  isLoading: false,
  error: null,
  notificationPreferences: {
    enabled: false,
    time: '09:00',
    dailyHoroscope: true,
  },
  notificationPermission: 'undetermined',
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SELECTED_ZODIAC_SIGN':
      return { ...state, selectedZodiacSign: action.payload };
    case 'SET_CURRENT_HOROSCOPE':
      return { ...state, currentHoroscope: action.payload };
    case 'SET_JOURNAL_ENTRIES':
      return { ...state, journalEntries: action.payload };
    case 'ADD_JOURNAL_ENTRY':
      return { ...state, journalEntries: [...state.journalEntries, action.payload] };
      case 'UPDATE_JOURNAL_ENTRY':
        return {
          ...state,
          journalEntries: state.journalEntries.map(entry =>
            entry.id === action.payload.id
              ? { 
                  ...entry, 
                  content: action.payload.content, 
                  mood: action.payload.mood ?? entry.mood, 
                  updatedAt: new Date() 
                }
              : entry
          ),
        };
      
    case 'DELETE_JOURNAL_ENTRY':
      return {
        ...state,
        journalEntries: state.journalEntries.filter(entry => entry.id !== action.payload),
      };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_NOTIFICATION_PREFERENCES':
      return { ...state, notificationPreferences: action.payload };
    case 'SET_NOTIFICATION_PERMISSION':
      return { ...state, notificationPermission: action.payload };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  fetchHoroscope: (sign: string) => Promise<void>;
  saveJournalEntry: (content: string, mood?: string) => Promise<void>;
  updateJournalEntry: (id: string, content: string, mood?: string) => Promise<void>;
  deleteJournalEntry: (id: string) => Promise<void>;
  loadJournalEntries: () => Promise<void>;
  setZodiacSign: (sign: string) => void;
  enableNotifications: (time?: string) => Promise<boolean>;
  disableNotifications: () => Promise<void>;
  loadNotificationPreferences: () => Promise<void>;
  updateNotificationTime: (time: string) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchHoroscope = async (sign: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const horoscope = await HoroscopeService.getDailyHoroscope(sign);
      dispatch({ type: 'SET_CURRENT_HOROSCOPE', payload: horoscope });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch horoscope' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadJournalEntries = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const entries = await JournalService.getJournalEntries();
      console.log('Loaded journal entries:', entries.length);
      dispatch({ type: 'SET_JOURNAL_ENTRIES', payload: entries });
    } catch (error) {
      console.error('Error loading journal entries:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load journal entries' });
      // Set empty array on error to prevent UI issues
      dispatch({ type: 'SET_JOURNAL_ENTRIES', payload: [] });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveJournalEntry = async (content: string, mood?: string) => {
    try {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        content,
        mood,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await JournalService.saveJournalEntry(newEntry);
      dispatch({ type: 'ADD_JOURNAL_ENTRY', payload: newEntry });
      console.log('Saved journal entry:', newEntry.id);
    } catch (error) {
      console.error('Error saving journal entry:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save journal entry' });
    }
  };

  const updateJournalEntry = async (id: string, content: string, mood?: string) => {
    try {
      await JournalService.updateJournalEntry(id, content, mood);
      dispatch({ type: 'UPDATE_JOURNAL_ENTRY', payload: { id, content, mood } });
      console.log('Updated journal entry:', id);
    } catch (error) {
      console.error('Error updating journal entry:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update journal entry' });
    }
  };
  

  const deleteJournalEntry = async (id: string) => {
    try {
      await JournalService.deleteJournalEntry(id);
      dispatch({ type: 'DELETE_JOURNAL_ENTRY', payload: id });
      console.log('Deleted journal entry:', id);
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete journal entry' });
    }
  };

  const setZodiacSign = (sign: string) => {
    dispatch({ type: 'SET_SELECTED_ZODIAC_SIGN', payload: sign });
  };

  const enableNotifications = async (time: string = '09:00'): Promise<boolean> => {
    try {
      const success = await NotificationService.enableNotifications(time);
      if (success) {
        const preferences = await NotificationService.loadPreferences();
        dispatch({ type: 'SET_NOTIFICATION_PREFERENCES', payload: preferences });
        dispatch({ type: 'SET_NOTIFICATION_PERMISSION', payload: 'granted' });
      }
      return success;
    } catch (error) {
      console.error('Error enabling notifications:', error);
      return false;
    }
  };

  const disableNotifications = async (): Promise<void> => {
    try {
      await NotificationService.disableNotifications();
      const preferences = await NotificationService.loadPreferences();
      dispatch({ type: 'SET_NOTIFICATION_PREFERENCES', payload: preferences });
    } catch (error) {
      console.error('Error disabling notifications:', error);
    }
  };

  const loadNotificationPreferences = async (): Promise<void> => {
    try {
      const preferences = await NotificationService.loadPreferences();
      const permission = await NotificationService.getPermissionStatus();
      dispatch({ type: 'SET_NOTIFICATION_PREFERENCES', payload: preferences });
      dispatch({ type: 'SET_NOTIFICATION_PERMISSION', payload: permission });
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    }
  };

  const updateNotificationTime = async (time: string): Promise<boolean> => {
    try {
      const success = await NotificationService.updateNotificationTime(time);
      if (success) {
        const preferences = await NotificationService.loadPreferences();
        dispatch({ type: 'SET_NOTIFICATION_PREFERENCES', payload: preferences });
      }
      return success;
    } catch (error) {
      console.error('Error updating notification time:', error);
      return false;
    }
  };

  useEffect(() => {
    loadJournalEntries();
    fetchHoroscope(state.selectedZodiacSign);
    loadNotificationPreferences();
  }, []);

  useEffect(() => {
    if (state.selectedZodiacSign) {
      fetchHoroscope(state.selectedZodiacSign);
    }
  }, [state.selectedZodiacSign]);

  const value: AppContextType = {
    state,
    dispatch,
    fetchHoroscope,
    saveJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    loadJournalEntries,
    setZodiacSign,
    enableNotifications,
    disableNotifications,
    loadNotificationPreferences,
    updateNotificationTime,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
