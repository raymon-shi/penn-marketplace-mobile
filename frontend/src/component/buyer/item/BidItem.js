import { React, useState, useEffect } from 'react';
import {
  Platform, SafeAreaView, View, Pressable, StyleSheet, Text, Image, ScrollView, TextInput,
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
    fontSize: 20,
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
    width: '90%',
    alignSelf: 'center',
  },
});

const BidItem = ({ navigation, route }) => {
  const [listing, setListing] = useState({});
  const [username, setUsername] = useState('');
  const [currBid, setCurrBid] = useState(0);
  const [bid, setBid] = useState(0);

  const itemId = route.params.itemId;
  const posterName = route.params.posterName;

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

  const getBidListing = async () => {
    try {
      const item = await axios.get(`${serverURL}/buyer/getBidListing/${itemId}`);
      setListing(item.data);
      setCurrBid(item.data.price);
      setBid(item.data.price + 1);
    } catch (error) {
      throw new Error(`Error with retrieving item with id ${itemId}`);
    }
  };

  const acceptBid = async (event) => {
    event.preventDefault();
    try {
      console.log(`${serverURL}/seller/acceptBid`);
      const { data } = await axios.post(`${serverURL}/seller/acceptBid`, 
      { buyerName: listing.bidHistory[listing.bidHistory.length - 1].bidderName, listingBid: listing, totalCost: currBid });
      await axios.post(`${serverURL}/seller/addTransaction`, { transaction: data });
      //socket.emit('bid accepted', listing.bidHistory.at(-1).bidderName, listing.itemName);
      navigation.navigate('Home');
    } catch (error) {
      throw new Error('Error in accepting bid');
    }
  };

  useEffect(() => {
    getBidListing();
    getUser();
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    await axios.post(`${serverURL}/buyer/addWatchBidItem/${itemId}`);
    navigation.navigate('Home');
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    if (bid > currBid) {
      navigation.navigate('ItemCheckout', {
        listing,
        bid,
        currBid,
        isBidItem: true,
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {listing.media && listing.media !== '' 
        ?
          <Image
          style={styles.image}
          source={{ uri: `${serverURL}\\${listing.media}`.replaceAll('\\', '/') }}
          /> : null}
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
        <Text style={styles.price}>Highest Bid: ${currBid}{`(${listing.bidHistory && listing.bidHistory.length > 0 ? listing.bidHistory[listing.bidHistory.length - 1].bidderName : 'none'})`}</Text>
        { posterName !== username ? (
          <>
          <TextInput 
          style={styles.bidInput}
          onChangeText={setBid}
          value={bid.toString()}
          placeholder={`Enter $${currBid + 1} or higher`}
          keyboardType='numeric'
          />            
          <Pressable
          style={styles.buyBtn}
          onPress={(e) => handleCheckout(e)}
          >
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Place Bid</Text>
          </Pressable>
          <Pressable
          style={styles.cartBtn}
          onPress={(e) => handleSave(e)}
          >
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Save Item</Text>
          </Pressable>
        </>
        ) : (
          <Pressable
          style={styles.buyBtn}
          onPress={(e) => acceptBid(e)}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Accept Bid</Text>
          </Pressable>
        )}
    </ScrollView>
  </SafeAreaView>
  );
};

export default BidItem;
