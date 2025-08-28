import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import { NavigationProps, JournalEntry } from '../types';
import { format } from 'date-fns';

export const JournalScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const { state, saveJournalEntry, updateJournalEntry, deleteJournalEntry, loadJournalEntries } = useAppContext();
  const [currentEntry, setCurrentEntry] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [mood, setMood] = useState('');
  
  const inputRef = useRef<TextInput>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const today = format(new Date(), 'yyyy-MM-dd');
  const todayEntry = state.journalEntries.find(entry => entry.date === today);

  useEffect(() => {
    loadJournalEntries();
  }, []);

  useEffect(() => {
    if (todayEntry) {
      setCurrentEntry(todayEntry.content);
      setMood(todayEntry.mood || '');
    }
  }, [todayEntry]);

  const handleAutoSave = () => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(async () => {
      if (currentEntry.trim()) {
        if (todayEntry) {
          await updateJournalEntry(todayEntry.id, currentEntry, mood);
        } else {
          saveJournalEntry(currentEntry, mood);
        }
      }
    }, 2000);
  };

  const handleTextChange = (text: string) => {
    console.log('handleTextChange', text);
    setCurrentEntry(text);
    handleAutoSave();
  };

  const handleSave = async () => {
    if (!currentEntry.trim()) {
      Alert.alert('Empty Entry', 'Please write something before saving.');
      return;
    }

    try {
      if (todayEntry) {
        await updateJournalEntry(todayEntry.id, currentEntry, mood);

        Alert.alert('Success', 'Journal entry updated successfully!');
      } else {
        await saveJournalEntry(currentEntry, mood);
        Alert.alert('Success', 'Journal entry saved successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save journal entry. Please try again.');
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setIsEditing(true);
    setEditingId(entry.id);
    setEditingContent(entry.content);
    setMood(entry.mood || '');
  };

  const handleUpdate = async () => {
    if (!editingContent.trim()) {
      Alert.alert('Empty Entry', 'Please write something before updating.');
      return;
    }

    try {
      await updateJournalEntry(editingId!, editingContent, mood);
      setIsEditing(false);
      setEditingId(null);
      setEditingContent('');
      setMood('');
      Alert.alert('Success', 'Journal entry updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update journal entry. Please try again.');
    }
  };

  const handleDelete = (entry: JournalEntry) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteJournalEntry(entry.id);
              Alert.alert('Success', 'Journal entry deleted successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete journal entry. Please try again.');
            }
          },
        },
      ]
    );
  };

  const renderJournalEntry = (entry: JournalEntry) => (
    <View key={entry.id} style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryDate}>
          {format(new Date(entry.date), 'EEEE, MMMM do, yyyy')}
        </Text>
        <View style={styles.entryActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEdit(entry)}
          >
            <Text style={styles.actionButtonText}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDelete(entry)}
          >
            <Text style={styles.actionButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {entry.mood && (
        <View style={styles.moodContainer}>
          <Text style={styles.moodLabel}>Mood:</Text>
          <Text style={styles.moodText}>{entry.mood}</Text>
        </View>
      )}
      
      <Text style={styles.entryContent}>{entry.content}</Text>
      
      <Text style={styles.entryTime}>
        {format(new Date(entry.updatedAt), 'h:mm a')}
      </Text>
    </View>
  );

  if (isEditing) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setIsEditing(false);
                setEditingId(null);
                setEditingContent('');
                setMood('');
              }}
            >
              <Text style={styles.backButtonText}>← Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Entry</Text>
            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>How are you feeling today?</Text>
              <TextInput
                style={styles.moodInput}
                placeholder="e.g., Happy, Calm, Excited..."
                placeholderTextColor="black"
                value={mood}
                onChangeText={setMood}
                maxLength={50}
              />
              
              <Text style={styles.inputLabel}>Your Journal Entry</Text>
              <TextInput
                ref={inputRef}
                style={styles.textInput}
                placeholder="Write about your day, thoughts, or how the horoscope resonated with you..."
                placeholderTextColor="black"
                value={editingContent}
                onChangeText={setEditingContent}
                multiline
                textAlignVertical="top"
                autoFocus
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Journal</Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.todaySection}>
            <Text style={styles.sectionTitle}>Today's Entry</Text>
            <Text style={styles.sectionSubtitle}>
              {format(new Date(), 'EEEE, MMMM do, yyyy')}
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>How are you feeling today?</Text>
              <TextInput
                style={styles.moodInput}
                placeholder="e.g., Happy, Calm, Excited..."
                value={mood}
                onChangeText={setMood}
                maxLength={50}
              />
              
              <Text style={styles.inputLabel}>Your Journal Entry</Text>
              <TextInput
                ref={inputRef}
                style={styles.textInput}
                placeholder="Write about your day, thoughts, or how the horoscope resonated with you..."
                value={currentEntry}
                onChangeText={handleTextChange}
                multiline
                textAlignVertical="top"
              />
              
              <Text style={styles.autoSaveText}>
                💾 Auto-save enabled
              </Text>
            </View>
          </View>

          {state.journalEntries.length > 0 && (
            <View style={styles.previousSection}>
              <Text style={styles.sectionTitle}>Previous Entries</Text>
              {state.journalEntries
                // .filter(entry => entry.date !== today)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map(renderJournalEntry)}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B46C1',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  todaySection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 16,
  },
  moodInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    backgroundColor: '#fff',
  },
  autoSaveText: {
    fontSize: 14,
    color: '#10B981',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  previousSection: {
    marginBottom: 30,
  },
  entryCard: {  
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  entryActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 18,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginRight: 8,
  },
  moodText: {
    fontSize: 14,
    color: '#6B46C1',
    fontWeight: '500',
  },
  entryContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 12,
  },
  entryTime: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
  },
});
