import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Center, Box } from 'native-base';

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

const Seller = () => {
  const [priceListing, setPriceListing] = useState(false);
  const [bidListing, setBidListing] = useState(false);
  const [successPage, setSuccessPage] = useState(false);

  return (
    <View style={styles.container}>
      {!priceListing && !bidListing && (
        <Start
          setPriceListing={() => setPriceListing(true)}
          setBidListing={() => setBidListing(true)}
        />
      )}

      {priceListing && (
        <PriceListing
          onSubmit={() => {
            setPriceListing(false);
            setSuccessPage(true);
          }}
        />
      )}

      {bidListing && (
        <BidListing
          onSubmit={() => {
            setBidListing(false);
            setSuccessPage(true);
          }}
        />
      )}

      {successPage && <Success setSuccessPage={setSuccessPage} />}
    </View>
  );
};

export default Seller;
