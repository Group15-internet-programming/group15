import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function ProfilePictureScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    try {
      if (!cameraPermission) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Please enable camera access in your device settings.',
            [{ text: 'OK' }]
          );
          return;
        }
        setCameraPermission(true);
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log('Camera result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        console.log('Captured image URI:', result.assets[0].uri);
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error taking picture:', error);
      Alert.alert(
        'Error',
        'Could not access camera. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.headerText}>Add Profile Photo</Text>
        <TouchableOpacity onPress={takePicture} style={styles.profileButton}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <>
              <View style={styles.placeholderCircle}>
                <Image 
                  source={require('../assets/profile.png')} 
                  style={styles.placeholderImage}
                />
                <View style={styles.addIconContainer}>
                  <Text style={styles.addIcon}>+</Text>
                </View>
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.doneButton}
        onPress={() => {
          console.log('Navigating to Home screen');
          navigation.replace('Home');
        }}
      >
        <Text style={styles.doneButtonText}>
          Done
        </Text>
      </TouchableOpacity>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4169E1',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  profileButton: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  placeholderCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  placeholderImage: {
    width: 80,
    height: 80,
    tintColor: '#CCCCCC',
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  addIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -2,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  doneButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  doneButtonText: {
    color: '#4169E1',
    fontSize: 16,
    fontWeight: '600',
  },
}); 