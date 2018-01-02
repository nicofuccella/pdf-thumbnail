'use strict';

const preview = require('./lib/generatePreview');

module.exports = (body, options) => new Promise ((resolve, reject) =>
  preview(body, options)
    .then(preview => resolve(preview))
    .catch(err => reject(err)));
