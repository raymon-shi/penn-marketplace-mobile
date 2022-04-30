import React, { useState } from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import {
  Center, Box, Heading, FormControl, Input, Button, Select, TextArea,
} from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const styles = StyleSheet.create({
  container: {
    paddingBottom: '5%',
  },
  formBackground: {
    backgroundColor: 'white',
  },
  titleColor: {
    color: '#33425B',
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#33425B',
    borderWidth: 2,
    borderRadius: 30,
  },
  blueButton: {
    backgroundColor: '#011F5B',
  },
  blueButtonSpace: {
    marginTop: 5,
    backgroundColor: '#011F5B',
  },
});

const BidListing = ({ onSubmit, onBack }) => {
  const [product, setProduct] = useState('');
  const [productDescr, setProductDescr] = useState('');
  const [img, setImg] = useState(null);
  const [tag, setTag] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImg(result.uri);
    }
  };

  return (
    <Center style={styles.container}>
      <Heading size="xl" style={styles.titleColor}>Bid Listing</Heading>
      <Box style={styles.formBackground} rounded="lg" shadow="5" w="85%" maxW="400px" p="5" alignItems="center">
        <FormControl mb="2" isRequired>
          <FormControl.Label>Product</FormControl.Label>
          <Input placeholder="Enter product name" value={product} onChangeText={setProduct} />
        </FormControl>
        <FormControl mb="2">
          <FormControl.Label>Image</FormControl.Label>
          <View>
            <Button
              size="md"
              style={styles.button}
              onPress={pickImage}
              _text={{ color: '#33425B' }}
              endIcon={<FontAwesome name="upload" />}
            >
              Upload Image
            </Button>
            {img && <Image source={{ uri: img }} style={{ width: 50, height: 50 }} />}
          </View>
        </FormControl>
        <FormControl mb="2" isRequired>
          <FormControl.Label>Product Description</FormControl.Label>
          <TextArea h={20} placeholder="Provide some details about your product" value={productDescr} onChangeText={setProductDescr} />
        </FormControl>
        <FormControl mb="2">
          <FormControl.Label>Tag</FormControl.Label>
          <Select placeholder="Select a tag" accessibilityLabel="Select a tag" selectedValue={tag} onValueChange={(itemValue) => setTag(itemValue)}>
            <Select.Item label="Textbooks" value="Textbooks" />
            <Select.Item label="Services" value="Services" />
            <Select.Item label="Clothes" value="Clothes" />
            <Select.Item label="Housing &#38; Furniture" value="Housing &#38; Furniture" />
          </Select>
        </FormControl>
        <Button
          size="md"
          w="50%"
          style={styles.blueButton}
          onPress={onSubmit}
          _text={{ color: 'white' }}
          isDisabled={product === '' || productDescr === ''}
        >
          Post
        </Button>
        <Button size="md" w="50%" style={styles.blueButtonSpace} onPress={onBack} _text={{ color: 'white' }}>Back</Button>
      </Box>
    </Center>
  );
};

export default BidListing;