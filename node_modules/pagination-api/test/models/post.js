var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');		//加载db.js模块
mysql = queryDb.getMysqlConn();//加载db.js的getMysqlConn方法关联mysql数据库，并命名为mysql
var  objects = require('./object');
module.exports = objects;
var app = express();
objects.PostSorts_count_all_result =  function  PostSorts_count_all_result(err, callback) {
	var sql ="select count(0) as count_all_result from k_blogs ;";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.PostGet_all =  function  PostGet_all(changePer_page,per_page,callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql ="select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_dates,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name from k_blogs k,k_tags t   where k.kt_tags_ids=t.kt_tags_ids order by k.kt_tags_ids desc limit "+changePer_page+" ,"+per_page;
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};

