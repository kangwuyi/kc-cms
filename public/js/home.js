
$(document).ready(function(){
	var len = 7;
	var banner = $("#content_nav_ul");
	banner.css("width", len * 1200);
	var sindex = 0;
	var inanimate = false;
	var inHover = false;

	function moveByDirect(to_right) {
		if (inanimate) return;
		inanimate = true;
		var start = 0;
		var end = - 1200;
		if (!to_right) {
			start = -1200;
			end = 0;
			loadBannerImg(banner.children().last().prev());
			banner.children().last().insertBefore(banner.children().first());
		} else {
			loadBannerImg(banner.children().first().next());
		}
		banner.css("margin-left", start);
		banner.animate({"margin-left": end}, 600, function(){
			inanimate = false;
			if (to_right) {
				banner.children().first().insertAfter(banner.children().last());
			}
			banner.css("margin-left", 0);
			autoScroll();
		});
	}

	$("#banner_prev").bind("click", function(){
		moveByDirect(false);
	});
	$("#banner_next").bind("click", function(){
		moveByDirect(true);
	});
	$("#content_nav_ul").bind("mouseover", function(){
		inHover = true;
	});
	$("#content_nav_ul").bind("mouseout", function(){
		inHover = false;
	});
	$("#content_nav_ul img").bind("load", function(){
		$(this).attr("data-load","ok");
	});

	var timer = null;
	function clearAutoScroll() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}
	window.loadBannerImg = function(p){
		var o = p.children().children("img");
		if (o.attr("data-init")!="ok"){
			o.attr({"src":o.data("src"),"data-init":"ok"});
		}
	}

	function autoScroll(init) {
		clearAutoScroll();
		timer = setTimeout(function() {
			if (inHover || banner.children().first().next().children().children("img").attr("data-load")!="ok") {
				autoScroll();
			} else {
				moveByDirect(true);
			}
		}, 5000);
		if (!init){
			loadBannerImg(banner.children().first().next());
		}
	}
	autoScroll(1);
})();
$(function(){
	loadBannerImg($("#content_nav_ul").children().first().next());
	$("#content_nav_ul img").each(function(){
		//$(this).attr("src",$(this).attr("data-src"));
	});
});