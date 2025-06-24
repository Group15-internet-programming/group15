import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SecurityScreen({ navigation }) {
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
          <Text style={styles.headerTitle}>Security</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Change password</Text>
          </TouchableOpacity>

          <View style={[styles.menuItem, styles.itemSpacing]}>
            <Text style={styles.menuText}>Two-Step Verification</Text>
            <Switch 
              value={false}
              trackColor={{ false: "#E8E8E8", true: "#4169E1" }}
              thumbColor={"#FFFFFF"}
            />
          </View>

          <View style={[styles.menuItem, styles.itemSpacing]}>
            <Text style={styles.menuText}>Location sharing</Text>
            <Switch 
              value={false}
              trackColor={{ false: "#E8E8E8", true: "#4169E1" }}
              thumbColor={"#FFFFFF"}
            />
          </View>

          <View style={[styles.menuItem, styles.itemSpacing]}>
            <Text style={styles.menuText}>Active Sessions</Text>
            <Text style={styles.sessionCount}>2</Text>
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
  sessionCount: {
    fontSize: 15,
    color: '#666666',
  },
}); 