import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppLayout from '../components/AppLayout';

export default function SettingsScreen({ navigation }) {
  return (
    <AppLayout navigation={navigation} activeScreen="Settings" userType="student">
      <View style={styles.container}>
        <View style={styles.header}>
          <Image 
            source={require('../assets/settings.png')}
            style={styles.headerIcon}
          />
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.userSection}>
          <View style={styles.userInfo}>
            <View style={styles.profileImage}>
              <Image 
                source={require('../assets/profile.png')}
                style={styles.profileIcon}
              />
            </View>
            <Text style={styles.userName}>Etundi Michele</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('ProfileSettings')}
          >
            <View style={styles.menuIconContainer}>
              <Image 
                source={require('../assets/profile.png')}
                style={styles.menuIcon}
              />
            </View>
            <Text style={styles.menuText}>Profile Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Security')}
          >
            <View style={styles.menuIconContainer}>
              <Image 
                source={require('../assets/lock.png')}
                style={styles.menuIcon}
              />
            </View>
            <Text style={styles.menuText}>Security</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Notifications')}
          >
            <View style={styles.menuIconContainer}>
              <Image 
                source={require('../assets/bell.png')}
                style={styles.menuIcon}
              />
            </View>
            <Text style={styles.menuText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Preferences')}
          >
            <View style={styles.menuIconContainer}>
              <Image 
                source={require('../assets/preference.png')}
                style={styles.menuIcon}
              />
            </View>
            <Text style={styles.menuText}>Preferences</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="dark" />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: '#4169E1',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4169E1',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileIcon: {
    width: 24,
    height: 24,
    tintColor: '#A0A0A0',
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4169E1',
  },
  logoutText: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '500',
  },
  menuSection: {
    paddingTop: 8,
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  menuIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: '#000000',
  },
  menuText: {
    fontSize: 16,
    color: '#000000',
  },
}); 