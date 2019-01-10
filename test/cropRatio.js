const fs = require("fs")
const pdf = require("../index")

//with buffer, with aspect ratio
pdf(fs.readFileSync("./pdf/test.pdf"), {
  crop: {
    width: 100,
    height: 100,
    x: 10,
    y: 10,
    ratio: true
  }
})
  .then(data /*is a buffer*/ => data.pipe(fs.createWriteStream("./previewBuffer.jpg")))
  .catch(err => console.error(err))
