require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL).then(() => {
            console.log('Connected to MongoDB');
        });
    } catch (error) {
        console.log('Error connecting to MongoDB');
    }
}