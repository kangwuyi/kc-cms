/**
 * Tabify
 */
;(function ($) {
	$.fn.tabify = function () {
		return this.each(function () {
			var tabs = $(this);
			$('.tab-content', tabs).hide();
			$('ul.tab-nav li:first', tabs).addClass('current');
			$('div:first', tabs).show();
			var tabLinks = $('ul.tab-nav li', tabs);
			$(tabLinks).click(function () {
				$(this).addClass('current').siblings().removeClass('current');
				$('.tab-content', tabs).hide();
				var activeTab = $(this).find('a').attr('href');
				$(activeTab).show();
				return false;
			});
		});
	};
})(jQuery);

(function ($) {
	$.fn.themify_accordion = function() {
		return this.each(function() {
			var acc = $(this),
					behavior = $(this).data('behavior');
			$('.default-closed', acc).hide();
			var head = $('.accordion-title', acc);
			$(head).on('click', function(e) {
				var def = $(this).closest('li').toggleClass('current')
				.siblings().removeClass('current');

				if( behavior == 'accordion' ) {
					def.find('.accordion-content').each(function(){
						$(this).slideUp();
					});
				}

				$(this).next().slideToggle();
				e.preventDefault();
			});
		});
	};
})(jQuery);

/*
 * Parallax Scrolling Builder
 */
(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.builderParallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0, resizeId;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
		    firstTop = $this.offset().top;
		});
		$window.resize(function(){
			clearTimeout(resizeId);
			resizeId = setTimeout(function(){
				$this.each(function(){
				    firstTop = $this.offset().top;
				});
			}, 500);
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();				

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);

/*
 jQuery Inview
*/
(function(d){var p={},e,a,h=document,i=window,f=h.documentElement,j=d.expando;d.event.special.inview={add:function(a){p[a.guid+"-"+this[j]]={data:a,$element:d(this)}},remove:function(a){try{delete p[a.guid+"-"+this[j]]}catch(d){}}};d(i).bind("scroll resize",function(){e=a=null});!f.addEventListener&&f.attachEvent&&f.attachEvent("onfocusin",function(){a=null});setInterval(function(){var k=d(),j,n=0;d.each(p,function(a,b){var c=b.data.selector,d=b.$element;k=k.add(c?d.find(c):d)});if(j=k.length){var b;
if(!(b=e)){var g={height:i.innerHeight,width:i.innerWidth};if(!g.height&&((b=h.compatMode)||!d.support.boxModel))b="CSS1Compat"===b?f:h.body,g={height:b.clientHeight,width:b.clientWidth};b=g}e=b;for(a=a||{top:i.pageYOffset||f.scrollTop||h.body.scrollTop,left:i.pageXOffset||f.scrollLeft||h.body.scrollLeft};n<j;n++)if(d.contains(f,k[n])){b=d(k[n]);var l=b.height(),m=b.width(),c=b.offset(),g=b.data("inview");if(!a||!e)break;c.top+l>a.top&&c.top<a.top+e.height&&c.left+m>a.left&&c.left<a.left+e.width?
(m=a.left>c.left?"right":a.left+e.width<c.left+m?"left":"both",l=a.top>c.top?"bottom":a.top+e.height<c.top+l?"top":"both",c=m+"-"+l,(!g||g!==c)&&b.data("inview",c).trigger("inview",[!0,m,l])):g&&b.data("inview",!1).trigger("inview",[!1])}}},250)})(jQuery);