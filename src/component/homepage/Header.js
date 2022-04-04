import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Input } from 'native-base';

const Header = () => {
  const x = 3;

  const styles = StyleSheet.create({
    searchBar: {
      backgroundColor: '#011F5B',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 50,
      paddingBottom: 15,
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
      paddingTop: '10%',
    },
  });

  return (
    <Box w="100%" style={styles.searchBar}>
      <Input w="75%" placeholder="Explore the Penn Marketplace!" variant="filled" style={styles.inputStyle} />
    </Box>
  );
};

export default Header;
