const express = require('express');


const PORT = '3002';

const app = express();


app.get('', (req, res) => {
    res.send('hello weirld');
});


app.listen(PORT, () => {
    console.log('App is running on PORT: ' + PORT);
});


