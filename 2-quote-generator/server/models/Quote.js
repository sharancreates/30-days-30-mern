
const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quote', QuoteSchema);