$(".header-btn").click(function(){
    	if($(".left-close").length >0){
        	 		$("#header-left-box").removeClass("left-close").addClass("left-open");
    	}else{
        	 		$("#header-left-box").removeClass("left-open").addClass("left-close");
    	}}
);
$(".tag-link").each(function() {
	$(this).find('a').each(function() {
		var getRandomColor = function(){
  			return  '#' +
    			(function(color){
    				return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
      				&& (color.length == 6) ?  color : arguments.callee(color);
  			})('');
		}();
		//console.log(getRandomColor);
		$(this).css({"background":getRandomColor,"border-right-color":getRandomColor});
		$(this).next().css({"background":getRandomColor});
	});
});
$(".icon-link").each(function() {
	$(this).find('a').each(function() {
		var getRandomColor = function(){
			return  '#' +
			(function(color){
				return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
				&& (color.length == 6) ?  color : arguments.callee(color);
			})('');
		}();
		$(this).css({"background-color":getRandomColor});
	});
});
var dynamicLoading = {
	css: function(path){
		if(!path || path.length === 0){
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.href = path;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		head.appendChild(link);
	},
	js: function(path){
		if(!path || path.length === 0){
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.src = path;
		script.type = 'text/javascript';
		head.appendChild(script);
	}
}
//动态加载 CSS 文件
//dynamicLoading.css("test.css");
//动态加载 JS 文件
//dynamicLoading.js("test.js");
$(function() {
var cssPath = "css/skin/";
var styleID='skin1';
$(function(){
	var $a =$(".skin-box li a");
	$a .click(function(){
		switchSkin( this.id );
	});
	if (getCookie("MyCssSkin")!=null){
		dynamicLoading.css(getCookie("MyCssSkin"));
	}else{
		dynamicLoading.css(getCookie(cssPath+styleID+'.css'));
	}
});
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)) return unescape(arr[2]);
	else return null;
}
function setCookie(name,value){
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function switchSkin(skinName){
	$("."+skinName).addClass("selected")                //当前<li>元素选中
             	.siblings().removeClass("selected");  //去掉其他同辈<li>元素的选中
	$(".skina").attr("href","css/skin/"+ skinName +".css"); //设置不同皮肤
	setCookie("MyCssSkin",cssPath+skinName+".css");
	if (getCookie("MyCssSkin")!=null){
		dynamicLoading.css(getCookie("MyCssSkin"));
	}else{
		dynamicLoading.css(getCookie(cssPath+styleID+'.css'));
	}
}
});
//弹出登陆
$(function() {
$(function() {
    $(".logintag li").click(function(){
        $(".logintag li").removeClass("on")
        $(this).addClass("on")
        if($(this).attr("rel") == 1){
            $(".logina").hide()
            $(".loginb").show()
            }
            else{
                $(".loginb").hide()
            $(".logina").show()
                }
        })

   })
    $(".login").click(function(){
        $(".header-login").css({"display":"block"});
  });
        $(".close").click(function(){
        $(".header-login").css({"display":"none"});
  });
         })
//返回头部
$(function() {
function b(){
	var h = $(window).height()/2;
	// h = 400;
	var t = $(document).scrollTop();
	if(t > h){
		$('#gotop').fadeIn();
	}else{
		$('#gotop').fadeOut(700);
	}
}
$(document).ready(function(e) {
	b();
	$('#gotop').click(function(){
		clearInterval(timer);
		var timer = setInterval(function() {
			var now = $(document).scrollTop();; //滚动条竖直距离
			speed = (0 - now) / 10;
			speed = Math.floor(speed);
			if (now == 0){
				clearInterval(timer);
			}
		document.documentElement.scrollTop = now + speed; //标准模式下的浏览器
		document.body.scrollTop = now + speed; //怪异模式下的浏览器
		}, 15);
		//$(document).scrollTop(0);
	})
});
$(window).scroll(function(e){
	b();
})
});
//prose页面js
$(".prose-tree >h2>a").click(function(e){
	e.preventDefault();
	$(this).parents(".prose-tree").toggleClass("closeProse");
});
//reade页面js
$(function() {
	var x = $('#tags_open_next').val() ? $('#tags_open_next').val() : 0;
	var y = $('#tags_open_prev').val() ? $('#tags_open_prev').val()  : 0;;
	//alert(x);alert(y);
	if(x==1){
		$("#a_reader_next").css({'color':'rgb(167, 161, 161)'});
		$("#a_reader_next").click( function(){return false;});
	}else{
		$("#a_reader_next").css({'color':'#6DAF45'});
		$("#a_reader_next").click(function(){return true;});
	}
	if(y==1){
		$("#a_reader_prev").css({'color':'rgb(167, 161, 161)'});
		$("#a_reader_prev").click( function(){return false;});
	}else{
		$("#a_reader_prev").css({'color':'#6DAF45'});
		$("#a_reader_prev").click(function(){return true;});
	}
});