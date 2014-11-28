var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./sql');
<<<<<<< HEAD
var  object = require('./object');
=======
>>>>>>> origin/master
var app = express();


exports.BlogsById =  function  (blogs_ids, callback) {
	var sql =mysqlString.k_tags_k_blogs.getBlogsById(blogs_ids);
<<<<<<< HEAD
	object.queryMysql(sql,callback);
};
exports.NotesById =  function  (notesIds, callback) {
	var sql =mysqlString.k_note_tags_k_notes.getNotesById(notesIds);
	object.queryMysql(sql,callback);
};
exports.FeelsById =  function  (feelIds, callback) {
	var sql =mysqlString.k_feel_tags_k_feels.getFeelsById(feelIds);
	object.queryMysql(sql,callback);
};
//
exports.BlogsByNext =  function  (blogs_ids,tags_ids,callback) {
	var sql =mysqlString.k_blogs.getBlogsByNext(blogs_ids,tags_ids);
	object.queryMysql(sql,callback);
};
exports.NotesByNext =  function  (noteIds,noteTagsIds,callback) {
	var sql =mysqlString.k_notes.getNotesByNext(noteIds,noteTagsIds);
	object.queryMysql(sql,callback);
};
exports.FeelsByNext =  function  (feelIds,feelTagsIds,callback) {
	var sql =mysqlString.k_feels.getFeelsByNext(feelIds,feelTagsIds);
	object.queryMysql(sql,callback);
};
//
exports.BlogsByPrev =  function  (blogs_ids,tags_ids,callback) {
	var sql =mysqlString.k_blogs.getBlogsByPrev(blogs_ids,tags_ids);
	object.queryMysql(sql,callback);
};
exports.NotesByPrev =  function  (noteIds,noteTagsIds,callback) {
	var sql =mysqlString.k_notes.getNotesByPrev(noteIds,noteTagsIds);
	object.queryMysql(sql,callback);
};
exports.FeelsByPrev =  function  (feelIds,feelTagsIds,callback) {
	var sql =mysqlString.k_feels.getFeelsByPrev(feelIds,feelTagsIds);
	object.queryMysql(sql,callback);
};
//
=======
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.BlogsByNext =  function  (blogs_ids,tags_ids,callback) {
	var sql =mysqlString.k_blogs.getBlogsByNext(blogs_ids,tags_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
exports.BlogsByPrev =  function  (blogs_ids,tags_ids,callback) {
	var sql =mysqlString.k_blogs.getBlogsByPrev(blogs_ids,tags_ids);
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
>>>>>>> origin/master
exports.PageByTagId =  function  (tags_ids,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_tags_k_blogs.getPageByTagId(tags_ids,changePer_page,per_page);
<<<<<<< HEAD
	object.queryMysql(sql,callback);
}
exports.PageByNoteTagId =  function  (tags_ids,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_note_tags_k_notes.getPageByNoteTagId(tags_ids,changePer_page,per_page);
	object.queryMysql(sql,callback);
}
exports.PageByFeelTagId =  function  (tags_ids,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_feel_tags_k_feels.getPageByFeelTagId(tags_ids,changePer_page,per_page);
	object.queryMysql(sql,callback);
}
//
=======
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
}
>>>>>>> origin/master
exports.PageByData =  function  (riqi_dates,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_tags_k_blogs_k_riqi.getPageByData(riqi_dates,changePer_page,per_page);
<<<<<<< HEAD
	object.queryMysql(sql,callback);
}
exports.PageByNoteData =  function  (riqi_dates,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_note_tags_k_notes_k_note_riqi.getPageByNoteData(riqi_dates,changePer_page,per_page);
	object.queryMysql(sql,callback);
}
exports.PageByFeelData =  function  (riqi_dates,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_feel_tags_k_feels_k_feel_riqi.getPageByFeelData(riqi_dates,changePer_page,per_page);
	object.queryMysql(sql,callback);
=======
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
>>>>>>> origin/master
}

