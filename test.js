'use strict';

const fs = require('fs');
const preview = require('./index');

preview()
  .then(data => fs.writeFileSync('./test/preview.jpg', data))
  .catch(err => console.error(err));
