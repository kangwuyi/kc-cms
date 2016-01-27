var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./api/sql');
var  object = require('./api/object');
var app = express();

exports.loadIsNoteTag =  function  (err, callback) {
    var sql =mysqlString.k_isTag.loadIsNoteAllTag(err);//console.log(sql)
    object.queryMysql(sql,callback);
};
exports.loadIsNoteTag2 =  function  (err, callback) {
    var sql =mysqlString.k_isTag.loadIsNoteAllTag2(err);//console.log(sql)
    object.queryMysql(sql,callback);
};
exports.getIsNoteTag =  function  (isIf, publicUserId, callback) {
    var sql =mysqlString.k_isTag.getIsNoteAllTag(isIf, publicUserId);//console.log(sql)
    object.queryMysql(sql,callback);
};
exports.getIsNoteTag2 =  function  (isIf, publicUserId, callback) {
    var sql =mysqlString.k_isTag.getIsNoteAllTag2(isIf, publicUserId);//console.log(sql)
    object.queryMysql(sql,callback);
};
exports.PostSorts_count_all_result =  function  (isIf, publicUserId,isTag_id,isTag2_id, callback) {
    var sql =mysqlString.k_isNote.getSorts_count_all_result(isIf, publicUserId,isTag_id,isTag2_id);//console.log(sql)
    object.queryMysql(sql,callback);
};
exports.PostGet_all =  function  (isIf, publicUserId,isTag_id,isTag2_id, changePer_page,per_page,callback) {
    if(changePer_page==''){
        changePer_page=0;
    };
    var sql =mysqlString.isTag_isNote.getAll(isIf, publicUserId, isTag_id,isTag2_id,changePer_page,per_page);//console.log(sql)
    object.queryMysql(sql,callback);
};
exports.PostDate =  function (isIf, publicUserId, callback) {
    var sql =mysqlString.k_isDate.getAllDate(isIf, publicUserId);
    object.queryMysql(sql,callback);
};
exports.PostTag =  function (isIf, publicUserId, callback) {
    var sql =mysqlString.isTag_isNote.getTags(isIf, publicUserId);console.log(sql)
    object.queryMysql(sql,callback);
};
exports.BlogsById_count_all_result =  function  (isIf, publicUserId, isTag_id, callback) {
    var sql =mysqlString.k_isNote.getAllById_count_all_result(isIf, publicUserId, isTag_id);
    object.queryMysql(sql,callback);
};
exports.PageByTagId =  function  (isIf, publicUserId, tags_ids,changePer_page,per_page, callback) {
    if(changePer_page==''){
        changePer_page=0;
    };
    var sql = mysqlString.isTag_isNote.getPageByTagId(isIf, publicUserId, tags_ids,changePer_page,per_page);
    object.queryMysql(sql,callback);
};
exports.BlogsById =  function  (isIf, publicUserId, blogs_ids, callback) {
    var sql =mysqlString.isTag_isNote.getBlogsById(isIf, publicUserId, blogs_ids);//console.log(sql)
    object.queryMysql(sql,callback);
};
exports.BlogsByNext =  function  (isIf, publicUserId, blogs_ids, tags_ids,tags2_ids, callback) {
    var sql =mysqlString.k_isNote.getBlogsByNext(isIf, publicUserId, blogs_ids, tags_ids,tags2_ids);console.log(sql)
    object.queryMysql(sql,callback);
};
exports.BlogsByPrev =  function  (isIf, publicUserId, blogs_ids,tags_ids,tags2_ids,callback) {
    var sql =mysqlString.k_isNote.getBlogsByPrev(isIf, publicUserId, blogs_ids,tags_ids,tags2_ids);
    object.queryMysql(sql,callback);
};
exports.BlogsByData_count_all_result =  function  (isIf, publicUserId, riqi_dates, callback) {
    var sql =mysqlString.k_isDate.getAllById_count_all_result(isIf, publicUserId, riqi_dates);
    object.queryMysql(sql,callback);
};
exports.PageByData =  function  (isIf, publicUserId, riqi_dates,changePer_page,per_page, callback) {
    if(changePer_page==''){
        changePer_page=0;
    };
    var sql = mysqlString.isTag_isNote_isDate.getPageByData(isIf, publicUserId, riqi_dates,changePer_page,per_page);
    object.queryMysql(sql,callback);
};
exports.PostTagAll =  function (isIf, publicUserId, callback) {
    var sql =mysqlString.k_isTag.PostTag(isIf, publicUserId);
    object.queryMysql(sql,callback);
};
exports.checkTag =  function  (isIf, publicUserId, tagName, callback) {
    var sql =mysqlString.k_isTag.getCheckTag(isIf, publicUserId, tagName);
    object.queryMysql(sql,callback);
};
exports.AddTagName =  function  (isIf, publicUserId, tagName, callback) {
    var sql =mysqlString.k_isTag.postAddTagName(isIf, publicUserId, tagName);
    object.queryMysql(sql,callback);
};
exports.checkTag2 =  function  (tagId1,isIf, publicUserId, tagName, callback) {
    var sql =mysqlString.k_isTag.getCheckTag2(tagId1,isIf, publicUserId, tagName);
    object.queryMysql(sql,callback);
};
exports.AddTagName2 =  function  (tagId1, isIf, publicUserId, tagName, callback) {
    var sql =mysqlString.k_isTag.postAddTagName2(tagId1,isIf, publicUserId, tagName);console.log(sql)
    object.queryMysql(sql,callback);
};
exports.toAddBlog =  function  (blogTitle, blogTagId,blogTagId2,blogDate,blogContent,isIf, publicUserId, callback) {
    var sql =mysqlString.k_isNote.postAddBlog(isIf, publicUserId, blogTitle, blogTagId,blogTagId2,blogDate,blogContent);//console.log(sql)
    sql=sql.replace(/\\/g,'\\\\');
    object.queryMysql(sql,callback);
};
exports.dateBackBlogId =  function  ( blogDate, isIf, publicUserId,callback) {
    var sql =mysqlString.k_isNote.getDateBackBlogId(isIf, publicUserId, blogDate);
    object.queryMysql(sql,callback);
};
exports.toAddRiqi =  function  ( dateRiqi,blogId,isIf, publicUserId, callback) {
    var sql =mysqlString.k_isDate.postAddRiqi(isIf, publicUserId, dateRiqi,blogId);
    object.queryMysql(sql,callback);
};
exports.GetAllBlog =  function  (isIf, publicUserId, callback) {
    var sql =mysqlString.isTag_isNote.getAllBlog(isIf, publicUserId);
    object.queryMysql(sql,callback);
};
exports.toEditBlog =  function  (isIf, publicUserId, blogId,blogTitle, blogTagId,blogTagId2,blogDate,blogContent, callback) {
    var sql =mysqlString.k_isNote.postEditBlog(isIf, publicUserId, blogId,blogTitle, blogTagId,blogTagId2,blogDate,blogContent);
    sql=sql.replace(/\\/g,'\\\\');
    object.queryMysql(sql,callback);
};
exports.toUpdateRiqi =  function  (isIf, publicUserId, dateRiqi,blogId, callback) {
    var sql =mysqlString.k_isDate.postUpdateRiqi(isIf, publicUserId, dateRiqi,blogId);console.log(sql);
    object.queryMysql(sql,callback);
};
exports.delBlogById =  function  (isIf, publicUserId, blogs_ids,callback) {
    var sql =mysqlString.k_isNote.postDelBlogById(isIf, publicUserId, blogs_ids);
    object.queryMysql(sql,callback);
};
exports.delBlogRiqiById =  function  (isIf, publicUserId, blogs_ids,callback) {
    var sql =mysqlString.k_isDate.postDelBlogRiqiById(isIf, publicUserId, blogs_ids);
    object.queryMysql(sql,callback);
};
/*
exports.appBlogByData =  function  (isIf,riqi_dates, callback) {
	var sql = mysqlString.k_tags_k_blogs_k_riqi.getAppBlogByData(isIf, publicUserId, riqi_dates);
	object.queryMysql(sql,callback);
};
exports.appBlogByTag =  function  (isIf, publicUserId, tags_ids,callback) {
	var sql = mysqlString.k_tags_k_blogs.getAppBlogByTag(isIf, publicUserId, tags_ids);
	object.queryMysql(sql,callback);
};






*/
