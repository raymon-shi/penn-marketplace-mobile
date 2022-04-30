import React, { useState } from 'react';
import { Icon, Button, HStack, Menu, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueButton: {
    backgroundColor: '#011F5B',
  },
  button: {
    backgroundColor: 'white',
  },
  footer: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    textAlign: 'center',
    color: '#011F5B',
  },
  plusIcon: {
    textAlign: 'center',
    color: '#011F5B',
    marginHorizontal: 8,
    marginVertical: 10,
  },
});

const BottomRow = ({ navigationRef }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const render = () => {
    if (isLoggedIn) {
      return (
        <HStack space={3} justifyContent="center" background="black" style={styles.footer}>
          <Button onPress={() => navigationRef.current?.navigate('Account')} style={styles.button}>
            <Icon as={FontAwesome} style={styles.icon} name="user" size="8" />
          </Button>
          <Button onPress={() => navigationRef.current?.navigate('Cart')} style={styles.button}>
            <Icon as={FontAwesome} style={styles.icon} name="shopping-cart" size="8" />
          </Button>
          <Menu
            // eslint-disable-next-line react/no-unstable-nested-components
            trigger={(triggerProps) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                <Icon as={FontAwesome} style={styles.plusIcon} name="plus" size="8" />
              </Pressable>
            )}>
            <Menu.Item onPress={() => navigationRef.current?.navigate('Seller')}>Sell</Menu.Item>
            <Menu.Item onPress={() => navigationRef.current?.navigate('Item')}>Item</Menu.Item>
            <Menu.Item onPress={() => navigationRef.current?.navigate('Home')}>Home</Menu.Item>
            <Menu.Item onPress={() => navigationRef.current?.navigate('Login')}>Logout</Menu.Item>
            <Menu.Item isDisabled>Placeholder</Menu.Item>
          </Menu>
        </HStack>
      );
    }
    return (
      <HStack space={2} justifyContent="center" background="black" style={styles.footer}>
        <Button style={styles.blueButton} onPress={() => navigationRef.current?.navigate('Login')}>
          Log In
        </Button>
        <Button style={styles.blueButton} onPress={() => navigationRef.current?.navigate('Login')}>
          Sign Up
        </Button>
      </HStack>
    );
  };

  return <>{render()}</>;
};

export default BottomRow;
