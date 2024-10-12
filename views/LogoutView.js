import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutView = ({ navigation, route }) => {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove token
      const { setIsLoggedIn } = route.params; // Get the setter passed via params
      setIsLoggedIn(false); // Update login state
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const logout = async () => {
      await handleLogout(); // Call logout logic
      navigation.replace('Login'); // Navigate to login after logout
    };
    logout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logging out...</Text>
    </View>
  );
};

export default LogoutView;
