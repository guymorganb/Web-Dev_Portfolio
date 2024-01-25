const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const username = encodeURIComponent(process.env.MONGOADMIN);
        const password = encodeURIComponent(process.env.MONGOPASS);
        const dbName = 'googlebooks'; // Connects to lowercase 't'est database
        // The options {useNewUrlParser: true, useUnifiedTopology: true} are provided to avoid deprecation warnings.
        const mongoURI = process.env. MONGODB_URI;
        console.log(username, password)
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log(`Connected to MongoDB Atlas`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;