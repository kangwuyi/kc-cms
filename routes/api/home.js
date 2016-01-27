var loadTagJsFn = require('./module/public/loadTagJs.js');
var isIf = 'index';

exports.indexs = function (req, res) {
    loadTagJsFn(isIf,function(loadTagOjNode) {
        res.render('client/index', {title: '十页书，每天阅读十页好书',loadTagOjNew:loadTagOjNode});
    });
}
exports.about = function (req, res) {
    loadTagJsFn(isIf,function(loadTagOjNode) {
        res.render('client/in/about', {title: '十页书｜友链',loadTagOjNew:loadTagOjNode});
    });
}
exports.abcd = function (req, res) {
	var idss;
	if(req.query.idss){
		idss = req.query.idss;//console.log("get");
	};
	if(req.body.idss){
		idss = req.body.idss;//console.log("post");
	}
	console.log(idss);
    loadTagJsFn(isIf,function(loadTagOjNode) {
        res.render('client/in/design', {title: '十页书｜友链',loadTagOjNew:loadTagOjNode});
    });
}
exports.design = function (req, res) {
    isIf = 'design';
    loadTagJsFn(isIf,function(loadTagOjNode) {
        res.render('client/in/design', {title: '十页书｜设计',loadTagOjNew:loadTagOjNode});
    });
}
exports.photo = function (req, res) {
    isIf = 'photo';
    loadTagJsFn(isIf,function(loadTagOjNode) {
        res.render('client/in/photo', {title: '十页书｜相册',loadTagOjNew:loadTagOjNode});
    });
}
exports.assembly = function (req, res) {
    isIf = 'assembly';
    loadTagJsFn(isIf,function(loadTagOjNode) {
        res.render('client/in/assembly', {title: '十页书｜组件',loadTagOjNew:loadTagOjNode});
    });
}
exports.toPoIndex = function (req, res) {
	res.render('client/po/index', { title: '主页'});
}
exports.poHome = function (req, res) {
	res.render('client/po/index', { title: '主页'});
}
exports.poAdds = function (req, res) {
	res.render('client/po/add/addIndex', { title: '主页'});
}
exports.poRevise = function (req, res) {
	res.render('client/po/revise/reviseIndex', { title: '主页'});
}
exports.poDelete = function (req, res) {
	res.render('client/po/delete/deleteIndex', { title: '主页'});
}