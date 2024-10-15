import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
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
import { Header } from 'react-native/Libraries/NewAppScreen';


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
    requestPhotoLibraryPermission();
    requestCameraPermission();

    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        setIsLoggedIn(!!userToken);
      } catch (error) {
        console.error('Failed to check login status:', error);
      } finally {
        setLoading(false);
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
      <Drawer.Navigator
        initialRouteName={isLoggedIn ? 'Home' : 'Login'}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fdb813', // Your desired color for the header background
            // borderWidth:1,
            // borderColor:'#000',
            // borderRadius:2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3.84,
            elevation: 5,
          },
          headerTintColor: '#000', // Text/icon color in the header
          headerTitleStyle: {
            fontWeight: 'bold', // Optional: make the title bold
          },
        }}
      >
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
            <Drawer.Screen name="Product Scanner" component={ProductScannerView} />
            <Drawer.Screen name="Shopping List" component={ShoppingListView} />
            <Drawer.Screen name="Settings" component={SettingsView} />
            {/* Logout Option */}
            <Drawer.Screen name="Logout">
              {props => <LogoutView {...props} route={{ params: { setIsLoggedIn } }} />}
            </Drawer.Screen>
          </>
        )}
        {/* Product Details Screen - Hidden from Drawer */}
        <Drawer.Screen
          name="Product Details"
          component={ProductDetailsView}
          options={{
            drawerLabel: () => null,
            title: null,
            drawerIcon: () => null,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
