import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // 'student' or 'lecturer'

  useEffect(() => {
    // Load saved credentials on mount
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('savedEmail');
        const savedPassword = await AsyncStorage.getItem('savedPassword');
        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
      } catch (e) {
        // Ignore errors
      }
    };
    loadCredentials();
  }, []);

  const handleLogin = async () => {
    if (userType === 'student') {
      await AsyncStorage.setItem('savedEmail', email);
      await AsyncStorage.setItem('savedPassword', password);
      navigation.navigate('Home');
    } else {
      // Dummy lecturer account
      if (email === 'lecturer@unitrack.com' && password === 'lecturer123') {
        await AsyncStorage.setItem('savedEmail', email);
        await AsyncStorage.setItem('savedPassword', password);
        navigation.navigate('LecturerDashboard');
      } else {
        Alert.alert('Login Failed', 'Invalid lecturer credentials.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../assets/favicon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <View style={styles.userTypeContainer}>
          <TouchableOpacity 
            style={[
              styles.userTypeButton,
              userType === 'student' && styles.userTypeButtonActive
            ]}
            onPress={() => setUserType('student')}
          >
            <Text style={[
              styles.userTypeText,
              userType === 'student' && styles.userTypeTextActive
            ]}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.userTypeButton,
              userType === 'lecturer' && styles.userTypeButtonActive
            ]}
            onPress={() => setUserType('lecturer')}
          >
            <Text style={[
              styles.userTypeText,
              userType === 'lecturer' && styles.userTypeTextActive
            ]}>Lecturer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter ID or email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image 
                source={require('../assets/eyeicon.png')}
                style={[
                  styles.eye,
                  !showPassword && styles.eyeHidden
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>Don't have an account yet?</Text>
        <TouchableOpacity 
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupButtonText}>Sign up</Text>
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
    paddingTop: 150,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: '#4169E1',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 24,
    
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 12,
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eye: {
    width: '100%',
    height: '100%',
    tintColor: '#4169E1',
  },
  eyeHidden: {
    opacity: 0.5,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4169E1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    color: '#666666',
    marginBottom: 12,
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  signupButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  userTypeContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  userTypeButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userTypeText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  userTypeTextActive: {
    color: '#4169E1',
    fontWeight: '600',
  },
}); 