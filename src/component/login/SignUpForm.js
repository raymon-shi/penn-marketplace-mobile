import React, { useState } from 'react';
import {
  Modal, FormControl, Input, Button,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
  const [newDay, setNewDay] = useState(0);
  const [newYear, setNewYear] = useState(0);
  const [newSchool, setNewSchool] = useState('');
  const [newSchoolYear, setNewSchoolYear] = useState(0);
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
            <Picker
              selectedValue={newMonth}
              onValueChange={(itemValue, itemIndex) => setNewMonth(itemValue)}

            >
              {data.months.map((month) => <Picker.Item key={month} label={month} value={month} />)}
            </Picker>
            <Picker
              selectedValue={newDay}
              onValueChange={(itemValue, itemIndex) => setNewDay(itemValue)}
            >
              {data.days.map((day) => <Picker.Item key={day} label={day} value={day} />)}
            </Picker>
            <Picker
              selectedValue={newYear}
              onValueChange={(itemValue, itemIndex) => setNewYear(itemValue)}

            >
              {data.years.map((year) => <Picker.Item key={year} label={year} value={year} />)}
            </Picker>
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label> School and Class year</FormControl.Label>
            <Picker
              selectedValue={newSchool}
              onValueChange={(itemValue, itemIndex) => setNewSchool(itemValue)}

            >
              {data.schools.map((school) => <Picker.Item key={school} label={school} value={school} />)}
            </Picker>
            <Picker
              selectedValue={newSchoolYear}
              onValueChange={(itemValue, itemIndex) => setNewSchoolYear(itemValue)}
            >
              {data.schoolYears.map((schoolYear) => <Picker.Item key={schoolYear} label={schoolYear} value={schoolYear} />)}
            </Picker>
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
