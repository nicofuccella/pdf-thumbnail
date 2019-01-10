module.exports = (input, params) =>
  new Promise (resolve => {
    const { type, quality } = Object.assign({ type: "JPEG", quality: 70 }, params)
    resolve(input
      .compress(type)
      .quality(quality)
    )
  })
