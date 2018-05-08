'use strict';

const fs = require('fs');
const pdf = require('../index');

//with buffer, with aspect ratio
pdf(fs.readFileSync('./pdf/test.pdf'), {
  crop: {
    width: 400,
    height: 600,
    x: 10,
    y: 10,
    ratio: true
  }
})
  .then(data /*is a buffer*/ => data.pipe(fs.createWriteStream('./previewBuffer.jpg')))
  .catch(err => console.error(err));

//with stream, without aspect ratio
pdf(fs.createReadStream('./pdf/test.pdf'), {
  crop: {
    width: 100,
    height: 100,
    x: 100,
    y: 43
  }
})
  .then(data /*is a buffer*/ => data.pipe(fs.createWriteStream('./previewStream.jpg')))
  .catch(err => console.error(err));
