var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var formidable = require('formidable');

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var label = new Schema({
  name : String,
  title : String,
  content : String,
  publishTime : String,
  scanNum : Number,
  joinNum : Number,
  likeNum : Number,
  isClickLike : Boolean,
  sex : Number,
  uris : [String]
});

// 单线程不需要自己关闭数据库连接
// 新建一个数据模型
// 参数1：数据表
// 参数2：数据格式
var Label = mongoose.model("Label", label);
//
mongoose.connect("mongodb://localhost:27017/activecampus");

router.connect = function(request, response) {
	// mongoose.connect("mongodb://localhost:27017/userdb", function(e) {
	// 	if (e) response.send(e.message);
		response.send("connect yes!");
	// });
 }

router.insert = function (request, response) {

  console.log(request);
  response.header("Content-Type", "application/json; charset=utf-8");
  var label = new Label({
    name: request.body.name,
    title: request.body.title,
    content: request.body.content,
    publishTime: new Date().getTime().toString(),
    joinNum: 0,
    likeNum: 0,
    isClickLike: false,
    sex: request.body.sex,
    uris: [],
  });

  label.save(function(err){
    console.log('fail'+err);
    response.send(label)
  });

  // Label.save(label,function(err,labels){
  //   if (err) {
  //     response.send('insert error'+err.getMessage);
  //
  //   }else{
  //     response.send('insert succ');
  //     console.log('insert'+labels);
  //   }
  // });


}


router.find = function(request, response) {
  console.log('请求了一次');
	Label.find({}, function(err, labels) {
		if (err) {
      response.send(e.message);
    } else {
      response.send(labels);
    }
	}).sort({"publishTime":-1}).limit(10);
}


router.update = function(request, response) {
  var time = request.body.publishTime;
  var like = request.body.likeNum;
  Label.update({
    publishTime:time
  }, {$set:{"likeNum":like}}, function(err, numberAffected, raw) {
    if (err) {
      response.send('update error'+err.getMessage);

    }else{
      response.send('update succ');
      console.log('update'+time+like);
    }
  });
}


router.remove = function(request, response) {
	Program.remove({
		host:"李咏"
	}, function(e) {
		if (e) response.send(e.message);
		response.send("删除成功");
	});
}

router.loadmore = function (request, response) {
  var param = request.query.publishTime;
  Label.find({publishTime:{$lt:param}}, function(err, labels) {
		if (err) {
      response.send(err.message);
    }else {
      response.send(labels);
    }
	}).sort({"publishTime":-1}).limit(15);
}

router.getall = function (request, response) {
  Label.find({}, function(err, labels) {
		if (err) {
      response.send(err.message);
    } else {
      var count = labels.length;
      response.send(count.toString());
    }
	})
}


router.uploadimgs = function(req,res){

   var cacheFolder = 'public/images/uploadcache';
  //  var currentUser = req.session.user;
    var userDirPath =cacheFolder;
    // if (!fs.existsSync(userDirPath)) {
    //     fs.mkdirSync(userDirPath);
    // }
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = userDirPath; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.type = true;
    var displayUrl;
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        var extName = 'jpg'; //后缀名
        // switch (files.upload.type) {
        //     case 'image/pjpeg':
        //         extName = 'jpg';
        //         break;
        //     case 'image/jpeg':
        //         extName = 'jpg';
        //         break;
        //     case 'image/png':
        //         extName = 'png';
        //         break;
        //     case 'image/x-png':
        //         extName = 'png';
        //         break;
        // }
        if (extName.length === 0) {
            res.send({
                code: 202,
                msg: '只支持png和jpg格式图片'
            });
            return;
        } else {
            var avatarName = '/' + Date.now() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            displayUrl = cacheFolder + avatarName;
            // fs.renameSync(files.upload.path, newPath); //重命名
            res.send({
                code: 200,
                msg: displayUrl
            });
            console.log(displayUrl);
        }
    });
}

module.exports = router;
