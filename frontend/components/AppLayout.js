import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import BottomNavBar from './BottomNavBar';

export default function AppLayout({ children, navigation, activeScreen, userType = 'student' }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
      <BottomNavBar navigation={navigation} activeScreen={activeScreen} userType={userType} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  content: {
    flex: 1,
  },
}); 