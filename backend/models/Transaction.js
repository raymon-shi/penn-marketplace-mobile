const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  seller: { type: String, required: true },
  buyer: { type: String, required: true },
  listingRegular: { type: Object },
  listingBid: { type: Object },
  totalCost: { type: Number, required: true },
  info: { type: Object },
}, { timestamps: true });

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;
