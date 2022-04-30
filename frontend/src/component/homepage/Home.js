import React from 'react';
import {
  SafeAreaView, View, StyleSheet, Text, Image, ScrollView,
} from 'react-native';
import { Heading } from 'native-base';
import Carousel from 'react-native-snap-carousel';

import { v4 as uuidv4 } from 'uuid';
import items from './assets/productimages.json';
import beanbag from './assets/beanbag.jpg';

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

const renderItem = ({ item }) => (
  <View style={styles.carouselSlide}>
    <Image
      source={beanbag}
      style={styles.carouselImage}
    />
    <Text>{item.price}</Text>
  </View>
);

const Home = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View>
        <Heading size="lg" style={styles.titleColor}>Trending Listings</Heading>
        <View style={styles.carouselWrapper}>
          <Carousel
            data={items}
            renderItem={renderItem}
            sliderWidth={400}
            itemWidth={150}
            enableMomentum={false}
            lockScrollWhileSnapping
            autoplay
            useScrollView
            loop
            autoplayInterval={5000}
            keyExtractor={() => uuidv4()}
          />
        </View>
      </View>

      <View>
        <Heading size="lg" style={styles.titleColor}>Saved Listings</Heading>
        <View style={styles.carouselWrapper}>
          <Carousel
            data={items}
            renderItem={renderItem}
            sliderWidth={400}
            itemWidth={150}
            enableMomentum={false}
            lockScrollWhileSnapping
            autoplay
            useScrollView
            loop
            autoplayInterval={5000}
            keyExtractor={() => uuidv4()}
          />
        </View>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Heading size="lg" style={styles.titleColor}>Today&apos;s listings</Heading>
        <View style={styles.carouselWrapper}>
          <Carousel
            data={items}
            renderItem={renderItem}
            sliderWidth={400}
            itemWidth={150}
            enableMomentum={false}
            lockScrollWhileSnapping
            autoplay
            useScrollView
            loop
            autoplayInterval={5000}
            keyExtractor={() => uuidv4()}
          />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default Home;
