'use strict';

const gm = require('gm').subClass({ imageMagick: true });

const gmToBuffer = (data) => new Promise((resolve, reject) => {
  data.stream((err, stdout, stderr) => {
    if (err) reject(err);
    const chunks = [];
    stdout.on('data', (chunk) => chunks.push(chunk));
    stdout.once('end', () => resolve(Buffer.concat(chunks)));
    stderr.once('data', (data) => reject(String(data)));
  });
});

module.exports = (body) => new Promise((resolve, reject) => {
  const data = gm(body, 'test.pdf[0]')
    .setFormat('jpeg')
    .quality(75);
  gmToBuffer(data)
    .then(data => resolve(data))
    .catch(err => reject(err));
});
