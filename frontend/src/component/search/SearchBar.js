import React, { useState } from 'react';
import {
  Box,
  Center, Input, Image, Heading, Button,
} from 'native-base';
import { StyleSheet } from 'react-native-web';
import pennLogo from './assets/UniversityofPennsylvania_Shield_RGB.png';

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#011F5B',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pennLogo: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
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

const SearchBar = ({
  searchBarText, setSearchBarText, filterType, setFilterType,
}) => {
  const filterHeaders = ['Home', 'Saved', 'Textbooks', 'Services', 'Clothes', 'Housing & Furniture'];
  return (
    <Center w="100%">
      <Box w="100%" style={styles.searchBar}>
        <Input w="75%" placeholder="Explore the Penn Marketplace!" variant="filled" style={styles.inputStyle} />
      </Box>
      <Box style={styles.headerBar}>
        {filterHeaders.map((filter) => <Button key={filter} value={filter} onPress={() => setFilterType(filter)}>{` ${filter} `}</Button>)}
      </Box>
      {filterType}
    </Center>
  );
};

export default SearchBar;
