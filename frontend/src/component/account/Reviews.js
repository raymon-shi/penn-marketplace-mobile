import React from 'react';
import {
  View, Text, Image, FlatList, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GrayStar from './assets/gray-star.png';
import YellowStar from './assets/yellow-star.png';
import AccountHeader from './AccountHeader';

const styles = StyleSheet.create({
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    margin: '1%',
  },
  image: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
});

const Reviews = ({ route, navigation }) => {
  function generateRatingComponent(numStars) {
    const stars = Array(5).fill(<Image source={GrayStar} style={styles.image} />);
    for (let i = 0; i < numStars; i += 1) {
      stars[i] = (<Image source={YellowStar} style={styles.image} />);
    }
    return stars;
  }

  const reviewsList = (review) => (
    <View style={styles.listItem}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row' }}>
          {generateRatingComponent(review.item.stars)}
        </View>
        <Text style={{ marginLeft: '1%' }}>
          {review.item.name}
        </Text>
      </View>
      <View>
        <Text>
          {review.item.review}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <AccountHeader page="Reviews" navigation={navigation} />
      <FlatList
        data={route.params.reviews}
        renderItem={reviewsList}
        keyExtractor={(item) => item.pennID}
      />
    </SafeAreaView>
  );
};

export default Reviews;
