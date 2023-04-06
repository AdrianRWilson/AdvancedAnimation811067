const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
    fs.readFile('index.html', (err, data) => {
        if (err) {
            throw err;
        }
        const html = data.toString();
        res.send(html);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/myFunction', (req, res) => {
    console.log('Button clicked!');
    res.send('Function called!');
});



