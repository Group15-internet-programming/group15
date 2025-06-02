import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function WelcomeScreen() {
  const [pulseOpacity1, setPulseOpacity1] = useState(0.6);
  const [pulseOpacity2, setPulseOpacity2] = useState(0.6);
  const [pulseOpacity3, setPulseOpacity3] = useState(0.6);

  useEffect(() => {
    const createPulseAnimation = (setOpacity, delay = 0) => {
      const animate = () => {
        setTimeout(() => {
          setOpacity(1);
          setTimeout(() => {
            setOpacity(0.6);
            setTimeout(animate, 750);
          }, 750);
        }, delay);
      };
      animate();
    };

    createPulseAnimation(setPulseOpacity1, 0);
    createPulseAnimation(setPulseOpacity2, 200);
    createPulseAnimation(setPulseOpacity3, 400);
  }, []);

  const handleGetStarted = () => {
    console.log('Navigating to LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* UniTrack Logo Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🎓</Text>
        </View>

        {/* UniTrack Text */}
        <Text style={styles.title}>UniTrack</Text>

        {/* Illustration Placeholder */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationContent}>
            <Text style={styles.illustrationIcon}>📚</Text>
            <Text style={styles.illustrationText}>Track Your Progress</Text>
          </View>
        </View>

        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, { opacity: pulseOpacity1 }]} />
            <View style={[styles.dot, { opacity: pulseOpacity2 }]} />
            <View style={[styles.dot, { opacity: pulseOpacity3 }]} />
          </View>
        </View>

        {/* Get Started Button */}
        <Link href="/LoginScreen" asChild>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
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
    backgroundColor: '#3b82f6',
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 384,
    width: '100%',
    marginHorizontal: "auto",
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
  },
  icon: {
    fontSize: 120,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 10 },
    textShadowRadius: 15,
  },
  title: {
    color: 'white',
    fontSize: 48,
    fontWeight: '300',
    letterSpacing: 0.8,
    textAlign: 'center',
    margin: 0,
    marginBottom: 32,
  },
  illustrationContainer: {
    marginBottom: 32,
    width: '100%',
    maxWidth: 280,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContent: {
    alignItems: 'center',
  },
  illustrationIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  illustrationText: {
    fontSize: 14,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  loadingContainer: {
    marginBottom: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 4,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    minWidth: 140,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});