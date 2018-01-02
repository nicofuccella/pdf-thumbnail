'use strict';

const gm = require('gm').subClass({ imageMagick: true });

const gmToBuffer = (data) => new Promise((resolve, reject) => {
  data.stream((err, stdout, stderr) => {
    if (err) reject(err);
    const chunks = [];
    stdout.on('data', (chunk) => chunks.push(chunk));
    // these are 'once' because they can and do fire multiple times for multiple errors,
    // but this is a promise so you'll have to deal with them one at a time
    stdout.once('end', () => resolve(Buffer.concat(chunks)));
    stderr.once('data', (data) => reject(String(data)));
  });
});

module.exports = (body, options = false) => new Promise((resolve, reject) => {
  const data = gm(body, 'test.pdf[0]')
    .setFormat('jpeg');
  gmToBuffer(data)
    .then(data => resolve(data))
    .catch(err => reject(err));
});
