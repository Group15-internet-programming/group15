import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, Modal, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

const ComboBox = ({ placeholder, items, selectedValue, onValueChange, enabled = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = items.find(item => item.value === selectedValue);

  return (
    <View style={[styles.comboBoxContainer, !enabled && styles.comboBoxDisabled]}>
      <TouchableOpacity 
        style={styles.comboBoxButton} 
        onPress={() => enabled && setIsOpen(true)}
        activeOpacity={enabled ? 1 : 0.7}
      >
        <Text style={[
          styles.comboBoxText, 
          !selectedItem && styles.comboBoxPlaceholder
        ]}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Text style={styles.comboBoxArrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1} 
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.dropdownContainer}>
            <ScrollView style={styles.dropdownScroll}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.dropdownItem,
                    item.value === selectedValue && styles.dropdownItemSelected
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setIsOpen(false);
                  }}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    item.value === selectedValue && styles.dropdownItemTextSelected,
                    item.value === "" && styles.dropdownItemPlaceholder
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default function SignupScreen({ navigation }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    matricNumber: '',
    email: '',
    faculty: '',
    department: '',
    level: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [availableDepartments, setAvailableDepartments] = useState([]);

  const faculties = [
    { label: "Enter a Faculty", value: "" },
    { label: "Faculty of Engineering", value: "engineering" },
    { label: "Faculty of Sciences", value: "sciences" },
    { label: "Faculty of Arts", value: "arts" },
    { label: "Faculty of Social Sciences", value: "social_sciences" },
    { label: "Faculty of Management Sciences", value: "management" },
    { label: "Faculty of Environmental Sciences", value: "environmental" },
    { label: "Faculty of Agriculture", value: "agriculture" },
    { label: "Faculty of Education", value: "education" },
    { label: "Faculty of Law", value: "law" },
    { label: "Faculty of Medicine", value: "medicine" }
  ];

  const departmentsByFaculty = {
    engineering: [
      { label: "Select Department", value: "" },
      { label: "Computer Engineering", value: "computer_eng" },
      { label: "Electrical Engineering", value: "electrical_eng" },
      { label: "Mechanical Engineering", value: "mechanical_eng" },
      { label: "Civil Engineering", value: "civil_eng" },
      { label: "Chemical Engineering", value: "chemical_eng" },
      { label: "Systems Engineering", value: "systems_eng" },
      { label: "Petroleum Engineering", value: "petroleum_eng" },
      { label: "Agricultural Engineering", value: "agricultural_eng" },
      { label: "Mechatronics Engineering", value: "mechatronics_eng" }
    ],
    sciences: [
      { label: "Select Department", value: "" },
      { label: "Computer Science", value: "computer_science" },
      { label: "Mathematics", value: "mathematics" },
      { label: "Physics", value: "physics" },
      { label: "Chemistry", value: "chemistry" },
      { label: "Biology", value: "biology" },
      { label: "Biochemistry", value: "biochemistry" },
      { label: "Microbiology", value: "microbiology" },
      { label: "Statistics", value: "statistics" },
      { label: "Geology", value: "geology" }
    ],
    arts: [
      { label: "Select Department", value: "" },
      { label: "English Language", value: "english" },
      { label: "History & International Studies", value: "history" },
      { label: "Philosophy", value: "philosophy" },
      { label: "Religious Studies", value: "religious_studies" },
      { label: "Theatre Arts", value: "theatre_arts" },
      { label: "Music", value: "music" },
      { label: "Foreign Languages", value: "foreign_languages" },
      { label: "Linguistics", value: "linguistics" }
    ],
    social_sciences: [
      { label: "Select Department", value: "" },
      { label: "Economics", value: "economics" },
      { label: "Political Science", value: "political_science" },
      { label: "Psychology", value: "psychology" },
      { label: "Sociology", value: "sociology" },
      { label: "Mass Communication", value: "mass_comm" },
      { label: "International Relations", value: "international_relations" },
      { label: "Public Administration", value: "public_admin" }
    ],
    management: [
      { label: "Select Department", value: "" },
      { label: "Business Administration", value: "business_admin" },
      { label: "Accounting", value: "accounting" },
      { label: "Banking and Finance", value: "banking_finance" },
      { label: "Marketing", value: "marketing" },
      { label: "Human Resource Management", value: "hr_management" },
      { label: "Insurance", value: "insurance" },
      { label: "Entrepreneurship", value: "entrepreneurship" }
    ],
    environmental: [
      { label: "Select Department", value: "" },
      { label: "Architecture", value: "architecture" },
      { label: "Urban & Regional Planning", value: "urban_planning" },
      { label: "Estate Management", value: "estate_management" },
      { label: "Building Technology", value: "building_tech" },
      { label: "Quantity Surveying", value: "quantity_surveying" },
      { label: "Environmental Management", value: "environmental_mgt" }
    ],
    agriculture: [
      { label: "Select Department", value: "" },
      { label: "Agricultural Economics", value: "agric_economics" },
      { label: "Animal Science", value: "animal_science" },
      { label: "Crop Science", value: "crop_science" },
      { label: "Soil Science", value: "soil_science" },
      { label: "Agricultural Extension", value: "agric_extension" },
      { label: "Fisheries", value: "fisheries" },
      { label: "Forestry", value: "forestry" }
    ],
    education: [
      { label: "Select Department", value: "" },
      { label: "Educational Management", value: "edu_management" },
      { label: "Science Education", value: "science_education" },
      { label: "Arts Education", value: "arts_education" },
      { label: "Social Science Education", value: "social_science_edu" },
      { label: "Educational Technology", value: "edu_technology" },
      { label: "Guidance & Counselling", value: "guidance_counselling" }
    ],
    law: [
      { label: "Select Department", value: "" },
      { label: "Law", value: "law" },
      { label: "International Law & Jurisprudence", value: "international_law" },
      { label: "Commercial Law", value: "commercial_law" },
      { label: "Private Law", value: "private_law" }
    ],
    medicine: [
      { label: "Select Department", value: "" },
      { label: "Medicine & Surgery", value: "medicine_surgery" },
      { label: "Nursing Science", value: "nursing" },
      { label: "Medical Laboratory Science", value: "medical_lab" },
      { label: "Pharmacy", value: "pharmacy" },
      { label: "Physiotherapy", value: "physiotherapy" },
      { label: "Dentistry", value: "dentistry" },
      { label: "Radiography", value: "radiography" }
    ]
  };

  const levels = [
    { label: "Select level", value: "" },
    { label: "100 Level", value: "100" },
    { label: "200 Level", value: "200" },
    { label: "300 Level", value: "300" },
    { label: "400 Level", value: "400" },
    { label: "500 Level", value: "500" }
  ];

  useEffect(() => {
    if (formData.faculty) {
      setAvailableDepartments(departmentsByFaculty[formData.faculty] || [{ label: "Select Department", value: "" }]);
      setFormData(prev => ({ ...prev, department: '' }));
    } else {
      setAvailableDepartments([{ label: "Select Department", value: "" }]);
    }
  }, [formData.faculty]);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../assets/favicon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.inputContainer}>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(value) => handleChange('firstName', value)}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(value) => handleChange('lastName', value)}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter Matriculation number"
            value={formData.matricNumber}
            onChangeText={(value) => handleChange('matricNumber', value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ComboBox
            placeholder="Enter a Faculty"
            items={faculties}
            selectedValue={formData.faculty}
            onValueChange={(value) => handleChange('faculty', value)}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <ComboBox
                placeholder="Select Department"
                items={availableDepartments}
                selectedValue={formData.department}
                onValueChange={(value) => handleChange('department', value)}
                enabled={!!formData.faculty}
              />
            </View>
            <View style={styles.halfInput}>
              <ComboBox
                placeholder="Select level"
                items={levels}
                selectedValue={formData.level}
                onValueChange={(value) => handleChange('level', value)}
              />
            </View>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image 
                source={require('../assets/eyeicon.png')}
                style={[styles.eye, !showPassword && styles.eyeHidden]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Image 
                source={require('../assets/eyeicon.png')}
                style={[styles.eye, !showConfirmPassword && styles.eyeHidden]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate('ProfilePicture')}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>

          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: '#4169E1',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
  pickerContainer: {
    position: 'relative',
    width: '100%',
  },
  pickerInput: {
    backgroundColor: '#F5F5F5',
    color: '#666666',
    paddingRight: 40,
  },
  hiddenPicker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'transparent',
    color: '#666666',
    fontSize: 16,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 12,
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eye: {
    width: '100%',
    height: '100%',
    tintColor: '#4169E1',
  },
  eyeHidden: {
    opacity: 0.5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4169E1',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  buttonArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loginText: {
    color: '#666666',
    marginBottom: 12,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  iosPicker: {
    backgroundColor: '#F5F5F5',
  },
  dropdownIcon: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  dropdownIconText: {
    color: '#666666',
    fontSize: 12,
  },
  comboBoxContainer: {
    width: '100%',
  },
  comboBoxDisabled: {
    opacity: 0.5,
  },
  comboBoxButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
  },
  comboBoxText: {
    fontSize: 16,
    flex: 1,
    color: 'rgba(147, 147, 148, 0.6)',
    textAlign: 'left',
    textAlignVertical: 'center',
    height: 50,
    paddingTop: 10,
    paddingBottom: 0,
  },
  comboBoxPlaceholder: {
    color: 'rgba(60, 60, 67, 0.6)',
  },
  comboBoxArrow: {
    color: 'rgba(60, 60, 67, 0.6)',
    fontSize: 10,
    position: 'absolute',
    right: 16,
    alignSelf: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '100%',
    maxHeight: Dimensions.get('window').height * 0.4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  dropdownScroll: {
    maxHeight: Dimensions.get('window').height * 0.4,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  dropdownItemSelected: {
    backgroundColor: '#F0F7FF',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#000000',
  },
  dropdownItemTextSelected: {
    color: '#4169E1',
    fontWeight: '500',
  },
  dropdownItemPlaceholder: {
    color: 'rgba(60, 60, 67, 0.6)',
  },
});