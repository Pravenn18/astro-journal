import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Horoscope } from '../types';
import { format } from 'date-fns';

interface HoroscopeCardProps {
  horoscope: Horoscope | null;
  isLoading: boolean;
  error: string | null;
}

export const HoroscopeCard: React.FC<HoroscopeCardProps> = ({
  horoscope,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B46C1" />
        <Text style={styles.loadingText}>Reading the stars...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!horoscope) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>✨</Text>
        <Text style={styles.emptyText}>Select your zodiac sign to see your daily horoscope</Text>
      </View>
    );
  }

  const today = format(new Date(), 'EEEE, MMMM do');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{today}</Text>
        <Text style={styles.signText}>{horoscope.sign.toUpperCase()}</Text>
      </View>

      <View style={styles.horoscopeContent}>
        <Text style={styles.horoscopeText}>{horoscope.horoscope}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Mood</Text>
            <Text style={styles.detailValue}>{horoscope.mood}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Lucky Number</Text>
            <Text style={styles.detailValue}>{horoscope.luckyNumber}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Lucky Time</Text>
            <Text style={styles.detailValue}>{horoscope.luckyTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Compatibility</Text>
            <Text style={styles.detailValue}>{horoscope.compatibility}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ✨ The stars have spoken for today ✨
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 5,
  },
  signText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6B46C1',
    letterSpacing: 2,
  },
  horoscopeContent: {
    marginBottom: 20,
  },
  horoscopeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderRadius: 20,
    padding: 40,
    margin: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    padding: 40,
    margin: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
});
