module.exports = (input, { width: maxWidth, height: maxHeight, x, y, ratio }) =>
  new Promise((resolve, reject) => {
    if (ratio) {
      input
        .size({ bufferStream: true }, (err, size) => {
          if (err) return reject(err)
          const { width, height } = size
          const ratio = height / width
          const finalRatio = maxHeight / maxWidth
          const [finalWidth, finalHeight] = ratio > finalRatio ?
            [width, width * finalRatio] :
            [height / finalRatio, height]
          const [cropX, cropY] = [
            {
              keys: ["center", "left", "right"],
              dimension: x,
              originalDimension: width,
              finalDimension: finalWidth
            },
            {
              keys: ["center", "top", "bottom"],
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
            }
            if (typeof dimension === "number") {
              const halfFinalDimension = finalDimension / 2
              if (dimension < halfFinalDimension) {
                return 0
              }
              if (dimension > originalDimension - halfFinalDimension) {
                return originalDimension - 2 * halfFinalDimension
              }
              return dimension - halfFinalDimension
            }
            return (originalDimension - finalDimension) / 2
          })

          resolve(input.crop(finalWidth, finalHeight, cropX, cropY))
        })
    }
    else
      resolve(input.crop(maxWidth, maxHeight, x, y))
  })
