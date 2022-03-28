import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Center, Box } from 'native-base';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});

const PriceListing = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text>This is price listing</Text>
    </View>
  );
};

export default PriceListing;
