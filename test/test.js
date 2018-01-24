'use strict';

const fs = require('fs');
const preview = require('../index');

preview(fs.readFileSync('./IL SETTECENTO POLITICO inglese.pdf'), {
  crop: {
    width: 200,
    height: 200,
    x: 120,
    y: 150
  }
})
  .then(data => fs.writeFileSync('modifiche.jpg', data))
  .catch(err => console.error(err));
