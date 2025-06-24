import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function StudentCourseHistoryScreen({ navigation, route }) {
  // Dummy data (replace with real data as needed)
  const courseCode = route.params?.code || 'CEF440';
  const courseName = route.params?.course || 'Internet Programming';
  const totalSessions = 20;
  const attendancePercent = 80;
  const attended = 16;
  const missed = 4;
  const history = [
    { date: '30/05/2025', time: '7AM - 9AM', status: 'Present' },
    { date: '30/05/2025', time: '1PM - 3PM', status: 'Absent' },
    { date: '30/05/2025', time: '7AM - 9AM', status: 'Present' },
    { date: '30/05/2025', time: '7AM - 9AM', status: 'Present' },
    { date: '30/05/2025', time: '7AM - 9AM', status: 'Present' },
    { date: '30/05/2025', time: '7AM - 9AM', status: 'Present' },
    { date: '30/05/2025', time: '7AM - 9AM', status: 'Present' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../assets/arrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{courseCode}</Text>
      </View>

      <View style={styles.courseNameBox}>
        <Text style={styles.courseNameText}>{courseName}</Text>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Overall Average Attendance(%)</Text>
        <View style={styles.statsRow}>
          <View style={styles.statsLeft}>
            <Text style={styles.statsLabel}>Total Sessions</Text>
            <Text style={styles.statsValue}>{totalSessions}</Text>
          </View>
          <View style={styles.statsCenter}>
            <View style={styles.progressCircle}>
              <View style={styles.progressArc} />
              <Text style={styles.progressText}>{attendancePercent}%</Text>
            </View>
          </View>
          <View style={styles.statsRight}>
            <Text style={styles.attendedLabel}>Attended:</Text>
            <Text style={styles.attendedValue}>{attended}</Text>
            <Text style={styles.missedLabel}>Missed:</Text>
            <Text style={styles.missedValue}>{missed}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Date</Text>
          <Text style={styles.tableHeaderText}>Time</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
        </View>
        <ScrollView style={styles.tableBody} contentContainerStyle={{ paddingBottom: 24 }}>
          {history.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.date}</Text>
              <Text style={styles.tableCell}>{item.time}</Text>
              <Text style={[styles.tableCell, item.status === 'Present' ? styles.present : styles.absent]}>{item.status}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
    paddingTop: Platform.OS === 'android' ? 35 : 45,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    marginBottom: 4,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    marginLeft: 4,
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#4169E1',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4169E1',
    flex: 1,
    textAlign: 'center',
    marginRight: 30,
  },
  courseNameBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  courseNameText: {
    color: '#4169E1',
    fontWeight: '700',
    fontSize: 15,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    elevation: 1,
  },
  statsTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsLeft: {
    alignItems: 'center',
    flex: 1,
  },
  statsLabel: {
    fontSize: 12,
    color: '#666666',
  },
  statsValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4169E1',
    marginTop: 4,
  },
  statsCenter: {
    flex: 1,
    alignItems: 'center',
  },
  progressCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 8,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  progressArc: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 8,
    borderColor: '#4169E1',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
  },
  progressText: {
    position: 'absolute',
    fontWeight: 'bold',
    color: '#4169E1',
    fontSize: 16,
    alignSelf: 'center',
  },
  statsRight: {
    alignItems: 'flex-start',
    flex: 1,
  },
  attendedLabel: {
    color: '#666',
    fontSize: 12,
  },
  attendedValue: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  missedLabel: {
    color: '#E53935',
    fontSize: 12,
  },
  missedValue: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 8,
    padding: 12,
    elevation: 1,
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
    marginBottom: 4,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    color: '#4169E1',
    fontSize: 14,
    textAlign: 'left',
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    margin: 25,
  },
  tableCell: {
    flex: 1,
    fontSize: 13,
    color: '#222',
  },
  present: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  absent: {
    color: '#E53935',
    fontWeight: 'bold',
  },
}); 