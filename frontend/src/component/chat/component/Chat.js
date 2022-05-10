import React, { useEffect, useState, useRef } from 'react';
import { Platform } from 'react-native';
import { Center, Button, Modal, FormControl, Input, VStack, Text, Image } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';

const { manifest } = Constants;

// send to correct server (different if web vs expo app)
const serverURL = Platform.OS === 'web' ? 'http://localhost:8081' : `http://${manifest.debuggerHost.split(':').shift()}:8081`;

const Chat = ({ showModal, setShowModal, email, name }) => {
  const [friendList, setFriendList] = useState([]);
  const [showFriendChat, setShowFriendChat] = useState(false);
  const friendNameRef = useRef('');
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [showSendImage, setShowSendImage] = useState(false);

  const getFollowed = async () => {
    try {
      const { data } = await axios.post(`${serverURL}/chat/followed`, { email });
      setFriendList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const { data } = await axios.post(`${serverURL}/chat/messages`, { senderName: name, receiverName: friendNameRef.current });
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post(`${serverURL}/chat/sendMessage`, { receiver: friendNameRef.current, sender: name, message: messageInput });
      setMessageInput('');
      // socket.emit('new message', friendName);
    } catch (error) {
      console.log(error);
      alert('Error retrieving messages');
    }
  };

  const sendMessageImage = async () => {
    try {
      await axios.post(`${serverURL}/chat/sendMessage`, {
        receiver: friendNameRef.current,
        sender: name,
        message: 'image message test',
        img: imageLink,
      });
      setImageLink('');
      setMessageInput('');
      // socket.emit('new message', friendName);
    } catch (error) {
      alert('Error retrieving messages');
    }
  };

  useEffect(() => {
    getFollowed();
  }, []);

  useEffect(() => {
    getMessages();
  }, [friendNameRef]);

  useEffect(() => {
    getMessages();
    const intervalID = setInterval(() => {
      getMessages();
    }, 2000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Friends</Modal.Header>
          <Modal.Body>
            <VStack space={4} alignItems="center">
              {friendList.map((friend) => (
                <Button
                  onPress={() => {
                    setShowFriendChat(true);
                    friendNameRef.current = friend.followingName;
                  }}
                  w="100%"
                  key={friend.followingName}>
                  {friend.followingName}
                </Button>
              ))}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                Close
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Individual Friend Chat Window */}
      <Modal isOpen={showFriendChat} onClose={() => setShowFriendChat(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{friendNameRef.current}</Modal.Header>
          <Modal.Body>
            {messages.map((message, index) =>
              message.img && message.img !== '' ? (
                <Image
                  key={`${message.img + index}`}
                  // style={{ objectFit: 'cover' }}
                  source={{ uri: message.img }}
                  alt="msg-img"
                  height="100px"
                  width="100px"
                />
              ) : (
                <VStack key={`${message + index + message + index}`}>
                  <Text key={`${message + index + message}`}>
                    {`${new Date(message.createdAt).getMonth() + 1}-${new Date(message.createdAt).getDate()}-${new Date(
                      message.createdAt,
                    ).getFullYear()} | ${new Date(message.createdAt).toLocaleTimeString([], {
                      hour: 'numeric',
                      hour12: true,
                      minute: 'numeric',
                    })}`}
                  </Text>
                  <Text mb="3" key={`${message + index}`}>{`${message.sender} : ${message.message}`}</Text>
                </VStack>
              ),
            )}
          </Modal.Body>
          <Modal.Footer>
            <Input mx="3" value={messageInput} onChangeText={setMessageInput} placeholder="Enter message..." w="100%" m="3" />
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowFriendChat(false);
                  friendNameRef.current = '';
                }}>
                Close
              </Button>
              <Button
                onPress={() => {
                  sendMessage();
                }}>
                Send Message
              </Button>
              <Button
                onPress={() => {
                  setShowSendImage(true);
                }}>
                Send Image
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Send Image Modal */}
      <Modal isOpen={showSendImage} onClose={() => setShowSendImage(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Send Image</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Image Link</FormControl.Label>
              <Input mx="3" value={imageLink} onChangeText={setImageLink} placeholder="Enter image link..." w="100%" m="3" />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowSendImage(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  sendMessageImage();
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default Chat;
