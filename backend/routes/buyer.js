/* eslint-disable no-underscore-dangle */
const express = require('express');
const ItemRegular = require('../models/ItemRegular');
const ItemBid = require('../models/ItemBid');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const router = express.Router();

// route to retrieve regular listings by item ID
router.get('/getRegListing/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await ItemRegular.findById(itemId).exec();
    res.status(200).json(item);
  } catch (error) {
    next(new Error('Error with retrieving listing'));
  }
});

// route to retrieve bid listings by item ID
router.get('/getBidListing/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await ItemBid.findById(itemId).exec();
    res.status(200).json(item);
  } catch (error) {
    next(new Error('Error with retrieving listing'));
  }
});

// route to add regular item to cart
router.post('/addCartRegItem/:id', async (req, res) => {
  try {
    // const item = await ItemRegular.findById(req.params.id);
    const itemId = req.params.id;
    await User.findOneAndUpdate(
      { email: req.session.email,
        'shoppingCart._id': { $ne: req.params.id }},
      { $addToSet: { shoppingCart: itemId }});
    res.status(200).send('Regular listing successfully added to cart!');
  } catch (error) {
    res.status(500).send('An unknown error occured');
    throw new Error('Error with adding reg item to cart');
  }
});

// route to add bid item to cart
router.post('/addCartBidItem/:id', async (req, res) => {
  try {
    const { bid } = req.body;
    const item = await ItemBid.findById(req.params.id);
    await User.findOneAndUpdate(
      { email: req.session.email,
        'shoppingCart._id': { $ne: req.params.id }},
      { $addToSet: { shoppingCart: {item , bid} }});
    res.status(200).send('Regular listing successfully added to cart!');
  } catch (error) {
    res.status(500).send('An unknown error occured');
    throw new Error('Error with adding bid item to cart');
  }
});

// route to remove reg item from cart
router.post('/removeCartRegItem/:id', async (req, res) => {
  try {
    // const item = await ItemRegular.findById(req.params.id);
    const itemId = req.params.id;
    await User.findOneAndUpdate(
      { email: req.session.email },
      { $pull: { shoppingCart: itemId }});
    res.status(200).send('Regular listing removed successfully from cart!');
  } catch (error) {
    res.status(500).send('An unknown error occured');
    throw new Error('Error with removing reg item from cart');
  }
});

// route to get users shopping cart
router.get('/cart', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.email });
    const cart = await ItemRegular.find({ _id: { $in: user.shoppingCart } });
    res.status(200).json(cart);
  } catch (error) {
    next(new Error('Error with retrieving cart'));
  }
});

// route to add regular item to watchlist
router.post('/addWatchRegItem/:id', async (req, res) => {
  try {
    const item = await ItemRegular.findById(req.params.id);
    await User.findOneAndUpdate(
      { email: req.session.email, 
        'shoppingCart._id': { $ne: req.params.id }},
      { $addToSet: { watchlistRegular: item }});
    res.status(200).send('Regular listing successfully added to watchlist!');
  } catch (error) {
    res.status(500).send('An unknown error occured');
    throw new Error('Error with adding reg item to watchlist');
  }
});

// route to add bid item to watchlist
router.post('/addWatchBidItem/:id', async (req, res) => {
  try {
    const item = await ItemBid.findById(req.params.id);
    await User.findOneAndUpdate(
      { email: req.session.email, 
        'shoppingCart._id': { $ne: req.params.id }},
      { $addToSet: { watchlistBid: item }});
    res.status(200).send('Bid listing successfully added to watchlist!');
  } catch (error) {
    res.status(500).send('An unknown error occured');
    throw new Error('Error with adding bid item to watchlist');
  }
});

// route to remove reg item from watchlist
router.post('/removeWatchRegItem/:id', async (req, res) => {
  try {
    const item = await ItemRegular.findById(req.params.id);
    await User.findOneAndUpdate(
      { email: req.session.email },
      { $pull: { watchlistRegular: item }});
    res.status(200).send('Regular listing removed successfully from watchlist!');
  } catch (error) {
    res.status(500).send('An unknown error occured');
    throw new Error('Error with removing reg item from watchlist');
  }
});

// route to remove bid item from watchlist
router.post('/removeWatchRegItem/:id', async (req, res) => {
  try {
    const item = await ItemBid.findById(req.params.id);
    await User.findOneAndUpdate(
      { email: req.session.email },
      { $pull: { watchlistBid: item }});
    res.status(200).send('Bid listing removed successfully from watchlist!');
  } catch (error) {
    res.status(500).send('An unknown error occured');
    throw new Error('Error with removing bid item from watchlist');
  }
});

// route to add bid to bidhistory
router.post('/addBid/:id', async (req, res) => {
  const { bid } = req.body;
  const { session } = req;
  const { name } = session;
  try {
    await ItemBid.findOneAndUpdate(
      { _id: req.params.id },
      { price: bid, $addToSet: { bidHistory: { bidAmount: bid, bidderName: name } } },
    );
    res.status(200).send('Bid placed successfully');
  } catch (error) {
    res.status(500).send('An unknown error occured');
    throw new Error('Error with adding bid to item');
  }
});

// route to handle Regular transactions
router.post('/regTransaction', async (req, res) => {
  const {
    sellerName, listingRegular, totalCost, info,
  } = req.body;
  try {
    const sellerUser = await User.findOne({ name: sellerName });
    const buyerUser = await User.findOne({ email: req.session.email });
    const transaction = await Transaction.create({
      seller: sellerUser.name,
      buyer: buyerUser.name,
      listingRegular,
      totalCost,
      info,
    });
    res.status(201).json(transaction);
  } catch (error) {
    throw new Error('Error with completing transaction');
  }
});

// route to handle adding transaction to buyer's account
// and seller's account WHEN buying regular items
router.post('/addTransaction', async (req, res) => {
  const { transaction } = req.body;
  try {
    await User.findOneAndUpdate(
      { email: req.session.email },
      { $addToSet: { transactionHistory: transaction },
        $pull: { shoppingCart: transaction.listingRegular._id },
      },
    );
    await User.findOneAndUpdate(
      { name: transaction.seller },
      { $addToSet: { transactionHistory: transaction } },
    );
    await ItemRegular.findByIdAndDelete(transaction.listingRegular._id);
    res.status(200).send('Regular listing successfully added to watchlist!');
  } catch (error) {
    throw new Error('Error with completeing transaction');
  }
});

module.exports = router;
