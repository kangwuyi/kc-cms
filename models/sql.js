(function() {
	var mysqlString;

	mysqlString = {
		k_user: {
			getAllByName: function(username){
				return "select kt_user_ids, kt_user_name,kt_user_password from k_user where kt_user_name='"+username+"' ";
			},
		},
		k_tags: {
			getCheckTag: function(tagName){
				return "select * from k_tags where kt_tags_name='"+tagName+"' ";
			},
			postAddTagName: function(tagName){
				return "INSERT INTO `k_tags` (`kt_tags_ids`, `kt_tags_name`) VALUES (NULL, '"+tagName+"'); ";
			},
		},
		k_riqi: {
			getAllRiqi: "select kt_riqi_dates from k_riqi group by kt_riqi_dates;",
			getBlogsByData_count_all_result: function(riqi_dates){
				return "select count(0) as count_all_result from k_riqi where  kt_riqi_dates="+riqi_dates+" order by count_all_result desc;";
			},
			postAddRiqi: function(dateRiqi,blogId){
				return "INSERT INTO `k_riqi` (`kt_riqi_ids`, `kt_riqi_dates`, `kt_blogs_ids`) VALUES (NULL, '"+dateRiqi+"', '"+blogId+"'); ";
			},
			postDelBlogRiqiById: function(blogs_ids){
				return "DELETE FROM `kangcool`.`k_riqi` WHERE `k_riqi`.`kt_blogs_ids` = '"+blogs_ids+"' ";
			},
		},
		k_prose: {
			getProse: "select * from k_prose",
			getProseById: function(prose_ids){
				return "select * from k_prose where kt_prose_ids='"+prose_ids+"' ";
			},
			postAddProse: function(proseTitle,proseDate,proseContent){
				return "INSERT INTO `k_prose` (`kt_prose_ids`, `kt_prose_dates`, `kt_prose_titles`, `kt_prose_contents`) VALUES (NULL, '"+proseDate+"', '"+proseTitle+"', '"+proseContent+"'); ";
			},
			postEditProse: function(proseId,proseTitle,proseDate,proseContent){
				return "UPDATE  `kangcool`.`k_prose` SET  `kt_prose_titles` =  '"+proseTitle+"',`kt_prose_dates` = '"+proseDate+"',`kt_prose_contents` = '"+proseContent+"' WHERE  `k_prose`.`kt_prose_ids` ='"+proseId+"';";
			},
			postDelProseById: function(prose_ids){
				return "DELETE FROM `kangcool`.`k_prose` WHERE `k_prose`.`kt_prose_ids` = '"+prose_ids+"' ";
			},
		},
		k_nav_tag: {
			getCatalogueTag: "select kt_nav_tag_ids,kt_nav_tag_name from k_nav_tag",
			postAddCatalogueType: function(catalogueTitle){
				return "INSERT INTO `k_nav_tag` (`kt_nav_tag_ids`, `kt_nav_tag_name`) VALUES (NULL, '"+catalogueTitle+"'); ";
			},
		},
		k_domainsite: {
			getDomainsite: "select * from k_domainsite",
		},
		k_domainsuffix: {
			getDomainsuffix: "select * from k_domainsuffix",
		},
		k_navigation: {
			postAddCatalogue: function(catalogueTitle,catalogueUrl,catalogueTypeId){
				return "INSERT INTO `k_navigation` (`kt_navigation_ids`, `kt_navigation_name`, `kt_navigation_url`, `kt_nav_tag_ids`) VALUES (NULL, '"+catalogueTitle+"', '"+catalogueUrl+"', '"+catalogueTypeId+"'); ";
			},
			postEditCatalogue: function(catalogueId,catalogueTitle,catalogueUrl,catalogueTypeId){
				return "UPDATE  `kangcool`.`k_navigation` SET  `kt_navigation_name` =  '"+catalogueTitle+"',`kt_navigation_url` = '"+catalogueUrl+"',`kt_nav_tag_ids` = '"+catalogueTypeId+"' WHERE  `k_navigation`.`kt_navigation_ids` ='"+catalogueId+"';";
			},
			postDelCatalogueById: function(navigation_ids){
				return "DELETE FROM `kangcool`.`k_navigation` WHERE `k_navigation`.`kt_navigation_ids` = '"+navigation_ids+"' ";
			},
		},
		k_navigation_k_nav_tag: {
			getCatalogue: "select n.kt_navigation_ids,n.kt_navigation_name,n.kt_navigation_url,n.kt_nav_tag_ids,na.kt_nav_tag_name from k_navigation n,k_nav_tag na where n.kt_nav_tag_ids = na.kt_nav_tag_ids",
			getCatalogueById: function(navigation_ids){
				return "select n.kt_navigation_ids,n.kt_navigation_name,n.kt_navigation_url,n.kt_nav_tag_ids,na.kt_nav_tag_name from k_navigation n,k_nav_tag na where n.kt_nav_tag_ids = na.kt_nav_tag_ids and n.kt_navigation_ids='"+navigation_ids+"'";
			},
			getAppCatalogueType: function(nav_tag_ids){
				return "select n.kt_navigation_ids,n.kt_navigation_name,n.kt_navigation_url,n.kt_nav_tag_ids,na.kt_nav_tag_name from k_navigation n,k_nav_tag na where n.kt_nav_tag_ids = na.kt_nav_tag_ids and na.kt_nav_tag_ids='"+nav_tag_ids+"'";
			},
		},
		k_domainnew: {
			postAddDomainNew: function(DomainNewTitle,DomainNewContent){
				return "INSERT INTO `k_domainnew` (`kt_domainnew_ids`, `kt_domainnew_dates`, `kt_domainnew_contents`, `kt_domainnew_titles`) VALUES (NULL, NULL, '"+DomainNewTitle+"', '"+DomainNewContent+"'); ";
			},
		},
		k_tags_k_blogs: {
			getAllBlog: "select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_dates,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name from k_blogs k,k_tags t where  k.kt_tags_ids=t.kt_tags_ids",
			getTags: "select b.kt_tags_ids,t.kt_tags_name , count(0) as blogs_tags_num from k_tags t,k_blogs b where t.kt_tags_ids=b.kt_tags_ids  group by b.kt_tags_ids order by blogs_tags_num desc;",
			getBlogsById: function(blogs_ids){
				return "select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri  from k_blogs k, k_tags t where k.kt_tags_ids = t.kt_tags_ids and  k.kt_blogs_ids="+blogs_ids;
			},
			getAll: function(changePer_page,per_page){
				return "select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_dates,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name from k_blogs k,k_tags t   where k.kt_tags_ids=t.kt_tags_ids order by k.kt_tags_ids desc limit "+changePer_page+" ,"+per_page;
			},
			getPageByTagId: function(tags_ids,changePer_page,per_page){
				return "select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_dates,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name from k_blogs k,k_tags t where  k.kt_tags_ids="+tags_ids+" and k.kt_tags_ids=t.kt_tags_ids and k.kt_tags_ids!=0 order by k.kt_tags_ids desc limit "+changePer_page+" ,"+per_page;
			},
			getAppBlogByTag: function(tags_ids){
				return "select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_dates,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name from k_blogs k,k_tags t where  k.kt_tags_ids="+tags_ids+" and k.kt_tags_ids=t.kt_tags_ids ";
			},
		},
		k_blogs: {
			getSorts_count_all_result: "select count(0) as count_all_result from k_blogs ;",
			getBlogsById_count_all_result: function(blogs_ids){
				return "select count(0) as count_all_result from k_blogs where kt_tags_ids="+blogs_ids+" order by count_all_result desc;";
			},
			getBlogsByNext: function(blogs_ids,tags_ids){
				return "select kt_blogs_titles,kt_blogs_contents,kt_blogs_ids,kt_tags_ids from k_blogs where kt_tags_ids = "+tags_ids+ " and kt_blogs_ids > "+blogs_ids+ "  ORDER BY kt_blogs_ids ASC LIMIT 1 ";
			},
			getBlogsByPrev: function(blogs_ids,tags_ids){
				return "select kt_blogs_titles,kt_blogs_contents,kt_blogs_ids,kt_tags_ids from k_blogs where kt_tags_ids = "+tags_ids+" and kt_blogs_ids < "+blogs_ids+"  ORDER BY kt_blogs_ids DESC LIMIT 1";
			},
			getDateBackBlogId: function(blogDate){
				return "select kt_blogs_ids from k_blogs where kt_blogs_dates='"+blogDate+"' ";
			},
			postAddBlog: function(blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent){
				return "INSERT INTO `k_blogs` (`kt_blogs_ids`, `kt_blogs_titles`, `kt_tags_ids`, `kt_blogs_year`, `kt_blogs_yue`, `kt_blogs_ri`, `kt_blogs_dates`, `kt_blogs_contents`) VALUES (NULL, '"+blogTitle+"', '"+blogTagId+"', '"+blogYear+"', '"+blogYue+"', '"+blogRi+"', '"+blogDate+"', '"+blogContent+"'); ";
			},
			postDelBlogById: function(blogs_ids){
				return "DELETE FROM `kangcool`.`k_blogs` WHERE `k_blogs`.`kt_blogs_ids` = '"+blogs_ids+"' ";
			},
			postEditBlog: function(blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent){
				return "UPDATE  `kangcool`.`k_blogs` SET  `kt_blogs_titles` =  '"+blogTitle+"',`kt_tags_ids` = '"+blogTagId+"', `kt_blogs_year` = '"+blogYear+"',`kt_blogs_yue` = '"+blogYue+"',`kt_blogs_ri` = '"+blogRi+"',`kt_blogs_dates` = '"+blogDate+"',`kt_blogs_contents` = '"+blogContent+"' WHERE  `k_blogs`.`kt_blogs_ids` ='"+blogId+"';";
			},
		},
		k_tags_k_blogs_k_riqi: {
			getPageByData: function(riqi_dates,changePer_page,per_page){
				return "select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_dates,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name from k_blogs k,k_tags t ,k_riqi r where  r.kt_riqi_dates="+riqi_dates+" and k.kt_tags_ids=t.kt_tags_ids and k.kt_blogs_ids=r.kt_blogs_ids order by r.kt_riqi_dates desc limit "+changePer_page+" ,"+per_page;
			},
			getAppBlogByData: function(riqi_dates){
				return "select k.kt_blogs_titles,k.kt_blogs_contents,k.kt_blogs_dates,k.kt_blogs_year,k.kt_blogs_yue,k.kt_blogs_ri,k.kt_blogs_ids,k.kt_tags_ids,t.kt_tags_name from k_blogs k,k_tags t ,k_riqi r where  r.kt_riqi_dates='"+riqi_dates+"' and k.kt_tags_ids=t.kt_tags_ids and k.kt_blogs_ids=r.kt_blogs_ids ";
			},
		},
	};

	module.exports = mysqlString;

}).call(this);