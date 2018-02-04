'use strict';

module.exports = (input, params) => new Promise((resolve, reject) => {
  const { width, height } = Object.assign({ width: 200, height: 200 }, params);
  return resolve(input.resize(width, height));
});
