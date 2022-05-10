import { React, useState, useEffect } from 'react';
import {
  Platform, SafeAreaView, View, Pressable, StyleSheet, Text, Image, ScrollView,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const { manifest } = Constants;

// send to correct server (different if web vs expo app)
const serverURL = Platform.OS === 'web' ? 'http://localhost:8081' : `http://${manifest.debuggerHost.split(':').shift()}:8081`;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    borderWidth: 1,
    marginTop: 10,
    alignSelf: 'center',
  },
  tags: {
    fontSize: 12,
    fontFamily: 'Futura-Medium',
    alignSelf: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 10,
    fontFamily: 'Futura-Medium',
    alignSelf: 'center',
  },
  lister: {
    fontSize: 12,
    fontFamily: 'Futura-Medium',
    margin: 10,
    alignSelf: 'center',
  },
  desc: {
    margin: 10,
    fontSize: 16,
    fontFamily: 'Futura-Medium',
    alignSelf: 'center',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 10,
    fontFamily: 'Futura-Medium',
    alignSelf: 'center',
  },
  buyBtn: {
    backgroundColor: '#990000',
    borderRadius: 10,
    width: '90%',
    paddingVertical: 12,
    margin: 10,
    alignSelf: 'center',
  },
  cartBtn: {
    backgroundColor: '#011F5B',
    borderRadius: 10,
    width: '90%',
    paddingVertical: 12,
    margin: 10,
    alignSelf: 'center',
  },
  bidInput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
});

const RegItem = ({ navigation, route }) => {
  const [listing, setListing] = useState({});
  const [username, setUsername] = useState('');
  const itemId = route.params.itemId;
  const posterName = route.params.posterName;

  const getRegListing = async () => {
    try {
      const item = await axios.get(`${serverURL}/buyer/getRegListing/${itemId}`);
      setListing(item.data);
    } catch (error) {
      throw new Error(`Error with retrieving item with id ${itemId}`);
    }
  };

  const getUser = async () => {
    try {
      const user = await axios.get(`${serverURL}/account/user`);
      if (Object.keys(user.data).length > 0) {
        setUsername(user.data.name);
      }
    } catch (error) {
      Error('There was an error getting the user');
    }
  }

  useEffect(() => {
    getRegListing();
    getUser();
  }, []);

  const handleCheckout = (event) => {
    event.preventDefault();
    navigation.navigate('ItemCheckout', { listing, isBidItem: false, });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    await axios.post(`${serverURL}/buyer/addWatchRegItem/${itemId}`);
    navigation.navigate('Home');
  };

  const handleCart = async (event) => {
    event.preventDefault();
    await axios.post(`${serverURL}/buyer/addCartRegItem/${itemId}`);
    navigation.navigate('Cart');  
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          style={styles.image}
          source={{ uri: `${serverURL}\\${listing.media}`.replaceAll('\\', '/') }}
        />
        <Text style={styles.tags}>Tags: {listing.tag}</Text>
        <Text style={styles.header}>{listing.itemName}</Text>
        <View style={{
          borderBottomColor: 'black',
          borderBottomWidth: 2,
          width: '90%',
          alignSelf: 'center',
        }}
        />    
        <Text style={styles.lister}>Listed by: {listing.posterName}</Text>
        <Text style={styles.desc}>{listing.itemDescr}</Text>
        <View style={{
          borderBottomColor: 'black',
          borderBottomWidth: 2,
          width: '90%',
          alignSelf: 'center',
        }}
        />
        <Text style={styles.price}>Price: ${listing.price}</Text>
        { posterName !== username ? (
          <>
            <Pressable
            style={styles.buyBtn}
            onPress={(e) => handleCheckout(e)}
            >
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Buy It Now</Text>
            </Pressable>
            <Pressable
            style={styles.cartBtn}
            onPress={(e) => handleCart(e)}
            >
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Add to Cart</Text>
            </Pressable>
            <Pressable
            style={styles.buyBtn}
            onPress={(e) => handleSave(e)}
            >
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Save Item</Text>
            </Pressable>
          </>
        ) : (
          null
        )}
    </ScrollView>
  </SafeAreaView>
  );
};

export default RegItem;
