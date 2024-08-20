"use strict";

const express = require("express");
const path = require("path")
const app = express();

const host = 'localhost';
const port = 80;

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