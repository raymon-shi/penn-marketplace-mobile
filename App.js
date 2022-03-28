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

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* CHANGE THIS PART AND ADD YOUR SCREEN WHEN YOU HAVE COMPONENTS TO ADD! */}
          <Stack.Screen name="Home" component={Login} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
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
