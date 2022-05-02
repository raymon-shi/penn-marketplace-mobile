const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const cartSchema = new Schema({
  itemRegular: [{ type: Schema.Types.ObjectId, ref: 'ItemRegular' }],
  itemBid: [{ type: Schema.Types.ObjectId, ref: 'ItemBid' }],
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;
