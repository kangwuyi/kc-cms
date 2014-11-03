var express = require('express');
var http = require("http");            //提供web服务
var url = require("url");            //解析GET请求
var query = require("querystring");    //解析POST请求
var router = express.Router();
var  objects = require('../models/object');
module.exports = objects;
var crypto = require('crypto');
var Post = require('../models/post');
var pagination = require('./pagination');
var base_url = 'blogs';
Post.PostTags( null,function (PostTagsErr, PostTags) {
	if (PostTagsErr) {
		PostTags = [];
	}//console.log(pagination.create_links());
	//GET 根目录
	router.get('/', function (req, res) {//console.log('这里是/routes/index，已经从/models/post收到数据，收到的数据为:');console.log(PostTags);
			res.render('client/index', { title: '主页',PostTags: PostTags});
		});
	//GET blogs页console.log(pagination.create_links());

	Post.PostSorts_count_all_result( null,function (PostSorts_count_all_resultErr, PostSorts_count_all_result) {
		if (PostSorts_count_all_resultErr) {
			count_all_result = 1;
		};
		count_all_result = PostSorts_count_all_result[0].count_all_result;	//count_all_result是所有博客的总数量
		router.get('/blogs', function (req, res) {
			var per_pages = 1;
			if(req.query.per_page){
				per_pages = req.query.per_page;//console.log("get");
			};
			if(req.body.per_page){
				per_pages = req.body.per_page;//console.log("post");
			}//console.log("per_pages");console.log(per_pages);
			var total_rows,per_page,base_url ;
			total_rows = count_all_result ;
			per_page = 4;
			base_url = 'blogs?';
			var changePer_page = ( per_pages - 1 ) * per_page;//console.log(changePer_page);
			Post.PostGet_all(changePer_page,per_page,function (PostGet_allErr, PostGet_all) {
				if (PostGet_allErr) {
					PostGet_all = [];
				};//console.log(PostGet_all);
				var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
				Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {
					if (PostRiqiErr) {
						PostRiqi = [];
					};//console.log(PostRiqi);
					res.render('client/blogs', { title: '主页',PostGet_all: PostGet_all,PostRiqi: PostRiqi,PostTags: PostTags,Create_links:Create_links});
				});
			});
		});
	});

	router.get('/domainname', function (req, res) {
		Post.get( null,function (err, posts) {
			if (err) {
				posts = [];
			}
				console.log('这里是/routes/index，已经从/models/post收到数据，收到的数据为:');
				console.log(posts);
			res.render('client/index', { title: '主页',posts: posts});
		});
	});

	router.get('/prose', function (req, res) {
		Post.get( null,function (err, posts) {
			if (err) {
				posts = [];
			}
				console.log('这里是/routes/index，已经从/models/post收到数据，收到的数据为:');
				console.log(posts);
			res.render('client/index', { title: '主页',posts: posts});
		});
	});

	router.get('/about', function (req, res) {
		Post.get( null,function (err, posts) {
			if (err) {
				posts = [];
			}
				console.log('这里是/routes/index，已经从/models/post收到数据，收到的数据为:');
				console.log(posts);
			res.render('client/index', { title: '主页',posts: posts});
		});
	});
 });
module.exports = router;