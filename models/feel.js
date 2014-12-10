var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./api/sql');
var  object = require('./api/object');
var app = express();

exports.FeelsById =  function  (feelIds, callback) {
	var sql =mysqlString.k_feel_tags_k_feels.getFeelsById(feelIds);
	object.queryMysql(sql,callback);
};
exports.FeelsByNext =  function  (feelIds,feelTagsIds,callback) {
	var sql =mysqlString.k_feels.getFeelsByNext(feelIds,feelTagsIds);
	object.queryMysql(sql,callback);
};
exports.FeelsByPrev =  function  (feelIds,feelTagsIds,callback) {
	var sql =mysqlString.k_feels.getFeelsByPrev(feelIds,feelTagsIds);
	object.queryMysql(sql,callback);
};
exports.PageByFeelTagId =  function  (tags_ids,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_feel_tags_k_feels.getPageByFeelTagId(tags_ids,changePer_page,per_page);
	object.queryMysql(sql,callback);
};
exports.PageByFeelData =  function  (riqi_dates,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_feel_tags_k_feels_k_feel_riqi.getPageByData(riqi_dates,changePer_page,per_page);
	object.queryMysql(sql,callback);
};
exports.PostFeelsTag =  function  (err, callback) {
	var sql =mysqlString.k_feel_tags.PostFeelsTag;
	object.queryMysql(sql,callback);
};
exports.checkFeelTag =  function  (tagName, callback) {
	var sql =mysqlString.k_feel_tags.getCheckTag(tagName);
	object.queryMysql(sql,callback);
};
exports.AddFeelTagName =  function  (tagName, callback) {
	var sql =mysqlString.k_feel_tags.postAddTagName(tagName);
	object.queryMysql(sql,callback);
};
exports.toAddFeel =  function  (feelTitle, feelTagId,feelYear,feelYue,feelRi,feelDate,feelContent, callback) {
	var sql =mysqlString.k_feels.postAddFeel(feelTitle, feelTagId,feelYear,feelYue,feelRi,feelDate,feelContent);
	object.queryMysql(sql,callback);
};
exports.dateBackFeelId =  function  (feelDate, callback) {
	var sql =mysqlString.k_feels.getDateBackFeelId(feelDate);
	object.queryMysql(sql,callback);
};
exports.toAddFeelRiqi =  function  (dateRiqi,feelId, callback) {
	var sql =mysqlString.k_feel_riqi.postAddFeelRiqi(dateRiqi,feelId);
	object.queryMysql(sql,callback);
};
exports.toUpdateFeelRiqi =  function  (dateRiqi,feelId, callback) {
	var sql =mysqlString.k_feel_riqi.postUpdateFeelRiqi(dateRiqi,feelId);
	object.queryMysql(sql,callback);
};
exports.delFeelById =  function  (feels_ids,callback) {
	var sql =mysqlString.k_feels.postDelFeelById(feels_ids);
	object.queryMysql(sql,callback);
};
exports.delFeelRiqiById =  function  (feels_ids,callback) {
	var sql =mysqlString.k_feel_riqi.postDelFeelRiqiById(feels_ids);
	object.queryMysql(sql,callback);
};
exports.appFeelByData =  function  (riqi_dates, callback) {
	var sql = mysqlString.k_feel_tags_k_feels_k_feel_riqi.getAppFeelByData(riqi_dates);
	object.queryMysql(sql,callback);
};
exports.appFeelByTag =  function  (tags_ids,callback) {
	var sql = mysqlString.k_feel_tags_k_feels.getAppFeelByTag(tags_ids);
	object.queryMysql(sql,callback);
};
exports.GetAllFeel =  function  (err, callback) {
	var sql =mysqlString.k_feel_tags_k_feels.getAllFeel;
	object.queryMysql(sql,callback);
};
exports.toEditFeel =  function  (feelId,feelTitle, feelTagId,feelYear,feelYue,feelRi,feelDate,feelContent, callback) {
	var sql =mysqlString.k_feels.postEditFeel(feelId,feelTitle, feelTagId,feelYear,feelYue,feelRi,feelDate,feelContent);
	object.queryMysql(sql,callback);
};
exports.PostFeelTag =  function (err, callback) {
	var sql =mysqlString.k_feel_tags_k_feels.getTags;
	object.queryMysql(sql,callback);
};
exports.PostFeelDate =  function (err, callback) {
	var sql =mysqlString.k_feel_riqi.getAllRiqi;
	object.queryMysql(sql,callback);
};
exports.PostFeelSorts_count_all_result =  function  (err, callback) {
	var sql =mysqlString.k_feels.getSorts_count_all_result;
	object.queryMysql(sql,callback);
};
exports.FeelsById_count_all_result =  function  (feels_ids, callback) {
	var sql =mysqlString.k_feels.getFeelsById_count_all_result(feels_ids);
	object.queryMysql(sql,callback);
};
exports.FeelsByData_count_all_result =  function  (riqi_dates, callback) {
	var sql =mysqlString.k_feel_riqi.getFeelsByData_count_all_result(riqi_dates);
	object.queryMysql(sql,callback);
};
exports.PostFeelGet_all =  function  (changePer_page,per_page,callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql =mysqlString.k_feel_tags_k_feels.getAll(changePer_page,per_page);
	object.queryMysql(sql,callback);
};