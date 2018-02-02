'use strict';

module.exports = (input, params) => new Promise((resolve, reject) => {
  const { width: maxWidth, height: maxHeight } = params;
  input
    .size((err, size) => {
      if (err) reject(err);
      else {
        const { width, height } = size;
        const ratio = height / width;
        const finalRatio = maxHeight / maxWidth;
        const [finalWidth, finalHeight] = ratio > finalRatio ? [width, width * finalRatio] : [height / finalRatio, height];
        const { x, y } = params;
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
                return (originalDimension - finalDimension) / 2;
              case keys[1]:
                return 0;
              case keys[2]:
                return originalDimension - finalDimension;
            }
          } else if (typeof dimension === 'number') {
            const halfFinalDimension = finalDimension / 2;
            if (dimension < halfFinalDimension) dimension = halfFinalDimension;
            else if (dimension > originalDimension - halfFinalDimension) dimension = originalDimension - halfFinalDimension;
            return dimension - halfFinalDimension;
          } else {
            return (originalDimension - finalDimension) / 2;
          }
        });
        resolve(input.crop(finalWidth, finalHeight, cropX, cropY));
      }
    });
});
