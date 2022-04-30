import React from 'react';
import {
  StyleSheet, Pressable, Text, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextIcon from './assets/Next.png';
import user from './assets/testUser.json';
import AccountHeader from './AccountHeader';

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

const Account = ({ navigation }) => (
  <SafeAreaView>
    <AccountHeader page="Account" navigation={navigation} />
    <Pressable style={styles.button} onPress={() => navigation.navigate('Profile', { user: user.user })}>
      <Text style={styles.text}>Profile</Text>
      <Image style={styles.image} source={NextIcon} />
    </Pressable>
    <Pressable style={styles.button} onPress={() => navigation.navigate('Reviews', { reviews: user.user.reviews })}>
      <Text style={styles.text}>Reviews</Text>
      <Image style={styles.image} source={NextIcon} />
    </Pressable>
    <Pressable
      style={styles.button}
      onPress={() => navigation.navigate('Follows', { followers: user.user.followers, following: user.user.following })}
    >
      <Text style={styles.text}>Follows</Text>
      <Image style={styles.image} source={NextIcon} />
    </Pressable>
    <Pressable style={styles.button} onPress={() => navigation.navigate('Blocked', { blocked: user.user.blocked })}>
      <Text style={styles.text}>Blocked</Text>
      <Image style={styles.image} source={NextIcon} />
    </Pressable>
  </SafeAreaView>
);

export default Account;
