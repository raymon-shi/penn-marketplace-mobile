import React from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, Image, Button } from 'react-native';
import Data from './data/index.js';

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
    direction: 'rtl'
  },
});

const Item = ({ title, price, lister, image }) => (
  <View style={styles.item}>
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.lister}>Seller: {lister}</Text>
    </View>
    <View style={styles.imageContainer}>
      <Image 
      style={styles.image}
      source={{uri: image}}/>
    </View>
  </View>
);

const handlePress = (e) => {

}

const total = Data.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)


const Cart = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Item title={item.title} 
    price={item.price} 
    lister={item.lister} 
    image={item.image}/>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Cart ({Data.length} items)</Text>
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Text style={{textAlign: 'center', fontSize: 16, }}>Total: ${total}</Text>
      <Button 
      onPress={() => navigation.navigate('Checkout')}
      title="Checkout"
      color="#1238a1"/>
    </View>
  );
}

export default Cart;
