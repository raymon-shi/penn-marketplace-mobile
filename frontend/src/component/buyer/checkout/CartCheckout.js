import { React, useState, useEffect } from 'react';
import {
  Platform, TextInput, View, FlatList, StyleSheet, Text, StatusBar, Image, Pressable,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const { manifest } = Constants;

// send to correct server (different if web vs expo app)
const serverURL = Platform.OS === 'web' ? 'http://localhost:8081' : `http://${manifest.debuggerHost.split(':').shift()}:8081`;

const styles = StyleSheet.create({
  cart: {
    flex: 4,
    marginTop: StatusBar.currentHeight || 0,
  },
  pay: {
    flex: 3,
    borderWidth: 3,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  confirm: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
  },
  item: {
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 28,
  },
  price: {
    fontSize: 18,
  },
  lister: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
  },
  infoContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    direction: 'rtl',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
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
});

const Item = ({
  title, price, lister, image,
}) => (
  <View style={styles.item}>
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.lister}>Seller: {lister}</Text>
    </View>
    <View style={styles.imageContainer}>
      {image && image !== '' ?      
      <Image
        style={styles.image}
        source={{ uri: `${serverURL}\\${image}`.replaceAll('\\', '/') }}
      />: null}
    </View>
  </View>
);

const CartCheckout = ({ navigation }) => {
  const [num, setNum] = useState('');
  const [exp, setExp] = useState('');
  const [cvc, setCVC] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {
      const userCart = await axios.get(`${serverURL}/buyer/cart`);
      setCart(userCart.data);
    } catch (error) {
      throw new Error('Error with loading cart');
    }
  };

  useEffect(() => {
    getCart();
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
      cart.map(async (item) => {
        const purchase = await axios.post(
          `${serverURL}/buyer/regTransaction`,
          {
            sellerName: item.posterName,
            listingRegular: item,
            totalCost: item.price,
            info,
          },
        );
        await axios.post(`${serverURL}/buyer/addTransaction`, { transaction: purchase.data });
        await axios.post(`${serverURL}/buyer/removeCartRegItem/${item._id}`);
      });
      navigation.navigate('Home');
    }
  };

  const subTotal = cart.map((item) => item.price).reduce((prev, curr) => prev + curr, 0);

  const renderItem = ({ item }) => (
    <Item
      title={item.itemName}
      price={item.price}
      lister={item.posterName}
      image={item.media}
    />
  );

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <View style={styles.cart}>
        <Text style={styles.header}>Items</Text>
        <FlatList
          data={cart}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
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
         <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20 }}>
            Total: ${subTotal}
          </Text>
          <Pressable
            style={styles.buyBtn}
            onPress={(e) => handleSubmit(e)}
            >
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Confirm and Pay</Text>
          </Pressable> 
        </View>
    </View>
  );
};

export default CartCheckout;
