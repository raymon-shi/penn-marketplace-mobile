/* eslint-disable global-require */
import React from 'react';
import {
  Container, Image, Heading, Text, Center,
} from 'native-base';
import { StyleSheet } from 'react-native';
import pennLogo from './assets/UniversityofPennsylvania_Shield_RGB.png';

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pennLogo: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  subtitleText: {
    textAlign: 'center',
  },
});

const Title = () => (
  <Center centerContent>
    <Image alt="upenn-shield" source={pennLogo} style={styles.pennLogo} />
    <Heading size="lg">Penn Marketplace</Heading>
    <Text style={styles.subtitleText}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </Text>
  </Center>
);

export default Title;
