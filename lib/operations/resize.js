module.exports = (input, params) =>
  new Promise(resolve => {
    const { width, height } = Object.assign({ width: 200, height: 200 }, params)
    resolve(input.resize(width, height))
  })
