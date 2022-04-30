import React, { useState } from 'react';
import {
  Modal, FormControl, Input, Button, Select,
} from 'native-base';
import { StyleSheet } from 'react-native';
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

const SignUpForm = ({ showSignUp, setShowSignUp }) => {
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPennEmail, setNewPennEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newMonth, setNewMonth] = useState('');
  const [newDay, setNewDay] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newSchool, setNewSchool] = useState('');
  const [newSchoolYear, setNewSchoolYear] = useState('');
  return (
    <Modal isOpen={showSignUp} onClose={() => setShowSignUp(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Create your account</Modal.Header>
        <Modal.Body>
          <FormControl>
            <Input placeholder="First Name" variant="rounded" value={newFirstName} onChangeText={setNewFirstName} />
          </FormControl>
          <FormControl mt="3">
            <Input placeholder="Last Name" variant="rounded" value={newLastName} onChangeText={setNewLastName} />
          </FormControl>
          <FormControl mt="3">
            <Input placeholder="Penn Email" variant="rounded" value={newPennEmail} onChangeText={setNewPennEmail} type="email" />
          </FormControl>
          <FormControl mt="3">
            <Input placeholder="Password" variant="rounded" value={newPassword} onChangeText={setNewPassword} type="password" />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label> Birthday</FormControl.Label>
            <Select placeholder="Month" selectedValue={newMonth} onValueChange={(itemValue) => setNewMonth(itemValue)}>
              {data.months.map((month) => <Select.Item key={month} label={month} value={month} />)}
            </Select>
            <Select placeholder="Day" selectedValue={newDay} onValueChange={(itemValue) => setNewDay(itemValue)}>
              {data.days.map((day) => <Select.Item key={day} label={day} value={day} />)}
            </Select>
            <Select placeholder="Year" selectedValue={newYear} onValueChange={(itemValue) => setNewYear(itemValue)}>
              {data.years.map((year) => <Select.Item key={year} label={year} value={year} />)}
            </Select>
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label> School and Class Year </FormControl.Label>
            <Select placeholder="School" selectedValue={newSchool} onValueChange={(itemValue) => setNewSchool(itemValue)}>
              {data.schools.map((school) => <Select.Item key={school} label={school} value={school} />)}
            </Select>
            <Select placeholder="Class Year" selectedValue={newSchoolYear} onValueChange={(itemValue) => setNewSchoolYear(itemValue)}>
              {data.schoolYears.map((schoolYear) => <Select.Item key={schoolYear} label={schoolYear} value={schoolYear} />)}
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
              }}
            >
              Cancel
            </Button>
            <Button
              style={styles.redButton}
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
