import React from 'react';
import { Icon, Button, HStack } from 'native-base';
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
});

const BottomRow = ({ navigationRef }) => (
  <HStack space={3} justifyContent="center" background="black" style={styles.footer}>
    <Button
      onPress={() => navigationRef.current?.navigate('Account')}
      style={styles.button}
    >
      <Icon as={FontAwesome} style={styles.icon} name="user" size="8" />
    </Button>
    <Button
      onPress={() => navigationRef.current?.navigate('Cart')}
      style={styles.button}
    >
      <Icon as={FontAwesome} style={styles.icon} name="shopping-cart" size="8" />
    </Button>
    <Button style={styles.button}><Icon as={FontAwesome} style={styles.icon} name="plus" size="8" /></Button>
  </HStack>
);

export default BottomRow;
