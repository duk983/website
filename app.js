"use strict";

const express = require("express");
const path = require("path")
const rateLimit = require('express-rate-limit');
const app = express();

const host = 'localhost';
const port = 80;

const whitelist = ['127.0.0.1', '206.163.246.112'];

app.use((req, res, next) => {
    const clientIp = req.ip;
    if (whitelist.includes(clientIp)) {
        next(); // Allow access
    } else {
        console.log(clientIp);
        res.status(403).send('Access denied');
    }
});

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 1000 // Limit each IP to 1000 requests per windowMs
});

app.use(limiter);
app.use(express.static(path.join(__dirname, 'js')));    // For Javascripts
app.use(express.static(path.join(__dirname, 'img')));   // For images
app.use(express.static(path.join(__dirname, 'views'))); // For HTML and CSS files
app.use(express.json());

// Main Page requests
app.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname });
   });

// Second Page requests
app.get('/second.html', (req, res) => {
    res.sendFile('views/second.html', { root: __dirname });
});

app.post('/addItem', (req, res) => {
    const { item } = req.body;
    if (item) {
        res.status(200).json({ item }); 
    } else {
        res.status(400).json({ error: 'Item is required' });
    }
});

// Third Page requests
app.get('/third.html', (req, res) => {
    res.sendFile('views/third.html', { root: __dirname });
});

// Question Page requests
app.get('/questions.html', (req, res) => {
    res.sendFile('views/questions.html', { root: __dirname });
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});