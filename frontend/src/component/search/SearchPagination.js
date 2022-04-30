import { Button, Container } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SearchPagination = () => (
  <Container style={styles.container}>
    <Button>
      Prev
    </Button>
    <Button>
      Next
    </Button>
  </Container>
);

export default SearchPagination;
