import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import AppLayout from '../components/AppLayout';

export default function LecturerDashboard({ navigation }) {
  return (
    <AppLayout navigation={navigation} activeScreen="Home" userType="lecturer">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../assets/favicon.png')} style={styles.headerIcon} />
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>UniTrack</Text>
          </View>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatarCircle}>
              <Image source={require('../assets/profile.png')} style={styles.avatarIcon} />
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>Dr Nkemni Valery</Text>
              <Text style={styles.profileDesc} numberOfLines={1}>Faculty of Engineering, Fac...</Text>
            </View>
          </View>
        </View>

        {/* Main Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('LecturerHistory')}>
            <Image source={require('../assets/filter.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Filter History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('LecturerCourses')}>
            <Image source={require('../assets/document.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Courses</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 20 : 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 72,
    paddingTop: 0,
    paddingHorizontal: 18,
    backgroundColor: '#FFF',
    marginBottom: 12,
  },
  headerIcon: {
    width: 32,
    height: 32,
    tintColor: '#4169E1',
    marginRight: 0,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -32,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4169E1',
    textAlign: 'center',
  },
  profileCard: {
    width: '92%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarIcon: {
    width: 32,
    height: 32,
    tintColor: '#A0A0A0',
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4169E1',
    marginBottom: 2,
  },
  profileDesc: {
    fontSize: 13,
    color: '#888',
  },
  actionRow: {
    width: '92%',
    alignItems: 'center',
  },
  actionCard: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    width: 40,
    height: 40,
    tintColor: '#4169E1',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 16,
    color: '#4169E1',
    fontWeight: '600',
  },
}); 