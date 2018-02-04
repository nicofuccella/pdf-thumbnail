'use strict';

const promiseWaterfall = require('promise.waterfall');
const gm = require('gm').subClass({ imageMagick: true });
const compress = require('./operations/compress');
const crop = require('./operations/crop');
const resize = require('./operations/resize');

const gmToBuffer = (data) => new Promise((resolve, reject) => {
  data.stream((err, stdout, stderr) => {
    if (err) reject(err);
    const chunks = [];
    stdout.on('data', (chunk) => chunks.push(chunk));
    stdout.once('end', () => resolve(Buffer.concat(chunks)));
    stderr.once('data', (data) => reject(String(data)));
  });
});

const allTasks = {
  compress,
  crop,
  resize
};

const toJpg = (body) => gm(body, 'test.pdf[0]')
  .background('#FFFFFF')
  .flatten()
  .setFormat('jpeg');

module.exports = (body, options = {}) => {
  const promises = [
    () => Promise.resolve(toJpg(body)),
    ...Object.entries(options).map(([ operation, params ]) => data => allTasks[operation](data, params)),
    gmToBuffer
  ];
  return promiseWaterfall(promises);
};
