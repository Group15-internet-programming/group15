import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ProfileSettingsScreen({ navigation }) {
  const handleBack = () => {
    navigation.goBack();
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
          <Text style={styles.headerTitle}>Profile Settings</Text>
        </View>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileImage}>
          <Image 
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <View style={styles.infoLabel}>
            <Text style={styles.labelText}>Name</Text>
            <Text style={styles.infoText}>Etundi Michele</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Image 
              source={require('../assets/pen.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.infoItem, styles.infoItemSpacing]}>
          <View style={styles.infoLabel}>
            <Text style={styles.labelText}>Email address</Text>
            <Text style={styles.infoText}>micheletundi@gmail.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Image 
              source={require('../assets/pen.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.infoItem, styles.infoItemSpacing]}>
          <View style={styles.infoLabel}>
            <Text style={styles.labelText}>Phone number</Text>
            <Text style={styles.infoText}>+237 6 77 81 33 29</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Image 
              source={require('../assets/pen.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileIcon: {
    width: 40,
    height: 40,
    tintColor: '#A0A0A0',
  },
  editText: {
    fontSize: 14,
    color: '#4169E1',
  },
  infoSection: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingTop: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  infoItemSpacing: {
    marginTop: 16,
  },
  infoLabel: {
    flex: 1,
  },
  labelText: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#000000',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: '#666666',
  },
}); 