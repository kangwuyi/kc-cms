var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./sql');
<<<<<<< HEAD
var  object = require('./object');
=======
>>>>>>> origin/master
var app = express();

exports.get =  function  (username, callback) {
	var sql =mysqlString.k_user.getAllByName(username);
<<<<<<< HEAD
	object.queryMysql(sql,callback);
=======
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});
>>>>>>> origin/master
};

