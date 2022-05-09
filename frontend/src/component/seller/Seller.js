import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Start from './Start';
import PriceListing from './PriceListing';
import BidListing from './BidListing';
import Success from './Success';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

});

const Seller = ({ navigation }) => {
  const [priceListing, setPriceListing] = useState(false);
  const [bidListing, setBidListing] = useState(false);
  const [successPage, setSuccessPage] = useState(false);

  return (
    <View style={styles.container}>
      {!priceListing && !bidListing && !successPage && (
        <Start setPriceListing={() => setPriceListing(true)} setBidListing={() => setBidListing(true)} />
      )}

      {priceListing && (
        <PriceListing onSubmit={() => { setPriceListing(false); setSuccessPage(true); }} onBack={() => setPriceListing(false)} />
      )}

      {bidListing && (
        <BidListing onSubmit={() => { setBidListing(false); setSuccessPage(true); }} onBack={() => setBidListing(false)} />
      )}

      {successPage && <Success onSubmit={() => setSuccessPage(false)} navigation={navigation} />}
    </View>
  );
};

export default Seller;
