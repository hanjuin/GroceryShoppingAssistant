import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeView from './views/HomeView';
import ProductDetailsView from './views/ProductDetailsView';
import ProductScannerView from './views/ProductScannerView';
import SettingsView from './views/SettingsView';
import ShoppingListView from './views/ShoppingListView'; 


const Drawer = createDrawerNavigator();

const App = () =>{
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
