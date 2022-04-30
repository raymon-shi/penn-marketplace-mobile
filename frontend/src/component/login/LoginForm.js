import React, { useState } from 'react';
import { Center, FormControl, Input, Stack, Button, Divider, Modal, Alert, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpForm from './SignUpForm';

const serverURL = 'http://localhost:8081';

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
  redButton: {
    backgroundColor: '#990000',
  },
  formBackground: {
    backgroundColor: 'white',
  },
});

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [failedLogin, setFailedLogin] = useState(0);
  const [accountLockedError, setAccountLockedError] = useState('');
  const [lockedOutTime, setLockedOutTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const storeLoginData = async (mail) => {
    try {
      // await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', mail);
    } catch (error) {
      console.log(error);
    }
  };

  const userLogin = async () => {
    try {
      await axios.post(`${serverURL}/account/login`, { email, password }).then(() => navigation.navigate('Home'));
      await storeLoginData(email);
      console.log('hello world?');
    } catch (error) {
      console.log('error!');
      console.log(error);
      const { data } = await axios.post(`${serverURL}/account/failedLogin`, { email });
      setFailedLogin(data.loginAttempts);
      setLockedOutTime(data.lockedOutTime);
      setAccountLockedError(
        `You have failed to log in too many times! Account unlocked at: ${new Date(Date.parse(lockedOutTime)).toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })} `,
      );
      setErrorMessage('Your email or password is incorrect! Please try again!');
    }
  };

  return (
    <Center>
      {failedLogin ? (
        <Alert w="50%" status="warning">
          <Text fontSize="md" color="coolGray.800">
            {`You have failed to log in ${failedLogin} times!`}
          </Text>
        </Alert>
      ) : null}
      {failedLogin > 3 ? (
        <Alert w="50%" status="error">
          <Text fontSize="md" color="coolGray.800">
            {`${accountLockedError}`}
          </Text>
        </Alert>
      ) : null}
      {errorMessage ? (
        <Alert w="50%" status="error">
          <Text fontSize="md" color="coolGray.800">
            {`There was an error: ${errorMessage}`}
          </Text>
        </Alert>
      ) : null}
      <Stack style={styles.formBackground} shadow="5" space={3} w="85%" maxW="400px" p="5">
        <FormControl mb="5">
          <Input variant="rounded" placeholder="Penn Email" type="email" value={email} onChangeText={setEmail} />
        </FormControl>
        <FormControl mb="5">
          <Input variant="rounded" placeholder="Password" type="password" value={password} onChangeText={setPassword} />
        </FormControl>
        <Button
          style={styles.redButton}
          onPress={() => {
            userLogin();
          }}>
          Log In
        </Button>
        <Divider thickness="1" />
        <Button onPress={() => setShowSignUp(true)} style={styles.blueButton}>
          Sign Up
        </Button>
      </Stack>
      {showSignUp ? <SignUpForm showSignUp={showSignUp} setShowSignUp={setShowSignUp} navigation={navigation} /> : null}
    </Center>
  );
};

export default LoginForm;
