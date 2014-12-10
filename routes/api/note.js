var kcool = require('../../public/lib/kcool');
var Blog = require('../../models/blog');
var Note = require('../../models/note');
var feel = require('../../models/feel');
var User = require('../../models/user');
var object = require('../../models/api/object');
var pagination = require('pagination-api');
var myDate = require('../dateFormat')();

exports.allNote = function (req, res) {
	Note.PostNoteSorts_count_all_result( null,function (PostNoteSorts_count_all_resultErr, PostNoteSorts_count_all_result) {
		if (PostNoteSorts_count_all_resultErr) {
			count_all_result = 1;
		};
		count_all_result = PostNoteSorts_count_all_result[0].count_all_result;
		var per_pages = 1;
		if(req.query.per_page){
			per_pages = req.query.per_page;
		};
		if(req.body.per_page){
			per_pages = req.body.per_page;
		}
		var total_rows,per_page,base_url ;
		total_rows = count_all_result ;
		per_page = 6;
		base_url = 'note?';
		var changePer_page = ( per_pages - 1 ) * per_page;
		Note.PostNoteGet_all(changePer_page,per_page,function (PostNoteGet_allErr, PostNoteGet_all) {
			if (PostNoteGet_allErr) {
				PostNoteGet_all = [];
			};
			var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
			Note.PostNoteDate( null,function (PostNoteDateErr, PostNoteDate) {
				if (PostNoteDateErr) {
					PostNoteDate = [];
				};
				Note.PostNoteTag( null,function (PostNoteTagErr, PostNoteTag) {
					res.render('client/in/note', { title: '十页书｜便签',PostNoteTag: PostNoteTag,PostNoteGet_all: PostNoteGet_all,PostNoteDate: PostNoteDate,Create_links:Create_links});
				});
			});
		});
	});
}
exports.PostNotesTag = function (req, res) {
	Note.PostNotesTag( null,function (err, PostNotesTag) {
		res.render('client/po/add/notes', { title: '主页',PostNotesTag: PostNotesTag});
	});
}
exports.poAddNoteType = function (req, res) {
	res.render('client/po/add/noteType', { title: '主页'});
}
exports.poReviseNotes = function (req, res) {
	Note.GetAllNote(null,function (GetAllNoteErr, GetAllNote) {
			if (GetAllNoteErr) {
				GetAllNote = [];
			};//console.log(PostGet_all);
			res.render('client/po/revise/reviseNote', { title: '主页',GetAllNote: GetAllNote});
	});
}
exports.editNoteById = function (req, res) {
	var notes_ids = req.query.notes_ids;
	Note.NotesById( notes_ids,function (NotesByIdErr, NotesById) {
		if (NotesByIdErr) {
			NotesById = [];
		};
		Note.PostNotesTag( null,function (err, PostNotesTag) {
			res.render('client/po/revise/edit/editNotes', { title: '主页',NotesById: NotesById,PostNotesTag: PostNotesTag});
		});
	});
}
exports.toEditNote = function (req, res) {
	var noteId = req.body.noteId ? kcool.trim(req.body.noteId):1;
	var noteTitle = req.body.noteTitle ? kcool.trim(req.body.noteTitle):1;
	var noteTagId = req.body.noteTagId ? kcool.trim(req.body.noteTagId):1;
	var noteYear = req.body.noteYear ? kcool.trim(req.body.noteYear):1;
	var noteYue = req.body.noteYue ? kcool.trim(req.body.noteYue):1;
	var noteRi = req.body.noteRi ? kcool.trim(req.body.noteRi):1;
	var noteDate = new Date().format("yyyy-MM-dd hh:mm:ss");
	var noteContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
	Note.toEditNote(noteId,noteTitle, noteTagId,noteYear,noteYue,noteRi,noteDate,noteContent,function (err, toEditNote) {
		var dateRiqi = noteYue+'.'+noteYear;
		Note.toUpdateNoteRiqi(dateRiqi,noteId,function (err, toUpdateNoteRiqi) {
			req.flash('success', '添加"'+noteTitle+'"文章成功!');
			return res.redirect('back');
		});
	});
}
exports.poDeleteNotes = function (req, res) {
	Note.GetAllNote(null,function (GetAllNoteErr, GetAllNote) {
			if (GetAllNoteErr) {
				GetAllNote = [];
			};//console.log(PostGet_all);
			res.render('client/po/delete/deleteNote', { title: '主页',GetAllNote: GetAllNote});
	});
}
exports.delNoteById = function (req, res) {
	var notes_ids = req.query.notes_ids;
	Note.delNoteById(notes_ids,function (err, delNoteById) {
		Note.delNoteRiqiById(notes_ids,function (err, delNoteRiqiById) {
			return res.redirect('back');
		});
	});
}
exports.toAddNoteType = function (req, res) {
	var tagName = req.body.tagName ? kcool.trim(req.body.tagName):1;
	//检查标签是否存在
	Note.checkNoteTag(tagName, function (err, checkNoteTag) {
		if (checkNoteTag.length<1) {
			Note.AddNoteTagName(tagName, function (err, AddNoteTagName) {
				req.flash('success', '添加"'+tagName+'"标签成功!');
				return res.redirect('back');
			});
		}else{
			req.flash('error', '"'+tagName+'"标签已存在!');
			return res.redirect('back');
		}
	});
}
exports.toAddNote = function (req, res) {
	var noteTitle = req.body.noteTitle ? kcool.trim(req.body.noteTitle):1;
	var noteTagId = req.body.noteTagId ? kcool.trim(req.body.noteTagId):1;
	var noteYear = req.body.noteYear ? kcool.trim(req.body.noteYear):1;
	var noteYue = req.body.noteYue ? kcool.trim(req.body.noteYue):1;
	var noteRi = req.body.noteRi ? kcool.trim(req.body.noteRi):1;
	var noteDate = new Date().format("yyyy-MM-dd hh:mm:ss");
	var noteContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
	Note.toAddNote(noteTitle, noteTagId,noteYear,noteYue,noteRi,noteDate,noteContent,function (err, toAddNote) {
		Note.dateBackNoteId(noteDate,function (err, dateBackNoteId) {
			var noteId = dateBackNoteId[0].kt_notes_ids;
			var dateRiqi = noteYue+'.'+noteYear;
			Note.toAddNoteRiqi(dateRiqi,noteId,function (err, toAddNoteRiqi) {
				req.flash('success', '添加"'+noteTitle+'"文章成功!');
				return res.redirect('back');
			});
		});
	});
}
exports.notesByMenu = function (req, res) {
	var tags_ids = kcool.trim(req.query.tags_ids);//console.log(feels_ids);
	Note.NotesById_count_all_result( tags_ids,function (NotesById_count_all_resultErr, NotesById_count_all_result) {
		if (NotesById_count_all_resultErr) {
			count_all_result = 1;
		};
		count_all_result = NotesById_count_all_result[0].count_all_result;	//count_all_result是所有博客的总数量
		var per_pages = 1;
		if(req.query.per_page){
			per_pages = req.query.per_page;//console.log("get");
		};
		if(req.body.per_page){
			per_pages = req.body.per_page;//console.log("post");
		}//console.log("per_pages");console.log(per_pages);
		var total_rows,per_page,base_url ;
		total_rows = count_all_result ;
		per_page = 10;
		base_url = 'notesByMenu?tags_ids='+tags_ids+'&';
		var changePer_page = ( per_pages - 1 ) * per_page;//console.log(changePer_page);
		Note.PageByNoteTagId(tags_ids,changePer_page,per_page,function (PageByNoteTagIdErr, PageByNoteTagId) {
			if (PageByNoteTagIdErr) {
				PageByNoteTagId = [];
			};//console.log(PageByNoteTagId);
			var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
			Note.PostNoteTag( null,function (PostNoteTagErr, PostNoteTag) {
				res.render('client/in/note', { title: '主页',PostNoteGet_all: PageByNoteTagId,PostNoteTag: PostNoteTag,Create_links:Create_links});
			});
		});
	});
}