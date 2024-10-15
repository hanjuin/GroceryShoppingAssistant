import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutView = ({ navigation, route }) => {

  useEffect(() => {
    const logout = async () => {
      await handleLogout();
      navigation.navigate('Login');
    };
    logout();
  });

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove token from AsyncStorage
      const { setIsLoggedIn } = route.params; // Get setIsLoggedIn from params
      setIsLoggedIn(false); // Set login state to false
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles}>
      <Text>Logging out...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
});

export default LogoutView;
