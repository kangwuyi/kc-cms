var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');		//加载db.js模块
mysql = queryDb.getMysqlConn();//加载db.js的getMysqlConn方法关联mysql数据库，并命名为mysql
var  mysqlString = require('./sql');
var app = express();

exports.checkTag =  function  (tagName, callback) {
	var sql =mysqlString.k_tags.getCheckTag(tagName);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.AddTagName =  function  (tagName, callback) {
	var sql =mysqlString.k_tags.postAddTagName(tagName);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.toAddBlog =  function  (blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent, callback) {
	var sql =mysqlString.k_blogs.postAddBlog(blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.dateBackBlogId =  function  (blogDate, callback) {
	var sql =mysqlString.k_blogs.getDateBackBlogId(blogDate);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.toAddRiqi =  function  (dateRiqi,blogId, callback) {
	var sql =mysqlString.k_riqi.postAddRiqi(dateRiqi,blogId);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.addProse =  function  (proseTitle,proseDate,proseContent, callback) {
	var sql =mysqlString.k_prose.postAddProse(proseTitle,proseDate,proseContent);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.addCatalogueType =  function  (catalogueTitle, callback) {
	var sql =mysqlString.k_nav_tag.postAddCatalogueType(catalogueTitle);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.addCatalogue =  function  (catalogueTitle,catalogueUrl,catalogueTypeId,callback) {
	var sql =mysqlString.k_navigation.postAddCatalogue(catalogueTitle,catalogueUrl,catalogueTypeId);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.addDomainNew =  function  (DomainNewTitle,DomainNewContent,callback) {
	var sql =mysqlString.k_domainnew.postAddDomainNew(DomainNewTitle,DomainNewContent);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.delBlogById =  function  (blogs_ids,callback) {
	var sql =mysqlString.k_blogs.postDelBlogById(blogs_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.delBlogRiqiById =  function  (blogs_ids,callback) {
	var sql =mysqlString.k_riqi.postDelBlogRiqiById(blogs_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.delProseById =  function  (prose_ids,callback) {
	var sql =mysqlString.k_prose.postDelProseById(prose_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.delCatalogueById =  function  (navigation_ids,callback) {
	var sql =mysqlString.k_navigation.postDelCatalogueById(navigation_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.GetAllBlog =  function  (err, callback) {
	var sql =mysqlString.k_tags_k_blogs.getAllBlog;
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.toEditBlog =  function  (blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent, callback) {
	var sql =mysqlString.k_blogs.postEditBlog(blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.getProseById =  function  (prose_ids, callback) {
	var sql =mysqlString.k_prose.getProseById(prose_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.toEditProse =  function  (proseId,proseTitle,proseDate,proseContent, callback) {
	var sql =mysqlString.k_prose.postEditProse(proseId,proseTitle,proseDate,proseContent);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.getCatalogueById =  function  (navigation_ids, callback) {
	var sql =mysqlString.k_navigation_k_nav_tag.getCatalogueById(navigation_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.toEditCatalogue =  function  (catalogueId,catalogueTitle,catalogueUrl,catalogueTypeId, callback) {
	var sql =mysqlString.k_navigation.postEditCatalogue(catalogueId,catalogueTitle,catalogueUrl,catalogueTypeId);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.appBlogByData =  function  (riqi_dates, callback) {
	var sql = mysqlString.k_tags_k_blogs_k_riqi.getAppBlogByData(riqi_dates);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
}
exports.appBlogByTag =  function  (tags_ids,callback) {
	var sql = mysqlString.k_tags_k_blogs.getAppBlogByTag(tags_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
}
exports.appCatalogueType =  function  (nav_tag_ids, callback) {
	var sql =mysqlString.k_navigation_k_nav_tag.getAppCatalogueType(nav_tag_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};