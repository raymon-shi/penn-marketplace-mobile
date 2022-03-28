import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Center, Box } from 'native-base';

import Title from './Title';
import LoginForm from './LoginForm';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },

});

const Login = () => {
  const [username, setUsername] = useState('');
  return (
    <Box style={styles.container}>
      <Title />
      <LoginForm />
    </Box>
  );
};

export default Login;
