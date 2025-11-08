require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongo connecté');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;