const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./server/config/connection');
const userRoutes = require('./server/routes/user.route');

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
app.use('/auth', userRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
