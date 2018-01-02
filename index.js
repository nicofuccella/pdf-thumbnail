'use strict';

const preview = require('./lib/generatePreview');

module.exports = (body) => new Promise((resolve, reject) =>
  preview(body)
    .then(preview => resolve(preview))
    .catch(err => reject(err)));
