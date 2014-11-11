(function() {
	var express,http;
	express = require('express');		//加载express模块等待扩展
	http = require('http');		//加载http模块等待扩展
	//通用摸版
	exports.kangjian = function (){};
	//blogs页面获取全部文章的数量
	exports.PostSorts_count_all_result = function  (count_all_result) {
		this.count_all_result = count_all_result;
	};
	//blogs页面获取全部文章并进行分页
	exports.PostGet_all = function  (name,blogs_ids,dates,contents,titles,tags_ids,year,yue,ri) {
		this.kt_tags_name = name;
		this.kt_blogs_ids = blogs_ids;
		this.kt_blogs_dates = dates;
		this.kt_blogs_contents = contents;
		this.kt_blogs_titles = titles;
		this.stochastic_figure = stochastic_figure;
		this.kt_tags_ids = tags_ids;
		this.kt_blogs_year = year;
		this.kt_blogs_yue = yue;
		this.kt_blogs_ri = ri;
	};

}).call(this);
