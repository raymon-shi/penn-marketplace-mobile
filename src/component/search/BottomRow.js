import React from 'react';
import { Button, HStack } from 'native-base';
import { StyleSheet } from 'react-native';

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
  footer: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

const BottomRow = () => (
  <HStack space={3} justifyContent="center" background="black" style={styles.footer}>
    <Button style={styles.blueButton}>Profile</Button>
    <Button style={styles.blueButton}>Shopping Cart</Button>
    <Button style={styles.blueButton}>+</Button>
  </HStack>
);

export default BottomRow;
