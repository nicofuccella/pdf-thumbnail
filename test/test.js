'use strict';

const fs = require('fs');
const preview = require('../index');

preview(fs.readFileSync('./IL SETTECENTO POLITICO inglese.pdf'))
  .then(data => fs.writeFileSync('preview.jpg', data))
  .catch(err => console.error(err));
