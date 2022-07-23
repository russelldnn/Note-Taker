//requirements for fs, express and path used below
const express = require('express');
const fs = require('fs');
const path = require('path');
const dbJson = require("./db/db.json");
let currentId = dbJson.length;
//listening port and applying a variable to use express
const port = process.env.PORT || 3001;
const app = express();

//allows for use of urlencoded and json, removes static directory from URL
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//get routes
app.get('/api/notes', function (req, res) {
    return res.json(dbJson);
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


//post routes

app.post('/api/notes', function (req, res) {
    let nNote = req.body;
    nNote.id = currentId +1;
    currentId++;

    dbJson.push(nNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(dbJson));
    res.json(dbJson);
});

//listening port
app.listen(port, function () {
    console.log(`listening on port ${port}`);
  })