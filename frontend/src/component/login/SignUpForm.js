import React, { useState } from 'react';
import { Modal, FormControl, Input, Button, Select, Alert, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { data } from './data/index';

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

const serverURL = 'http://localhost:8081';

const SignUpForm = ({ showSignUp, setShowSignUp, navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [school, setSchool] = useState('');
  const [classYear, setClassYear] = useState('');
  const [major, setMajor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const storeLoginData = async (mail) => {
    try {
      // await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', mail);
    } catch (error) {
      console.log(error);
    }
  };

  const checkValidNameHandler = () => {
    if ((firstName && !firstName.match(/^[a-zA-Z]+$/)) || (lastName && !lastName.match(/^[a-zA-Z]+$/))) {
      return (
        <Alert width="100%" status="error">
          Please enter an alphabetic name only!
        </Alert>
      );
    }
    return null;
  };

  const checkStrongPassword = () => {
    if (password && password.length < 8) {
      return (
        <Alert width="100%" status="error">
          Your password must be at least 8 characters long!
        </Alert>
      );
    }
    return null;
  };

  const signup = async () => {
    // signup route -> login route -> navigate to homepage
    try {
      await Promise.all([
        await axios.post(`${serverURL}/account/signup`, {
          email,
          firstName,
          lastName,
          password,
          month,
          day,
          year,
          major,
          school,
          classYear,
        }),
        await axios.post(`${serverURL}/account/login`, {
          email,
          password,
        }),
        await storeLoginData(email),
      ]).then(() => navigation.navigate('Home'));
    } catch (error) {
      console.log(error);
      setErrorMessage(
        `Please check the following: Your first and last name only contains letters,
         you are using a Penn email that doesn't already have an account, and you selected the correct school, major, and class year!`,
      );
    }
  };

  return (
    <Modal isOpen={showSignUp} onClose={() => setShowSignUp(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Create your account</Modal.Header>
        {errorMessage ? (
          <Alert status="error" width="100%">
            <Text>{errorMessage}</Text>
          </Alert>
        ) : null}
        {checkValidNameHandler()}
        {checkStrongPassword()}
        <Modal.Body>
          <FormControl>
            <Input placeholder="First Name" variant="rounded" value={firstName} onChangeText={setFirstName} />
          </FormControl>
          <FormControl mt="3">
            <Input placeholder="Last Name" variant="rounded" value={lastName} onChangeText={setLastName} />
          </FormControl>
          <FormControl mt="3">
            <Input placeholder="Penn Email" variant="rounded" value={email} onChangeText={setEmail} type="email" />
          </FormControl>
          <FormControl mt="3">
            <Input placeholder="Password" variant="rounded" value={password} onChangeText={setPassword} type="password" />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label> Birthday</FormControl.Label>
            <Select placeholder="Month" selectedValue={month} onValueChange={(itemValue) => setMonth(itemValue)}>
              {data.months.map((m) => (
                <Select.Item key={m} label={m} value={m} />
              ))}
            </Select>
            <Select placeholder="Day" selectedValue={day} onValueChange={(itemValue) => setDay(itemValue)}>
              {data.days.map((d) => (
                <Select.Item key={String(d)} label={String(d)} value={String(d)} />
              ))}
            </Select>
            <Select placeholder="Year" selectedValue={year} onValueChange={(itemValue) => setYear(itemValue)}>
              {data.years.map((y) => (
                <Select.Item key={String(y)} label={String(y)} value={String(y)} />
              ))}
            </Select>
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label> School and Class Year </FormControl.Label>
            <Select placeholder="School" selectedValue={school} onValueChange={(itemValue) => setSchool(itemValue)}>
              {data.schools.map((s) => (
                <Select.Item key={s} label={s} value={s} />
              ))}
            </Select>
            <Select placeholder="Major" selectedValue={major} onValueChange={(itemValue) => setMajor(itemValue)}>
              {data.majors
                .sort((a, b) => a.name > b.name)
                .map((mj) => (
                  <Select.Item key={mj.name} label={mj.name} value={mj.name} />
                ))}
            </Select>
            <Select placeholder="Class Year" selectedValue={classYear} onValueChange={(itemValue) => setClassYear(itemValue)}>
              {data.schoolYears.map((sy) => (
                <Select.Item key={String(sy)} label={String(sy)} value={String(sy)} />
              ))}
            </Select>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowSignUp(false);
              }}>
              Cancel
            </Button>
            <Button
              style={styles.redButton}
              isDisabled={!firstName.match(/^[a-zA-Z]+$/) || !lastName.match(/^[a-zA-Z]+$/) || password.length < 8}
              onPress={signup}
            >
              Sign Up
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
export default SignUpForm;
