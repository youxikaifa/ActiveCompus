var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./routes/operations.js')
var uploadRouter = require('./routes/test.js')
var app = express();
var mongoose = require('mongoose')
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

app.listen(3000, function () {
  console.log('listening 3000...')
})
mongoose.connect("mongodb://localhost:27017/activecompus")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/connect', router.connect);
app.post('/v1/insert', router.insert);
app.get('/v1/find', router.find);
app.post('/v1/update', router.update);
app.get('/v1/loadmore', router.loadmore);
app.get('/v1/getall', router.getall);
app.get('/v1/collect', router.collect); //收藏
app.get('/v1/unCollect', router.unCollect); //取消收藏
app.get('/v1/like', router.like); //取消关注
app.get('/v1/unLike', router.unLike); //取消关注
app.post('/v1/sendComment', router.sendComment); //發送評論
app.get('/v1/getComment', router.getComment); //獲取評論
app.get('/v1/notice', router.notice) //
app.get('/v1/unnotice', router.unNotice)

app.get('/v1/getMyPub', router.getMyPub) //获取用户发表的文章
app.get('/v1/search', router.search) //搜索
app.get('/v1/getlost', router.getlost) //获取已存在物品
app.get('/v1/searchlost', router.searchlost) //搜索物品

app.get('/test', uploadRouter.test)
app.post('/v1/upload',router.sendlabel)
// app.post('/v1/post', multiparty({ uploadDir: './public/images/headIcon' }), router.register);
// app.use(multiparty({uploadDir:'./public/images/upload' }));//设置上传文件存放的地址。

app.post('/v1/findlost',router.sendlost)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
