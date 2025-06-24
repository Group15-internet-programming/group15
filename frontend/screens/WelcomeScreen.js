import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../assets/favicon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image 
          source={require('../assets/image.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome!</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Continue</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: '#4169E1',
    marginBottom: 20,
  },
  illustration: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4169E1',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4169E1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  buttonArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
