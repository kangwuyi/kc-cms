var kcool = require('../../public/lib/kcool');
var Catalogue = require('../../models/catalogue');
var object = require('../../models/api/object');
var pagination = require('pagination-api');
var myDate = require('../dateFormat')();
var loadTagJsFn = require('./module/public/loadTagJs.js');
var isIf = 'catalogue';

exports.catalogue = function (req, res) {
	Catalogue.PostCatalogueTag( null,function (err, PostCatalogueTag) {
		if (err) {
			PostCatalogueTag = [];
		};//console.log(PostCatalogueTag);
		//for(var i = 0; i<PostCataloguTag.length; i++){
			//console.log(PostCataloguTag[i].kt_nav_tag_ids);
			Catalogue.PostCatalogue(null,function (err, PostCatalogue) {
				if (err) {
					PostCatalogue = [];
				};//console.log(PostCatalogue);
                loadTagJsFn(isIf,function(loadTagOjNode) {
                    res.render('client/in/catalogue', {
                        title: '十页书｜导航',
                        PostCatalogueTag: PostCatalogueTag,
                        PostCatalogue: PostCatalogue,
                        loadTagOjNew:loadTagOjNode
                    });
                });
			});
		//}
	});
}
exports.poCatalogue = function (req, res) {
	Catalogue.PostCatalogueTag( null,function (err, PostCatalogueTag) {
		if (err) {
			PostCatalogueTag = [];
		};
		res.render('client/po/add/catalogue', { title: '主页',PostCatalogueTag: PostCatalogueTag});
	});
}
exports.poAddCatalogueType = function (req, res) {
	res.render('client/po/add/catalogueType', { title: '主页'});
}
exports.poReviseCatalogue = function (req, res) {
	Catalogue.PostCatalogue(null,function (err, PostCatalogue) {
		if (err) {
			PostCatalogue = [];
		};//console.log(PostCatalogue);
        var urlStr = {addNew:'/poCatalogue',sign:'catalogue'};
		res.render('client/po/revise/reviseCatalogue', { title: '主页',PostCatalogue: PostCatalogue,urlStr:urlStr });
	});
}
exports.editCatalogueById = function (req, res) {
	var navigation_ids = req.query.navigation_ids ? kcool.trim(req.query.navigation_ids):1;
	Catalogue.getCatalogueById(navigation_ids,function (err, getCatalogueById) {
		Catalogue.PostCatalogueTag( null,function (err, PostCatalogueTag) {
			if (err) {
				PostCatalogueTag = [];
			};
			res.render('client/po/revise/edit/editCatalogue', { title: '主页',PostCatalogueTag:PostCatalogueTag,getCatalogueById: getCatalogueById});
		});
	});
}
exports.toEditCatalogue = function (req, res) {
	var catalogueId = req.body.catalogueId ? kcool.trim(req.body.catalogueId):1;
	var catalogueTitle = req.body.catalogueTitle ? kcool.trim(req.body.catalogueTitle):1;
	var catalogueUrl = req.body.catalogueUrl ? kcool.trim(req.body.catalogueUrl):1;
	var catalogueTypeId = req.body.catalogueTypeId ? kcool.trim(req.body.catalogueTypeId):1;
	Catalogue.toEditCatalogue(catalogueId,catalogueTitle,catalogueUrl,catalogueTypeId,function (err, toEditCatalogue) {
		req.flash('success', '添加"'+catalogueTitle+'"文章成功!');
		return res.redirect('back');
	});
}
exports.poDeleteCatalogue = function (req, res) {
	Catalogue.PostCatalogue(null,function (err, PostCatalogue) {
		if (err) {
			PostCatalogue = [];
		};//console.log(PostCatalogue);
		res.render('client/po/delete/deleteCatalogue', { title: '主页',PostCatalogue: PostCatalogue});
	});
}
exports.delCatalogueById = function (req, res) {
	var navigation_ids = req.query.navigation_ids;
	Catalogue.delCatalogueById(navigation_ids,function (err, delCatalogueById) {
		return res.redirect('back');
	});
}
exports.addCatalogueType = function (req, res) {
	var catalogueTitle = req.body.catalogueTitle ? kcool.trim(req.body.catalogueTitle):1;
	Catalogue.addCatalogueType(catalogueTitle,function (err, addCatalogueType) {
		req.flash('success', '添加"'+catalogueTitle+'"文章成功!');
		return res.redirect('back');
	});
}
exports.addCatalogue = function (req, res) {
	var catalogueTitle = req.body.catalogueTitle ? kcool.trim(req.body.catalogueTitle):1;
	var catalogueUrl = req.body.catalogueUrl ? kcool.trim(req.body.catalogueUrl):1;
	var catalogueTypeId = req.body.catalogueTypeId ? kcool.trim(req.body.catalogueTypeId):1;
	Catalogue.addCatalogue(catalogueTitle,catalogueUrl,catalogueTypeId,function (err, addCatalogue) {
		req.flash('success', '添加"'+catalogueTitle+'"文章成功!');
		return res.redirect('back');
	});

}