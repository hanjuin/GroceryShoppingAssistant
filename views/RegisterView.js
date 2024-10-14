import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text,Platform} from 'react-native';
import { insertUserData } from '../controllers/UserController';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RegisterView = ({ navigation }) => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Prefer not to say');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return re.test(password);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      return Alert.alert('Invalid Email', 'Please enter a valid email address.');
    }

    if (!validatePassword(password)) {
      return Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long and contain at least 1 special character.'
      );
    }

    try {
      const userData = { userID, password, firstname, lastname, email, gender, dob: dob.toDateString() };
      const result = await insertUserData(userData);

      if (result.success) {
        Alert.alert('Success', 'User registered successfully');
        setUserID('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setGender('');
        setEmail('');
        setDob(new Date());
        navigation.navigate('Login'); // Fix navigation
      } else {
        Alert.alert('Error', result.message || 'Failed to register user');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registration Error', 'Something went wrong');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
  };

  return (
    <View style={styles.viewStyle}>
      <TextInput
        placeholder="User ID"
        value={userID}
        onChangeText={setUserID}
        style={styles.textinput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.textinput}
      />
      <TextInput
        placeholder="First Name"
        value={firstname}
        onChangeText={setFirstName}
        style={styles.textinput}
      />
      <TextInput
        placeholder="Last Name"
        value={lastname}
        onChangeText={setLastName}
        style={styles.textinput}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.textinput}
      />

      {/* Gender Picker */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          style={styles.genderButton(gender === 'Male')}
          onPress={() => setGender('Male')}
        >
          <Text style={styles.genderText(gender === 'Male')}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.genderButton(gender === 'Female')}
          onPress={() => setGender('Female')}
        >
          <Text style={styles.genderText(gender === 'Female')}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.genderButton(gender === 'Prefer not to say')}
          onPress={() => setGender('Prefer not to say')}
        >
          <Text style={styles.genderText(gender === 'Prefer not to say')}>Prefer not to say</Text>
        </TouchableOpacity>
      </View>

      {/* Date of Birth */}
      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.textinput}>
        <Text>{dob.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Create Account Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textinput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fdb813',
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewStyle: {
    flex: 1,
    backgroundColor: '#b3a089', // Background color
    padding: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  genderButton: (isActive) => ({
    flex: 1,
    padding: 10,
    backgroundColor: isActive ? '#333333' : '#fdb813', // Active: Grey, Inactive: Yellow
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  }),
  genderText: (isActive) => ({
    color: isActive ? '#FFFFFF' : '#333', // Active: White, Inactive: Dark Grey
    fontSize: 14,
    fontWeight: 'bold',
  }),
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerButton: {
    width: '50%',
    padding: 15,
    backgroundColor: '#333333',
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

export default RegisterView;
