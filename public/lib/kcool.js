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
//Date原生对象扩展格式化输出
			exports.format = function (string) {
				var self = this;
				var p = function p(s) {
					return  (s.toString().length == 1) ? "0" + s: s;
				};
				return string ? string.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g,
				function (string) {
					switch (string) {
					case "hh":
						return p(self.getHours() < 13 ? self.getHours() : (self.getHours() - 12));
					case "h":
						return self.getHours() < 13 ? self.getHours() : (self.getHours() - 12);
					case "HH":
						return p(self.getHours());
					case "H":
						return self.getHours();
					case "mm":
						return p(self.getMinutes());
					case "m":
						return self.getMinutes();
					case "ss":
						return p(self.getSeconds());
					case "s":
						return self.getSeconds();
					case "yyyy":
						return self.getFullYear();
					case "yy":
						return self.getFullYear().toString().substring(2, 4);
					case "dddd":
						return self.getDayName();
					case "ddd":
						return self.getDayName(true);
					case "dd":
						return p(self.getDate());
					case "d":
						return self.getDate().toString();
					case "MMMM":
						return self.getMonthName();
					case "MMM":
						return self.getMonthName(true);
					case "MM":
						return p((self.getMonth() + 1));
					case "M":
						return self.getMonth() + 1;
					case "t":
						return self.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
					case "tt":
						return self.getHours() < 12 ? Date.CultureInfo.amDesignator: Date.CultureInfo.pmDesignator;
					case "zzz":
					case "zz":
					case "z":
						return  "";
					}
				}):
				this.toString();
			}
}).call(this);
