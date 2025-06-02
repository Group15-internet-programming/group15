import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function UniTrackSplash() {
  const pulseAnim1 = useRef(new Animated.Value(0.6)).current;
  const pulseAnim2 = useRef(new Animated.Value(0.6)).current;
  const pulseAnim3 = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const createPulseAnimation = (animValue, delay = 0) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: 750,
            delay: delay,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0.6,
            duration: 750,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = createPulseAnimation(pulseAnim1, 0);
    const animation2 = createPulseAnimation(pulseAnim2, 200);
    const animation3 = createPulseAnimation(pulseAnim3, 400);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* UniTrack Logo Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🎓</Text>
        </View>
        
        {/* UniTrack Text */}
        <Text style={styles.title}>UniTrack</Text>
        
        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <View style={styles.dotsContainer}>
            <Animated.View 
              style={[
                styles.dot,
                { opacity: pulseAnim1 }
              ]} 
            />
            <Animated.View 
              style={[
                styles.dot,
                { opacity: pulseAnim2 }
              ]} 
            />
            <Animated.View 
              style={[
                styles.dot,
                { opacity: pulseAnim3 }
              ]} 
            />
          </View>
        </View>

        {/* Navigation Button */}
        <Link href="/WelcomeScreen" asChild>
          <TouchableOpacity style={styles.button}>
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
  },
  loadingContainer: {
    marginTop: 48,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
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
    marginTop: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});