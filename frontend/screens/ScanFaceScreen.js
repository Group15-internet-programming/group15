import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import * as FaceDetector from 'expo-face-detector';

export default function ScanFaceScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const cameraRef = useRef(null);
  const scanTimerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    return () => {
      if (scanTimerRef.current) {
        clearInterval(scanTimerRef.current);
      }
    };
  }, []);

  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0 && !scanning) {
      setFaceDetected(true);
      startScanning();
    } else if (faces.length === 0) {
      setFaceDetected(false);
      if (scanning) {
        stopScanning();
      }
    }
  };

  const startScanning = () => {
    setScanning(true);
    setScanProgress(0);
    scanTimerRef.current = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          stopScanning();
          onScanComplete();
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const stopScanning = () => {
    if (scanTimerRef.current) {
      clearInterval(scanTimerRef.current);
      scanTimerRef.current = null;
    }
    setScanning(false);
  };

  const onScanComplete = () => {
    Alert.alert(
      'Face Scan Complete',
      'Your face has been successfully registered.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home')
        }
      ]
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea}>
            {faceDetected && (
              <View style={[styles.progressBar, { width: `${scanProgress}%` }]} />
            )}
          </View>
          <Text style={styles.instruction}>
            {!faceDetected 
              ? 'Position your face in the center'
              : scanning 
                ? 'Hold still...'
                : 'Face detected'
            }
          </Text>
        </View>
      </Camera>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4169E1',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 125,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: '#4169E1',
  },
  instruction: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#4169E1',
    fontSize: 16,
    fontWeight: '600',
  },
}); 