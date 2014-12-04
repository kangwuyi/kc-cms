var kcool = require('../../public/lib/kcool');
var Feel = require('../../models/feel');
var object = require('../../models/api/object');
var pagination = require('pagination-api');
var myDate = require('../dateFormat')();

exports.allFeel = function (req, res) {
	Feel.PostFeelSorts_count_all_result( null,function (PostFeelSorts_count_all_resultErr, PostFeelSorts_count_all_result) {
		if (PostFeelSorts_count_all_resultErr) {
			count_all_result = 1;
		};
		count_all_result = PostFeelSorts_count_all_result[0].count_all_result;
		var per_pages = 1;
		if(req.query.per_page){
			per_pages = req.query.per_page;
		};
		if(req.body.per_page){
			per_pages = req.body.per_page;
		}
		var total_rows,per_page,base_url ;
		total_rows = count_all_result ;
		per_page = 10;
		base_url = 'feel?';
		var changePer_page = ( per_pages - 1 ) * per_page;
		Feel.PostFeelGet_all(changePer_page,per_page,function (PostFeelGet_allErr, PostFeelGet_all) {
			if (PostFeelGet_allErr) {
				PostFeelGet_all = [];
			};
			var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
			Feel.PostFeelDate( null,function (PostFeelDateErr, PostFeelDate) {
				if (PostFeelDateErr) {
					PostFeelDate = [];
				};
				Feel.PostFeelTag( null,function (PostFeelTagErr, PostFeelTag) {
					res.render('client/in/feel', { title: '十页书｜读后感',PostFeelTag: PostFeelTag,PostFeelGet_all: PostFeelGet_all,PostFeelDate: PostFeelDate,Create_links:Create_links});
				});
			});
		});
	});
}
exports.poFeels = function (req, res) {
	Feel.PostFeelsTag( null,function (err, PostFeelsTag) {
		res.render('client/po/add/feels', { title: '主页',PostFeelsTag: PostFeelsTag});
	});
}
exports.poAddFeelType = function (req, res) {
	res.render('client/po/add/feelType', { title: '主页'});
}
exports.poReviseFeels = function (req, res) {
	Feel.GetAllFeel(null,function (GetAllFeelErr, GetAllFeel) {
			if (GetAllFeelErr) {
				GetAllFeel = [];
			};//console.log(PostGet_all);
			res.render('client/po/revise/reviseFeel', { title: '主页',GetAllFeel: GetAllFeel});
	});
}
exports.editFeelById = function (req, res) {
	var feels_ids = req.query.feels_ids;
	Feel.FeelsById( feels_ids,function (FeelsByIdErr, FeelsById) {
		if (FeelsByIdErr) {
			FeelsById = [];
		};
		Feel.PostFeelsTag( null,function (err, PostFeelsTag) {
			res.render('client/po/revise/edit/editFeels', { title: '主页',FeelsById: FeelsById,PostFeelsTag: PostFeelsTag});
		});
	});
}
exports.toEditFeel = function (req, res) {
	var feelId = req.body.feelId ? kcool.trim(req.body.feelId):1;
	var feelTitle = req.body.feelTitle ? kcool.trim(req.body.feelTitle):1;
	var feelTagId = req.body.feelTagId ? kcool.trim(req.body.feelTagId):1;
	var feelYear = req.body.feelYear ? kcool.trim(req.body.feelYear):1;
	var feelYue = req.body.feelYue ? kcool.trim(req.body.feelYue):1;
	var feelRi = req.body.feelRi ? kcool.trim(req.body.feelRi):1;
	var feelDate = new Date().format("yyyy-MM-dd hh:mm:ss");
	var feelContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
	Feel.toEditFeel(feelId,feelTitle, feelTagId,feelYear,feelYue,feelRi,feelDate,feelContent,function (err, toEditFeel) {
		var dateRiqi = feelYue+'.'+feelYear;
		Feel.toAddFeelRiqi(dateRiqi,feelId,function (err, toAddFeelRiqi) {
			req.flash('success', '添加"'+feelTitle+'"文章成功!');
			return res.redirect('back');
		});
	});
}
exports.poDeleteFeels = function (req, res) {
	Feel.GetAllFeel(null,function (GetAllFeelErr, GetAllFeel) {
			if (GetAllFeelErr) {
				GetAllFeel = [];
			};//console.log(PostGet_all);
			res.render('client/po/delete/deleteFeel', { title: '主页',GetAllFeel: GetAllFeel});
	});
}
exports.delFeelById = function (req, res) {
	var feels_ids = req.query.feels_ids;
	Feel.delFeelById(feels_ids,function (err, delFeelById) {
		Feel.delFeelRiqiById(feels_ids,function (err, delFeelRiqiById) {
			return res.redirect('back');
		});
	});
}
exports.toAddFeelType = function (req, res) {
	var tagName = req.body.tagName ? kcool.trim(req.body.tagName):1;
	//检查标签是否存在
	Feel.checkFeelTag(tagName, function (err, checkFeelTag) {
		if (checkFeelTag.length<1) {
			Feel.AddFeelTagName(tagName, function (err, AddFeelTagName) {
				req.flash('success', '添加"'+tagName+'"标签成功!');
				return res.redirect('back');
			});
		}else{
			req.flash('error', '"'+tagName+'"标签已存在!');
			return res.redirect('back');
		}
	});
}
exports.toAddFeel = function (req, res) {
	var feelTitle = req.body.feelTitle ? kcool.trim(req.body.feelTitle):1;
	var feelTagId = req.body.feelTagId ? kcool.trim(req.body.feelTagId):1;
	var feelYear = req.body.feelYear ? kcool.trim(req.body.feelYear):1;
	var feelYue = req.body.feelYue ? kcool.trim(req.body.feelYue):1;
	var feelRi = req.body.feelRi ? kcool.trim(req.body.feelRi):1;
	var feelDate = new Date().format("yyyy-MM-dd hh:mm:ss");
	var feelContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
	Feel.toAddFeel(feelTitle, feelTagId,feelYear,feelYue,feelRi,feelDate,feelContent,function (err, toAddFeel) {
		Feel.dateBackFeelId(feelDate,function (err, dateBackFeelId) {
			var feelId = dateBackFeelId[0].kt_feels_ids;
			var dateRiqi = feelYue+'.'+feelYear;
			Feel.toAddFeelRiqi(dateRiqi,feelId,function (err, toAddFeelRiqi) {
				req.flash('success', '添加"'+feelTitle+'"文章成功!');
				return res.redirect('back');
			});
		});
	});
}
exports.feelsById = function (req, res) {
	var feels_ids = req.query.feels_ids ? parseInt(kcool.trim(req.query.feels_ids)) : 1;
	var tags_ids = req.query.tags_ids ? parseInt(kcool.trim(req.query.tags_ids)) : 1;
	var FeelsByIds = [];
	Feel.PostFeelTag( null,function (PostFeelTagErr, PostFeelTag) {
		Feel.FeelsById( feels_ids,function (FeelsByIdErr, FeelsById) {
			if (FeelsByIdErr) {
				FeelsById = [];
			};
			FeelsByIds = FeelsById;
			var feels_ids_add_one = feels_ids;
			var title_to_content_add_one;
			Feel.FeelsByNext( feels_ids_add_one,tags_ids,function (FeelsByNextErr, FeelsByNext) {
				if (FeelsByNextErr) {
				FeelsByNext = [];
				};
				var feels_ids_reduce_one = feels_ids;
				var title_to_content_reduce_one;
				title_to_content_add_one = FeelsByNext;
				Feel.FeelsByPrev( feels_ids_reduce_one,tags_ids,function (FeelsByPrevErr, FeelsByPrev) {
					if (FeelsByPrevErr) {
					FeelsByPrev = [];
					};
					title_to_content_reduce_one = FeelsByPrev;
					var tags_open_next= 0;
					var tags_open_prev= 0;
					FeelsById = FeelsByIds;
					passTitle= '十页书｜'+FeelsById[0].kt_feels_titles;
					Feel.PostFeelDate( null,function (PostFeelDateErr, PostFeelDate) {
						if(title_to_content_add_one.length<1){
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							tags_open_next= 1;//console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/in/feelReader', { title: passTitle,PostFeelTag: PostFeelTag,PostFeelDate: PostFeelDate,FeelsById:FeelsById,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						 }else{
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							res.render('client/in/feelReader', { title: passTitle,PostFeelTag: PostFeelTag,PostFeelDate: PostFeelDate,FeelsById:FeelsById,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						}
					});
				});
			});
		});
	});
}
exports.feelsByNext = function (req, res) {
	var feels_ids = kcool.trim(req.query.feels_ids);
	var tags_ids = kcool.trim(req.query.tags_ids);
	feels_ids = parseInt(feels_ids);
	tags_ids = parseInt(tags_ids);
	var FeelsByNexts = [];
	Feel.FeelsByNext( feels_ids,tags_ids,function (FeelsByNextErr, FeelsByNext) {
		if (FeelsByNextErr) {
			FeelsByNext = [];
			FeelsByNext[0].kt_feels_titles =[];
		};
		FeelsByNexts = FeelsByNext;
		var feels_ids_add_one = feels_ids+1;
		var title_to_content_add_one;
		Feel.FeelsByNext( feels_ids_add_one,tags_ids,function (FeelsByNextErr, FeelsByNext) {
			if (FeelsByNextErr) {
			FeelsByNext = [];
			};
			var feels_ids_reduce_one = feels_ids-1;
			var title_to_content_reduce_one;
			title_to_content_add_one = FeelsByNext;
			Feel.PostFeelTag( null,function (PostFeelTagErr, PostFeelTag) {
				Feel.FeelsByNext( feels_ids_reduce_one,tags_ids,function (FeelsByNextErr, FeelsByNext) {
					if (FeelsByNextErr) {
					FeelsByNext = [];
					};
					title_to_content_reduce_one = FeelsByNext;
					var tags_open_next= 0;
					var tags_open_prev= 0;
					FeelsByNext = FeelsByNexts;
					passTitle= '十页书｜'+FeelsByNext[0].kt_feels_titles;
					Feel.PostFeelDate( null,function (PostFeelTagErr, PostFeelDate) {
						if(title_to_content_add_one.length<1){
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							tags_open_next= 1;//console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/in/feelReader', { title: passTitle,PostFeelTag: PostFeelTag,PostFeelDate: PostFeelDate,FeelsById:FeelsByNext,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						 }else{
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							//console.log("tags_open_prev");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/in/feelReader', { title: passTitle,PostFeelTag: PostFeelTag,PostFeelDate: PostFeelDate,FeelsById:FeelsByNext,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						}
					});
				});
			});
		});
	});
}
exports.feelsByPrev = function (req, res) {
	var feels_ids = kcool.trim(req.query.feels_ids);
	var tags_ids = kcool.trim(req.query.tags_ids);
	feels_ids = parseInt(feels_ids);
	tags_ids = parseInt(tags_ids);
	var FeelsByPrevs = [];
	Feel.FeelsByPrev( feels_ids,tags_ids,function (FeelsByPrevErr, FeelsByPrev) {
		if (FeelsByPrevErr) {
			FeelsByPrev = [];
			FeelsByPrev[0].kt_feels_titles =[];
		};
		FeelsByPrevs = FeelsByPrev;
		var feels_ids_add_one = feels_ids+1;
		var title_to_content_add_one;
		Feel.FeelsByPrev( feels_ids_add_one,tags_ids,function (FeelsByPrevErr, FeelsByPrev) {
			if (FeelsByPrevErr) {
			FeelsByPrev = [];
			};
			var feels_ids_reduce_one = feels_ids-1;
			var title_to_content_reduce_one;
			title_to_content_add_one = FeelsByPrev;
			Feel.PostFeelTag( null,function (PostFeelTagErr, PostFeelTag) {
				Feel.FeelsByPrev( feels_ids_reduce_one,tags_ids,function (FeelsByPrevErr, FeelsByPrev) {
					if (FeelsByPrevErr) {
					FeelsByPrev = [];
					};
					title_to_content_reduce_one = FeelsByPrev;
					var tags_open_next= 0;
					var tags_open_prev= 0;
					FeelsByPrev = FeelsByPrevs;
					passTitle= '十页书｜'+FeelsByPrev[0].kt_feels_titles;
					Feel.PostFeelDate( null,function (PostFeelTagErr, PostFeelDate) {
						if(title_to_content_add_one.length<1){
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							tags_open_next= 1;//console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/in/feelReader', { title: passTitle,PostFeelTag: PostFeelTag,PostFeelDate: PostFeelDate,FeelsById:FeelsByPrev,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						 }else{
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							//console.log("tags_open_prev");//console.log(tags_open_prev);//console.log(tags_open_next);
							res.render('client/in/feelReader', { title: passTitle,PostFeelTag: PostFeelTag,PostFeelDate: PostFeelDate,FeelsById:FeelsByPrev,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						}
					});
				});
			});
		});
	});
}
exports.feelsByMenu = function (req, res) {
	var tags_ids = kcool.trim(req.query.tags_ids);//console.log(feels_ids);
	Feel.FeelsById_count_all_result( tags_ids,function (FeelsById_count_all_resultErr, FeelsById_count_all_result) {
		if (FeelsById_count_all_resultErr) {
			count_all_result = 1;
		};
		count_all_result = FeelsById_count_all_result[0].count_all_result;	//count_all_result是所有博客的总数量
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
		base_url = 'feelsByMenu?tags_ids='+tags_ids+'&';
		var changePer_page = ( per_pages - 1 ) * per_page;//console.log(changePer_page);
		Feel.PageByFeelTagId(tags_ids,changePer_page,per_page,function (PageByFeelTagIdErr, PageByFeelTagId) {
			if (PageByFeelTagIdErr) {
				PageByFeelTagId = [];
			};//console.log(PageByFeelTagId);
			var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
			Feel.PostFeelDate( null,function (PostFeelDateErr, PostFeelDate) {
				if (PostFeelDateErr) {
					PostFeelDate = [];
				};//console.log(PostRiqi);
				Feel.PostFeelTag( null,function (PostFeelTagErr, PostFeelTag) {
					res.render('client/in/feel', { title: '十页书｜读后感',PostFeelGet_all: PageByFeelTagId,PostFeelTag: PostFeelTag,PostFeelDate: PostFeelDate,Create_links:Create_links});
				});
			});
		});
	});
}
exports.pageByFeelData = function (req, res) {
	var riqi_dates = kcool.trim(req.query.riqi_dates);//console.log(feels_ids);
	Feel.FeelsByData_count_all_result( riqi_dates,function (FeelsByData_count_all_resultErr, FeelsByData_count_all_result) {
		if (FeelsByData_count_all_resultErr) {
			count_all_result = 1;
		};//console.log(FeelsByData_count_all_result);
		count_all_result = FeelsByData_count_all_result[0].count_all_result;	//count_all_result是所有博客的总数量
		var per_pages = 1;
		if(req.query.per_page){
			per_pages = req.query.per_page;//console.log("get");
		};
		if(req.body.per_page){
			per_pages = req.body.per_page;//console.log("post");
		}//console.log("per_pages");console.log(per_pages);
		var total_rows,per_page,base_url ;
		var total_rows = count_all_result ;
		var per_page = 10;
		var base_url = 'pageByFeelData?riqi_dates='+riqi_dates+'&';
		var changePer_page = ( per_pages - 1 ) * per_page;//console.log(changePer_page);
		Feel.PageByFeelData(riqi_dates,changePer_page,per_page,function (PageByFeelDataErr, PageByFeelData) {
			if (PageByFeelDataErr) {
				PageByFeelData = [];
			};//console.log(PageByFeelData);
			var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
			Feel.PostFeelDate( null,function (PostFeelTagErr, PostFeelDate) {
				if (PostFeelTagErr) {
					PostFeelDate = [];
				};//console.log(total_rows+per_page+per_pages);
				Feel.PostFeelTag( null,function (PostFeelTagErr, PostFeelTag) {
					res.render('client/in/feel', { title: '十页书｜读后感',PostFeelGet_all: PageByFeelData,PostFeelTag: PostFeelTag,PostFeelDate: PostFeelDate,Create_links:Create_links});
				});
			});
		});
	});
}