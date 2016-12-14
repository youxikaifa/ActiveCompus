function string2Array(stringObj) {
	stringObj = stringObj.replace(/\[([\w, ]*)\]/, "$1");
	if (stringObj.indexOf("[") == 0) {// if has chinese
		stringObj = stringObj.substring(1, stringObj.length - 1);
	}
	var arr = stringObj.split(",");
	var newArray = [];//new Array();
	for ( var i = 0; i < arr.length; i++) {
		var arrOne = arr[i];
		newArray.push(arrOne);
	}
	// console.log(newArray);
	return newArray;
};

module.exports = string2Array