'use strict';

module.exports = (input, params) => new Promise ((resolve, reject) => {
  const { type, quality } = Object.assign({ type: 'JPEG', quality: 70 }, params);
  resolve(input
    .compress(type)
    .quality(quality));
});
