'use strict';

const fs = require('fs');
const preview = require('../index');

preview(fs.readFileSync('./IL SETTECENTO POLITICO inglese.pdf'), {
  compress: {
    type: 'JPEG',
    quality: 1
  }
})
  .then(data => fs.writeFileSync('modifiche.jpg', data))
  .catch(err => console.error(err));
