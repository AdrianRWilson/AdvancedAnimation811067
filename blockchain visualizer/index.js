const express = require('express');
const demo = require('./demo');

const app = express();
const port = process.env.PORT || 3000;

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(demo);
});
``
