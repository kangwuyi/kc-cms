// Themify Lightbox and Fullscreen /////////////////////////
var ThemifyGallery = {};

(function($){

ThemifyGallery = {
	
	config: {
		fullscreen: themifyScript.lightbox.fullscreenSelector,
		lightbox: themifyScript.lightbox.lightboxSelector,
		lightboxGallery: themifyScript.lightbox.gallerySelector,
		lightboxContentImages: themifyScript.lightbox.lightboxContentImagesSelector,
		context: document
	},
	
	init: function(config){
		if (config && typeof config == 'object') {
			$.extend(ThemifyGallery.config, config);
		}
		if (config.extraLightboxArgs && typeof config == 'object') {
			for (var attrname in config.extraLightboxArgs) {
				themifyScript.lightbox[attrname] = config.extraLightboxArgs[attrname];
			}
		}
		this.general();
		this.parseArgs();
		this.doLightbox();
		this.doFullscreen();
	},
	
	general: function(){
		context = this.config.context;
	},
	
	parseArgs: function(){
		$.each(themifyScript.lightbox, function(index, value){
			if( 'false' == value || 'true' == value ){
				themifyScript.lightbox[index] = 'false'!=value;
			} else if( parseInt(value) ){
				themifyScript.lightbox[index] = parseInt(value);
			} else if( parseFloat(value) ){
				themifyScript.lightbox[index] = parseFloat(value);
			}
		});
	},
	
	doLightbox: function(){
		context = this.config.context;
		
		if(typeof $.fn.magnificPopup !== 'undefined' && typeof themifyScript.lightbox.lightboxOn !== 'undefined') {
			
			// Lightbox Link
			$(context).on('click', ThemifyGallery.config.lightbox, function(event){
				event.preventDefault();
				var $self = $(this),
					$link = $(this).attr('href'),
					$type = ThemifyGallery.getFileType($link),
					$title = (typeof $(this).children('img').attr('alt') !== 'undefined') ? $(this).children('img').attr('alt') : $(this).attr('title');
					$iframe_width = (ThemifyGallery.isVideo($link)) ? '100%' : (ThemifyGallery.getParam('width', $link)) ? ThemifyGallery.getParam('width', $link) : '700';
					$iframe_height = (ThemifyGallery.isVideo($link)) ? '100%' : (ThemifyGallery.getParam('height', $link)) ? ThemifyGallery.getParam('height', $link) : '100%';
					if($iframe_width.indexOf("%") == -1) $iframe_width += 'px';
					if($iframe_height.indexOf("%") == -1) $iframe_height += 'px';
				var $args = {
					items: {
						src: $link,
						title: $title
					},
					type: $type,
					iframe: {
						markup: '<div class="mfp-iframe-scaler" style="max-width: '+$iframe_width+' !important; height: '+$iframe_height+';">'+
						'<div class="mfp-close"></div>'+
						'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
						'</div>',
					}
				};
				if($self.find('img').length > 0) {
					$.extend( $args, {
						mainClass: 'mfp-with-zoom',
						zoom: {
							enabled: true,
							duration: 300,
							easing: 'ease-in-out',
							opener: function(openerElement) {
								return $self.find('img');
							}
						}
					});
				}
				if(ThemifyGallery.isVideo($link)){
					$args['mainClass'] += ' video-frame';
				} else {
					$args['mainClass'] += ' standard-frame';
				}
				if(ThemifyGallery.isInIframe()) {
					window.parent.jQuery.magnificPopup.open($args);
				} else {
					$.magnificPopup.open($args);
				}
			});
			
			// Images in post content
			$(themifyScript.lightbox.contentImagesAreas, context).each(function(index) {
				var images = [],
					links = [];
				if(themifyScript.lightbox.lightboxContentImages && themifyScript.lightbox.lightboxGalleryOn){
					$(ThemifyGallery.config.lightboxContentImages, $(this)).filter( function(index){
						if(!$(this).parent().hasClass('gallery-icon') && !$(this).hasClass('lightbox')){
							links.push($(this));
							var description = $(this).attr('title');
							if($(this).next('.wp-caption-text').length > 0){
								// If there's a caption set for the image, use it
								description = $(this).next('.wp-caption-text').html();
							} else {
								// Otherwise, see if there's an alt attribute set
								description = $(this).children('img').attr('alt');
							}
							images.push({ src: $(this).attr('href'), title: description, type: 'image' });
							return $(this);
						}
					}).each(function(index) {
						if (links.length > 0) {
							$(this).on('click', function(event){
								event.preventDefault();
								var $self = $(this);
								var $args = {
									items: {
										src: images[index].src,
										title: images[index].title
									},
									type: 'image'
								};
								if($self.find('img').length > 0) {
									$.extend( $args, {
										mainClass: 'mfp-with-zoom',
										zoom: {
											enabled: true,
											duration: 300,
											easing: 'ease-in-out',
											opener: function(openerElement) {
												return $self.find('img');
											}
										}
									});
								}
								if(ThemifyGallery.isInIframe()) {
									window.parent.jQuery.magnificPopup.open($args);
								} else {
									$.magnificPopup.open($args);
								}
							});
						}
					});
				}
			});
			
			// Images in WP Gallery
			if(themifyScript.lightbox.lightboxGalleryOn){
				$(context).on('click', ThemifyGallery.config.lightboxGallery, function(event){
					event.preventDefault();
					var $gallery = $(ThemifyGallery.config.lightboxGallery, $(this).parent().parent().parent()),
						images = [];
					$gallery.each(function(index) {
						var description = $(this).attr('title');
						if($(this).parent().next('.gallery-caption').length > 0){
							// If there's a caption set for the image, use it
							description = $(this).parent().next('.wp-caption-text').html();
						} else {
							// Otherwise, see if there's an alt attribute set
							description = $(this).children('img').attr('alt');
						}
						images.push({ src: $(this).attr('href'), title: description, type: 'image' });
					});
					$args = {
						gallery: {
							enabled: true
						},
						items: images,
						mainClass: 'mfp-with-zoom',
						zoom: {
							enabled: true,
							duration: 300,
							easing: 'ease-in-out',
							opener: function(openerElement) {
								var imageEl = $($gallery[openerElement.index]);
								return imageEl.is('img') ? imageEl : imageEl.find('img');
							}
						}
					}
					if(ThemifyGallery.isInIframe()){
						window.parent.jQuery.magnificPopup.open($args, $gallery.index(this));
					} else {
						$.magnificPopup.open($args, $gallery.index(this));
					}
				});
			}
		}
	},
	
	doFullscreen: function(){
		if(this.config.context.selector){
			context = $(themifyScript.lightbox.contentImagesAreas, this.config.context);
		} else {
			context = this.config.context;
		}

		if( typeof $.fn.photoSwipe !== 'undefined' && typeof themifyScript.lightbox.fullscreenOn !== 'undefined' ) {

			$(context).each(function(index) {
				var $elf = $(this),
					settings = {
						target: window,
						preventHide: false,
						zIndex: 50000,
						getImageSource: function(obj){
							return obj.url;
						},
						getImageCaption: function(obj){
							return obj.caption;
						}
					};

				// Images in WP Gallery
				if($(ThemifyGallery.config.fullscreen, $elf).length > 0){
					var images = [],
						instance,
						id = $elf.attr('id');
					$(ThemifyGallery.config.fullscreen, $elf).each(function(index) {
						images.push({url: $(this).attr('href'), caption: $('img', this).attr('alt')});
					});

					for ( var attrname in themifyScript.lightbox ) {
						settings[attrname] = themifyScript.lightbox[attrname];
					}

					instance = Code.PhotoSwipe.getInstance(id);

					if( Code.Util.isNothing(instance) ) {
						instance = Code.PhotoSwipe.attach(
							images,
							settings,
							id
						);
					}
				}
				
				// Images in post content
				if(themifyScript.lightbox.lightboxContentImages && $(ThemifyGallery.config.lightboxContentImages, $elf).length > 0){
					$cimgs = $(ThemifyGallery.config.lightboxContentImages, $elf).filter( function(index){
						if(!$(this).parent().hasClass('gallery-icon') && !$(this).hasClass('lightbox'))
							return $(this);
					});
					if($cimgs.length > 0) {
						$cimgs.photoSwipe(themifyScript.lightbox);
					}
				}
			});

			if(themifyScript.lightbox.fullscreenOn){
				$(context).on('click', ThemifyGallery.config.fullscreen, function(e){
					e.preventDefault();
					var $a = $(this),
						id = $a.closest(themifyScript.lightbox.contentImagesAreas).attr('id');
					
					// get instance
					var instance = window.parent.Code.PhotoSwipe.getInstance(id);
					var index = 0;
					$.each(instance.cache.images, function(i, item) {
						if(item.src == $a.attr('href')) {
							index = i;
						}
					});
					instance.show(index);
				});
			}

		}
	},
	
	countItems : function(type){
		context = this.config.context;
		if('lightbox' == type) return $(this.config.lightbox, context).length + $(this.config.lightboxGallery, context).length + $(ThemifyGallery.config.lightboxContentImages, context).length;
		else return $(this.config.fullscreen, context).length + $(ThemifyGallery.config.lightboxContentImages, context).length;
	},

	isInIframe: function(){
		if( typeof ThemifyGallery.config.extraLightboxArgs !== 'undefined' ) {
			if( typeof ThemifyGallery.config.extraLightboxArgs.displayIframeContentsInParent !== 'undefined' && true == ThemifyGallery.config.extraLightboxArgs.displayIframeContentsInParent ) {
			return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	
	getFileType: function(itemSrc){
		if (itemSrc.match(/youtube\.com\/watch/i) || itemSrc.match(/youtu\.be/i)
			|| itemSrc.match(/vimeo\.com/i) || itemSrc.match(/\b.mov\b/i)
			|| itemSrc.match(/\b.swf\b/i) || itemSrc.match(/\biframe=true\b/i) ) {
			return 'iframe';
		} else if(itemSrc.match(/\bajax=true\b/i)) {
			return 'ajax';
		} else if(itemSrc.substr(0,1) == '#') {
			return 'inline';
		} else {
			return 'image';
		}
	},
	
	isVideo: function(itemSrc){
		if (itemSrc.match(/youtube\.com\/watch/i) || itemSrc.match(/youtu\.be/i)
			|| itemSrc.match(/vimeo\.com/i) || itemSrc.match(/\b.mov\b/i)
			|| itemSrc.match(/\b.swf\b/i)) {
			return true;
		} else {
			return false;
		}
	},
	
	getParam: function(name, url){
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(url);
		return(results==null) ? "" : results[1];
	}
};

}(jQuery));