const express = require('express');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3001;
const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));