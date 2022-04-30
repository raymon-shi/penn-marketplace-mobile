const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const reportSchema = new Schema({
  authorEmail: { type: String, required: true },
  recipientEmail: { type: String, required: true },
  reportContent: { type: String, required: true },
}, { timestamps: true });

const Report = model('Report', reportSchema);

module.exports = Report;
