'use strict';

const fs = require('fs');
const pdf = require('../index');

//with buffer, without aspect ratio
pdf(fs.readFileSync('./pdf/test.pdf'), {
  crop: {
    width: 200,
    height: 200,
    x: 10,
    y: 10,
    aspectRatio: false
  }
})
  .then(data /*is a buffer*/ => data.pipe(fs.createWriteStream('./previewBuffer.jpg')))
  .catch(err => console.error(err));

//with stream, with aspect ratio
pdf(fs.createReadStream('./pdf/test.pdf'), {
  crop: {
    width: 600,
    height: 400,
    x: 0,
    y: 0,
  }
})
  .then(data /*is a buffer*/ => data.pipe(fs.createWriteStream('./previewStream.jpg')))
  .catch(err => console.error(err));
