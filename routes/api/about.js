exports.wendang = function (req, res) {
	res.render('client/doc/inDesign/wendang/index', { title: '十页书｜简单的单页简历'});
}
exports.resume = function (req, res) {
	res.render('client/doc/inDesign/resume/index', { title: '十页书｜复杂的单页简历'});
}
exports.enresume = function (req, res) {
	res.render('client/doc/inDesign/resume/en', { title: '十页书｜Single page resume complex'});
}
exports.paginationApi = function (req, res) {
	res.render('client/doc/inAssembly/pagination-api/index', { title: 'pagination-api'});
}
exports.paginationApiSource = function (req, res) {
	res.render('client/doc/inAssembly/pagination-api/source', { title: 'pagination-api'});
}
exports.kcool = function (req, res) {
	res.render('client/doc/inAssembly/kcool/index', { title: 'kcool'});
}
exports.kcoolSource = function (req, res) {
	res.render('client/doc/inAssembly/kcool/source', { title: 'kcool'});
}