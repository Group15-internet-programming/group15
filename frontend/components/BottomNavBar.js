import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export default function BottomNavBar({ navigation, activeScreen, userType }) {
  const navigateToHome = () => {
    if (userType === 'lecturer') {
      navigation.navigate('LecturerDashboard');
    } else {
      navigation.navigate('Home');
    }
  };

  const navigateToSessions = () => {
    if (userType === 'lecturer') {
      navigation.navigate('LecturerSessions');
    } else {
      navigation.navigate('Sessions');
    }
  };

  const navigateToSettings = () => {
    if (userType === 'lecturer') {
      navigation.navigate('LecturerSettings');
    } else {
      navigation.navigate('Settings');
    }
  };

  return (
    <View style={styles.bottomNavWrapper}>
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={activeScreen === 'Home' ? styles.activeNavItem : styles.bottomNavItem}
          onPress={navigateToHome}
        >
          {activeScreen === 'Home' ? (
            <>
              <Image 
                source={require('../assets/home.png')}
                style={styles.activeNavIcon}
              />
              <Text style={styles.activeNavText}>Home</Text>
            </>
          ) : (
            <Image 
              source={require('../assets/home.png')}
              style={styles.bottomNavIcon}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={activeScreen === 'Sessions' ? styles.activeNavItem : styles.bottomNavItem}
          onPress={navigateToSessions}
        >
          {activeScreen === 'Sessions' ? (
            <>
              <Image 
                source={require('../assets/printer.png')}
                style={styles.activeNavIcon}
              />
              <Text style={styles.activeNavText}>Sessions</Text>
            </>
          ) : (
            <Image 
              source={require('../assets/printer.png')}
              style={styles.bottomNavIcon}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={activeScreen === 'Settings' ? styles.activeNavItem : styles.bottomNavItem}
          onPress={navigateToSettings}
        >
          {activeScreen === 'Settings' ? (
            <>
              <Image 
                source={require('../assets/settings.png')}
                style={styles.activeNavIcon}
              />
              <Text style={styles.activeNavText}>Settings</Text>
            </>
          ) : (
            <Image 
              source={require('../assets/settings.png')}
              style={styles.bottomNavIcon}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavWrapper: {
    paddingHorizontal: 100,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4169E1',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 18,
    height: 36,
    width: '100%',
  },
  bottomNavItem: {
    padding: 4,
  },
  bottomNavIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  activeNavItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
    height: 28,
  },
  activeNavIcon: {
    width: 14,
    height: 14,
    tintColor: '#4169E1',
    marginRight: 3,
  },
  activeNavText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#4169E1',
  },
}); 