var express = require('express');
var kcool = require('../public/lib/kcool');
var  objects = require('../models/object');
var pagination = new objects.kangjian;
module.exports = pagination;





 pagination.create_links = function create_links(total_rows,per_page,per_pages,base_url) {

	var base_url			= base_url; 		// The page we are linking to
	var prefix			= ''; 		// A custom prefix added to the path+
	var suffix			= ''; 		// A custom suffix added to the path+
	var total_rows			=  total_rows; 	//数据库返回博客总数量数据
	var per_page			=  per_page; 		//console.log("per_page:"+per_page);// Max number of items you want shown per page
	var num_links			=  4; 		// Number of "digit" links to show before/after the currently viewed page
	var cur_page			=  0; 		// The current page being viewed
	var use_page_numbers		= per_pages; 	// Use page number for segment instead of offset
	var first_link			= 'First';
	var next_link			= '»';
	var prev_link			= '«';
	var last_link			= 'Last';
	var uri_segment		= 4;
	var full_tag_open		= '<div class="pagination pagination-centered"><ul class="pagination pagination-lg">';
	var full_tag_close		= '</ul></div>';
	var first_tag_open		= '<li class="prev page">';
	var first_tag_close		= '</li>';
	var last_tag_open		= '<li class="next page">';
	var last_tag_close		= '</li>';
	var first_url			= ''; 		// Alternative URL for the First Page+
	var cur_tag_open		= '<li class="active"><a href="">';
	var cur_tag_close		= '</a></li>';
	var next_tag_open		= '<li class="next page">';
	var next_tag_close		= '</li>';
	var prev_tag_open		= '<li class="prev page">';
	var prev_tag_close		= '</li>';
	var num_tag_open		= '<li class="page">';
	var num_tag_close		= '</li>';
	var page_query_string		= 'TRUE';
	var query_string_segment 	= 'per_page';
	var display_pages		= 'TRUE';
	var anchor_class		= '';
	var start,end,loop,num_pages;

	if (total_rows == 0 || per_page == 0) {
		return '';
	}
	num_pages = Math.ceil(total_rows / per_page);		//Math.ceil()向上取整,有小数就整数部分加1;num_pages是页数
	if (num_pages == 1) {
		return '';
	}
	if (use_page_numbers) {
		base_page = 1;
	}
	else {
		base_page = 0;
	}
	if (use_page_numbers && cur_page == 0) {
		cur_page = per_pages;
	}
	num_links = parseInt(num_links);
	if (num_links < 1) {
		show_error('Your number of links must be a positive number+');
	}
	if ( isNaN(cur_page)) {
		cur_page = base_page;
	}
	if (use_page_numbers) {
		if (cur_page > num_pages) {
			cur_page = num_pages;
		}
	}
	else {
		if (cur_page > total_rows) {
			cur_page = (num_pages - 1) * per_page;
		}
	}
	uri_page_number = cur_page;
	if ( ! use_page_numbers) {
		cur_page = floor((cur_page/per_page) + 1);
	}//console.log("cur_page:"+cur_page);
	start = ((cur_page - num_links) > 0) ? cur_page - (num_links - 1) : 1;
	end   = ((cur_page + num_links) < num_pages) ? cur_page + num_links : num_pages;
	if ( page_query_string === 'TRUE') {
		//base_url = kcool.trim(base_url)+'&amp;'+query_string_segment+'=';
		base_url = kcool.trim(base_url)+query_string_segment+'=';
	}
	else {
		base_url = kcool.rtrim(base_url, '/') +'/';
	}
	// 编辑分页插件
	output = '';
	// 定义 "First" 链接
	if  ( first_link  && cur_page > (num_links + 1)) {
		cur_page = parseInt(cur_page);
		first_url = (first_url == '') ? base_url : first_url;//console.log("first_url:"+first_url);
		output += first_tag_open+'<a '+anchor_class+'href="'+first_url+'">'+first_link+'</a>'+first_tag_close;//console.log("output:"+output);
	}//console.log("cur_page:"+cur_page);
	// 定义 "previous" 链接
	if  ( prev_link  && cur_page != 1) {
		cur_page = parseInt(cur_page);
		if (use_page_numbers) {
			i = uri_page_number - 1;
		}
		else {
			i = uri_page_number - per_page;
		}
		if (i == 0 && first_url != '') {
			output += prev_tag_open+'<a '+anchor_class+'href="'+first_url+'">'+prev_link+'</a>'+prev_tag_close;//console.log("output:"+output);
		}
		else {
			i = (i == 0) ? '' : prefix+i+suffix;
			output += prev_tag_open+'<a '+anchor_class+'href="'+base_url+i+'">'+prev_link+'</a>'+prev_tag_close;//console.log("output:"+output);
		}
	};//console.log("per_pages:"+per_pages);
	// 定义 pages
	if (display_pages !== 'FALSE') {
		for (loop = start -1; loop <= end; loop++) {
			if (use_page_numbers) {
				i = loop;
			}
			else {
				i = (loop * per_page) - per_page;
			}
			if (i >= base_page) {//console.log("i:"+i);
				if (cur_page == loop) {
					output += cur_tag_open+loop+cur_tag_close;
				}
				else {
					n = (i == base_page) ? 1 : i;//console.log("n:"+n);
					if (n == '' && first_url != '') {
						output += num_tag_open+'<a '+anchor_class+'href="'+first_url+'">'+loop+'</a>'+num_tag_close;//console.log(output);
					}
					else {
						n = (n == '') ? '' : prefix+n+suffix;
						output += num_tag_open+'<a '+anchor_class+'href="'+base_url+n+'">'+loop+'</a>'+num_tag_close;//console.log(output);
					}
				}
			}
		}
	}
	// 定义 "next" link
	if ( next_link && cur_page < num_pages) {//console.log("kk");
		cur_page = parseInt(cur_page);
		if (use_page_numbers) {
			i = cur_page + 1;console.log("i:"+i);console.log("cur_page:"+cur_page);
		}
		else {
			i = (cur_page * per_page);
		}
		output += next_tag_open+'<a '+anchor_class+'href="'+base_url+prefix+i+suffix+'">'+next_link+'</a>'+next_tag_close;
	}
	// 定义 "Last" link
	if ( last_link && (cur_page + num_links) < num_pages) {
		cur_page = parseInt(cur_page);
		if (use_page_numbers) {
			i = num_pages;
		}
		else {
			i = ((num_pages * per_page) - per_page);
		}
		output += last_tag_open+'<a '+anchor_class+'href="'+base_url+prefix+i+suffix+'">'+last_link+'</a>'+last_tag_close;
	}
	output = output.replace("#([^:])//+#", "\\1/");
	output = full_tag_open+output+full_tag_close;
	return output;//document.write(output);console.log("output");//console.log(output);console.log("output");
}