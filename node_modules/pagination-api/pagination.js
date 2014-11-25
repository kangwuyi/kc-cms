var express = require('express');
var kcool = require('./lib/kcool');
var  objects = require('./lib/object');
var pagination = new objects.kangjian;
module.exports = pagination;





 pagination.create_links = function create_links(total_rows,per_page,per_pages,base_url) {

	var base_url			= base_url; 		// 定义路径
	var total_rows			=  total_rows; 	//数据库返回博客总数量数据
	var per_page			=  per_page; 		//每页显示文章数目
	var num_links			=  4;
	var cur_page			=  0;
	var use_page_numbers		= per_pages; 	// 当前所就收的页码
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
	var display_next_pages		= 'FALSE';
	var display_last_pages		= 'FALSE';
	var display_prev_pages		= 'FALSE';
	var display_first_pages		= 'FALSE';	//FALSE
	var start,end,loop,num_pages,first_url;
	use_page_numbers = parseInt(use_page_numbers);
	num_links = parseInt(num_links);
	cur_page = parseInt(cur_page);
	if (total_rows == 0 || per_page == 0) {
		return '';
	}
	num_pages = Math.ceil(total_rows / per_page);		//Math.ceil()向上取整,有小数就整数部分加1;num_pages是页数
	if (num_pages == 1) {
		return '';
	}
	if (use_page_numbers) {
		base_page = 1;
	}else {
		base_page = 0;
	}
	if (use_page_numbers && cur_page == 0) {
		cur_page = use_page_numbers;
	}
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
	}else {
		if (cur_page > total_rows) {
			cur_page = (num_pages - 1) * per_page;
		}
	}
	uri_page_number = cur_page;
	if ( ! use_page_numbers) {
		cur_page = floor((cur_page/per_page) + 1);
	}
	start = ((cur_page - num_links) > 0) ? cur_page - (num_links - 1) : 1;
	end   = ((cur_page + num_links) < num_pages) ? cur_page + num_links : num_pages;
	if ( page_query_string === 'TRUE') {
		base_url = kcool.trim(base_url)+query_string_segment+'=';
	}
	else {
		base_url = kcool.rtrim(base_url, '/') +'/';
	}
	// 编辑分页插件
	output = '';
	// definition "First" link　定义第一页
	if (display_first_pages !== 'TRUE') {
		if  ( first_link  && cur_page > (num_links + 1)) {
			first_url = (first_url == undefined ) ? base_url+1 : '';
			output += first_tag_open+'<a '+'href="'+first_url+'">'+first_link+'</a>'+first_tag_close;
		}
	}else{
		first_url = (first_url == undefined ) ? base_url+1 : '';
		if( use_page_numbers == 1){
			output += first_tag_open+'<a style="background-color: #428bca;color: #fff;border-color: #428bca;">'+first_link+'</a>'+first_tag_close;
		}else{
			output += first_tag_open+'<a '+'href="'+first_url+'">'+first_link+'</a>'+first_tag_close;
		}
	}
	// definition "previous" link　定义上一页
	if (display_prev_pages !== 'TRUE') {
		if  ( prev_link  && cur_page != 1) {
			cur_page = parseInt(cur_page);
			if (use_page_numbers) {
				i = uri_page_number - 1;
			}
			else {
				i = uri_page_number - per_page;
			}
			if (i == 0 && first_url != undefined) {
				output += prev_tag_open+'<a '+'href="'+first_url+'">'+prev_link+'</a>'+prev_tag_close;
			}
			else {
				i = (i == 0) ? '' : i;
				output += prev_tag_open+'<a '+'href="'+base_url+i+'">'+prev_link+'</a>'+prev_tag_close;
			}
		}
	}else{
		cur_page = parseInt(cur_page);
		if (use_page_numbers) {
			i = uri_page_number - 1;
		}
		else {
			i = uri_page_number - per_page;
		}
		if( use_page_numbers == 1){
			i = (i == 0) ? '' : i;
			output += prev_tag_open+'<a style="background-color: #428bca;color: #fff;border-color: #428bca;">'+prev_link+'</a>'+prev_tag_close;
		}else{
			i = (i == 0) ? '' : i;
			output += prev_tag_open+'<a '+'href="'+base_url+i+'">'+prev_link+'</a>'+prev_tag_close;
		}
	}
	// definition pages　定义分页中间部分
	if (display_pages !== 'FALSE') {
		for (loop = start -1; loop <= end; loop++) {
			if (use_page_numbers) {
				i = loop;
			}
			else {
				i = (loop * per_page) - per_page;
			}
			if (i >= base_page) {
				if (cur_page == loop) {
					output += cur_tag_open+loop+cur_tag_close;
				}
				else {
					n = (i == base_page) ? 1 : i;
					if (n == '' && first_url != undefined) {
						output += num_tag_open+'<a '+'href="'+first_url+'">'+loop+'</a>'+num_tag_close;
					}
					else {
						n = (n == '') ? '' : n;
						if( (use_page_numbers <= 3) || ( use_page_numbers +3 > num_pages )) {
							var cache1 = (( (use_page_numbers +3> num_pages )&&(use_page_numbers +2 <= num_pages)&&(use_page_numbers > 3) ) ? use_page_numbers : '');cache3:console.log("cache1:"+cache1);
							var cache2 = (( (use_page_numbers +2> num_pages )&&(use_page_numbers +1<= num_pages )&&(use_page_numbers > 3)) ? use_page_numbers : '');cache3:console.log("cache2:"+cache2);
							var cache3 = (( (use_page_numbers +1> num_pages )&&(use_page_numbers <= num_pages )&&(use_page_numbers > 3)) ? use_page_numbers : '');cache3:console.log("cache3:"+cache3);
							switch( use_page_numbers ){
								case 1:console.log("use_page_numbers=case1"+"--use_page_numbers="+use_page_numbers+"--n="+n);
									if( n >= use_page_numbers && n <= (use_page_numbers + 3) ){
										output += num_tag_open+'<a '+'href="'+base_url+n+'">'+loop+'</a>'+num_tag_close;
									}
								break;
								case 2:console.log("use_page_numbers=case2"+"--use_page_numbers="+use_page_numbers+"--n="+n);
									if( n >= (use_page_numbers-1) && n <= (use_page_numbers + 2) ){
										output += num_tag_open+'<a '+'href="'+base_url+n+'">'+loop+'</a>'+num_tag_close;
									}
								break;
								case 3:console.log("use_page_numbers=case3"+"--use_page_numbers="+use_page_numbers+"--n="+n);
									if( n >= (use_page_numbers-2) && n <= (use_page_numbers + 1) ){
										output += num_tag_open+'<a '+'href="'+base_url+n+'">'+loop+'</a>'+num_tag_close;
									}
								break;
								case cache1:console.log("use_page_numbers=cache1*"+cache1+"--use_page_numbers="+use_page_numbers+"--n="+n);
									if( n >= (use_page_numbers-1) && n <= (use_page_numbers + 2) ){
										output += num_tag_open+'<a '+'href="'+base_url+n+'">'+loop+'</a>'+num_tag_close;
									}
								break;
								case cache2:console.log("use_page_numbers=cache2*"+cache2+"--use_page_numbers="+use_page_numbers+"--n="+n);
									if( n >= (use_page_numbers-2) && n <= (use_page_numbers + 1) ){
										output += num_tag_open+'<a '+'href="'+base_url+n+'">'+loop+'</a>'+num_tag_close;
									}
								break;
								case cache3:console.log("use_page_numbers=cache3*"+cache3+"--use_page_numbers="+use_page_numbers+"--n="+n);
									if( n >= (use_page_numbers-3) && n <= use_page_numbers ){
										output += num_tag_open+'<a '+'href="'+base_url+n+'">'+loop+'</a>'+num_tag_close;
									}
								break;
							}
						}else{console.log("----------"+"--n="+n+"------------use_page_numbers="+use_page_numbers+"----(use_page_numbers - 2)="+(use_page_numbers - 2)+"---------(use_page_numbers + 1)="+(use_page_numbers + 1))
							if( n >= (use_page_numbers - 2) && n <=(use_page_numbers + 1) ){
								output += num_tag_open+'<a '+'href="'+base_url+n+'">'+loop+'</a>'+num_tag_close;
							}
						}
					}
				}
			}
		}
	}
	if (display_next_pages !== 'TRUE') {
	// definition "next" link　定义下一页
		if ( next_link && cur_page < num_pages) {
			cur_page = parseInt(cur_page);
			if (use_page_numbers) {
				i = cur_page + 1;
			}
			else {
				i = (cur_page * per_page);
			}
			output += next_tag_open+'<a '+'href="'+base_url+i+'">'+next_link+'</a>'+next_tag_close;
		}
	}else{
		cur_page = parseInt(cur_page);
		if (use_page_numbers) {
			i = cur_page + 1;
		}
		else {
			i = (cur_page * per_page);
		}
		if( use_page_numbers == num_pages){
			output += next_tag_open+'<a style="background-color: #428bca;color: #fff;border-color: #428bca;">'+next_link+'</a>'+next_tag_close;
		}else{
			output += next_tag_open+'<a '+'href="'+base_url+i+'">'+next_link+'</a>'+next_tag_close;
		}
	}
	// definition "Last" link 定义最后一页链接按钮
	if (display_last_pages !== 'TRUE') {
		if ( last_link && (cur_page + num_links) < num_pages) {
			cur_page = parseInt(cur_page);
			if (use_page_numbers) {
				i = num_pages;
			}
			else {
				i = ((num_pages * per_page) - per_page);
			}
			output += last_tag_open+'<a '+'href="'+base_url+i+'">'+last_link+'</a>'+last_tag_close;
		}
	}else{
		cur_page = parseInt(cur_page);
		if (use_page_numbers) {
			i = num_pages;
		}
		else {
			i = ((num_pages * per_page) - per_page);
		}
		if( use_page_numbers == num_pages){
			output += last_tag_open+'<a style="background-color: #428bca;color: #fff;border-color: #428bca;">'+last_link+'</a>'+last_tag_close;
		}else{
			output += last_tag_open+'<a '+'href="'+base_url+i+'">'+last_link+'</a>'+last_tag_close;
		}
	}
	output = output.replace("#([^:])//+#", "\\1/");
	output = full_tag_open+output+full_tag_close;
	return output;
}