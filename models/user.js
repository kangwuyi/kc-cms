var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./sql');
var  object = require('./object');
var app = express();

exports.get =  function  (username, callback) {
	var sql =mysqlString.k_user.getAllByName(username);
	object.queryMysql(sql,callback);
};

