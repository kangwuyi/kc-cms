var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');
mysql = queryDb.getMysqlConn();
var  mysqlString = require('./api/sql');
var  object = require('./api/object');
var app = express();

exports.NotesById =  function  (notesIds, callback) {
	var sql =mysqlString.k_note_tags_k_notes.getNotesById(notesIds);
	object.queryMysql(sql,callback);
};
exports.NotesByNext =  function  (noteIds,noteTagsIds,callback) {
	var sql =mysqlString.k_notes.getNotesByNext(noteIds,noteTagsIds);
	object.queryMysql(sql,callback);
};
exports.NotesByPrev =  function  (noteIds,noteTagsIds,callback) {
	var sql =mysqlString.k_notes.getNotesByPrev(noteIds,noteTagsIds);
	object.queryMysql(sql,callback);
};
exports.PageByNoteTagId =  function  (tags_ids,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_note_tags_k_notes.getPageByNoteTagId(tags_ids,changePer_page,per_page);
	object.queryMysql(sql,callback);
};
exports.PageByNoteData =  function  (riqi_dates,changePer_page,per_page, callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql = mysqlString.k_note_tags_k_notes_k_note_riqi.getPageByNoteData(riqi_dates,changePer_page,per_page);
	object.queryMysql(sql,callback);
};
exports.PostNotesTag =  function  (err, callback) {
	var sql =mysqlString.k_note_tags.PostNotesTag;
	object.queryMysql(sql,callback);
};
exports.checkNoteTag =  function  (tagName, callback) {
	var sql =mysqlString.k_note_tags.getCheckTag(tagName);
	object.queryMysql(sql,callback);
};
exports.AddNoteTagName =  function  (tagName, callback) {
	var sql =mysqlString.k_note_tags.postAddTagName(tagName);
	object.queryMysql(sql,callback);
};
exports.toAddNote =  function  (noteTitle, noteTagId,noteYear,noteYue,noteRi,noteDate,noteContent, callback) {
	var sql =mysqlString.k_notes.postAddNote(noteTitle, noteTagId,noteYear,noteYue,noteRi,noteDate,noteContent);
	object.queryMysql(sql,callback);
};
exports.dateBackNoteId =  function  (noteDate, callback) {
	var sql =mysqlString.k_notes.getDateBackNoteId(noteDate);
	object.queryMysql(sql,callback);
};
exports.toAddNoteRiqi =  function  (dateRiqi,noteId, callback) {
	var sql =mysqlString.k_note_riqi.postAddNoteRiqi(dateRiqi,noteId);
	object.queryMysql(sql,callback);
};
exports.toUpdateNoteRiqi =  function  (dateRiqi,noteId, callback) {
	var sql =mysqlString.k_note_riqi.postUpdateNoteRiqi(dateRiqi,noteId);
	object.queryMysql(sql,callback);
};
exports.delNoteById =  function  (notes_ids,callback) {
	var sql =mysqlString.k_notes.postDelNoteById(notes_ids);
	object.queryMysql(sql,callback);
};
exports.delNoteRiqiById =  function  (notes_ids,callback) {
	var sql =mysqlString.k_note_riqi.postDelNoteRiqiById(notes_ids);
	object.queryMysql(sql,callback);
};
exports.appNoteByData =  function  (riqi_dates, callback) {
	var sql = mysqlString.k_note_tags_k_notes_k_note_riqi.getAppNoteByData(riqi_dates);
	object.queryMysql(sql,callback);
};
exports.appNoteByTag =  function  (tags_ids,callback) {
	var sql = mysqlString.k_note_tags_k_notes.getAppNoteByTag(tags_ids);
	object.queryMysql(sql,callback);
};
exports.GetAllNote =  function  (err, callback) {
	var sql =mysqlString.k_note_tags_k_notes.getAllNote;
	object.queryMysql(sql,callback);
};
exports.toEditNote =  function  (noteId,noteTitle, noteTagId,noteYear,noteYue,noteRi,noteDate,noteContent, callback) {
	var sql =mysqlString.k_notes.postEditNote(noteId,noteTitle, noteTagId,noteYear,noteYue,noteRi,noteDate,noteContent);
	object.queryMysql(sql,callback);
};
exports.PostNoteTag =  function (err, callback) {
	var sql =mysqlString.k_note_tags_k_notes.getTags;
	object.queryMysql(sql,callback);
};
exports.PostNoteDate =  function (err, callback) {
	var sql =mysqlString.k_note_riqi.getAllRiqi;
	object.queryMysql(sql,callback);
};
exports.PostNoteSorts_count_all_result =  function  (err, callback) {
	var sql =mysqlString.k_notes.getSorts_count_all_result;
	object.queryMysql(sql,callback);
};
exports.NotesById_count_all_result =  function  (tags_ids, callback) {
	var sql =mysqlString.k_notes.getNotesById_count_all_result(tags_ids);
	object.queryMysql(sql,callback);
};
exports.NotesByData_count_all_result =  function  (riqi_dates, callback) {
	var sql =mysqlString.k_note_riqi.getNotesByData_count_all_result(riqi_dates);
	object.queryMysql(sql,callback);
};
exports.PostNoteGet_all =  function  (changePer_page,per_page,callback) {
	if(changePer_page==''){
		changePer_page=0;
	};
	var sql =mysqlString.k_note_tags_k_notes.getAll(changePer_page,per_page);
	object.queryMysql(sql,callback);
};