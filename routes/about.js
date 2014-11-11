var express = require('express');
var http = require("http");            //提供web服务
var url = require("url");            //解析GET请求
var query = require("querystring");    //解析POST请求
var router = express.Router();
var  objects = require('../models/object');
module.exports = objects;
var crypto = require('crypto');
var Post = require('../models/post');

	router.get('/wendang', function (req, res) {//console.log('这里是/routes/index，已经从/models/post收到数据，收到的数据为:');console.log(PostTags);
			res.render('client/wendang/index', { title: '主页'});
		});
	router.get('/resume', function (req, res) {
			res.render('client/resume/index', { title: '主页'});
	});
	router.get('/enresume', function (req, res) {
			res.render('client/resume/en', { title: '主页'});
	});

module.exports = router;