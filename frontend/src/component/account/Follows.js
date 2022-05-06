import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, Pressable, Modal, Alert, TextInput, Button,
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReviewIcon from './assets/Review.png';
import UnfollowIcon from './assets/Unfollow.png';
import AccountHeader from './AccountHeader';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tabText: {
    width: '50%',
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
  },
  listItem: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  name: {
    width: '80%',
  },
  image: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  modal: {
    margin: 10,
  },
  inputStyle: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

const Follows = ({ route, navigation }) => {
  const [followedUsers, setFollowedUsers] = useState(route.params.userProfile.following);
  const [followers, setFollowers] = useState(route.params.userProfile.followers);
  const [tabOnFollowedUsers, setTabOnFollowedUsers] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const ratingInput = useRef(null);
  const reviewContent = useRef('');
  const selectedUser = useRef({});

  const followedUsersList = (followedUser) => (
    <View style={styles.listItem}>
      <Text style={styles.name}>
        {followedUser.item.followingName}
      </Text>
      <View style={{ width: '10%' }}>
        <Pressable
          onPress={async (e) => {
            try {
              const { data } = await axios.post(`${route.params.serverURL}/account/findUserOnEmail`, { email: followedUser.item.followingEmail });
              const user = data[0];
              selectedUser.current = user;
            } catch (error) {
              throw new Error('Error finding user on email.');
            }
            for (let i = 0; i < selectedUser.current.reviews.length; i += 1) {
              if (selectedUser.current.reviews[i].authorEmail === route.params.userProfile.email) {
                Alert.alert(
                  null,
                  `You already reviewed ${selectedUser.current.name}.`,
                  [{ text: 'Close' }],
                );
                return;
              }
            }
            setShowReview(true);
          }}
        >
          <Image style={styles.image} source={ReviewIcon} />
        </Pressable>
      </View>
      <View style={{ width: '10%' }}>
        <Pressable
          onPress={async (e) => {
            let indexToDelete;
            for (let i = 0; i < followedUsers.length; i += 1) {
              if (followedUsers[i].followingEmail === followedUser.item.followingEmail) {
                indexToDelete = i;
                break;
              }
            }
            const newFollowedUsers = [...followedUsers];
            const removedFollowing = newFollowedUsers.splice(indexToDelete, 1);
            try {
              await axios.post(`${route.params.serverURL}/account/unfollow`, { removedFollowing: removedFollowing[0], newFollowList: newFollowedUsers });
              setFollowedUsers(newFollowedUsers);
            } catch (error) {
              throw new Error('Error unfollowing user.');
            }
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
        {follower.item.followerName}
      </Text>
      <View style={{ width: '20%' }}>
        <Pressable
          onPress={async (e) => {
            let indexToDelete;
            for (let i = 0; i < followers.length; i += 1) {
              if (followers[i].followerEmail === follower.item.followerEmail) {
                indexToDelete = i;
                break;
              }
            }
            const newFollowers = [...followers];
            const removedFollowing = newFollowers.splice(indexToDelete, 1);
            try {
              await axios.post(`${route.params.serverURL}/account/unfollow`, { removedFollowing: removedFollowing[0], newFollowList: newFollowers });
              setFollowers(newFollowers);
            } catch (error) {
              throw new Error('Error removing follower.');
            }
          }}
        >
          <Image style={styles.image} source={UnfollowIcon} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <AccountHeader page="Follows" navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.tabText} onPress={() => { setTabOnFollowedUsers(true); }}>Followed</Text>
        <Text style={styles.tabText} onPress={() => { setTabOnFollowedUsers(false); }}>Followers</Text>
      </View>
      <FlatList
        data={tabOnFollowedUsers ? followedUsers : followers}
        renderItem={tabOnFollowedUsers ? followedUsersList : followersList}
        keyExtractor={(item) => item.email}
      />
      <Modal
        animationType="fade"
        transparent={false}
        visible={showReview}
        presentationStyle="pageSheet"
      >
        <SafeAreaView>
          <View style={styles.modal}>
            <Text>What is your rating? (Enter an integer from 1 to 5)</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(rating) => { ratingInput.current = Number(rating); }}
            />
            <Text>Write your review for {selectedUser.current.name}.</Text>
            <TextInput
              style={styles.inputStyle}
              // eslint-disable-next-line react/jsx-boolean-value
              multiline={true}
              onChangeText={(newText) => { reviewContent.current = newText; }}
            />
            <View style={styles.inline}>
              <Button
                title="Cancel"
                color="black"
                onPress={() => {
                  setShowReview(false);
                }}
              />
              <Button
                title="Submit"
                color="black"
                onPress={async () => {
                  const ratingChoices = [1, 2, 3, 4, 5];
                  if (!ratingChoices.includes(ratingInput.current) || !reviewContent.current) {
                    throw new Error('User must be rated and a review must be written.');
                  }

                  try {
                    const response = await axios.post(`${route.params.serverURL}/account/postReview`, {
                      author: route.params.userProfile,
                      recipient: selectedUser.current,
                      reviewRating: ratingInput.current,
                      reviewContent: reviewContent.current,
                    });
                    if (response.status === 200) {
                      Alert.alert(
                        'Success',
                        `You have reviewed ${selectedUser.current.name}.`,
                        [{ text: 'Close' }],
                      );
                      setShowReview(false);
                    }
                  } catch (error) {
                    throw new Error('Error posting review.');
                  }
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default Follows;
