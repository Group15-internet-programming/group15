import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfilePictureScreen from './screens/ProfilePictureScreen';
import HomeScreen from './screens/HomeScreen';
import CourseRegistrationScreen from './screens/CourseRegistrationScreen';
import RegisteredCoursesScreen from './screens/RegisteredCoursesScreen';
import StudentStatisticsScreen from './screens/StudentStatisticsScreen';
import SessionsScreen from './screens/SessionsScreen';
import SessionDetailsScreen from './screens/SessionDetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileSettingsScreen from './screens/ProfileSettingsScreen';
import SecurityScreen from './screens/SecurityScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import LecturerDashboard from './screens/LecturerDashboard';
import LecturerCourses from './screens/LecturerCourses';
import LecturerHistory from './screens/LecturerHistory';
import StudentCourseHistoryScreen from './screens/StudentCourseHistoryScreen';
import LecturerSessionsScreen from './screens/LecturerSessionsScreen';
import LecturerHistoryName from './screens/LecturerHistoryName';
import LecturerSettingsScreen from './screens/LecturerSettingsScreen';
import 'react-native-gesture-handler';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image 
          source={require('./assets/favicon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>UniTrack</Text>
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
      </View>
      <StatusBar style="light" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade'
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LecturerDashboard" component={LecturerDashboard} />
        <Stack.Screen name="LecturerCourses" component={LecturerCourses} />
        <Stack.Screen name="LecturerHistory" component={LecturerHistory} />
        <Stack.Screen name="CourseRegistration" component={CourseRegistrationScreen} />
        <Stack.Screen name="RegisteredCourses" component={RegisteredCoursesScreen} />
        <Stack.Screen name="StudentStatistics" component={StudentStatisticsScreen} />
        <Stack.Screen name="Sessions" component={SessionsScreen} />
        <Stack.Screen name="SessionDetails" component={SessionDetailsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="LecturerSettings" component={LecturerSettingsScreen} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Preferences" component={PreferencesScreen} />
        <Stack.Screen name="StudentCourseHistory" component={StudentCourseHistoryScreen} />
        <Stack.Screen name="LecturerSessions" component={LecturerSessionsScreen} />
        <Stack.Screen name="LecturerHistoryName" component={LecturerHistoryName} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4169E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    tintColor: '#FFFFFF',
  },
  title: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  loader: {
    marginTop: 20
  }
});
