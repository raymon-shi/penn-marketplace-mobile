import React from 'react';
import {
  Center, Container, Heading, VStack, Text, Image,
} from 'native-base';
import { StyleSheet } from 'react-native';
import eldenRing from './assets/elden-ring.png';

const styles = StyleSheet.create({
  resultContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const ResultCard = ({
  title, price, lister, image,
}) => (
  <Container style={styles.resultContainer}>
    <Image alt="result-image-alt" key={image} source={eldenRing} style={{ width: 100, height: 100 }} />
    <Container>
      <Heading>
        {title}
      </Heading>
      <Text>
        {price}
      </Text>
      <Text>
        {`Listed by ${lister}`}
      </Text>
    </Container>

  </Container>
);

export default ResultCard;
