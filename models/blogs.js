var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');		//加载db.js模块
mysql = queryDb.getMysqlConn();//加载db.js的getMysqlConn方法关联mysql数据库，并命名为mysql
var  objects = require('./object');
module.exports = objects;
var app = express();


objects.BlogsById =  function  BlogsById(blogs_ids, callback) {
	var sql ="select kt_blogs_titles,kt_blogs_contents,kt_blogs_ids,kt_tags_ids from k_blogs where kt_blogs_ids="+blogs_ids;
	mysql.query(sql,function(err,rows,fields){//console.log('这里是/models/post，将要把查询到的数据集合传给/routes/index，集合中的数据为:');
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}//console.log('\n');for (var i in rows) {console.log(rows[i]);}
    	});//mysql.end();
};
objects.BlogsByNext =  function  BlogsByNext(blogs_ids,tags_ids,callback) {
	var sql ="select kt_blogs_titles,kt_blogs_contents,kt_blogs_ids,kt_tags_ids from k_blogs where kt_tags_ids = "+tags_ids+ " and kt_blogs_ids > "+blogs_ids+ "  ORDER BY kt_blogs_ids ASC LIMIT 1 ";
	mysql.query(sql,function(err,rows,fields){//console.log('这里是/models/post，将要把查询到的数据集合传给/routes/index，集合中的数据为:');
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}//console.log('\n');for (var i in rows) {console.log(rows[i]);}
    	});//mysql.end();
};
objects.BlogsByPrev =  function  BlogsByPrev(blogs_ids,tags_ids,callback) {
	var sql ="select kt_blogs_titles,kt_blogs_contents,kt_blogs_ids,kt_tags_ids from k_blogs where kt_tags_ids = "+tags_ids+" and kt_blogs_ids < "+blogs_ids+"  ORDER BY kt_blogs_ids DESC LIMIT 1";
	mysql.query(sql,function(err,rows,fields){//console.log('这里是/models/post，将要把查询到的数据集合传给/routes/index，集合中的数据为:');
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}//console.log('\n');for (var i in rows) {console.log(rows[i]);}
    	});//mysql.end();
};
objects.PageByTagId =  function  PageByTagId(tags_ids,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = "select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_dates,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name from k_blogs k,k_tags t where  k.kt_tags_ids="+tags_ids+" and k.kt_tags_ids=t.kt_tags_ids and k.kt_tags_ids!=0 order by k.kt_tags_ids desc limit "+changePer_page+" ,"+per_page;
	mysql.query(sql,function(err,rows,fields){//console.log('这里是/models/post，将要把查询到的数据集合传给/routes/index，集合中的数据为:');
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}//console.log('\n');for (var i in rows) {console.log(rows[i]);}
    	});//mysql.end();
}
objects.PageByData =  function  PageByData(riqi_dates,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = "select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_dates,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name from k_blogs k,k_tags t ,k_riqi r where  r.kt_riqi_dates="+riqi_dates+" and k.kt_tags_ids=t.kt_tags_ids and k.kt_blogs_ids=r.kt_blogs_ids order by r.kt_riqi_dates desc limit "+changePer_page+" ,"+per_page;
	mysql.query(sql,function(err,rows,fields){//console.log('这里是/models/post，将要把查询到的数据集合传给/routes/index，集合中的数据为:');
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}//console.log('\n');for (var i in rows) {console.log(rows[i]);}
    	});//mysql.end();
}

