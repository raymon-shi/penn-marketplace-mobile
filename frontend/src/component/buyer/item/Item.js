import { React, useState, useEffect } from 'react';
import {
  SafeAreaView, View, Pressable, StyleSheet, Text, Image, TextInput,
} from 'react-native';
import Data from './data/index';

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    borderWidth: 1,
    marginTop: 10,
  },
  container: {
    alignItems: 'center',
  },
  tags: {
    fontSize: 12,
    fontFamily: 'Futura-Medium',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 10,
    fontFamily: 'Futura-Medium',
  },
  lister: {
    fontSize: 12,
    fontFamily: 'Futura-Medium',
    margin: 10,
  },
  desc: {
    margin: 10,
    fontSize: 16,
    fontFamily: 'Futura-Medium',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 10,
    fontFamily: 'Futura-Medium',
  },
  buyBtn: {
    backgroundColor: '#990000',
    borderRadius: 10,
    width: 200,
    paddingVertical: 12,
    margin: 10,
    alignSelf: 'center',
  },
  cartBtn: {
    backgroundColor: '#011F5B',
    borderRadius: 10,
    width: 200,
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

const Item = ({ navigation, route }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemLister, setItemLister] = useState('');
  const [itemTags, setItemTags] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemRating, setItemRating] = useState(0);
  const [itemImage, setItemImage] = useState('');
  const [isBid, setIsBid] = useState(true);
  const [bidAmount, setBidAmount] = useState('');

  console.log(route.params.itemId);

  function setItem() {
    setItemName(Data.title);
    setItemPrice(Data.price);
    setItemLister(Data.lister);
    setItemTags(Data.tags);
    setItemDesc(Data.desc);
    setItemRating(Data.rating);
    setItemImage(Data.image);
    setIsBid(Data.bid);
  }

  function handleBuy(e) {
    e.preventDefault();
    navigation.navigate("Checkout");
  }

  function handleCart(e) {
    e.preventDefault();
    console.log('Added to Cart!');
    navigation.navigate("Cart");
  }

  const buyButton = (
    <View>
      <Text style={styles.price}>Price: ${itemPrice}</Text>
      <Pressable
        style={styles.buyBtn}
        onPress={(e) => handleBuy(e)}
      >
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Buy It Now</Text>
      </Pressable>
    </View>
  );

  const bidButton = (
    <View>
      <Text style={styles.price}>Current Bid: ${itemPrice}</Text>
      <TextInput 
      style={styles.bidInput}
      onChangeText={setBidAmount}
      value={bidAmount}
      placeholder='Bid Amount'
      keyboardType='numeric'
      />
      <Pressable
      style={styles.buyBtn}
      onPress={(e) => handleBuy(e)}
      >
      <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Place Bid</Text>
    </Pressable>
    </View>
  );

  useEffect(() => {
    setItem();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: itemImage }}
      />
      <Text style={styles.tags}>Tags: {itemTags}</Text>
      <Text style={styles.header}>{itemName}</Text>
      <View style={{
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        width: '90%',
      }}
      />    
      <Text style={styles.lister}>Listed by: {itemLister} ({itemRating}%) | Contact Seller | Follow Seller </Text>
      <Text style={styles.desc}>{itemDesc}</Text>
      <View style={{
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        width: '90%',
      }}
      />
      {isBid ? bidButton : buyButton}
      <Pressable
        style={styles.cartBtn}
        onPress={(e) => handleCart(e)}
      >
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Add to Cart</Text>
      </Pressable>
  </SafeAreaView>
  );
};

export default Item;
