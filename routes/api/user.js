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
var loadTagJsFn = require('./module/public/loadTagJs.js');
var isIf = 'index';

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
		req.session={
			publicUserId : user[0].kt_user_ids,
			publicUserKpi : user[0].kt_user_kpi
		};
		//用户名密码都匹配后，将用户信息存入 session
		//console.log(user[0].kt_user_name);
		req.flash('success', '登陆成功!');
		// res.send(req.session.user);
		//res.redirect('back');//返回之前的页面
        loadTagJsFn(isIf,function(loadTagOjNode) {
            res.render('client/po/index', {title: '十页书｜进入后台管理系统',loadTagOjNew:loadTagOjNode});
        });
	});
}
exports.leave = function (req, res) {
	//用户名密码都匹配后，将用户信息存入 session
	//console.log(user[0].kt_user_name);
	req.session={
		publicUserId : null,
		publicUserKpi : null
	};
	req.flash('success', '退出成功!');
	// res.send(req.session.user);
	//res.redirect('back');//返回之前的页面
    loadTagJsFn(isIf,function(loadTagOjNode) {
        res.render('client/index', {title: '十页书｜退出后台管理系统',loadTagOjNew:loadTagOjNode});
    });
};
exports.registerToInfo = function (req, res) {
    loadTagJsFn(isIf,function(loadTagOjNode) {
        res.render('client/in/loginToInfo', {title: '十页书｜退出后台管理系统',loadTagOjNew:loadTagOjNode});
    });
};
exports.verifyUserName = function (req, res) {
    var userName = req.body.str;
    User.verifyUserName(userName, function (err, user) {
        var isExist = true;
        if (user.length<1) {
            isExist = false;
        }console.log(user);
        loadTagJsFn(isIf,function(loadTagOjNode) {
            res.jsonp({status: 'json', isExist: isExist,loadTagOjNew:loadTagOjNode});
        });
    });
};
exports.registerSubmit = function (req, res) {
    var md5 = crypto.createHash('md5'),
        userAffirmPwd = md5.update(req.body.userAffirmPwd).digest('hex'),
        userName = req.body.userName,
        userEmail = req.body.userEmail;
    User.postUserInfo(userAffirmPwd,userName,userEmail,function (err, user) {
        User.get(userName, function (err, user) {
            if (user.length < 1) {
                req.flash('error', '用户不存在!');
                return res.redirect('back');//返回之前的页面
            }
            req.session = {
                publicUserId: user[0].kt_user_ids,
                publicUserKpi: user[0].kt_user_kpi
            };
            loadTagJsFn(isIf,function(loadTagOjNode) {
                res.render('client/po/index', {title: '十页书｜退出后台管理系统',loadTagOjNew:loadTagOjNode});
            });
        })
    });
};
