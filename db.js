(function() {
	var conn, mysql, connMysql,express,http;
	var conn = null;		//定义conn用于连接mysql数据库
	var mysql = require('mysql');	//加载node-mysql模块
	var connMysql = require('./connMysql');		//加载connMysql.js文件（自定义的connMysql模块）
	var express = require('express');		//加载express模块等待扩展
	var http = require('http');		//加载http模块等待扩展

	exports.getMysqlConn = function() {

		var err;
		try {
			if (conn) {
				conn = mysql.createConnection(connMysql.db);
				conn.connect();
			} else {
				conn = new mysql.createConnection(connMysql.db);
				conn.connect();
			}
		} catch (_error) {
			err = _error;
			throw err;
		}
		return conn;
	};

}).call(this);
