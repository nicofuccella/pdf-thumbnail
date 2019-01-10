# pdf-thumbnail

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency Status][dependencies-image]][dependencies-url]

[npm-url]: https://www.npmjs.com/package/pdf-thumbnail
[npm-image]: http://img.shields.io/npm/v/pdf-thumbnail.svg?style=flat
[downloads-image]: https://img.shields.io/npm/dm/pdf-thumbnail.svg?style=flat-square
[dependencies-image]: https://david-dm.org/nico.fuccella/pdf-thumbnail.svg
[dependencies-url]: href="https://david-dm.org/nico.fuccella/pdf-thumbnail

## Installation

    $ npm i pdf-thumbnail

## Getting started

This module works with gm, so you have to install imagemagick and ghostscript on your pc.

On Mac OS X:

    $ brew install imagemagick
    $ brew install ghostscript

On Linux:

    $ sudo apt-get install imagemagick
    $ sudo apt-get install ghostscript

## What is pdf-thumbnail?

pdf-thumbnail creates a thumbnail of the first page of a pdf file. You can also manipulate the image:

  * You can resize it
  * You can compress it with less quality
  * You can crop it

## How to use it

pdf-thumbnail returns a Promise:

```javascript
const pdf = require('pdf-thumbnail');
const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');

pdf(
  pdfBuffer, /*Buffer or stream of the pdf*/
  options
)
  .then(data /*Stream of the image*/ => {
    // ...
  })
  .catch(err => console.log(err))
```

### Options

An object where you can put the operations you would like to do on the thumbnail. The current available operations are:

* Compress
* Crop
* Resize

#### Compress

```javascript
const pdf = require('pdf-thumbnail');
const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');

pdf(pdfBuffer, {
  compress: {
    type: 'JPEG',  //default
    quality: 70    //default
  }
})
  .then(data => {
    // ...
  })
  .catch(err => console.log(err))
```

#### Crop

```javascript
const pdf = require('pdf-thumbnail');
const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');

pdf(pdfBuffer, {
  crop: {
    width: 200,
    height: 400,
    x: 0,
    y: 0
  }
})
  .then(data => {
     // ...
  })
  .catch(err => console.log(err))
```

If you want to crop the image keeping the aspect ratio, yuo have to add another key to the object:

    crop: {
      width: 200,
      height: 400,
      x: 0,
      y: 0,
      ratio: true  //default true
     }

#### Resize

```javascript
const pdf = require('pdf-thumbnail');
const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');

pdf(pdfBuffer, {
  resize: {
    width: 200,   //default
    height: 200,  //default
  }
})
  .then(data => {
    // ...
  })
  .catch(err => console.log(err))
```

## Example

See a few examples [here](test/)

## People

- [Nicolò Fuccella](https://github.com/nicoFuccella)
- [Nicola Guerra](https://github.com/Ng2k)

## License
MIT
