import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NOTIFICATION_PREFERENCES_KEY = 'notification_preferences';

export interface NotificationPreferences {
  enabled: boolean;
  time: string;
  dailyHoroscope: boolean;
}

export class NotificationService {
  static async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  static async getPermissionStatus(): Promise<string> {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status;
    } catch (error) {
      console.error('Error getting permission status:', error);
      return 'undetermined';
    }
  }

  static async savePreferences(preferences: NotificationPreferences): Promise<void> {
    try {
      await AsyncStorage.setItem(NOTIFICATION_PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving notification preferences:', error);
    }
  }

  static async loadPreferences(): Promise<NotificationPreferences> {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATION_PREFERENCES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    }
    
    return {
      enabled: false,
      time: '09:00',
      dailyHoroscope: true,
    };
  }

  static async scheduleDailyHoroscope(): Promise<string | null> {
    try {
      const preferences = await this.loadPreferences();
      
      if (!preferences.enabled || !preferences.dailyHoroscope) {
        return null;
      }

      await Notifications.cancelAllScheduledNotificationsAsync();

      const [hours, minutes] = preferences.time.split(':').map(Number);
      
      const notificationContent = {
        title: '✨ Your Daily Horoscope Awaits',
        body: 'Discover what the stars have in store for you today!',
        data: { type: 'daily_horoscope' },
      };

      const identifier = await Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger: {
          hour: hours,
          minute: minutes,
          repeats: true,
        },
      });

      return identifier;
    } catch (error) {
      console.error('Error scheduling daily horoscope notification:', error);
      return null;
    }
  }

  static async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling notifications:', error);
    }
  }

  static async enableNotifications(time: string = '09:00'): Promise<boolean> {
    try {
      const hasPermission = await this.requestPermissions();
      
      if (!hasPermission) {
        return false;
      }

      const preferences: NotificationPreferences = {
        enabled: true,
        time,
        dailyHoroscope: true,
      };

      await this.savePreferences(preferences);
      await this.scheduleDailyHoroscope();
      
      return true;
    } catch (error) {
      console.error('Error enabling notifications:', error);
      return false;
    }
  }

  static async disableNotifications(): Promise<void> {
    try {
      const preferences: NotificationPreferences = {
        enabled: false,
        time: '09:00',
        dailyHoroscope: false,
      };

      await this.savePreferences(preferences);
      await this.cancelAllNotifications();
    } catch (error) {
      console.error('Error disabling notifications:', error);
    }
  }

  static async updateNotificationTime(time: string): Promise<boolean> {
    try {
      const preferences = await this.loadPreferences();
      preferences.time = time;
      
      await this.savePreferences(preferences);
      
      if (preferences.enabled) {
        await this.scheduleDailyHoroscope();
      }
      
      return true;
    } catch (error) {
      console.error('Error updating notification time:', error);
      return false;
    }
  }
}
