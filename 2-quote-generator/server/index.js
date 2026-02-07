require('dotenv').config();
console.log("Current Directory:", process.cwd());
console.log("Loaded URI:", process.env.MONGO_URI);
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("mongodb connected")).catch(err => console.log(err))

const quoteRoutes = require('./routes/quotes');
app.use('/api/quotes', quoteRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));