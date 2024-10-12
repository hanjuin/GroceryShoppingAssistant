import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { insertUserData } from '../controllers/UserController';

const RegisterView = ({ navigation }) => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Call the function to add a user (You should replace this with actual API call)
      const userData = { userID, password };
      const result = await insertUserData(userData);

      if (result.success) {
        Alert.alert('Success', 'User registered successfully');
        navigation.navigation('Login'); // Navigate back to login screen after registration
      } else {
        Alert.alert('Error', result.message || 'Failed to register user');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registration Error', 'Something went wrong');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="User ID"
        value={userID}
        onChangeText={setUserID}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterView;
