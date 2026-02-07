const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ savedAt: -1 });
    res.json(quotes);
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { text, author } = req.body;

  try {
    const existingQuote = await Quote.findOne({ text });
    if (existingQuote) return res.status(400).json({ message: 'Quote already saved' });

    const newQuote = new Quote({ text, author });
    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
    } 
  catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });

    await quote.deleteOne();
    res.json({ message: 'Quote deleted' });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;