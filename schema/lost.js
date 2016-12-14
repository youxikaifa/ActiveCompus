var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var lost = new Schema({
    id: String,
    thumbs: Array,
    head: String,
    title: String,
    name: String,
    contact: String,
    addr: String,
    time: String,
    type: Number,
    remark: String,
    school:String
})

module.exports = lost
