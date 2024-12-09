const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to the Simple API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
