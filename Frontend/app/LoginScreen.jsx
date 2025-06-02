import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* Graduation Cap Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🎓</Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter ID or email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#6b7280"
          />
        </View>

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#6b7280"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIcon}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Sign Up Section */}
        <View style={styles.signupSection}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* Back Button */}
        <Link href="/WelcomeScreen" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back to Welcome</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 28,
    backgroundColor: '#f9fafb',
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 384,
    width: '100%',
    marginHorizontal: "auto",
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  icon: {
    fontSize: 80,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    color: '#374151',
    fontSize: 16,
    borderWidth: 0,
  },
  passwordContainer: {
    width: '100%',
    marginBottom: 24,
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  eyeIcon: {
    fontSize: 18,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  signupSection: {
    alignItems: 'center',
    width: '100%',
  },
  signupText: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 16,
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#374151',
    fontWeight: '500',
    fontSize: 16,
  },
  backButton: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  backButtonText: {
    color: '#6b7280',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default LoginScreen;