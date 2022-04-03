import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  View, StyleSheet, Pressable, Text, Image,
} from 'react-native';
import BackIcon from './assets/Back.png';

const styles = StyleSheet.create({
  homeBtn: {
    backgroundColor: '#990000',
    borderRadius: '10%',
    width: '20%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    margin: '2%',
  },
  image: {
    width: '12px',
    height: '12px',
    resizeMode: 'contain',
    marginLeft: '2%',
  },
});

const AccountHeader = ({ page, navigation }) => (
  <View style={{ backgroundColor: '#33425B' }}>
    <View style={styles.header}>
      {
        page === 'Account'
          ? (
            <Pressable style={styles.homeBtn} onPress={() => navigation.navigate('Home')}>
              <Text style={{ color: 'white', margin: '2%' }}>
                Home
              </Text>
            </Pressable>
          )
          : (
            <Pressable style={styles.homeBtn} onPress={() => navigation.navigate('Account')}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={BackIcon} style={styles.image} />
                <Text style={{ color: 'white', marginLeft: '10%' }}>Back</Text>
              </View>
            </Pressable>
          )
      }
      <Text style={{ color: 'white', marginLeft: '25%' }}>
        {page}
      </Text>
    </View>
  </View>
);

export default AccountHeader;
