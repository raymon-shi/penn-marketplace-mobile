import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, HStack } from 'native-base';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/component/login/Login';
import Seller from './src/component/seller/Seller';
import Cart from './src/component/buyer/cart/Cart';
import ItemCheckout from './src/component/buyer/checkout/ItemCheckout';
import CartCheckout from './src/component/buyer/checkout/CartCheckout';
import Account from './src/component/account/Account';
import Profile from './src/component/account/Profile';
import Reviews from './src/component/account/Reviews';
import Follows from './src/component/account/Follows';
import Blocked from './src/component/account/Blocked';
import SearchUsers from './src/component/account/SearchUsers';
import BidItem from './src/component/buyer/item/BidItem';
import RegItem from './src/component/buyer/item/RegItem';
import Home from './src/component/homepage/Home';
import Header from './src/component/homepage/Header';
import BottomRow from './src/component/search/BottomRow';
import SearchResults from './src/component/search/SearchResults';

const App = () => {
  const Stack = createNativeStackNavigator();
  const navigationRef = React.createRef();

  return (
    <SSRProvider>
      <NativeBaseProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              // eslint-disable-next-line react/no-unstable-nested-components
              header: ({ navigation }) => <Header />,
            }}
          >
            {/* CHANGE THIS PART AND ADD YOUR SCREEN WHEN YOU HAVE COMPONENTS TO ADD! */}
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Reviews" component={Reviews} />
            <Stack.Screen name="Follows" component={Follows} />
            <Stack.Screen name="Blocked" component={Blocked} />
            <Stack.Screen name="SearchUsers" component={SearchUsers} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Seller" component={Seller} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="ItemCheckout" component={ItemCheckout} />
            <Stack.Screen name="CartCheckout" component={CartCheckout} />
            <Stack.Screen name="BidItem" component={BidItem} />
            <Stack.Screen name="RegItem" component={RegItem} />
          </Stack.Navigator>
          <BottomRow navigationRef={navigationRef} />
        </NavigationContainer>
      </NativeBaseProvider>
    </SSRProvider>
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
