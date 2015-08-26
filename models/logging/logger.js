// This module provide a logger that can be used across js
var bunyan = require('bunyan');
var log = bunyan.createLogger({name:"RogerBlog"});

module.exports = log;
