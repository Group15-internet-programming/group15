import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function RegisteredCoursesScreen({ navigation }) {
  const courses = [
    { id: '1', code: 'CEF440', name: 'Internet Programming', lecturer: 'Nkemeni Valery' },
    { id: '2', code: 'CEF440', name: 'Internet Programming', lecturer: 'Nkemeni Valery' },
    { id: '3', code: 'CEF440', name: 'Internet Programming', lecturer: 'Nkemeni Valery' },
    { id: '4', code: 'CEF440', name: 'Internet Programming', lecturer: 'Nkemeni Valery' },
    { id: '5', code: 'CEF440', name: 'Internet Programming', lecturer: 'Nkemeni Valery' },
    { id: '6', code: 'CEF440', name: 'Internet Programming', lecturer: 'Nkemeni Valery' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registered Courses</Text>
      </View>

      <ScrollView style={styles.content}>
        {courses.map((course) => (
          <TouchableOpacity 
            key={course.id}
            style={styles.courseItem}
            onPress={() => {/* Handle course selection */}}
          >
            <Image 
              source={require('../assets/book.png')}
              style={styles.courseIcon}
            />
            
            <View style={styles.courseDetails}>
              <Text style={styles.courseName}>{course.name}</Text>
              <View style={styles.courseInfo}>
                <Text style={styles.courseCode}>{course.code}</Text>
                <Text style={styles.lecturerName}>{course.lecturer}</Text>
              </View>
            </View>

            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  backButtonText: {
    fontSize: 24,
    color: '#4169E1',
    marginTop: -2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4169E1',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  courseIcon: {
    width: 20,
    height: 20,
    tintColor: '#4169E1',
    marginRight: 12,
  },
  courseDetails: {
    flex: 1,
  },
  courseName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4169E1',
    marginBottom: 4,
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseCode: {
    fontSize: 12,
    color: '#666666',
    opacity: 0.8,
    marginRight: 8,
  },
  lecturerName: {
    fontSize: 12,
    color: '#666666',
    opacity: 0.8,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#666666',
    opacity: 0.3,
    marginLeft: 8,
  },
}); 