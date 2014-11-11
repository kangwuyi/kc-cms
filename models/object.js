(function() {
	var express,http;
	express = require('express');		//加载express模块等待扩展
	var kcool = require('../public/lib/kcool');
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
	exports.k_domainsite = function  (domainsite_ids,domainsite_name,domainsite_href,domainsite_text) {
		this.kt_domainsite_ids = domainsite_ids;
		this.kt_domainsite_name = domainsite_name;
		this.kt_domainsite_href = domainsite_href;
		this.kt_domainsite_text = domainsite_text;
	};
	exports.k_domainsuffix = function  (domainsuffix_ids,domainsuffix_name,domainsuffix_name_href,domainsite_type,domainsite_org,domainsite_url) {
		this.kt_domainsuffix_ids = domainsuffix_ids;
		this.kt_domainsuffix_name = domainsuffix_name;
		this.kt_domainsuffix_name_href = domainsuffix_name_href;
		this.kt_domainsuffix_type = domainsite_type;
		this.kt_domainsuffix_org = domainsite_org;
		this.kt_domainsuffix_url = domainsite_url;
	};
	exports.k_navigation = function  (navigation_ids,navigation_name,navigation_url,nav_tag_ids,nav_tag_name) {
		this.kt_navigation_ids = navigation_ids;
		this.kt_navigation_name = navigation_name;
		this.kt_navigation_url = navigation_url;
		this.kt_nav_tag_ids = nav_tag_ids;
		this.kt_nav_tag_name = nav_tag_name;
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
	//blogs页面根据标签ID获取全部文章的数量
	exports.BlogsById_count_all_result = function  (count_all_result) {
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
	//blogs页面获取根据标签ID进行文章并进行分页
	exports.PageByTagId = function  (name,blogs_ids,dates,contents,titles,tags_ids,year,yue,ri) {
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
	//blogs页面获取根据日期进行文章并进行分页
	exports.PageByData = function  (name,blogs_ids,dates,contents,titles,tags_ids,year,yue,ri) {
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
	//domain页面获取域名商信息
	exports.PostGetDomainsite = function  (domainsite_ids,domainsite_name,domainsite_href,domainsite_text) {
		this.kt_domainsite_ids = domainsite_ids;
		this.kt_domainsite_name = domainsite_name;
		this.kt_domainsite_href = domainsite_href;
		this.kt_domainsite_text = domainsite_text;
	};
	//domain页面获取域名后缀信息
	exports.PostGetDomainsuffix = function  (domainsuffix_ids,domainsuffix_name,domainsuffix_name_href,domainsite_type,domainsite_org,domainsite_url) {
		this.kt_domainsuffix_ids = domainsuffix_ids;
		this.kt_domainsuffix_name = domainsuffix_name;
		this.kt_domainsuffix_name_href = domainsuffix_name_href;
		this.kt_domainsuffix_type = domainsite_type;
		this.kt_domainsuffix_org = domainsite_org;
		this.kt_domainsuffix_url = domainsite_url;
	};
	//domain页面获取域名后缀信息
	exports.PostGetProse = function  (id,dates,contents,titles) {
		this.kt_prose_ids = id;
		this.kt_prose_dates = kcool.format(dates);
		this.kt_prose_contents = contents;
		this.kt_prose_titles = titles;
	};
	//blogs页面文章详细
	exports.BlogsById = function  (blogs_ids,dates,contents,titles,stochastic_figure,tags_ids,year,yue,ri) {
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
	exports.BlogsByNext = function  (blogs_ids,dates,contents,titles,stochastic_figure,tags_ids,year,yue,ri) {
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
	exports.BlogsByPrev = function  (blogs_ids,dates,contents,titles,stochastic_figure,tags_ids,year,yue,ri) {
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
	//blogs页面详细页面返回目录
	exports.blogsByMenu = function  (blogs_ids,dates,contents,titles,stochastic_figure,tags_ids,year,yue,ri) {
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
	exports.PostCatalogue = function  (navigation_ids,navigation_name,navigation_url,nav_tag_ids,nav_tag_name) {
		this.kt_navigation_ids = navigation_ids;
		this.kt_navigation_name = navigation_name;
		this.kt_navigation_url = navigation_url;
		this.kt_nav_tag_ids = nav_tag_ids;
		this.kt_nav_tag_name = nav_tag_name;
	};
	exports.PostCatalogueTag = function  (nav_tag_ids,nav_tag_name) {
		this.kt_nav_tag_ids = nav_tag_ids;
		this.kt_nav_tag_name = nav_tag_name;
	};
}).call(this);
