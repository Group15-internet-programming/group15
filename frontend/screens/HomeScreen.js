import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppLayout from '../components/AppLayout';

export default function HomeScreen({ navigation }) {
  return (
    <AppLayout navigation={navigation} activeScreen="Home" userType="student">
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/favicon.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>UniTrack</Text>
        </View>
      </View>

      <View style={styles.userCard}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={require('../assets/profile.png')}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Etundi Michele</Text>
            <Text style={styles.userDetail}>FE22A221</Text>
            <Text style={styles.userDetail}>Computer Engineering</Text>
            <Text style={styles.userDetail}>Level 400</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuGrid}>
        <View style={styles.menuRow}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('CourseRegistration')}
          >
            <Image 
              source={require('../assets/document.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Course{'\n'}Registration</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('RegisteredCourses')}
          >
            <Image 
              source={require('../assets/book.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Courses{'\n'}Registered</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.statisticsItem}
          onPress={() => navigation.navigate('StudentStatistics')}
        >
          <Image 
            source={require('../assets/chart.png')}
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Student{'\n'}Statistics</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 28,
    height: 28,
    tintColor: '#4169E1',
  },
  logoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4169E1',
    marginLeft: 8,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  profileImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileImage: {
    width: 32,
    height: 32,
    tintColor: '#A0A0A0',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4169E1',
    marginBottom: 6,
  },
  userDetail: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 19,
  },
  menuGrid: {
    padding: 16,
    flex: 1,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
  },
  menuItem: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statisticsItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    aspectRatio: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  menuIcon: {
    width: 32,
    height: 32,
    marginBottom: 12,
    tintColor: '#4169E1',
    opacity: 0.9,
  },
  menuText: {
    fontSize: 13,
    color: '#4169E1',
    textAlign: 'center',
    lineHeight: 17,
    opacity: 0.9,
  },
}); 