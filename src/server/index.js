import path from 'path';
import express from 'express';

let app = express();

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(4000, function() {
  console.log('✔ Server API listening on http://localhost:4000, Ctrl+C to stop')
});
