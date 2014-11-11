(function() {
	var express,http;
	express = require('express');		//加载express模块等待扩展
	http = require('http');		//加载http模块等待扩展
	//通用摸版
	exports.kangjian = function (){};
	exports.kangjian_1 = function (a){
		this.a = a;
	};
	//数据库模版
	exports.K_riqi = function  (id,name,blogs_tags_num,suijishu) {
		this.kt_riqi_ids = id;
		this.kt_riqi_dates = name;
		this.kt_blogs_ids = blogs_tags_num;
		this.kt_riqi_suijishu = suijishu;
	};
	exports.K_tags = function  (id,name) {
		this.kt_tags_ids = id;
		this.kt_tags_name = name;
	};
	exports.K_prose = function  (id,dates,contents,titles) {
		this.kt_prose_ids = id;
		this.kt_prose_dates = dates;
		this.kt_prose_contents = contents;
		this.kt_prose_titles = titles;
	};
	exports.K_blogs = function  (blogs_ids,dates,contents,titles,stochastic_figure,tags_ids,year,yue,ri) {
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
	//定义方法模版
	//header头部获取标签名以及数量
	exports.PostTags = function  (id,name,blogs_tags_num) {
		this.kt_tags_ids = id;
		this.kt_tags_name = name;
		this.blogs_tags_num = blogs_tags_num;
	};
	//blogs页面获取日期归档
	exports.PostRiqi = function  (name) {
		this.kt_riqi_dates = name;
	};
	//blogs页面获取全部文章
	exports.K_blogs = function  (blogs_ids,dates,contents,titles,stochastic_figure,tags_ids,year,yue,ri) {
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
