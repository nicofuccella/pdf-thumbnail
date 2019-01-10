const fs = require("fs")
const { join } = require("path")
const pdf = require("../index")

//with buffer
pdf(fs.readFileSync(join(__dirname, "pdf", "test.pdf")), {
  compress: {
    type:"JPEG",
    quality: 70
  }
})
  .then(data /*is a buffer*/ => data.pipe(fs.createWriteStream(join(__dirname, "previews", "previewBuffer.jpg"))))
  .catch(err => console.error(err))

// //with stream
pdf(fs.createReadStream(join(__dirname, "pdf", "test.pdf")), {
  compress: {
    type:"JPEG",
    quality: 70
  }
})
  .then(data /*is a buffer*/ => data.pipe(fs.createWriteStream(join(__dirname, "previews", "previewStream.jpg"))))
  .catch(err => console.error(err))
