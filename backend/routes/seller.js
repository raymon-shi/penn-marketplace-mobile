/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const ItemBid = require('../models/ItemBid');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// route to accept a bid and add to transaction
router.post('/acceptBid', async (req, res) => {
  const {
    buyerName, listingBid, totalCost,
  } = req.body;
  try {
    const sellerUser = await User.findOne({ name: req.session.name });
    const buyerUser = await User.findOne({ name: buyerName });
    const transaction = await Transaction.create({
      seller: sellerUser.name,
      buyer: buyerUser.name,
      listingBid,
      totalCost,
      // info,
    });
    res.status(201).json(transaction);
  } catch (error) {
    throw new Error('Error with completing transaction');
  }
});

// route to handle adding transaction to seller's account
// and buyer's account WHEN buying bid items
router.post('/addTransaction', async (req, res) => {
  const { transaction } = req.body;
  try {
    await User.findOneAndUpdate(
      { email: req.session.email },
      { $addToSet: { transactionHistory: transaction }});
    await User.findOneAndUpdate(
      { name: transaction.buyer },
      { $addToSet: { transactionHistory: transaction } },
    );
    await ItemBid.findByIdAndDelete(transaction.listingBid._id);
    res.status(200).send('Regular listing successfully added to watchlist!');
  } catch (error) {
    throw new Error('Error with completeing transaction');
  }
});

module.exports = router;
