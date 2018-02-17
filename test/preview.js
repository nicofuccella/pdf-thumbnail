'use strict';

const fs = require('fs');
const pdf = require('../index');

//with buffer
pdf(fs.readFileSync('./pdf/test.pdf'))
  .then(data /*is a stream*/ => data.pipe(fs.createWriteStream('./previewBuffer.jpg')))
  .catch(err => console.error(err));

//with stream
pdf(fs.createReadStream('./pdf/test.pdf'))
  .then(data /*is a stream*/ => data.pipe(fs.createWriteStream('./previewStream.jpg')))
  .catch(err => console.error(err));
