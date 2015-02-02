(function() {
	var express = require('express')
	,mysql = require('mysql')
	,http = require('http');
	var router = express.Router();
	var crypto = require('crypto');
	var kcool = require('../../public/lib/kcool');
	var  queryDb = require('../../db');
	mysql = queryDb.getMysqlConn();
	var object;
	object = {
		queryMysql: function (sql ,callback){
			//console.log(sql);
			mysql.query(sql,function(err,rows,fields){
		 		if(err){
					throw err;
				}else{
					callback(err,rows,fields);
		        		}
		        		//console.log('\n');for (var i in rows) {console.log(rows[i]);}
		        		//console.log('\n');for (var i in fields) {console.log(fields[i]);}
		    	});//mysql.end();
		},
		checkLogin: function (req, res, next) {
			if (!req.session.user) {
				req.flash('error', '未登录!');
				res.redirect('back');//返回之前的页面
			}
			next();
		},

		checkNotLogin: function (req, res, next) {
			if (req.session.user) {
				req.flash('error', '已登录!');
				res.redirect('back');//返回之前的页面
			}
			next();
		},

	};

	module.exports = object;

}).call(this);