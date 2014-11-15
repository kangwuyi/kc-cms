var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');		//加载db.js模块
mysql = queryDb.getMysqlConn();//加载db.js的getMysqlConn方法关联mysql数据库，并命名为mysql
var  objects = require('./object');
module.exports = objects;
var app = express();

objects.get =  function  get(username, callback) {
	var sql ="select kt_user_ids, kt_user_name,kt_user_password from k_user where kt_user_name='"+username+"' ";
	mysql.query(sql,function(err,rows,fields){//console.log('这里是/models/post，将要把查询到的数据集合传给/routes/index，集合中的数据为:');
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}//console.log('\n');for (var i in rows) {console.log(rows[i]);}
    	});//mysql.end();
};

