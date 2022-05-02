const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  listingRegular: { type: Schema.Types.ObjectId, ref: 'ItemRegular' },
  listingBid: { type: Schema.Types.ObjectId, ref: 'ItemBid' },
  totalCost: { type: Number, required: true },
}, { timestamps: true });

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;
