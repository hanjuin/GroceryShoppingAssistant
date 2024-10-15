import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginView = ({ navigation, setIsLoggedIn }) => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        //request to access database data
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

        // Update login state, so when the user restart the app, it will remember the user have logged into the application.
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

      <TextInput
        placeholder="Username"
        value={userID}
        onChangeText={setUserID}
        style={styles.input}
        placeholderTextColor="#000"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#000"
      />

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.createAccountButton}
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
    backgroundColor: '#b3a089',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  signInTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '80%',
    padding: 15,
    backgroundColor: '#f0c223',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 15,
    color: '#000', 
    fontWeight: 'bold',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  forgotPassword: {
    color: '#0066cc',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  button: {
    width: '50%',
    padding: 15,
    backgroundColor: '#333333',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  createAccountButton: {
    marginTop: 10,
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
});

export default LoginView;
