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
var Po = require('../models/po');
var Blogs = require('../models/blogs');
var pagination = require('./pagination');
Post.PostTags( null,function (PostTagsErr, PostTags) {
	if (PostTagsErr) {
		PostTags = [];
	}
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
	//定义跳转
	router.get('/poHome', checkLogin);
	router.get('/poHome', function (req, res) {
			res.render('client/po/index', { title: '主页',PostTags: PostTags});
		});
	router.get('/poAdds', checkLogin);
	router.get('/poAdds', function (req, res) {
			res.render('client/po/add/addIndex', { title: '主页',PostTags: PostTags});
		});
	router.get('/poBlogs', checkLogin);
	router.get('/poBlogs', function (req, res) {
			res.render('client/po/add/blogs', { title: '主页',PostTags: PostTags});
		});
	router.get('/poDomains', checkLogin);
	router.get('/poDomains', function (req, res) {
			res.render('client/po/add/domain', { title: '主页',PostTags: PostTags});
	});
	router.get('/poDomains', checkLogin);
	router.get('/poProse', function (req, res) {
			res.render('client/po/add/prose', { title: '主页',PostTags: PostTags});
	});
	router.get('/poCatalogue', checkLogin);
	router.get('/poCatalogue', function (req, res) {
		Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
			if (err) {
				PostCatalogueTag = [];
			};
			res.render('client/po/add/catalogue', { title: '主页',PostCatalogueTag: PostCatalogueTag,PostTags: PostTags});
		});
	});
	router.get('/poAddCatalogueType', checkLogin);
	router.get('/poAddCatalogueType', function (req, res) {
			res.render('client/po/add/catalogueType', { title: '主页',PostTags: PostTags});
		});
	router.get('/poAddBlogType', checkLogin);
	router.get('/poAddBlogType', function (req, res) {
			res.render('client/po/add/blogType', { title: '主页',PostTags: PostTags});
		});
	router.get('/poRevise', checkLogin);
	router.get('/poRevise', function (req, res) {
			res.render('client/po/revise/reviseIndex', { title: '主页',PostTags: PostTags});
		});
	router.get('/poReviseBlogs', checkLogin);
	router.get('/poReviseBlogs', function (req, res) {
		Po.GetAllBlog(null,function (GetAllBlogErr, GetAllBlog) {
				if (GetAllBlogErr) {
					GetAllBlog = [];
				};//console.log(PostGet_all);
				res.render('client/po/revise/reviseBlog', { title: '主页',GetAllBlog: GetAllBlog,PostTags: PostTags});
		});
	});
	router.get('/editBlogById', checkLogin);
	router.get('/editBlogById', function (req, res) {
		var blogs_ids = req.query.blogs_ids;
		Blogs.BlogsById( blogs_ids,function (BlogsByIdErr, BlogsById) {
				if (BlogsByIdErr) {
					BlogsById = [];
				};
				res.render('client/po/revise/edit/editBlogs', { title: '主页',BlogsById: BlogsById,PostTags: PostTags});
		});
	});
	router.post('/toEditBlog', function (req, res) {
		var blogId = req.body.blogId ? kcool.trim(req.body.blogId):1;
		var blogTitle = req.body.blogTitle ? kcool.trim(req.body.blogTitle):1;
		var blogTagId = req.body.blogTagId ? kcool.trim(req.body.blogTagId):1;
		var blogYear = req.body.blogYear ? kcool.trim(req.body.blogYear):1;
		var blogYue = req.body.blogYue ? kcool.trim(req.body.blogYue):1;
		var blogRi = req.body.blogRi ? kcool.trim(req.body.blogRi):1;
		var blogDate = new Date().format("yyyy-MM-dd hh:mm:ss");
		var blogContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
		Po.toEditBlog(blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent,function (err, toEditBlog) {
			var dateRiqi = blogYue+'.'+blogYear;
			Po.toAddRiqi(dateRiqi,blogId,function (err, toAddRiqi) {
				req.flash('success', '添加"'+blogTitle+'"文章成功!');
				return res.redirect('back');
			});
		});
	});
	router.get('/poReviseDomain', checkLogin);
	router.get('/poReviseDomain', function (req, res) {
			res.render('client/po/revise/reviseDomain', { title: '主页',PostTags: PostTags});
		});
	router.get('/poReviseCatalogue', checkLogin);
	router.get('/poReviseCatalogue', function (req, res) {
		Post.PostCatalogue(null,function (err, PostCatalogue) {
			if (err) {
				PostCatalogue = [];
			};//console.log(PostCatalogue);
			res.render('client/po/revise/reviseCatalogue', { title: '主页',PostTags: PostTags,PostCatalogue: PostCatalogue});
		});
	});
	router.get('/editCatalogueById', function (req, res) {
		var navigation_ids = req.query.navigation_ids ? kcool.trim(req.query.navigation_ids):1;
		Po.getCatalogueById(navigation_ids,function (err, getCatalogueById) {
			Post.PostCatalogueTag( null,function (err, PostCatalogueTag) {
				if (err) {
					PostCatalogueTag = [];
				};
				res.render('client/po/revise/edit/editCatalogue', { title: '主页',PostCatalogueTag:PostCatalogueTag,getCatalogueById: getCatalogueById,PostTags: PostTags});
			});
		});
	});
	router.post('/toEditCatalogue', function (req, res) {
		var catalogueId = req.body.catalogueId ? kcool.trim(req.body.catalogueId):1;
		var catalogueTitle = req.body.catalogueTitle ? kcool.trim(req.body.catalogueTitle):1;
		var catalogueUrl = req.body.catalogueUrl ? kcool.trim(req.body.catalogueUrl):1;
		var catalogueTypeId = req.body.catalogueTypeId ? kcool.trim(req.body.catalogueTypeId):1;
		Po.toEditCatalogue(catalogueId,catalogueTitle,catalogueUrl,catalogueTypeId,function (err, toEditCatalogue) {
			req.flash('success', '添加"'+catalogueTitle+'"文章成功!');
			return res.redirect('back');
		});
	});
	router.get('/poReviseProse', checkLogin);
	router.get('/poReviseProse', function (req, res) {
		Post.PostGetProse( null,function (err, PostGetProse) {
			if (err) {
				PostGetProse = [];
			};
			for(var p = 0; p < PostGetProse.length; p++){
				PostGetProse[p].dataYear = new Date(PostGetProse[p].kt_prose_dates).format("yyyy");
				PostGetProse[p].dataMonth = new Date(PostGetProse[p].kt_prose_dates).format("MM")
			}
			res.render('client/po/revise/reviseProse', { title: '主页',PostTags: PostTags,PostGetProse: PostGetProse});
		});
	});
	router.get('/editProseById', function (req, res) {
		var prose_ids = req.query.prose_ids ? kcool.trim(req.query.prose_ids):1;
		Po.getProseById(prose_ids,function (err, getProseById) {
			res.render('client/po/revise/edit/editProse', { title: '主页',getProseById: getProseById,PostTags: PostTags});
		});
	});
	router.post('/toEditProse', function (req, res) {
		var proseId = req.body.proseId ? kcool.trim(req.body.proseId):1;
		var proseTitle = req.body.proseTitle ? kcool.trim(req.body.proseTitle):1;
		var proseDate = new Date().format("yyyy-MM-dd hh:mm:ss");
		var proseContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
		Po.toEditProse(proseId,proseTitle,proseDate,proseContent,function (err, toEditProse) {
			req.flash('success', '添加"'+proseTitle+'"文章成功!');
			return res.redirect('back');
		});
	});
	router.get('/poDelete', checkLogin);
	router.get('/poDelete', function (req, res) {
			res.render('client/po/delete/deleteIndex', { title: '主页',PostTags: PostTags});
		});
	router.get('/poDeleteBlogs', checkLogin);
	router.get('/poDeleteBlogs', function (req, res) {
		Po.GetAllBlog(null,function (GetAllBlogErr, GetAllBlog) {
				if (GetAllBlogErr) {
					GetAllBlog = [];
				};//console.log(PostGet_all);
				res.render('client/po/delete/deleteBlog', { title: '主页',GetAllBlog: GetAllBlog,PostTags: PostTags});
		});
	});
	router.get('/delBlogById', function (req, res) {
		var blogs_ids = req.query.blogs_ids;
		Post.delBlogById(blogs_ids,function (PostGet_allErr, delBlogById) {
			return res.redirect('back');
		});
	});
	router.get('/poDeleteDomain', checkLogin);
	router.get('/poDeleteDomain', function (req, res) {
			res.render('client/po/delete/deleteDomain', { title: '主页',PostTags: PostTags});
		});
	router.get('/poDeleteCatalogue', checkLogin);
	router.get('/poDeleteCatalogue', function (req, res) {
		Post.PostCatalogue(null,function (err, PostCatalogue) {
			if (err) {
				PostCatalogue = [];
			};//console.log(PostCatalogue);
			res.render('client/po/delete/deleteCatalogue', { title: '主页',PostTags: PostTags,PostCatalogue: PostCatalogue});
		});
	});
	router.get('/delCatalogueById', function (req, res) {
		var navigation_ids = req.query.navigation_ids;
		Post.delCatalogueById(navigation_ids,function (err, delCatalogueById) {
			return res.redirect('back');
		});
	});
	router.get('/poDeleteProse', checkLogin);
	router.get('/poDeleteProse', function (req, res) {
		Post.PostGetProse( null,function (err, PostGetProse) {
			if (err) {
				PostGetProse = [];
			};
			for(var p = 0; p < PostGetProse.length; p++){
				PostGetProse[p].dataYear = new Date(PostGetProse[p].kt_prose_dates).format("yyyy");
				PostGetProse[p].dataMonth = new Date(PostGetProse[p].kt_prose_dates).format("MM")
			}
			res.render('client/po/delete/deleteProse', { title: '主页',PostTags: PostTags,PostGetProse: PostGetProse});
		});
	});
	router.get('/delProseById', function (req, res) {
		var prose_ids = req.query.prose_ids;
		Post.delProseById(prose_ids,function (err, delProseById) {
			return res.redirect('back');
		});
	});
	//定义添加
	router.post('/toAddBlogType', function (req, res) {
		var tagName = req.body.tagName ? kcool.trim(req.body.tagName):1;
		//检查标签是否存在
		Po.checkTag(tagName, function (err, checkTag) {
			if (checkTag.length<1) {
				Po.AddTagName(tagName, function (err, AddTagName) {
					req.flash('success', '添加"'+tagName+'"标签成功!');
					return res.redirect('back');
				});
			}else{
				req.flash('error', '"'+tagName+'"标签已存在!');
				return res.redirect('back');
			}
		});
	});
	router.post('/toAddBlog', function (req, res) {
		var blogTitle = req.body.blogTitle ? kcool.trim(req.body.blogTitle):1;
		var blogTagId = req.body.blogTagId ? kcool.trim(req.body.blogTagId):1;
		var blogYear = req.body.blogYear ? kcool.trim(req.body.blogYear):1;
		var blogYue = req.body.blogYue ? kcool.trim(req.body.blogYue):1;
		var blogRi = req.body.blogRi ? kcool.trim(req.body.blogRi):1;
		var blogDate = new Date().format("yyyy-MM-dd hh:mm:ss");
		var blogContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
		Po.toAddBlog(blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent,function (err, toAddBlog) {
			Po.dateBackBlogId(blogDate,function (err, dateBackBlogId) {
				var blogId = dateBackBlogId[0].kt_blogs_ids;
				var dateRiqi = blogYue+'.'+blogYear;
				Po.toAddRiqi(dateRiqi,blogId,function (err, toAddRiqi) {
					req.flash('success', '添加"'+blogTitle+'"文章成功!');
					return res.redirect('back');
				});
			});
		});
	});
	router.post('/toAddProse', function (req, res) {
		var proseTitle = req.body.proseTitle ? kcool.trim(req.body.proseTitle):1;
		var proseDate = new Date().format("yyyy-MM-dd hh:mm:ss");
		var proseContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
		Po.addProse(proseTitle,proseDate,proseContent,function (err, addProse) {
			req.flash('success', '添加"'+proseTitle+'"文章成功!');
			return res.redirect('back');
		});
	});
	router.post('/addCatalogueType', function (req, res) {
		var catalogueTitle = req.body.catalogueTitle ? kcool.trim(req.body.catalogueTitle):1;
		Po.addCatalogueType(catalogueTitle,function (err, addCatalogueType) {
			req.flash('success', '添加"'+catalogueTitle+'"文章成功!');
			return res.redirect('back');
		});
	});
	router.post('/addCatalogue', function (req, res) {
		var catalogueTitle = req.body.catalogueTitle ? kcool.trim(req.body.catalogueTitle):1;
		var catalogueUrl = req.body.catalogueUrl ? kcool.trim(req.body.catalogueUrl):1;
		var catalogueTypeId = req.body.catalogueTypeId ? kcool.trim(req.body.catalogueTypeId):1;
		Po.addCatalogue(catalogueTitle,catalogueUrl,catalogueTypeId,function (err, addCatalogue) {
			req.flash('success', '添加"'+catalogueTitle+'"文章成功!');
			return res.redirect('back');
		});

	});
	router.post('/addDomainNew', function (req, res) {
		var DomainNewTitle = req.body.DomainNewTitle ? kcool.trim(req.body.DomainNewTitle):1;
		var DomainNewContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
		Po.addDomainNew(DomainNewTitle,DomainNewContent,function (err, addDomainNew) {
			req.flash('success', '添加"'+catalogueTitle+'"文章成功!');
			return res.redirect('back');
		});

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