import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Center, Box, Stack, FormControl, Input, Button, Select, TextArea,
} from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  formBackground: {
    backgroundColor: 'white',
  },
  blueButton: {
    backgroundColor: '#011F5B',
  },
});

const BidListing = ({ onSubmit }) => {
  const [product, setProduct] = useState('');
  const [productDescr, setProductDescr] = useState('');
  const [img, setImg] = useState('');
  const [tag, setTag] = useState('');
  const [invalidImgAlert, setInvalidImgAlert] = useState(false);

  return (
    <Center>
      <Box style={styles.formBackground} shadow="5" w="85%" maxW="400px" p="5" alignItems="center">
        <FormControl mb="5">
          <FormControl.Label>Product</FormControl.Label>
          <Input variant="rounded" placeholder="Enter product name" value={product} onChangeText={setProduct} />
        </FormControl>
        <FormControl mb="5">
          <FormControl.Label>Product Description</FormControl.Label>
          <Input variant="rounded" placeholder="Provide some details about your product" />
        </FormControl>
        <FormControl mb="5">
          <FormControl.Label>Price</FormControl.Label>
          <Input variant="rounded" placeholder="Provide some details about your product" />
        </FormControl>
        <FormControl mb="5">
          <FormControl.Label>Tag</FormControl.Label>
          {/* <Select
            selectedValue={tag}
            minWidth="200"
            accessibilityLabel="Select a tag"
            placeholder="Select a tag"
            dropdownIcon={<FontAwesome name="chevron-down" />}
            mt={1}
            onValueChange={(itemValue) => setTag(itemValue)}
          >
            <Select.Item label="Textbooks" value="Textbooks" />
            <Select.Item label="Services" value="Services" />
            <Select.Item label="Clothes" value="Clothes" />
            <Select.Item label="Housing &#38; Furniture" value="Housing &#38; Furniture" />
          </Select> */}
          <Select placeholder="Select a tag" selectedValue={tag} onValueChange={(itemValue) => setTag(itemValue)}>
            <Select.Item label="Textbooks" value="Textbooks" />
            <Select.Item label="Services" value="Services" />
            <Select.Item label="Clothes" value="Clothes" />
            <Select.Item label="Housing &#38; Furniture" value="Housing &#38; Furniture" />
          </Select>
        </FormControl>
        <Button size="lg" w="50%" style={styles.blueButton} onPress={() => onSubmit()} _text={{ color: 'white' }}>List as a bid</Button>
      </Box>
    </Center>
  );
};

export default BidListing;
