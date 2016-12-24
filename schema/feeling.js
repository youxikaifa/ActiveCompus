var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var feeling = new Schema({
    head: String,
    sex: Number,
    motto:String,
	pics : Array,
	name : String,
	time : String,
	type : Number,
	content : String,
	likes : Array,
	comments :Number,
    scans: Number,
    school: String
})



module.exports = feeling