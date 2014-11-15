var express = require('express');
var http = require("http");            //提供web服务
var url = require("url");            //解析GET请求
var query = require("querystring");    //解析POST请求
var router = express.Router();
var  objects = require('../models/object');
module.exports = objects;
var crypto = require('crypto');
var kcool = require('../public/lib/kcool');
var Post = require('../models/post');
var Blogs = require('../models/blogs');
var pagination = require('./pagination');
var kcool = require('../public/lib/kcool');
var base_url = 'blogs';
Post.PostTags( null,function (PostTagsErr, PostTags) {
	if (PostTagsErr) {
		PostTags = [];
	}
	Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {
		if (PostRiqiErr) {
			PostRiqi = [];
		};//console.log(PostRiqi);
		router.get('/blogsById', function (req, res) {
			var blogs_ids = req.query.blogs_ids ? parseInt(kcool.trim(req.query.blogs_ids)) : 1;
			var tags_ids = req.query.tags_ids ? parseInt(kcool.trim(req.query.tags_ids)) : 1;
			var BlogsByIds = [];
			Blogs.BlogsById( blogs_ids,function (BlogsByIdErr, BlogsById) {
				if (BlogsByIdErr) {
					BlogsById = [];
				};
				BlogsByIds = BlogsById;
				var blogs_ids_add_one = blogs_ids+1;
				var title_to_content_add_one;
				Blogs.BlogsByNext( blogs_ids_add_one,tags_ids,function (BlogsByNextErr, BlogsByNext) {
					if (BlogsByNextErr) {
					BlogsByNext = [];
					};
					var blogs_ids_reduce_one = blogs_ids-1;
					var title_to_content_reduce_one;
					title_to_content_add_one = BlogsByNext;
					Blogs.BlogsByPrev( blogs_ids_reduce_one,tags_ids,function (BlogsByPrevErr, BlogsByPrev) {
						if (BlogsByPrevErr) {
						BlogsByPrev = [];
						};
						title_to_content_reduce_one = BlogsByPrev;
						var tags_open_next= 0;
						var tags_open_prev= 0;
						BlogsById = BlogsByIds;
						if(title_to_content_add_one.length<1){
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							tags_open_next= 1;console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/reader', { title: '主页',PostTags: PostTags,PostRiqi: PostRiqi,BlogsById:BlogsById,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						 }else{
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							console.log("tags_open_prev");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/reader', { title: '主页',PostTags: PostTags,PostRiqi: PostRiqi,BlogsById:BlogsById,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						}
					});
				});
			});
		});
		router.get('/content_to_next', function (req, res) {
			var blogs_ids = kcool.trim(req.query.blogs_ids);
			var tags_ids = kcool.trim(req.query.tags_ids);
			blogs_ids = parseInt(blogs_ids);
			tags_ids = parseInt(tags_ids);
			var BlogsByNexts = [];
			Blogs.BlogsByNext( blogs_ids,tags_ids,function (BlogsByNextErr, BlogsByNext) {
				if (BlogsByNextErr) {
					BlogsByNext = [];
				};
				BlogsByNexts = BlogsByNext;
				var blogs_ids_add_one = blogs_ids+1;
				var title_to_content_add_one;
				Blogs.BlogsByNext( blogs_ids_add_one,tags_ids,function (BlogsByNextErr, BlogsByNext) {
					if (BlogsByNextErr) {
					BlogsByNext = [];
					};
					var blogs_ids_reduce_one = blogs_ids-1;
					var title_to_content_reduce_one;
					title_to_content_add_one = BlogsByNext;
					Blogs.BlogsByNext( blogs_ids_reduce_one,tags_ids,function (BlogsByNextErr, BlogsByNext) {
						if (BlogsByNextErr) {
						BlogsByNext = [];
						};
						title_to_content_reduce_one = BlogsByNext;
						var tags_open_next= 0;
						var tags_open_prev= 0;
						BlogsByNext = BlogsByNexts;//console.log(title_to_content_add_one);console.log(title_to_content_reduce_one);
						if(title_to_content_add_one.length<1){
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							tags_open_next= 1;console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/reader', { title: '主页',PostTags: PostTags,PostRiqi: PostRiqi,BlogsById:BlogsByNext,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						 }else{
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							console.log("tags_open_prev");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/reader', { title: '主页',PostTags: PostTags,PostRiqi: PostRiqi,BlogsById:BlogsByNext,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						}
					});
				});
			});
		});
		router.get('/content_to_prev', function (req, res) {
			var blogs_ids = kcool.trim(req.query.blogs_ids);
			var tags_ids = kcool.trim(req.query.tags_ids);
			blogs_ids = parseInt(blogs_ids);
			tags_ids = parseInt(tags_ids);
			var BlogsByPrevs = [];
			Blogs.BlogsByPrev( blogs_ids,tags_ids,function (BlogsByPrevErr, BlogsByPrev) {
				if (BlogsByPrevErr) {
					BlogsByPrev = [];
				};
				BlogsByPrevs = BlogsByPrev;
				var blogs_ids_add_one = blogs_ids+1;
				var title_to_content_add_one;
				Blogs.BlogsByPrev( blogs_ids_add_one,tags_ids,function (BlogsByPrevErr, BlogsByPrev) {
					if (BlogsByPrevErr) {
					BlogsByPrev = [];
					};
					var blogs_ids_reduce_one = blogs_ids-1;
					var title_to_content_reduce_one;
					title_to_content_add_one = BlogsByPrev;
					Blogs.BlogsByPrev( blogs_ids_reduce_one,tags_ids,function (BlogsByPrevErr, BlogsByPrev) {
						if (BlogsByPrevErr) {
						BlogsByPrev = [];
						};
						title_to_content_reduce_one = BlogsByPrev;
						var tags_open_next= 0;
						var tags_open_prev= 0;
						BlogsByPrev = BlogsByPrevs;//console.log(title_to_content_add_one);console.log(title_to_content_reduce_one);
						if(title_to_content_add_one.length<1){
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							tags_open_next= 1;console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/reader', { title: '主页',PostTags: PostTags,PostRiqi: PostRiqi,BlogsById:BlogsByPrev,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						 }else{
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							console.log("tags_open_prev");//console.log(tags_open_prev);//console.log(tags_open_next);
							res.render('client/reader', { title: '主页',PostTags: PostTags,PostRiqi: PostRiqi,BlogsById:BlogsByPrev,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						}
					});
				});
			});
		});
		router.get('/blogsByMenu', function (req, res) {
			var tags_ids = kcool.trim(req.query.tags_ids);//console.log(blogs_ids);
			Post.BlogsById_count_all_result( tags_ids,function (BlogsById_count_all_resultErr, BlogsById_count_all_result) {
				if (BlogsById_count_all_resultErr) {
					count_all_result = 1;
				};
				count_all_result = BlogsById_count_all_result[0].count_all_result;	//count_all_result是所有博客的总数量
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
				base_url = 'blogsByMenu?tags_ids='+tags_ids+'&';
				var changePer_page = ( per_pages - 1 ) * per_page;//console.log(changePer_page);
				Blogs.PageByTagId(tags_ids,changePer_page,per_page,function (PageByTagIdErr, PostGet_all) {
					if (PageByTagIdErr) {
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
		router.get('/PageByData', function (req, res) {
			var riqi_dates = kcool.trim(req.query.riqi_dates);//console.log(blogs_ids);
			Post.BlogsByData_count_all_result( riqi_dates,function (BlogsByData_count_all_resultErr, BlogsByData_count_all_result) {
				if (BlogsByData_count_all_resultErr) {
					count_all_result = 1;
				};//console.log(BlogsByData_count_all_result);
				count_all_result = BlogsByData_count_all_result[0].count_all_result;	//count_all_result是所有博客的总数量
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
				base_url = 'PageByData?riqi_dates='+riqi_dates+'&';
				var changePer_page = ( per_pages - 1 ) * per_page;//console.log(changePer_page);
				Blogs.PageByData(riqi_dates,changePer_page,per_page,function (PageByTagIdErr, PostGet_all) {
					if (PageByTagIdErr) {
						PostGet_all = [];
					};//console.log(PostGet_all);
					var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
					Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {console.log(PostGet_all);
						if (PostRiqiErr) {
							PostRiqi = [];
						};//console.log(total_rows+per_page+per_pages);
						res.render('client/blogs', { title: '主页',PostGet_all: PostGet_all,PostRiqi: PostRiqi,PostTags: PostTags,Create_links:Create_links});
					});
				});
			});
		});
	 });
 });
module.exports = router;