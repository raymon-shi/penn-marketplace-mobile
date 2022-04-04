import React, { useState } from 'react';
import {
  View, Image, Pressable, StyleSheet, Text, FlatList,
} from 'react-native';
import UnblockIcon from './assets/Unblock.png';
import AccountHeader from './AccountHeader';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tabText: {
    width: '50%',
    textAlign: 'center',
    border: '2px black solid',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  listItem: {
    flexDirection: 'row',
    border: '1px black solid',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  name: {
    width: '80%',
  },
  image: {
    width: '12px',
    height: '12px',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
});

const Blocked = ({ route, navigation }) => {
  const [blockedUsers, setBlockedUsers] = useState(route.params.blocked);

  const blockedUsersList = (blockedUser) => (
    <View style={styles.listItem}>
      <Text style={styles.name}>
        {blockedUser.item.name}
      </Text>
      <View style={{ width: '20%' }}>
        <Pressable
          onPress={() => {
            let indexToDelete;
            for (let i = 0; i < blockedUsers.length; i += 1) {
              if (blockedUsers[i].pennID === blockedUser.item.pennID) {
                indexToDelete = i;
                break;
              }
            }
            const newBlockedUsers = [...blockedUsers];
            newBlockedUsers.splice(indexToDelete, 1);
            setBlockedUsers(newBlockedUsers);
          }}
        >
          <Image style={styles.image} source={UnblockIcon} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View>
      <AccountHeader page="Blocked" navigation={navigation} />
      <FlatList
        data={blockedUsers}
        renderItem={blockedUsersList}
        keyExtractor={(item) => item.pennID}
      />
    </View>
  );
};

export default Blocked;