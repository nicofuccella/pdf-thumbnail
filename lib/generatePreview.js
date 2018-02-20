'use strict';

const promiseWaterfall = require('promise.waterfall');
const gm = require('gm').subClass({ imageMagick: true });
const compress = require('./operations/compress');
const crop = require('./operations/crop');
const resize = require('./operations/resize');

const allTasks = {
  compress,
  crop,
  resize
};

if (!Object.entries)
  Object.entries = obj => Object.keys(obj).map(prop => [prop, obj[prop]]);

module.exports = (body, options = {}) => promiseWaterfall([
  () => gm(body, 'test.pdf[0]').flatten(),
  ...Object.entries(options).map(([ operation, params ]) => data => allTasks[operation](data, params)),
  input => input.stream('jpeg')
]);
