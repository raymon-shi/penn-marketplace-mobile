import { React, useState, useEffect } from 'react';
import {
  Platform, TextInput, View, Pressable, StyleSheet, Text, ScrollView, Image, SafeAreaView,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const { manifest } = Constants;

// send to correct server (different if web vs expo app)
const serverURL = Platform.OS === 'web' ? 'http://localhost:8081' : `http://${manifest.debuggerHost.split(':').shift()}:8081`;

const styles = StyleSheet.create({
  pay: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
    padding: 10,
  },
  confirm: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderWidth: 1,
  },
  infoContainer: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    width: '90%',
  },
  buyBtn: {
    backgroundColor: '#990000',
    borderRadius: 10,
    width: '90%',
    paddingVertical: 12,
    margin: 10,
    alignSelf: 'center',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 10,
    fontFamily: 'Futura-Medium',
    alignSelf: 'center',
  },
});

const ItemCheckout = ({ route, navigation }) => {
  const [num, setNum] = useState('');
  const [exp, setExp] = useState('');
  const [cvc, setCVC] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const listing = route.params.listing;
  const bid = route.params.bid;
  const currBid = route.params.currBid;
  const isBidItem = route.params.isBidItem;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (bid) {
      setTotal(bid);
    } else {
      setTotal(listing.price);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (num !== '' && exp !== '' && cvc !== '' && first !== '' && last !== '') {
      const name = `${first} ${last}`;
      const info = {
        name,
        num,
        exp,
        cvc,
        first,
        last,
      };
      try {
        if (isBidItem) {
          // add bid to listing -> create transaction -> add transaction to user history
          await axios.post(`${serverURL}/buyer/addBid/${listing._id}`, { bid });
          navigation.navigate('Home');
        } else {
          // create reg item transaction -> add transaction to user history
          const purchase = await axios.post(
            `${serverURL}/buyer/regTransaction`,
            {
              sellerName: listing.posterName,
              listingRegular: listing,
              totalCost: listing.price,
              info,
            },
          );
          await axios.post(`${serverURL}/buyer/addTransaction`, { transaction: purchase.data });
          navigation.navigate('Home');
        }
      } catch (error) {
        Error('Problem with completeing transaction');
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', fontFamily: 'Futura-Medium', }}>{listing.itemName}</Text>
          <Text>Listed by: {listing.posterName}</Text>
          {listing.media && listing.media !== '' ? 
            <Image
            style={styles.image}
            source={{ uri: `${serverURL}\\${listing.media}`.replaceAll('\\', '/') }}
          /> : null}
          <Text>{listing.itemDescr}</Text>
          {isBidItem ? (
          <>
          <Text style={styles.price}>Highest Bid: ${currBid}</Text>
          <Text style={styles.price}>Your Bid: ${bid}</Text>
          </>) 
          : 
          <Text style={styles.price}>Price: ${listing.price}</Text>}
        </View>
        <View style={styles.pay}>
          <Text style={{ fontSize: 22, textAlign: 'center' }}>Pay With: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setNum}
            value={num.toString()}
            keyboardType="number-pad"
            placeholder="Card Number"
          />
          <TextInput
            style={styles.input}
            onChangeText={setExp}
            value={exp}
            keyboardType="number-pad"
            placeholder="Exp. Date"
          />
          <TextInput
            style={styles.input}
            onChangeText={setCVC}
            value={cvc.toString()}
            keyboardType="number-pad"
            placeholder="CVC"
          />
          <TextInput
            style={styles.input}
            onChangeText={setFirst}
            value={first}
            keyboardType="default"
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setLast}
            value={last}
            keyboardType="default"
            placeholder="Last Name"
          />
        </View>
        <View style={{ flex: 1}}>
         <Text style={styles.price}>
            Total: ${total}
          </Text>
          <Pressable
            style={styles.buyBtn}
            onPress={(e) => handleSubmit(e)}
            >
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>{isBidItem ? 'Confirm Bid' : 'Confirm and Pay'}</Text>
          </Pressable> 
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemCheckout;
