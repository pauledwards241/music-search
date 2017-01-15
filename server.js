const express = require('express');
const path = require('path');
const app = express();

/* eslint no-console: 0 */

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(3000, function (err) {
  if (err) return console.error(err)
  console.log('Listening on port 3000');
})
