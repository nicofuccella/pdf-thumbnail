'use strict';

const fs = require('fs');
const preview = require('./index');

preview(fs.createReadStream('./test/KWB UTENSILI MANUALI.pdf'), {
  resize: {
    width: 300,
    height: 400
  },
  compress: {
    quality: 100,
    type: 'jpeg'
  }
})
  .then(data => fs.writeFileSync('./test/preview.jpg', data))
  .catch(err => console.error(err));
