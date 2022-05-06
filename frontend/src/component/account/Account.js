import React, { useEffect, useRef } from 'react';
import {
  StyleSheet, Pressable, Text, Image, Platform,
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextIcon from './assets/Next.png';
import AccountHeader from './AccountHeader';

const { manifest } = Constants;
const serverURL = Platform.OS === 'web' ? 'http://localhost:8081' : `http://${manifest.debuggerHost.split(':').shift()}:8081`;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e5e5e5',
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: '5%',
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
  },
  text: {
    width: '85%',
  },
  image: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
});

const Account = ({ navigation }) => {
  const user = useRef({});

  useEffect(async () => {
    const { data } = await axios.post(`${serverURL}/account/login`, { email: 'liufei@sas.upenn.edu' });
    user.current = data;
  }, []);

  return (
    <SafeAreaView>
      <AccountHeader page="Account" navigation={navigation} />
      <Pressable style={styles.button} onPress={() => navigation.navigate('Profile', { user: user.current })}>
        <Text style={styles.text}>Profile</Text>
        <Image style={styles.image} source={NextIcon} />
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Reviews', { reviews: user.currentreviews })}>
        <Text style={styles.text}>Reviews</Text>
        <Image style={styles.image} source={NextIcon} />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Follows', { userProfile: user.current })}
      >
        <Text style={styles.text}>Follows</Text>
        <Image style={styles.image} source={NextIcon} />
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Blocked', { blocked: user.current.blocked })}>
        <Text style={styles.text}>Blocked</Text>
        <Image style={styles.image} source={NextIcon} />
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('SearchUsers', { userProfile: user.current })}>
        <Text style={styles.text}>Search Users</Text>
        <Image style={styles.image} source={NextIcon} />
      </Pressable>
    </SafeAreaView>
  );
};

export default Account;
