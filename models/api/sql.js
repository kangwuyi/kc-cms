(function() {
	var mysqlString;

	mysqlString = {
		k_user: {
			getAllByName: function(username){
				return "select kt_user_ids, kt_user_name,kt_user_password from k_user where kt_user_name='"+username+"' ";
			},
		},
		k_tags: {
			PostBlogsTag: "select * from k_tags",
			getCheckTag: function(tagName){
				return "select * from k_tags where kt_tags_name='"+tagName+"' ";
			},
			postAddTagName: function(tagName){
				return "INSERT INTO `k_tags` (`kt_tags_ids`, `kt_tags_name`) VALUES (NULL, '"+tagName+"'); ";
			},
		},
		k_note_tags: {
			PostNotesTag: "select * from k_note_tags",
			getCheckTag: function(tagName){
				return "select * from k_note_tags where kt_note_tags_name='"+tagName+"' ";
			},
			postAddTagName: function(tagName){
				return "INSERT INTO `k_note_tags` (`kt_note_tags_ids`, `kt_note_tags_name`) VALUES (NULL, '"+tagName+"'); ";
			},
		},
		k_feel_tags: {
			PostFeelsTag: "select * from k_feel_tags",
			getCheckTag: function(tagName){
				return "select * from k_feel_tags where kt_feel_tags_name='"+tagName+"' ";
			},
			postAddTagName: function(tagName){
				return "INSERT INTO `k_feel_tags` (`kt_feel_tags_ids`, `kt_feel_tags_name`) VALUES (NULL, '"+tagName+"'); ";
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
				return "DELETE FROM `kcool`.`k_riqi` WHERE `k_riqi`.`kt_blogs_ids` = '"+blogs_ids+"' ";
			},
			postUpdateRiqi: function(dateRiqi,blogId){
				return "UPDATE  `kcool`.`k_riqi` SET  `kt_riqi_dates` =  '"+dateRiqi+"' WHERE  `k_riqi`.`kt_blogs_ids` ='"+blogId+"';";
			},
		},
		k_note_riqi: {
			getAllRiqi: "select kt_note_riqi_dates from k_note_riqi group by kt_note_riqi_dates;",
			getNoteByData_count_all_result: function(riqiDates){
				return "select count(0) as count_all_result from k_note_riqi where  kt_note_riqi_dates="+riqiDates+" order by count_all_result desc;";
			},
			postAddNoteRiqi: function(dateRiqi,notesId){
				return "INSERT INTO `k_note_riqi` (`kt_note_riqi_ids`, `kt_note_riqi_dates`, `kt_notes_ids`) VALUES (NULL, '"+dateRiqi+"', '"+notesId+"'); ";
			},
			postDelNoteRiqiById: function(notesId){
				return "DELETE FROM `kcool`.`k_note_riqi` WHERE `k_note_riqi`.`kt_notes_ids` = '"+notesId+"' ";
			},
			postUpdateNoteRiqi: function(dateRiqi,blogId){
				return "UPDATE  `kcool`.`k_note_riqi` SET  `kt_note_riqi_dates` =  '"+dateRiqi+"' WHERE  `k_note_riqi`.`kt_notes_ids` ='"+blogId+"';";
			},
		},
		k_feel_riqi: {
			getAllRiqi: "select kt_feel_riqi_dates from k_feel_riqi group by kt_feel_riqi_dates;",
			getFeelsByData_count_all_result: function(riqi_dates){
				return "select count(0) as count_all_result from k_feel_riqi where  kt_feel_riqi_dates="+riqi_dates+" order by count_all_result desc;";
			},
			postAddFeelRiqi: function(dateRiqi,blogId){
				return "INSERT INTO `k_feel_riqi` (`kt_feel_riqi_ids`, `kt_feel_riqi_dates`, `kt_feels_ids`) VALUES (NULL, '"+dateRiqi+"', '"+blogId+"'); ";
			},
			postDelFeelRiqiById: function(blogs_ids){
				return "DELETE FROM `kcool`.`k_feel_riqi` WHERE `k_feel_riqi`.`kt_feels_ids` = '"+blogs_ids+"' ";
			},
			postUpdateFeelRiqi: function(dateRiqi,blogId){
				return "UPDATE  `kcool`.`k_feel_riqi` SET  `kt_feel_riqi_dates` =  '"+dateRiqi+"' WHERE  `k_feel_riqi`.`kt_feels_ids` ='"+blogId+"';";
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
		k_note_tags_k_notes: {
			getAllNote: "select k.kt_notes_titles,k.kt_notes_contents,k.kt_notes_dates,k.kt_notes_year,k.kt_notes_yue,k.kt_notes_ri,k.kt_notes_ids,k.kt_note_tags_ids,t.kt_note_tags_name from k_notes k,k_note_tags t where  k.kt_note_tags_ids=t.kt_note_tags_ids",
			getTags: "select b.kt_note_tags_ids,t.kt_note_tags_name , count(0) as notes_tags_num from k_note_tags t,k_notes b where t.kt_note_tags_ids=b.kt_note_tags_ids  group by b.kt_note_tags_ids order by notes_tags_num desc;",
			getNotesById: function(notes_ids){
				return "select k.kt_notes_titles,k.kt_notes_contents,k.kt_notes_ids,k.kt_note_tags_ids,t.kt_note_tags_name,k.kt_notes_year,k.kt_notes_yue,k.kt_notes_ri  from k_notes k, k_note_tags t where k.kt_note_tags_ids = t.kt_note_tags_ids and  k.kt_notes_ids="+notes_ids;
			},
			getAll: function(changePer_page,per_page){
				return "select k.kt_notes_titles,k.kt_notes_contents,k.kt_notes_dates,k.kt_notes_year,k.kt_notes_yue,k.kt_notes_ri,k.kt_notes_ids,k.kt_note_tags_ids,t.kt_note_tags_name from k_notes k,k_note_tags t   where k.kt_note_tags_ids=t.kt_note_tags_ids order by k.kt_note_tags_ids desc limit "+changePer_page+" ,"+per_page;
			},
			getPageByNoteTagId: function(tags_ids,changePer_page,per_page){
				return "select k.kt_notes_titles,k.kt_notes_contents,k.kt_notes_dates,k.kt_notes_year,k.kt_notes_yue,k.kt_notes_ri,k.kt_notes_ids,k.kt_note_tags_ids,t.kt_note_tags_name from k_notes k,k_note_tags t where  k.kt_note_tags_ids="+tags_ids+" and k.kt_note_tags_ids=t.kt_note_tags_ids and k.kt_note_tags_ids!=0 order by k.kt_note_tags_ids desc limit "+changePer_page+" ,"+per_page;
			},
			getAppNoteByTag: function(tags_ids){
				return "select k.kt_notes_titles,k.kt_notes_contents,k.kt_notes_dates,k.kt_notes_year,k.kt_notes_yue,k.kt_notes_ri,k.kt_notes_ids,k.kt_note_tags_ids,t.kt_note_tags_name from k_notes k,k_note_tags t where  k.kt_note_tags_ids="+tags_ids+" and k.kt_note_tags_ids=t.kt_note_tags_ids ";
			},
		},
		k_feel_tags_k_feels: {
			getAllFeel: "select k.kt_feels_titles,k.kt_feels_contents,k.kt_feels_dates,k.kt_feels_year,k.kt_feels_yue,k.kt_feels_ri,k.kt_feels_ids,k.kt_feel_tags_ids,t.kt_feel_tags_name from k_feels k,k_feel_tags t where  k.kt_feel_tags_ids=t.kt_feel_tags_ids",
			getTags: "select b.kt_feel_tags_ids,t.kt_feel_tags_name , count(0) as feels_tags_num from k_feel_tags t,k_feels b where t.kt_feel_tags_ids=b.kt_feel_tags_ids  group by b.kt_feel_tags_ids order by feels_tags_num desc;",
			getFeelsById: function(feels_ids){
				return "select k.kt_feels_titles,k.kt_feels_contents,k.kt_feels_ids,k.kt_feel_tags_ids,t.kt_feel_tags_name,k.kt_feels_year,k.kt_feels_yue,k.kt_feels_ri  from k_feels k, k_feel_tags t where k.kt_feel_tags_ids = t.kt_feel_tags_ids and  k.kt_feels_ids="+feels_ids;
			},
			getAll: function(changePer_page,per_page){
				return "select k.kt_feels_titles,k.kt_feels_contents,k.kt_feels_dates,k.kt_feels_year,k.kt_feels_yue,k.kt_feels_ri,k.kt_feels_ids,k.kt_feel_tags_ids,t.kt_feel_tags_name from k_feels k,k_feel_tags t   where k.kt_feel_tags_ids=t.kt_feel_tags_ids order by k.kt_feel_tags_ids desc limit "+changePer_page+" ,"+per_page;
			},
			getPageByFeelTagId: function(tags_ids,changePer_page,per_page){
				return "select k.kt_feels_titles,k.kt_feels_contents,k.kt_feels_dates,k.kt_feels_year,k.kt_feels_yue,k.kt_feels_ri,k.kt_feels_ids,k.kt_feel_tags_ids,t.kt_feel_tags_name from k_feels k,k_feel_tags t where  k.kt_feel_tags_ids="+tags_ids+" and k.kt_feel_tags_ids=t.kt_feel_tags_ids and k.kt_feel_tags_ids!=0 order by k.kt_feel_tags_ids desc limit "+changePer_page+" ,"+per_page;
			},
			getAppFeelByTag: function(tags_ids){
				return "select k.kt_feels_titles,k.kt_feels_contents,k.kt_feels_dates,k.kt_feels_year,k.kt_feels_yue,k.kt_feels_ri,k.kt_feels_ids,k.kt_feel_tags_ids,t.kt_feel_tags_name from k_feels k,k_feel_tags t where  k.kt_feel_tags_ids="+tags_ids+" and k.kt_feel_tags_ids=t.kt_feel_tags_ids ";
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
				return "DELETE FROM `kcool`.`k_blogs` WHERE `k_blogs`.`kt_blogs_ids` = '"+blogs_ids+"' ";
			},
			postEditBlog: function(blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent){
				return "UPDATE  `kcool`.`k_blogs` SET  `kt_blogs_titles` =  '"+blogTitle+"',`kt_tags_ids` = '"+blogTagId+"', `kt_blogs_year` = '"+blogYear+"',`kt_blogs_yue` = '"+blogYue+"',`kt_blogs_ri` = '"+blogRi+"',`kt_blogs_dates` = '"+blogDate+"',`kt_blogs_contents` = '"+blogContent+"' WHERE  `k_blogs`.`kt_blogs_ids` ='"+blogId+"';";
			},
		},
		k_notes: {
			getSorts_count_all_result: "select count(0) as count_all_result from k_notes ;",
			getNotesById_count_all_result: function(tags_ids){
				return "select count(0) as count_all_result from k_notes where kt_note_tags_ids="+tags_ids+" order by count_all_result desc;";
			},
			getNotesByNext: function(notesId,tagsIds){
				return "select kt_notes_titles,kt_notes_contents,kt_notes_ids,kt_note_tags_ids from k_notes where kt_note_tags_ids = "+tagsIds+ " and kt_notes_ids > "+notesId+ "  ORDER BY kt_notes_ids ASC LIMIT 1 ";
			},
			getNotesByPrev: function(notesId,tags_ids){
				return "select kt_notes_titles,kt_notes_contents,kt_notes_ids,kt_note_tags_ids from k_notes where kt_note_tags_ids = "+tagsIds+" and kt_notes_ids < "+notesId+"  ORDER BY kt_notes_ids DESC LIMIT 1";
			},
			getDateBackNoteId: function(noteDate){
				return "select kt_notes_ids from k_notes where kt_notes_dates='"+noteDate+"' ";
			},
			postAddNote: function(noteTitle, noteTagId,noteYear,noteYue,noteRi,noteDate,noteContent){
				return "INSERT INTO `k_notes` (`kt_notes_ids`, `kt_notes_titles`, `kt_note_tags_ids`, `kt_notes_year`, `kt_notes_yue`, `kt_notes_ri`, `kt_notes_dates`, `kt_notes_contents`) VALUES (NULL, '"+noteTitle+"', '"+noteTagId+"', '"+noteYear+"', '"+noteYue+"', '"+noteRi+"', '"+noteDate+"', '"+noteContent+"'); ";
			},
			postDelNoteById: function(notesId){
				return "DELETE FROM `kcool`.`k_notes` WHERE `k_notes`.`kt_notes_ids` = '"+notesId+"' ";
			},
			postEditNote: function(noteId,noteTitle, noteTagId,noteYear,noteYue,noteRi,noteDate,noteContent){
				return "UPDATE  `kcool`.`k_notes` SET  `kt_notes_titles` =  '"+noteTitle+"',`kt_note_tags_ids` = '"+noteTagId+"', `kt_notes_year` = '"+noteYear+"',`kt_notes_yue` = '"+noteYue+"',`kt_notes_ri` = '"+noteRi+"',`kt_notes_dates` = '"+noteDate+"',`kt_notes_contents` = '"+noteContent+"' WHERE  `k_notes`.`kt_notes_ids` ='"+noteId+"';";
			},
		},
		k_feels: {
			getSorts_count_all_result: "select count(0) as count_all_result from k_feels ;",
			getFeelsById_count_all_result: function(feelsTagsId){
				return "select count(0) as count_all_result from k_feels where kt_feel_tags_ids="+feelsTagsId+" order by count_all_result desc;";
			},
			getFeelsByNext: function(feelsId,tagsIds){
				return "select kt_feels_titles,kt_feels_contents,kt_feels_ids,kt_feel_tags_ids from k_feels where kt_feel_tags_ids = "+tagsIds+ " and kt_feels_ids > "+feelsId+ "  ORDER BY kt_feels_ids ASC LIMIT 1 ";
			},
			getFeelsByPrev: function(feelsId,tagsIds){
				return "select kt_feels_titles,kt_feels_contents,kt_feels_ids,kt_feel_tags_ids from k_feels where kt_feel_tags_ids = "+tagsIds+" and kt_feels_ids < "+feelsId+"  ORDER BY kt_feels_ids DESC LIMIT 1";
			},
			getDateBackFeelId: function(feelDate){
				return "select kt_feels_ids from k_feels where kt_feels_dates='"+feelDate+"' ";
			},
			postAddFeel: function(feelTitle, feelTagId,feelYear,feelYue,feelRi,feelDate,feelContent){
				return "INSERT INTO `k_feels` (`kt_feels_ids`, `kt_feels_titles`, `kt_feel_tags_ids`, `kt_feels_year`, `kt_feels_yue`, `kt_feels_ri`, `kt_feels_dates`, `kt_feels_contents`) VALUES (NULL, '"+feelTitle+"', '"+feelTagId+"', '"+feelYear+"', '"+feelYue+"', '"+feelRi+"', '"+feelDate+"', '"+feelContent+"'); ";
			},
			postDelFeelById: function(feelsId){
				return "DELETE FROM `kcool`.`k_feels` WHERE `k_feels`.`kt_feels_ids` = '"+feelsId+"' ";
			},
			postEditFeel: function(feelId,feelTitle, feelTagId,feelYear,feelYue,feelRi,feelDate,feelContent){
				return "UPDATE  `kcool`.`k_feels` SET  `kt_feels_titles` =  '"+feelTitle+"',`kt_feel_tags_ids` = '"+feelTagId+"', `kt_feels_year` = '"+feelYear+"',`kt_feels_yue` = '"+feelYue+"',`kt_feels_ri` = '"+feelRi+"',`kt_feels_dates` = '"+feelDate+"',`kt_feels_contents` = '"+feelContent+"' WHERE  `k_feels`.`kt_feels_ids` ='"+feelId+"';";
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
		k_note_tags_k_notes_k_note_riqi: {
			getPageByData: function(riqi_dates,changePer_page,per_page){
				return "select k.kt_notes_titles,k.kt_notes_contents,k.kt_notes_dates,k.kt_notes_year,k.kt_notes_yue,k.kt_notes_ri,k.kt_notes_ids,k.kt_note_tags_ids,t.kt_note_tags_name from k_notes k,k_note_tags t ,k_note_riqi r where  r.kt_note_riqi_dates="+riqi_dates+" and k.kt_note_tags_ids=t.kt_note_tags_ids and k.kt_notes_ids=r.kt_notes_ids order by r.kt_note_riqi_dates desc limit "+changePer_page+" ,"+per_page;
			},
			getAppNoteByData: function(riqi_dates){
				return "select k.kt_notes_titles,k.kt_notes_contents,k.kt_notes_dates,k.kt_notes_year,k.kt_notes_yue,k.kt_notes_ri,k.kt_notes_ids,k.kt_note_tags_ids,t.kt_note_tags_name from k_notes k,k_note_tags t ,k_note_riqi r where  r.kt_note_riqi_dates='"+riqi_dates+"' and k.kt_note_tags_ids=t.kt_note_tags_ids and k.kt_notes_ids=r.kt_notes_ids ";
			},
		},
		k_feel_tags_k_feels_k_feel_riqi: {
			getPageByData: function(riqi_dates,changePer_page,per_page){
				return "select k.kt_feels_titles,k.kt_feels_contents,k.kt_feels_dates,k.kt_feels_year,k.kt_feels_yue,k.kt_feels_ri,k.kt_feels_ids,k.kt_feel_tags_ids,t.kt_feel_tags_name from k_feels k,k_feel_tags t ,k_feel_riqi r where  r.kt_feel_riqi_dates="+riqi_dates+" and k.kt_feel_tags_ids=t.kt_feel_tags_ids and k.kt_feels_ids=r.kt_feels_ids order by r.kt_feel_riqi_dates desc limit "+changePer_page+" ,"+per_page;
			},
			getAppFeelByData: function(riqi_dates){
				return "select k.kt_feels_titles,k.kt_feels_contents,k.kt_feels_dates,k.kt_feels_year,k.kt_feels_yue,k.kt_feels_ri,k.kt_feels_ids,k.kt_feel_tags_ids,t.kt_feel_tags_name from k_feels k,k_feel_tags t ,k_feel_riqi r where  r.kt_feel_riqi_dates='"+riqi_dates+"' and k.kt_feel_tags_ids=t.kt_feel_tags_ids and k.kt_feels_ids=r.kt_feels_ids ";
			},
		},
		//
		k_translates: {
			getAllTranslate: "select * from k_translates ;",
			getSorts_count_all_result: "select count(0) as count_all_result from k_translates ;",
			getAll: function(changePer_page,per_page){
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
				return "INSERT INTO  `kcool`.`k_translates` (`kt_translates_ids` ,`kt_translates_dates` ,`kt_translates_contents` ,`kt_translates_titles` ,`kt_translates_country` ,`kt_translates_author` ,`kt_translates_url` ,`kt_translates_introduction` ,`kt_translates_year` ,`kt_translates_yue` ,`kt_translates_ri` ,`kt_translates_img` ,`kt_translates_tags`) VALUES (NULL ,'"+date+"','"+content+"','"+title+"','"+country+"','"+author+"','"+url+"','"+introduction+"','"+year+"','"+yue+"','"+ri+"','"+img+"','"+tag+"' );";
			},
			postToEditTranslate: function(translateId,date,content,title,country,author,url,introduction,year,yue,ri,img,tag){
				return "UPDATE  `kcool`.`k_translates` SET  `kt_translates_dates` =  '"+date+"',`kt_translates_contents` =  '"+content+"',`kt_translates_titles` =  '"+title+"',`kt_translates_country` =  '"+country+"',`kt_translates_author` =  '"+author+"',`kt_translates_url` =  '"+url+"',`kt_translates_introduction` =  '"+introduction+"',`kt_translates_year` =  '"+year+"',`kt_translates_yue` =  '"+yue+"',`kt_translates_ri` =  '"+ri+"',`kt_translates_img` =  '"+img+"',`kt_translates_tags` =  '"+tag+"' WHERE  `k_translates`.`kt_translates_ids` ='"+translateId+"';";
			},
			postDelTranslateById : function(translateId){
				return "DELETE FROM `kcool`.`k_translates` WHERE `k_translates`.`kt_translates_ids` = '"+translateId+"' ";
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
				return "UPDATE  `kcool`.`k_prose` SET  `kt_prose_titles` =  '"+proseTitle+"',`kt_prose_dates` = '"+proseDate+"',`kt_prose_contents` = '"+proseContent+"' WHERE  `k_prose`.`kt_prose_ids` ='"+proseId+"';";
			},
			postDelProseById: function(prose_ids){
				return "DELETE FROM `kcool`.`k_prose` WHERE `k_prose`.`kt_prose_ids` = '"+prose_ids+"' ";
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
				return "UPDATE  `kcool`.`k_navigation` SET  `kt_navigation_name` =  '"+catalogueTitle+"',`kt_navigation_url` = '"+catalogueUrl+"',`kt_nav_tag_ids` = '"+catalogueTypeId+"' WHERE  `k_navigation`.`kt_navigation_ids` ='"+catalogueId+"';";
			},
			postDelCatalogueById: function(navigation_ids){
				return "DELETE FROM `kcool`.`k_navigation` WHERE `k_navigation`.`kt_navigation_ids` = '"+navigation_ids+"' ";
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