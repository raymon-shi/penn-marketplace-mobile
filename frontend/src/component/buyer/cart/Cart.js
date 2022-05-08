import { useState, useEffect } from 'react';
import {
  View, FlatList, StyleSheet, Text, StatusBar, Image, Pressable,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const { manifest } = Constants;

// send to correct server (different if web vs expo app)
const serverURL = Platform.OS === 'web' ? 'http://localhost:8081' : `http://${manifest.debuggerHost.split(':').shift()}:8081`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: 40,
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
  cartBtn: {
    backgroundColor: '#990000',
    borderRadius: 10,
    width: '90%',
    paddingVertical: 12,
    margin: 10,
    alignSelf: 'center',
  },
  removeBtn: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 5,
    padding: 5,
  }
});

const Cart = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {
      const userCart = await axios.get(`${serverURL}/buyer/cart`);
      setCart(userCart.data);
    } catch (error) {
      throw new Error('Error with loading cart');
    }
  };

  const handleRemoveReg = async (id) => {
    try {
      await axios.post(`${serverURL}/buyer/removeCartRegItem/${id}`);
      getCart();
    } catch (error) {
      throw new Error(`Error with removing item with id:${id} from cart`);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const Item = ({
    title, price, lister, image, itemId
  }) => (
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.lister}>Seller: {lister}</Text>
        <Pressable
        style={styles.removeBtn}
        onPress={() => handleRemoveReg(itemId)}>
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Remove from Cart</Text>
        </Pressable>
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

  const handleCheckout = (e) => {
    e.preventDefault();
    navigation.navigate('CartCheckout');
  };

  const subTotal = cart.map((item) => item.price).reduce((prev, curr) => prev + curr, 0);
  let btn = false;
  if (subTotal <= 0) {
    btn = true;
  }

  const renderItem = ({ item }) => (
    <Item
      title={item.itemName}
      price={item.price}
      lister={item.posterName}
      image={item.media}
      itemId={item._id}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Cart ({cart.length} items)</Text>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Total: ${subTotal}</Text>
      <Pressable
      style={styles.cartBtn}
      onPress={(e) => handleCheckout(e)}
      >
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Checkout</Text>
      </Pressable>
    </View>
  );
};

export default Cart;
