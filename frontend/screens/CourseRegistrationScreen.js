import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

export default function CourseRegistrationScreen({ navigation }) {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);

  const courses = [
    { id: '1', code: 'CEF440', name: 'Internet Programming' },
    { id: '2', code: 'CEF440', name: 'Internet Programming' },
    { id: '3', code: 'CEF440', name: 'Internet Programming' },
    { id: '4', code: 'CEF440', name: 'Internet Programming' },
    { id: '5', code: 'CEF440', name: 'Internet Programming' },
  ];

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Registration</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.selectors}>
          <TouchableOpacity style={styles.selector}>
            <Text style={styles.selectorText}>Select level</Text>
            <Text style={styles.selectorArrow}>▼</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.selector}>
            <Text style={styles.selectorText}>2024/2025</Text>
            <Text style={styles.selectorArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.coursesSection}>
          <Text style={styles.sectionTitle}>Available Courses</Text>
          
          <ScrollView style={styles.coursesList}>
            {courses.map((course) => (
              <TouchableOpacity 
                key={course.id}
                style={styles.courseItem}
                onPress={() => toggleCourseSelection(course.id)}
              >
                <View style={styles.checkbox}>
                  {selectedCourses.includes(course.id) && (
                    <View style={styles.checkboxInner} />
                  )}
                </View>
                
                <Image 
                  source={require('../assets/book.png')}
                  style={styles.courseIcon}
                />
                
                <View style={styles.courseDetails}>
                  <Text style={styles.courseName}>{course.name}</Text>
                  <Text style={styles.courseCode}>{course.code}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity 
          style={[
            styles.registerButton,
            selectedCourses.length === 0 && styles.registerButtonDisabled
          ]}
          disabled={selectedCourses.length === 0}
        >
          <Text style={styles.registerButtonText}>
            Register Selected courses
          </Text>
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
  },
  selectors: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  selector: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  selectorText: {
    fontSize: 14,
    color: '#666666',
  },
  selectorArrow: {
    fontSize: 10,
    color: '#666666',
  },
  coursesSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4169E1',
    marginBottom: 12,
  },
  coursesList: {
    flex: 1,
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
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#4169E1',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: '#4169E1',
    borderRadius: 2,
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
  courseCode: {
    fontSize: 12,
    color: '#666666',
    opacity: 0.8,
  },
  registerButton: {
    margin: 16,
    height: 48,
    backgroundColor: '#4169E1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 