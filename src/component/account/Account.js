import React from 'react';
import {
  View, StyleSheet, Pressable, Text, Image,
} from 'react-native';
import NextIcon from './assets/Next.png';
import user from './assets/testUser.json';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'none',
    border: '1px solid black',
    textAlign: 'left',
    paddingLeft: '5%',
    paddingTop: '8px',
    paddingBottom: '8px',
    flexDirection: 'row',
  },
  text: {
    width: '85%',
  },
  image: {
    width: '12px',
    height: '12px',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
});

const Account = ({ navigation }) => (
  <View>
    <Pressable style={styles.button} onPress={() => navigation.navigate('Profile', { user })}>
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
  </View>
);

export default Account;
