import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Center, Box } from 'native-base';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});

const Success = ({ setSuccessPage }) => {
  return (
    <View style={styles.container}>
      <Text>This is the success page</Text>
    </View>
  );
};

export default Success;
