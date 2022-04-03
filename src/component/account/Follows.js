import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, Pressable,
} from 'react-native';
import ReviewIcon from './assets/Review.png';
import UnfollowIcon from './assets/Unfollow.png';

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

const Follows = ({ route, navigation }) => {
  const [followedUsers, setFollowedUsers] = useState(route.params.following);
  const [followers, setFollowers] = useState(route.params.followers);
  const [tabOnFollowedUsers, setTabOnFollowedUsers] = useState(true);

  const followedUsersList = (followedUser) => (
    <View style={styles.listItem}>
      <Text style={styles.name}>
        {followedUser.item.name}
      </Text>
      <View style={{ width: '10%' }}>
        <Pressable>
          <Image style={styles.image} source={ReviewIcon} />
        </Pressable>
      </View>
      <View style={{ width: '10%' }}>
        <Pressable
          onPress={(e) => {
            let indexToDelete;
            for (let i = 0; i < followedUsers.length; i += 1) {
              if (followedUsers[i].pennID === followedUser.item.pennID) {
                indexToDelete = i;
                break;
              }
            }
            const newFollowedUsers = [...followedUsers];
            newFollowedUsers.splice(indexToDelete, 1);
            setFollowedUsers(newFollowedUsers);
          }}
        >
          <Image style={styles.image} source={UnfollowIcon} />
        </Pressable>
      </View>
    </View>
  );

  const followersList = (follower) => (
    <View style={styles.listItem}>
      <Text style={styles.name}>
        {follower.item.name}
      </Text>
      <View style={{ width: '20%' }}>
        <Pressable
          onPress={(e) => {
            let indexToDelete;
            for (let i = 0; i < followers.length; i += 1) {
              if (followers[i].pennID === follower.item.pennID) {
                indexToDelete = i;
                break;
              }
            }
            const newFollowers = [...followers];
            newFollowers.splice(indexToDelete, 1);
            setFollowers(newFollowers);
          }}
        >
          <Image style={styles.image} source={UnfollowIcon} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.tabText} onPress={() => { setTabOnFollowedUsers(true); }}>Followed</Text>
        <Text style={styles.tabText} onPress={() => { setTabOnFollowedUsers(false); }}>Followers</Text>
      </View>
      <FlatList
        data={tabOnFollowedUsers ? followedUsers : followers}
        renderItem={tabOnFollowedUsers ? followedUsersList : followersList}
        keyExtractor={(item) => item.pennID}
      />
    </View>
  );
};

export default Follows;
