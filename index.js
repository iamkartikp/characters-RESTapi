const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = require('./routes/characters');

app.use(express.json());

app.use('/characters',router);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening to port ${port}`));