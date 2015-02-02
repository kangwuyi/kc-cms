var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./api/sql');
var  object = require('./api/object');
var app = express();

exports.getSorts_count_all_result =  function  (err,callback) {
	var sql =mysqlString.k_translates.getSorts_count_all_result;
	object.queryMysql(sql,callback);
};
exports.getAllTranslate =  function  (err,callback) {
	var sql =mysqlString.k_translates.getAllTranslate;
	object.queryMysql(sql,callback);
};
exports.getAll =  function  (changePer_page,per_page,callback) {
	var sql =mysqlString.k_translates.getAll(changePer_page,per_page);
	object.queryMysql(sql,callback);
};
exports.getTranslateById =  function  (translatesId,callback) {
	var sql =mysqlString.k_translates.getTranslatesById(translatesId);
	object.queryMysql(sql,callback);
};
exports.delTranslateById =  function  (translatesId,callback) {
	var sql =mysqlString.k_translates.postDelTranslateById(translatesId);
	object.queryMysql(sql,callback);
};
exports.addTranslateNew =  function  (date,content,title,country,author,url,introduction,year,yue,ri,img,tag,callback) {
	var sql =mysqlString.k_translates.postAddTranslateNew(date,content,title,country,author,url,introduction,year,yue,ri,img,tag);
	sql=sql.replace(/\\/g,'\\\\');
	object.queryMysql(sql,callback);
};
exports.toEditTranslate =  function  (translateId,date,content,title,country,author,url,introduction,year,yue,ri,img,tag,callback) {
	var sql =mysqlString.k_translates.postToEditTranslate(translateId,date,content,title,country,author,url,introduction,year,yue,ri,img,tag);
	sql=sql.replace(/\\/g,'\\\\');
	object.queryMysql(sql,callback);
};
exports.TranslatesById =  function  (translateIds, callback) {
	var sql =mysqlString.k_translates.getTranslatesById(translateIds);
	object.queryMysql(sql,callback);
};
exports.TranslatesByNext =  function  (translateIds,callback) {
	var sql =mysqlString.k_translates.getTranslatesByNext(translateIds);
	object.queryMysql(sql,callback);
};
exports.TranslatesByPrev =  function  (translateIds,callback) {
	var sql =mysqlString.k_translates.getTranslatesByPrev(translateIds);
	object.queryMysql(sql,callback);
};
exports.TranslatesById_count_all_result =  function  (translates_ids, callback) {
	var sql =mysqlString.k_translates.getTranslatesById_count_all_result(translates_ids);
	object.queryMysql(sql,callback);
};
