var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./sql');
<<<<<<< HEAD
var  object = require('./object');
var app = express();



exports.PostTags =  function (err, callback) {
	var sql =mysqlString.k_tags_k_blogs.getTags;
	object.queryMysql(sql,callback);
};
exports.PostRiqi =  function (err, callback) {
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
=======
var app = express();

exports.PostTags =  function (err, callback) {
	var sql =mysqlString.k_tags_k_blogs.getTags;
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.PostRiqi =  function (err, callback) {
	var sql =mysqlString.k_riqi.getAllRiqi;
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.PostSorts_count_all_result =  function  (err, callback) {
	var sql =mysqlString.k_blogs.getSorts_count_all_result;
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.BlogsById_count_all_result =  function  (blogs_ids, callback) {
	var sql =mysqlString.k_blogs.getBlogsById_count_all_result(blogs_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.BlogsByData_count_all_result =  function  (riqi_dates, callback) {
	var sql =mysqlString.k_riqi.getBlogsByData_count_all_result(riqi_dates);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
>>>>>>> origin/master
};
exports.PostGet_all =  function  (changePer_page,per_page,callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql =mysqlString.k_tags_k_blogs.getAll(changePer_page,per_page);
<<<<<<< HEAD
	object.queryMysql(sql,callback);
};
exports.PostGetDomainsite =  function  (err,callback) {
	var sql =mysqlString.k_domainsite.getDomainsite;
	object.queryMysql(sql,callback);
};
exports.PostGetDomainsuffix =  function  (err,callback) {
	var sql =mysqlString.k_domainsuffix.getDomainsuffix;
	object.queryMysql(sql,callback);
};
exports.PostGetProse =  function  (err,callback) {
	var sql =mysqlString.k_prose.getProse;
	object.queryMysql(sql,callback);
};
exports.PostCatalogue =  function  (err,callback) {
	var sql =mysqlString.k_navigation_k_nav_tag.getCatalogue;
	object.queryMysql(sql,callback);
};
exports.PostCatalogueTag =  function  (err,callback) {
	var sql =mysqlString.k_nav_tag.getCatalogueTag;
	object.queryMysql(sql,callback);
=======
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.PostGetDomainsite =  function  (err,callback) {
	var sql =mysqlString.k_domainsite.getDomainsite;
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.PostGetDomainsuffix =  function  (err,callback) {
	var sql =mysqlString.k_domainsuffix.getDomainsuffix;
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.PostGetProse =  function  (err,callback) {
	var sql =mysqlString.k_prose.getProse;
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.PostCatalogue =  function  (err,callback) {
	var sql =mysqlString.k_navigation_k_nav_tag.getCatalogue;
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.PostCatalogueTag =  function  (err,callback) {
	var sql =mysqlString.k_nav_tag.getCatalogueTag;
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
>>>>>>> origin/master
};