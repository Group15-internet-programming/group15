import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function PreferencesScreen({ navigation }) {
  const [language, setLanguage] = useState('english');
  const [theme, setTheme] = useState('light');
  const [soundEffects, setSoundEffects] = useState('on');
  const [showPicker, setShowPicker] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const getDisplayValue = (key) => {
    const options = {
      language: { english: 'English', french: 'French', spanish: 'Spanish' },
      theme: { light: 'Light', dark: 'Dark', system: 'System' },
      soundEffects: { on: 'On', off: 'Off' }
    };
    const values = {
      language,
      theme,
      soundEffects
    };
    return options[key][values[key]];
  };

  const renderPicker = () => {
    let items = [];
    let currentValue = '';
    let setValue = null;

    switch(showPicker) {
      case 'language':
        items = [
          { label: 'English', value: 'english' },
          { label: 'French', value: 'french' },
          { label: 'Spanish', value: 'spanish' }
        ];
        currentValue = language;
        setValue = setLanguage;
        break;
      case 'theme':
        items = [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
          { label: 'System', value: 'system' }
        ];
        currentValue = theme;
        setValue = setTheme;
        break;
      case 'soundEffects':
        items = [
          { label: 'On', value: 'on' },
          { label: 'Off', value: 'off' }
        ];
        currentValue = soundEffects;
        setValue = setSoundEffects;
        break;
    }

    return (
      <Modal
        visible={!!showPicker}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.pickerHeader}>
              <TouchableOpacity 
                onPress={() => setShowPicker('')}
                style={styles.doneButton}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={currentValue}
              onValueChange={(value) => {
                setValue(value);
                setShowPicker('');
              }}
            >
              {items.map((item) => (
                <Picker.Item 
                  key={item.value} 
                  label={item.label} 
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Image 
            source={require('../assets/arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Preferences</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => setShowPicker('language')}
          >
            <Text style={styles.menuText}>Language</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>{getDisplayValue('language')}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.itemSpacing]}
            onPress={() => setShowPicker('theme')}
          >
            <Text style={styles.menuText}>Theme</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>{getDisplayValue('theme')}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.itemSpacing]}
            onPress={() => setShowPicker('soundEffects')}
          >
            <Text style={styles.menuText}>Sound effects</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>{getDisplayValue('soundEffects')}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {renderPicker()}
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 45 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    marginTop: 35,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#4169E1',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4169E1',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  menuSection: {
    backgroundColor: '#F5F5F5',
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    height: 56,
  },
  itemSpacing: {
    marginTop: 16,
  },
  menuText: {
    fontSize: 15,
    color: '#000000',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 15,
    color: '#666666',
    marginRight: 8,
  },
  chevron: {
    fontSize: 20,
    color: '#666666',
    transform: [{ rotate: '90deg' }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  doneButton: {
    padding: 8,
  },
  doneButtonText: {
    color: '#4169E1',
    fontSize: 16,
    fontWeight: '600',
  },
}); 