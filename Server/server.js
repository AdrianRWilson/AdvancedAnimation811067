const express = require('express');
const mime = require('mime');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

const fileType = mime.getType('example.jpg');
console.log(fileType); 
