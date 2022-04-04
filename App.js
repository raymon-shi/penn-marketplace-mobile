import React from 'react';
import { NativeBaseProvider, HStack } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/component/login/Login';
import Seller from './src/component/seller/Seller';
import Search from './src/component/search/Search';
import Home from './src/component/homepage/Home';
import Header from './src/component/homepage/Header';
import BottomRow from './src/component/search/BottomRow';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <Header />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          {/* CHANGE THIS PART AND ADD YOUR SCREEN WHEN YOU HAVE COMPONENTS TO ADD! */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="Seller" component={Seller} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
      <BottomRow />
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
