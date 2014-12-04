exports.indexs = function (req, res) {
	res.render('client/index', { title: '十页书，每天阅读十页好书'});
}
exports.about = function (req, res) {
	res.render('client/in/about', { title: '十页书｜友链'});
}
exports.design = function (req, res) {
	res.render('client/in/design', { title: '十页书｜设计'});
}
exports.photo = function (req, res) {
	res.render('client/in/photo', { title: '十页书｜相册'});
}
exports.assembly = function (req, res) {
	res.render('client/in/assembly', { title: '十页书｜组件'});
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