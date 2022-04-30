const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const bidSchema = new Schema({
  bidderName: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

const Bid = model('Bid', bidSchema);

module.exports = Bid;
