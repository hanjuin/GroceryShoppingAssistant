import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {check, request,PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform, PermissionsAndroid} from 'react-native';

import HomeView from './views/HomeView';
import ProductDetailsView from './views/ProductDetailsView';
import ProductScannerView from './views/ProductScannerView';
import SettingsView from './views/SettingsView';
import ShoppingListView from './views/ShoppingListView';

const requestCameraPermission = async () => {
  const result = await request(
    Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
    })
  );

  if(result === RESULTS.GRANTED){
    console.log('Camera permission granted');
  }else{
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

const App = () =>{
  useEffect(()=>{
    requestPhotoLibraryPermission();
    requestCameraPermission();
  }, []);


  return(
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeView} />
        <Drawer.Screen name="Product Details" component={ProductDetailsView} />
        <Drawer.Screen name="Product Scanner" component={ProductScannerView} />
        <Drawer.Screen name="Shopping List" component={ShoppingListView} />
        <Drawer.Screen name="Settings" component={SettingsView} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
