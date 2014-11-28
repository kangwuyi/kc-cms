

# pagination

example：
Definitions in routes:

	var pagination = require('pagination-api');	//Loading 'pagination' module


	var total_rows;	//'total_rows' return all article number . 'total_rows' is returns from the database,
		//for example:
		//	total_rows = PostSorts_count_all_result[0].count_all_result;

	var per_pages;	//'per_pages' is the URL received the current page
		//for example:
		//	var per_pages = 1;
		//	if(req.query.per_page){
		//		per_pages = req.query.per_page;
		//	};
		//	if(req.body.per_page){
		//		per_pages = req.body.per_page;
		//	};

	var per_page;	//'per_page' is set the page displayed a few articles
		//for example:
		//	per_page = 4;

	var base_url;	//'base_url' is the definition of URL.
		//for example:
		//	base_url = 'blogs?';

	var changePer_page;	//'changePer_page' is parameters used to read database pagination
		//for example:
		//	changePer_page = ( per_pages - 1 ) * per_page;

	var Create_links;	//'Create_links' is create a page
		//for example:
		//	Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);

	Last, sent to the views
		//for example:
		//	res.render('/',{Create_links:Create_links});


Definitions in views:

	<%- Create_links %>

# The examples in /test



#分页
示例：
定义routes：

	var pagination = require('pagination-api');	//加载分页模块

	var total_rows;	// 'total_rows返回所有的文章数量。”total_rows’是从数据库返回，
		//示例：
		//	total_rows = PostSorts_count_all_result[0].count_all_result;

	var per_pages;	//'per_pages”是当前页面的URL接收的页码
		//示例：
		//	var per_pages = 1;
		//	if(req.query.per_page){
		//		per_pages = req.query.per_page;
		//	};
		//	if(req.body.per_page){
		//		per_pages = req.body.per_page;
		//	};

	var per_page;	// 'per_page”设置页面上显示几篇文章
		//示例：
		//	per_page = 4;

	var base_url;	//'base_url是URL的定义。
		//示例：
		//	base_url = 'blogs?';

	var changePer_page;	// 'changeper_page”是用来读取数据库分页参数
		//示例：
		//	changePer_page = ( per_pages - 1 ) * per_page;

	var Create_links;	//'create_links”是创建一个网页
		//示例：
		//	Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);

	最后发送到views中
		//示例：
		//	res.render('/',{Create_links:Create_links});


定义在views：

	<%- Create_links %>

# 测试示例在 /test
















