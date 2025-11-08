const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./db/mogoDB');
const userRouter = require('./routes/user');
const bookRouter = require('./routes/books');

connectDB();
const app = express();

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization'],
}));

app.use('/api/auth', userRouter);
app.use('/api/books', bookRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;