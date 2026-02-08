const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// @route   GET api/contacts
router.get('/', async (req, res) => {
    try {
        const { sortBy = 'date', order = 'desc' } = req.query;
        const sortOptions = { [sortBy]: order === 'asc' ? 1 : -1 };
        const contacts = await Contact.find().sort(sortOptions);
        res.json(contacts);
    } catch (err) {
        console.error("GET Error:", err.message);
        res.status(500).send('Server Error');
    }
});

router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, type } = req.body;

        try {
            const newContact = new Contact({ name, email, phone, type });
            const contact = await newContact.save();
            res.json(contact);
        } catch (err) {
            console.error("POST Error:", err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        res.json({ msg: 'Contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
