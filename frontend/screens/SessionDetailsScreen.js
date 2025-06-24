import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppLayout from '../components/AppLayout';
import { useState, useEffect } from 'react';

export default function SessionDetailsScreen({ navigation, route }) {
  const session = route.params?.session || {};
  const userType = route.params?.userType || 'student';
  const [timeRemaining, setTimeRemaining] = useState(session.timeRemaining || '00:00:00');
  const [status, setStatus] = useState(session.status || 'Upcoming');

  useEffect(() => {
    if (!session || !session.date || !session.time) {
      setStatus('Unknown');
      setTimeRemaining('00:00:00');
      return;
    }

    const timer = setInterval(() => {
      try {
        const now = new Date();
        const [month, day, year] = session.date.split('/').map(num => parseInt(num));
        
        if (!month || !day || !year) {
          setStatus('Unknown');
          setTimeRemaining('00:00:00');
          return;
        }

        const timeMatch = session.time.split(' - ')[0].match(/(\d+):(\d+)/);
        if (!timeMatch || !timeMatch[1] || !timeMatch[2]) {
          setStatus('Unknown');
          setTimeRemaining('00:00:00');
          return;
        }

        const [startHour, startMinute] = [timeMatch[1], timeMatch[2]];
        const startPeriod = session.time.split(' - ')[0].includes('pm') ? 'pm' : 'am';
        
        const sessionDate = new Date(year, month - 1, day);
        let sessionHour = parseInt(startHour);
        if (startPeriod === 'pm' && sessionHour !== 12) {
          sessionHour += 12;
        } else if (startPeriod === 'am' && sessionHour === 12) {
          sessionHour = 0;
        }
        
        sessionDate.setHours(sessionHour, parseInt(startMinute), 0, 0);
        
        const sessionEndTime = new Date(sessionDate.getTime() + (2 * 60 * 60 * 1000));
        
        if (now < sessionDate) {
          setStatus('Upcoming');
          const diff = sessionDate.getTime() - now.getTime();
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeRemaining(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        } else if (now >= sessionDate && now < sessionEndTime) {
          setStatus('Ongoing');
          const diff = sessionEndTime.getTime() - now.getTime();
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeRemaining(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        } else {
          setStatus('Ended');
          setTimeRemaining('00:00:00');
        }
      } catch (error) {
        console.error('Error updating session times:', error);
        setStatus('Unknown');
        setTimeRemaining('00:00:00');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [session]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ended':
        return '#FF0000';
      case 'Ongoing':
        return '#4CAF50';
      case 'Upcoming':
        return '#666666';
      default:
        return '#666666';
    }
  };

  const handleCancelSession = () => {
    // Here you would implement the session cancellation logic
    // For now, we'll just navigate back
    navigation.goBack();
  };

  const renderActionButton = () => {
    if (userType === 'lecturer') {
      if (status === 'Upcoming') {
        return (
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancelSession}
          >
            <Image 
              source={require('../assets/document.png')}
              style={[styles.buttonIcon, { tintColor: '#FFFFFF' }]}
            />
            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Cancel Session</Text>
          </TouchableOpacity>
        );
      } else if (status === 'Ongoing') {
        return (
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
          >
            <Image 
              source={require('../assets/document.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Take Attendance</Text>
          </TouchableOpacity>
        );
      }
      // For 'Ended' status, no action button is shown
      return null;
    } else {
      // Student view - original Take Attendance button
      return (
        <TouchableOpacity 
          style={[
            styles.button,
            status === 'Ongoing' ? styles.primaryButton : styles.disabledButton
          ]}
          disabled={status !== 'Ongoing'}
        >
          <Image 
            source={require('../assets/document.png')}
            style={[
              styles.buttonIcon,
              status !== 'Ongoing' && styles.disabledButtonIcon
            ]}
          />
          <Text style={[
            styles.buttonText,
            status !== 'Ongoing' && styles.disabledButtonText
          ]}>Take Attendance</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <AppLayout navigation={navigation} activeScreen="Sessions" userType={userType}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../assets/arrow.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Session Details</Text>
        </View>

        <View style={styles.content}>
          {/* Instructor Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileRow}>
              <View style={styles.avatarCircle}>
                <Image 
                  source={require('../assets/profile.png')}
                  style={styles.avatarIcon}
                />
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>Dr Nkemni Valery</Text>
                <Text style={styles.profileDesc} numberOfLines={1}>Faculty of Engineering, Fac...</Text>
              </View>
            </View>
          </View>

          {/* Course Details Card */}
          <View style={styles.card}>
            <View style={styles.courseInfo}>
              <Image 
                source={require('../assets/book.png')}
                style={[styles.icon, styles.bookIcon]}
              />
              <Text style={styles.courseName}>{session.course}</Text>
            </View>
            <View style={styles.codeRow}>
              <Text style={styles.hashSymbol}>#</Text>
              <Text style={styles.courseCode}>{session.code}</Text>
            </View>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Image 
                  source={require('../assets/calendar.png')}
                  style={[styles.icon, styles.calendarIcon]}
                />
                <Text style={styles.detailLabel}>Day:</Text>
                <Text style={styles.detailText}>Today</Text>
              </View>

              <View style={styles.detailRow}>
                <Image 
                  source={require('../assets/clock.png')}
                  style={[styles.icon, styles.clockIcon]}
                />
                <Text style={styles.detailLabel}>Time:</Text>
                <Text style={styles.detailText}>{session.time}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Image 
                  source={require('../assets/location.png')}
                  style={[styles.icon, styles.locationIcon]}
                />
                <Text style={styles.detailLabel}>Venue:</Text>
                <Text style={styles.detailText}>{session.venue}</Text>
              </View>

              <View style={styles.durationContainer}>
                <View style={styles.durationPill}>
                  <Text style={styles.durationText}>Duration: 2 hours</Text>
                </View>
              </View>
            </View>

            <View style={styles.statusContainer}>
              <View style={styles.statusSection}>
                <Text style={styles.sectionLabel}>Status</Text>
                <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
                  {status}
                </Text>
              </View>
              <View style={styles.timeSection}>
                <Text style={styles.sectionLabel}>Time Remaining</Text>
                <Text style={styles.timeText}>{timeRemaining}</Text>
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {renderActionButton()}

            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate('StudentCourseHistory', { 
                course: session.course, 
                code: session.code,
                userType: userType
              })}
            >
              <Image 
                source={require('../assets/chart.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>History and Statistics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="dark" />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#4169E1',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#4169E1',
    textAlign: 'center',
    marginRight: 36, // To center the title accounting for back button
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
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
    alignSelf: 'center',
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
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
    marginTop: 2,
  },
  bookIcon: {
    tintColor: '#4169E1',
  },
  clockIcon: {
    tintColor: '#FFA000',
  },
  locationIcon: {
    tintColor: '#FF0000',
  },
  calendarIcon: {
    tintColor: '#4CAF50',
  },
  courseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4169E1',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hashSymbol: {
    fontSize: 14,
    color: '#666666',
    marginRight: 4,
  },
  courseCode: {
    fontSize: 14,
    color: '#666666',
  },
  detailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 16,
    minHeight: 24,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
    width: 60,
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  durationContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  durationPill: {
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  durationText: {
    fontSize: 12,
    color: '#4169E1',
  },
  statusContainer: {
    flexDirection: 'row',
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  statusSection: {
    flex: 1,
    alignItems: 'center',
  },
  timeSection: {
    flex: 1,
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  buttonContainer: {
    gap: 12,
    padding: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: '#4169E1',
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#FFFFFF',
  },
  disabledButtonIcon: {
    tintColor: '#999999',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  disabledButtonText: {
    color: '#999999',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
}); 