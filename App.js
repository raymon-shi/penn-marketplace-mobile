import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/component/login/Login';
import Seller from './src/component/seller/Seller';
import Search from './src/component/search/Search';
import Cart from './src/component/cart/Cart';
import Checkout from './src/component/checkout/Checkout';
import Account from './src/component/account/Account';
import Profile from './src/component/account/Profile';
import Reviews from './src/component/account/Reviews';
import Follows from './src/component/account/Follows';
import Blocked from './src/component/account/Blocked';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Account" screenOptions={{ headerShown: false }}>
          {/* CHANGE THIS PART AND ADD YOUR SCREEN WHEN YOU HAVE COMPONENTS TO ADD! */}
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Reviews" component={Reviews} />
          <Stack.Screen name="Follows" component={Follows} />
          <Stack.Screen name="Blocked" component={Blocked} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Home" component={Login} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Seller" component={Seller} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Checkout" component={Checkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
