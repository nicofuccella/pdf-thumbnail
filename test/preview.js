'use strict';

const fs = require('fs');
const pdf = require('../index');

//with buffer
pdf(fs.readFileSync('./pdf/pippo.pdf'))
  .then(data /*is a buffer*/ => fs.writeFileSync('./previewBuffer.jpg', data))
  .catch(err => console.error(err));

//with stream
pdf(fs.createReadStream('./pdf/pippo.pdf'))
  .then(data /*is a buffer*/ => fs.writeFileSync('./previewStream.jpg', data))
  .catch(err => console.error(err));
