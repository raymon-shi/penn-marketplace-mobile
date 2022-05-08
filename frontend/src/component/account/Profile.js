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
});

const Profile = ({ route, navigation }) => (
  <SafeAreaView>
    <AccountHeader page="Profile" navigation={navigation} />
    {route.params.user.reports.length === 0 ? null
      : (
        <View style={{ flexDirection: 'row', margin: '1%' }}>
          <Image style={styles.image} source={ExclamationIcon} />
          <Text style={{ marginLeft: '2%' }}>
            {route.params.user.reports.length} other users have reported you.
          </Text>
        </View>
      )}
    <View style={styles.profileBox}>
      <View style={{ flexDirection: 'row', margin: '1%' }}>
        <Text style={{ width: '40%' }}>Name</Text>
        <Text style={{ width: '40%' }}>{route.params.user.name}</Text>
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
  </SafeAreaView>
);

export default Profile;
