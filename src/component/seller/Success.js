import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Center, Heading, Button } from 'native-base';

const styles = StyleSheet.create({
  title: {
    paddingLeft: '15%',
    marginBottom: '3%',
  },
  titleColor: {
    color: '#33425B',
  },
  redButton: {
    marginTop: '10%',
    backgroundColor: '#990000',
  },
  blueButton: {
    backgroundColor: '#011F5B',
    marginTop: 20,
    marginBottom: '20%',
  },
});

const Success = ({ onSubmit }) => (
  <View>
    <View style={styles.title}>
      <Heading style={styles.titleColor} size="2xl">Success! 🎉</Heading>
      <Heading style={styles.titleColor} size="2xl">Your listing has</Heading>
      <Heading style={styles.titleColor} size="2xl">been posted.</Heading>
    </View>
    <Center>
      <Button size="lg" w="50%" style={styles.redButton} onPress={onSubmit} _text={{ color: 'white' }}>List another item</Button>
      <Button size="lg" w="50%" style={styles.blueButton} _text={{ color: 'white' }}>Return to Homepage</Button>
    </Center>
  </View>
);

export default Success;
