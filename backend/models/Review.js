const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  authorEmail: { type: String, required: true },
  authorName: { type: String, required: true },
  recipient: { type: String, required: true },
  reviewContent: { type: String, required: true },
  reviewRating: { type: Number, required: true },
}, { timestamps: true });

const Review = model('Review', reviewSchema);

module.exports = Review;
