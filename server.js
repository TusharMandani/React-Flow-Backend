const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./server/config/connection');
const userRoutes = require('./server/routes/user.route');
const cors = require('cors');   

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors()); 

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE', 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true 
};

app.use(cors(corsOptions));

// Routes
app.use('/auth', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
