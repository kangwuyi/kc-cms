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
	router.get('/blogs', function (req, res) {
		Post.PostSorts_count_all_result( null,function (PostSorts_count_all_resultErr, PostSorts_count_all_result) {
			if (PostSorts_count_all_resultErr) {
				count_all_result = 1;
			};//console.log(PostSorts_count_all_result);
			count_all_result = PostSorts_count_all_result[0].count_all_result;	//count_all_result是所有博客的总数量
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
		Post.PostGetDomainsite( null,function (PostGetDomainsiteErr, PostGetDomainsite) {
			Post.PostGetDomainsuffix( null,function (PostGetDomainsuffixErr, PostGetDomainsuffix) {
				switch (PostGetDomainsiteErr || PostGetDomainsuffixErr){
					case PostGetDomainsiteErr:
						PostGetDomainsiteErr = [];
						break;
					case PostGetDomainsuffixErr:
						PostGetDomainsuffixErr = [];
						break;
				}
				res.render('client/domainname', { title: '主页',PostTags: PostTags,PostGetDomainsite:PostGetDomainsite,PostGetDomainsuffix:PostGetDomainsuffix});
			});
		});
	});

	router.get('/prose', function (req, res) {
		Post.PostGetProse( null,function (err, PostGetProse) {
			if (err) {
				PostGetProse = [];
			};
			return PostGetProse;
		});//console.log(PostGetProse);
		res.render('client/prose', { title: '主页',PostTags: PostTags,PostGetProse: PostGetProse});
	});

	router.get('/catalogue', function (req, res) {
		Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
			if (err) {
				PostCatalogueTag = [];
			};//console.log(PostCatalogueTag);
			//for(var i = 0; i<PostCataloguTag.length; i++){
				//console.log(PostCataloguTag[i].kt_nav_tag_ids);
				Post.PostCatalogue(null,function (err, PostCatalogue) {
					if (err) {
						PostCatalogue = [];
					};//console.log(PostCatalogue);
					res.render('client/catalogue', { title: '主页',PostTags: PostTags,PostCatalogueTag: PostCatalogueTag,PostCatalogue: PostCatalogue});
				});
			//}
		});
	});

	router.get('/about', function (req, res) {
			res.render('client/about', { title: '主页',PostTags: PostTags});
	});
 });
module.exports = router;