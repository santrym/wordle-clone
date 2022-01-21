const express = require('express');
const path = require('path');

var port = process.env.PORT || 3002;
const app = express();

app.use(express.static('public'));


app.get('', (req, res) => {
    console.log(path.join(__dirname, 'public/index.html'));
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(port, () => {
    console.log('App is running on PORT: ' + port);
});


