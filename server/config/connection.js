const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

URL = process.env.MONGO_URI
const connection = async () => {
    try {
        const conn = await mongoose.connect(URL, {
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1)
    }
}

module.exports = connection 