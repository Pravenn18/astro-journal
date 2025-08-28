import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry } from '../types';

const JOURNAL_STORAGE_KEY = '@astro_journal_entries';
const USER_PREFERENCES_KEY = '@astro_user_preferences';

export class JournalService {
  static async saveJournalEntry(entry: JournalEntry): Promise<void> {
    try {
      const existingEntries = await this.getJournalEntries();
      const updatedEntries = [...existingEntries, entry];
      await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error saving journal entry:', error);
      throw error;
    }
  }
  static async updateJournalEntry(entryId: string, updatedContent: string, updatedMood?: string): Promise<void> {
    try {
      const existingEntries = await this.getJournalEntries();
      const updatedEntries = existingEntries.map(entry => 
        entry.id === entryId 
          ? { 
              ...entry, 
              content: updatedContent, 
              mood: updatedMood ?? entry.mood, 
              updatedAt: new Date() 
            }
          : entry
      );
      await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error updating journal entry:', error);
      throw error;
    }
  }
  
  static async getJournalEntries(): Promise<JournalEntry[]> {
    try {
      const entries = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);
      if (entries) {
        const parsedEntries = JSON.parse(entries);
        if (Array.isArray(parsedEntries)) {
          return parsedEntries.map((entry: any) => ({
            ...entry,
            createdAt: new Date(entry.createdAt),
            updatedAt: new Date(entry.updatedAt)
          }));
        } else {
          console.warn('Invalid journal entries format, resetting to empty array');
          await AsyncStorage.removeItem(JOURNAL_STORAGE_KEY);
          return [];
        }
      }
      return [];
    } catch (error) {
      console.error('Error getting journal entries:', error);
      try {
        await AsyncStorage.removeItem(JOURNAL_STORAGE_KEY);
      } catch (clearError) {
        console.error('Error clearing corrupted journal data:', clearError);
      }
      return [];
    }
  }

  static async getJournalEntryByDate(date: string): Promise<JournalEntry | null> {
    try {
      const entries = await this.getJournalEntries();
      return entries.find(entry => entry.date === date) || null;
    } catch (error) {
      console.error('Error getting journal entry by date:', error);
      return null;
    }
  }

  static async deleteJournalEntry(entryId: string): Promise<void> {
    try {
      const existingEntries = await this.getJournalEntries();
      const updatedEntries = existingEntries.filter(entry => entry.id !== entryId);
      await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      throw error;
    }
  }

  static async clearAllEntries(): Promise<void> {
    try {
      await AsyncStorage.removeItem(JOURNAL_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing journal entries:', error);
      throw error;
    }
  }

  static async saveUserPreferences(preferences: any): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving user preferences:', error);
      throw error;
    }
  }

  static async getUserPreferences(): Promise<any> {
    try {
      const preferences = await AsyncStorage.getItem(USER_PREFERENCES_KEY);
      return preferences ? JSON.parse(preferences) : null;
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return null;
    }
  }

  static async debugStorage(): Promise<void> {
    try {
      const entries = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);
      console.log('Raw storage data:', entries);
      if (entries) {
        const parsed = JSON.parse(entries);
        console.log('Parsed entries:', parsed);
        console.log('Number of entries:', Array.isArray(parsed) ? parsed.length : 'Not an array');
      }
    } catch (error) {
      console.error('Debug storage error:', error);
    }
  }
}
