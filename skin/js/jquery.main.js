// page init
jQuery(function(){
	jcf.customForms.replaceAll();
	initSlideShow();
	initCarousel();
	clearFormFields({
		clearInputs: true,
		clearTextareas: true,
		passwordFieldText: true,
		addClassFocus: "focus",
		filterClass: "default"
	});
});

// fade gallery init
function initSlideShow() {
	jQuery('div.main-gallery').fadeGallery({
		slides: 'ul.fade > li',
		btnPrev: '.tools a.btn-prev',
		btnNext: '.tools a.btn-next',
		pagerLinks: '.switcher li',
		event: 'click',
		autoRotation: true,
		autoHeight: true,
		switchTime: 3000,
		animSpeed: 500
	});
}
// accordion init
function initCarousel() {
	jQuery('div.switcher').scrollGallery({
		mask: 'div.mask',
		slider: '>ul',
		slides: '>li',
		disableWhileAnimating: true,
		generatePagination: 'div.pagination',
		circularRotation: true,
		pauseOnHover: false,
		autoRotation: true,
		maskAutoSize: false,
		switchTime: 4000,
		animSpeed: 600,
		step: 1
	});
}
/* clear input */
function clearFormFields(o)
{
	if (o.clearInputs == null) o.clearInputs = true;
	if (o.clearTextareas == null) o.clearTextareas = true;
	if (o.passwordFieldText == null) o.passwordFieldText = false;
	if (o.addClassFocus == null) o.addClassFocus = false;
	if (!o.filterClass) o.filterClass = "default";
	if(o.clearInputs) {
		var inputs = document.getElementsByTagName("input");
		for (var i = 0; i < inputs.length; i++ ) {
			if((inputs[i].type == "text" || inputs[i].type == "password") && inputs[i].className.indexOf(o.filterClass) == -1) {
				inputs[i].valueHtml = inputs[i].value;
				inputs[i].onfocus = function ()	{
					if(this.valueHtml == this.value) this.value = "";
					if(this.fake) {
						inputsSwap(this, this.previousSibling);
						this.previousSibling.focus();
					}
					if(o.addClassFocus && !this.fake) {
						this.className += " " + o.addClassFocus;
						this.parentNode.className += " parent-" + o.addClassFocus;
					}
				}
				inputs[i].onblur = function () {
					if(this.value == "") {
						this.value = this.valueHtml;
						if(o.passwordFieldText && this.type == "password") inputsSwap(this, this.nextSibling);
					}
					if(o.addClassFocus) {
						this.className = this.className.replace(o.addClassFocus, "");
						this.parentNode.className = this.parentNode.className.replace("parent-"+o.addClassFocus, "");
					}
				}
				if(o.passwordFieldText && inputs[i].type == "password") {
					var fakeInput = document.createElement("input");
					fakeInput.type = "text";
					fakeInput.value = inputs[i].value;
					fakeInput.className = inputs[i].className;
					fakeInput.fake = true;
					inputs[i].parentNode.insertBefore(fakeInput, inputs[i].nextSibling);
					inputsSwap(inputs[i], null);
				}
			}
		}
	}
	if(o.clearTextareas) {
		var textareas = document.getElementsByTagName("textarea");
		for(var i=0; i<textareas.length; i++) {
			if(textareas[i].className.indexOf(o.filterClass) == -1) {
				textareas[i].valueHtml = textareas[i].value;
				textareas[i].onfocus = function() {
					if(this.value == this.valueHtml) this.value = "";
					if(o.addClassFocus) {
						this.className += " " + o.addClassFocus;
						this.parentNode.className += " parent-" + o.addClassFocus;
					}
				}
				textareas[i].onblur = function() {
					if(this.value == "") this.value = this.valueHtml;
					if(o.addClassFocus) {
						this.className = this.className.replace(o.addClassFocus, "");
						this.parentNode.className = this.parentNode.className.replace("parent-"+o.addClassFocus, "");
					}
				}
			}
		}
	}
	function inputsSwap(el, el2) {
		if(el) el.style.display = "none";
		if(el2) el2.style.display = "inline";
	}
}
var _content_box = "content";
function initMain(){
	var _div = document.getElementsByTagName("div");
	for(var i=0; i<_div.length; i++){
		if (_div[i].className.indexOf(_content_box) !=-1) {
			var _box = _div[i].getElementsByTagName("div")[0];
			if(_box){
				_div[i].parentNode.parentNode.style.width = _box.offsetWidth + "px";
			}
		}
	}
}
jQuery(function(){
			var h = jQuery('#open-close').height();
			var activeClass = 'active';
			jQuery('#open-close').css({ height: 0 });
			
			jQuery('.opener').bind('click', function(){
				if(!jQuery('#open-close').hasClass(activeClass)){
					jQuery('#open-close').addClass(activeClass)
					jQuery('#sidebar').addClass(activeClass)
					jQuery('#open-close').animate({
						height: h
					}, 2000);
				}
				else {
					jQuery('#open-close').removeClass(activeClass)
					jQuery('#sidebar').removeClass(activeClass)
					jQuery('#open-close').animate({
						height: 0
					}, 2000);
				}
				return false;
			});
		});
/*
 * jQuery SlideShow plugin
 */
;(function($){
	function FadeGallery(options) {
		this.options = $.extend({
			slides: 'ul.slideset > li',
			activeClass:'active',
			disabledClass:'disabled',
			btnPrev: 'a.btn-prev',
			btnNext: 'a.btn-next',
			generatePagination: false,
			pagerList: '<ul>',
			pagerListItem: '<li><a href="#"></a></li>',
			pagerListItemText: 'a',
			pagerLinks: '.pagination li',
			currentNumber: 'span.current-num',
			totalNumber: 'span.total-num',
			btnPlay: '.btn-play',
			btnPause: '.btn-pause',
			btnPlayPause: '.tools .btn-play-pause',
			autorotationActiveClass: 'autorotation-active',
			autorotationDisabledClass: 'autorotation-disabled',
			autorotationStopAfterClick: false,
			circularRotation: true,
			switchSimultaneously: true,
			disableWhileAnimating: false,
			disableFadeIE: false,
			autoRotation: false,
			pauseOnHover: false,
			autoHeight: false,
			useSwipe: false,
			switchTime: 4000,
			animSpeed: 600,
			event:'click'
		}, options);
		this.init();
	}
	FadeGallery.prototype = {
		init: function() {
			if(this.options.holder) {
				this.findElements();
				this.initStructure();
				this.attachEvents();
				this.refreshState(true);
				this.autoRotate();
				this.makeCallback('onInit', this);
			}
		},
		findElements: function() {
			// control elements
			this.gallery = $(this.options.holder);
			this.slides = this.gallery.find(this.options.slides);
			this.slidesHolder = this.slides.eq(0).parent();
			this.stepsCount = this.slides.length;
			this.btnPrev = this.gallery.find(this.options.btnPrev);
			this.btnNext = this.gallery.find(this.options.btnNext);
			this.currentIndex = 0;
			
			// disable fade effect in old IE
			if(this.options.disableFadeIE && $.browser.msie && $.browser.version < 9) {
				this.options.animSpeed = 0;
			}
			
			// create gallery pagination
			if(typeof this.options.generatePagination === 'string') {
				this.pagerHolder = this.gallery.find(this.options.generatePagination).empty();
				this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
				for(var i = 0; i < this.stepsCount; i++) {
					$(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i+1);
				}
				this.pagerLinks = this.pagerList.children();
			} else {
				this.pagerLinks = this.gallery.find(this.options.pagerLinks);
			}
			
			// get start index
			var activeSlide = this.slides.filter('.'+this.options.activeClass);
			if(activeSlide.length) {
				this.currentIndex = this.slides.index(activeSlide);
			}
			this.prevIndex = this.currentIndex;
			
			// autorotation control buttons
			this.btnPlay = this.gallery.find(this.options.btnPlay);
			this.btnPause = this.gallery.find(this.options.btnPause);
			this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);
			
			// misc elements
			this.curNum = this.gallery.find(this.options.currentNumber);
			this.allNum = this.gallery.find(this.options.totalNumber);
			
			// handle flexible layout
			$(window).bind('load resize orientationchange', $.proxy(this.onWindowResize, this));
		},
		initStructure: function() {
			this.slides.css({display:'block',opacity:0}).eq(this.currentIndex).css({
				opacity:''
			});
		},
		attachEvents: function() {
			var self = this;
			this.btnPrev.bind(this.options.event, function(e){
				self.prevSlide();
				if(self.options.autorotationStopAfterClick) {
					self.stopRotation();
				}
				e.preventDefault();
			});
			this.btnNext.bind(this.options.event, function(e){
				self.nextSlide();
				if(self.options.autorotationStopAfterClick) {
					self.stopRotation();
				}
				e.preventDefault();
			});
			this.pagerLinks.each(function(ind, obj){
				$(obj).bind(self.options.event, function(e){
					self.numSlide(ind);
					if(self.options.autorotationStopAfterClick) {
						self.stopRotation();
					}
					e.preventDefault();
				});
			});
			
			// autorotation buttons handler
			this.btnPlay.bind(this.options.event, function(e){
				self.startRotation();
				e.preventDefault();
			});
			this.btnPause.bind(this.options.event, function(e){
				self.stopRotation();
				e.preventDefault();
			});
			this.btnPlayPause.bind(this.options.event, function(e){
				if(!self.gallery.hasClass(self.options.autorotationActiveClass)) {
					self.startRotation();
				} else {
					self.stopRotation();
				}
				e.preventDefault();
			});

			// swipe gestures handler
			if(this.options.useSwipe && $.fn.swipe) {
				this.gallery.swipe({
					swipeLeft: function() {
						self.nextSlide();
					},
					swipeRight: function() {
						self.prevSlide();
					}
				});
			}
			
			// pause on hover handling
			if(this.options.pauseOnHover) {
				this.gallery.hover(function(){
					if(self.options.autoRotation) {
						self.galleryHover = true;
						self.pauseRotation();
					}
				}, function(){
					if(self.options.autoRotation) {
						self.galleryHover = false;
						self.resumeRotation();
					}
				});
			}
		},
		onWindowResize: function(){
			if(this.options.autoHeight) {
				this.slidesHolder.css({height: this.slides.eq(this.currentIndex).outerHeight(true) });
			}
		},
		prevSlide: function() {
			if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
				this.prevIndex = this.currentIndex;
				if(this.currentIndex > 0) {
					this.currentIndex--;
					this.switchSlide();
				} else if(this.options.circularRotation) {
					this.currentIndex = this.stepsCount - 1;
					this.switchSlide();
				}
			}
		},
		nextSlide: function(fromAutoRotation) {
			if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
				this.prevIndex = this.currentIndex;
				if(this.currentIndex < this.stepsCount - 1) {
					this.currentIndex++;
					this.switchSlide();
				} else if(this.options.circularRotation || fromAutoRotation === true) {
					this.currentIndex = 0;
					this.switchSlide();
				}
			}
		},
		numSlide: function(c) {
			if(this.currentIndex != c) {
				this.prevIndex = this.currentIndex;
				this.currentIndex = c;
				this.switchSlide();
			}
		},
		switchSlide: function() {
			var self = this;
			if(this.slides.length > 1) {
				this.galleryAnimating = true;
				if(!this.options.animSpeed) {
					this.slides.eq(this.prevIndex).css({opacity:0});
				} else {
					this.slides.eq(this.prevIndex).stop().animate({opacity:0},{duration: this.options.animSpeed});
				}
				
				this.switchNext = function() {
					if(!self.options.animSpeed) {
						self.slides.eq(self.currentIndex).css({opacity:''});
					} else {
						self.slides.eq(self.currentIndex).stop().animate({opacity:1},{duration: self.options.animSpeed});
					}
					setTimeout(function() {
						self.slides.eq(self.currentIndex).css({opacity:''});
						self.galleryAnimating = false;
						self.autoRotate();
						
						// onchange callback
						self.makeCallback('onChange', self);
					}, self.options.animSpeed);
				}
				
				if(this.options.switchSimultaneously) {
					self.switchNext();
				} else {
					clearTimeout(this.switchTimer);
					this.switchTimer = setTimeout(function(){
						self.switchNext();
					}, this.options.animSpeed);
				}
				this.refreshState();
				
				// onchange callback
				this.makeCallback('onBeforeChange', this);
			}
		},
		refreshState: function(initial) {
			this.slides.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
			this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
			this.curNum.html(this.currentIndex+1);
			this.allNum.html(this.stepsCount);
			
			// initial refresh
			if(this.options.autoHeight) {
				if(initial) {
					this.slidesHolder.css({height: this.slides.eq(this.currentIndex).outerHeight(true) });
				} else {
					this.slidesHolder.stop().animate({height: this.slides.eq(this.currentIndex).outerHeight(true)}, {duration: this.options.animSpeed});
				}
			}
			
			// disabled state
			if(!this.options.circularRotation) {
				this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
				if(this.currentIndex === 0) this.btnPrev.addClass(this.options.disabledClass);
				if(this.currentIndex === this.stepsCount - 1) this.btnNext.addClass(this.options.disabledClass);
			}
		},
		startRotation: function() {
			this.options.autoRotation = true;
			this.galleryHover = false;
			this.autoRotationStopped = false;
			this.resumeRotation();
		},
		stopRotation: function() {
			this.galleryHover = true;
			this.autoRotationStopped = true;
			this.pauseRotation();
		},
		pauseRotation: function() {
			this.gallery.addClass(this.options.autorotationDisabledClass);
			this.gallery.removeClass(this.options.autorotationActiveClass);
			clearTimeout(this.timer);
		},
		resumeRotation: function() {
			if(!this.autoRotationStopped) {
				this.gallery.addClass(this.options.autorotationActiveClass);
				this.gallery.removeClass(this.options.autorotationDisabledClass);
				this.autoRotate();
			}
		},
		autoRotate: function() {
			var self = this;
			clearTimeout(this.timer);
			if(this.options.autoRotation && !this.galleryHover && !this.autoRotationStopped) {
				this.gallery.addClass(this.options.autorotationActiveClass);
				this.timer = setTimeout(function(){
					self.nextSlide(true);
				}, this.options.switchTime);
			} else {
				this.pauseRotation();
			}
		},
		makeCallback: function(name) {
			if(typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		}
	}

	// jquery plugin
	$.fn.fadeGallery = function(opt){
		return this.each(function(){
			$(this).data('FadeGallery', new FadeGallery($.extend(opt,{holder:this})));
		});
	}
}(jQuery));

/*
* touchSwipe - jQuery Plugin
* https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* http://labs.skinkers.com/touchSwipe/
* http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson (www.skinkers.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* $version: 1.3.3
*/;(function(g){function P(c){if(c&&void 0===c.allowPageScroll&&(void 0!==c.swipe||void 0!==c.swipeStatus))c.allowPageScroll=G;c||(c={});c=g.extend({},g.fn.swipe.defaults,c);return this.each(function(){var b=g(this),f=b.data(w);f||(f=new W(this,c),b.data(w,f))})}function W(c,b){var f,p,r,s;function H(a){var a=a.originalEvent,c,Q=n?a.touches[0]:a;d=R;n?h=a.touches.length:a.preventDefault();i=0;j=null;k=0;!n||h===b.fingers||b.fingers===x?(r=f=Q.pageX,s=p=Q.pageY,y=(new Date).getTime(),b.swipeStatus&&(c= l(a,d))):t(a);if(!1===c)return d=m,l(a,d),c;e.bind(I,J);e.bind(K,L)}function J(a){a=a.originalEvent;if(!(d===q||d===m)){var c,e=n?a.touches[0]:a;f=e.pageX;p=e.pageY;u=(new Date).getTime();j=S();n&&(h=a.touches.length);d=z;var e=a,g=j;if(b.allowPageScroll===G)e.preventDefault();else{var o=b.allowPageScroll===T;switch(g){case v:(b.swipeLeft&&o||!o&&b.allowPageScroll!=M)&&e.preventDefault();break;case A:(b.swipeRight&&o||!o&&b.allowPageScroll!=M)&&e.preventDefault();break;case B:(b.swipeUp&&o||!o&&b.allowPageScroll!= N)&&e.preventDefault();break;case C:(b.swipeDown&&o||!o&&b.allowPageScroll!=N)&&e.preventDefault()}}h===b.fingers||b.fingers===x||!n?(i=U(),k=u-y,b.swipeStatus&&(c=l(a,d,j,i,k)),b.triggerOnTouchEnd||(e=!(b.maxTimeThreshold?!(k>=b.maxTimeThreshold):1),!0===D()?(d=q,c=l(a,d)):e&&(d=m,l(a,d)))):(d=m,l(a,d));!1===c&&(d=m,l(a,d))}}function L(a){a=a.originalEvent;a.preventDefault();u=(new Date).getTime();i=U();j=S();k=u-y;if(b.triggerOnTouchEnd||!1===b.triggerOnTouchEnd&&d===z)if(d=q,(h===b.fingers||b.fingers=== x||!n)&&0!==f){var c=!(b.maxTimeThreshold?!(k>=b.maxTimeThreshold):1);if((!0===D()||null===D())&&!c)l(a,d);else if(c||!1===D())d=m,l(a,d)}else d=m,l(a,d);else d===z&&(d=m,l(a,d));e.unbind(I,J,!1);e.unbind(K,L,!1)}function t(){y=u=p=f=s=r=h=0}function l(a,c){var d=void 0;b.swipeStatus&&(d=b.swipeStatus.call(e,a,c,j||null,i||0,k||0,h));if(c===m&&b.click&&(1===h||!n)&&(isNaN(i)||0===i))d=b.click.call(e,a,a.target);if(c==q)switch(b.swipe&&(d=b.swipe.call(e,a,j,i,k,h)),j){case v:b.swipeLeft&&(d=b.swipeLeft.call(e, a,j,i,k,h));break;case A:b.swipeRight&&(d=b.swipeRight.call(e,a,j,i,k,h));break;case B:b.swipeUp&&(d=b.swipeUp.call(e,a,j,i,k,h));break;case C:b.swipeDown&&(d=b.swipeDown.call(e,a,j,i,k,h))}(c===m||c===q)&&t(a);return d}function D(){return null!==b.threshold?i>=b.threshold:null}function U(){return Math.round(Math.sqrt(Math.pow(f-r,2)+Math.pow(p-s,2)))}function S(){var a;a=Math.atan2(p-s,r-f);a=Math.round(180*a/Math.PI);0>a&&(a=360-Math.abs(a));return 45>=a&&0<=a?v:360>=a&&315<=a?v:135<=a&&225>=a? A:45<a&&135>a?C:B}function V(){e.unbind(E,H);e.unbind(F,t);e.unbind(I,J);e.unbind(K,L)}var O=n||!b.fallbackToMouseEvents,E=O?"touchstart":"mousedown",I=O?"touchmove":"mousemove",K=O?"touchend":"mouseup",F="touchcancel",i=0,j=null,k=0,e=g(c),d="start",h=0,y=p=f=s=r=0,u=0;try{e.bind(E,H),e.bind(F,t)}catch(P){g.error("events not supported "+E+","+F+" on jQuery.swipe")}this.enable=function(){e.bind(E,H);e.bind(F,t);return e};this.disable=function(){V();return e};this.destroy=function(){V();e.data(w,null); return e}}var v="left",A="right",B="up",C="down",G="none",T="auto",M="horizontal",N="vertical",x="all",R="start",z="move",q="end",m="cancel",n="ontouchstart"in window,w="TouchSwipe";g.fn.swipe=function(c){var b=g(this),f=b.data(w);if(f&&"string"===typeof c){if(f[c])return f[c].apply(this,Array.prototype.slice.call(arguments,1));g.error("Method "+c+" does not exist on jQuery.swipe")}else if(!f&&("object"===typeof c||!c))return P.apply(this,arguments);return b};g.fn.swipe.defaults={fingers:1,threshold:75, maxTimeThreshold:null,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,click:null,triggerOnTouchEnd:!0,allowPageScroll:"auto",fallbackToMouseEvents:!0};g.fn.swipe.phases={PHASE_START:R,PHASE_MOVE:z,PHASE_END:q,PHASE_CANCEL:m};g.fn.swipe.directions={LEFT:v,RIGHT:A,UP:B,DOWN:C};g.fn.swipe.pageScroll={NONE:G,HORIZONTAL:M,VERTICAL:N,AUTO:T};g.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:x}})(jQuery);

/*
 * JavaScript Custom Forms Module
 */
jcf = {
	// global options
	modules: {},
	plugins: {},
	baseOptions: {
		useNativeDropOnMobileDevices: true,
		unselectableClass:'jcf-unselectable', 
		labelActiveClass:'jcf-label-active',
		labelDisabledClass:'jcf-label-disabled',
		classPrefix: 'jcf-class-',
		hiddenClass:'jcf-hidden',
		focusClass:'jcf-focus',
		wrapperTag: 'div'
	},
	// replacer function
	customForms: {
		setOptions: function(obj) {
			for(var p in obj) {
				if(obj.hasOwnProperty(p) && typeof obj[p] === 'object') {
					jcf.lib.extend(jcf.modules[p].prototype.defaultOptions, obj[p]);
				}
			}
		},
		replaceAll: function() {
			for(var k in jcf.modules) {
				var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
				for(var i = 0; i<els.length; i++) {
					if(els[i].jcf) {
						// refresh form element state
						els[i].jcf.refreshState();
					} else {
						// replace form element
						if(!jcf.lib.hasClass(els[i], 'default') && jcf.modules[k].prototype.checkElement(els[i])) {
							new jcf.modules[k]({
								replaces:els[i]
							});
						}
					}
				}
			}
		},
		refreshAll: function() {
			for(var k in jcf.modules) {
				var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
				for(var i = 0; i<els.length; i++) {
					if(els[i].jcf) {
						// refresh form element state
						els[i].jcf.refreshState();
					}
				}
			}
		},
		refreshElement: function(obj) {
			if(obj && obj.jcf) {
				obj.jcf.refreshState();
			}
		},
		destroyAll: function() {
			for(var k in jcf.modules) {
				var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
				for(var i = 0; i<els.length; i++) {
					if(els[i].jcf) {
						els[i].jcf.destroy();
					}
				}
			}
		}
	},	
	// detect device type
	isTouchDevice: (function() {
		try {
			return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		} catch (e) {
			return false;
		}
	}()),
	// define base module
	setBaseModule: function(obj) {
		jcf.customControl = function(opt){
			this.options = jcf.lib.extend({}, jcf.baseOptions, this.defaultOptions, opt);
			this.init();
		}
		for(var p in obj) {
			jcf.customControl.prototype[p] = obj[p];
		}
	},
	// add module to jcf.modules
	addModule: function(obj) {
		if(obj.name){
			// create new module proto class
			jcf.modules[obj.name] = function(){
				jcf.modules[obj.name].superclass.constructor.apply(this, arguments);
			}
			jcf.lib.inherit(jcf.modules[obj.name], jcf.customControl);
			for(var p in obj) {
				jcf.modules[obj.name].prototype[p] = obj[p]
			}
			// on create module
			jcf.modules[obj.name].prototype.onCreateModule();
			// make callback for exciting modules
			for(var mod in jcf.modules) {
				if(jcf.modules[mod] != jcf.modules[obj.name]) {
					jcf.modules[mod].prototype.onModuleAdded(jcf.modules[obj.name]);
				}
			}
		}
	},
	// add plugin to jcf.plugins
	addPlugin: function(obj) {
		if(obj && obj.name) {
			jcf.plugins[obj.name] = function() {
				this.init.apply(this, arguments);
			}
			for(var p in obj) {
				jcf.plugins[obj.name].prototype[p] = obj[p];
			}
		}
	},
	// miscellaneous init
	init: function(){
		this.eventPress = this.isTouchDevice ? 'touchstart' : 'mousedown';
		this.eventMove = this.isTouchDevice ? 'touchmove' : 'mousemove';
		this.eventRelease = this.isTouchDevice ? 'touchend' : 'mouseup';

		// init jcf styles
		setTimeout(function(){
			jcf.lib.domReady(function(){
				jcf.initStyles();
			});
		},1);
		return this;
	},
	initStyles: function() {
		// create <style> element and rules
		var head = document.getElementsByTagName('head')[0],
			style = document.createElement('style'),
			rules = document.createTextNode('.'+jcf.baseOptions.unselectableClass+'{'+
				'-moz-user-select:none;'+
				'-webkit-tap-highlight-color:rgba(255,255,255,0);'+
				'-webkit-user-select:none;'+
				'user-select:none;'+
			'}');
		
		// append style element
		style.type = 'text/css';
		if(style.styleSheet) {
			style.styleSheet.cssText = rules.nodeValue;
		} else {
			style.appendChild(rules);
		}
		head.appendChild(style);
	}
}.init();

/*
 * Custom Form Control prototype
 */
jcf.setBaseModule({
	init: function(){
		if(this.options.replaces) {
			this.realElement = this.options.replaces;
			this.realElement.jcf = this;
			this.replaceObject();
		}
	},
	defaultOptions: {
		// default module options (will be merged with base options)
	},
	checkElement: function(el){
		return true; // additional check for correct form element
	},
	replaceObject: function(){
		this.createWrapper();
		this.attachEvents();
		this.fixStyles();
		this.setupWrapper();
	},
	createWrapper: function(){
		this.fakeElement = jcf.lib.createElement(this.options.wrapperTag);
		this.labelFor = jcf.lib.getLabelFor(this.realElement);
		jcf.lib.disableTextSelection(this.fakeElement);
		jcf.lib.addClass(this.fakeElement, jcf.lib.getAllClasses(this.realElement.className, this.options.classPrefix));
		jcf.lib.addClass(this.realElement, jcf.baseOptions.hiddenClass);
	},
	attachEvents: function(){
		jcf.lib.event.add(this.realElement, 'focus', this.onFocusHandler, this);
		jcf.lib.event.add(this.realElement, 'blur', this.onBlurHandler, this);
		jcf.lib.event.add(this.fakeElement, 'click', this.onFakeClick, this);
		jcf.lib.event.add(this.fakeElement, jcf.eventPress, this.onFakePressed, this);
		jcf.lib.event.add(this.fakeElement, jcf.eventRelease, this.onFakeReleased, this);

		if(this.labelFor) {
			this.labelFor.jcf = this;
			jcf.lib.event.add(this.labelFor, 'click', this.onFakeClick, this);
			jcf.lib.event.add(this.labelFor, jcf.eventPress, this.onFakePressed, this);
			jcf.lib.event.add(this.labelFor, jcf.eventRelease, this.onFakeReleased, this);
		}
	},
	fixStyles: function() {
		// hide mobile webkit tap effect
		if(jcf.isTouchDevice) {
			var tapStyle = 'rgba(255,255,255,0)';
			this.realElement.style.webkitTapHighlightColor = tapStyle; 
			this.fakeElement.style.webkitTapHighlightColor = tapStyle; 
			if(this.labelFor) {
				this.labelFor.style.webkitTapHighlightColor = tapStyle; 
			}
		}
	},
	setupWrapper: function(){
		// implement in subclass
	},
	refreshState: function(){
		// implement in subclass
	},
	destroy: function() {
		if(this.fakeElement && this.fakeElement.parentNode) {
			this.fakeElement.parentNode.removeChild(this.fakeElement);
		}
		jcf.lib.removeClass(this.realElement, jcf.baseOptions.hiddenClass);
		this.realElement.jcf = null;
	},
	onFocus: function(){
		// emulated focus event
		jcf.lib.addClass(this.fakeElement,this.options.focusClass);
	},
	onBlur: function(cb){
		// emulated blur event
		jcf.lib.removeClass(this.fakeElement,this.options.focusClass);
	},
	onFocusHandler: function() {
		// handle focus loses
		if(this.focused) return;
		this.focused = true;
		
		// handle touch devices also
		if(jcf.isTouchDevice) {
			if(jcf.focusedInstance && jcf.focusedInstance.realElement != this.realElement) {
				jcf.focusedInstance.onBlur();
				jcf.focusedInstance.realElement.blur();
			}
			jcf.focusedInstance = this;
		}
		this.onFocus.apply(this, arguments);
	},
	onBlurHandler: function() {
		// handle focus loses
		if(!this.pressedFlag) {
			this.focused = false;
			this.onBlur.apply(this, arguments);
		}
	},
	onFakeClick: function(){
		if(jcf.isTouchDevice) {
			this.onFocus();
		} else if(!this.realElement.disabled) {
			this.realElement.focus();
		}
	},
	onFakePressed: function(e){
		this.pressedFlag = true;
	},
	onFakeReleased: function(){
		this.pressedFlag = false;
	},
	onCreateModule: function(){
		// implement in subclass
	},
	onModuleAdded: function(module) {
		// implement in subclass
	},
	onControlReady: function() {
		// implement in subclass
	}
});

/*
 * JCF Utility Library
 */
jcf.lib = {
	bind: function(func, scope){
		return function() {
			return func.apply(scope, arguments);
		}
	},
	browser: (function() {
		var ua = navigator.userAgent.toLowerCase(), res = {},
		match = /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
				/(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [];
		res[match[1]] = true;
		res.version = match[2] || "0";
		res.safariMac = ua.indexOf('mac') != -1 && ua.indexOf('safari') != -1;
		return res;
	})(),
	getOffset: function (obj) {
		if (obj.getBoundingClientRect) {
			var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
			var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
			return {
				top:Math.round(obj.getBoundingClientRect().top + scrollTop - clientTop),
				left:Math.round(obj.getBoundingClientRect().left + scrollLeft - clientLeft)
			}
		} else {
			var posLeft = 0, posTop = 0;
			while (obj.offsetParent) {posLeft += obj.offsetLeft; posTop += obj.offsetTop; obj = obj.offsetParent;}
			return {top:posTop,left:posLeft};
		}
	},
	getScrollTop: function() {
		return window.pageYOffset || document.documentElement.scrollTop;
	},
	getScrollLeft: function() {
		return window.pageXOffset || document.documentElement.scrollLeft;
	},
	getWindowWidth: function(){
		return document.compatMode=='CSS1Compat' ? document.documentElement.clientWidth : document.body.clientWidth;
	},
	getWindowHeight: function(){
		return document.compatMode=='CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight;
	},
	getStyle: function(el, prop) {
		if (document.defaultView && document.defaultView.getComputedStyle) {
			return document.defaultView.getComputedStyle(el, null)[prop];
		} else if (el.currentStyle) {
			return el.currentStyle[prop];
		} else {
			return el.style[prop];
		}
	},
	getParent: function(obj, selector) {
		while(obj.parentNode && obj.parentNode != document.body) {
			if(obj.parentNode.tagName.toLowerCase() == selector.toLowerCase()) {
				return obj.parentNode;
			}
			obj = obj.parentNode;
		}
		return false;
	},
	isParent: function(child, parent) {
		while(child.parentNode) {
			if(child.parentNode === parent) {
				return true;
			}
			child = child.parentNode;
		}
		return false;
	},
	getLabelFor: function(object) {
		if(jcf.lib.getParent(object,'label')) {
			return object.parentNode;
		} else if(object.id) {
			return jcf.lib.queryBySelector('label[for="' + object.id + '"]')[0];
		}
	},
	disableTextSelection: function(el){
		if (typeof el.onselectstart !== 'undefined') {
			el.onselectstart = function() {return false};
		} else if(window.opera) {
			el.setAttribute('unselectable', 'on');
		} else {
			jcf.lib.addClass(el, jcf.baseOptions.unselectableClass);
		}
	},
	enableTextSelection: function(el) {
		if (typeof el.onselectstart !== 'undefined') {
			el.onselectstart = null;
		} else if(window.opera) {
			el.removeAttribute('unselectable');
		} else {
			jcf.lib.removeClass(el, jcf.baseOptions.unselectableClass);
		}
	},
	queryBySelector: function(selector, scope){
		return this.getElementsBySelector(selector, scope);
	},
	prevSibling: function(node) {
		while(node = node.previousSibling) if(node.nodeType == 1) break;
		return node;
	},
	nextSibling: function(node) {
		while(node = node.nextSibling) if(node.nodeType == 1) break;
		return node;
	},
	fireEvent: function(element,event) {
		if(element.dispatchEvent){
			var evt = document.createEvent('HTMLEvents');
			evt.initEvent(event, true, true );
			return !element.dispatchEvent(evt);
		}else if(document.createEventObject){
			var evt = document.createEventObject();
			return element.fireEvent('on'+event,evt);
		}
	},
	isParent: function(p, c) {
		while(c.parentNode) {
			if(p == c) {
				return true;
			}
			c = c.parentNode;
		}
		return false;
	},
	inherit: function(Child, Parent) {
		var F = function() { }
		F.prototype = Parent.prototype
		Child.prototype = new F()
		Child.prototype.constructor = Child
		Child.superclass = Parent.prototype
	},
	extend: function(obj) {
		for(var i = 1; i < arguments.length; i++) {
			for(var p in arguments[i]) {
				if(arguments[i].hasOwnProperty(p)) {
					obj[p] = arguments[i][p];
				}
			}
		}
		return obj;
	},
	hasClass: function (obj,cname) {
		return (obj.className ? obj.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')) : false);
	},
	addClass: function (obj,cname) {
		if (!this.hasClass(obj,cname)) obj.className += (!obj.className.length || obj.className.charAt(obj.className.length - 1) === ' ' ? '' : ' ') + cname;
	},
	removeClass: function (obj,cname) {
		if (this.hasClass(obj,cname)) obj.className=obj.className.replace(new RegExp('(\\s|^)'+cname+'(\\s|$)'),' ').replace(/\s+$/, '');
	},
	toggleClass: function(obj, cname, condition) {
		if(condition) this.addClass(obj, cname); else this.removeClass(obj, cname);
	},
	createElement: function(tagName, options) {
		var el = document.createElement(tagName);
		for(var p in options) {
			if(options.hasOwnProperty(p)) {
				switch (p) {
					case 'class': el.className = options[p]; break;
					case 'html': el.innerHTML = options[p]; break;
					case 'style': this.setStyles(el, options[p]); break;
					default: el.setAttribute(p, options[p]);
				}
			}
		}
		return el;
	},
	setStyles: function(el, styles) {
		for(var p in styles) {
			if(styles.hasOwnProperty(p)) {
				switch (p) {
					case 'float': el.style.cssFloat = styles[p]; break;
					case 'opacity': el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+styles[p]*100+')'; el.style.opacity = styles[p]; break;
					default: el.style[p] = (typeof styles[p] === 'undefined' ? 0 : styles[p]) + (typeof styles[p] === 'number' ? 'px' : '');
				}
			}
		}
		return el;
	},
	getInnerWidth: function(el) {
		return el.offsetWidth - (parseInt(this.getStyle(el,'paddingLeft')) || 0) - (parseInt(this.getStyle(el,'paddingRight')) || 0);
	},
	getInnerHeight: function(el) {
		return el.offsetHeight - (parseInt(this.getStyle(el,'paddingTop')) || 0) - (parseInt(this.getStyle(el,'paddingBottom')) || 0);
	},
	getAllClasses: function(cname, prefix, skip) {
		if(!skip) skip = '';
		if(!prefix) prefix = '';
		return cname ? cname.replace(new RegExp('(\\s|^)'+skip+'(\\s|$)'),' ').replace(/[\s]*([\S]+)+[\s]*/gi,prefix+"$1 ") : '';
	},
	getElementsBySelector: function(selector, scope) {
		if(typeof document.querySelectorAll === 'function') {
			return (scope || document).querySelectorAll(selector);
		}
		var selectors = selector.split(',');
		var resultList = [];
		for(var s = 0; s < selectors.length; s++) {
			var currentContext = [scope || document];
			var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
			for (var i = 0; i < tokens.length; i++) {
				token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
				if (token.indexOf('#') > -1) {
					var bits = token.split('#'), tagName = bits[0], id = bits[1];
					var element = document.getElementById(id);
					if (tagName && element.nodeName.toLowerCase() != tagName) {
						return [];
					}
					currentContext = [element];
					continue;
				}
				if (token.indexOf('.') > -1) {
					var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; j < elements.length; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
					var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
					if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
						attrName = 'htmlFor';
					}
					var found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; elements[j]; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0, checkFunction;
					switch (attrOperator) {
						case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
						case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
						case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
						case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
						case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
						case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
						default : checkFunction = function(e) { return e.getAttribute(attrName) };
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (checkFunction(found[k])) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				tagName = token;
				var found = [], foundCount = 0;
				for (var h = 0; h < currentContext.length; h++) {
					var elements = currentContext[h].getElementsByTagName(tagName);
					for (var j = 0; j < elements.length; j++) {
						found[foundCount++] = elements[j];
					}
				}
				currentContext = found;
			}
			resultList = [].concat(resultList,currentContext);
		}
		return resultList;
	},
	scrollSize: (function(){
		var content, hold, sizeBefore, sizeAfter;
		function buildSizer(){
			if(hold) removeSizer();
			content = document.createElement('div');
			hold = document.createElement('div');
			hold.style.cssText = 'position:absolute;overflow:hidden;width:100px;height:100px';
			hold.appendChild(content);
			document.body.appendChild(hold);
		}
		function removeSizer(){
			document.body.removeChild(hold);
			hold = null;
		}
		function calcSize(vertical) {
			buildSizer();
			content.style.cssText = 'height:'+(vertical ? '100%' : '200px');
			sizeBefore = (vertical ? content.offsetHeight : content.offsetWidth);
			hold.style.overflow = 'scroll'; content.innerHTML = 1;
			sizeAfter = (vertical ? content.offsetHeight : content.offsetWidth);
			if(vertical && hold.clientHeight) sizeAfter = hold.clientHeight;
			removeSizer();
			return sizeBefore - sizeAfter;
		}
		return {
			getWidth:function(){
				return calcSize(false);
			},
			getHeight:function(){
				return calcSize(true)
			}
		}
	}()),
	domReady: function (handler){
		var called = false
		function ready() {
			if (called) return;
			called = true;
			handler();
		}
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", ready, false);
		} else if (document.attachEvent) {
			if (document.documentElement.doScroll && window == window.top) {
				function tryScroll(){
					if (called) return
					if (!document.body) return
					try {
						document.documentElement.doScroll("left")
						ready()
					} catch(e) {
						setTimeout(tryScroll, 0)
					}
				}
				tryScroll()
			}
			document.attachEvent("onreadystatechange", function(){
				if (document.readyState === "complete") {
					ready()
				}
			})
		}
		if (window.addEventListener) window.addEventListener('load', ready, false)
		else if (window.attachEvent) window.attachEvent('onload', ready)
	},
	event: (function(){
		var guid = 0;
		function fixEvent(e) {
			e = e || window.event;
			if (e.isFixed) {
				return e;
			}
			e.isFixed = true; 
			e.preventDefault = e.preventDefault || function(){this.returnValue = false}
			e.stopPropagation = e.stopPropagaton || function(){this.cancelBubble = true}
			if (!e.target) {
				e.target = e.srcElement
			}
			if (!e.relatedTarget && e.fromElement) {
				e.relatedTarget = e.fromElement == e.target ? e.toElement : e.fromElement;
			}
			if (e.pageX == null && e.clientX != null) {
				var html = document.documentElement, body = document.body;
				e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
				e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
			}
			if (!e.which && e.button) {
				e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
			}
			if(e.type === "DOMMouseScroll" || e.type === 'mousewheel') {
				e.mWheelDelta = 0;
				if (e.wheelDelta) {
					e.mWheelDelta = e.wheelDelta/120;
				} else if (e.detail) {
					e.mWheelDelta = -e.detail/3;
				}
			}
			return e;
		}
		function commonHandle(event, customScope) {
			event = fixEvent(event);
			var handlers = this.events[event.type];
			for (var g in handlers) {
				var handler = handlers[g];
				var ret = handler.call(customScope || this, event);
				if (ret === false) {
					event.preventDefault()
					event.stopPropagation()
				}
			}
		}
		var publicAPI = {
			add: function(elem, type, handler, forcedScope) {
				if (elem.setInterval && (elem != window && !elem.frameElement)) {
					elem = window;
				}
				if (!handler.guid) {
					handler.guid = ++guid;
				}
				if (!elem.events) {
					elem.events = {};
					elem.handle = function(event) {
						return commonHandle.call(elem, event);
					}
				}
				if (!elem.events[type]) {
					elem.events[type] = {};
					if (elem.addEventListener) elem.addEventListener(type, elem.handle, false);
					else if (elem.attachEvent) elem.attachEvent("on" + type, elem.handle);
					if(type === 'mousewheel') {
						publicAPI.add(elem, 'DOMMouseScroll', handler, forcedScope);
					}
				}
				var fakeHandler = jcf.lib.bind(handler, forcedScope);
				fakeHandler.guid = handler.guid;
				elem.events[type][handler.guid] = forcedScope ? fakeHandler : handler;
			},
			remove: function(elem, type, handler) {
				var handlers = elem.events && elem.events[type];
				if (!handlers) return;
				delete handlers[handler.guid];
				for(var any in handlers) return;
				if (elem.removeEventListener) elem.removeEventListener(type, elem.handle, false);
				else if (elem.detachEvent) elem.detachEvent("on" + type, elem.handle);
				delete elem.events[type];
				for (var any in elem.events) return;
				try {
					delete elem.handle;
					delete elem.events;
				} catch(e) {
					if(elem.removeAttribute) {
						elem.removeAttribute("handle");
						elem.removeAttribute("events");
					}
				}
				if(type === 'mousewheel') {
					publicAPI.remove(elem, 'DOMMouseScroll', handler);
				}
			}
		}
		return publicAPI;
	}())
}

// custom select module
jcf.addModule({
	name:'select',
	selector:'select',
	defaultOptions: {
		hideDropOnScroll: true,
		showNativeDrop: false,
		handleDropPosition: true,
		selectDropPosition: 'bottom', // or 'top'
		wrapperClass:'select-area',
		focusClass:'select-focus',
		dropActiveClass:'select-active',
		selectedClass:'item-selected',
		currentSelectedClass:'current-selected',
		disabledClass:'select-disabled',
		valueSelector:'span.center', 
		optGroupClass:'optgroup',
		openerSelector:'a.select-opener',		
		selectStructure:'<span class="left"></span><span class="center"></span><a class="select-opener"></a>',
		classPrefix:'select-',
		dropMaxHeight: 200,
		dropFlippedClass: 'select-options-flipped',
		dropHiddenClass:'options-hidden',
		dropScrollableClass:'options-overflow',
		dropClass:'select-options',
		dropClassPrefix:'drop-',
		dropStructure:'<div class="drop-holder"><div class="drop-list"></div></div>',
		dropSelector:'div.drop-list'
	},
	checkElement: function(el){
		return (!el.size && !el.multiple);
	},
	setupWrapper: function(){
		jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
		this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
		this.fakeElement.innerHTML = this.options.selectStructure;
		this.fakeElement.style.width = (this.realElement.offsetWidth > 0 ? this.realElement.offsetWidth + 'px' : 'auto');

		// show native drop if specified in options
		if(jcf.isTouchDevice && jcf.baseOptions.useNativeDropOnMobileDevices) {
			this.options.showNativeDrop = true;
		}
		if(this.options.showNativeDrop) {
			this.fakeElement.appendChild(this.realElement);
			jcf.lib.removeClass(this.realElement, this.options.hiddenClass);
			jcf.lib.setStyles(this.realElement, {
				top:0,
				left:0,
				margin:0,
				padding:0,
				opacity:0,
				border:'none',
				position:'absolute',
				width: jcf.lib.getInnerWidth(this.fakeElement) - 1,
				height: jcf.lib.getInnerHeight(this.fakeElement) - 1
			});
			jcf.lib.event.add(this.realElement, 'touchstart', function(){
				this.realElement.title = '';
			}, this)
		}
		
		// create select body
		this.opener = jcf.lib.queryBySelector(this.options.openerSelector, this.fakeElement)[0];
		this.valueText = jcf.lib.queryBySelector(this.options.valueSelector, this.fakeElement)[0];
		jcf.lib.disableTextSelection(this.valueText);
		this.opener.jcf = this;

		if(!this.options.showNativeDrop) {
			this.createDropdown();
			this.refreshState();
			this.onControlReady(this);
			this.hideDropdown(true);
		} else {
			this.refreshState();
		}
		this.addEvents();
	},
	addEvents: function(){
		if(this.options.showNativeDrop) {
			jcf.lib.event.add(this.realElement, 'click', this.onChange, this);
		} else {
			jcf.lib.event.add(this.fakeElement, 'click', this.toggleDropdown, this);
		}
		jcf.lib.event.add(this.realElement, 'change', this.onChange, this);
	},
	onFakeClick: function() {
		// do nothing (drop toggles by toggleDropdown method)
	},
	onFocus: function(){
		jcf.modules[this.name].superclass.onFocus.apply(this, arguments);
		if(!this.options.showNativeDrop) {
			// Mac Safari Fix
			if(jcf.lib.browser.safariMac) {
				this.realElement.setAttribute('size','2');
			}
			jcf.lib.event.add(this.realElement, 'keydown', this.onKeyDown, this);
			if(jcf.activeControl && jcf.activeControl != this) {
				jcf.activeControl.hideDropdown();
				jcf.activeControl = this;
			}
		}
	},
	onBlur: function(){
		if(!this.options.showNativeDrop) {
			// Mac Safari Fix
			if(jcf.lib.browser.safariMac) {
				this.realElement.removeAttribute('size');
			}
			if(!this.isActiveDrop() || !this.isOverDrop()) {
				jcf.modules[this.name].superclass.onBlur.apply(this);
				if(jcf.activeControl === this) jcf.activeControl = null;
				if(!jcf.isTouchDevice) {
					this.hideDropdown();
				}
			}
			jcf.lib.event.remove(this.realElement, 'keydown', this.onKeyDown);
		} else {
			jcf.modules[this.name].superclass.onBlur.apply(this);
		}
	},
	onChange: function() {
		this.refreshState();
	},
	onKeyDown: function(e){
		jcf.tmpFlag = true;
		setTimeout(function(){jcf.tmpFlag = false},100);
		var context = this;
		context.keyboardFix = true;
		setTimeout(function(){
			context.refreshState();
		},10);
		if(e.keyCode == 13) {
			context.toggleDropdown.apply(context);
			return false;
		}
	},
	onResizeWindow: function(e){
		if(this.isActiveDrop()) {
			this.hideDropdown();
		}
	},
	onScrollWindow: function(e){
		if(this.options.hideDropOnScroll) {
			this.hideDropdown();
		} else if(this.isActiveDrop()) {
			this.positionDropdown();
		}
	},
	onOptionClick: function(e){
		var opener = e.target && e.target.tagName && e.target.tagName.toLowerCase() == 'li' ? e.target : jcf.lib.getParent(e.target, 'li');
		if(opener) {
			this.realElement.selectedIndex = parseInt(opener.getAttribute('rel'));
			if(jcf.isTouchDevice) {
				this.onFocus();
			} else {
				this.realElement.focus();
			}
			this.refreshState();
			this.hideDropdown();
			jcf.lib.fireEvent(this.realElement, 'change');
		}
		return false;
	},
	onClickOutside: function(e){
		if(jcf.tmpFlag) {
			jcf.tmpFlag = false;
			return;
		}
		if(!jcf.lib.isParent(this.fakeElement, e.target) && !jcf.lib.isParent(this.selectDrop, e.target)) {
			this.hideDropdown();
		}
	},
	onDropHover: function(e){
		if(!this.keyboardFix) {
			this.hoverFlag = true;
			var opener = e.target && e.target.tagName && e.target.tagName.toLowerCase() == 'li' ? e.target : jcf.lib.getParent(e.target, 'li');
			if(opener) {
				this.realElement.selectedIndex = parseInt(opener.getAttribute('rel'));
				this.refreshSelectedClass(parseInt(opener.getAttribute('rel')));
			}
		} else {
			this.keyboardFix = false;
		}
	},
	onDropLeave: function(){
		this.hoverFlag = false;
	},
	isActiveDrop: function(){
		return !jcf.lib.hasClass(this.selectDrop, this.options.dropHiddenClass);
	},
	isOverDrop: function(){
		return this.hoverFlag;
	},
	createDropdown: function(){
		// remove old dropdown if exists
		if(this.selectDrop) {
			this.selectDrop.parentNode.removeChild(this.selectDrop);
		}

		// create dropdown holder
		this.selectDrop = document.createElement('div');
		this.selectDrop.className = this.options.dropClass;
		this.selectDrop.innerHTML = this.options.dropStructure;
		jcf.lib.setStyles(this.selectDrop, {position:'absolute'});
		this.selectList = jcf.lib.queryBySelector(this.options.dropSelector,this.selectDrop)[0];
		jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass);
		document.body.appendChild(this.selectDrop);
		this.selectDrop.jcf = this;
		jcf.lib.event.add(this.selectDrop, 'click', this.onOptionClick, this);
		jcf.lib.event.add(this.selectDrop, 'mouseover', this.onDropHover, this);
		jcf.lib.event.add(this.selectDrop, 'mouseout', this.onDropLeave, this);
		this.buildDropdown();
	},
	buildDropdown: function() {
		// build select options / optgroups
		this.buildDropdownOptions();

		// position and resize dropdown
		this.positionDropdown();

		// cut dropdown if height exceedes
		this.buildDropdownScroll();
	},
	buildDropdownOptions: function() {
		this.resStructure = '';
		this.optNum = 0;
		for(var i = 0; i < this.realElement.children.length; i++) {
			this.resStructure += this.buildElement(this.realElement.children[i]) +'\n';
		}
		this.selectList.innerHTML = this.resStructure;
	},
	buildDropdownScroll: function() {
		if(this.options.dropMaxHeight) {
			if(this.selectDrop.offsetHeight > this.options.dropMaxHeight) {
				this.selectList.style.height = this.options.dropMaxHeight+'px';
				this.selectList.style.overflow = 'auto';
				this.selectList.style.overflowX = 'hidden';
				jcf.lib.addClass(this.selectDrop, this.options.dropScrollableClass);
			}
		}
		jcf.lib.addClass(this.selectDrop, jcf.lib.getAllClasses(this.realElement.className, this.options.dropClassPrefix, jcf.baseOptions.hiddenClass));
	},
	parseOptionTitle: function(optTitle) {
		return (typeof optTitle === 'string' && /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i.test(optTitle)) ? optTitle : '';
	},
	buildElement: function(obj){
		// build option
		var res = '', optImage;
		if(obj.tagName.toLowerCase() == 'option') {
			if(!jcf.lib.prevSibling(obj) || jcf.lib.prevSibling(obj).tagName.toLowerCase() != 'option') {
				res += '<ul>';
			}
			
			optImage = this.parseOptionTitle(obj.title);
			res += '<li rel="'+(this.optNum++)+'" class="'+(obj.className? obj.className + ' ' : '')+'jcfcalc"><a href="#">'+(optImage ? '<img src="'+optImage+'" alt="" />' : '')+'<span>' + obj.innerHTML + '</span></a></li>';
			if(!jcf.lib.nextSibling(obj) || jcf.lib.nextSibling(obj).tagName.toLowerCase() != 'option') {
				res += '</ul>';
			}
			return res;
		}
		// build option group with options
		else if(obj.tagName.toLowerCase() == 'optgroup' && obj.label) {
			res += '<div class="'+this.options.optGroupClass+'">';
			res += '<strong class="jcfcalc"><em>'+(obj.label)+'</em></strong>';
			for(var i = 0; i < obj.children.length; i++) {
				res += this.buildElement(obj.children[i]);
			}
			res += '</div>';
			return res;
		}
	},
	positionDropdown: function(){
		var ofs = jcf.lib.getOffset(this.fakeElement), selectAreaHeight = this.fakeElement.offsetHeight, selectDropHeight = this.selectDrop.offsetHeight;
		var fitInTop = ofs.top - selectDropHeight >= jcf.lib.getScrollTop() && jcf.lib.getScrollTop() + jcf.lib.getWindowHeight() < ofs.top + selectAreaHeight + selectDropHeight;
		
		
		if((this.options.handleDropPosition && fitInTop) || this.options.selectDropPosition === 'top') {
			this.selectDrop.style.top = (ofs.top - selectDropHeight)+'px';
			jcf.lib.addClass(this.selectDrop, this.options.dropFlippedClass);
		} else {
			this.selectDrop.style.top = (ofs.top + selectAreaHeight)+'px';
			jcf.lib.removeClass(this.selectDrop, this.options.dropFlippedClass);
		}
		this.selectDrop.style.left = ofs.left+'px';
		this.selectDrop.style.width = this.fakeElement.offsetWidth+'px';
	},
	showDropdown: function(){
		document.body.appendChild(this.selectDrop);
		jcf.lib.removeClass(this.selectDrop, this.options.dropHiddenClass);
		jcf.lib.addClass(this.fakeElement,this.options.dropActiveClass);
		this.positionDropdown();

		// highlight current active item
		var activeItem = this.getFakeActiveOption();
		this.removeClassFromItems(this.options.currentSelectedClass);
		jcf.lib.addClass(activeItem, this.options.currentSelectedClass);
		
		// show current dropdown
		jcf.lib.event.add(window, 'resize', this.onResizeWindow, this);
		jcf.lib.event.add(window, 'scroll', this.onScrollWindow, this);
		jcf.lib.event.add(document, jcf.eventPress, this.onClickOutside, this);
		this.positionDropdown();
	},
	hideDropdown: function(partial){
		if(this.selectDrop.parentNode) {
			if(this.selectDrop.offsetWidth) {
				this.selectDrop.parentNode.removeChild(this.selectDrop);
			}
			if(partial) {
				return;
			}
		}
		if(typeof this.origSelectedIndex === 'number') {
			this.realElement.selectedIndex = this.origSelectedIndex;
		}
		jcf.lib.removeClass(this.fakeElement,this.options.dropActiveClass);
		jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass);
		jcf.lib.event.remove(window, 'resize', this.onResizeWindow);
		jcf.lib.event.remove(window, 'scroll', this.onScrollWindow);
		jcf.lib.event.remove(document.documentElement, jcf.eventPress, this.onClickOutside);
		if(jcf.isTouchDevice) {
			this.onBlur();
		}
	},
	toggleDropdown: function(){
		if(!this.realElement.disabled) {
			if(jcf.isTouchDevice) {
				this.onFocus();
			} else {
				this.realElement.focus();
			}
			this.dropOpened = true;
				if(this.isActiveDrop()) {
					this.hideDropdown();
				} else {
					this.showDropdown();
				}
			this.refreshState();
		}
	},
	scrollToItem: function(){
		if(this.isActiveDrop()) {
			var dropHeight = this.selectList.offsetHeight;
			var offsetTop = this.calcOptionOffset(this.getFakeActiveOption());
			var sTop = this.selectList.scrollTop;
			var oHeight = this.getFakeActiveOption().offsetHeight;
			//offsetTop+=sTop;

			if(offsetTop >= sTop + dropHeight) {
				this.selectList.scrollTop = offsetTop - dropHeight + oHeight;
			} else if(offsetTop < sTop) {
				this.selectList.scrollTop = offsetTop;
			}
		}
	},
	getFakeActiveOption: function(c) {
		return jcf.lib.queryBySelector('li[rel="'+(typeof c === 'number' ? c : this.realElement.selectedIndex) +'"]',this.selectList)[0];
	},
	calcOptionOffset: function(fake) {
		var h = 0;
		var els = jcf.lib.queryBySelector('.jcfcalc',this.selectList);
		for(var i = 0; i < els.length; i++) {
			if(els[i] == fake) break;
			h+=els[i].offsetHeight;
		}
		return h;
	},
	childrenHasItem: function(hold,item) {
		var items = hold.getElementsByTagName('*');
		for(i = 0; i < items.length; i++) {
			if(items[i] == item) return true;
		}
		return false;
	},
	removeClassFromItems: function(className){
		var children = jcf.lib.queryBySelector('li',this.selectList);
		for(var i = children.length - 1; i >= 0; i--) {
			jcf.lib.removeClass(children[i], className);
		}
	},
	setSelectedClass: function(c){
		jcf.lib.addClass(this.getFakeActiveOption(c), this.options.selectedClass);
	},
	refreshSelectedClass: function(c){
		if(!this.options.showNativeDrop) {
			this.removeClassFromItems(this.options.selectedClass);
			this.setSelectedClass(c);
		}
		if(this.realElement.disabled) {
			jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
			if(this.labelFor) {
				jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass);
			}
		} else {
			jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
			if(this.labelFor) {
				jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass);
			}
		}
	},
	refreshSelectedText: function() {
		if(!this.dropOpened && this.realElement.title) {
			this.valueText.innerHTML = this.realElement.title;
		} else {
			if(this.realElement.options[this.realElement.selectedIndex].title) {
				var optImage = this.parseOptionTitle(this.realElement.options[this.realElement.selectedIndex].title);
				this.valueText.innerHTML = (optImage ? '<img src="'+optImage+'" alt="" />' : '') + this.realElement.options[this.realElement.selectedIndex].innerHTML;
			} else {
				this.valueText.innerHTML = this.realElement.options[this.realElement.selectedIndex].innerHTML;
			}
		}
	},
	refreshState: function(){
		this.origSelectedIndex = this.realElement.selectedIndex;
		this.refreshSelectedClass();
		this.refreshSelectedText();
		if(!this.options.showNativeDrop) {
			this.positionDropdown();
			if(this.selectDrop.offsetWidth) {
				this.scrollToItem();
			}
		}
	}
});

// custom checkbox module
jcf.addModule({
	name:'checkbox',
	selector:'input[type="checkbox"]',
	defaultOptions: {
		wrapperClass:'chk-area',
		focusClass:'chk-focus',
		checkedClass:'chk-checked',
		labelActiveClass:'chk-label-active',
		uncheckedClass:'chk-unchecked',
		disabledClass:'chk-disabled',
		chkStructure:'<span></span>'
	},
	setupWrapper: function(){
		jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
		this.fakeElement.innerHTML = this.options.chkStructure;
		this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
		jcf.lib.event.add(this.realElement, 'click', this.onRealClick, this);
		this.refreshState();
	},
	onFakePressed: function() {
		jcf.modules[this.name].superclass.onFakePressed.apply(this, arguments);
		if(!this.realElement.disabled) {
			this.realElement.focus();
		}
	},
	onFakeClick: function(e) {
		jcf.modules[this.name].superclass.onFakeClick.apply(this, arguments);
		this.tmpTimer = setTimeout(jcf.lib.bind(function(){
			this.toggle();
		},this),10);
		return false;
	},
	onRealClick: function(e) {
		setTimeout(jcf.lib.bind(function(){
			this.refreshState();
		},this),10);
		e.stopPropagation();
	},
	toggle: function(e){
		if(!this.realElement.disabled) {
			if(this.realElement.checked) {
				this.realElement.checked = false;
			} else {
				this.realElement.checked = true;
			}
		}
		this.refreshState();
		return false;
	},
	refreshState: function(){
		if(this.realElement.checked) {
			jcf.lib.addClass(this.fakeElement, this.options.checkedClass);
			jcf.lib.removeClass(this.fakeElement, this.options.uncheckedClass);
			if(this.labelFor) {
				jcf.lib.addClass(this.labelFor, this.options.labelActiveClass);
			}
		} else {
			jcf.lib.removeClass(this.fakeElement, this.options.checkedClass);
			jcf.lib.addClass(this.fakeElement, this.options.uncheckedClass);
			if(this.labelFor) {
				jcf.lib.removeClass(this.labelFor, this.options.labelActiveClass);
			}
		}
		if(this.realElement.disabled) {
			jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
			if(this.labelFor) {
				jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass);
			}
		} else {
			jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
			if(this.labelFor) {
				jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass);
			}
		}
	}
});


// placeholder class
;(function(){
	var placeholderCollection = [];
	PlaceholderInput = function() {
		this.options = {
			element:null,
			showUntilTyping:false,
			wrapWithElement:false,
			getParentByClass:false,
			placeholderAttr:'value',
			inputFocusClass:'focus',
			inputActiveClass:'text-active',
			parentFocusClass:'parent-focus',
			parentActiveClass:'parent-active',
			labelFocusClass:'label-focus',
			labelActiveClass:'label-active',
			fakeElementClass:'input-placeholder-text'
		};
		placeholderCollection.push(this);
		this.init.apply(this,arguments);
	};
	PlaceholderInput.refreshAllInputs = function(except) {
		for(var i = 0; i < placeholderCollection.length; i++) {
			if(except !== placeholderCollection[i]) {
				placeholderCollection[i].refreshState();
			}
		}
	};
	PlaceholderInput.replaceByOptions = function(opt) {
		var inputs = [].concat(
			convertToArray(document.getElementsByTagName('input')),
			convertToArray(document.getElementsByTagName('textarea'))
		);
		for(var i = 0; i < inputs.length; i++) {
			if(inputs[i].className.indexOf(opt.skipClass) < 0) {
				var inputType = getInputType(inputs[i]);
				if((opt.clearInputs && (inputType === 'text' || inputType === 'email')) ||
					(opt.clearTextareas && inputType === 'textarea') ||
					(opt.clearPasswords && inputType === 'password')
				) {
					new PlaceholderInput({
						element:inputs[i],
						wrapWithElement:opt.wrapWithElement,
						showUntilTyping:opt.showUntilTyping,
						getParentByClass:opt.getParentByClass,
						placeholderAttr: inputs[i].getAttribute('placeholder') ? 'placeholder' : opt.placeholderAttr
					});
				}
			}
		}
	};
	PlaceholderInput.prototype = {
		init: function(opt) {
			this.setOptions(opt);
			if(this.element && this.element.PlaceholderInst) {
				this.element.PlaceholderInst.refreshClasses();
			} else {
				this.element.PlaceholderInst = this;
				if(this.elementType !== 'radio' || this.elementType !== 'checkbox' || this.elementType !== 'file') {
					this.initElements();
					this.attachEvents();
					this.refreshClasses();
				}
			}
		},
		setOptions: function(opt) {
			for(var p in opt) {
				if(opt.hasOwnProperty(p)) {
					this.options[p] = opt[p];
				}
			}
			if(this.options.element) {
				this.element = this.options.element;
				this.elementType = getInputType(this.element);
				this.wrapWithElement = (this.elementType === 'password' || this.options.showUntilTyping ? true : this.options.wrapWithElement);
				this.setPlaceholderValue(this.options.placeholderAttr);
			}
		},
		setPlaceholderValue: function(attr) {
			this.origValue = (attr === 'value' ? this.element.defaultValue : (this.element.getAttribute(attr) || ''));
			if(this.options.placeholderAttr !== 'value') {
				this.element.removeAttribute(this.options.placeholderAttr);
			}
		},
		initElements: function() {
			// create fake element if needed
			if(this.wrapWithElement) {
				this.fakeElement = document.createElement('span');
				this.fakeElement.className = this.options.fakeElementClass;
				this.fakeElement.innerHTML += this.origValue;
				this.fakeElement.style.color = getStyle(this.element, 'color');
				this.fakeElement.style.position = 'absolute';
				this.element.parentNode.insertBefore(this.fakeElement, this.element);
				
				if(this.element.value === this.origValue || !this.element.value) {
					this.element.value = '';
					this.togglePlaceholderText(true);
				} else {
					this.togglePlaceholderText(false);
				}
			} else if(!this.element.value && this.origValue.length) {
				this.element.value = this.origValue;
			}
			// get input label
			if(this.element.id) {
				this.labels = document.getElementsByTagName('label');
				for(var i = 0; i < this.labels.length; i++) {
					if(this.labels[i].htmlFor === this.element.id) {
						this.labelFor = this.labels[i];
						break;
					}
				}
			}
			// get parent node (or parentNode by className)
			this.elementParent = this.element.parentNode;
			if(typeof this.options.getParentByClass === 'string') {
				var el = this.element;
				while(el.parentNode) {
					if(hasClass(el.parentNode, this.options.getParentByClass)) {
						this.elementParent = el.parentNode;
						break;
					} else {
						el = el.parentNode;
					}
				}
			}
		},
		attachEvents: function() {
			this.element.onfocus = bindScope(this.focusHandler, this);
			this.element.onblur = bindScope(this.blurHandler, this);
			if(this.options.showUntilTyping) {
				this.element.onkeydown = bindScope(this.typingHandler, this);
				this.element.onpaste = bindScope(this.typingHandler, this);
			}
			if(this.wrapWithElement) this.fakeElement.onclick = bindScope(this.focusSetter, this);
		},
		togglePlaceholderText: function(state) {
			if(!this.element.readOnly) {
				if(this.wrapWithElement) {
					this.fakeElement.style.display = state ? '' : 'none';
				} else {
					this.element.value = state ? this.origValue : '';
				}
			}
		},
		focusSetter: function() {
			this.element.focus();
		},
		focusHandler: function() {
			clearInterval(this.checkerInterval);
			this.checkerInterval = setInterval(bindScope(this.intervalHandler,this), 1);
			this.focused = true;
			if(!this.element.value.length || this.element.value === this.origValue) {
				if(!this.options.showUntilTyping) {
					this.togglePlaceholderText(false);
				}
			}
			this.refreshClasses();
		},
		blurHandler: function() {
			clearInterval(this.checkerInterval);
			this.focused = false;
			if(!this.element.value.length || this.element.value === this.origValue) {
				this.togglePlaceholderText(true);
			}
			this.refreshClasses();
			PlaceholderInput.refreshAllInputs(this);
		},
		typingHandler: function() {
			setTimeout(bindScope(function(){
				if(this.element.value.length) {
					this.togglePlaceholderText(false);
					this.refreshClasses();
				}
			},this), 10);
		},
		intervalHandler: function() {
			if(typeof this.tmpValue === 'undefined') {
				this.tmpValue = this.element.value;
			}
			if(this.tmpValue != this.element.value) {
				PlaceholderInput.refreshAllInputs(this);
			}
		},
		refreshState: function() {
			if(this.wrapWithElement) {
				if(this.element.value.length && this.element.value !== this.origValue) {
					this.togglePlaceholderText(false);
				} else if(!this.element.value.length) {
					this.togglePlaceholderText(true);
				}
			}
			this.refreshClasses();
		},
		refreshClasses: function() {
			this.textActive = this.focused || (this.element.value.length && this.element.value !== this.origValue);
			this.setStateClass(this.element, this.options.inputFocusClass,this.focused);
			this.setStateClass(this.elementParent, this.options.parentFocusClass,this.focused);
			this.setStateClass(this.labelFor, this.options.labelFocusClass,this.focused);
			this.setStateClass(this.element, this.options.inputActiveClass, this.textActive);
			this.setStateClass(this.elementParent, this.options.parentActiveClass, this.textActive);
			this.setStateClass(this.labelFor, this.options.labelActiveClass, this.textActive);
		},
		setStateClass: function(el,cls,state) {
			if(!el) return; else if(state) addClass(el,cls); else removeClass(el,cls);
		}
	};
	
	// utility functions
	function convertToArray(collection) {
		var arr = [];
		for (var i = 0, ref = arr.length = collection.length; i < ref; i++) {
			arr[i] = collection[i];
		}
		return arr;
	}
	function getInputType(input) {
		return (input.type ? input.type : input.tagName).toLowerCase();
	}
	function hasClass(el,cls) {
		return el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
	}
	function addClass(el,cls) {
		if (!hasClass(el,cls)) el.className += " "+cls;
	}
	function removeClass(el,cls) {
		if (hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
	}
	function bindScope(f, scope) {
		return function() {return f.apply(scope, arguments);};
	}
	function getStyle(el, prop) {
		if (document.defaultView && document.defaultView.getComputedStyle) {
			return document.defaultView.getComputedStyle(el, null)[prop];
		} else if (el.currentStyle) {
			return el.currentStyle[prop];
		} else {
			return el.style[prop];
		}
	}
}());
/*
 * jQuery Carousel plugin
 */
;(function($){
	function ScrollGallery(options) {
		this.options = $.extend({
			mask: 'div.mask',
			slider: '>*',
			slides: '>*',
			activeClass:'active',
			disabledClass:'disabled',
			btnPrev: 'a.btn-prev',
			btnNext: 'a.btn-next',
			generatePagination: false,
			pagerList: '<ul>',
			pagerListItem: '<li><a href="#"></a></li>',
			pagerListItemText: 'a',
			pagerLinks: '.pagination li',
			currentNumber: 'span.current-num',
			totalNumber: 'span.total-num',
			btnPlay: '.btn-play',
			btnPause: '.btn-pause',
			btnPlayPause: '.btn-play-pause',
			autorotationActiveClass: 'autorotation-active',
			autorotationDisabledClass: 'autorotation-disabled',
			circularRotation: true,
			disableWhileAnimating: false,
			autoRotation: false,
			pauseOnHover: isTouchDevice ? false : true,
			maskAutoSize: false,
			switchTime: 4000,
			animSpeed: 600,
			event:'click',
			swipeGap: false,
			swipeThreshold: 50,
			handleTouch: true,
			vertical: false,
			step: false
		}, options);
		this.init();
	}
	ScrollGallery.prototype = {
		init: function() {
			if(this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.refreshPosition();
				this.refreshState(true);
				this.resumeRotation();
				this.makeCallback('onInit', [this]);
			}
		},
		findElements: function() {
			// define dimensions proporties
			this.fullSizeFunction = this.options.vertical ? 'outerHeight' : 'outerWidth';
			this.innerSizeFunction = this.options.vertical ? 'height' : 'width';
			this.slideSizeFunction = 'outerHeight';
			this.maskSizeProperty = 'height';
			this.animProperty = this.options.vertical ? 'marginTop' : 'marginLeft';
			this.swipeProperties = this.options.vertical ? ['up', 'down'] : ['left', 'right'];
			
			// control elements
			this.gallery = $(this.options.holder);
			this.mask = this.gallery.find(this.options.mask);
			this.slider = this.mask.find(this.options.slider);
			this.slides = this.slider.find(this.options.slides);
			this.btnPrev = this.gallery.find(this.options.btnPrev);
			this.btnNext = this.gallery.find(this.options.btnNext);
			this.currentStep = 0; this.stepsCount = 0;
			
			// get start index
			if(this.options.step === false) {
				var activeSlide = this.slides.filter('.'+this.options.activeClass);
				if(activeSlide.length) {
					this.currentStep = this.slides.index(activeSlide);
				}
			}
			
			// calculate offsets
			this.calculateOffsets();
			$(window).bind('resize orientationchange', $.proxy(this.onWindowResize, this));
			
			// create gallery pagination
			if(typeof this.options.generatePagination === 'string') {
				this.buildPagination();
			} else {
				this.pagerLinks = this.gallery.find(this.options.pagerLinks);
				this.attachPaginationEvents();
			}
			
			// autorotation control buttons
			this.btnPlay = this.gallery.find(this.options.btnPlay);
			this.btnPause = this.gallery.find(this.options.btnPause);
			this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);
			
			// misc elements
			this.curNum = this.gallery.find(this.options.currentNumber);
			this.allNum = this.gallery.find(this.options.totalNumber);
		},
		attachEvents: function() {
			this.btnPrev.bind(this.options.event, this.bindScope(function(e){
				this.prevSlide();
				e.preventDefault();
			}));
			this.btnNext.bind(this.options.event, this.bindScope(function(e){
				this.nextSlide();
				e.preventDefault();
			}));
			
			// pause on hover handling
			if(this.options.pauseOnHover) {
				this.gallery.hover(this.bindScope(function(){
					if(this.options.autoRotation) {
						this.galleryHover = true;
						this.pauseRotation();
					}
				}), this.bindScope(function(){
					if(this.options.autoRotation) {
						this.galleryHover = false;
						this.resumeRotation();
					}
				}));
			}
			
			// autorotation buttons handler
			this.btnPlay.bind(this.options.event, this.bindScope(this.startRotation));
			this.btnPause.bind(this.options.event, this.bindScope(this.stopRotation));
			this.btnPlayPause.bind(this.options.event, this.bindScope(function(){
				if(!this.gallery.hasClass(this.options.autorotationActiveClass)) {
					this.startRotation();
				} else {
					this.stopRotation();
				}
			}));
			
			// swipe event handling
			if(isTouchDevice) {
				// enable hardware acceleration
				this.slider.css({'-webkit-transform': 'translate3d(0px, 0px, 0px)'});
				
				// swipe gestures
				if(this.options.handleTouch && $.fn.swipe) {
					this.mask.swipe({
						threshold: this.options.swipeThreshold,
						allowPageScroll: 'vertical',
						swipeStatus: $.proxy(function(e, phase, direction, distance) {
							if(phase === 'start') {
								this.originalOffset = parseInt(this.slider.stop(true, false).css(this.animProperty));
							} else if(phase === 'move') {
								if(direction === this.swipeProperties[0] || direction === this.swipeProperties[1]) {
									var tmpOffset = this.originalOffset + distance * (direction === this.swipeProperties[0] ? -1 : 1);
									if(!this.options.swipeGap) {
										tmpOffset = Math.max(Math.min(0, tmpOffset), this.maxOffset);
									}
									this.tmpProps = {};
									this.tmpProps[this.animProperty] = tmpOffset;
									this.slider.css(this.tmpProps);
									e.preventDefault();
								}
							} else if(phase === 'cancel') {
								// return to previous position
								this.switchSlide();
							}
						},this),
						swipe: $.proxy(function(event, direction) {
							if(direction === this.swipeProperties[0]) {
								if(this.currentStep === this.stepsCount - 1) this.switchSlide();
								else this.nextSlide();
							} else if(direction === this.swipeProperties[1]) {
								if(this.currentStep === 0) this.switchSlide();
								else this.prevSlide();
							}
						},this)
					});
				}
			}
		},
		onWindowResize: function() {
			if(!this.galleryAnimating) {
				this.calculateOffsets();
				this.refreshPosition();
				this.buildPagination();
				this.refreshState();
				this.resizeQueue = false;
			} else {
				this.resizeQueue = true;
			}
		},
		refreshPosition: function() {
			this.currentStep = Math.min(this.currentStep, this.stepsCount - 1);
			this.tmpProps = {};
			this.tmpProps[this.animProperty] = this.getStepOffset();
			this.slider.stop().css(this.tmpProps);
		},
		calculateOffsets: function() {
			this.maskSize = this.mask[this.innerSizeFunction]();
			this.sumSize = this.getSumSize();
			this.maxOffset = this.maskSize - this.sumSize;
			
			// vertical gallery with single size step custom behavior
			if(this.options.vertical && this.options.maskAutoSize) {
				this.options.step = 1;
				this.stepsCount = this.slides.length;
				this.stepOffsets = [0];
				var tmpOffset = 0;
				for(var i = 0; i < this.slides.length; i++) {
					tmpOffset -= $(this.slides[i])[this.fullSizeFunction](true);
					this.stepOffsets.push(tmpOffset);
				}
				this.maxOffset = tmpOffset;
				return;
			}
			
			// scroll by slide size
			if(typeof this.options.step === 'number' && this.options.step > 0) {
				this.slideDimensions = [];
				this.slides.each($.proxy(function(ind, obj){
					this.slideDimensions.push( $(obj)[this.fullSizeFunction](true) );
				},this));
				
				// calculate steps count
				this.stepOffsets = [0];
				this.stepsCount = 1;
				var tmpOffset = 0, tmpStep = 0;
				while(tmpOffset > this.maxOffset) {
					tmpOffset -= this.getSlideSize(tmpStep, tmpStep + this.options.step);
					tmpStep += this.options.step;
					this.stepOffsets.push(Math.max(tmpOffset, this.maxOffset));
					this.stepsCount++;
				}
			}
			// scroll by mask size
			else {
				// define step size
				this.stepSize = this.maskSize;
				
				// calculate steps count
				this.stepsCount = 1;
				var tmpOffset = 0;
				while(tmpOffset > this.maxOffset) {
					tmpOffset -= this.stepSize;
					this.stepsCount++;
				}
			}
		},
		getSumSize: function() {
			var sum = 0;
			this.slides.each($.proxy(function(ind, obj){
				sum += $(obj)[this.fullSizeFunction](true);
			},this));
			this.slider.css(this.innerSizeFunction, sum);
			return sum;
		},
		getStepOffset: function(step) {
			step = step || this.currentStep;
			if(typeof this.options.step === 'number') {
				return this.stepOffsets[this.currentStep];
			} else {
				return Math.max(-this.currentStep * this.stepSize, this.maxOffset);
			}
		},
		getSlideSize: function(i1, i2) {
			var sum = 0;
			for(var i = i1; i < Math.min(i2, this.slideDimensions.length); i++) {
				sum += this.slideDimensions[i];
			}
			return sum;
		},
		buildPagination: function() {
			if(this.options.generatePagination) {
				this.pagerHolder = this.gallery.find(this.options.generatePagination).empty();
				this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
				for(var i = 0; i < this.stepsCount; i++) {
					$(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i+1);
				}
				this.pagerLinks = this.pagerList.children();
				this.attachPaginationEvents();
			}
		},
		attachPaginationEvents: function() {
			this.pagerLinks.each(this.bindScope(function(ind, obj){
				$(obj).bind(this.options.event, this.bindScope(function(){
					this.numSlide(ind);
					return false;
				}));
			}));
		},
		prevSlide: function() {
			if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
				if(this.currentStep > 0) {
					this.currentStep--;
					this.switchSlide();
				} else if(this.options.circularRotation) {
					this.currentStep = this.stepsCount - 1;
					this.switchSlide();
				}
			}
		},
		nextSlide: function(fromAutoRotation) {
			if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
				if(this.currentStep < this.stepsCount - 1) {
					this.currentStep++;
					this.switchSlide();
				} else if(this.options.circularRotation || fromAutoRotation === true) {
					this.currentStep = 0;
					this.switchSlide();
				}
			}
		},
		numSlide: function(c) {
			if(this.currentStep != c) {
				this.currentStep = c;
				this.switchSlide();
			}
		},
		switchSlide: function() {
			this.galleryAnimating = true;
			this.tmpProps = {}
			this.tmpProps[this.animProperty] = this.getStepOffset();
			this.slider.stop().animate(this.tmpProps,{duration: this.options.animSpeed, complete: this.bindScope(function(){
				// animation complete
				this.galleryAnimating = false;
				if(this.resizeQueue) {
					this.onWindowResize();
				}
				
				// onchange callback
				this.makeCallback('onChange', [this]);
				this.autoRotate();
			})});
			this.refreshState();
			
			// onchange callback
			this.makeCallback('onBeforeChange', [this]);
		},
		refreshState: function(initial) {
			this.slides.removeClass(this.options.activeClass).eq(this.currentStep).addClass(this.options.activeClass);
			this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentStep).addClass(this.options.activeClass);
			this.curNum.html(this.currentStep+1);
			this.allNum.html(this.stepsCount);
			
			// initial refresh
			if(this.options.maskAutoSize && typeof this.options.step === 'number') {
				this.tmpProps = {};
				this.tmpProps[this.maskSizeProperty] = this.slides.eq(Math.min(this.currentStep,this.slides.length-1))[this.slideSizeFunction](true);
				this.mask.stop()[initial ? 'css' : 'animate'](this.tmpProps);
			}
			
			// disabled state
			if(!this.options.circularRotation) {
				this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
				if(this.currentStep === 0) this.btnPrev.addClass(this.options.disabledClass);
				if(this.currentStep === this.stepsCount - 1) this.btnNext.addClass(this.options.disabledClass);
			}
		},
		startRotation: function() {
			this.options.autoRotation = true;
			this.galleryHover = false;
			this.autoRotationStopped = false;
			this.resumeRotation();
		},
		stopRotation: function() {
			this.galleryHover = true;
			this.autoRotationStopped = true;
			this.pauseRotation();
		},
		pauseRotation: function() {
			this.gallery.addClass(this.options.autorotationDisabledClass);
			this.gallery.removeClass(this.options.autorotationActiveClass);
			clearTimeout(this.timer);
		},
		resumeRotation: function() {
			if(!this.autoRotationStopped) {
				this.gallery.addClass(this.options.autorotationActiveClass);
				this.gallery.removeClass(this.options.autorotationDisabledClass);
				this.autoRotate();
			}
		},
		autoRotate: function() {
			clearTimeout(this.timer);
			if(this.options.autoRotation && !this.galleryHover && !this.autoRotationStopped) {
				this.timer = setTimeout(this.bindScope(function(){
					this.nextSlide(true);
				}), this.options.switchTime);
			} else {
				this.pauseRotation();
			}
		},
		bindScope: function(func, scope) {
			return $.proxy(func, scope || this);
		},
		makeCallback: function(name, args) {
			if(typeof this.options[name] === 'function') {
				this.options[name].apply(this, args);
			}
		}
	}
	
	// detect device type
	var isTouchDevice = (function() {
		try {
			return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		} catch (e) {
			return false;
		}
	}());
	
	// jquery plugin
	$.fn.scrollGallery = function(opt){
		return this.each(function(){
			$(this).data('ScrollGallery', new ScrollGallery($.extend(opt,{holder:this})));
		});
	}
}(jQuery));
/*	
 *	jQuery carouFredSel 5.6.1
 *	Demo's and documentation:
 *	caroufredsel.frebsite.nl
 *	
 *	Copyright (c) 2012 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(H($){8($.1P.1J)J;$.1P.1J=H(y,z){8(1g.V==0){1e(M,\'5s 4q 6u 1m "\'+1g.3U+\'".\');J 1g}8(1g.V>1){J 1g.1K(H(){$(1g).1J(y,z)})}F A=1g,$19=1g[0];8(A.1r(\'4r\')){F B=A.1D(\'34\',\'3v\');A.X(\'34\',[\'5t\',M])}Q{F B=O}A.3V=H(o,b,c){o=3W($19,o);F e=[\'G\',\'1n\',\'T\',\'17\',\'1a\',\'1b\'];1m(F a=0,l=e.V;a<l;a++){o[e[a]]=3W($19,o[e[a]])}8(K o.1n==\'13\'){8(o.1n<=50)o.1n={\'G\':o.1n};Q o.1n={\'1j\':o.1n}}Q{8(K o.1n==\'1k\')o.1n={\'1G\':o.1n}}8(K o.G==\'13\')o.G={\'P\':o.G};Q 8(o.G==\'1d\')o.G={\'P\':o.G,\'S\':o.G,\'1l\':o.G};8(K o.G!=\'1o\')o.G={};8(b)2u=$.25(M,{},$.1P.1J.4s,o);7=$.25(M,{},$.1P.1J.4s,o);8(K 7.G.12!=\'1o\')7.G.12={};8(7.G.2I==0&&K c==\'13\'){7.G.2I=c}C.4t=(7.2J);C.2k=(7.2k==\'4u\'||7.2k==\'1t\')?\'1a\':\'17\';F f=[[\'S\',\'35\',\'26\',\'1l\',\'5u\',\'2K\',\'1t\',\'2L\',\'1E\',0,1,2,3],[\'1l\',\'5u\',\'2K\',\'S\',\'35\',\'26\',\'2L\',\'1t\',\'3X\',3,2,1,0]];F g=f[0].V,5v=(7.2k==\'2M\'||7.2k==\'1t\')?0:1;7.d={};1m(F d=0;d<g;d++){7.d[f[0][d]]=f[5v][d]}F h=A.Z();1x(K 7.G.P){W\'1o\':7.G.12.2N=7.G.P.2N;7.G.12.27=7.G.P.27;7.G.P=O;18;W\'1k\':8(7.G.P==\'1d\'){7.G.12.1d=M}Q{7.G.12.2l=7.G.P}7.G.P=O;18;W\'H\':7.G.12.2l=7.G.P;7.G.P=O;18}8(K 7.G.1v==\'1y\'){7.G.1v=(h.1v(\':2O\').V>0)?\':P\':\'*\'}8(7[7.d[\'S\']]==\'T\'){7[7.d[\'S\']]=3w(h,7,\'26\')}8(3Y(7[7.d[\'S\']])&&!7.2J){7[7.d[\'S\']]=3Z(36($1A.3a(),7,\'35\'),7[7.d[\'S\']]);C.4t=M}8(7[7.d[\'1l\']]==\'T\'){7[7.d[\'1l\']]=3w(h,7,\'2K\')}8(!7.G[7.d[\'S\']]){8(7.2J){1e(M,\'5w a \'+7.d[\'S\']+\' 1m 6v G!\');7.G[7.d[\'S\']]=3w(h,7,\'26\')}Q{7.G[7.d[\'S\']]=(4v(h,7,\'26\'))?\'1d\':h[7.d[\'26\']](M)}}8(!7.G[7.d[\'1l\']]){7.G[7.d[\'1l\']]=(4v(h,7,\'2K\'))?\'1d\':h[7.d[\'2K\']](M)}8(!7[7.d[\'1l\']]){7[7.d[\'1l\']]=7.G[7.d[\'1l\']]}8(!7.G.P&&!7.2J){8(7.G[7.d[\'S\']]==\'1d\'){7.G.12.1d=M}8(!7.G.12.1d){8(K 7[7.d[\'S\']]==\'13\'){7.G.P=1L.3x(7[7.d[\'S\']]/7.G[7.d[\'S\']])}Q{F i=36($1A.3a(),7,\'35\');7.G.P=1L.3x(i/7.G[7.d[\'S\']]);7[7.d[\'S\']]=7.G.P*7.G[7.d[\'S\']];8(!7.G.12.2l)7.1B=O}8(7.G.P==\'6w\'||7.G.P<1){1e(M,\'28 a 4w 13 3y P G: 5w 41 "1d".\');7.G.12.1d=M}}}8(!7[7.d[\'S\']]){7[7.d[\'S\']]=\'1d\';8(!7.2J&&7.G.1v==\'*\'&&!7.G.12.1d&&7.G[7.d[\'S\']]!=\'1d\'){7[7.d[\'S\']]=7.G.P*7.G[7.d[\'S\']];7.1B=O}}8(7.G.12.1d){7.3z=(7[7.d[\'S\']]==\'1d\')?36($1A.3a(),7,\'35\'):7[7.d[\'S\']];8(7.1B===O){7[7.d[\'S\']]=\'1d\'}7.G.P=2P(h,7,0)}Q 8(7.G.1v!=\'*\'){7.G.12.42=7.G.P;7.G.P=3A(h,7,0)}8(K 7.1B==\'1y\'){7.1B=(7[7.d[\'S\']]==\'1d\')?O:\'4x\'}7.G.P=2Q(7.G.P,7,7.G.12.2l,$19);7.G.12.2m=7.G.P;7.1u=O;8(7.2J){8(!7.G.12.2N)7.G.12.2N=7.G.P;8(!7.G.12.27)7.G.12.27=7.G.P;7.1B=O;7.1i=[0,0,0,0];F j=$1A.1W(\':P\');8(j)$1A.3b();F k=3Z(36($1A.3a(),7,\'35\'),7[7.d[\'S\']]);8(K 7[7.d[\'S\']]==\'13\'&&k<7[7.d[\'S\']]){k=7[7.d[\'S\']]}8(j)$1A.3c();F m=4y(1L.2v(k/7.G[7.d[\'S\']]),7.G.12);8(m>h.V){m=h.V}F n=1L.3x(k/m),4z=7[7.d[\'1l\']],5x=3Y(4z);h.1K(H(){F a=$(1g),4A=n-5y(a,7,\'6x\');a[7.d[\'S\']](4A);8(5x){a[7.d[\'1l\']](3Z(4A,4z))}});7.G.P=m;7.G[7.d[\'S\']]=n;7[7.d[\'S\']]=m*n}Q{7.1i=5z(7.1i);8(7.1B==\'2L\')7.1B=\'1t\';8(7.1B==\'4B\')7.1B=\'2M\';1x(7.1B){W\'4x\':W\'1t\':W\'2M\':8(7[7.d[\'S\']]!=\'1d\'){F p=43(3d(h,7),7);7.1u=M;7.1i[7.d[1]]=p[1];7.1i[7.d[3]]=p[0]}18;2w:7.1B=O;7.1u=(7.1i[0]==0&&7.1i[1]==0&&7.1i[2]==0&&7.1i[3]==0)?O:M;18}}8(K 7.2n==\'1s\'&&7.2n)7.2n=\'6y\'+A.6z(\'6A\');8(K 7.G.3e!=\'13\')7.G.3e=7.G.P;8(K 7.1n.1j!=\'13\')7.1n.1j=5A;8(K 7.1n.G==\'1y\')7.1n.G=(7.G.12.1d||7.G.1v!=\'*\')?\'P\':7.G.P;7.T=3B($19,7.T,\'T\');7.17=3B($19,7.17);7.1a=3B($19,7.1a);7.1b=3B($19,7.1b,\'1b\');7.T=$.25(M,{},7.1n,7.T);7.17=$.25(M,{},7.1n,7.17);7.1a=$.25(M,{},7.1n,7.1a);7.1b=$.25(M,{},7.1n,7.1b);8(K 7.1b.44!=\'1s\')7.1b.44=O;8(K 7.1b.3f!=\'H\'&&7.1b.3f!==O)7.1b.3f=$.1P.1J.5B;8(K 7.T.1H!=\'1s\')7.T.1H=M;8(K 7.T.4C!=\'13\')7.T.4C=0;8(K 7.T.45==\'1y\')7.T.45=M;8(K 7.T.4D!=\'1s\')7.T.4D=M;8(K 7.T.3g!=\'13\')7.T.3g=(7.T.1j<10)?6B:7.T.1j*5;8(7.29){7.29=4E(7.29)}8(I.1e){1e(I,\'3h S: \'+7.S);1e(I,\'3h 1l: \'+7.1l);8(7.3z)1e(I,\'6C \'+7.d[\'S\']+\': \'+7.3z);1e(I,\'5C 6D: \'+7.G.S);1e(I,\'5C 6E: \'+7.G.1l);1e(I,\'46 3y G P: \'+7.G.P);8(7.T.1H)1e(I,\'46 3y G 4F 6F: \'+7.T.G);8(7.17.Y)1e(I,\'46 3y G 4F 4G: \'+7.17.G);8(7.1a.Y)1e(I,\'46 3y G 4F 5D: \'+7.1a.G)}};A.5E=H(){A.1r(\'4r\',M);F a={\'4H\':A.16(\'4H\'),\'4I\':A.16(\'4I\'),\'3C\':A.16(\'3C\'),\'2L\':A.16(\'2L\'),\'2M\':A.16(\'2M\'),\'4B\':A.16(\'4B\'),\'1t\':A.16(\'1t\'),\'S\':A.16(\'S\'),\'1l\':A.16(\'1l\'),\'4J\':A.16(\'4J\'),\'1E\':A.16(\'1E\'),\'3X\':A.16(\'3X\'),\'4K\':A.16(\'4K\')};1x(a.3C){W\'4L\':F b=\'4L\';18;W\'5F\':F b=\'5F\';18;2w:F b=\'6G\'}$1A.16(a).16({\'6H\':\'2O\',\'3C\':b});A.1r(\'5G\',a).16({\'4H\':\'1t\',\'4I\':\'47\',\'3C\':\'4L\',\'2L\':0,\'1t\':0,\'4J\':0,\'1E\':0,\'3X\':0,\'4K\':0});8(7.1u){A.Z().1K(H(){F m=2o($(1g).16(7.d[\'1E\']));8(2p(m))m=0;$(1g).1r(\'1R\',m)})}};A.5H=H(){A.4M();A.14(L(\'4N\',I),H(e,a){e.1h();8(!C.1Z){8(7.T.Y){7.T.Y.2R(2q(\'48\',I))}}C.1Z=M;8(7.T.1H){7.T.1H=O;A.X(L(\'2S\',I),a)}J M});A.14(L(\'4O\',I),H(e){e.1h();8(C.1S){3D(R)}J M});A.14(L(\'2S\',I),H(e,a,b){e.1h();1F=3i(1F);8(a&&C.1S){R.1Z=M;F c=2x()-R.2T;R.1j-=c;8(R.1p)R.1p.1j-=c;8(R.1Q)R.1Q.1j-=c;3D(R,O)}8(!C.1X&&!C.1S){8(b)1F.3E+=2x()-1F.2T}8(!C.1X){8(7.T.Y){7.T.Y.2R(2q(\'5I\',I))}}C.1X=M;8(7.T.5J){F d=7.T.3g-1F.3E,3F=3G-1L.2v(d*3G/7.T.3g);7.T.5J.1z($19,3F,d)}J M});A.14(L(\'1H\',I),H(e,b,c,d){e.1h();1F=3i(1F);F v=[b,c,d],t=[\'1k\',\'13\',\'1s\'],a=2U(v,t);F b=a[0],c=a[1],d=a[2];8(b!=\'17\'&&b!=\'1a\')b=C.2k;8(K c!=\'13\')c=0;8(K d!=\'1s\')d=O;8(d){C.1Z=O;7.T.1H=M}8(!7.T.1H){e.20();J 1e(I,\'3h 48: 28 2V.\')}8(C.1X){8(7.T.Y){7.T.Y.2y(2q(\'48\',I));7.T.Y.2y(2q(\'5I\',I))}}C.1X=O;1F.2T=2x();F f=7.T.3g+c;3H=f-1F.3E;3F=3G-1L.2v(3H*3G/f);1F.T=6I(H(){8(7.T.5K){7.T.5K.1z($19,3F,3H)}8(C.1S){A.X(L(\'1H\',I),b)}Q{A.X(L(b,I),7.T)}},3H);8(7.T.5L){7.T.5L.1z($19,3F,3H)}J M});A.14(L(\'2W\',I),H(e){e.1h();8(R.1Z){R.1Z=O;C.1X=O;C.1S=M;R.2T=2x();2a(R)}Q{A.X(L(\'1H\',I))}J M});A.14(L(\'17\',I)+\' \'+L(\'1a\',I),H(e,b,f,g){e.1h();8(C.1Z||A.1W(\':2O\')){e.20();J 1e(I,\'3h 48 6J 2O: 28 2V.\')}8(7.G.3e>=N.U){e.20();J 1e(I,\'28 5M G (\'+N.U+\', \'+7.G.3e+\' 5N): 28 2V.\')}F v=[b,f,g],t=[\'1o\',\'13/1k\',\'H\'],a=2U(v,t);F b=a[0],f=a[1],g=a[2];F h=e.4P.1c(I.3j.3I.V);8(K b!=\'1o\'||b==2b)b=7[h];8(K g==\'H\')b.21=g;8(K f!=\'13\'){8(7.G.1v!=\'*\'){f=\'P\'}Q{F i=[f,b.G,7[h].G];1m(F a=0,l=i.V;a<l;a++){8(K i[a]==\'13\'||i[a]==\'5O\'||i[a]==\'P\'){f=i[a];18}}}1x(f){W\'5O\':e.20();J A.1D(h+\'6K\',[b,g]);18;W\'P\':8(!7.G.12.1d&&7.G.1v==\'*\'){f=7.G.P}18}}8(R.1Z){A.X(L(\'2W\',I));A.X(L(\'3k\',I),[h,[b,f,g]]);e.20();J 1e(I,\'3h 6L 2V.\')}8(b.1j>0){8(C.1S){8(b.3k)A.X(L(\'3k\',I),[h,[b,f,g]]);e.20();J 1e(I,\'3h 6M 2V.\')}}8(b.4Q&&!b.4Q.1z($19)){e.20();J 1e(I,\'6N "4Q" 6O O.\')}1F.3E=0;A.X(\'34\',[\'5P\'+h,[b,f]]);8(7.29){F s=7.29,c=[b,f];1m(F j=0,l=s.V;j<l;j++){F d=h;8(!s[j][1])c[0]=s[j][0].1D(\'34\',[\'5Q\',d]);8(!s[j][2])d=(d==\'17\')?\'1a\':\'17\';c[1]=f+s[j][3];s[j][0].X(\'34\',[\'5P\'+d,c])}}J M});A.14(L(\'6P\',I),H(e,f,g){e.1h();F h=A.Z();8(!7.1M){8(N.11==0){8(7.3l){A.X(L(\'1a\',I),N.U-1)}J e.20()}}8(7.1u)1N(h,7);8(K g!=\'13\'){8(7.G.12.1d){g=4a(h,7,N.U-1)}Q 8(7.G.1v!=\'*\'){F i=(K f.G==\'13\')?f.G:4R(A,7);g=5R(h,7,N.U-1,i)}Q{g=7.G.P}g=4b(g,7,f.G,$19)}8(!7.1M){8(N.U-g<N.11){g=N.U-N.11}}7.G.12.2m=7.G.P;8(7.G.12.1d){F j=2P(h,7,N.U-g);8(7.G.P+g<=j&&g<N.U){g++;j=2P(h,7,N.U-g)}7.G.P=2Q(j,7,7.G.12.2l,$19)}Q 8(7.G.1v!=\'*\'){F j=3A(h,7,N.U-g);7.G.P=2Q(j,7,7.G.12.2l,$19)}8(7.1u)1N(h,7,M);8(g==0){e.20();J 1e(I,\'0 G 41 1n: 28 2V.\')}1e(I,\'5S \'+g+\' G 4G.\');N.11+=g;22(N.11>=N.U){N.11-=N.U}8(!7.1M){8(N.11==0&&f.4c)f.4c.1z($19);8(!7.3l)2X(7,N.11,I)}A.Z().1c(N.U-g,N.U).6Q(A);8(N.U<7.G.P+g){A.Z().1c(0,(7.G.P+g)-N.U).4d(M).3J(A)}F h=A.Z(),2r=5T(h,7,g),1T=5U(h,7),2c=h.1O(g-1),2d=2r.2Y(),2z=1T.2Y();8(7.1u)1N(h,7);8(7.1B){F p=43(1T,7),k=p[0],2s=p[1]}Q{F k=0,2s=0}F l=(k<0)?7.1i[7.d[3]]:0;8(f.1I==\'5V\'&&7.G.P<g){F m=h.1c(7.G.12.2m,g),4e=7.G[7.d[\'S\']];m.1K(H(){F a=$(1g);a.1r(\'4f\',a.1W(\':2O\')).3b()});7.G[7.d[\'S\']]=\'1d\'}Q{F m=O}F n=3m(h.1c(0,g),7,\'S\'),2e=4g(2A(1T,7,M),7,!7.1u);8(m)7.G[7.d[\'S\']]=4e;8(7.1u){1N(h,7,M);8(2s>=0){1N(2d,7,7.1i[7.d[1]])}1N(2c,7,7.1i[7.d[3]])}8(7.1B){7.1i[7.d[1]]=2s;7.1i[7.d[3]]=k}F o={},1w=f.1j;8(f.1I==\'47\')1w=0;Q 8(1w==\'T\')1w=7.1n.1j/7.1n.G*g;Q 8(1w<=0)1w=0;Q 8(1w<10)1w=n/1w;R=23(1w,f.1G);8(7[7.d[\'S\']]==\'1d\'||7[7.d[\'1l\']]==\'1d\'){R.1f.1q([$1A,2e])}8(7.1u){F q=7.1i[7.d[3]];8(2z.4S(2c).V){F r={};r[7.d[\'1E\']]=2c.1r(\'1R\');8(k<0)2c.16(r);Q R.1f.1q([2c,r])}8(2z.4S(2d).V){F s={};s[7.d[\'1E\']]=2d.1r(\'1R\');R.1f.1q([2d,s])}8(2s>=0){F t={};t[7.d[\'1E\']]=2z.1r(\'1R\')+7.1i[7.d[1]];R.1f.1q([2z,t])}}Q{F q=0}o[7.d[\'1t\']]=q;F u=[2r,1T,2e,1w];8(f.2f)f.2f.3K($19,u);1Y.2f=3L(1Y.2f,$19,u);1x(f.1I){W\'2B\':W\'2g\':W\'2C\':W\'2h\':R.1p=23(R.1j,R.1G);R.1Q=23(R.1j,R.1G);R.1j=0;18}1x(f.1I){W\'2g\':W\'2C\':W\'2h\':F v=A.4d().3J($1A);18}1x(f.1I){W\'2h\':v.Z().1c(0,g).1U();W\'2g\':W\'2C\':v.Z().1c(7.G.P).1U();18}1x(f.1I){W\'2B\':R.1p.1f.1q([A,{\'2i\':0}]);18;W\'2g\':v.16({\'2i\':0});R.1p.1f.1q([A,{\'S\':\'+=0\'},H(){v.1U()}]);R.1Q.1f.1q([v,{\'2i\':1}]);18;W\'2C\':R=4T(R,A,v,7,M);18;W\'2h\':R=4U(R,A,v,7,M,g);18}F w=H(){F b=7.G.P+g-N.U;8(b>0){A.Z().1c(N.U).1U();2r=$(A.Z().1c(N.U-(7.G.P-b)).4h().5W(A.Z().1c(0,b).4h()))}8(m){m.1K(H(){F a=$(1g);8(!a.1r(\'4f\'))a.3c()})}8(7.1u){F c=A.Z().1O(7.G.P+g-1);c.16(7.d[\'1E\'],c.1r(\'1R\'))}R.1f=[];8(R.1p)R.1p=23(R.4V,R.1G);F d=H(){1x(f.1I){W\'2B\':W\'2g\':A.16(\'1v\',\'\');18}R.1Q=23(0,2b);C.1S=O;F a=[2r,1T,2e];8(f.21)f.21.3K($19,a);1Y.21=3L(1Y.21,$19,a);8(1V.V){A.X(L(1V[0][0],I),1V[0][1]);1V.5X()}8(!C.1X)A.X(L(\'1H\',I))};1x(f.1I){W\'2B\':R.1p.1f.1q([A,{\'2i\':1},d]);2a(R.1p);18;W\'2h\':R.1p.1f.1q([A,{\'S\':\'+=0\'},d]);2a(R.1p);18;2w:d();18}};R.1f.1q([A,o,w]);C.1S=M;A.16(7.d[\'1t\'],-(n-l));1F=3i(1F);2a(R);4W(7.2n,A.1D(L(\'3v\',I)));A.X(L(\'2D\',I),[O,2e]);J M});A.14(L(\'6R\',I),H(e,f,g){e.1h();F h=A.Z();8(!7.1M){8(N.11==7.G.P){8(7.3l){A.X(L(\'17\',I),N.U-1)}J e.20()}}8(7.1u)1N(h,7);8(K g!=\'13\'){8(7.G.1v!=\'*\'){F i=(K f.G==\'13\')?f.G:4R(A,7);g=5Y(h,7,0,i)}Q{g=7.G.P}g=4b(g,7,f.G,$19)}F j=(N.11==0)?N.U:N.11;8(!7.1M){8(7.G.12.1d){F k=2P(h,7,g),i=4a(h,7,j-1)}Q{F k=7.G.P,i=7.G.P}8(g+k>j){g=j-i}}7.G.12.2m=7.G.P;8(7.G.12.1d){F k=4X(h,7,g,j);22(7.G.P-g>=k&&g<N.U){g++;k=4X(h,7,g,j)}7.G.P=2Q(k,7,7.G.12.2l,$19)}Q 8(7.G.1v!=\'*\'){F k=3A(h,7,g);7.G.P=2Q(k,7,7.G.12.2l,$19)}8(7.1u)1N(h,7,M);8(g==0){e.20();J 1e(I,\'0 G 41 1n: 28 2V.\')}1e(I,\'5S \'+g+\' G 5D.\');N.11-=g;22(N.11<0){N.11+=N.U}8(!7.1M){8(N.11==7.G.P&&f.4c)f.4c.1z($19);8(!7.3l)2X(7,N.11,I)}8(N.U<7.G.P+g){A.Z().1c(0,(7.G.P+g)-N.U).4d(M).3J(A)}F h=A.Z(),2r=4Y(h,7),1T=4Z(h,7,g),2c=h.1O(g-1),2d=2r.2Y(),2z=1T.2Y();8(7.1u)1N(h,7);8(7.1B){F p=43(1T,7),l=p[0],2s=p[1]}Q{F l=0,2s=0}8(f.1I==\'5V\'&&7.G.12.2m<g){F m=h.1c(7.G.12.2m,g),4e=7.G[7.d[\'S\']];m.1K(H(){F a=$(1g);a.1r(\'4f\',a.1W(\':2O\')).3b()});7.G[7.d[\'S\']]=\'1d\'}Q{F m=O}F n=3m(h.1c(0,g),7,\'S\'),2e=4g(2A(1T,7,M),7,!7.1u);8(m)7.G[7.d[\'S\']]=4e;8(7.1B){8(7.1i[7.d[1]]<0){7.1i[7.d[1]]=0}}8(7.1u){1N(h,7,M);1N(2d,7,7.1i[7.d[1]])}8(7.1B){7.1i[7.d[1]]=2s;7.1i[7.d[3]]=l}F o={},1w=f.1j;8(f.1I==\'47\')1w=0;Q 8(1w==\'T\')1w=7.1n.1j/7.1n.G*g;Q 8(1w<=0)1w=0;Q 8(1w<10)1w=n/1w;R=23(1w,f.1G);8(7[7.d[\'S\']]==\'1d\'||7[7.d[\'1l\']]==\'1d\'){R.1f.1q([$1A,2e])}8(7.1u){F q=2z.1r(\'1R\');8(2s>=0){q+=7.1i[7.d[1]]}2z.16(7.d[\'1E\'],q);8(2c.4S(2d).V){F r={};r[7.d[\'1E\']]=2d.1r(\'1R\');R.1f.1q([2d,r])}F s=2c.1r(\'1R\');8(l>=0){s+=7.1i[7.d[3]]}F t={};t[7.d[\'1E\']]=s;R.1f.1q([2c,t])}o[7.d[\'1t\']]=-n;8(l<0){o[7.d[\'1t\']]+=l}F u=[2r,1T,2e,1w];8(f.2f)f.2f.3K($19,u);1Y.2f=3L(1Y.2f,$19,u);1x(f.1I){W\'2B\':W\'2g\':W\'2C\':W\'2h\':R.1p=23(R.1j,R.1G);R.1Q=23(R.1j,R.1G);R.1j=0;18}1x(f.1I){W\'2g\':W\'2C\':W\'2h\':F v=A.4d().3J($1A);18}1x(f.1I){W\'2h\':v.Z().1c(7.G.12.2m).1U();18;W\'2g\':W\'2C\':v.Z().1c(0,g).1U();v.Z().1c(7.G.P).1U();18}1x(f.1I){W\'2B\':R.1p.1f.1q([A,{\'2i\':0}]);18;W\'2g\':v.16({\'2i\':0});R.1p.1f.1q([A,{\'S\':\'+=0\'},H(){v.1U()}]);R.1Q.1f.1q([v,{\'2i\':1}]);18;W\'2C\':R=4T(R,A,v,7,O);18;W\'2h\':R=4U(R,A,v,7,O,g);18}F w=H(){F b=7.G.P+g-N.U,5Z=(7.1u)?7.1i[7.d[3]]:0;A.16(7.d[\'1t\'],5Z);8(b>0){A.Z().1c(N.U).1U()}F c=A.Z().1c(0,g).3J(A).2Y();8(b>0){1T=3d(h,7)}8(m){m.1K(H(){F a=$(1g);8(!a.1r(\'4f\'))a.3c()})}8(7.1u){8(N.U<7.G.P+g){F d=A.Z().1O(7.G.P-1);d.16(7.d[\'1E\'],d.1r(\'1R\')+7.1i[7.d[3]])}c.16(7.d[\'1E\'],c.1r(\'1R\'))}R.1f=[];8(R.1p)R.1p=23(R.4V,R.1G);F e=H(){1x(f.1I){W\'2B\':W\'2g\':A.16(\'1v\',\'\');18}R.1Q=23(0,2b);C.1S=O;F a=[2r,1T,2e];8(f.21)f.21.3K($19,a);1Y.21=3L(1Y.21,$19,a);8(1V.V){A.X(L(1V[0][0],I),1V[0][1]);1V.5X()}8(!C.1X)A.X(L(\'1H\',I))};1x(f.1I){W\'2B\':R.1p.1f.1q([A,{\'2i\':1},e]);2a(R.1p);18;W\'2h\':R.1p.1f.1q([A,{\'S\':\'+=0\'},e]);2a(R.1p);18;2w:e();18}};R.1f.1q([A,o,w]);C.1S=M;1F=3i(1F);2a(R);4W(7.2n,A.1D(L(\'3v\',I)));A.X(L(\'2D\',I),[O,2e]);J M});A.14(L(\'2Z\',I),H(e,b,c,d,f,g,h){e.1h();F v=[b,c,d,f,g,h],t=[\'1k/13/1o\',\'13\',\'1s\',\'1o\',\'1k\',\'H\'],a=2U(v,t);F f=a[3],g=a[4],h=a[5];b=3n(a[0],a[1],a[2],N,A);8(b==0)J;8(K f!=\'1o\')f=O;8(C.1S){8(K f!=\'1o\'||f.1j>0)J O}8(g!=\'17\'&&g!=\'1a\'){8(7.1M){8(b<=N.U/2)g=\'1a\';Q g=\'17\'}Q{8(N.11==0||N.11>b)g=\'1a\';Q g=\'17\'}}8(g==\'17\')b=N.U-b;A.X(L(g,I),[f,b,h]);J M});A.14(L(\'6S\',I),H(e,a,b){e.1h();F c=A.1D(L(\'3M\',I));J A.1D(L(\'51\',I),[c-1,a,\'17\',b])});A.14(L(\'6T\',I),H(e,a,b){e.1h();F c=A.1D(L(\'3M\',I));J A.1D(L(\'51\',I),[c+1,a,\'1a\',b])});A.14(L(\'51\',I),H(e,a,b,c,d){e.1h();8(K a!=\'13\')a=A.1D(L(\'3M\',I));F f=7.1b.G||7.G.P,27=1L.2v(N.U/f)-1;8(a<0)a=27;8(a>27)a=0;J A.1D(L(\'2Z\',I),[a*f,0,M,b,c,d])});A.14(L(\'60\',I),H(e,s){e.1h();8(s)s=3n(s,0,M,N,A);Q s=0;s+=N.11;8(s!=0){22(s>N.U)s-=N.U;A.6U(A.Z().1c(s,N.U))}J M});A.14(L(\'29\',I),H(e,s){e.1h();8(s)s=4E(s);Q 8(7.29)s=7.29;Q J 1e(I,\'5s 6V 41 29.\');F n=A.1D(L(\'3v\',I)),x=M;1m(F j=0,l=s.V;j<l;j++){8(!s[j][0].1D(L(\'2Z\',I),[n,s[j][3],M])){x=O}}J x});A.14(L(\'3k\',I),H(e,a,b){e.1h();8(K a==\'H\'){a.1z($19,1V)}Q 8(31(a)){1V=a}Q 8(K a!=\'1y\'){1V.1q([a,b])}J 1V});A.14(L(\'6W\',I),H(e,b,c,d,f){e.1h();F v=[b,c,d,f],t=[\'1k/1o\',\'1k/13/1o\',\'1s\',\'13\'],a=2U(v,t);F b=a[0],c=a[1],d=a[2],f=a[3];8(K b==\'1o\'&&K b.3o==\'1y\')b=$(b);8(K b==\'1k\')b=$(b);8(K b!=\'1o\'||K b.3o==\'1y\'||b.V==0)J 1e(I,\'28 a 4w 1o.\');8(K c==\'1y\')c=\'4i\';8(7.1u){b.1K(H(){F m=2o($(1g).16(7.d[\'1E\']));8(2p(m))m=0;$(1g).1r(\'1R\',m)})}F g=c,3N=\'3N\';8(c==\'4i\'){8(d){8(N.11==0){c=N.U-1;3N=\'61\'}Q{c=N.11;N.11+=b.V}8(c<0)c=0}Q{c=N.U-1;3N=\'61\'}}Q{c=3n(c,f,d,N,A)}8(g!=\'4i\'&&!d){8(c<N.11)N.11+=b.V}8(N.11>=N.U)N.11-=N.U;F h=A.Z().1O(c);8(h.V){h[3N](b)}Q{A.62(b)}N.U=A.Z().V;F i=A.1D(\'52\');3O(7,N.U,I);2X(7,N.11,I);A.X(L(\'53\',I));A.X(L(\'2D\',I),[M,i]);J M});A.14(L(\'63\',I),H(e,c,d,f){e.1h();F v=[c,d,f],t=[\'1k/13/1o\',\'1s\',\'13\'],a=2U(v,t);c=a[0];d=a[1];f=a[2];F g=O;8(c 64 $&&c.V>1){h=$();c.1K(H(i,a){F b=A.X(L(\'63\',I),[$(1g),d,f]);8(b)h=h.6X(b)});J h}8(K c==\'1y\'||c==\'4i\'){h=A.Z().2Y()}Q{c=3n(c,f,d,N,A);F h=A.Z().1O(c);8(h.V){8(c<N.11)N.11-=h.V}}8(h&&h.V){h.6Y();N.U=A.Z().V;F j=A.1D(\'52\');3O(7,N.U,I);2X(7,N.11,I);A.X(L(\'2D\',I),[M,j])}J h});A.14(L(\'2f\',I)+\' \'+L(\'21\',I),H(e,a){e.1h();F b=e.4P.1c(I.3j.3I.V);8(31(a))1Y[b]=a;8(K a==\'H\')1Y[b].1q(a);J 1Y[b]});A.14(L(\'3v\',I),H(e,a){e.1h();8(N.11==0)F b=0;Q F b=N.U-N.11;8(K a==\'H\')a.1z($19,b);J b});A.14(L(\'3M\',I),H(e,a){e.1h();F b=7.1b.G||7.G.P;F c=1L.2v(N.U/b-1);8(N.11==0)F d=0;Q 8(N.11<N.U%b)F d=0;Q 8(N.11==b&&!7.1M)F d=c;Q F d=1L.6Z((N.U-N.11)/b);8(d<0)d=0;8(d>c)d=c;8(K a==\'H\')a.1z($19,d);J d});A.14(L(\'70\',I),H(e,a){e.1h();$i=3d(A.Z(),7);8(K a==\'H\')a.1z($19,$i);J $i});A.14(L(\'1c\',I),H(e,f,l,b){e.1h();8(N.U==0)J O;F v=[f,l,b],t=[\'13\',\'13\',\'H\'],a=2U(v,t);f=(K a[0]==\'13\')?a[0]:0;l=(K a[1]==\'13\')?a[1]:N.U;b=a[2];f+=N.11;l+=N.11;22(f>N.U){f-=N.U}22(l>N.U){l-=N.U}22(f<0){f+=N.U}22(l<0){l+=N.U}F c=A.Z();8(l>f){F d=c.1c(f,l)}Q{F d=$(c.1c(f,N.U).4h().5W(c.1c(0,l).4h()))}8(K b==\'H\')b.1z($19,d);J d});A.14(L(\'1X\',I)+\' \'+L(\'1Z\',I)+\' \'+L(\'1S\',I),H(e,a){e.1h();F b=e.4P.1c(I.3j.3I.V);8(K a==\'H\')a.1z($19,C[b]);J C[b]});A.14(L(\'5Q\',I),H(e,a,b,c){e.1h();F d=O;8(K a==\'H\'){a.1z($19,7)}Q 8(K a==\'1o\'){2u=$.25(M,{},2u,a);8(b!==O)d=M;Q 7=$.25(M,{},7,a)}Q 8(K a!=\'1y\'){8(K b==\'H\'){F f=4j(\'7.\'+a);8(K f==\'1y\')f=\'\';b.1z($19,f)}Q 8(K b!=\'1y\'){8(K c!==\'1s\')c=M;4j(\'2u.\'+a+\' = b\');8(c!==O)d=M;Q 4j(\'7.\'+a+\' = b\')}Q{J 4j(\'7.\'+a)}}8(d){1N(A.Z(),7);A.3V(2u);A.54();F g=3P(A,7,O);A.X(L(\'2D\',I),[M,g])}J 7});A.14(L(\'53\',I),H(e,a,b){e.1h();8(K a==\'1y\'||a.V==0)a=$(\'71\');Q 8(K a==\'1k\')a=$(a);8(K a!=\'1o\')J 1e(I,\'28 a 4w 1o.\');8(K b!=\'1k\'||b.V==0)b=\'a.65\';a.72(b).1K(H(){F h=1g.66||\'\';8(h.V>0&&A.Z().68($(h))!=-1){$(1g).24(\'55\').55(H(e){e.2j();A.X(L(\'2Z\',I),h)})}});J M});A.14(L(\'2D\',I),H(e,b,c){e.1h();8(!7.1b.1C)J;8(b){F d=7.1b.G||7.G.P,l=1L.2v(N.U/d);8(7.1b.3f){7.1b.1C.Z().1U();7.1b.1C.1K(H(){1m(F a=0;a<l;a++){F i=A.Z().1O(3n(a*d,0,M,N,A));$(1g).62(7.1b.3f(a+1,i))}})}7.1b.1C.1K(H(){$(1g).Z().24(7.1b.3p).1K(H(a){$(1g).14(7.1b.3p,H(e){e.2j();A.X(L(\'2Z\',I),[a*d,0,M,7.1b])})})})}7.1b.1C.1K(H(){$(1g).Z().2y(2q(\'69\',I)).1O(A.1D(L(\'3M\',I))).2R(2q(\'69\',I))});J M});A.14(L(\'52\',I),H(e){F a=A.Z(),3Q=7.G.P;8(7.G.12.1d)3Q=2P(a,7,0);Q 8(7.G.1v!=\'*\')3Q=3A(a,7,0);8(!7.1M&&N.11!=0&&3Q>N.11){8(7.G.12.1d){F b=4a(a,7,N.11)-N.11}Q 8(7.G.1v!=\'*\'){F b=6a(a,7,N.11)-N.11}Q{b=7.G.P-N.11}1e(I,\'73 74-1M: 75 \'+b+\' G 4G.\');A.X(\'17\',b)}7.G.P=2Q(3Q,7,7.G.12.2l,$19);J 3P(A,7)});A.14(L(\'5t\',I),H(e,a){e.1h();1F=3i(1F);A.1r(\'4r\',O);A.X(L(\'4O\',I));8(a){A.X(L(\'60\',I))}8(7.1u){1N(A.Z(),7)}A.16(A.1r(\'5G\'));A.4M();A.56();$1A.76(A);J M});A.14(\'34\',H(e,n,o){e.1h();J A.1D(L(n,I),o)})};A.4M=H(){A.24(L(\'\',I));A.24(L(\'\',I,O))};A.54=H(){A.56();3O(7,N.U,I);2X(7,N.11,I);8(7.T.2t){F c=3q(7.T.2t);$1A.14(L(\'4k\',I,O),H(){A.X(L(\'2S\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2W\',I))})}8(7.T.Y){7.T.Y.14(L(7.T.3p,I,O),H(e){e.2j();F a=O,c=2b;8(C.1X){a=\'1H\'}Q 8(7.T.45){a=\'2S\';c=3q(7.T.45)}8(a){A.X(L(a,I),c)}})}8(7.17.Y){7.17.Y.14(L(7.17.3p,I,O),H(e){e.2j();A.X(L(\'17\',I))});8(7.17.2t){F c=3q(7.17.2t);7.17.Y.14(L(\'4k\',I,O),H(){A.X(L(\'2S\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2W\',I))})}}8(7.1a.Y){7.1a.Y.14(L(7.1a.3p,I,O),H(e){e.2j();A.X(L(\'1a\',I))});8(7.1a.2t){F c=3q(7.1a.2t);7.1a.Y.14(L(\'4k\',I,O),H(){A.X(L(\'2S\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2W\',I))})}}8($.1P.2E){8(7.17.2E){8(!C.57){C.57=M;$1A.2E(H(e,a){8(a>0){e.2j();F b=59(7.17.2E);A.X(L(\'17\',I),b)}})}}8(7.1a.2E){8(!C.5a){C.5a=M;$1A.2E(H(e,a){8(a<0){e.2j();F b=59(7.1a.2E);A.X(L(\'1a\',I),b)}})}}}8($.1P.3R){F d=(7.17.5b)?H(){A.X(L(\'17\',I))}:2b,3S=(7.1a.5b)?H(){A.X(L(\'1a\',I))}:2b;8(3S||3S){8(!C.3R){C.3R=M;F f={\'77\':30,\'78\':30,\'79\':M};1x(7.2k){W\'4u\':W\'6b\':f.7a=d;f.7b=3S;18;2w:f.7c=3S;f.7d=d}$1A.3R(f)}}}8(7.1b.1C){8(7.1b.2t){F c=3q(7.1b.2t);7.1b.1C.14(L(\'4k\',I,O),H(){A.X(L(\'2S\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2W\',I))})}}8(7.17.2F||7.1a.2F){$(3T).14(L(\'6c\',I,O,M,M),H(e){F k=e.6d;8(k==7.1a.2F){e.2j();A.X(L(\'1a\',I))}8(k==7.17.2F){e.2j();A.X(L(\'17\',I))}})}8(7.1b.44){$(3T).14(L(\'6c\',I,O,M,M),H(e){F k=e.6d;8(k>=49&&k<58){k=(k-49)*7.G.P;8(k<=N.U){e.2j();A.X(L(\'2Z\',I),[k,0,M,7.1b])}}})}8(7.T.1H){A.X(L(\'1H\',I),7.T.4C)}8(C.4t){F g=$(3r),5c=g.S(),5d=g.1l();g.14(L(\'7e\',I,O,M,M),H(e){8(g.S()!=5c||g.1l()!=5d){A.X(L(\'4O\',I));8(7.T.4D&&!C.1X){A.X(L(\'1H\',I))}1N(A.Z(),7);A.3V(2u);F a=3P(A,7,O);A.X(L(\'2D\',I),[M,a]);5c=g.S();5d=g.1l()}})}};A.56=H(){F a=L(\'\',I),3s=L(\'\',I,O);5e=L(\'\',I,O,M,M);$(3T).24(5e);$(3r).24(5e);$1A.24(3s);8(7.T.Y)7.T.Y.24(3s);8(7.17.Y)7.17.Y.24(3s);8(7.1a.Y)7.1a.Y.24(3s);8(7.1b.1C){7.1b.1C.24(3s);8(7.1b.3f){7.1b.1C.Z().1U()}}3O(7,\'3b\',I);2X(7,\'2y\',I)};F C={\'2k\':\'1a\',\'1X\':M,\'1S\':O,\'1Z\':O,\'5a\':O,\'57\':O,\'3R\':O},N={\'U\':A.Z().V,\'11\':0},1F={\'7f\':2b,\'T\':2b,\'3k\':2b,\'2T\':2x(),\'3E\':0},R={\'1Z\':O,\'1j\':0,\'2T\':0,\'1G\':\'\',\'1f\':[]},1Y={\'2f\':[],\'21\':[]},1V=[],I=$.25(M,{},$.1P.1J.6e,z),7={},2u=y,$1A=A.7g(\'<\'+I.5f.4q+\' 7h="\'+I.5f.6f+\'" />\').3a();I.3U=A.3U;I.4m=$.1P.1J.4m++;A.3V(2u,M,B);A.5E();A.5H();A.54();8(31(7.G.2I)){F D=7.G.2I}Q{F D=[];8(7.G.2I!=0){D.1q(7.G.2I)}}8(7.2n){D.7i(6g(7.2n))}8(D.V>0){1m(F a=0,l=D.V;a<l;a++){F s=D[a];8(s==0){5g}8(s===M){s=3r.7j.66;8(s.V<1){5g}}Q 8(s===\'6h\'){s=1L.3x(1L.6h()*N.U)}8(A.1D(L(\'2Z\',I),[s,0,M,{1I:\'47\'}])){18}}}F E=3P(A,7,O),6i=3d(A.Z(),7);8(7.6j){7.6j.1z($19,6i,E)}A.X(L(\'2D\',I),[M,E]);A.X(L(\'53\',I));J A};$.1P.1J.4m=1;$.1P.1J.4s={\'29\':O,\'3l\':M,\'1M\':M,\'2J\':O,\'2k\':\'1t\',\'G\':{\'2I\':0},\'1n\':{\'1G\':\'7k\',\'1j\':5A,\'2t\':O,\'2E\':O,\'5b\':O,\'3p\':\'55\',\'3k\':O}};$.1P.1J.6e={\'1e\':O,\'3j\':{\'3I\':\'\',\'6k\':\'7l\'},\'5f\':{\'4q\':\'7m\',\'6f\':\'7n\'},\'5h\':{}};$.1P.1J.5B=H(a,b){J\'<a 7o="#"><6l>\'+a+\'</6l></a>\'};H 23(d,e){J{1f:[],1j:d,4V:d,1G:e,2T:2x()}}H 2a(s){8(K s.1p==\'1o\'){2a(s.1p)}1m(F a=0,l=s.1f.V;a<l;a++){F b=s.1f[a];8(!b)5g;8(b[3])b[0].4N();b[0].6m(b[1],{6n:b[2],1j:s.1j,1G:s.1G})}8(K s.1Q==\'1o\'){2a(s.1Q)}}H 3D(s,c){8(K c!=\'1s\')c=M;8(K s.1p==\'1o\'){3D(s.1p,c)}1m(F a=0,l=s.1f.V;a<l;a++){F b=s.1f[a];b[0].4N(M);8(c){b[0].16(b[1]);8(K b[2]==\'H\')b[2]()}}8(K s.1Q==\'1o\'){3D(s.1Q,c)}}H 3i(t){8(t.T)7p(t.T);J t}H 3L(b,t,c){8(b.V){1m(F a=0,l=b.V;a<l;a++){b[a].3K(t,c)}}J[]}H 7q(a,c,x,d,f){F o={\'1j\':d,\'1G\':a.1G};8(K f==\'H\')o.6n=f;c.6m({2i:x},o)}H 4T(a,b,c,o,d){F e=2A(4Y(b.Z(),o),o,M)[0],5i=2A(c.Z(),o,M)[0],4n=(d)?-5i:e,2G={},3t={};2G[o.d[\'S\']]=5i;2G[o.d[\'1t\']]=4n;3t[o.d[\'1t\']]=0;a.1p.1f.1q([b,{\'2i\':1}]);a.1Q.1f.1q([c,3t,H(){$(1g).1U()}]);c.16(2G);J a}H 4U(a,b,c,o,d,n){F e=2A(4Z(b.Z(),o,n),o,M)[0],5j=2A(c.Z(),o,M)[0],4n=(d)?-5j:e,2G={},3t={};2G[o.d[\'S\']]=5j;2G[o.d[\'1t\']]=0;3t[o.d[\'1t\']]=4n;a.1Q.1f.1q([c,3t,H(){$(1g).1U()}]);c.16(2G);J a}H 3O(o,t,c){8(t==\'3c\'||t==\'3b\'){F f=t}Q 8(o.G.3e>=t){1e(c,\'28 5M G: 7r 7s (\'+t+\' G, \'+o.G.3e+\' 5N).\');F f=\'3b\'}Q{F f=\'3c\'}F s=(f==\'3c\')?\'2y\':\'2R\',h=2q(\'2O\',c);8(o.T.Y)o.T.Y[f]()[s](h);8(o.17.Y)o.17.Y[f]()[s](h);8(o.1a.Y)o.1a.Y[f]()[s](h);8(o.1b.1C)o.1b.1C[f]()[s](h)}H 2X(o,f,c){8(o.1M||o.3l)J;F a=(f==\'2y\'||f==\'2R\')?f:O,4o=2q(\'7t\',c);8(o.T.Y&&a){o.T.Y[a](4o)}8(o.17.Y){F b=a||(f==0)?\'2R\':\'2y\';o.17.Y[b](4o)}8(o.1a.Y){F b=a||(f==o.G.P)?\'2R\':\'2y\';o.1a.Y[b](4o)}}H 3W(a,b){8(K b==\'H\')b=b.1z(a);8(K b==\'1y\')b={};J b}H 3B(a,b,c){8(K c!=\'1k\')c=\'\';b=3W(a,b);8(K b==\'1k\'){F d=5k(b);8(d==-1)b=$(b);Q b=d}8(c==\'1b\'){8(K b==\'1s\')b={\'44\':b};8(K b.3o!=\'1y\')b={\'1C\':b};8(K b.1C==\'H\')b.1C=b.1C.1z(a);8(K b.1C==\'1k\')b.1C=$(b.1C);8(K b.G!=\'13\')b.G=O}Q 8(c==\'T\'){8(K b.3o!=\'1y\')b={\'Y\':b};8(K b==\'1s\')b={\'1H\':b};8(K b==\'13\')b={\'3g\':b};8(K b.Y==\'H\')b.Y=b.Y.1z(a);8(K b.Y==\'1k\')b.Y=$(b.Y)}Q{8(K b.3o!=\'1y\')b={\'Y\':b};8(K b==\'13\')b={\'2F\':b};8(K b.Y==\'H\')b.Y=b.Y.1z(a);8(K b.Y==\'1k\')b.Y=$(b.Y);8(K b.2F==\'1k\')b.2F=5k(b.2F)}J b}H 3n(a,b,c,d,e){8(K a==\'1k\'){8(2p(a))a=$(a);Q a=2o(a)}8(K a==\'1o\'){8(K a.3o==\'1y\')a=$(a);a=e.Z().68(a);8(a==-1)a=0;8(K c!=\'1s\')c=O}Q{8(K c!=\'1s\')c=M}8(2p(a))a=0;Q a=2o(a);8(2p(b))b=0;Q b=2o(b);8(c){a+=d.11}a+=b;8(d.U>0){22(a>=d.U){a-=d.U}22(a<0){a+=d.U}}J a}H 4a(i,o,s){F t=0,x=0;1m(F a=s;a>=0;a--){F j=i.1O(a);t+=(j.1W(\':P\'))?j[o.d[\'26\']](M):0;8(t>o.3z)J x;8(a==0)a=i.V;x++}}H 6a(i,o,s){J 5l(i,o.G.1v,o.G.12.42,s)}H 5R(i,o,s,m){J 5l(i,o.G.1v,m,s)}H 5l(i,f,m,s){F t=0,x=0;1m(F a=s,l=i.V;a>=0;a--){x++;8(x==l)J x;F j=i.1O(a);8(j.1W(f)){t++;8(t==m)J x}8(a==0)a=l}}H 4R(a,o){J o.G.12.42||a.Z().1c(0,o.G.P).1v(o.G.1v).V}H 2P(i,o,s){F t=0,x=0;1m(F a=s,l=i.V-1;a<=l;a++){F j=i.1O(a);t+=(j.1W(\':P\'))?j[o.d[\'26\']](M):0;8(t>o.3z)J x;x++;8(x==l+1)J x;8(a==l)a=-1}}H 4X(i,o,s,l){F v=2P(i,o,s);8(!o.1M){8(s+v>l)v=l-s}J v}H 3A(i,o,s){J 5m(i,o.G.1v,o.G.12.42,s,o.1M)}H 5Y(i,o,s,m){J 5m(i,o.G.1v,m+1,s,o.1M)-1}H 5m(i,f,m,s,c){F t=0,x=0;1m(F a=s,l=i.V-1;a<=l;a++){x++;8(x==l)J x;F j=i.1O(a);8(j.1W(f)){t++;8(t==m)J x}8(a==l)a=-1}}H 3d(i,o){J i.1c(0,o.G.P)}H 5T(i,o,n){J i.1c(n,o.G.12.2m+n)}H 5U(i,o){J i.1c(0,o.G.P)}H 4Y(i,o){J i.1c(0,o.G.12.2m)}H 4Z(i,o,n){J i.1c(n,o.G.P+n)}H 1N(i,o,m){F x=(K m==\'1s\')?m:O;8(K m!=\'13\')m=0;i.1K(H(){F j=$(1g);F t=2o(j.16(o.d[\'1E\']));8(2p(t))t=0;j.1r(\'6o\',t);j.16(o.d[\'1E\'],((x)?j.1r(\'6o\'):m+j.1r(\'1R\')))})}H 3P(a,o,p){F b=a.3a(),$i=a.Z(),$v=3d($i,o),4p=4g(2A($v,o,M),o,p);b.16(4p);8(o.1u){F p=o.1i,r=p[o.d[1]];8(o.1B){8(r<0)r=0}F c=$v.2Y();c.16(o.d[\'1E\'],c.1r(\'1R\')+r);a.16(o.d[\'2L\'],p[o.d[0]]);a.16(o.d[\'1t\'],p[o.d[3]])}a.16(o.d[\'S\'],4p[o.d[\'S\']]+(3m($i,o,\'S\')*2));a.16(o.d[\'1l\'],5n($i,o,\'1l\'));J 4p}H 2A(i,o,a){F b=3m(i,o,\'S\',a),6p=5n(i,o,\'1l\',a);J[b,6p]}H 5n(i,o,a,b){8(K b!=\'1s\')b=O;8(K o[o.d[a]]==\'13\'&&b)J o[o.d[a]];8(K o.G[o.d[a]]==\'13\')J o.G[o.d[a]];F c=(a.5o().32(\'S\')>-1)?\'26\':\'2K\';J 3w(i,o,c)}H 3w(i,o,b){F s=0;1m(F a=0,l=i.V;a<l;a++){F j=i.1O(a);F m=(j.1W(\':P\'))?j[o.d[b]](M):0;8(s<m)s=m}J s}H 36(b,o,c){8(!b.1W(\':P\'))J 0;F d=b[o.d[c]](),5p=(o.d[c].5o().32(\'S\')>-1)?[\'7u\',\'7v\']:[\'7w\',\'7x\'];1m(F a=0,l=5p.V;a<l;a++){F m=2o(b.16(5p[a]));d-=(2p(m))?0:m}J d}H 3m(i,o,b,c){8(K c!=\'1s\')c=O;8(K o[o.d[b]]==\'13\'&&c)J o[o.d[b]];8(K o.G[o.d[b]]==\'13\')J o.G[o.d[b]]*i.V;F d=(b.5o().32(\'S\')>-1)?\'26\':\'2K\',s=0;1m(F a=0,l=i.V;a<l;a++){F j=i.1O(a);s+=(j.1W(\':P\'))?j[o.d[d]](M):0}J s}H 4v(i,o,b){F s=O,v=O;1m(F a=0,l=i.V;a<l;a++){F j=i.1O(a);F c=(j.1W(\':P\'))?j[o.d[b]](M):0;8(s===O)s=c;Q 8(s!=c)v=M;8(s==0)v=M}J v}H 5y(i,o,d){J i[o.d[\'7y\'+d]](M)-36(i,o,\'7z\'+d)}H 3Y(x){J(K x==\'1k\'&&x.1c(-1)==\'%\')}H 3Z(s,o){8(3Y(o)){o=o.1c(0,-1);8(2p(o))J s;s*=o/3G}J s}H L(n,c,a,b,d){8(K a!=\'1s\')a=M;8(K b!=\'1s\')b=M;8(K d!=\'1s\')d=O;8(a)n=c.3j.3I+n;8(b)n=n+\'.\'+c.3j.6k;8(b&&d)n+=c.4m;J n}H 2q(n,c){J(K c.5h[n]==\'1k\')?c.5h[n]:n}H 4g(a,o,p){8(K p!=\'1s\')p=M;F b=(o.1u&&p)?o.1i:[0,0,0,0];F c={};c[o.d[\'S\']]=a[0]+b[1]+b[3];c[o.d[\'1l\']]=a[1]+b[0]+b[2];J c}H 2U(c,d){F e=[];1m(F a=0,6q=c.V;a<6q;a++){1m(F b=0,6r=d.V;b<6r;b++){8(d[b].32(K c[a])>-1&&K e[b]==\'1y\'){e[b]=c[a];18}}}J e}H 5z(p){8(K p==\'1y\')J[0,0,0,0];8(K p==\'13\')J[p,p,p,p];Q 8(K p==\'1k\')p=p.3u(\'7A\').6s(\'\').3u(\'7B\').6s(\'\').3u(\' \');8(!31(p)){J[0,0,0,0]}1m(F i=0;i<4;i++){p[i]=2o(p[i])}1x(p.V){W 0:J[0,0,0,0];W 1:J[p[0],p[0],p[0],p[0]];W 2:J[p[0],p[1],p[0],p[1]];W 3:J[p[0],p[1],p[2],p[1]];2w:J[p[0],p[1],p[2],p[3]]}}H 43(a,o){F x=(K o[o.d[\'S\']]==\'13\')?1L.2v(o[o.d[\'S\']]-3m(a,o,\'S\')):0;1x(o.1B){W\'1t\':J[0,x];W\'2M\':J[x,0];W\'4x\':2w:J[1L.2v(x/2),1L.3x(x/2)]}}H 4b(x,o,a,b){F v=x;8(K a==\'H\'){v=a.1z(b,v)}Q 8(K a==\'1k\'){F p=a.3u(\'+\'),m=a.3u(\'-\');8(m.V>p.V){F c=M,5q=m[0],2H=m[1]}Q{F c=O,5q=p[0],2H=p[1]}1x(5q){W\'7C\':v=(x%2==1)?x-1:x;18;W\'7D\':v=(x%2==0)?x-1:x;18;2w:v=x;18}2H=2o(2H);8(!2p(2H)){8(c)2H=-2H;v+=2H}}8(K v!=\'13\')v=1;8(v<1)v=1;J v}H 2Q(x,o,a,b){J 4y(4b(x,o,a,b),o.G.12)}H 4y(v,i){8(K i.2N==\'13\'&&v<i.2N)v=i.2N;8(K i.27==\'13\'&&v>i.27)v=i.27;8(v<1)v=1;J v}H 4E(s){8(!31(s))s=[[s]];8(!31(s[0]))s=[s];1m(F j=0,l=s.V;j<l;j++){8(K s[j][0]==\'1k\')s[j][0]=$(s[j][0]);8(K s[j][1]!=\'1s\')s[j][1]=M;8(K s[j][2]!=\'1s\')s[j][2]=M;8(K s[j][3]!=\'13\')s[j][3]=0}J s}H 5k(k){8(k==\'2M\')J 39;8(k==\'1t\')J 37;8(k==\'4u\')J 38;8(k==\'6b\')J 40;J-1}H 4W(n,v){8(n)3T.2n=n+\'=\'+v+\'; 7E=/\'}H 6g(n){n+=\'=\';F b=3T.2n.3u(\';\');1m(F a=0,l=b.V;a<l;a++){F c=b[a];22(c.7F(0)==\' \'){c=c.1c(1)}8(c.32(n)==0){J c.1c(n.V)}}J 0}H 3q(p){8(p&&K p==\'1k\'){F i=(p.32(\'7G\')>-1)?M:O,r=(p.32(\'2W\')>-1)?M:O}Q{F i=r=O}J[i,r]}H 59(a){J(K a==\'13\')?a:2b}H 31(a){J K(a)==\'1o\'&&(a 64 7H)}H 2x(){J 7I 7J().2x()}H 1e(d,m){8(K d==\'1o\'){F s=\' (\'+d.3U+\')\';d=d.1e}Q{F s=\'\'}8(!d)J O;8(K m==\'1k\')m=\'1J\'+s+\': \'+m;Q m=[\'1J\'+s+\':\',m];8(3r.5r&&3r.5r.6t)3r.5r.6t(m);J O}$.1P.65=H(o,c){J 1g.1J(o,c)};$.25($.1G,{\'7K\':H(t){F a=t*t;J t*(-a*t+4*a-6*t+4)},\'7L\':H(t){J t*(4*t*t-9*t+6)},\'7M\':H(t){F a=t*t;J t*(33*a*a-7N*a*t+7O*a-67*t+15)}})})(7P);',62,486,'|||||||opts|if|||||||||||||||||||||||||||||||||var|items|function|conf|return|typeof|cf_e|true|itms|false|visible|else|scrl|width|auto|total|length|case|trigger|button|children||first|visibleConf|number|bind||css|prev|break|tt0|next|pagination|slice|variable|debug|anims|this|stopPropagation|padding|duration|string|height|for|scroll|object|pre|push|data|boolean|left|usePadding|filter|a_dur|switch|undefined|call|wrp|align|container|triggerHandler|marginRight|tmrs|easing|play|fx|carouFredSel|each|Math|circular|sz_resetMargin|eq|fn|post|cfs_origCssMargin|isScrolling|c_new|remove|queu|is|isPaused|clbk|isStopped|stopImmediatePropagation|onAfter|while|sc_setScroll|unbind|extend|outerWidth|max|Not|synchronise|sc_startScroll|null|l_cur|l_old|w_siz|onBefore|crossfade|uncover|opacity|preventDefault|direction|adjust|old|cookie|parseInt|isNaN|cf_c|c_old|pR|pauseOnHover|opts_orig|ceil|default|getTime|removeClass|l_new|ms_getSizes|fade|cover|updatePageStatus|mousewheel|key|css_o|adj|start|responsive|outerHeight|top|right|min|hidden|gn_getVisibleItemsNext|cf_getItemsAdjust|addClass|pause|startTime|cf_sortParams|scrolling|resume|nv_enableNavi|last|slideTo||is_array|indexOf||_cfs_triggerEvent|innerWidth|ms_getTrueInnerSize||||parent|hide|show|gi_getCurrentItems|minimum|anchorBuilder|pauseDuration|Carousel|sc_clearTimers|events|queue|infinite|ms_getTotalSize|gn_getItemIndex|jquery|event|bt_pauseOnHoverConfig|window|ns2|ani_o|split|currentPosition|ms_getTrueLargestSize|floor|of|maxDimention|gn_getVisibleItemsNextFilter|go_getNaviObject|position|sc_stopScroll|timePassed|perc|100|dur2|prefix|appendTo|apply|sc_callCallbacks|currentPage|before|nv_showNavi|sz_setSizes|vI|touchwipe|wN|document|selector|_cfs_init|go_getObject|marginBottom|ms_isPercentage|ms_getPercentage||to|org|cf_getAlignPadding|keys|pauseOnEvent|Number|none|stopped||gn_getVisibleItemsPrev|cf_getAdjust|onEnd|clone|orgW|isHidden|cf_mapWrapperSizes|get|end|eval|mouseenter|mouseleave|serialNumber|cur_l|di|sz|element|cfs_isCarousel|defaults|upDateOnWindowResize|up|ms_hasVariableSizes|valid|center|cf_getItemAdjustMinMax|seco|nw|bottom|delay|pauseOnResize|cf_getSynchArr|scrolled|backward|textAlign|float|marginTop|marginLeft|absolute|_cfs_unbind_events|stop|finish|type|conditions|gn_getVisibleOrg|not|fx_cover|fx_uncover|orgDuration|cf_setCookie|gn_getVisibleItemsNextTestCircular|gi_getOldItemsNext|gi_getNewItemsNext||slideToPage|updateSizes|linkAnchors|_cfs_bind_buttons|click|_cfs_unbind_buttons|mousewheelPrev||bt_mousesheelNumber|mousewheelNext|wipe|_windowWidth|_windowHeight|ns3|wrapper|continue|classnames|new_w|old_w|cf_getKeyCode|gn_getItemsPrevFilter|gn_getItemsNextFilter|ms_getLargestSize|toLowerCase|arr|sta|console|No|destroy|innerHeight|dx|Set|secp|ms_getPaddingBorderMargin|cf_getPadding|500|pageAnchorBuilder|Item|forward|_cfs_build|fixed|cfs_origCss|_cfs_bind_events|paused|onPausePause|onPauseEnd|onPauseStart|enough|needed|page|slide_|configuration|gn_getScrollItemsPrevFilter|Scrolling|gi_getOldItemsPrev|gi_getNewItemsPrev|directscroll|concat|shift|gn_getScrollItemsNextFilter|new_m|jumpToStart|after|append|removeItem|instanceof|caroufredsel|hash||index|selected|gn_getVisibleItemsPrevFilter|down|keyup|keyCode|configs|classname|cf_readCookie|random|itm|onCreate|namespace|span|animate|complete|cfs_tempCssMargin|s2|l1|l2|join|log|found|the|Infinity|Width|caroufredsel_cookie_|attr|id|2500|Available|widths|heights|automatically|relative|overflow|setTimeout|or|Page|resumed|currently|Callback|returned|slide_prev|prependTo|slide_next|prevPage|nextPage|prepend|carousel|insertItem|add|detach|round|currentVisible|body|find|Preventing|non|sliding|replaceWith|min_move_x|min_move_y|preventDefaultEvents|wipeUp|wipeDown|wipeLeft|wipeRight|resize|timer|wrap|class|unshift|location|swing|cfs|div|caroufredsel_wrapper|href|clearTimeout|fx_fade|hiding|navigation|disabled|paddingLeft|paddingRight|paddingTop|paddingBottom|outer|inner|px|em|even|odd|path|charAt|immediate|Array|new|Date|quadratic|cubic|elastic|106|126|jQuery'.split('|'),0,{}));
