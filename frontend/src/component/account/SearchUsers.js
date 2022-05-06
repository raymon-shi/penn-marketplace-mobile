import React, { useRef, useState } from 'react';
import {
  StyleSheet, Button, Text, View, TextInput, FlatList, Modal, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AccountHeader from './AccountHeader';
// import { SocketContext } from '../../homepage/components/Socket';

const styles = StyleSheet.create({
  inputStyle: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    marginTop: '2%',
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modal: {
    margin: 10,
  },
  reportBox: {
    borderWidth: 1,
    borderRadius: 5,
  },
  tableRow: {
    padding: 2,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const SearchUsers = ({ route, navigation }) => {
  const { userProfile } = route.params;
  const [searchValue, setSearchValue] = useState('');
  const [reportContent, setReportContent] = useState('');
  const selectedUser = useRef({});
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [showReport, setShowReport] = useState(false);
  // const socket = useContext(SocketContext);

  function findAverageRating(reviews) {
    const sum = reviews.reduce((acc, curr) => acc + Number(curr.reviewRating), 0);
    return sum / reviews.length;
  }

  const matchedUsersResults = (matchedUser) => (
    <View style={styles.tableRow}>
      <Text>{matchedUser.item.name} - {findAverageRating(matchedUser.item.reviews)} stars</Text>
      <View style={styles.inline}>
        <Button
          title="Report"
          onPress={async () => {
            try {
              const { data } = await axios.post(`${route.params.serverURL}/account/findUserOnEmail`, { email: matchedUser.item.email });
              const user = data[0];
              selectedUser.current = user;
            } catch (error) {
              throw new Error('Error finding user on email.');
            }
            for (let i = 0; i < selectedUser.current.reports.length; i += 1) {
              if (selectedUser.current.reports[i].authorEmail === userProfile.email) {
                Alert.alert(
                  null,
                  `You have already written a report for ${selectedUser.current.name}.`,
                  [
                    {
                      text: 'Close',
                    },
                  ],
                );
                return;
              }
            }
            setShowReport(true);
          }}
        />
        <Button
          title="Follow"
          onPress={async () => {
            selectedUser.current = matchedUser.item;
            for (let i = 0; i < userProfile.following.length; i += 1) {
              if (userProfile.following[i].followingEmail === selectedUser.current.email) {
                Alert.alert(
                  null,
                  `You have already followed ${selectedUser.current.name}.`,
                  [{ text: 'Close' }],
                );
                return;
              }
            }
            try {
              // socket.emit('new follow', selectedUser.current.name);
              await axios.post(`${route.params.serverURL}/account/follow`, {
                follower: userProfile,
                followedUser: selectedUser.current,
              });
              userProfile.following.push({ followingEmail: selectedUser.current.email });
              Alert.alert(
                'Success.',
                `You are now following ${selectedUser.current.name}.`,
                [{ text: 'Close' }],
              );
            } catch (error) {
              // let's not throw errors in the frontend!
              throw new Error('Error following user.');
            }
          }}
        />
        <Button
          title="Block"
          onPress={async () => {
            selectedUser.current = matchedUser.item;
            for (let i = 0; i < userProfile.blocked.length; i += 1) {
              if (userProfile.blocked[i].blockedUserEmail === selectedUser.current.email) {
                Alert.alert(
                  'Success.',
                  `You already blocked ${selectedUser.current.name}.`,
                  [{ text: 'Close' }],
                );
                return;
              }
            }
            try {
              await axios.post(`${route.params.serverURL}/account/block`, {
                blocker: userProfile,
                blockedUser: selectedUser.current,
              });
              userProfile.blocked.push({ blockedUserEmail: selectedUser.current.email });
              Alert.alert(
                'Success.',
                `You have blocked ${selectedUser.current.name}. You will no longer see any listings or receive any messages from them.`,
                [{ text: 'Close' }],
              );
            } catch (error) {
              throw new Error('Error blocking user.');
            }
          }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <AccountHeader page="Search Users" navigation={navigation} />
      <Text>
        Search for user(s) by name, and give them a review, follow them, or block them.
      </Text>
      <View style={styles.inline}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Search for users..."
          onChangeText={(input) => setSearchValue(input)}
        />
        <Button
          title="Search"
          color="#011F5B"
          onPress={async () => {
            try {
              const { data } = await axios.post(`${route.params.serverURL}/account/findUsersOnName`, {
                name: searchValue,
              });
              setMatchedUsers(data);
            } catch (error) {
              throw new Error('Error searching for users.');
            }
          }}
        />
      </View>
      {matchedUsers.length === 0 ? null
        : (
          <FlatList
            data={matchedUsers}
            renderItem={matchedUsersResults}
            keyExtractor={(item) => item.email}
          />
        )}
      <Modal
        animationType="fade"
        transparent={false}
        visible={showReport}
        presentationStyle="pageSheet"
      >
        <SafeAreaView>
          <View style={styles.modal}>
            <Text>Write your report for this {selectedUser.current.name}.</Text>
            <TextInput
              style={styles.inputStyle}
              // eslint-disable-next-line react/jsx-boolean-value
              multiline={true}
              onChangeText={(newText) => setReportContent(newText)}
            />
            <View style={styles.inline}>
              <Button
                title="Cancel"
                color="black"
                onPress={() => {
                  setReportContent('');
                  setShowReport(false);
                }}
              />
              <Button
                title="Report"
                color="red"
                onPress={async () => {
                  if (!reportContent) {
                    throw new Error('You must type a reason for reporting this user.');
                  }
                  try {
                    const response = await axios.post(
                      `${route.params.serverURL}/account/postReport`,
                      {
                        recipient: selectedUser.current, reportContent,
                      },
                    );
                    if (response.status === 200) {
                      Alert.alert(
                        'Success',
                        `We have received your report for ${selectedUser.current.name}.`,
                        [{ text: 'Close' }],
                      );
                      setShowReport(false);
                    }
                  } catch (error) {
                    throw new Error('Error reporting user.');
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

export default SearchUsers;
