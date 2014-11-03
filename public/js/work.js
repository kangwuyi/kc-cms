

jQuery(window).load(function(){
	
	header_effect();
});

function isMobile(){
	"use strict";
	var onMobile = false;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { onMobile = true; }
	return onMobile;
}

function header_effect(){
	"use strict";
	/*=================================== TOPSEARCH ==============================*/
	var headertext = jQuery('#header-top');
	var outerheader = jQuery('#header-back');
	var headertextheight = headertext.height();
	var outerheaderoffset = outerheader.offset().top;
	var margintop=document.getElementById("contion").style.marginTop;
	var h = "160px";
	headertext.css('height', headertextheight);
	jQuery(window).scroll(function(evt){
	// alert("鼠标滚动显示此处");
		var scrolltop = jQuery(document).scrollTop();
		if(!isMobile()){	
			if(scrolltop>(outerheaderoffset)){
				outerheader.addClass("sticky");
				document.getElementById("contion").style.marginTop=h;

			}else{
				outerheader.removeClass("sticky");
				document.getElementById("contion").style.marginTop=margintop;
			}	
		}			
	});	
}



