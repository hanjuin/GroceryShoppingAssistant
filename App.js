import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import ProductListView from './views/ProductListView';
import ProductDetailsView from './views/ProductDetailsView';
import ProductScannerView from './views/ProductScannerView';
import SettingsView from './views/SettingsView';
import ShoppingListView from './views/ShoppingListView';
import LogoutView from './views/LogoutView';


const requestCameraPermission = async () => {
  const result = await request(
    Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
    })
  );

  if (result === RESULTS.GRANTED) {
    console.log('Camera permission granted');
  } else {
    console.log('Camera permission denied');
  }
};

const requestPhotoLibraryPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      {
        title: 'Photo Library Permission',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Photo Library permission granted');
    } else {
      console.log('Photo Library permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Request necessary permissions
    requestPhotoLibraryPermission();
    requestCameraPermission();

    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        setIsLoggedIn(!!userToken);
      } catch (error) {
        console.error('Failed to check login status:', error);
      } finally {
        setLoading(false); // Ensure this is set to false at the right time
      }
    };
    checkLoginStatus();
  }, []);

  // Display a loading screen while checking the login status
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        {/* If the user is not logged in, show only the Login screen */}
        {!isLoggedIn ? (
          <>
            <Drawer.Screen name="Login">
              {props => <LoginView {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Drawer.Screen>
            <Drawer.Screen name="Register" component={RegisterView} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Home" component={HomeView} />
            <Drawer.Screen name="Product List" component={ProductListView} />
            {/* <Drawer.Screen name="Product Details" component={ProductDetailsView} /> */}
            <Drawer.Screen name="Product Scanner" component={ProductScannerView} />
            <Drawer.Screen name="Shopping List" component={ShoppingListView} />
            <Drawer.Screen name="Settings" component={SettingsView} />
            {/* Logout Option */}
            <Drawer.Screen name="Logout">
              {props => <LogoutView {...props} route={{ params: { setIsLoggedIn } }} />}
            </Drawer.Screen>
          </>
        )}
        <Drawer.Screen
        name="Product Details"
        component={ProductDetailsView}
        options={{ drawerLabel: () => null, title: null, drawerIcon: () => null }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
