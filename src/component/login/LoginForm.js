import React, { useState } from 'react';
import {
  Center, FormControl, Input, Stack, Button, Divider, Modal,
} from 'native-base';
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import SignUpForm from './SignUpForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redButton: {
    backgroundColor: '#011F5B',
  },
  blueButton: {
    backgroundColor: '#990000',
  },
  formBackground: {
    backgroundColor: 'white',
  },
});

const months = ['January', 'March'];

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <Center>
      <Stack style={styles.formBackground} shadow="5" space={3} w="85%" maxW="400px" p="5">
        <FormControl mb="5">
          <Input variant="rounded" placeholder="Penn Email" type="email" value={email} onChangeText={setEmail} />
        </FormControl>
        <FormControl mb="5">
          <Input variant="rounded" placeholder="Password" type="password" value={password} onChangeText={setPassword} />
        </FormControl>
        <Button style={styles.redButton}>Log In</Button>
        <Divider thickness="1" />
        <Button onPress={() => setShowSignUp(true)} style={styles.blueButton}>Sign Up</Button>
      </Stack>
      {showSignUp ? <SignUpForm showSignUp={showSignUp} setShowSignUp={setShowSignUp} /> : null}
    </Center>
  );
};

export default LoginForm;
