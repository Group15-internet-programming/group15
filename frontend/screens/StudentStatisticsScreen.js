import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Platform, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function StudentStatisticsScreen({ navigation }) {
  const courses = [
    { id: '1', code: 'CEF440', name: 'Internet Programming', attendance: 100 },
    { id: '2', code: 'CEF441', name: 'Artificial Intelligence', attendance: 95 },
    { id: '3', code: 'CEF442', name: 'XML and Document', attendance: 85 },
    { id: '4', code: 'CEF443', name: 'Software eng and design', attendance: 90 },
  ];

  const totalSessions = 112;
  const attendancePercentage = 40;
  const present = 45;
  const missed = 47;

  const renderCircularProgress = () => {
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressCircle}>
          <View style={styles.progressInner}>
            <Text style={styles.progressPercentage}>{attendancePercentage}%</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderBarChart = () => {
    const data = [80, 20, 40, 90]; // Example data points
    const maxValue = Math.max(...data);
    const width = (Dimensions.get('window').width - 64) / data.length - 16;

    return (
      <View style={styles.barChartContainer}>
        {data.map((value, index) => (
          <View key={index} style={styles.barWrapper}>
            <View style={[styles.bar, { height: (value / maxValue) * 150 }]} />
          </View>
        ))}
      </View>
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
        <Text style={styles.headerTitle}>Student Statistics</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.overallStats}>
          <Text style={styles.statsTitle}>Overall Average Attendance(%)</Text>
          <View style={styles.statsContent}>
            <View style={styles.totalSessions}>
              <Text style={styles.totalSessionsLabel}>Total Sessions</Text>
              <Text style={styles.totalSessionsValue}>{totalSessions}</Text>
            </View>
            {renderCircularProgress()}
            <View style={styles.attendanceStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Present</Text>
                <Text style={[styles.statValue, styles.presentValue]}>{present}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Missed</Text>
                <Text style={[styles.statValue, styles.missedValue]}>{missed}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Attendance overview(Charts)</Text>
          <View style={styles.barChart}>
            {renderBarChart()}
          </View>
        </View>

        <View style={styles.courseSection}>
          <Text style={styles.sectionTitle}>Attendance per Course</Text>
          {courses.map((course) => (
            <View key={course.id} style={styles.courseItem}>
              <View style={styles.courseInfo}>
                <Image 
                  source={require('../assets/book.png')}
                  style={styles.courseIcon}
                />
                <View style={styles.courseDetails}>
                  <Text style={styles.courseName}>{course.name}</Text>
                  <Text style={styles.courseCode}>{course.code}</Text>
                </View>
              </View>
              <Text style={styles.attendancePercentage}>{course.attendance}%</Text>
            </View>
          ))}
        </View>
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
  },
  overallStats: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statsTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalSessions: {
    alignItems: 'flex-start',
  },
  totalSessionsLabel: {
    fontSize: 12,
    color: '#666666',
  },
  totalSessionsValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4169E1',
    marginTop: 4,
  },
  progressContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 10,
    borderColor: '#E8E9ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '140deg' }],
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4169E1',
    transform: [{ rotate: '-140deg' }],
  },
  attendanceStats: {
    alignItems: 'flex-end',
  },
  statItem: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  presentValue: {
    color: '#4CAF50',
  },
  missedValue: {
    color: '#F44336',
  },
  chartSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  barChart: {
    height: 200,
    // Placeholder for chart
  },
  courseSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 2,
  },
  courseCode: {
    fontSize: 12,
    color: '#666666',
  },
  attendancePercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4169E1',
  },
  barChartContainer: {
    flexDirection: 'row',
    height: 180,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  barWrapper: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  bar: {
    width: '80%',
    backgroundColor: '#4169E1',
    opacity: 0.8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
}); 