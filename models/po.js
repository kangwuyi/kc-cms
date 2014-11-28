var express = require('express')
,mysql = require('mysql')
,http = require('http');
<<<<<<< HEAD
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./sql');
var  object = require('./object');
var app = express();

exports.PostNotesTag =  function  (err, callback) {
	var sql =mysqlString.k_note_tags.PostNotesTag;
	object.queryMysql(sql,callback);
};
exports.PostFeelsTag =  function  (err, callback) {
	var sql =mysqlString.k_feel_tags.PostFeelsTag;
	object.queryMysql(sql,callback);
};
exports.checkTag =  function  (tagName, callback) {
	var sql =mysqlString.k_tags.getCheckTag(tagName);
	object.queryMysql(sql,callback);
};
exports.checkNoteTag =  function  (tagName, callback) {
	var sql =mysqlString.k_note_tags.getCheckTag(tagName);
	object.queryMysql(sql,callback);
};
exports.checkFeelTag =  function  (tagName, callback) {
	var sql =mysqlString.k_feel_tags.getCheckTag(tagName);
	object.queryMysql(sql,callback);
};
//
exports.AddTagName =  function  (tagName, callback) {
	var sql =mysqlString.k_tags.postAddTagName(tagName);
	object.queryMysql(sql,callback);
};
exports.AddNoteTagName =  function  (tagName, callback) {
	var sql =mysqlString.k_note_tags.postAddTagName(tagName);
	object.queryMysql(sql,callback);
};
exports.AddFeelTagName =  function  (tagName, callback) {
	var sql =mysqlString.k_feel_tags.postAddTagName(tagName);
	object.queryMysql(sql,callback);
};
//
exports.toAddBlog =  function  (blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent, callback) {
	var sql =mysqlString.k_blogs.postAddBlog(blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent);
	object.queryMysql(sql,callback);
};
exports.toAddNote =  function  (noteTitle, noteTagId,noteYear,noteYue,noteRi,noteDate,noteContent, callback) {
	var sql =mysqlString.k_notes.postAddNote(noteTitle, noteTagId,noteYear,noteYue,noteRi,noteDate,noteContent);
	object.queryMysql(sql,callback);
};
exports.toAddFeel =  function  (feelTitle, feelTagId,feelYear,feelYue,feelRi,feelDate,feelContent, callback) {
	var sql =mysqlString.k_feels.postAddFeel(feelTitle, feelTagId,feelYear,feelYue,feelRi,feelDate,feelContent);
	object.queryMysql(sql,callback);
};
//
exports.dateBackBlogId =  function  (blogDate, callback) {
	var sql =mysqlString.k_blogs.getDateBackBlogId(blogDate);
	object.queryMysql(sql,callback);
};
exports.dateBackNoteId =  function  (noteDate, callback) {
	var sql =mysqlString.k_notes.getDateBackNoteId(noteDate);
	object.queryMysql(sql,callback);
};
exports.dateBackFeelId =  function  (feelDate, callback) {
	var sql =mysqlString.k_feels.getDateBackFeelId(feelDate);
	object.queryMysql(sql,callback);
};
//
exports.toAddRiqi =  function  (dateRiqi,blogId, callback) {
	var sql =mysqlString.k_riqi.postAddRiqi(dateRiqi,blogId);
	object.queryMysql(sql,callback);
};
exports.toAddNoteRiqi =  function  (dateRiqi,noteId, callback) {
	var sql =mysqlString.k_note_riqi.postAddNoteRiqi(dateRiqi,noteId);
	object.queryMysql(sql,callback);
};
exports.toAddFeelRiqi =  function  (dateRiqi,feelId, callback) {
	var sql =mysqlString.k_feel_riqi.postAddFeelRiqi(dateRiqi,feelId);
	object.queryMysql(sql,callback);
};
//
exports.delBlogById =  function  (blogs_ids,callback) {
	var sql =mysqlString.k_blogs.postDelBlogById(blogs_ids);
	object.queryMysql(sql,callback);
};
exports.delNoteById =  function  (notes_ids,callback) {
	var sql =mysqlString.k_notes.postDelNoteById(notes_ids);
	object.queryMysql(sql,callback);
};
exports.delFeelById =  function  (feels_ids,callback) {
	var sql =mysqlString.k_feels.postDelFeelById(feels_ids);
	object.queryMysql(sql,callback);
};
//
exports.delBlogRiqiById =  function  (blogs_ids,callback) {
	var sql =mysqlString.k_riqi.postDelBlogRiqiById(blogs_ids);
	object.queryMysql(sql,callback);
};
exports.delNoteRiqiById =  function  (notes_ids,callback) {
	var sql =mysqlString.k_note_riqi.postDelNoteRiqiById(notes_ids);
	object.queryMysql(sql,callback);
};
exports.delFeelRiqiById =  function  (feels_ids,callback) {
	var sql =mysqlString.k_feel_riqi.postDelFeelRiqiById(feels_ids);
	object.queryMysql(sql,callback);
};
//
exports.appBlogByData =  function  (riqi_dates, callback) {
	var sql = mysqlString.k_tags_k_blogs_k_riqi.getAppBlogByData(riqi_dates);
	object.queryMysql(sql,callback);
};
exports.appNoteByData =  function  (riqi_dates, callback) {
	var sql = mysqlString.k_note_tags_k_notes_k_note_riqi.getAppNoteByData(riqi_dates);
	object.queryMysql(sql,callback);
};
exports.appFeelByData =  function  (riqi_dates, callback) {
	var sql = mysqlString.k_feel_tags_k_feels_k_feel_riqi.getAppFeelByData(riqi_dates);
	object.queryMysql(sql,callback);
};
//
exports.appBlogByTag =  function  (tags_ids,callback) {
	var sql = mysqlString.k_tags_k_blogs.getAppBlogByTag(tags_ids);
	object.queryMysql(sql,callback);
};
exports.appNoteByTag =  function  (tags_ids,callback) {
	var sql = mysqlString.k_note_tags_k_notes.getAppNoteByTag(tags_ids);
	object.queryMysql(sql,callback);
};
exports.appFeelByTag =  function  (tags_ids,callback) {
	var sql = mysqlString.k_feel_tags_k_feels.getAppFeelByTag(tags_ids);
	object.queryMysql(sql,callback);
};
//
exports.GetAllBlog =  function  (err, callback) {
	var sql =mysqlString.k_tags_k_blogs.getAllBlog;
	object.queryMysql(sql,callback);
};
exports.GetAllNote =  function  (err, callback) {
	var sql =mysqlString.k_note_tags_k_notes.getAllNote;
	object.queryMysql(sql,callback);
};
exports.GetAllFeel =  function  (err, callback) {
	var sql =mysqlString.k_feel_tags_k_feels.getAllFeel;
	object.queryMysql(sql,callback);
};
//
exports.toEditBlog =  function  (blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent, callback) {
	var sql =mysqlString.k_blogs.postEditBlog(blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent);
	object.queryMysql(sql,callback);
};
exports.toEditNote =  function  (noteId,noteTitle, noteTagId,noteYear,noteYue,noteRi,noteDate,noteContent, callback) {
	var sql =mysqlString.k_notes.postEditNote(noteId,noteTitle, noteTagId,noteYear,noteYue,noteRi,noteDate,noteContent);
	object.queryMysql(sql,callback);
};
exports.toEditFeel =  function  (feelId,feelTitle, feelTagId,feelYear,feelYue,feelRi,feelDate,feelContent, callback) {
	var sql =mysqlString.k_feels.postEditFeel(feelId,feelTitle, feelTagId,feelYear,feelYue,feelRi,feelDate,feelContent);
	object.queryMysql(sql,callback);
};
//
exports.addProse =  function  (proseTitle,proseDate,proseContent, callback) {
	var sql =mysqlString.k_prose.postAddProse(proseTitle,proseDate,proseContent);
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
exports.addDomainNew =  function  (DomainNewTitle,DomainNewContent,callback) {
	var sql =mysqlString.k_domainnew.postAddDomainNew(DomainNewTitle,DomainNewContent);
	object.queryMysql(sql,callback);
};
exports.delProseById =  function  (prose_ids,callback) {
	var sql =mysqlString.k_prose.postDelProseById(prose_ids);
	object.queryMysql(sql,callback);
};
exports.delCatalogueById =  function  (navigation_ids,callback) {
	var sql =mysqlString.k_navigation.postDelCatalogueById(navigation_ids);
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
=======
var  queryDb = require('../db');		//加载db.js模块
mysql = queryDb.getMysqlConn();//加载db.js的getMysqlConn方法关联mysql数据库，并命名为mysql
var  mysqlString = require('./sql');
var app = express();

exports.checkTag =  function  (tagName, callback) {
	var sql =mysqlString.k_tags.getCheckTag(tagName);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.AddTagName =  function  (tagName, callback) {
	var sql =mysqlString.k_tags.postAddTagName(tagName);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.toAddBlog =  function  (blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent, callback) {
	var sql =mysqlString.k_blogs.postAddBlog(blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.dateBackBlogId =  function  (blogDate, callback) {
	var sql =mysqlString.k_blogs.getDateBackBlogId(blogDate);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.toAddRiqi =  function  (dateRiqi,blogId, callback) {
	var sql =mysqlString.k_riqi.postAddRiqi(dateRiqi,blogId);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.addProse =  function  (proseTitle,proseDate,proseContent, callback) {
	var sql =mysqlString.k_prose.postAddProse(proseTitle,proseDate,proseContent);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.addCatalogueType =  function  (catalogueTitle, callback) {
	var sql =mysqlString.k_nav_tag.postAddCatalogueType(catalogueTitle);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.addCatalogue =  function  (catalogueTitle,catalogueUrl,catalogueTypeId,callback) {
	var sql =mysqlString.k_navigation.postAddCatalogue(catalogueTitle,catalogueUrl,catalogueTypeId);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.addDomainNew =  function  (DomainNewTitle,DomainNewContent,callback) {
	var sql =mysqlString.k_domainnew.postAddDomainNew(DomainNewTitle,DomainNewContent);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.delBlogById =  function  (blogs_ids,callback) {
	var sql =mysqlString.k_blogs.postDelBlogById(blogs_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.delBlogRiqiById =  function  (blogs_ids,callback) {
	var sql =mysqlString.k_riqi.postDelBlogRiqiById(blogs_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.delProseById =  function  (prose_ids,callback) {
	var sql =mysqlString.k_prose.postDelProseById(prose_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.delCatalogueById =  function  (navigation_ids,callback) {
	var sql =mysqlString.k_navigation.postDelCatalogueById(navigation_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.GetAllBlog =  function  (err, callback) {
	var sql =mysqlString.k_tags_k_blogs.getAllBlog;
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.toEditBlog =  function  (blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent, callback) {
	var sql =mysqlString.k_blogs.postEditBlog(blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.getProseById =  function  (prose_ids, callback) {
	var sql =mysqlString.k_prose.getProseById(prose_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.toEditProse =  function  (proseId,proseTitle,proseDate,proseContent, callback) {
	var sql =mysqlString.k_prose.postEditProse(proseId,proseTitle,proseDate,proseContent);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.getCatalogueById =  function  (navigation_ids, callback) {
	var sql =mysqlString.k_navigation_k_nav_tag.getCatalogueById(navigation_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.toEditCatalogue =  function  (catalogueId,catalogueTitle,catalogueUrl,catalogueTypeId, callback) {
	var sql =mysqlString.k_navigation.postEditCatalogue(catalogueId,catalogueTitle,catalogueUrl,catalogueTypeId);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.appBlogByData =  function  (riqi_dates, callback) {
	var sql = mysqlString.k_tags_k_blogs_k_riqi.getAppBlogByData(riqi_dates);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
}
exports.appBlogByTag =  function  (tags_ids,callback) {
	var sql = mysqlString.k_tags_k_blogs.getAppBlogByTag(tags_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
}
exports.appCatalogueType =  function  (nav_tag_ids, callback) {
	var sql =mysqlString.k_navigation_k_nav_tag.getAppCatalogueType(nav_tag_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
>>>>>>> origin/master
};