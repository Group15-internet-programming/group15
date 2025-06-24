import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Platform, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppLayout from '../components/AppLayout';
import { getDates, formatDate } from '../utils/dateUtils';
import { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';

export default function LecturerSessionsScreen({ navigation, route }) {
  const [dates, setDates] = useState(getDates());
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);
  const showBackButton = route.params?.showBackButton;

  const getTodayAndTomorrowDates = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    return {
      today: `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`,
      tomorrow: `${String(tomorrow.getMonth() + 1).padStart(2, '0')}/${String(tomorrow.getDate()).padStart(2, '0')}/${tomorrow.getFullYear()}`
    };
  };

  const sessionDates = getTodayAndTomorrowDates();

  const getSessionStatus = (timeString) => {
    const now = new Date();
    const [startTime, endTime] = timeString.split(' - ');
    
    // Convert time strings to Date objects
    const [startHour, startMinute] = startTime.slice(0, -2).split(':').map(Number);
    const [endHour, endMinute] = endTime.slice(0, -2).split(':').map(Number);
    
    const sessionStart = new Date(now);
    sessionStart.setHours(
      startTime.includes('pm') && startHour !== 12 ? startHour + 12 : startHour,
      startMinute,
      0
    );

    const sessionEnd = new Date(now);
    sessionEnd.setHours(
      endTime.includes('pm') && endHour !== 12 ? endHour + 12 : endHour,
      endMinute,
      0
    );

    if (now < sessionStart) {
      return 'Upcoming';
    } else if (now >= sessionStart && now <= sessionEnd) {
      return 'Ongoing';
    } else {
      return 'Ended';
    }
  };

  useEffect(() => {
    // Initialize sessions with real-time status
    const initialSessions = [
      {
        id: '1',
        course: 'Internet Programming',
        code: 'CEF440',
        time: '13:00pm - 15:00pm',
        venue: 'Fet-BgfI',
        date: sessionDates.today,
      },
      {
        id: '2',
        course: 'Digital Image Processing',
        code: 'CEF462',
        time: '15:00pm - 17:00pm',
        venue: 'bgf-hall 1',
        date: sessionDates.today,
      },
      {
        id: '3',
        course: 'Artificial Intelligence',
        code: 'CEF444',
        time: '17:00pm - 19:00pm',
        venue: 'Fet-BgfI',
        date: sessionDates.today,
      },
    ].map(session => ({
      ...session,
      status: getSessionStatus(session.time)
    }));

    setSessions(initialSessions);

    // Update status every minute
    const intervalId = setInterval(() => {
      setSessions(currentSessions => 
        currentSessions.map(session => ({
          ...session,
          status: getSessionStatus(session.time)
        }))
      );
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [sessionDates.today]);

  const selectDate = (selectedId) => {
    setDates(prevDates => prevDates.map(date => ({
      ...date,
      isSelected: date.id === selectedId
    })));

    const selectedDateObj = dates.find(date => date.id === selectedId)?.fullDate;
    if (selectedDateObj) {
      setSelectedDate(selectedDateObj);
    }
  };

  // Filter sessions based on selected date
  const filteredSessions = sessions.filter(session => {
    if (!session.date) return false;
    const [month, day, year] = session.date.split('/').map(num => parseInt(num));
    const sessionDate = new Date(year, month - 1, day);
    return (
      sessionDate.getDate() === selectedDate.getDate() &&
      sessionDate.getMonth() === selectedDate.getMonth() &&
      sessionDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const showCalendar = () => {
    setCalendarVisible(true);
  };

  const hideCalendar = () => {
    setCalendarVisible(false);
  };

  const handleDateSelect = (date) => {
    const selectedDate = new Date(date.timestamp);
    const formattedDate = formatDate(selectedDate);
    
    const existingDate = dates.find(d => d.fullDate && d.fullDate.toDateString() === selectedDate.toDateString());
    
    if (existingDate) {
      selectDate(existingDate.id);
    } else {
      const newDates = [...dates];
      const newDate = { ...formattedDate, isSelected: true };
      const insertIndex = newDates.findIndex(d => d.fullDate && d.fullDate > selectedDate);
      if (insertIndex === -1) {
        newDates.push(newDate);
      } else {
        newDates.splice(insertIndex, 0, newDate);
      }
      newDates.forEach(d => {
        if (d.id !== newDate.id) {
          d.isSelected = false;
        }
      });
      setDates(newDates);
    }
    setSelectedDate(selectedDate);
    hideCalendar();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ended':
        return '#FF0000';
      case 'Ongoing':
        return '#4CAF50';
      case 'Upcoming':
        return '#FFA000';
      default:
        return '#666666';
    }
  };

  const handleSessionPress = (session) => {
    navigation.navigate('SessionDetails', {
      session,
      userType: 'lecturer'
    });
  };

  return (
    <AppLayout navigation={navigation} activeScreen="Sessions" userType="lecturer">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('LecturerDashboard')}
          >
            <Image 
              source={require('../assets/arrow.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sessions</Text>
        </View>

        <View style={styles.dateBarContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.dateBar}
            contentContainerStyle={styles.dateBarContent}
          >
            {dates.map(date => (
              !date.isCalendar && (
                <TouchableOpacity
                  key={date.id}
                  style={[styles.dateButton, date.isSelected && styles.selectedDateButton]}
                  onPress={() => selectDate(date.id)}
                >
                  <Text style={[styles.dayText, date.isSelected && styles.selectedDateText]}>
                    {date.day}
                  </Text>
                  <Text style={[styles.dateText, date.isSelected && styles.selectedDateText]}>
                    {date.date}
                  </Text>
                </TouchableOpacity>
              )
            ))}
          </ScrollView>
          {!showBackButton && (
            <TouchableOpacity 
              style={styles.calendarButton}
              onPress={() => setCalendarVisible(true)}
            >
              <Image 
                source={require('../assets/calendar.png')}
                style={styles.calendarIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView style={styles.sessionList}>
          {filteredSessions.map(session => (
            <TouchableOpacity
              key={session.id}
              style={styles.sessionCard}
              onPress={() => handleSessionPress(session)}
            >
              <View style={styles.sessionContent}>
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
                <View style={styles.sessionDetails}>
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
                </View>
              </View>
              <View style={styles.rightContent}>
                <Text style={[styles.statusText, { color: getStatusColor(session.status) }]}> {session.status} </Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Modal
          visible={isCalendarVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setCalendarVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setCalendarVisible(false)}
          >
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={handleDateSelect}
                markedDates={{}}
                theme={{
                  todayTextColor: '#4169E1',
                  selectedDayBackgroundColor: '#4169E1',
                  arrowColor: '#4169E1',
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>
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
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#4169E1',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4169E1',
    flex: 1,
    textAlign: 'center',
    marginRight: 32, // To center the title accounting for the back button width
  },
  dateBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
    paddingRight: 8,
  },
  dateBar: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dateBarContent: {
    flexGrow: 1,
  },
  dateButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#E8EAF6',
    borderRadius: 20,
    marginRight: 6,
    alignItems: 'center',
    minWidth: 45,
    height: 36,
    justifyContent: 'center',
  },
  selectedDateButton: {
    backgroundColor: '#4169E1',
  },
  dayText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 1,
  },
  dateText: {
    fontSize: 9,
    color: '#666666',
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  calendarButton: {
    backgroundColor: '#E8EAF6',
    padding: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  calendarIcon: {
    width: 14,
    height: 14,
    tintColor: '#4169E1',
  },
  sessionList: {
    flex: 1,
    padding: 16,
  },
  sessionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  sessionContent: {
    flex: 1,
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
  courseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4169E1',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  sessionDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  chevron: {
    fontSize: 24,
    color: '#666666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    width: '90%',
  },
}); 