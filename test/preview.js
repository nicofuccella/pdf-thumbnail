'use strict';

const fs = require('fs');
const pdf = require('../index');

//with buffer
pdf(fs.readFileSync('./pdf/pippo.pdf'))
  .then(data /*is a buffer*/ => fs.writeFileSync('./test/preview.jpg', data))
  .catch(err => console.error(err));

//with stream
pdf(fs.createReadStream('./pippo.pdf'))
  .then(data /*is a buffer*/ => fs.writeFileSync('./test/preview.jpg', data))
  .catch(err => console.error(err));
