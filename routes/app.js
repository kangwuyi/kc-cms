var express = require('express');
var http = require("http");            //提供web服务
var url = require("url");            //解析GET请求
var query = require("querystring");    //解析POST请求
var router = express.Router();
var crypto = require('crypto');
var kcool = require('../public/lib/kcool');
var Post = require('../models/post');
var Po = require('../models/po');
var Blogs = require('../models/blogs');
var pagination = require('pagination-api');
	Date.prototype.Format = function (fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	router.get('/appIndex', function (req, res) {
		Post.PostTags( null,function (PostTagsErr, PostTags) {
			Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {
				Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
					res.render('app/index', { title: '主页',PostTags:PostTags,PostRiqi:PostRiqi,PostCatalogueTag:PostCatalogueTag});
				});
			});
		});
	});
	router.get('/appAbout', function (req, res) {
		Post.PostTags( null,function (PostTagsErr, PostTags) {
			Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {
				Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
					res.render('app/about', { title: '主页',PostTags:PostTags,PostRiqi:PostRiqi,PostCatalogueTag:PostCatalogueTag});
				});
			});
		});
	});
	router.get('/appAllBlog', function (req, res) {
		Post.PostTags( null,function (PostTagsErr, PostTags) {
			Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {
				Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
					Po.GetAllBlog(null,function (GetAllBlogErr, GetAllBlog) {
						res.render('app/blog', { title: '主页',PostTags:PostTags,PostRiqi:PostRiqi,PostCatalogueTag:PostCatalogueTag,GetAllBlog:GetAllBlog});
					});
				});
			});
		});
	});
	router.get('/appBlogByData', function (req, res) {
		var riqi_dates = kcool.trim(req.query.riqi_dates);
		Post.PostTags( null,function (PostTagsErr, PostTags) {
			Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {
				Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
					Po.appBlogByData(riqi_dates,function (appBlogByDataErr, appBlogByData) {
						res.render('app/blogDate', { title: '主页',PostTags:PostTags,PostRiqi:PostRiqi,PostCatalogueTag:PostCatalogueTag,appBlogByData:appBlogByData});
					});
				});
			});
		});
	});
	router.get('/appBlogByTag', function (req, res) {
		var tags_ids = kcool.trim(req.query.tags_ids);
		Post.PostTags( null,function (PostTagsErr, PostTags) {
			Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {
				Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
					Po.appBlogByTag(tags_ids,function (appBlogByTagErr, appBlogByTag) {
						res.render('app/blogTag', { title: '主页',PostTags:PostTags,PostRiqi:PostRiqi,PostCatalogueTag:PostCatalogueTag,appBlogByTag:appBlogByTag});
					});
				});
			});
		});
	});
	router.get('/appProse', function (req, res) {
		Post.PostTags( null,function (PostTagsErr, PostTags) {
			Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {
				Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
					Post.PostGetProse( null,function (err, PostGetProse) {
						for(var p = 0; p < PostGetProse.length; p++){
							PostGetProse[p].dataYear = new Date(PostGetProse[p].kt_prose_dates).format("yyyy");
							PostGetProse[p].dataMonth = new Date(PostGetProse[p].kt_prose_dates).format("MM")
						}
						res.render('app/prose', { title: '主页',PostTags:PostTags,PostRiqi:PostRiqi,PostCatalogueTag:PostCatalogueTag,PostGetProse:PostGetProse});
					});
				});
			});
		});
	});
	router.get('/appCatalogueType', function (req, res) {
		var nav_tag_ids = kcool.trim(req.query.nav_tag_ids);
		Post.PostTags( null,function (PostTagsErr, PostTags) {
			Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {
				Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
					Po.appCatalogueType(nav_tag_ids,function (err, appCatalogueType) {
						res.render('app/catalogue', { title: '主页',PostTags:PostTags,PostRiqi:PostRiqi,PostCatalogueTag:PostCatalogueTag,appCatalogueType:appCatalogueType});
					});
				});
			});
		});
	});
	router.get('/appBlogReader', function (req, res) {
		var blogs_ids = req.query.blogs_ids ? parseInt(kcool.trim(req.query.blogs_ids)) : 1;
		var tags_ids = req.query.tags_ids ? parseInt(kcool.trim(req.query.tags_ids)) : 1;
		Post.PostTags( null,function (PostTagsErr, PostTags) {
			Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {
				Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
					var BlogsByIds = [];
					Blogs.BlogsById( blogs_ids,function (BlogsByIdErr, BlogsById) {
						if (BlogsByIdErr) {
							BlogsById = [];
						};
						BlogsByIds = BlogsById;
						var blogs_ids_add_one = blogs_ids;
						var title_to_content_add_one;
						Blogs.BlogsByNext( blogs_ids_add_one,tags_ids,function (BlogsByNextErr, BlogsByNext) {
							if (BlogsByNextErr) {
							BlogsByNext = [];
							};
							var blogs_ids_reduce_one = blogs_ids;
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
									tags_open_next= 1;console.log("tags_open_next");console.log(tags_open_prev);console.log(tags_open_next);
									res.render('app/blogReader', { title: '主页',PostTags:PostTags,PostRiqi:PostRiqi,PostCatalogueTag:PostCatalogueTag,BlogsById:BlogsById,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
								 }else{
									if(title_to_content_reduce_one.length<1){
										tags_open_prev= 1;
									};
									res.render('app/blogReader', { title: '主页',PostTags:PostTags,PostRiqi:PostRiqi,PostCatalogueTag:PostCatalogueTag,BlogsById:BlogsById,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
								}
							});
						});
					});
				});
			});
		});
	});
	router.get('/appBlogReaderPrev', function (req, res) {
		var blogs_ids = req.query.blogs_ids ? parseInt(kcool.trim(req.query.blogs_ids)) : 1;
		var tags_ids = req.query.tags_ids ? parseInt(kcool.trim(req.query.tags_ids)) : 1;
		blogs_ids = parseInt(blogs_ids);
		tags_ids = parseInt(tags_ids);
		Post.PostTags( null,function (PostTagsErr, PostTags) {
			Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {
				Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
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
									tags_open_next= 1;//console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
									res.render('app/blogReader', { title: '主页',PostTags: PostTags,PostRiqi: PostRiqi,PostCatalogueTag:PostCatalogueTag,BlogsById:BlogsByPrev,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
								 }else{
									if(title_to_content_reduce_one.length<1){
										tags_open_prev= 1;
									};
									//console.log("tags_open_prev");//console.log(tags_open_prev);//console.log(tags_open_next);
									res.render('app/blogReader', { title: '主页',PostTags: PostTags,PostCatalogueTag:PostCatalogueTag,PostRiqi: PostRiqi,BlogsById:BlogsByPrev,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
								}
							});
						});
					});
				});
			});
		});
	});
	router.get('/appBlogReaderNext', function (req, res) {
		var blogs_ids = req.query.blogs_ids ? parseInt(kcool.trim(req.query.blogs_ids)) : 1;
		var tags_ids = req.query.tags_ids ? parseInt(kcool.trim(req.query.tags_ids)) : 1;
		Post.PostTags( null,function (PostTagsErr, PostTags) {
			Post.PostRiqi( null,function (PostRiqiErr, PostRiqi) {
				Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
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
									tags_open_next= 1;//console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
									res.render('app/blogReader', { title: '主页',PostTags: PostTags,PostCatalogueTag:PostCatalogueTag,PostRiqi: PostRiqi,BlogsById:BlogsByNext,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
								 }else{
									if(title_to_content_reduce_one.length<1){
										tags_open_prev= 1;
									};
									//console.log("tags_open_prev");//console.log(tags_open_prev);console.log(tags_open_next);
									res.render('app/blogReader', { title: '主页',PostTags: PostTags,PostCatalogueTag:PostCatalogueTag,PostRiqi: PostRiqi,BlogsById:BlogsByNext,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
								}
							});
						});
					});
				});
			});
		});
	});



module.exports = router;