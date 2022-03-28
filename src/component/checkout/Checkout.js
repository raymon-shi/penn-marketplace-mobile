import {React, useState } from 'react';
import { TextInput, View, FlatList, StyleSheet, Text, StatusBar, Image, Button } from 'react-native';
import Data from './data/index.js';

const styles = StyleSheet.create({
  cart: {
    flex: 3,
    marginTop: StatusBar.currentHeight || 0,
  },
  pay: {
    flex: 2,
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  confirm: {
    flex: 1,
    flexDirection: "row"
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
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "90%",
  }
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

const total = Data.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
const discount = 0.00;
const tax = .08;

const Checkout = ({ navigation }) => {
  const [num, setNum] = useState('');
  const [exp, setExp] = useState('');
  const [cvc, setCVC] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');

  const renderItem = ({ item }) => (
    <Item title={item.title} 
    price={item.price} 
    lister={item.lister} 
    image={item.image}/>
  );

  return (
    <View style={{ flexDirection: "column", flex: 1}}>
      <View style={styles.cart}>
        <Text style={styles.header}>Items</Text>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.pay}>
        <Text style={{ fontSize: 22 , textAlign: "center"}}>Pay With: </Text>
        <TextInput 
          style={styles.input}
          onChangeText={setNum}
          value={num.toString()}
          keyboardType={'number-pad'}
          placeholder="Card Number"
        />
        <TextInput 
          style={styles.input}
          onChangeText={setExp}
          value={exp}
          keyboardType={'number-pad'}
          placeholder="Exp. Date"
        />
        <TextInput 
          style={styles.input}
          onChangeText={setCVC}
          value={cvc.toString()}
          keyboardType={'number-pad'}
          placeholder="CVC"
        />
        <TextInput 
          style={styles.input}
          onChangeText={setFirst}
          value={first}
          keyboardType={'default'}
          placeholder="First Name"
        />
        <TextInput 
          style={styles.input}
          onChangeText={setLast}
          value={last}
          keyboardType={'default'}
          placeholder="Last Name"
        />
      </View>
      <View style={styles.confirm}>
        <View style={{ flex: 1 }}>
          <Text style={{ paddingLeft: 50 }}>
          Subtotal ({Data.length} items):{"\n"}
          Discount:{"\n"}
          Tax:{"\n"}
          Order total: 
          </Text>
          <Button title="Confirm and Pay"/>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: "right", paddingRight: 50 }}>
            ${total}{"\n"}
            ${discount}{"\n"}
            ${tax * total}{"\n"}
            ${(tax * total + total) - discount}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Checkout;
