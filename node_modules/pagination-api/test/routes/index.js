var express = require('express');
var http = require("http");            //提供web服务
var url = require("url");            //解析GET请求
var query = require("querystring");    //解析POST请求
var router = express.Router();
var  objects = require('../models/object');
module.exports = objects;
var crypto = require('crypto');
var Post = require('../models/post');
var pagination = require('pagination');
router.get('/', function (req, res) {
		res.render('index', { title: '点击查看分页示例'});
	});
Post.PostSorts_count_all_result( null,function (PostSorts_count_all_resultErr, PostSorts_count_all_result) {
	if (PostSorts_count_all_resultErr) {
		count_all_result = 1;
	};
	count_all_result = PostSorts_count_all_result[0].count_all_result;
	total_rows = count_all_result ;
	router.get('/blogs', function (req, res) {
		var per_pages = 1;
		if(req.query.per_page){
			per_pages = req.query.per_page;
		};
		if(req.body.per_page){
			per_pages = req.body.per_page;
		}
		var per_page = 4;
		var base_url = 'blogs?';
		var changePer_page = ( per_pages - 1 ) * per_page;
		Post.PostGet_all(changePer_page,per_page,function (PostGet_allErr, PostGet_all) {
			if (PostGet_allErr) {
				PostGet_all = [];
			};
			var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
			res.render('blogs', { title: '主页',PostGet_all: PostGet_all,Create_links:Create_links});
		});
	});
});
module.exports = router;