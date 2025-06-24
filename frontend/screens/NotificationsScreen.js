import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

export default function NotificationsScreen({ navigation }) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);

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
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.menuSection}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Push Notifications</Text>
            <Switch 
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: "#E8E8E8", true: "#4169E1" }}
              thumbColor={"#FFFFFF"}
            />
          </View>

          <View style={[styles.menuItem, styles.itemSpacing]}>
            <Text style={styles.menuText}>Email Notifications</Text>
            <Switch 
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: "#E8E8E8", true: "#4169E1" }}
              thumbColor={"#FFFFFF"}
            />
          </View>

          <View style={[styles.menuItem, styles.itemSpacing]}>
            <Text style={styles.menuText}>Sound</Text>
            <Switch 
              value={sound}
              onValueChange={setSound}
              trackColor={{ false: "#E8E8E8", true: "#4169E1" }}
              thumbColor={"#FFFFFF"}
            />
          </View>

          <View style={[styles.menuItem, styles.itemSpacing]}>
            <Text style={styles.menuText}>Vibration</Text>
            <Switch 
              value={vibration}
              onValueChange={setVibration}
              trackColor={{ false: "#E8E8E8", true: "#4169E1" }}
              thumbColor={"#FFFFFF"}
            />
          </View>
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  itemSpacing: {
    marginTop: 16,
  },
  menuText: {
    fontSize: 15,
    color: '#000000',
  },
}); 