import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, View, StyleSheet, Text, Image, ScrollView, Platform, TouchableOpacity,
} from 'react-native';
import { Heading } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import Constants from 'expo-constants';

import { v4 as uuidv4 } from 'uuid';
import items from './assets/productimages.json';
import beanbag from './assets/beanbag.jpg';

const { manifest } = Constants;

// send to correct server (different if web vs expo app)
const serverURL = Platform.OS === 'web' ? 'http://localhost:8081' : `http://${manifest.debuggerHost.split(':').shift()}:8081`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselWrapper: {
    height: 150,
  },
  carouselSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 10,
    paddingBottom: 5,
  },
  carouselImage: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleColor: {
    marginTop: 10,
    paddingLeft: 12,
    color: '#33425B',
  },
});

const Home = ({ navigation }) => {
  const [regListings, setRegListings] = useState([]);
  const [bidListings, setBidListings] = useState([]);
  const [savedListings, setSavedListings] = useState([]);

  const renderItem = ({ item }) => {
    if (item.media && item.media !== '') {
      return (
        <View style={styles.carouselSlide}>
          <TouchableOpacity
            // eslint-disable-next-line no-underscore-dangle
            onPress={() => navigation.navigate('Item', { itemId: item._id })}
            style={{
              flex: 1, width: '100%', height: '100%', alignContent: 'center', justifyContent: 'center'
            }}
          >
            <Image
              source={{ uri: `${serverURL}\\${item.media}`.replaceAll('\\', '/') }}
              style={styles.carouselImage}
            />
            <Text style={{ alignSelf: 'center' }}>{`$${item.price}`}</Text>
            <Text style={{ alignSelf: 'center' }}>{`Listed by ${item.posterName && item.posterName.split(' ')[0]}`}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <TouchableOpacity
      // eslint-disable-next-line no-underscore-dangle
        onPress={() => navigation.navigate('Item', { itemId: item._id })}
        style={{
          flex: 1, width: '100%', height: '100%', alignContent: 'center', justifyContent: 'center'
        }}
      >
        <View style={styles.carouselSlide}>
          <Text>{`$${item.price}`}</Text>
          <Text>{`Listed by ${item.posterName && item.posterName.split(' ')[0]}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderBidItem = ({ item }) => {
    if (item.media && item.media !== '') {
      return (
        <View style={styles.carouselSlide}>
          <TouchableOpacity
            // eslint-disable-next-line no-underscore-dangle
            onPress={() => navigation.navigate('Item', { itemId: item._id })}
            style={{
              flex: 1, width: '100%', height: '100%', alignContent: 'center', justifyContent: 'center'
            }}
          >
            <Image
              source={{ uri: `${serverURL}\\${item.media}`.replaceAll('\\', '/') }}
              style={styles.carouselImage}
            />
            <Text style={{ alignSelf: 'center' }}>{`Highest Bid: $${item.price}`}</Text>
            <Text style={{ alignSelf: 'center' }}>{`Listed by ${item.posterName.split(' ')[0]}`}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <TouchableOpacity
        // eslint-disable-next-line no-underscore-dangle
        onPress={() => navigation.navigate('Item', { itemId: item._id })}
        style={{
          flex: 1, width: '100%', height: '100%', alignContent: 'center', justifyContent: 'center'
        }}
      >
        <View style={styles.carouselSlide}>
          <Text>{`Highest Bid: $${item.price}`}</Text>
          <Text>{`Listed by ${item.posterName.split(' ')[0]}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSavedItem = ({ item }) => (
    <View style={styles.carouselSlide}>
      <Image
        source={beanbag}
        style={styles.carouselImage}
      />
      <Text>{`$${item.price}`}</Text>
    </View>
  );

  const getRegListings = async () => {
    try {
      const { data } = await axios.get(`${serverURL}/item/getRegListings`);
      if (data && data.length > 0) {
        setRegListings(data.reverse());
      }
    } catch (err) {
      console.log('Error in retrieving regular listings');
    }
  };

  const getBidListings = async () => {
    try {
      const { data } = await axios.get(`${serverURL}/item/getBidListings`);
      if (data && data.length > 0) {
        setBidListings(data.reverse());
      }
    } catch (err) {
      console.log('Error in retrieving bid listings');
    }
  };

  useEffect(() => {
    getRegListings();
    getBidListings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Heading size="lg" style={styles.titleColor}>Regular Listings</Heading>
          <View style={styles.carouselWrapper}>
            <Carousel
              data={regListings}
              renderItem={renderItem}
              sliderWidth={400}
              itemWidth={150}
              enableMomentum={false}
              lockScrollWhileSnapping
              autoplay
              useScrollView
              loop
              autoplayInterval={5000}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        <View>
          <Heading size="lg" style={styles.titleColor}>Bid Listings</Heading>
          <View style={styles.carouselWrapper}>
            <Carousel
              data={bidListings}
              renderItem={renderBidItem}
              sliderWidth={400}
              itemWidth={150}
              enableMomentum={false}
              lockScrollWhileSnapping
              autoplay
              useScrollView
              loop
              autoplayInterval={5000}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Heading size="lg" style={styles.titleColor}>Saved Listings</Heading>
          <View style={styles.carouselWrapper}>
            <Carousel
              data={items}
              renderItem={renderSavedItem}
              sliderWidth={400}
              itemWidth={150}
              enableMomentum={false}
              lockScrollWhileSnapping
              autoplay
              useScrollView
              loop
              autoplayInterval={5000}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
