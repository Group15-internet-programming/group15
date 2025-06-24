import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function LecturerHistory({ navigation }) {
  const [selectedCourse, setSelectedCourse] = useState('Internet Programming');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('01/05/2025');
  const [selectedTime, setSelectedTime] = useState('7AM - 9AM');
  const [activeFilter, setActiveFilter] = useState('date');

  const courses = [
    { id: '1', name: 'Internet Programming' },
    { id: '2', name: 'Artificial Intelligence' },
    { id: '3', name: 'Software Engineering' },
  ];
  const times = [
    '7AM - 9AM',
    '1PM - 3PM',
    '3PM - 5PM',
  ];
  const history = [
    { name: 'Neba Nelly', id: 'FE22A255', status: 'Present' },
    { name: 'Ekane CLinton', id: 'FE22A198', status: 'Present' },
    { name: 'Fai Nji', id: 'FE22A215', status: 'Present' },
    { name: 'Etundi Zambo', id: 'FE22A212', status: 'Present' },
    { name: 'Ngwa Nathan', id: 'FE22A268', status: 'Present' },
    { name: 'No Name', id: 'FE22A---', status: 'Absent' },
    { name: 'No Name', id: 'FE22A---', status: 'Absent' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('LecturerDashboard')}>
          <Image source={require('../assets/arrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter History</Text>
      </View>

      {/* Filter Toggle Card */}
      <View style={styles.filterToggleCard}>
        <Text style={styles.filterLabel}>Filter By:</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, activeFilter === 'date' && styles.toggleButtonActive]}
            onPress={() => setActiveFilter('date')}
          >
            <Image source={require('../assets/calendar.png')} style={styles.toggleIcon} />
            <Text style={[styles.toggleText, activeFilter === 'date' && styles.toggleTextActive]}>Date and time</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, activeFilter === 'name' && styles.toggleButtonActive]}
            onPress={() => { setActiveFilter('name'); navigation.navigate('LecturerHistoryName'); }}
          >
            <Text style={[styles.toggleText, activeFilter === 'name' && styles.toggleTextActive]}>Name or ID</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Card */}
      <View style={styles.filterCard}>
        {/* Course Dropdown */}
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownTouchable} onPress={() => setDropdownOpen(!dropdownOpen)}>
            <Text style={styles.dropdownText}>{selectedCourse}</Text>
            <Image source={require('../assets/arrow.png')} style={[styles.dropdownArrow, { transform: [{ rotate: '270deg' }] }]} />
          </TouchableOpacity>
          {dropdownOpen && (
            <View style={styles.dropdownList}>
              {courses.map((course) => (
                <TouchableOpacity key={course.id} style={styles.dropdownItem} onPress={() => { setSelectedCourse(course.name); setDropdownOpen(false); }}>
                  <Text style={styles.dropdownItemText}>{course.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {/* Date and Time Pickers */}
        <View style={styles.dateTimeRow}>
          <TouchableOpacity style={styles.datePicker}>
            <Text style={styles.datePickerText}>{selectedDate}</Text>
            <Image source={require('../assets/calendar.png')} style={styles.datePickerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.timePicker}>
            <Text style={styles.timePickerText}>{selectedTime}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Table */}
      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>ID</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
        </View>
        <ScrollView style={styles.tableBody} contentContainerStyle={{ paddingBottom: 24 }}>
          {history.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.id}</Text>
              <Text style={[styles.tableCell, item.status === 'Present' ? styles.present : styles.absent]}>{item.status}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Floating Download Button */}
      <TouchableOpacity style={styles.downloadButton}>
        <Image source={require('../assets/download.png')} style={styles.downloadIcon} />
      </TouchableOpacity>
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
  filterToggleCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    elevation: 1,
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    marginBottom: 0,
    gap: 8,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#4169E1',
  },
  toggleIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFF',
    marginRight: 6,
  },
  toggleText: {
    fontSize: 14,
    color: '#4169E1',
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#FFF',
  },
  filterCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    elevation: 1,
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 0,
    marginBottom: 10,
    marginTop: 2,
  },
  dropdownTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dropdownText: {
    flex: 1,
    color: '#888',
    fontSize: 15,
  },
  dropdownArrow: {
    width: 16,
    height: 16,
    tintColor: '#888',
  },
  dropdownList: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginTop: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#4169E1',
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  datePicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 2,
    marginTop: 2,
  },
  datePickerText: {
    flex: 1,
    color: '#888',
    fontSize: 15,
  },
  datePickerIcon: {
    width: 18,
    height: 18,
    tintColor: '#888',
    marginLeft: 6,
  },
  timePicker: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 2,
    marginTop: 2,
    justifyContent: 'center',
  },
  timePickerText: {
    color: '#888',
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
    margin: 15,
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
  downloadButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: 'transparent',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  downloadIcon: {
    width: 28,
    height: 28,
    tintColor: '#FFF',
  },
}); 