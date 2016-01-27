var kcool = require('../../public/lib/kcool');
var User = require('../../models/user');
var Prose = require('../../models/prose');
var object = require('../../models/api/object');
var pagination = require('pagination-api');
var myDate = require('../dateFormat')();
var loadTagJsFn = require('./module/public/loadTagJs.js');
var isIf = 'prose';

exports.prose = function (req, res) {
	Date.prototype.Format = function (fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	Prose.PostGetProse( null,function (err, PostGetProse) {
		if (err) {
			PostGetProse = [];
		};
		var PostDataProse = new Array();
		for(var p = 0; p < PostGetProse.length; p++){
			var dataProse = {
				dataYear:new Date(PostGetProse[p].kt_prose_dates).format("yyyy"),
			}
			PostDataProse.push(dataProse.dataYear);
		}
		for(var p = 0; p < PostGetProse.length; p++){
			PostGetProse[p].dataYear = new Date(PostGetProse[p].kt_prose_dates).format("yyyy");
			PostGetProse[p].dataMonth = new Date(PostGetProse[p].kt_prose_dates).format("MM")
		}
		function unique(arr) {
			var result = [], hash = {};
			for (var i = 0, elem; (elem = arr[i]) != null; i++) {
				if (!hash[elem]) {
					result.push(elem);
					hash[elem] = true;
				}
			}
			return result;
		}
		PostDataProse = new unique(PostDataProse);//console.log(PostDataProse)
        loadTagJsFn(isIf,function(loadTagOjNode) {
            res.render('client/in/prose', {title: '十页书｜说说', PostGetProse: PostGetProse, PostDataProse: PostDataProse,loadTagOjNew:loadTagOjNode});
        });
	});
}
exports.poProse = function (req, res) {
    loadTagJsFn(isIf,function(loadTagOjNode) {
        res.render('client/po/add/prose', {title: '主页',loadTagOjNew:loadTagOjNode});
    });
}
exports.poReviseProse = function (req, res) {
	Prose.PostGetProse( null,function (err, PostGetProse) {
		if (err) {
			PostGetProse = [];
		};
		for(var p = 0; p < PostGetProse.length; p++){
			PostGetProse[p].dataYear = new Date(PostGetProse[p].kt_prose_dates).format("yyyy");
			PostGetProse[p].dataMonth = new Date(PostGetProse[p].kt_prose_dates).format("MM")
		}
        var urlStr = {addNew:'/poProse',sign:'prose'};
        loadTagJsFn(isIf,function(loadTagOjNode) {
            res.render('client/po/revise/reviseProse', {title: '主页', PostGetProse: PostGetProse, urlStr: urlStr,loadTagOjNew:loadTagOjNode});
        });
	});
}
exports.editProseById = function (req, res) {
	var prose_ids = req.query.prose_ids ? kcool.trim(req.query.prose_ids):1;
	Prose.getProseById(prose_ids,function (err, getProseById) {
        loadTagJsFn(isIf,function(loadTagOjNode) {
            res.render('client/po/revise/edit/editProse', {title: '主页', getProseById: getProseById,loadTagOjNew:loadTagOjNode});
        });
	});
}
exports.toEditProse = function (req, res) {
	var proseId = req.body.proseId ? kcool.trim(req.body.proseId):1;
	var proseTitle = req.body.proseTitle ? kcool.trim(req.body.proseTitle):1;
	var proseDate = new Date().format("yyyy-MM-dd hh:mm:ss");
	var proseContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
	Prose.toEditProse(proseId,proseTitle,proseDate,proseContent,function (err, toEditProse) {
		req.flash('success', '添加"'+proseTitle+'"文章成功!');
		return res.redirect('back');
	});
}
exports.poDeleteProse = function (req, res) {
	Prose.PostGetProse( null,function (err, PostGetProse) {
		if (err) {
			PostGetProse = [];
		};
		for(var p = 0; p < PostGetProse.length; p++){
			PostGetProse[p].dataYear = new Date(PostGetProse[p].kt_prose_dates).format("yyyy");
			PostGetProse[p].dataMonth = new Date(PostGetProse[p].kt_prose_dates).format("MM")
		};
        loadTagJsFn(isIf,function(loadTagOjNode) {
            res.render('client/po/delete/deleteProse', {title: '主页', PostGetProse: PostGetProse,loadTagOjNew:loadTagOjNode});
        });
	});
}
exports.delProseById = function (req, res) {
	var prose_ids = req.query.prose_ids;
	Prose.delProseById(prose_ids,function (err, delProseById) {
		return res.redirect('back');
	});
}
exports.toAddProse = function (req, res) {
	var proseTitle = req.body.proseTitle ? kcool.trim(req.body.proseTitle):1;
	var proseDate = new Date().format("yyyy-MM-dd hh:mm:ss");
	var proseContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
	Prose.addProse(proseTitle,proseDate,proseContent,function (err, addProse) {
		req.flash('success', '添加"'+proseTitle+'"文章成功!');
		return res.redirect('back');
	});
}