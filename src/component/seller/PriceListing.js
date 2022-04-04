import React, { useState } from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import {
  Center, Box, Heading, FormControl, Input, Button, Select, TextArea,
} from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import NumericInput from '@wwdrew/react-native-numeric-textinput';

const styles = StyleSheet.create({
  container: {
    paddingBottom: '2%',
  },
  formBackground: {
    backgroundColor: 'white',
  },
  titleColor: {
    color: '#33425B',
  },
  blueButton: {
    backgroundColor: '#011F5B',
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#33425B',
    borderWidth: 2,
    borderRadius: 30,
  },
  blueButtonSpace: {
    marginTop: 5,
    backgroundColor: '#011F5B',
  },
  price: {
    borderColor: 'rgb(229, 229, 229)',
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    fontSize: 12,
  },
});

const PriceListing = ({ onSubmit, onBack }) => {
  const [product, setProduct] = useState('');
  const [productDescr, setProductDescr] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState(null);
  const [tag, setTag] = useState('');
  const [invalidImgAlert, setInvalidImgAlert] = useState(false);

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
      <Heading size="xl" style={styles.titleColor}>Sale Listing</Heading>
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
          <TextArea placeholder="Provide some details about your product" value={productDescr} onChangeText={setProductDescr} />
        </FormControl>
        <FormControl mb="2" isRequired>
          <FormControl.Label>Price</FormControl.Label>
          <NumericInput
            placeholder="Set a price"
            style={styles.price}
            type="currency"
            currency="USD"
            value={price}
            onUpdate={(value) => setPrice(value)}
          />
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
          isDisabled={product === '' || productDescr === '' || price === '' || Number(price) <= 0}
        >
          Post
        </Button>
        <Button size="md" w="50%" style={styles.blueButtonSpace} onPress={onBack} _text={{ color: 'white' }}>Back</Button>
      </Box>
    </Center>
  );
};

export default PriceListing;
