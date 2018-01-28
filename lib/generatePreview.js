'use strict'

const promiseWaterfall = require('promise.waterfall')
const gm = require('gm').subClass({ imageMagick: true })

const gmToBuffer = (data) => new Promise((resolve, reject) => {
  data.stream((err, stdout, stderr) => {
    if (err) reject(err)
    const chunks = []
    stdout.on('data', (chunk) => chunks.push(chunk))
    stdout.once('end', () => resolve(Buffer.concat(chunks)))
    stderr.once('data', (data) => reject(String(data)))
  })
})

const allTasks = {
  'compress': (input, params) => {
    const { type, quality } = Object.assign({ type: 'JPEG', quality: 75 }, params)
    return input
      .compress(type)
      .quality(quality)
  },
  'crop': (input, params) => new Promise((resolve, reject) => {
    const { width: maxWidth, height: maxHeight } = params
    input
      .size((err, size) => {
        if (err) reject(err)
        else {
          const { width, height } = size
          const ratio = height / width
          const finalRatio = maxHeight / maxWidth
          const [finalWidth, finalHeight] = ratio > finalRatio ? [width, width * finalRatio] : [height / finalRatio, height]
          const { x, y } = params
          const [cropX, cropY] = [
            {
              keys: ['center', 'left', 'right'],
              dimension: x,
              originalDimension: width,
              finalDimension: finalWidth
            },
            {
              keys: ['center', 'top', 'bottom'],
              dimension: y,
              originalDimension: height,
              finalDimension: finalHeight
            }
          ].map(({ keys, dimension, originalDimension, finalDimension }) => {
            if (keys.includes(dimension)) {
              switch (dimension) {
                case keys[0]:
                  return (originalDimension - finalDimension) / 2
                case keys[1]:
                  return 0
                case keys[2]:
                  return originalDimension - finalDimension
              }
            } else if (typeof dimension === 'number') {
              const halfFinalDimension = finalDimension / 2
              if (dimension < halfFinalDimension) dimension = halfFinalDimension
              else if (dimension > originalDimension - halfFinalDimension) dimension = originalDimension - halfFinalDimension
              return dimension - halfFinalDimension
            } else {
              return (originalDimension - finalDimension) / 2
            }
          })
          resolve(this.crop(finalWidth, finalHeight, cropX, cropY))
        }
      })
  }),
  'resize': (input, params) => new Promise((resolve, reject) => {
    console.log('p', params)
    console.log('input', input)
    const { width, height } = Object.assign({ width: 200, height: 200 }, params)
    return resolve(input.resize(width, height))
  })
}

const toJpg = body => gm(body, 'test.pdf[0]').setFormat('jpeg')

module.exports = (body, options = {}) => {
  const promises = [
    () => Promise.resolve(toJpg(body)),
    ...Object.entries(options).map(([ operation, params ]) => data => allTasks[operation](data, params)),
    gmToBuffer
  ]
  return promiseWaterfall(promises)
}
