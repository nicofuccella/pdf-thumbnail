# pdf-thumbnail

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency Status][dependencies-image]][dependencies-url]

[npm-url]: https://www.npmjs.com/package/pdf-thumbnail
[npm-image]: http://img.shields.io/npm/v/pdf-thumbnail.svg?style=flat
[downloads-image]: https://img.shields.io/npm/dm/pdf-thumbnail.svg?style=flat-square
[dependencies-image]: https://david-dm.org/nico.fuccella/pdf-thumbnail.svg
[dependencies-url]: href="https://david-dm.org/nico.fuccella/pdf-thumbnail

## Installation

    $ npm i pdf-thumbnail

## What is pdf-thumbnail?

Pdf-thumbnail creates an image of the first page of a pdf file. You can also manipulate the image:
  
  * You can resize it
  * You can compress it with less quality
  * You can crop it
  
## How to use it

pdf-thumbnail is a Promise:

```javascript
const pdf = require('pdf-thumbnail');
const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');

pdf(pdfBuffer /*Buffer or stream of the pdf*/)
  .then(data /*Buffer of the image*/ => {
    // do your stuffs...
  })
  .catch(err => console.log(err))
```

## Image manipulation

You can pass also an object, where you can put all the operation that you want to do on the preview.

EX. 

```javascript
const pdf = require('pdf-thumbnail');
const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');
  
pdf(pdfBuffer /*Buffer or stream of the pdf*/, options /*{
  operations...
}*/)
  .then(data /*Buffer of the image*/ => {
    // do your stuffs...
  })
  .catch(err => console.log(err))
```

### Options

Is an object where you can put the operation you would like to do. The current operations available are:

* Compress
* Crop
* Resize

#### Compress

```javascript
const pdf = require('pdf-thumbnail');
const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');
  
pdf(pdfBuffer /*Buffer or stream of the pdf*/, {
  compress: {
    type: 'JPEG',  //default
    quality: 70    //default
  }
})
  .then(data /*Buffer of the image*/ => {
    // do your stuffs...
  })
  .catch(err => console.log(err))
```

#### Crop

```javascript
const pdf = require('pdf-thumbnail');
const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');

pdf(pdfBuffer /*Buffer or stream of the pdf*/, {
  crop: {
    width: 200,
    height: 400,
    x: 0,
    y: 0
  }
})
  .then(data /*Buffer of the image*/ => {
     // do your stuffs...
  })
  .catch(err => console.log(err))
```

#### Resize

```javascript
const pdf = require('pdf-thumbnail');
const pdfBuffer = require('fs').readFileSync('/some/path/example.pdf');

pdf(pdfBuffer /*Buffer or stream of the pdf*/, {
  resize: {
    width: 200,   //default
    height: 200,  //default
  }
})
  .then(data /*Buffer of the image*/ => {
    // do your stuffs...
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
