// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require('cors');
const router = require('./routes');
require('./connection');

// Create Express application
const lgServer = express();

// Use CORS for cross-origin requests
lgServer.use(cors());

// Use JSON parser middleware
lgServer.use(express.json());

// Use router
lgServer.use(router);

// Set port for the server
const PORT = process.env.PORT || 4000;


// Listen to the port - to resolve requests
lgServer.listen(PORT, () => {
    console.log(`Server running successfully at port number: ${PORT}`);
});
