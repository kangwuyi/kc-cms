var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./sql');
var app = express();


exports.BlogsById =  function  (blogs_ids, callback) {
	var sql =mysqlString.k_tags_k_blogs.getBlogsById(blogs_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.BlogsByNext =  function  (blogs_ids,tags_ids,callback) {
	var sql =mysqlString.k_blogs.getBlogsByNext(blogs_ids,tags_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.BlogsByPrev =  function  (blogs_ids,tags_ids,callback) {
	var sql =mysqlString.k_blogs.getBlogsByPrev(blogs_ids,tags_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.PageByTagId =  function  (tags_ids,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_tags_k_blogs.getPageByTagId(tags_ids,changePer_page,per_page);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
}
exports.PageByData =  function  (riqi_dates,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_tags_k_blogs_k_riqi.getPageByData(riqi_dates,changePer_page,per_page);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
}

