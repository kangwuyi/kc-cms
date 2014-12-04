var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./api/sql');
var  object = require('./api/object');
var app = express();

exports.PostGetDomainsite =  function  (err,callback) {
	var sql =mysqlString.k_domainsite.getDomainsite;
	object.queryMysql(sql,callback);
};
exports.PostGetDomainsuffix =  function  (err,callback) {
	var sql =mysqlString.k_domainsuffix.getDomainsuffix;
	object.queryMysql(sql,callback);
};
