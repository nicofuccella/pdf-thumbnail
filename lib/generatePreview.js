const promiseWaterfall = require("promise.waterfall")
const gm = require("gm").subClass({ imageMagick: true })
const compress = require("./operations/compress")
const crop = require("./operations/crop")
const resize = require("./operations/resize")

const allTasks = {
  compress,
  crop,
  resize
}

if (!Object.entries)
  Object.entries = obj => Object.keys(obj).map(prop => [prop, obj[prop]])

module.exports = (body, options = {}) => {
  const flattened = gm(body, "test.pdf[0]").flatten()


  const tasks = Object.entries(options).reduce((acc, [operation, params]) => {
    acc.push(data => allTasks[operation](data, params))
    return acc
  }, [() => Promise.resolve(flattened)])

  return promiseWaterfall(tasks)
    .then(result => result.stream("jpg"))
}
