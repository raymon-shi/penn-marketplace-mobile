import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button, Center, Box, Row, Text, Heading,
} from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const styles = StyleSheet.create({
  title: {
    paddingLeft: '15%',
    marginBottom: '3%',
  },
  titleColor: {
    color: '#33425B',
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#33425B',
    borderWidth: 2,
    borderRadius: 30,
    marginTop: '5%',
  },
  buttonGroup: {
    marginBottom: '20%',
  },
  blueButton: {
    backgroundColor: '#011F5B',
  },
});

const Start = ({ setPriceListing, setBidListing }) => (
  <View>
    <View style={styles.title}>
      <Heading style={styles.titleColor} size="2xl">Create a</Heading>
      <Heading style={styles.titleColor} size="2xl">New Listing</Heading>
    </View>
    <Center>
      <View style={styles.buttonGroup}>
        <Button
          size="lg"
          style={styles.button}
          onPress={() => setPriceListing()}
          _text={{ color: 'black' }}
          endIcon={<FontAwesome name="tag" />}
        >
          List for a set price
        </Button>
        <Button
          size="lg"
          style={styles.button}
          onPress={() => setBidListing()}
          _text={{ color: 'black' }}
          endIcon={<FontAwesome name="gavel" />}
        >
          List as a bid
        </Button>
      </View>
    </Center>
  </View>
);

export default Start;
