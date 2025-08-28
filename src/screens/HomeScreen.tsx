import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import { ZodiacSignPicker } from '../components/ZodiacSignPicker';
import { HoroscopeCard } from '../components/HoroscopeCard';
import { NavigationProps } from '../types';

export const HomeScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const { 
    state, 
    setZodiacSign, 
    enableNotifications, 
    disableNotifications 
  } = useAppContext();
  const [selectedSign, setSelectedSign] = useState(state.selectedZodiacSign);

  const handleSignChange = (sign: string) => {
    setSelectedSign(sign);
  };

  const handleWriteJournal = () => {
    navigation.navigate('Journal');
  };

  const handleNotificationToggle = async () => {
    if (state.notificationPreferences.enabled) {
      await disableNotifications();
      Alert.alert('Notifications Disabled', 'Daily horoscope notifications have been turned off.');
    } else {
      const success = await enableNotifications();
      if (success) {
        Alert.alert(
          'Notifications Enabled!', 
          'You\'ll receive daily horoscope notifications at 9:00 AM. You can change the time in settings later.'
        );
      } else {
        Alert.alert(
          'Permission Denied', 
          'Please enable notifications in your device settings to receive daily horoscope updates.'
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>✨ Astro Journal</Text>
          <Text style={styles.subtitle}>Discover what the stars have in store for you</Text>
        </View>

        <ZodiacSignPicker
          selectedSign={selectedSign}
          onSignChange={handleSignChange}
        />

        <HoroscopeCard
          horoscope={state.currentHoroscope}
          isLoading={state.isLoading}
          error={state.error}
        />

        <TouchableOpacity style={styles.journalButton} onPress={handleWriteJournal}>
          <Text style={styles.journalButtonText}>✍️ Write Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.notificationButton, 
            state.notificationPreferences.enabled && styles.notificationButtonActive
          ]} 
          onPress={handleNotificationToggle}
        >
          <Text style={[
            styles.notificationButtonText,
            state.notificationPreferences.enabled && styles.notificationButtonTextActive
          ]}>
            {state.notificationPreferences.enabled ? '🔔 Notifications ON' : '🔕 Notifications OFF'}
          </Text>
        </TouchableOpacity>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Daily Features</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🌟</Text>
              <Text style={styles.featureText}>Daily Horoscope</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📝</Text>
              <Text style={styles.featureText}>Journal Entries</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔮</Text>
              <Text style={styles.featureText}>Zodiac Insights</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💫</Text>
              <Text style={styles.featureText}>Lucky Numbers</Text>
            </View>
          </View>
        </View>

        <View style={styles.insightContainer}>
          <Text style={styles.insightTitle}>💭 Today's Reflection</Text>
          <Text style={styles.insightText}>
            Take a moment to reflect on how the cosmic energies are influencing your day. 
            Journal your thoughts and feelings to deepen your connection with the universe.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  journalButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginHorizontal: 16,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  journalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  notificationButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  notificationButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  notificationButtonTextActive: {
    color: '#fff',
  },
  featuresContainer: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  insightContainer: {
    backgroundColor: '#EDE9FE',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6B46C1',
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B46C1',
    marginBottom: 10,
  },
  insightText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#5B21B6',
  },
});
