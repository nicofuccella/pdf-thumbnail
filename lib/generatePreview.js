'use strict';

const promiseWaterfall = require('promise.waterfall');
const gm = require('gm').subClass({ imageMagick: true });
const compress = require('./operations/compress');
const crop = require('./operations/crop');
const resize = require('./operations/resize');

const gmToBuffer = (gmObj) => new Promise((resolve, reject) => {
  const stream = gmObj.stream();
  const chunks = [];
  stream.on('data', (chunk) => chunks.push(chunk));
  stream.once('end', () => resolve(Buffer.concat(chunks)));
});

const allTasks = {
  compress,
  crop,
  resize
};

const toJpg = body => gm(body, 'test.pdf[0]').setFormat('jpeg');

module.exports = (body, options = {}) => {
  const promises = [
    () => Promise.resolve(toJpg(body)),
    ...Object.entries(options).map(([ operation, params ]) => data => allTasks[operation](data, params)),
    gmToBuffer
  ];
  return promiseWaterfall(promises);
};
