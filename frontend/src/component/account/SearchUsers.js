import React, { useRef, useState } from 'react';
import {
  StyleSheet, Button, Text, View, TextInput, FlatList, Modal, Platform, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Constants from 'expo-constants';
import AccountHeader from './AccountHeader';
// import { SocketContext } from '../../homepage/components/Socket';

const { manifest } = Constants;
const serverURL = Platform.OS === 'web' ? 'http://localhost:8081' : `http://${manifest.debuggerHost.split(':').shift()}:8081`;

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
  const alreadyDone = useRef(false);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [showFollow, setShowFollow] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  // const socket = useContext(SocketContext);

  async function handleBlock(e) {
    selectedUser.current = matchedUsers[e.target.value];
    alreadyDone.current = false;
    for (let i = 0; i < userProfile.blocked.length; i += 1) {
      if (userProfile.blocked[i].blockedUserEmail === selectedUser.current.email) {
        alreadyDone.current = true;
        break;
      }
    }
    if (!alreadyDone.current) {
      try {
        await axios.post('localhost:8000/account/block', {
          blocker: userProfile,
          blockedUser: selectedUser.current,
        });
        userProfile.blocked.push({ blockedUserEmail: selectedUser.current.email });
      } catch (error) {
        throw new Error('Error blocking user.');
      }
    }
    setShowBlock(true);
  }

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
              const { data } = await axios.post(`${serverURL}/account/findUserOnEmail`, { email: matchedUser.item.email });
              const user = data[0];
              selectedUser.current = user;
            } catch (error) {
              throw new Error('Error finding user on email.');
            }
            alreadyDone.current = false;
            for (let i = 0; i < selectedUser.current.reports.length; i += 1) {
              if (selectedUser.current.reports[i].authorEmail === userProfile.email) {
                alreadyDone.current = true;
                break;
              }
            }
            setShowReport(true);
          }}
        />
        <Button
          title="Follow"
          onPress={async () => {
            selectedUser.current = matchedUser.item;
            alreadyDone.current = false;
            for (let i = 0; i < userProfile.following.length; i += 1) {
              if (userProfile.following[i].followingEmail === selectedUser.current.email) {
                alreadyDone.current = true;
                break;
              }
            }
            if (!alreadyDone.current) {
              try {
                // socket.emit('new follow', selectedUser.current.name);
                await axios.post(`${serverURL}/account/follow`, {
                  follower: userProfile,
                  followedUser: selectedUser.current,
                });
                userProfile.following.push({ followingEmail: selectedUser.current.email });
                Alert.alert(
                  'Success.',
                  `You are now following ${selectedUser.current.name}.`,
                  [
                    {
                      text: 'Close',
                    },
                  ],
                );
              } catch (error) {
                // let's not throw errors in the frontend!
                throw new Error('Error following user.');
              }
            } else {
              Alert.alert(
                null,
                `You have already followed ${selectedUser.current.name}.`,
                [
                  {
                    text: 'Close',
                  },
                ],
              );
            }
          }}
        />
        <Button
          title="Block"
          onPress={async () => {
            selectedUser.current = matchedUser.item;
            alreadyDone.current = false;
            for (let i = 0; i < userProfile.blocked.length; i += 1) {
              if (userProfile.blocked[i].blockedUserEmail === selectedUser.current.email) {
                alreadyDone.current = true;
                break;
              }
            }
            if (!alreadyDone.current) {
              try {
                await axios.post(`${serverURL}/account/block`, {
                  blocker: userProfile,
                  blockedUser: selectedUser.current,
                });
                userProfile.blocked.push({ blockedUserEmail: selectedUser.current.email });
                Alert.alert(
                  'Success.',
                  `You have blocked ${selectedUser.current.name}. You will no longer see any listings or receive any messages from them.`,
                  [
                    {
                      text: 'Close',
                    },
                  ],
                );
              } catch (error) {
                throw new Error('Error blocking user.');
              }
            } else {
              Alert.alert(
                'Success.',
                `You already blocked ${selectedUser.current}.`,
                [
                  {
                    text: 'Close',
                  },
                ],
              );
            }
          }}
        />
      </View>
      {/* <div className="table-item">
        <button type="button" value={index} onClick={handleFollow}>Follow</button>
      </div>
      <div className="table-item">
        <button type="button" value={index} onClick={handleBlock}>Block</button>
      </div> */}
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
              const { data } = await axios.post(`${serverURL}/account/findUsersOnName`, {
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
            {alreadyDone.current
              ? (
                <>
                  <Text>You have already reported {selectedUser.current.name}.</Text>
                  <Button title="Close" color="black" onPress={() => setShowReport(false)} />
                </>
              )
              : (
                <>
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
                            `${serverURL}/account/postReport`,
                            {
                              recipient: selectedUser.current, reportContent,
                            },
                          );
                          if (response.status === 200) {
                            setShowReport(false);
                          }
                        } catch (error) {
                          throw new Error('Error reporting user.');
                        }
                      }}
                    />
                  </View>
                </>
              )}
          </View>
        </SafeAreaView>
      </Modal>
      {/* <Modal show={showFollow} onHide={() => { setShowFollow(false); }} backdrop="static" keyboard={false}>
        <Modal.Header closeButton />
        <Modal.Body>
          {alreadyDone.current ? `You are already following ${selectedUser.current.name}.` : `You are now following ${selectedUser.current.name}.`}
        </Modal.Body>
      </Modal>
      <Modal show={showBlock} onHide={() => { setShowBlock(false); }} backdrop="static" keyboard={false}>
        <Modal.Header closeButton />
        <Modal.Body>
          {alreadyDone.current ? `You have already blocked ${selectedUser.current.name}.`
            : `${selectedUser.current.name} is now blocked and you will no longer receive any messages or listings from them.`}
        </Modal.Body>
      </Modal>
      <Modal show={showReport} onHide={() => { setShowReport(false); }} backdrop="static" keyboard={false}>
        <Modal.Header closeButton />
        <Modal.Body>
          {alreadyDone.current ? `You have already reported ${selectedUser.current.name}.`
            : (
              <div>
                Why are you reporting this user?
                <br />
                <textarea ref={reportContent} style={{ width: '100%' }} />
              </div>
            )}
        </Modal.Body>
        {alreadyDone.current ? null
          : (
            <Modal.Footer>
              <button type="button" onClick={reportUser}>Report</button>
            </Modal.Footer>
          )}
      </Modal> */}
    </SafeAreaView>
  );
};

export default SearchUsers;
