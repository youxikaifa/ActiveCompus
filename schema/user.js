var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var user = new Schema({
  "id": String,
  "name": String,
  "account":String,
  "pwd": String,
  "token": String,
  "expires": String,
  "openid": String,
  "created": String,
  "thumb": String,
  // "followed": Array,
  "friend": Array,
  "sex": Number,
  "fans": Array, //关注我的人
  "reduce": String, //个人简介
  "following": Array, //我关注的人
  "collections": Array,
  "school": String,
  "skill": String,
  "habit": String,
  "contact": {
      "phone": String,
      "qq": String,
      "weixin": String,
      "weibo":String
  }
})

module.exports = user
