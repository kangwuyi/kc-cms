/*===============================
///////header
=================================*/
(function ($) {
    $(document).ready(function ($) {
        var ulWidth = $("ul.nav-menu").width();//得到ul宽度
        var liLength = $("ul.nav-menu>li").length;//得到li的个数
        var liMaxWidth = 0;
        var xxx= $('ul.nav-menu>li').each(function(){
            var liMinWidth = $(this).width();
            liMaxWidth = liMaxWidth+liMinWidth;
        });
        var xxx= $('ul.nav-menu>li').each(function(){
            var liMinWidth  =  $(this).width();
            var liNowWidth  =  liMinWidth*ulWidth/liMaxWidth;
            var xxxx = $(this).css({width:liNowWidth});
        });
    });
})(jQuery);


/* =
///////three-part
=*/;

(function($){
	$(document).ready(function($){
		var $container=$('.five-part-content'),
		$elements=$('.five-part-content-list').children('li'),
		maxWidthOnMobile=parseInt($('body').data('screen-md')),
		currentIndex=0,
		lastMode='',
		sliderDuration=5000,
		sliderInterval='';
		if(!maxWidthOnMobile){
			maxWidthOnMobile=768;
		};
		initialize=function(){alert('ka')
			if(!$('.five-part-content-action').length){
				var $testimonial=$('<blockquote  class="five-part-content-action text-center box-center col-md-8 col-xs-12 col-sm-10"></blockquote >').appendTo($container);
				var $image=$elements.filter('.active').find('img'),
				testimonialText="\""+$image.attr('alt')+"\"<br/>"+"<small>"+$image.attr('title')+"</small>";
				$testimonial.html(testimonialText);
			}
		}
		activate=function($elem){
			if($elem.hasClass('active'))return;
			$elements.removeClass('active');
			$elem.addClass('active');
			var $image=$elem.find('img'),
			testimonialText="\""+$image.attr('alt')+"\"<br/>"+"<small>"+$image.attr('title')+"</small>";
			$('.five-part-content-action').fadeOut(300,function(){
				$(this).html(testimonialText).fadeIn(300)
			});
		}
		hoverEvent=function(e){alert('k')
			activate($(this));
		}
		initialize();
		$(window).on("load resize",function(){
			var currentMode=($(window).width()<=maxWidthOnMobile)?'small_screen':'large_screen';
			if(currentMode!=lastMode){
				if(currentMode=='small_screen'){
					$elements.off('hover',hoverEvent);
					sliderInterval=setInterval(function(){
						currentIndex=(currentIndex==$elements.length-1)?0:++currentIndex;
						activate($($elements[currentIndex]));
					},
					sliderDuration);
				}
				else{alert('kk')
					clearInterval(sliderInterval);
					$elements.on('hover',hoverEvent);
				}
				lastMode=currentMode;
			}
		});
	});
})(jQuery);




/*===============================
///////add-------inview，添加inview类
=================================*/;

(function($){
    $(document).ready(function($){
        $('.row-content').bind('inview',function(event,visible,visiblePartX,visiblePartY){
            if(visible){
                if(visiblePartY=='bottom'||visiblePartY=='both'){
                    if(!$(this).hasClass('section-mask')){
                        $(this).addClass('inview');
                    }
                }
            }
        });
    });
})(jQuery);


/*===============================
///////add-------scrollDown----scrollUp
=================================*/;
(function($){
	var scrollLastPos=0,
	scrollDir=0,
	scrollTimeout=0;
	$(window).on('scroll',function(e){
		var st=$(this).scrollTop();
		if(st<1){
			if(scrollDir!=0){
				scrollDir=0;
				scrollToggle();
			}
		}
		else if(st>scrollLastPos){
			if(scrollDir!=1){
				scrollDir=1;
				scrollToggle();
			}
		}
		else if(st<scrollLastPos){
			if(scrollDir!=-1){
				scrollDir=-1;
				scrollToggle();
			}
		}
		scrollLastPos=st;
	});

	scrollToggle=function(){
		$('html').removeClass('hover');
		if(scrollDir==1){
			$('html').addClass('scrollDown').removeClass('scrollUp');
		}
		else if(scrollDir==-1){
			$('html').addClass('scrollUp').removeClass('scrollDown');
		}
		else{
			$('html').removeClass('scrollUp scrollDown');
		}
		$('html').addClass('animating');
		setTimeout(function(){
			$('html').removeClass('animating');
		},1000);
	}
})(jQuery);

/*===============================
///////four-part-one 
=================================*/;

(function($) {
    $.fn.parallaxSlider = function(options) {
        var opts = $.extend({},
        $.fn.parallaxSlider.defaults, options);
        return this.each(function() {
            var $pxs_container = $(this),
            o = $.meta ? $.extend({},
            opts, $pxs_container.data()) : opts;


            var $pxs_slider = $('.pxs_slider', $pxs_container),

            $elems = $pxs_slider.children(),

            total_elems = $elems.length,

            $pxs_next = $('.pxs_next', $pxs_container),
            $pxs_prev = $('.pxs_prev', $pxs_container),

            $pxs_bg1 = $('.pxs_bg1', $pxs_container),
            $pxs_bg2 = $('.pxs_bg2', $pxs_container),
            $pxs_bg3 = $('.pxs_bg3', $pxs_container),

            current = 0,

            slideshow,
            $pxs_loading = $('.pxs_loading', $pxs_container),
            $pxs_slider_wrapper = $('.pxs_slider_wrapper', $pxs_container);

            var loaded = 0,
            $images = $pxs_slider_wrapper.find('img');

            $images.each(function() {
                var $img = $(this);
                $('<img/>').load(function() {++loaded;
                    if (loaded == total_elems ) {
                        $pxs_loading.hide();
                        $pxs_slider_wrapper.show();

                        var one_image_w = $pxs_slider.find('img:first').width();

                        setWidths($pxs_slider, $elems, total_elems, $pxs_bg1, $pxs_bg2, $pxs_bg3, one_image_w, $pxs_next, $pxs_prev);

                        var spaces = one_image_w / (total_elems + 1);

                        $pxs_next.bind('click',
                        function() {++current;
                            if (current >= total_elems) if (o.circular) current = 0;
                            else {--current;
                                return false;
                            }

                            slide(current, $pxs_slider, $pxs_bg3, $pxs_bg2, $pxs_bg1, o.speed, o.easing, o.easingBg);
                        });
                        $pxs_prev.bind('click',
                        function() {--current;
                            if (current < 0) if (o.circular) current = total_elems - 1;
                            else {++current;
                                return false;
                            }

                            slide(current, $pxs_slider, $pxs_bg3, $pxs_bg2, $pxs_bg1, o.speed, o.easing, o.easingBg);
                        });


                        if (o.auto != 0) {
                            o.circular = true;
                            slideshow = setInterval(function() {
                                $pxs_next.trigger('click');
                            },
                            o.auto);
                        }


                        $(window).resize(function() {
                            w_w = $(window).width();
                            setWidths($pxs_slider, $elems, total_elems, $pxs_bg1, $pxs_bg2, $pxs_bg3, one_image_w, $pxs_next, $pxs_prev);
                            slide(current, $pxs_slider, $pxs_bg3, $pxs_bg2, $pxs_bg1, 1, o.easing, o.easingBg);
                        });

                    }
                }).error(function() {
                    alert('here')
                }).attr('src', $img.attr('src'));
            });

        });
    };

    var w_w = $(window).width();

    var slide = function(current, $pxs_slider, $pxs_bg3, $pxs_bg2, $pxs_bg1, speed, easing, easingBg) {
        var slide_to = parseInt( - w_w * current);
        $pxs_slider.stop().animate({
            left: slide_to + 'px'
        },
        speed, easing);
        $pxs_bg3.stop().animate({
            left: slide_to / 2 + 'px'
        },
        speed, easingBg);
        $pxs_bg2.stop().animate({
            left: slide_to / 4 + 'px'
        },
        speed, easingBg);
        $pxs_bg1.stop().animate({
            left: slide_to / 8 + 'px'
        },
        speed, easingBg);
    }

    var highlight = function($elem) {
        $elem.siblings().removeClass('selected');
        $elem.addClass('selected');
    }

    var setWidths = function($pxs_slider, $elems, total_elems, $pxs_bg1, $pxs_bg2, $pxs_bg3, one_image_w, $pxs_next, $pxs_prev) {

        var pxs_slider_w = w_w * total_elems;
        $pxs_slider.width(pxs_slider_w + 'px');

        $elems.width(w_w + 'px');

        $pxs_bg1.width(pxs_slider_w + 'px');
        $pxs_bg2.width(pxs_slider_w + 'px');
        $pxs_bg3.width(pxs_slider_w + 'px');


	//左右按钮的left、right定位距离

        var position_nav = w_w / 2 - one_image_w / 2 + 3;
        $pxs_next.css('right', position_nav + 'px');
        $pxs_prev.css('left', position_nav + 'px');
    }

    $.fn.parallaxSlider.defaults = {
        auto: 0,

        speed: 1000,

        easing: 'jswing',

        easingBg: 'jswing',

        circular: true,

        thumbRotation: true
    };

})(jQuery);

(function($) {
	$(document).ready(function($) {
		var $pxs_container = $('#pxs_container');
		$pxs_container.parallaxSlider();
	})
})(jQuery);


/*===============================
/////// twelve-part
=================================*/;

 (function($){
            $(document).ready(function($){

      
            $('#dg-container').gallery();

  
        });
        })(jQuery);


/*===============================
/////// eight-part
=================================*/;
(function($){
    $(document).ready(function($){
    $('.eleven-part').easyBackground({
        wrapNeighbours: true
    });
    });
})(jQuery);


/*
///////返回头部
(function($){
    $(document).ready(function($){
$("#back_top").click(function(){
$("html, body").animate({scrollTop:0}, 500);
return false;
});
    });
})(jQuery);
*/


/**
视觉差
 */


(function($){
    $(document).ready(function($){
    $window = $(window);

    $('[data-type]').each(function() {
        $(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
        $(this).data('Xposition', $(this).attr('data-Xposition'));
        $(this).data('speed', $(this).attr('data-speed'));
    });

    $('section[data-type="background"]').each(function(){

        var $self = $(this),
            offsetCoords = $self.offset(),
            topOffset = offsetCoords.top;

        $(window).scroll(function() {
            if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
                 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {

                var yPos = -($window.scrollTop() / $self.data('speed'));

                if ($self.data('offsetY')) {
                    yPos += $self.data('offsetY');
                }

                var coords =  yPos + 'px';


                $self.css({ top: coords });

                $('[data-type="sprite"]', $self).each(function() {

                    var $sprite = $(this);

 //alert($window.scrollTop() / $sprite.data('xxx'));
                    var yPos = $window.scrollTop();

                    var coords = + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
                    $sprite.css({ top: coords });
                });


//alert("haha");

                $('[data-type="footer"]', $self).each(function() {

                    var $footer = $(this);

 //alert($window.scrollTop() / $footer.data('xxx'));
                    var yPos = $window.scrollTop()-8400;

                    var coords = + ' ' + (yPos + $footer.data('offsetY')) + 'px';

                    $footer.css({ top: coords });
                });
            };
        });
    });
});
})(jQuery);