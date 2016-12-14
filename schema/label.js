var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var label = new Schema({
    id: String,
    userId: String,
    head: String,
    sex:Number,
    name : String,
    title : String,
    content : String,
    pubTime: String,
    type: Number,
    tags: Array,
    // comments:[],
    followers : Array,
    likes : Array,
    picUrls : Array
})

module.exports = label
