import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutView = ({ navigation, route }) => {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove token from AsyncStorage
      const { setIsLoggedIn } = route.params; // Get setIsLoggedIn from params
      setIsLoggedIn(false); // Set login state to false
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const logout = async () => {
      await handleLogout(); // Perform the logout
      navigation.navigate('Login'); // Navigate to the login screen after logout
    };
    logout();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logging out...</Text>
    </View>
  );
};

export default LogoutView;
