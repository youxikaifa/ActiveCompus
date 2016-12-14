var express = require('express');
var uploadRouter = express.Router();

uploadRouter.test = function (req, res) {
    res.send('能不能')
}

module.exports = uploadRouter

