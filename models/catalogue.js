var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./api/sql');
var  object = require('./api/object');
var app = express();

exports.PostCatalogue =  function  (err,callback) {
	var sql =mysqlString.k_navigation_k_nav_tag.getCatalogue;
	object.queryMysql(sql,callback);
};
exports.PostCatalogueTag =  function  (err,callback) {
	var sql =mysqlString.k_nav_tag.getCatalogueTag;
	object.queryMysql(sql,callback);
};
exports.addCatalogueType =  function  (catalogueTitle, callback) {
	var sql =mysqlString.k_nav_tag.postAddCatalogueType(catalogueTitle);
	object.queryMysql(sql,callback);
};
exports.addCatalogue =  function  (catalogueTitle,catalogueUrl,catalogueTypeId,callback) {
	var sql =mysqlString.k_navigation.postAddCatalogue(catalogueTitle,catalogueUrl,catalogueTypeId);
	object.queryMysql(sql,callback);
};
exports.delCatalogueById =  function  (navigation_ids,callback) {
	var sql =mysqlString.k_navigation.postDelCatalogueById(navigation_ids);
	object.queryMysql(sql,callback);
};
exports.getCatalogueById =  function  (navigation_ids, callback) {
	var sql =mysqlString.k_navigation_k_nav_tag.getCatalogueById(navigation_ids);
	object.queryMysql(sql,callback);
};
exports.toEditCatalogue =  function  (catalogueId,catalogueTitle,catalogueUrl,catalogueTypeId, callback) {
	var sql =mysqlString.k_navigation.postEditCatalogue(catalogueId,catalogueTitle,catalogueUrl,catalogueTypeId);
	object.queryMysql(sql,callback);
};
exports.appCatalogueType =  function  (nav_tag_ids, callback) {
	var sql =mysqlString.k_navigation_k_nav_tag.getAppCatalogueType(nav_tag_ids);
	object.queryMysql(sql,callback);
};
