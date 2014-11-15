var express = require('express');
var http = require("http");            //提供web服务
var url = require("url");            //解析GET请求
var query = require("querystring");    //解析POST请求
var router = express.Router();
var  objects = require('../models/object');
module.exports = objects;
var crypto = require('crypto');
var Post = require('../models/post');
Post.PostTags( null,function (PostTagsErr, PostTags) {
	if (PostTagsErr) {
		PostTags = [];
	}
	router.get('/poHome', checkLogin);
	router.get('/poHome', function (req, res) {//console.log('这里是/routes/index，已经从/models/post收到数据，收到的数据为:');console.log(PostTags);
			res.render('client/po/index', { title: '主页',PostTags: PostTags});
		});
	router.get('/poAdds', checkLogin);
	router.get('/poAdds', function (req, res) {//console.log('这里是/routes/index，已经从/models/post收到数据，收到的数据为:');console.log(PostTags);
			res.render('client/po/blogs', { title: '主页',PostTags: PostTags});
		});
	router.get('/poDomains', checkLogin);
	router.get('/poBlogs', function (req, res) {//console.log('这里是/routes/index，已经从/models/post收到数据，收到的数据为:');console.log(PostTags);
			res.render('client/po/blogs', { title: '主页',PostTags: PostTags});
		});
	router.get('/poDomains', checkLogin);
	router.get('/poDomains', function (req, res) {
			res.render('client/po/domain', { title: '主页',PostTags: PostTags});
	});
	router.get('/poDomains', checkLogin);
	router.get('/poProse', function (req, res) {
			res.render('client/po/prose', { title: '主页',PostTags: PostTags});
	});
	router.get('/poDomains', checkLogin);
	router.get('/poCatalogue', function (req, res) {
			res.render('client/po/catalogue', { title: '主页',PostTags: PostTags});
	});
	router.get('/poRevise', checkLogin);
	router.get('/poRevise', function (req, res) {//console.log('这里是/routes/index，已经从/models/post收到数据，收到的数据为:');console.log(PostTags);
			res.render('client/po/blogsRevise', { title: '主页',PostTags: PostTags});
		});
	function checkLogin(req, res, next) {
		if (!req.session.user) {
			req.flash('error', '未登录!');
			res.render('client/index', { title: '主页',PostTags: PostTags});
			//res.redirect('back');//返回之前的页面
		}
		next();
	};

	function checkNotLogin(req, res, next) {
		if (req.session.user) {
			req.flash('error', '已登录!');
			res.redirect('back');//返回之前的页面
		}
		next();
	};
 });
module.exports = router;