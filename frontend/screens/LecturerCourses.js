import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

// Dummy data for courses
const courses = [
  { id: '1', name: 'Internet Programming', code: 'CEF440', students: 80 },
  { id: '2', name: 'Internet Programming', code: 'CEF440', students: 100 },
  { id: '3', name: 'Internet Programming', code: 'CEF440', students: 75 },
  { id: '4', name: 'Internet Programming', code: 'CEF440', students: 121 },
  { id: '5', name: 'Internet Programming', code: 'CEF440', students: 200 },
];

export default function LecturerCourses({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('LecturerDashboard')}>
          {/* Replace with your own arrow icon if available */}
          <Image source={require('../assets/arrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Courses</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statsCard}>
          <Image source={require('../assets/document.png')} style={styles.statsIcon} />
          <Text style={styles.statsNumber}>8</Text>
          <Text style={styles.statsLabel}>Active Courses</Text>
        </View>
        <View style={styles.statsCard}>
          {/* Please add a group icon as group.png in assets if not present */}
          <Image source={require('../assets/group.png')} style={styles.statsIcon} />
          <Text style={styles.statsNumber}>534</Text>
          <Text style={styles.statsLabel}>Total Students</Text>
        </View>
      </View>

      {/* Course List */}
      <ScrollView style={styles.courseList} contentContainerStyle={{ paddingBottom: 24 }}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseCard}
            onPress={() => navigation.navigate('LecturerHistory', { courseName: course.name, courseCode: course.code })}
          >
            <View style={styles.courseInfoRow}>
              <Image source={require('../assets/document.png')} style={styles.courseIcon} />
              <View style={styles.courseTextContainer}>
                <Text style={styles.courseName}>{course.name}</Text>
                <View style={styles.courseCodeRow}>
                  <Text style={styles.hash}>#</Text>
                  <Text style={styles.courseCode}>{course.code}</Text>
                </View>
              </View>
              <Text style={styles.arrow}>&#8250;</Text>
            </View>
            <Text style={styles.studentCount}>{course.students} students</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 45,
    paddingBottom: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingHorizontal: 12,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
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
    marginRight: 30, // To center title with back button
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
    marginBottom: 8,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 18,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statsIcon: {
    width: 32,
    height: 32,
    tintColor: '#4169E1',
    marginBottom: 4,
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4169E1',
  },
  statsLabel: {
    fontSize: 13,
    color: '#4169E1',
    marginTop: 2,
    textAlign: 'center',
  },
  courseList: {
    flex: 1,
    paddingHorizontal: 8,
  },
  courseCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  courseInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseIcon: {
    width: 28,
    height: 28,
    tintColor: '#4169E1',
    marginRight: 12,
  },
  courseTextContainer: {
    flex: 1,
  },
  courseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4169E1',
    marginBottom: 2,
  },
  courseCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hash: {
    fontSize: 13,
    color: '#888',
    marginRight: 2,
  },
  courseCode: {
    fontSize: 13,
    color: '#888',
  },
  arrow: {
    fontSize: 28,
    color: '#C0C0C0',
    marginLeft: 8,
    marginRight: 2,
  },
  studentCount: {
    fontSize: 13,
    color: '#888',
    marginTop: 6,
    marginLeft: 40,
  },
}); 