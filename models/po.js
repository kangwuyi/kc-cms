var express = require('express')
,mysql = require('mysql')
,http = require('http');
var  queryDb = require('../db');		//加载db.js模块
mysql = queryDb.getMysqlConn();//加载db.js的getMysqlConn方法关联mysql数据库，并命名为mysql
var  objects = require('./object');
module.exports = objects;
var app = express();

objects.checkTag =  function  checkTag(tagName, callback) {
	var sql ="select * from k_tags where kt_tags_name='"+tagName+"' ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.AddTagName =  function  AddTagName(tagName, callback) {
	var sql ="INSERT INTO `k_tags` (`kt_tags_ids`, `kt_tags_name`) VALUES (NULL, '"+tagName+"'); ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.toAddBlog =  function  toAddBlog(blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent, callback) {
	var sql ="INSERT INTO `k_blogs` (`kt_blogs_ids`, `kt_blogs_titles`, `kt_tags_ids`, `kt_blogs_year`, `kt_blogs_yue`, `kt_blogs_ri`, `kt_blogs_dates`, `kt_blogs_contents`) VALUES (NULL, '"+blogTitle+"', '"+blogTagId+"', '"+blogYear+"', '"+blogYue+"', '"+blogRi+"', '"+blogDate+"', '"+blogContent+"'); ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.dateBackBlogId =  function  dateBackBlogId(blogDate, callback) {
	var sql ="select kt_blogs_ids from k_blogs where kt_blogs_dates='"+blogDate+"' ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.toAddRiqi =  function  toAddRiqi(dateRiqi,blogId, callback) {
	var sql ="INSERT INTO `k_riqi` (`kt_riqi_ids`, `kt_riqi_dates`, `kt_blogs_ids`) VALUES (NULL, '"+dateRiqi+"', '"+blogId+"'); ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.addProse =  function  addProse(proseTitle,proseDate,proseContent, callback) {
	var sql ="INSERT INTO `k_prose` (`kt_prose_ids`, `kt_prose_dates`, `kt_prose_titles`, `kt_prose_contents`) VALUES (NULL, '"+proseDate+"', '"+proseTitle+"', '"+proseContent+"'); ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.addCatalogueType =  function  addCatalogueType(catalogueTitle, callback) {
	var sql ="INSERT INTO `k_nav_tag` (`kt_nav_tag_ids`, `kt_nav_tag_name`) VALUES (NULL, '"+catalogueTitle+"'); ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.addCatalogue =  function  addCatalogue(catalogueTitle,catalogueUrl,catalogueTypeId,callback) {
	var sql ="INSERT INTO `k_navigation` (`kt_navigation_ids`, `kt_navigation_name`, `kt_navigation_url`, `kt_nav_tag_ids`) VALUES (NULL, '"+catalogueTitle+"', '"+catalogueUrl+"', '"+catalogueTypeId+"'); ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.addDomainNew =  function  addDomainNew(DomainNewTitle,DomainNewContent,callback) {
	var sql ="INSERT INTO `k_domainnew` (`kt_domainnew_ids`, `kt_domainnew_dates`, `kt_domainnew_contents`, `kt_domainnew_titles`) VALUES (NULL, NULL, '"+DomainNewTitle+"', '"+DomainNewContent+"'); ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.delBlogById =  function  delBlogById(blogs_ids,callback) {
	var sql ="DELETE FROM `kangcool`.`k_blogs` WHERE `k_blogs`.`kt_blogs_ids` = '"+blogs_ids+"' ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.delProseById =  function  delProseById(prose_ids,callback) {
	var sql ="DELETE FROM `kangcool`.`k_prose` WHERE `k_prose`.`kt_prose_ids` = '"+prose_ids+"' ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.delCatalogueById =  function  delCatalogueById(navigation_ids,callback) {
	var sql ="DELETE FROM `kangcool`.`k_navigation` WHERE `k_navigation`.`kt_navigation_ids` = '"+navigation_ids+"' ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.GetAllBlog =  function  GetAllBlog(err, callback) {
	var sql ="select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_dates,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name from k_blogs k,k_tags t where  k.kt_tags_ids=t.kt_tags_ids";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.toEditBlog =  function  toEditBlog(blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent, callback) {
	var sql ="UPDATE  `kangcool`.`k_blogs` SET  `kt_blogs_titles` =  '"+blogTitle+"',`kt_tags_ids` = '"+blogTagId+"', `kt_blogs_year` = '"+blogYear+"',`kt_blogs_yue` = '"+blogYue+"',`kt_blogs_ri` = '"+blogRi+"',`kt_blogs_dates` = '"+blogDate+"',`kt_blogs_contents` = '"+blogContent+"' WHERE  `k_blogs`.`kt_blogs_ids` ='"+blogId+"';";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.getProseById =  function  getProseById(prose_ids, callback) {
	var sql ="select * from k_prose where kt_prose_ids='"+prose_ids+"' ";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.toEditProse =  function  toEditProse(proseId,proseTitle,proseDate,proseContent, callback) {
	var sql ="UPDATE  `kangcool`.`k_prose` SET  `kt_prose_titles` =  '"+proseTitle+"',`kt_prose_dates` = '"+proseDate+"',`kt_prose_contents` = '"+proseContent+"' WHERE  `k_prose`.`kt_prose_ids` ='"+proseId+"';";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.getCatalogueById =  function  getCatalogueById(navigation_ids, callback) {
	var sql ="select n.kt_navigation_ids,n.kt_navigation_name,n.kt_navigation_url,n.kt_nav_tag_ids,na.kt_nav_tag_name from k_navigation n,k_nav_tag na where n.kt_nav_tag_ids = na.kt_nav_tag_ids and n.kt_navigation_ids='"+navigation_ids+"'";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};
objects.toEditCatalogue =  function  toEditCatalogue(catalogueId,catalogueTitle,catalogueUrl,catalogueTypeId, callback) {
	var sql ="UPDATE  `kangcool`.`k_navigation` SET  `kt_navigation_name` =  '"+catalogueTitle+"',`kt_navigation_url` = '"+catalogueUrl+"',`kt_nav_tag_ids` = '"+catalogueTypeId+"' WHERE  `k_navigation`.`kt_navigation_ids` ='"+catalogueId+"';";
	mysql.query(sql,function(err,rows,fields){
 		if(err){
			throw err;
		}else{
			callback(err,rows,fields);
        		}
    	});//mysql.end();
};