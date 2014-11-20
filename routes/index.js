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
var User = require('../models/user');
var pagination = require('./pagination');
var myDate = require('./dateFormat')();
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
		Post.PostGetProse( null,function (err, PostGetProse) {
			if (err) {
				PostGetProse = [];
			};
			var PostDataProse = new Array();
			for(var p = 0; p < PostGetProse.length; p++){
				var dataProse = {
					dataYear:new Date(PostGetProse[p].kt_prose_dates).format("yyyy"),
				}
				PostDataProse.push(dataProse.dataYear);
			}
			for(var p = 0; p < PostGetProse.length; p++){
				PostGetProse[p].dataYear = new Date(PostGetProse[p].kt_prose_dates).format("yyyy");
				PostGetProse[p].dataMonth = new Date(PostGetProse[p].kt_prose_dates).format("MM")
			}
			function unique(arr) {
				var result = [], hash = {};
				for (var i = 0, elem; (elem = arr[i]) != null; i++) {
					if (!hash[elem]) {
						result.push(elem);
						hash[elem] = true;
					}
				}
				return result;
			}
			PostDataProse = new unique(PostDataProse);//console.log(PostDataProse)
			res.render('client/prose', { title: '主页',PostTags: PostTags,PostGetProse: PostGetProse,PostDataProse:PostDataProse});
		});
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

	router.post('/login', function (req, res) {
		//生成密码的 md5 值
		var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
		//检查用户是否存在
		User.get(req.body.username, function (err, user) {
			if (user.length<1) {
				req.flash('error', '用户不存在!');
				return res.redirect('back');//返回之前的页面
			}//console.log(user);
			//检查密码是否一致
			if (user[0].kt_user_password != password) {
				req.flash('error', '用户不存在!');
				return res.redirect('back');//返回之前的页面
			}
			//用户名密码都匹配后，将用户信息存入 session
			//console.log(user[0].kt_user_name);
			req.session.user = user[0].kt_user_name;//console.log("session:"+req.session.user);
			req.flash('success', '登陆成功!');
			// res.send(req.session.user);
			//res.redirect('back');//返回之前的页面
			res.render('client/po/index', { title: '主页',PostTags: PostTags});
		});
	});
	router.post('/leave', function (req, res) {
			//用户名密码都匹配后，将用户信息存入 session
			//console.log(user[0].kt_user_name);
			req.session.user = '';//console.log("session:"+req.session.user);
			req.flash('success', '退出成功!');
			// res.send(req.session.user);
			//res.redirect('back');//返回之前的页面
			res.render('client/index', { title: '主页',PostTags: PostTags});
	});
	router.get('/toPoIndex', checkLogin);
	router.get('/toPoIndex', function (req, res) {
			res.render('client/po/index', { title: '主页',PostTags: PostTags});
	});
	function checkLogin(req, res, next) {
		if (!req.session.user) {
			req.flash('error', '未登录!');
			res.redirect('back');//返回之前的页面
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