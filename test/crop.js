'use strict';

const fs = require('fs');
const pdf = require('../index');

//with buffer
pdf(fs.readFileSync('./pdf/pippo.pdf'), {
  crop: {
    width: 200,
    height: 200,
    x: 0,
    y: 0
  }
})
  .then(data /*is a buffer*/ => fs.writeFileSync('./test/preview.jpg', data))
  .catch(err => console.error(err));

//with stream
pdf(fs.createReadStream('./pippo.pdf'), {
  crop: {
    width: 200,
    height: 200,
    x: 0,
    y: 0
  }
})
  .then(data /*is a buffer*/ => fs.writeFileSync('./test/preview.jpg', data))
  .catch(err => console.error(err));
