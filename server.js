const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./server/config/connection');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Routes

// app.get('/', (req, res) => {
//     res.send('Hello');
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
