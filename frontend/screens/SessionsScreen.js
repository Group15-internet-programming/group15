import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Platform, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppLayout from '../components/AppLayout';
import { getDates, formatDate } from '../utils/dateUtils';
import { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';

export default function SessionsScreen({ navigation }) {
  const [dates, setDates] = useState(getDates());
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const initialSessions = [
    // Today's Sessions
    {
      id: '1',
      course: 'Computer Networks',
      code: 'CEF446',
      time: '8:00am - 10:00am',
      venue: 'Fet-BgfI',
      instructor: 'Dr. Nkemeni Valey',
      date: sessionDates.today,
      status: 'Upcoming',
      timeRemaining: '00:00:00'
    },
    {
      id: '2',
      course: 'Internet Programming',
      code: 'CEF440',
      time: '10:00am - 12:00pm',
      venue: 'Fet-BgfII',
      instructor: 'Dr. Nkemeni Valey',
      date: sessionDates.today,
      status: 'Upcoming',
      timeRemaining: '00:00:00'
    },
    {
      id: '3',
      course: 'Artificial Intelligence',
      code: 'CEF444',
      time: '2:00pm - 4:00pm',
      venue: 'Fet-BgfI',
      instructor: 'Dr. Nkemeni Valey',
      date: sessionDates.today,
      status: 'Upcoming',
      timeRemaining: '00:00:00'
    },
    // Tomorrow's Sessions
    {
      id: '4',
      course: 'Software Engineering',
      code: 'CEF448',
      time: '8:00am - 10:00am',
      venue: 'Fet-BgfII',
      instructor: 'Dr. Nkemeni Valey',
      date: sessionDates.tomorrow,
      status: 'Upcoming',
      timeRemaining: '00:00:00'
    },
    {
      id: '5',
      course: 'Digital Image Processing',
      code: 'CEF462',
      time: '10:00am - 12:00pm',
      venue: 'bgf-hall 1',
      instructor: 'Dr. Nkemeni Valey',
      date: sessionDates.tomorrow,
      status: 'Upcoming',
      timeRemaining: '00:00:00'
    },
    {
      id: '6',
      course: 'Operating Systems',
      code: 'CEF442',
      time: '2:00pm - 4:00pm',
      venue: 'Fet-BgfI',
      instructor: 'Dr. Nkemeni Valey',
      date: sessionDates.tomorrow,
      status: 'Upcoming',
      timeRemaining: '00:00:00'
    }
  ];

  const [sessions, setSessions] = useState(initialSessions);

  const calculateSessionTimes = (session) => {
    try {
      if (!session || !session.date || !session.time) {
        return {
          ...session,
          status: 'Unknown',
          timeRemaining: '00:00:00'
        };
      }

      const now = new Date();
      const [month, day, year] = session.date.split('/').map(num => parseInt(num));
      
      // Validate date parts
      if (!month || !day || !year) {
        return {
          ...session,
          status: 'Unknown',
          timeRemaining: '00:00:00'
        };
      }

      const timeMatch = session.time.split(' - ')[0].match(/(\d+):(\d+)/);
      if (!timeMatch || !timeMatch[1] || !timeMatch[2]) {
        return {
          ...session,
          status: 'Unknown',
          timeRemaining: '00:00:00'
        };
      }

      const [startHour, startMinute] = [timeMatch[1], timeMatch[2]];
      const period = session.time.split(' - ')[0].includes('pm') ? 'pm' : 'am';
      
      const sessionDate = new Date(year, month - 1, day);
      let sessionHour = parseInt(startHour);
      if (period === 'pm' && sessionHour !== 12) {
        sessionHour += 12;
      } else if (period === 'am' && sessionHour === 12) {
        sessionHour = 0;
      }
      
      sessionDate.setHours(sessionHour, parseInt(startMinute), 0, 0);
      
      // Add 2 hours for end time
      const endTime = new Date(sessionDate.getTime() + (2 * 60 * 60 * 1000));
      
      let status;
      let timeRemaining;
      
      if (now < sessionDate) {
        status = 'Upcoming';
        const diff = sessionDate.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        timeRemaining = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      } else if (now >= sessionDate && now < endTime) {
        status = 'Ongoing';
        const diff = endTime.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        timeRemaining = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      } else {
        status = 'Ended';
        timeRemaining = '00:00:00';
      }
      
      return {
        ...session,
        status,
        timeRemaining
      };
    } catch (error) {
      console.error('Error calculating session times:', error);
      return {
        ...session,
        status: 'Unknown',
        timeRemaining: '00:00:00'
      };
    }
  };

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

  useEffect(() => {
    const timer = setInterval(() => {
      setSessions(prevSessions => 
        prevSessions.map(session => calculateSessionTimes(session))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const showCalendar = () => {
    setCalendarVisible(true);
  };

  const hideCalendar = () => {
    setCalendarVisible(false);
  };

  const handleDateSelect = (date) => {
    const selectedDate = new Date(date.timestamp);
    const formattedDate = formatDate(selectedDate);
    
    // Check if the date already exists in the list
    const existingDate = dates.find(d => d.fullDate && d.fullDate.toDateString() === selectedDate.toDateString());
    
    if (existingDate) {
      // If date exists, just select it
      selectDate(existingDate.id);
    } else {
      // If date doesn't exist, add it to the list and select it
      const newDates = [...dates];
      const newDate = { ...formattedDate, isSelected: true };
      
      // Find the correct position to insert the new date
      const insertIndex = newDates.findIndex(d => 
        d.fullDate && d.fullDate > selectedDate
      );
      
      if (insertIndex === -1) {
        newDates.push(newDate);
      } else {
        newDates.splice(insertIndex, 0, newDate);
      }
      
      // Update all other dates to be unselected
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

  // Get current date in YYYY-MM-DD format for calendar
  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };

  // Format selected date for calendar marking
  const getMarkedDates = () => {
    const markedDates = {};
    dates.forEach(date => {
      if (date.fullDate) {
        const dateString = date.fullDate.toISOString().split('T')[0];
        markedDates[dateString] = {
          marked: true,
          dotColor: '#4169E1'
        };
        if (date.isSelected) {
          markedDates[dateString] = {
            ...markedDates[dateString],
            selected: true,
            selectedColor: '#4169E1'
          };
        }
      }
    });
    return markedDates;
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

  return (
    <AppLayout navigation={navigation} activeScreen="Sessions" userType="student">
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
          <TouchableOpacity 
            style={styles.calendarButton}
            onPress={() => setCalendarVisible(true)}
          >
            <Image 
              source={require('../assets/calendar.png')}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.sessionList}>
          {filteredSessions.map(session => (
            <TouchableOpacity
              key={session.id}
              style={styles.sessionCard}
              onPress={() => navigation.navigate('SessionDetails', { session })}
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
                <Text style={[styles.statusText, { color: getStatusColor(session.status) }]}>
                  {session.status}
                </Text>
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
                markedDates={getMarkedDates()}
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