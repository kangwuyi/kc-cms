function header_effect(){
	"use strict";
	/*=================================== TOPSEARCH ==============================*/
	var headertext = jQuery('#header-top');
	var outerheader = jQuery('#header-back');
	var headertextheight = headertext.height();
	var outerheaderoffset = outerheader.offset().top;
	var photostopprev=document.getElementById("banner_prev").style.top;
	var photostopnext=document.getElementById("banner_next").style.top;
	var h1 = "270px";
	var h2 = "495px";
	headertext.css('height', headertextheight);
	jQuery(window).scroll(function(evt){
	// alert("鼠标滚动显示此处");
		var scrolltop = jQuery(document).scrollTop();
		if(!isMobile()){	
			if(scrolltop>(outerheaderoffset)){
				outerheader.addClass("sticky");
				document.getElementById("banner_prev").style.top=h1;
				document.getElementById("banner_next").style.top=h1;
			}else{
				outerheader.removeClass("sticky");
				document.getElementById("banner_prev").style.top=h2;
				document.getElementById("banner_next").style.top=h2;
			}	
		}			
	});	
}