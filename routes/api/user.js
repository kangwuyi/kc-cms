var kcool = require('../../public/lib/kcool');
var User = require('../../models/user');
var object = require('../../models/api/object');
var pagination = require('pagination-api');
var myDate = require('../dateFormat')();
var express = require('express');
var http = require("http");            //提供web服务
var url = require("url");            //解析GET请求
var query = require("querystring");    //解析POST请求
var router = express.Router();
var crypto = require('crypto');

exports.login = function (req, res) {
	//生成密码的 md5 值
	var md5 = crypto.createHash('md5'),
	password = md5.update(req.body.password).digest('hex');
	//检查用户是否存在
	User.get(req.body.username, function (err, user) {
		if (user.length<1) {
			req.flash('error', '用户不存在!');
			return res.redirect('back');//返回之前的页面
		}//console.log(user);
		//检查密码是否一致
		if (user[0].kt_user_password != password) {
			req.flash('error', '密码错误!');
			return res.redirect('back');//返回之前的页面
		}
		//用户名密码都匹配后，将用户信息存入 session
		//console.log(user[0].kt_user_name);
		req.session.user = user[0].kt_user_name;//console.log("session:"+req.session.user);
		req.flash('success', '登陆成功!');
		// res.send(req.session.user);
		//res.redirect('back');//返回之前的页面
		res.render('client/po/index', { title: '十页书｜进入后台管理系统'});
	});
}
exports.leave = function (req, res) {
	//用户名密码都匹配后，将用户信息存入 session
	//console.log(user[0].kt_user_name);
	req.session.user = '';//console.log("session:"+req.session.user);
	req.flash('success', '退出成功!');
	// res.send(req.session.user);
	//res.redirect('back');//返回之前的页面
	res.render('client/index', { title: '十页书｜退出后台管理系统'});
}