const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const itemRegularSchema = new Schema({
  posterName: { type: String, required: true },
  itemName: { type: String, required: true },
  itemDescr: { type: String },
  media: { type: String },
  price: { type: Number, required: true },
  tag: { type: String },
}, { timestamps: true });

const ItemRegular = model('ItemRegular', itemRegularSchema);

module.exports = ItemRegular;
