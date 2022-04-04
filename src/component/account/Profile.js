import React from 'react';
import {
  View, Text, Image, Pressable, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExclamationIcon from './assets/exclamation-mark.png';
import DarkModeOffIcon from './assets/dark-mode-off.png';
import AccountHeader from './AccountHeader';

const styles = StyleSheet.create({
  image: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  profileBox: {
    borderColor: 'black',
    borderWidth: 1,
    margin: '1%',
  },
  editBtn: {
    backgroundColor: '#011f5b',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const Profile = ({ route, navigation }) => (
  <SafeAreaView>
    <AccountHeader page="Profile" navigation={navigation} />
    <View style={{ flexDirection: 'row', margin: '1%' }}>
      <Image style={styles.image} source={ExclamationIcon} />
      <Text style={{ marginLeft: '2%' }}>
        3 other users have reported you.
      </Text>
    </View>
    <View style={styles.profileBox}>
      <View style={{ flexDirection: 'row', margin: '1%' }}>
        <Text style={{ width: '40%' }}>Name</Text>
        <Text style={{ width: '40%' }}>{route.params.user.name}</Text>
      </View>
      <View style={{ flexDirection: 'row', margin: '1%' }}>
        <Text style={{ width: '40%' }}>PennID</Text>
        <Text style={{ width: '40%' }}>{route.params.user.pennID}</Text>
      </View>
      <View style={{ flexDirection: 'row', margin: '1%' }}>
        <Text style={{ width: '40%' }}>Email</Text>
        <Text style={{ width: '40%' }}>{route.params.user.email}</Text>
      </View>
      <View style={{ flexDirection: 'row', margin: '1%' }}>
        <Text style={{ width: '40%' }}>Dark Mode</Text>
        <Image source={DarkModeOffIcon} style={styles.image} />
      </View>
    </View>
    <View style={{ width: '20%', marginTop: '1%', marginLeft: '1%' }}>
      <Pressable style={styles.editBtn}>
        <Text style={{ color: 'white', padding: '3%' }}>
          Edit
        </Text>
      </Pressable>
    </View>
  </SafeAreaView>
);

export default Profile;
