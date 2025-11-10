const express = require('express');
const dotenv = require('dotenv').config();
const pool = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;


// Health check
app.get('/', (req, res) => {
    res.json({ name: 'bobapos', status: 'OK' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
