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
	mysql.query(sql,function(err,rows,fields){//console.log('这里是/models/post，将要把查询到的数据集合传给/routes/index，集合中的数据为:');
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}//console.log('\n');for (var i in rows) {console.log(rows[i]);}
    	});//mysql.end();
};
objects.PostRiqi =  function  PostRiqi(err, callback) {
	var sql ="select kt_riqi_dates from k_riqi group by kt_riqi_dates;";
	mysql.query(sql,function(err,rows,fields){//console.log('这里是/models/post，将要把查询到的数据集合传给/routes/index，集合中的数据为:');
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}//console.log('\n');for (var i in rows) {console.log(rows[i]);}
    	});//mysql.end();
};
objects.PostSorts_count_all_result =  function  PostSorts_count_all_result(err, callback) {
	var sql ="select count(0) as count_all_result from k_blogs ;";
	mysql.query(sql,function(err,rows,fields){//console.log('这里是/models/post，将要把查询到的数据集合传给/routes/index，集合中的数据为:');
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}//console.log('\n');for (var i in rows) {console.log(rows[i]);}
    	});//mysql.end();
};

objects.PostGet_all =  function  PostGet_all(changePer_page,per_page,callback) {
	if(changePer_page==''){
		changePer_page=0;
	};//console.log(changePer_page);console.log(per_page);
	var sql ="select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_dates,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name from k_blogs k,k_tags t   where k.kt_tags_ids=t.kt_tags_ids order by k.kt_tags_ids desc limit "+changePer_page+" ,"+per_page;
	mysql.query(sql,function(err,rows,fields){//console.log('这里是/models/post，将要把查询到的数据集合传给/routes/index，集合中的数据为:');
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}//console.log('\n');for (var i in rows) {console.log(rows[i]);}
    	});//mysql.end();
};

