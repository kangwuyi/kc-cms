var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./api/sql');
var  object = require('./api/object');
var app = express();

exports.PostGetProse =  function  (err,callback) {
	var sql =mysqlString.k_prose.getProse;
	object.queryMysql(sql,callback);
};
exports.addProse =  function  (proseTitle,proseDate,proseContent, callback) {
	var sql =mysqlString.k_prose.postAddProse(proseTitle,proseDate,proseContent);
	object.queryMysql(sql,callback);
};
exports.delProseById =  function  (prose_ids,callback) {
	var sql =mysqlString.k_prose.postDelProseById(prose_ids);
	object.queryMysql(sql,callback);
};
exports.getProseById =  function  (prose_ids, callback) {
	var sql =mysqlString.k_prose.getProseById(prose_ids);
	object.queryMysql(sql,callback);
};
exports.toEditProse =  function  (proseId,proseTitle,proseDate,proseContent, callback) {
	var sql =mysqlString.k_prose.postEditProse(proseId,proseTitle,proseDate,proseContent);
	object.queryMysql(sql,callback);
};