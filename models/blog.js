var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./api/sql');
var  object = require('./api/object');
var app = express();

exports.BlogsById =  function  (blogs_ids, callback) {
	var sql =mysqlString.k_tags_k_blogs.getBlogsById(blogs_ids);
	object.queryMysql(sql,callback);
};
exports.BlogsByNext =  function  (blogs_ids,tags_ids,callback) {
	var sql =mysqlString.k_blogs.getBlogsByNext(blogs_ids,tags_ids);
	object.queryMysql(sql,callback);
};
exports.BlogsByPrev =  function  (blogs_ids,tags_ids,callback) {
	var sql =mysqlString.k_blogs.getBlogsByPrev(blogs_ids,tags_ids);
	object.queryMysql(sql,callback);
};
exports.PageByTagId =  function  (tags_ids,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_tags_k_blogs.getPageByTagId(tags_ids,changePer_page,per_page);
	object.queryMysql(sql,callback);
};
exports.PageByData =  function  (riqi_dates,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_tags_k_blogs_k_riqi.getPageByData(riqi_dates,changePer_page,per_page);
	object.queryMysql(sql,callback);
};
exports.checkTag =  function  (tagName, callback) {
	var sql =mysqlString.k_tags.getCheckTag(tagName);
	object.queryMysql(sql,callback);
};

exports.AddTagName =  function  (tagName, callback) {
	var sql =mysqlString.k_tags.postAddTagName(tagName);
	object.queryMysql(sql,callback);
};
exports.toAddBlog =  function  (blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent, callback) {
	var sql =mysqlString.k_blogs.postAddBlog(blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent);
	object.queryMysql(sql,callback);
};
exports.dateBackBlogId =  function  (blogDate, callback) {
	var sql =mysqlString.k_blogs.getDateBackBlogId(blogDate);
	object.queryMysql(sql,callback);
};
exports.toAddRiqi =  function  (dateRiqi,blogId, callback) {
	var sql =mysqlString.k_riqi.postAddRiqi(dateRiqi,blogId);
	object.queryMysql(sql,callback);
};
exports.delBlogById =  function  (blogs_ids,callback) {
	var sql =mysqlString.k_blogs.postDelBlogById(blogs_ids);
	object.queryMysql(sql,callback);
};
exports.delBlogRiqiById =  function  (blogs_ids,callback) {
	var sql =mysqlString.k_riqi.postDelBlogRiqiById(blogs_ids);
	object.queryMysql(sql,callback);
};
exports.appBlogByData =  function  (riqi_dates, callback) {
	var sql = mysqlString.k_tags_k_blogs_k_riqi.getAppBlogByData(riqi_dates);
	object.queryMysql(sql,callback);
};
exports.appBlogByTag =  function  (tags_ids,callback) {
	var sql = mysqlString.k_tags_k_blogs.getAppBlogByTag(tags_ids);
	object.queryMysql(sql,callback);
};
exports.GetAllBlog =  function  (err, callback) {
	var sql =mysqlString.k_tags_k_blogs.getAllBlog;
	object.queryMysql(sql,callback);
};
exports.toEditBlog =  function  (blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent, callback) {
	var sql =mysqlString.k_blogs.postEditBlog(blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent);
	object.queryMysql(sql,callback);
};
exports.PostBlogTag =  function (err, callback) {
	var sql =mysqlString.k_tags_k_blogs.getTags;
	object.queryMysql(sql,callback);
};
exports.PostBlogTagAll =  function (err, callback) {
	var sql =mysqlString.k_tags.PostBlogsTag;
	object.queryMysql(sql,callback);
};
exports.PostBlogDate =  function (err, callback) {
	var sql =mysqlString.k_riqi.getAllRiqi;
	object.queryMysql(sql,callback);
};
exports.PostSorts_count_all_result =  function  (err, callback) {
	var sql =mysqlString.k_blogs.getSorts_count_all_result;
	object.queryMysql(sql,callback);
};
exports.BlogsById_count_all_result =  function  (blogs_ids, callback) {
	var sql =mysqlString.k_blogs.getBlogsById_count_all_result(blogs_ids);
	object.queryMysql(sql,callback);
};
exports.BlogsByData_count_all_result =  function  (riqi_dates, callback) {
	var sql =mysqlString.k_riqi.getBlogsByData_count_all_result(riqi_dates);
	object.queryMysql(sql,callback);
};
exports.PostGet_all =  function  (changePer_page,per_page,callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql =mysqlString.k_tags_k_blogs.getAll(changePer_page,per_page);
	object.queryMysql(sql,callback);
};