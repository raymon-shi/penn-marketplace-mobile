const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const followSchema = new Schema({
  followerName: { type: String, required: true },
  followerEmail: { type: String, required: true },
  followingName: { type: String, required: true },
  followingEmail: { type: String, required: true },
}, { timestamps: true });

const Follow = model('Follow', followSchema);

module.exports = Follow;
