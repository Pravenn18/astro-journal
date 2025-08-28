import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ZODIAC_SIGNS, getZodiacSignById } from '../constants/zodiacSigns';
import { useAppContext } from '../context/AppContext';

interface ZodiacSignPickerProps {
  selectedSign: string;
  onSignChange: (sign: string) => void;
}

const { width } = Dimensions.get('window');

export const ZodiacSignPicker: React.FC<ZodiacSignPickerProps> = ({
  selectedSign,
  onSignChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { setZodiacSign } = useAppContext();

  const handleSignSelect = (signId: string) => {
    onSignChange(signId);
    setZodiacSign(signId);
    setModalVisible(false);
  };

  const selectedZodiac = getZodiacSignById(selectedSign);

  const renderZodiacItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.zodiacItem,
        selectedSign === item.id && styles.selectedZodiacItem,
      ]}
      onPress={() => handleSignSelect(item.id)}
    >
      <Text style={styles.zodiacSymbol}>{item.symbol}</Text>
      <View style={styles.zodiacInfo}>
        <Text style={[
          styles.zodiacName,
          selectedSign === item.id && styles.selectedZodiacName,
        ]}>
          {item.name}
        </Text>
        <Text style={[
          styles.zodiacDates,
          selectedSign === item.id && styles.selectedZodiacDates,
        ]}>
          {item.dates}
        </Text>
      </View>
      <View style={styles.zodiacTraits}>
        <Text style={[
          styles.zodiacElement,
          selectedSign === item.id && styles.selectedZodiacElement,
        ]}>
          {item.element}
        </Text>
        <Text style={[
          styles.zodiacQuality,
          selectedSign === item.id && styles.selectedZodiacQuality,
        ]}>
          {item.quality}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerButtonText}>Select Zodiac Sign</Text>
        <Text style={styles.selectedSignText}>
          {selectedZodiac ? `${selectedZodiac.symbol} ${selectedZodiac.name}` : 'Choose...'}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Your Zodiac Sign</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={ZODIAC_SIGNS}
              renderItem={renderZodiacItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  pickerButton: {
    backgroundColor: '#6B46C1',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pickerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  selectedSignText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width * 0.9,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  listContainer: {
    padding: 20,
  },
  zodiacItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedZodiacItem: {
    backgroundColor: '#EDE9FE',
    borderColor: '#6B46C1',
  },
  zodiacSymbol: {
    fontSize: 32,
    marginRight: 15,
    color: '#6B46C1',
  },
  zodiacInfo: {
    flex: 1,
  },
  zodiacName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  selectedZodiacName: {
    color: '#6B46C1',
  },
  zodiacDates: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedZodiacDates: {
    color: '#8B5CF6',
  },
  zodiacTraits: {
    alignItems: 'flex-end',
  },
  zodiacElement: {
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  selectedZodiacElement: {
    backgroundColor: '#C4B5FD',
    color: '#6B46C1',
  },
  zodiacQuality: {
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedZodiacQuality: {
    backgroundColor: '#C4B5FD',
    color: '#6B46C1',
  },
});
