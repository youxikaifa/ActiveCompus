var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var autodyne = new Schema({
	head : String,
	pics : Array,
	name : String,
	time : String,
	type : Number,
	title : String,
	likes : Array,
	comments :Number,
	scans : Number
})

module.exports = autodyne