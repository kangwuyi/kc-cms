(function() {
	var express,http;
	express = require('express');		//加载express模块等待扩展
	http = require('http');
//使用 trim、ltrim 或 rtrim
exports.trim = function (str){ //删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
 exports.ltrim = function (str){ //删除左边的空格
	return str.replace(/(^\s*)/g,"");
}
exports.rtrim = function (str){ //删除右边的空格
	return str.replace(/(\s*$)/g,"");
}
//获得上上级文件目录
exports.route_3 = function (str){
	return str=str.replace(/\/[^\/]+\/[^\/]+$/,"/");
}
}).call(this);
