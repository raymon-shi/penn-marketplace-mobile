import React, { useState } from 'react';
import {
  Box,
  Center, Input, Image, Heading, Button, Select, View, FormControl,
} from 'native-base';
import { StyleSheet } from 'react-native';
import pennLogo from './assets/UniversityofPennsylvania_Shield_RGB.png';

const styles = StyleSheet.create({
  searchBar: {
    top: 0,
    position: "absolute",
  },
  content: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center'
  },
  inputStyle: {
    backgroundColor: '#fff',
  },
  textStyle: {
    color: 'white',
    
  },
  headerBar: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    width: '50',
  },
});

const SearchBar = ({ navigation }) => {
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');

  return (
    <Center>
      <View navigation={navigation} style={styles.content}>
        <Input w="200"placeholder="Explore the Penn Marketplace!" variant="filled" onChangeText={setQuery}/>
        <Select w="40" style={{ color: "white" }} variant="filled" selectedValue={filter} accessibilityLabel="All" placeholder="All" onValueChange={itemValue => setFilter(itemValue)}>
            <Select.Item label="All" value="" />
            <Select.Item label="Home" value="Home" />
            <Select.Item label="Textbooks" value="Textbooks" />
            <Select.Item label="Services" value="Services" />
            <Select.Item label="Clothes" value="Clothes" />
            <Select.Item label="Housing &amp; Furniture" value="Housing &amp; Furniture" />
          </Select>
        </View>
      <Button onPress={() => navigation.navigate('Results', {searchInput: query, category: filter})}>
          Search!
      </Button>
    </Center>

  );
};

export default SearchBar;
