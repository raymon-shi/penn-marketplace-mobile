const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const itemBidSchema = new Schema({
  posterName: { type: String, required: true },
  itemName: { type: String, required: true },
  itemDescr: { type: String },
  media: { type: String },
  price: { type: Number, required: true },
  bidHistory: [{ bidAmount: Number, bidderName: String }],
  tag: { type: String },
}, { timestamps: true });

const ItemBid = model('ItemBid', itemBidSchema);

module.exports = ItemBid;
