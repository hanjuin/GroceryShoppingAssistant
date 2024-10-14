import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertUserData } from '../controllers/UserController'; // Example user controller

const LoginView = ({ navigation, setIsLoggedIn }) => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, password }),
      });

      if (response.ok) {
        const { token } = await response.json();

        // Save token in AsyncStorage
        await AsyncStorage.setItem('userToken', token);

        // Update login state
        setIsLoggedIn(true);

        // Navigate to Home screen (use navigate instead of replace)
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', 'Something went wrong');
    }
  };

  return (
<View style={styles.container}>
      {/* <Text style={styles.signInTitle}>Sign In</Text> */}

      <TextInput
        placeholder="Username"
        value={userID}
        onChangeText={setUserID}
        style={styles.input}
        placeholderTextColor="#000" // Adding placeholder text color
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#000" // Adding placeholder text color
      />

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.createAccountButton} // Style for "Create New Account" button
      >
        <Text style={styles.buttonText}>Create New Account</Text>
      </TouchableOpacity>


    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b3a089', // Background color as shown
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', // Text color for the "Login Page" title
  },
  signInTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', // "Sign In" heading color
  },
  input: {
    width: '80%',
    padding: 15,
    backgroundColor: '#f0c223', // Yellow background for input fields
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 15,
    color: '#000', // Text color in input fields
    fontWeight: 'bold',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  forgotPassword: {
    color: '#0066cc', // Blue link color for "Forgot Password?"
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  button: {
    width: '50%',
    padding: 15,
    backgroundColor: '#333333', // Yellow background for buttons
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // Required for Android shadow
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // Black text for buttons
  },
  createAccountButton: {
    marginTop: 10,
    width: '50%',
    padding: 15,
    backgroundColor: '#333333', // Yellow background for "Create New Account" button
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // Required for Android shadow
  },
});

export default LoginView;
