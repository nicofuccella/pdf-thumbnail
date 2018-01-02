'use strict';

const gm = require('gm').subClass({ imageMagick: true });

const compressFn = (stream, params) => {
  const { type, quality } = Object.assign({ type: 'JPEG', quality: 75 }, params.compress);
  return stream
    .compress(type)
    .quality(quality);
};

const cropFn = (stream, params) => new Promise((resolve, reject) => {
  const { width: maxWidth, height: maxHeight } = params;
  stream
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
        resolve(this.crop(finalWidth, finalHeight, cropX, cropY));
      }
    });
});

const gmToBuffer = (data) => new Promise((resolve, reject) => {
  data.stream((err, stdout, stderr) => {
    if (err) reject(err);
    const chunks = [];
    stdout.on('data', (chunk) => chunks.push(chunk));
    // these are 'once' because they can and do fire multiple times for multiple errors,
    // but this is a promise so you'll have to deal with them one at a time
    stdout.once('end', () => resolve(Buffer.concat(chunks)));
    stderr.once('data', (data) => reject(String(data)));
  });
});

module.exports = (body, options = false) => new Promise((resolve, reject) => {
  const out = [];
  const data = gm(body, 'test.pdf[0]')
    .setFormat('jpeg');
  if(options === false)
    gmToBuffer(data)
      .then(data => out.push(data))
      .catch(err => reject(err));
  else {
    /*
    oggetto crop = {
      width,
      height,
      x,
      y
    }*/
    if(options.crop)
      cropFn(data, options.crop)
        .then(data => out[0] = data)
        .catch(err => reject(err));
    if(options.compress) out[0] = compressFn(data, options.compress);
  }
  resolve(out[0]);
});
