const express = require('express');
const path = require('path');

var port = process.env.PORT || 3002;
const app = express();

app.use(express.static('public'));


app.get('', (req, res) => {
    res.sendFile('index');
});


app.listen(port, () => {
    console.log('App is running on PORT: ' + port);
});

