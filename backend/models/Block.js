const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const blockSchema = new Schema({
  blockerName: { type: String, required: true },
  blockerEmail: { type: String, required: true },
  blockedUserName: { type: String, required: true },
  blockedUserEmail: { type: String, required: true },
}, { timestamps: true });

const Block = model('Block', blockSchema);

module.exports = Block;
