(function() {
	var mysqlString;

	mysqlString = {
		k_user: {
			getAllByName: function(username){
				return "select * from k_user where kt_user_name='"+username+"' ";
			},
            postUserInfo: function(userAffirmPwd,userName,userEmail){
                return "INSERT INTO `k_user` (`kt_user_ids`, `kt_user_name`, `kt_user_password`, `kt_user_email`) VALUES (NULL, '"+userName+"', '"+userAffirmPwd+"', '"+userEmail+"') ";
            }
		},
		k_isTag: {
            getIsNoteAllTag: function(isIf, publicUserId) {
                return "select t.kt_isTag_id,t.kt_isTag_name from k_isTag t where  t.kt_user_id='"+publicUserId+"' and t.kt_isNote_isIf='"+isIf+"'";
            },
            getIsNoteAllTag2: function(isIf, publicUserId) {
                return "select t.kt_isTag_id,t.kt_isTag2_id,t.kt_isTag2_name from k_isTag2 t where t.kt_user_id='"+publicUserId+"' and t.kt_isNote_isIf='"+isIf+"'";
            },
            loadIsNoteAllTag: function(err) {
                return "select * from k_isTag";
            },
            loadIsNoteAllTag2: function(err) {
                return "select * from k_isTag2";
            },
			PostTag: function(isIf, publicUserId, tagName) {
                return "select * from k_isTag where kt_user_id='"+publicUserId+"' and kt_isNote_isIf='"+isIf+"'";
            },
            getCheckTag: function(isIf, publicUserId, tagName){
				return "select * from k_isTag where  kt_user_id='"+publicUserId+"' and kt_isNote_isIf='"+isIf+"' and kt_isTag_name='"+tagName+"' ";
			},
			postAddTagName: function(isIf, publicUserId, tagName){
				return "INSERT INTO `k_isTag` (`kt_isTag_id`, `kt_isTag_name`, `kt_user_id`, `kt_isNote_isIf`) VALUES (NULL, '"+tagName+"', '"+publicUserId+"', '"+isIf+"') ";
			},
            getCheckTag2: function(tagId1,isIf, publicUserId, tagName){
                return "select * from k_isTag2 where  kt_user_id='"+publicUserId+"' and kt_isNote_isIf='"+isIf+"' and kt_isTag2_name='"+tagName+"' and kt_isTag_id='"+tagId1+"'";
            },
            postAddTagName2: function(tagId1,isIf, publicUserId, tagName){
                return "INSERT INTO `k_isTag2` (`kt_isTag2_id`,`kt_isTag_id`, `kt_isTag2_name`, `kt_user_id`, `kt_isNote_isIf`) VALUES (NULL, '"+tagId1+"', '"+tagName+"', '"+publicUserId+"', '"+isIf+"') ";
            }
		},
		k_isDate: {
			getAllDate: function(isIf, publicUserId) {
                return "select * from k_isDate where kt_user_id='"+publicUserId+"' and kt_isNote_isIf='"+isIf+"' group by kt_isDate_date;";
            },
			getBlogsByData_count_all_result: function(isIf, publicUserId, riqi_dates){
				return "select count(0) as count_all_result from k_isDate where  kt_isDate_date="+riqi_dates+" order by count_all_result desc;";
			},
			postAddRiqi: function(isIf, publicUserId, dateRiqi,blogId){
				return "INSERT INTO `k_isDate` (`kt_isDate_id`, `kt_isDate_date`, `kt_isNote_id`, `kt_user_id`, `kt_isNote_isIf`) VALUES (NULL, '"+dateRiqi+"', '"+blogId+"', '"+publicUserId+"', '"+isIf+"') ; ";
			},
			postDelBlogRiqiById: function(isIf, publicUserId, blogs_ids){
				return "DELETE FROM `kcool_v2`.`k_isDate` WHERE `k_isDate`.`kt_isNote_id` = '"+blogs_ids+"'and `k_isDate`.`kt_user_id`='"+publicUserId+"' and `k_isDate`.`kt_isNote_isIf`='"+isIf+"' ";
			},
			postUpdateRiqi: function(isIf, publicUserId, dateRiqi,blogId){
				return "UPDATE  `kcool_v2`.`k_isDate` SET  `kt_isDate_date` =  '"+dateRiqi+"' WHERE  `k_isDate`.`kt_isNote_id` ='"+blogId+"' and `k_isDate`.`kt_user_id`='"+publicUserId+"' and `k_isDate`.`kt_isNote_isIf`='"+isIf+"';";
			}
		},
        isTag_isNote: {
            getAllBlog:function(isIf, publicUserId) {
                return "select * from k_isNote k,k_isTag t where  k.kt_user_id='"+publicUserId+"' and k.kt_isNote_isIf='"+isIf+"' and  k.kt_isTag_id=t.kt_isTag_id";
            },
            getTags: function(isIf, publicUserId) {
                return "select b.kt_isTag_id,t.kt_isTag_name , count(0) as note_tag_num from k_isTag t,k_isNote b where  b.kt_user_id='"+publicUserId+"' and b.kt_isNote_isIf='"+isIf+"' and t.kt_isTag_id=b.kt_isTag_id  group by b.kt_isTag_id order by note_tag_num desc;";
            },
            getBlogsById: function(isIf, publicUserId, note_id){
				return "select * from k_isNote k, k_isTag t where k.kt_user_id='"+publicUserId+"' and k.kt_isNote_isIf='"+isIf+"' and k.kt_isTag_id = t.kt_isTag_id and  k.kt_isNote_id="+note_id;
			},
			getAll: function(isIf, publicUserId,isTag_id,isTag2_id, changePer_page,per_page){
				return "select * from k_isNote k,k_isTag t,k_isTag2 t2 where  k.kt_user_id='"+publicUserId+"' and k.kt_isNote_isIf='"+isIf+"' and k.kt_isTag_id='"+isTag_id+"' and t2.kt_isTag2_id = k.kt_isTag2_id and k.kt_isTag2_id='"+isTag2_id+"' and k.kt_isTag_id=t.kt_isTag_id order by k.kt_isTag_id desc limit "+changePer_page+" ,"+per_page;
			},
			getPageByTagId: function(isIf, publicUserId, tags_ids,changePer_page,per_page){
				return "select * from k_isNote k,k_isTag t where  k.kt_user_id='"+publicUserId+"' and k.kt_isNote_isIf='"+isIf+"' and k.kt_isTag_id="+tags_ids+" and k.kt_isTag_id=t.kt_isTag_id and k.kt_isTag_id!=0 order by k.kt_isTag_id desc limit "+changePer_page+" ,"+per_page;
			},
			getAppBlogByTag: function(isIf, publicUserId, tags_ids){
				return "select * from k_isNote k,k_isTag t where  k.kt_isTag_id="+tags_ids+" and k.kt_isTag_id=t.kt_isTag_id ";
			}
		},
        k_isNote: {
			getSorts_count_all_result: function(isIf, publicUserId,isTag_id,isTag2_id){
                return "select count(0) as count_all_result from k_isNote where kt_user_id='"+publicUserId+"' and kt_isNote_isIf='"+isIf+"' and kt_isTag_id='"+isTag_id+"' and kt_isTag2_id='"+isTag2_id+"' ";
            },
			getAllById_count_all_result: function(isIf, publicUserId, isTag_id){
				return "select count(0) as count_all_result from k_isNote where kt_user_id='"+publicUserId+"' and kt_isNote_isIf='"+isIf+"' and kt_isTag_id="+isTag_id+" order by count_all_result desc;";
			},
			getBlogsByNext: function(isIf, publicUserId, blogs_ids,tags_ids,tags2_ids){
				return "select * from k_isNote where  kt_user_id='"+publicUserId+"' and kt_isNote_isIf='"+isIf+"' and  kt_isTag_id = "+tags_ids+ " and  kt_isTag2_id = "+tags2_ids+ " and kt_isNote_id > "+blogs_ids+ "  ORDER BY kt_isNote_id ASC LIMIT 1 ";
			},
			getBlogsByPrev: function(isIf, publicUserId, blogs_ids,tags_ids,tags2_ids){
				return "select * from k_isNote where  kt_user_id='"+publicUserId+"' and kt_isNote_isIf='"+isIf+"' and kt_isTag_id = "+tags_ids+" and  kt_isTag2_id = "+tags2_ids+ " and kt_isNote_id < "+blogs_ids+"  ORDER BY kt_isNote_id DESC LIMIT 1";
			},
			getDateBackBlogId: function(isIf, publicUserId, blogDate){
				return "select kt_isNote_id from k_isNote where  kt_user_id='"+publicUserId+"' and kt_isNote_isIf='"+isIf+"' and kt_isNote_date='"+blogDate+"' ";
			},
			postAddBlog: function(isIf, publicUserId, blogTitle, blogTagId,blogTagId2,blogDate,blogContent){
				return "INSERT INTO `k_isNote` (`kt_isNote_id`, `kt_isNote_title`, `kt_isTag_id`, `kt_isTag2_id`,`kt_isNote_date`, `kt_isNote_content`,`kt_user_id`,`kt_isNote_isIf`) VALUES (NULL, '"+blogTitle+"', '"+blogTagId+"', '"+blogTagId2+"',  '"+blogDate+"', '"+blogContent+"', '"+publicUserId+"', '"+isIf+"');";
			},
			postDelBlogById: function(isIf, publicUserId, blogs_ids){
				return "DELETE FROM `kcool_v2`.`k_isNote` WHERE `k_isNote`.`kt_isNote_id` = '"+blogs_ids+"' and `k_isNote`.`kt_user_id` = '"+publicUserId+"' and `k_isNote`.`kt_isNote_isIf` = '"+isIf+"'";
			},
			postEditBlog: function(isIf, publicUserId, blogId,blogTitle, blogTagId,blogTagId2,blogDate,blogContent){
				return "UPDATE  `kcool_v2`.`k_isNote` SET  `kt_isNote_title` =  '"+blogTitle+"',`kt_isTag_id` = '"+blogTagId+"', `kt_isTag2_id` = '"+blogTagId2+"',`kt_isNote_date` = '"+blogDate+"',`kt_isNote_content` = '"+blogContent+"' WHERE  `k_isNote`.`kt_isNote_id` ='"+blogId+"'and `k_isNote`.`kt_user_id`='"+publicUserId+"' and `k_isNote`.`kt_isNote_isIf`='"+isIf+"';";
			},
            getAll: function(isIf, publicUserId, changePer_page,per_page){
                return "select * from k_translates order by kt_translates_ids desc limit "+changePer_page+" ,"+per_page;
            },
            getTranslatesById: function(translatesId){
                return "select * from k_translates where kt_translates_ids='"+translatesId+"' ";
            },
            getTranslatesByNext: function(translatesId){
                return "select * from k_translates where kt_translates_ids > "+translatesId+ "  ORDER BY kt_translates_ids ASC LIMIT 1 ";
            },
            getTranslatesByPrev: function(translatesId){
                return "select * from k_translates where kt_translates_ids < "+translatesId+"  ORDER BY kt_translates_ids DESC LIMIT 1";
            },
            postAddTranslateNew: function(date,content,title,country,author,url,introduction,year,yue,ri,img,tag){
                return "INSERT INTO  `kcool_v2`.`k_translates` (`kt_translates_ids` ,`kt_translates_dates` ,`kt_translates_contents` ,`kt_translates_titles` ,`kt_translates_country` ,`kt_translates_author` ,`kt_translates_url` ,`kt_translates_introduction` ,`kt_translates_year` ,`kt_translates_yue` ,`kt_translates_ri` ,`kt_translates_img` ,`kt_translates_tags`,`kt_user_id`,`kt_isNote_isIf`) VALUES (NULL ,'"+date+"','"+content+"','"+title+"','"+country+"','"+author+"','"+url+"','"+introduction+"','"+year+"','"+yue+"','"+ri+"','"+img+"','"+tag+"', '"+publicUserId+"', '"+isIf+"' );";
            },
            postToEditTranslate: function(translateId,date,content,title,country,author,url,introduction,year,yue,ri,img,tag){
                return "UPDATE  `kcool_v2`.`k_translates` SET  `kt_translates_dates` =  '"+date+"',`kt_translates_contents` =  '"+content+"',`kt_translates_titles` =  '"+title+"',`kt_translates_country` =  '"+country+"',`kt_translates_author` =  '"+author+"',`kt_translates_url` =  '"+url+"',`kt_translates_introduction` =  '"+introduction+"',`kt_translates_year` =  '"+year+"',`kt_translates_yue` =  '"+yue+"',`kt_translates_ri` =  '"+ri+"',`kt_translates_img` =  '"+img+"',`kt_translates_tags` =  '"+tag+"' WHERE  `k_translates`.`kt_translates_ids` ='"+translateId+"';";
            },
            postDelTranslateById : function(translateId){
                return "DELETE FROM `kcool_v2`.`k_translates` WHERE `k_translates`.`kt_translates_ids` = '"+translateId+"' ";
            }
		},
        isTag_isNote_isDate: {
			getPageByData: function(isIf, publicUserId, riqi_dates,changePer_page,per_page){
				return "select * from k_isNote k,k_isTag t ,k_isDate r where r.kt_user_id='"+publicUserId+"' and r.kt_isNote_isIf='"+isIf+"' and r.kt_isDate_date="+riqi_dates+" and k.kt_isTag_id=t.kt_isTag_id and k.kt_isNote_id=r.kt_isNote_id order by r.kt_isDate_date desc limit "+changePer_page+" ,"+per_page;
			},
			getAppBlogByData: function(isIf, publicUserId, riqi_dates){
				return "select k.kt_isNote_title,k.kt_isNote_content,k.kt_isNote_date,k.kt_isNote_year,k.kt_isNote_month,k.kt_isNote_day,k.kt_isNote_id,k.kt_isTag_id,t.kt_isTag_name from k_isNote k,k_isTag t ,k_isDate r where  r.kt_isDate_date='"+riqi_dates+"' and k.kt_isTag_id=t.kt_isTag_id and k.kt_isNote_id=r.kt_isNote_id ";
			}
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
				return "UPDATE  `kcool_v2`.`k_prose` SET  `kt_prose_titles` =  '"+proseTitle+"',`kt_prose_dates` = '"+proseDate+"',`kt_prose_contents` = '"+proseContent+"' WHERE  `k_prose`.`kt_prose_ids` ='"+proseId+"';";
			},
			postDelProseById: function(prose_ids){
				return "DELETE FROM `kcool_v2`.`k_prose` WHERE `k_prose`.`kt_prose_ids` = '"+prose_ids+"' ";
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
				return "UPDATE  `kcool_v2`.`k_navigation` SET  `kt_navigation_name` =  '"+catalogueTitle+"',`kt_navigation_url` = '"+catalogueUrl+"',`kt_nav_tag_ids` = '"+catalogueTypeId+"' WHERE  `k_navigation`.`kt_navigation_ids` ='"+catalogueId+"';";
			},
			postDelCatalogueById: function(navigation_ids){
				return "DELETE FROM `kcool_v2`.`k_navigation` WHERE `k_navigation`.`kt_navigation_ids` = '"+navigation_ids+"' ";
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
	};

	module.exports = mysqlString;

}).call(this);