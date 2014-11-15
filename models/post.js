var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');		//加载db.js模块
mysql = queryDb.getMysqlConn();//加载db.js的getMysqlConn方法关联mysql数据库，并命名为mysql
var  objects = require('./object');
module.exports = objects;
var app = express();

objects.PostTags =  function  PostTags(err, callback) {
	var sql ="select b.kt_tags_ids,t.kt_tags_name , count(0) as blogs_tags_num from k_tags t,k_blogs b where t.kt_tags_ids=b.kt_tags_ids  group by b.kt_tags_ids order by blogs_tags_num desc;";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}//console.log('\n');for (var i in rows) {console.log(rows[i]);}
    	});//mysql.end();
};
objects.PostRiqi =  function  PostRiqi(err, callback) {
	var sql ="select kt_riqi_dates from k_riqi group by kt_riqi_dates;";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
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
objects.BlogsById_count_all_result =  function  BlogsById_count_all_result(blogs_ids, callback) {
	var sql ="select count(0) as count_all_result from k_blogs where kt_tags_ids="+blogs_ids+" order by count_all_result desc;";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.BlogsByData_count_all_result =  function  BlogsByData_count_all_result(riqi_dates, callback) {
	var sql ="select count(0) as count_all_result from k_riqi where  kt_riqi_dates="+riqi_dates+" order by count_all_result desc;";
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
	};//console.log(changePer_page);console.log(per_page);
	var sql ="select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_dates,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name from k_blogs k,k_tags t   where k.kt_tags_ids=t.kt_tags_ids order by k.kt_tags_ids desc limit "+changePer_page+" ,"+per_page;
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.PostGetDomainsite =  function  PostGetDomainsite(err,callback) {
	var sql ="select * from k_domainsite";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.PostGetDomainsuffix =  function  PostGetDomainsuffix(err,callback) {
	var sql ="select * from k_domainsuffix";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.PostGetProse =  function  PostGetProse(err,callback) {
	var sql ="select * from k_prose";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.PostCatalogue =  function  PostCatalogue(err,callback) {
	var sql ="select n.kt_navigation_ids,n.kt_navigation_name,n.kt_navigation_url,n.kt_nav_tag_ids,na.kt_nav_tag_name from k_navigation n,k_nav_tag na where n.kt_nav_tag_ids = na.kt_nav_tag_ids";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.PostCatalogueTag =  function  PostCatalogueTag(err,callback) {
	var sql ="select kt_nav_tag_ids,kt_nav_tag_name from k_nav_tag";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};