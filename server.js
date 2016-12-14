var express = require('express');
var app = express();
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['3fCNhDINyCeRCmaPOiry5ZIr.jpg'], 'public/images/thumbnail', {
  plugins: [
      imageminMozjpeg(),
      imageminPngquant({quality: '30-40'})
  ]
}).then(
  files => {
  //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
  console.log(files);
  }
);

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
