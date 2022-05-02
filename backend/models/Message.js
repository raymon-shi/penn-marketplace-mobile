const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  img: { type: String },
}, { timestamps: true });

const Message = model('Message', MessageSchema);

module.exports = Message;
