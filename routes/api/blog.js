var kcool = require('../../public/lib/kcool');
var Blog = require('../../models/blog');
var Note = require('../../models/note');
var Feel = require('../../models/feel');
var User = require('../../models/user');
var object = require('../../models/api/object');
var pagination = require('pagination-api');
var myDate = require('../dateFormat')();

exports.allBlog = function (req, res) {
	Blog.PostSorts_count_all_result( null,function (PostSorts_count_all_resultErr, PostSorts_count_all_result) {
		if (PostSorts_count_all_resultErr) {
			count_all_result = 1;
		};//console.log(PostSorts_count_all_result);
		count_all_result = PostSorts_count_all_result[0].count_all_result;	//count_all_result是所有博客的总数量
		var per_pages = 1;
		if(req.query.per_page){
			per_pages = req.query.per_page;//console.log("get");
		};
		if(req.body.per_page){
			per_pages = req.body.per_page;//console.log("post");
		}//console.log("per_pages");console.log(per_pages);
		var total_rows,per_page,base_url ;
		total_rows = count_all_result ;
		per_page = 4;
		base_url = 'blog?';
		var changePer_page = ( per_pages - 1 ) * per_page;//console.log(changePer_page);
		Blog.PostGet_all(changePer_page,per_page,function (PostGet_allErr, PostGet_all) {
			if (PostGet_allErr) {
				PostGet_all = [];
			};//console.log(PostGet_all);
			var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
			Blog.PostBlogDate( null,function (PostBlogDateErr, PostBlogDate) {
				if (PostBlogDateErr) {
					PostBlogDate = [];
				};//console.log(PostBlogDate);
				Blog.PostBlogTag( null,function (PostBlogTagErr, PostBlogTag) {
					res.render('client/in/blog', { title: '十页书｜笔记',PostBlogTag: PostBlogTag,PostGet_all: PostGet_all,PostBlogDate: PostBlogDate,Create_links:Create_links});
				});
			});
		});
	});
}
exports.blogsById = function (req, res) {
	var blogs_ids = req.query.blogs_ids ? parseInt(kcool.trim(req.query.blogs_ids)) : 1;
	var tags_ids = req.query.tags_ids ? parseInt(kcool.trim(req.query.tags_ids)) : 1;
	var BlogsByIds = [];
	Blog.PostBlogTag( null,function (PostBlogTagErr, PostBlogTag) {
		Blog.BlogsById( blogs_ids,function (BlogsByIdErr, BlogsById) {
			if (BlogsByIdErr) {
				BlogsById = [];
			};
			BlogsByIds = BlogsById;
			var blogs_ids_add_one = blogs_ids;
			var title_to_content_add_one;
			Blog.BlogsByNext( blogs_ids_add_one,tags_ids,function (BlogsByNextErr, BlogsByNext) {
				if (BlogsByNextErr) {
				BlogsByNext = [];
				};
				var blogs_ids_reduce_one = blogs_ids;
				var title_to_content_reduce_one;
				title_to_content_add_one = BlogsByNext;
				Blog.BlogsByPrev( blogs_ids_reduce_one,tags_ids,function (BlogsByPrevErr, BlogsByPrev) {
					if (BlogsByPrevErr) {
					BlogsByPrev = [];
					};
					title_to_content_reduce_one = BlogsByPrev;
					var tags_open_next= 0;
					var tags_open_prev= 0;
					BlogsById = BlogsByIds;
					passTitle= '十页书｜'+BlogsById[0].kt_blogs_titles;
					Blog.PostBlogDate( null,function (PostBlogTagErr, PostBlogDate) {
						if(title_to_content_add_one.length<1){
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							tags_open_next= 1;//console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/in/blogReader', { title: passTitle,PostBlogTag: PostBlogTag,PostBlogDate: PostBlogDate,BlogsById:BlogsById,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						 }else{
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							res.render('client/in/blogReader', { title: passTitle,PostBlogTag: PostBlogTag,PostBlogDate: PostBlogDate,BlogsById:BlogsById,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						}
					});
				});
			});
		});
	});
}
exports.content_to_next = function (req, res) {
	var blogs_ids = kcool.trim(req.query.blogs_ids);
	var tags_ids = kcool.trim(req.query.tags_ids);
	blogs_ids = parseInt(blogs_ids);
	tags_ids = parseInt(tags_ids);
	var BlogsByNexts = [];
	Blog.BlogsByNext( blogs_ids,tags_ids,function (BlogsByNextErr, BlogsByNext) {
		if (BlogsByNextErr) {
			BlogsByNext = [];
		};
		BlogsByNexts = BlogsByNext;
		var blogs_ids_add_one = blogs_ids+1;
		var title_to_content_add_one;
		Blog.BlogsByNext( blogs_ids_add_one,tags_ids,function (BlogsByNextErr, BlogsByNext) {
			if (BlogsByNextErr) {
			BlogsByNext = [];
			};
			var blogs_ids_reduce_one = blogs_ids-1;
			var title_to_content_reduce_one;
			title_to_content_add_one = BlogsByNext;
			Blog.PostBlogTag( null,function (PostBlogTagErr, PostBlogTag) {
				Blog.BlogsByNext( blogs_ids_reduce_one,tags_ids,function (BlogsByNextErr, BlogsByNext) {
					if (BlogsByNextErr) {
					BlogsByNext = [];
					};
					title_to_content_reduce_one = BlogsByNext;
					var tags_open_next= 0;
					var tags_open_prev= 0;
					BlogsByNext = BlogsByNexts;
					passTitle= '十页书｜'+BlogsByNext[0].kt_blogs_titles;
					Blog.PostBlogDate( null,function (PostBlogTagErr, PostBlogDate) {
						if(title_to_content_add_one.length<1){
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							tags_open_next= 1;//console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/in/blogReader', { title: passTitle,PostBlogTag: PostBlogTag,PostBlogDate: PostBlogDate,BlogsById:BlogsByNext,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						 }else{
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							//console.log("tags_open_prev");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/in/blogReader', { title: passTitle,PostBlogTag: PostBlogTag,PostBlogDate: PostBlogDate,BlogsById:BlogsByNext,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						}
					});
				});
			});
		});
	});
}
exports.content_to_prev = function (req, res) {
	var blogs_ids = kcool.trim(req.query.blogs_ids);
	var tags_ids = kcool.trim(req.query.tags_ids);
	blogs_ids = parseInt(blogs_ids);
	tags_ids = parseInt(tags_ids);
	var BlogsByPrevs = [];
	Blog.BlogsByPrev( blogs_ids,tags_ids,function (BlogsByPrevErr, BlogsByPrev) {
		if (BlogsByPrevErr) {
			BlogsByPrev = [];
		};
		BlogsByPrevs = BlogsByPrev;
		var blogs_ids_add_one = blogs_ids+1;
		var title_to_content_add_one;
		Blog.BlogsByPrev( blogs_ids_add_one,tags_ids,function (BlogsByPrevErr, BlogsByPrev) {
			if (BlogsByPrevErr) {
			BlogsByPrev = [];
			};
			var blogs_ids_reduce_one = blogs_ids-1;
			var title_to_content_reduce_one;
			title_to_content_add_one = BlogsByPrev;
			Blog.PostBlogTag( null,function (PostBlogTagErr, PostBlogTag) {
				Blog.BlogsByPrev( blogs_ids_reduce_one,tags_ids,function (BlogsByPrevErr, BlogsByPrev) {
					if (BlogsByPrevErr) {
					BlogsByPrev = [];
					};
					title_to_content_reduce_one = BlogsByPrev;
					var tags_open_next= 0;
					var tags_open_prev= 0;
					BlogsByPrev = BlogsByPrevs;
					passTitle= '十页书｜'+BlogsByPrev[0].kt_blogs_titles;
					Blog.PostBlogDate( null,function (PostBlogTagErr, PostBlogDate) {
						if(title_to_content_add_one.length<1){
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							tags_open_next= 1;//console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
							res.render('client/in/blogReader', { title: passTitle,PostBlogTag: PostBlogTag,PostBlogDate: PostBlogDate,BlogsById:BlogsByPrev,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						 }else{
							if(title_to_content_reduce_one.length<1){
								tags_open_prev= 1;
							};
							//console.log("tags_open_prev");//console.log(tags_open_prev);//console.log(tags_open_next);
							res.render('client/in/blogReader', { title: passTitle,PostBlogTag: PostBlogTag,PostBlogDate: PostBlogDate,BlogsById:BlogsByPrev,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next});
						}
					});
				});
			});
		});
	});
}
exports.blogsByMenu = function (req, res) {
	var tags_ids = kcool.trim(req.query.tags_ids);//console.log(blogs_ids);
	Blog.BlogsById_count_all_result( tags_ids,function (BlogsById_count_all_resultErr, BlogsById_count_all_result) {
		if (BlogsById_count_all_resultErr) {
			count_all_result = 1;
		};
		count_all_result = BlogsById_count_all_result[0].count_all_result;	//count_all_result是所有博客的总数量
		var per_pages = 1;
		if(req.query.per_page){
			per_pages = req.query.per_page;//console.log("get");
		};
		if(req.body.per_page){
			per_pages = req.body.per_page;//console.log("post");
		}//console.log("per_pages");console.log(per_pages);
		var total_rows,per_page,base_url ;
		total_rows = count_all_result ;
		per_page = 4;
		base_url = 'blogsByMenu?tags_ids='+tags_ids+'&';
		var changePer_page = ( per_pages - 1 ) * per_page;//console.log(changePer_page);
		Blog.PageByTagId(tags_ids,changePer_page,per_page,function (PageByTagIdErr, PostGet_all) {
			if (PageByTagIdErr) {
				PostGet_all = [];
			};//console.log(PostGet_all);
			var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
			Blog.PostBlogDate( null,function (PostBlogTagErr, PostBlogDate) {
				if (PostBlogTagErr) {
					PostBlogDate = [];
				};//console.log(PostRiqi);
				Blog.PostBlogTag( null,function (PostBlogTagErr, PostBlogTag) {
					res.render('client/in/blog', { title: '十页书｜笔记',PostGet_all: PostGet_all,PostBlogTag: PostBlogTag,PostBlogDate: PostBlogDate,Create_links:Create_links});
				});
			});
		});
	});
}
exports.PageByData = function (req, res) {
	var riqi_dates = kcool.trim(req.query.riqi_dates);//console.log(blogs_ids);
	Blog.BlogsByData_count_all_result( riqi_dates,function (BlogsByData_count_all_resultErr, BlogsByData_count_all_result) {
		if (BlogsByData_count_all_resultErr) {
			count_all_result = 1;
		};//console.log(BlogsByData_count_all_result);
		count_all_result = BlogsByData_count_all_result[0].count_all_result;	//count_all_result是所有博客的总数量
		var per_pages = 1;
		if(req.query.per_page){
			per_pages = req.query.per_page;//console.log("get");
		};
		if(req.body.per_page){
			per_pages = req.body.per_page;//console.log("post");
		}//console.log("per_pages");console.log(per_pages);
		var total_rows,per_page,base_url ;
		total_rows = count_all_result ;
		per_page = 4;
		base_url = 'PageByData?riqi_dates='+riqi_dates+'&';
		var changePer_page = ( per_pages - 1 ) * per_page;console.log(changePer_page);
		Blog.PageByData(riqi_dates,changePer_page,per_page,function (PageByTagIdErr, PostGet_all) {
			if (PageByTagIdErr) {
				PostGet_all = [];
			};//console.log(PostGet_all);
			var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
			Blog.PostBlogDate( null,function (PostBlogTagErr, PostBlogDate) {
				if (PostBlogTagErr) {
					PostBlogDate = [];
				};//console.log(total_rows+per_page+per_pages);
				Blog.PostBlogTag( null,function (PostBlogTagErr, PostBlogTag) {
					res.render('client/in/blog', { title: '十页书｜笔记',PostGet_all: PostGet_all,PostBlogTag: PostBlogTag,PostBlogDate: PostBlogDate,Create_links:Create_links});
				});
			});
		});
	});
}
exports.poBlogs = function (req, res) {
	Blog.PostBlogTagAll( null,function (PostBlogTagAllErr, PostBlogTagAll) {
		res.render('client/po/add/blogs', { title: '主页',PostTags: PostBlogTagAll});
	});
}
exports.poAddBlogType = function (req, res) {
	Blog.PostBlogTag( null,function (PostBlogTagErr, PostBlogTag) {
		res.render('client/po/add/blogType', { title: '主页',PostTags: PostBlogTag});
	});
}
exports.poReviseBlogs = function (req, res) {
	Blog.GetAllBlog(null,function (GetAllBlogErr, GetAllBlog) {
			if (GetAllBlogErr) {
				GetAllBlog = [];
			};
			res.render('client/po/revise/reviseBlog', { title: '主页',GetAllBlog: GetAllBlog});
	});
}
exports.editBlogById = function (req, res) {
	var blogs_ids = req.query.blogs_ids;
	Blog.BlogsById( blogs_ids,function (BlogsByIdErr, BlogsById) {
		if (BlogsByIdErr) {
			BlogsById = [];
		};
		Blog.PostBlogTag( null,function (PostBlogTagErr, PostBlogTag) {
			res.render('client/po/revise/edit/editBlogs', { title: '主页',BlogsById: BlogsById,PostTags: PostBlogTag});
		});
	});
}
exports.toEditBlog = function (req, res) {
	var blogId = req.body.blogId ? kcool.trim(req.body.blogId):1;
	var blogTitle = req.body.blogTitle ? kcool.trim(req.body.blogTitle):1;
	var blogTagId = req.body.blogTagId ? kcool.trim(req.body.blogTagId):1;
	var blogYear = req.body.blogYear ? kcool.trim(req.body.blogYear):1;
	var blogYue = req.body.blogYue ? kcool.trim(req.body.blogYue):1;
	var blogRi = req.body.blogRi ? kcool.trim(req.body.blogRi):1;
	var blogDate = new Date().format("yyyy-MM-dd hh:mm:ss");
	var blogContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
	Blog.toEditBlog(blogId,blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent,function (err, toEditBlog) {
		var dateRiqi = blogYue+'.'+blogYear;
		Blog.toAddRiqi(dateRiqi,blogId,function (err, toAddRiqi) {
			req.flash('success', '添加"'+blogTitle+'"文章成功!');
			return res.redirect('back');
		});
	});
}
exports.poDeleteBlogs = function (req, res) {
	Blog.GetAllBlog(null,function (GetAllBlogErr, GetAllBlog) {
			if (GetAllBlogErr) {
				GetAllBlog = [];
			};//console.log(PostGet_all);
			res.render('client/po/delete/deleteBlog', { title: '主页',GetAllBlog: GetAllBlog});
	});
}
exports.delBlogById = function (req, res) {
	var blogs_ids = req.query.blogs_ids;
	Blog.delBlogById(blogs_ids,function (err, delBlogById) {
		Blog.delBlogRiqiById(blogs_ids,function (err, delBlogRiqiById) {
			return res.redirect('back');
		});
	});
}
exports.toAddBlogType = function (req, res) {
	var tagName = req.body.tagName ? kcool.trim(req.body.tagName):1;
	//检查标签是否存在
	Blog.checkTag(tagName, function (err, checkTag) {
		if (checkTag.length<1) {
			Blog.AddTagName(tagName, function (err, AddTagName) {
				req.flash('success', '添加"'+tagName+'"标签成功!');
				return res.redirect('back');
			});
		}else{
			req.flash('error', '"'+tagName+'"标签已存在!');
			return res.redirect('back');
		}
	});
}
exports.toAddBlog = function (req, res) {
	var blogTitle = req.body.blogTitle ? kcool.trim(req.body.blogTitle):1;
	var blogTagId = req.body.blogTagId ? kcool.trim(req.body.blogTagId):1;
	var blogYear = req.body.blogYear ? kcool.trim(req.body.blogYear):1;
	var blogYue = req.body.blogYue ? kcool.trim(req.body.blogYue):1;
	var blogRi = req.body.blogRi ? kcool.trim(req.body.blogRi):1;
	var blogDate = new Date().format("yyyy-MM-dd hh:mm:ss");
	var blogContent = req.body.editor1 ? kcool.trim(req.body.editor1):1;
	Blog.toAddBlog(blogTitle, blogTagId,blogYear,blogYue,blogRi,blogDate,blogContent,function (err, toAddBlog) {
		Blog.dateBackBlogId(blogDate,function (err, dateBackBlogId) {
			var blogId = dateBackBlogId[0].kt_blogs_ids;
			var dateRiqi = blogYue+'.'+blogYear;
			Blog.toAddRiqi(dateRiqi,blogId,function (err, toAddRiqi) {
				req.flash('success', '添加"'+blogTitle+'"文章成功!');
				return res.redirect('back');
			});
		});
	});
}