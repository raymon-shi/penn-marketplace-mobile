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
          {generateRatingComponent(review.item.reviewRating)}
        </View>
        <Text style={{ marginLeft: '1%' }}>
          {review.item.authorName}
        </Text>
      </View>
      <View>
        <Text>
          {review.item.reviewContent}
        </Text>
      </View>
    </View>
  );

  function findAverageRating() {
    const sum = route.params.reviews.reduce((acc, curr) => acc + Number(curr.reviewRating), 0);
    return sum / route.params.reviews.length;
  }

  return (
    <SafeAreaView>
      <AccountHeader page="Reviews" navigation={navigation} />
      {route.params.reviews.length === 0
        ? <Text>You have no reviews.</Text>
        : (
          <View>
            <Text>
              Average Rating - {findAverageRating()} stars
            </Text>
            <FlatList
              data={route.params.reviews}
              renderItem={reviewsList}
              keyExtractor={(item) => item.email}
            />
          </View>
        )}
    </SafeAreaView>
  );
};

export default Reviews;
