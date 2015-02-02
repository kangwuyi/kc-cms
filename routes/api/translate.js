var kcool = require('../../public/lib/kcool');
var Blog = require('../../models/blog');
var Translate = require('../../models/note');
var Translate = require('../../models/feel');
var Translate = require('../../models/translate');
var User = require('../../models/user');
var object = require('../../models/api/object');
var pagination = require('pagination-api');
var myDate = require('../dateFormat')();

exports.allTranslate = function (req, res) {
	Translate.getSorts_count_all_result( null,function (getSorts_count_all_resultErr, getSorts_count_all_result) {
		if (getSorts_count_all_resultErr) {
			count_all_result = 1;
		};
		count_all_result = getSorts_count_all_result[0].count_all_result;
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
		base_url = 'translate?';
		var changePer_page = ( per_pages - 1 ) * per_page;
		Translate.getAll(changePer_page,per_page,function (getAllErr, getAll) {
			if (getAllErr) {
				getAll = [];
			};
			var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
			res.render('client/in/translate', { title: '十页书｜译文',PostTranslateGet_all: getAll,Create_links:Create_links});
		});
	});
}
exports.poTranslate = function (req, res) {
	res.render('client/po/add/translate', { title: '主页'});
}
exports.addTranslateNew = function (req, res) {
	var date = new Date().format("yyyy-MM-dd hh:mm:ss");
	var content = req.body.contents ? kcool.trim(req.body.contents):1;
	var title = req.body.title ? kcool.trim(req.body.title):1;
	var country = req.body.country ? kcool.trim(req.body.country):1;
	var author = req.body.author ? kcool.trim(req.body.author):1;
	var url = req.body.url ? kcool.trim(req.body.url):1;
	var introduction = req.body.introduction ? kcool.trim(req.body.introduction):1;
	var year = req.body.year ? kcool.trim(req.body.year):1;
	var yue = req.body.yue ? kcool.trim(req.body.yue):1;
	var ri = req.body.ri ? kcool.trim(req.body.ri):1;
	var img = req.body.img ? kcool.trim(req.body.img):1;
	var tag = req.body.tag ? kcool.trim(req.body.tag):1;
	Translate.addTranslateNew(date,content,title,country,author,url,introduction,year,yue,ri,img,tag,function (err, addTranslateNew) {
		req.flash('success', '添加"'+title+'"文章成功!');
		return res.redirect('back');
	});
}
exports.toEditTranslate = function (req, res) {
	var translateId = req.body.translateId ? kcool.trim(req.body.translateId):1;
	var date = new Date().format("yyyy-MM-dd hh:mm:ss");
	var content = req.body.contents ? kcool.trim(req.body.contents):1;
	var title = req.body.title ? kcool.trim(req.body.title):1;
	var country = req.body.country ? kcool.trim(req.body.country):1;
	var author = req.body.author ? kcool.trim(req.body.author):1;
	var url = req.body.url ? kcool.trim(req.body.url):1;
	var introduction = req.body.introduction ? kcool.trim(req.body.introduction):1;
	var year = req.body.year ? kcool.trim(req.body.year):1;
	var yue = req.body.yue ? kcool.trim(req.body.yue):1;
	var ri = req.body.ri ? kcool.trim(req.body.ri):1;
	var img = req.body.img ? kcool.trim(req.body.img):1;
	var tag = req.body.tag ? kcool.trim(req.body.tag):1;
	Translate.toEditTranslate(translateId,date,content,title,country,author,url,introduction,year,yue,ri,img,tag,function (err, addTranslateNew) {
		req.flash('success', '添加"'+title+'"文章成功!');
		return res.redirect('back');
	});
}
exports.poReviseTranslate = function (req, res) {
	Translate.getAllTranslate(null ,function (getAllTranslateErr, getAllTranslate) {
		res.render('client/po/revise/reviseTranslate', { title: '主页',GetAllTranslate: getAllTranslate});
	});
}
exports.poDeleteTranslate =function (req, res) {
	Translate.getAllTranslate( null,function (getAllTranslateErr, getAllTranslate) {
		res.render('client/po/delete/deleteTranslate', { title: '主页',GetAllTranslate: getAllTranslate});
	});
}
exports.editTranslateById = function (req, res) {
	var translate_ids = req.query.translate_ids;
	Translate.getTranslateById( translate_ids,function (getTranslateByIdErr, getTranslateById) {
		if (getTranslateByIdErr) {
			getTranslateById = [];
		};
		res.render('client/po/revise/edit/editTranslate', { title: '主页',TranslateById: getTranslateById});
	});
}
exports.delTranslateById = function (req, res) {
	var translate_ids = req.query.translate_ids;
	Translate.delTranslateById( translate_ids,function (delTranslateByIdErr, delTranslateById) {
		return res.redirect('back');
	});
}
exports.translatesById = function (req, res) {
	var translates_ids = req.query.translates_ids ? parseInt(kcool.trim(req.query.translates_ids)) : 1;
	var TranslatesByIds = [];
		Translate.TranslatesById( translates_ids,function (TranslatesByIdErr, TranslatesById) {
			if (TranslatesByIdErr) {
				TranslatesById = [];
				TranslatesById[0].kt_translates_titles=[];
			};
			TranslatesByIds = TranslatesById;
			var translates_ids_add_one = translates_ids;
			var title_to_content_add_one;
			Translate.TranslatesByNext( translates_ids_add_one,function (TranslatesByNextErr, TranslatesByNext) {
				if (TranslatesByNextErr) {
				TranslatesByNext = [];
				};
				var translates_ids_reduce_one = translates_ids;
				var title_to_content_reduce_one;
				title_to_content_add_one = TranslatesByNext;
				Translate.TranslatesByPrev( translates_ids_reduce_one,function (TranslatesByPrevErr, TranslatesByPrev) {
					if (TranslatesByPrevErr) {
					TranslatesByPrev = [];
					};
					title_to_content_reduce_one = TranslatesByPrev;
					var tags_open_next= 0;
					var tags_open_prev= 0;
					TranslatesById = TranslatesByIds;
					passTitle= '十页书｜'+TranslatesById[0].kt_translates_titles;
						if(title_to_content_add_one.length<1){
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							tags_open_next= 1;
							res.render('client/in/translateReader', { title: passTitle,TranslatesById:TranslatesById,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						 }else{
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							res.render('client/in/translateReader', { title: passTitle,TranslatesById:TranslatesById,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						}
				});
			});
		});
}
exports.translatesByNext = function (req, res) {
	var translates_ids = kcool.trim(req.query.translates_ids);
	translates_ids = parseInt(translates_ids);
	var TranslatesByNexts = [];
	Translate.TranslatesByNext( translates_ids,function (TranslatesByNextErr, TranslatesByNext) {
		if (TranslatesByNextErr) {
			TranslatesByNext = [];
			TranslatesByNext[0].kt_translates_titles=[];
		};
		TranslatesByNexts = TranslatesByNext;
		var translates_ids_add_one = translates_ids+1;
		var title_to_content_add_one;
		Translate.TranslatesByNext( translates_ids_add_one,function (TranslatesByNextErr, TranslatesByNext) {
			if (TranslatesByNextErr) {
			TranslatesByNext = [];
			};
			var translates_ids_reduce_one = translates_ids-1;
			var title_to_content_reduce_one;
			title_to_content_add_one = TranslatesByNext;
				Translate.TranslatesByNext( translates_ids_reduce_one,function (TranslatesByNextErr, TranslatesByNext) {
					if (TranslatesByNextErr) {
					TranslatesByNext = [];
					};
					title_to_content_reduce_one = TranslatesByNext;
					var tags_open_next= 0;
					var tags_open_prev= 0;
					TranslatesByNext = TranslatesByNexts;
					passTitle= '十页书｜'+TranslatesByNext[0].kt_translates_titles;console.log(TranslatesByNext[0].kt_translates_ids)
						if(title_to_content_add_one.length<1){
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							tags_open_next= 1;//console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/in/translateReader', { title:passTitle,TranslatesById:TranslatesByNext,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						 }else{
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							//console.log("tags_open_prev");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/in/translateReader', { title:passTitle,TranslatesById:TranslatesByNext,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						}
			});
		});
	});
}
exports.translatesByPrev = function (req, res) {
	var translates_ids = kcool.trim(req.query.translates_ids);
	translates_ids = parseInt(translates_ids);
	var TranslatesByPrevs = [];
	Translate.TranslatesByPrev( translates_ids,function (TranslatesByPrevErr, TranslatesByPrev) {
		if (TranslatesByPrevErr) {
			TranslatesByPrev = [];
			TranslatesByPrev[0].kt_translates_titles=[];
		};
		TranslatesByPrevs = TranslatesByPrev;
		var translates_ids_add_one = translates_ids+1;
		var title_to_content_add_one;
		Translate.TranslatesByPrev( translates_ids_add_one,function (TranslatesByPrevErr, TranslatesByPrev) {
			if (TranslatesByPrevErr) {
			TranslatesByPrev = [];
			};
			var translates_ids_reduce_one = translates_ids-1;
			var title_to_content_reduce_one;
			title_to_content_add_one = TranslatesByPrev;
				Translate.TranslatesByPrev( translates_ids_reduce_one,function (TranslatesByPrevErr, TranslatesByPrev) {
					if (TranslatesByPrevErr) {
					TranslatesByPrev = [];
					};
					title_to_content_reduce_one = TranslatesByPrev;
					var tags_open_next= 0;
					var tags_open_prev= 0;
					TranslatesByPrev = TranslatesByPrevs;
					passTitle= '十页书｜'+TranslatesByPrev[0].kt_translates_titles;
						if(title_to_content_add_one.length<1){
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							tags_open_next= 1;//console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/in/translateReader', { title: passTitle,TranslatesById:TranslatesByPrev,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						 }else{
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							//console.log("tags_open_prev");//console.log(tags_open_prev);//console.log(tags_open_next);
							res.render('client/in/translateReader', { title: passTitle,TranslatesById:TranslatesByPrev,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						}
			});
		});
	});
}
exports.translatesByMenu = function (req, res) {
	Translate.getSorts_count_all_result( null,function (getSorts_count_all_resultErr, getSorts_count_all_result) {
		if (getSorts_count_all_resultErr) {
			count_all_result = 1;
		};
		count_all_result = getSorts_count_all_result[0].count_all_result;	//count_all_result是所有博客的总数量
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
		base_url = 'translatesByMenu?';
		var changePer_page = ( per_pages - 1 ) * per_page;//console.log(changePer_page);
		Translate.getAll(changePer_page,per_page,function (getAllErr, getAll) {
			if (getAllErr) {
				getAll = [];
			};//console.log(getAll);
			var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
			res.render('client/in/translate', { title: '十页书｜译文',PostTranslateGet_all: getAll,Create_links:Create_links});
		});
	});
}