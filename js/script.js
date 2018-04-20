jQuery(document).ready(function($){
   var changecolor = $('.s_active .m_slider_bg').css("background-color");
	var slider_num = $('body').find('.m_slider').length;
	for(var i=0; i<slider_num; i++){$('.slider_dots').append('<li><button></button></li>')}	
	$('.slider_dots li').eq(0).addClass('dot_active');
	var a=0;
//不能删，到最后一张返回到第一张开始
	$('.scrollpage').last().mousewheel(function(event) {
			var a1 = $(this).height();
			var a2 = $(window).height();
			var a3 = $(this).offset().top;
			var a4 = a1 - a2 + a3;
			if($(window).scrollTop() >= (a4)){
				if (event.deltaY > 0) {
					console.log('up');
				} else {
					event.preventDefault();
					if((a==0) && !($(this).parents('.content').hasClass('s_active2'))){
						console.log(a4);
						a=1;
						window.onmousewheel=document.onmousewheel=function(){return false;}
						$('.slider_dots li').eq(0).trigger("click");
						setTimeout(function(){
							window.onmousewheel=document.onmousewheel=function(){return true;}
							a=0;
						},2000);
					}
				}
			}
	});
//不能删，到最后一张返回到第一张结束


//下一张
	$('.scrollpage').mousewheel(function(event) {
				var index_s = $(this).index();
				var num_sp = $(this).parent().find('.scrollpage').length;
				var a1 = $(this).height();
				var a2 = $(window).height();
				var a3 = $(this).offset().top;
				var a4 = a1 - a2 + a3;
				if($(this).hasClass('last_page')){
					var a1 = $(this).height();
					var a2 = $(window).height();
					var a3 = $(this).offset().top;
					var a4 = a1 - a2 + a3;
					if($(window).scrollTop() >= (a4)){
						if (event.deltaY > 0) {
							console.log('up');
						} else {
							event.preventDefault();
							if((a==0) && !($(this).parents('.content').hasClass('s_active2'))){
								console.log(a4);
								a=1;
								window.onmousewheel=document.onmousewheel=function(){return false;}
								var coindex = $('.dot_active').index()
								var dotlen = $('.slider_dots li').length;
								$('.slider_dots li').eq(coindex+1).trigger("click");
								setTimeout(function(){
									window.onmousewheel=document.onmousewheel=function(){return true;}
									a=0;
								},2000);
							}
						}
					}
				}
				//上一张
				if($(this).hasClass('first_page')){
					if ($(this).offset().top >= $(window).scrollTop()) {
						if (event.deltaY > 0) {
							event.preventDefault();
							if((a==0) && !($(this).parents('.content').hasClass('s_active2'))){
								a=1;
								window.onmousewheel=document.onmousewheel=function(){return false;}
								var coindex = $('.dot_active').index()
								var dotlen = $('.slider_dots li').length;
								$('.slider_dots li').eq(coindex-1).trigger("click");
								setTimeout(function(){
									window.onmousewheel=document.onmousewheel=function(){return true;}
									a=0;
								},2000);
							}
						} else {
							console.log('down');
						}
					}
				}

				//添加中间的全屏滚动
				if(($(window).scrollTop() >= a4) && ((index_s+1)!=num_sp)){
					if (event.deltaY > 0) {
					} else {
						event.preventDefault();
						if (a==0) {
							a=1;
							var changecolor = $('.s_active .m_slider_bg').css("background-color");
							window.onmousewheel=document.onmousewheel=function(){return false;}
							if(!($(this).next().hasClass('has_bg'))){
								$('.content_main').css('mix-blend-mode','normal');
								$('.slider_dots li').hover(function(){
								    $(this).children('button').css('background',changecolor);
								},function(){
									$(this).children('button').css('background','#000');
								});
								$('.slider_dots li.dot_active').hover(function(){
								    $(this).children('button').css('background',changecolor);
								},function(){
									$(this).children('button').css('background',changecolor);
								});
								$('.dot_active button').css('background',changecolor);
							}
							if($(this).next().hasClass('has_bg')){
								if($(this).next().find('.imgblock').length!=0){
									$('.content_main').css('mix-blend-mode','multiply');
								}
								$('.slider_dots li').hover(function(){
								    $(this).children('button').css('background','#fff');
								},function(){
									$(this).children('button').css('background','#000');
								});
								$('.slider_dots li.dot_active').hover(function(){
								    $(this).children('button').css('background','#fff');
								},function(){
									$(this).children('button').css('background','#fff');
								});
								$('.dot_active button').css('background','#fff');
							}
							var backlength = $('.m_slider').length;
							var backindex = $('.dot_active').index();
							if(backindex==(backlength-1)){
								$('.scroll_text').html('Back to Top');
								$('.scrolldown').addClass('back');
							}
							$(this).parent().find('.scrollpage').removeClass('act');
							$(this).parent().find('.scrollpage').eq(index_s+1).addClass('act');
							$(this).parent().find('.scrollpage').find('.bg_section').delay(500).fadeOut(600);
							$(this).parent().find('.scrollpage').eq(index_s+1).find('.bg_section').delay(500).fadeIn(600);
							$('.cover_slider').css('display','block');
							$(document).bind("mousewheel DOMMouseScroll",function(event){event.preventDefault()});
							$(document).bind("touchmove",function(event){event.preventDefault()});
							setTimeout(function(){
								$('.cover_slider').css('display','none');
								$(document).unbind("mousewheel DOMMouseScroll");
								$(document).unbind("touchmove");
								window.onmousewheel=document.onmousewheel=function(){return true;}
								a=0;
							},2000);
							$(this).next().css('height','auto').css('opacity',1).css('z-index',1).css('min-height','100vh');
							$('html,body').stop().animate({scrollTop:$(this).next().offset().top},1000,function(){
							});
						}
					}
				}
				var index_d = $(this).index();
				if (($(this).offset().top >= $(window).scrollTop()) && (index_d!=0)) {
					if (event.deltaY > 0) {
						event.preventDefault();
						if (a==0) {
							a=1;
							var changecolor = $('.s_active .m_slider_bg').css("background-color");
							window.onmousewheel=document.onmousewheel=function(){return false;}
							if(!($(this).prev().hasClass('has_bg'))){
								$('.content_main').css('mix-blend-mode','normal');
								$('.slider_dots li').hover(function(){
								    $(this).children('button').css('background',changecolor);
								},function(){
									$(this).children('button').css('background','#000');
								});
								$('.slider_dots li.dot_active').hover(function(){
								    $(this).children('button').css('background',changecolor);
								},function(){
									$(this).children('button').css('background',changecolor);
								});
								$('.dot_active button').css('background',changecolor);
							}
							if($(this).prev().hasClass('has_bg')){
								if($(this).prev().find('.imgblock').length!=0){
									$('.content_main').css('mix-blend-mode','multiply');
								}
								$('.slider_dots li').hover(function(){
								    $(this).children('button').css('background','#fff');
								},function(){
									$(this).children('button').css('background','#000');
								});
								$('.slider_dots li.dot_active').hover(function(){
								    $(this).children('button').css('background','#fff');
								},function(){
									$(this).children('button').css('background','#fff');
								});
								$('.dot_active button').css('background','#fff');
							}
							var backlength = $('.m_slider').length;
							var backindex = $('.dot_active').index();
							if(backindex==(backlength-1)){
								$('.scroll_text').html('Scroll Down');
								$('.scrolldown').removeClass('back');
							}
							$(this).parent().find('.scrollpage').removeClass('act');
							$(this).parent().find('.scrollpage').eq(index_d-1).addClass('act');
							$(this).parent().find('.scrollpage').find('.bg_section').delay(500).fadeOut(600);
							$(this).parent().find('.scrollpage').eq(index_d-1).find('.bg_section').delay(500).fadeIn(600);
							$('.cover_slider').css('display','block');
							$(document).bind("mousewheel DOMMouseScroll",function(event){event.preventDefault()});
							$(document).bind("touchmove",function(event){event.preventDefault()});
							setTimeout(function(){
								$('.cover_slider').css('display','none');
								$(document).unbind("mousewheel DOMMouseScroll");
								$(document).unbind("touchmove");
								window.onmousewheel=document.onmousewheel=function(){return true;}
								a=0;
							},2000);
							$(this).prev().css('height','auto').css('opacity',1).css('z-index',1).css('min-height','100vh');
							var int_this = $(this);
							$('html,body').stop().animate({scrollTop:$(this).prev().offset().top},1000,function(){
								int_this.css('height','0').css('opacity',0).css('z-index','-999').css('min-height',0);
							});
						}
					}
				}
	});

	$('.slider_dots li').click(function(){
		var dot_index = $(this).index();
		$(this).siblings().removeClass('dot_active');
		$(this).addClass('dot_active');
		var c;
		if($(window).scrollTop() < $(window).height()){
			var c = $('.s_active').find('.m_slider_bg').css("background-color");
			$('.m_slider').eq(dot_index).find('.m_slider_before_bg').css('background-color',c);
		}
		if($(window).scrollTop() >= $(window).height()){
			$('.m_slider').eq(dot_index).find('.m_slider_before_bg').css('background-color','#fff');
		}
		if(!($('.m_slider').eq(dot_index).hasClass('s_active'))){
			$('.m_slider .slider_image').animate({opacity:0},500);
			$('.content_main').animate({opacity:0},500);

			$('.slider_dots li').children('button').css('background','#000');
			$('.slider_dots li.dot_active').children('button').css('background','#fff');
			$('.slider_dots li').hover(function(){
			    $(this).children('button').css('background','#fff');
			},function(){
				$(this).children('button').css('background','#000');
			});
			$('.slider_dots li.dot_active').hover(function(){
			    $(this).children('button').css('background','#fff');
			},function(){
				$(this).children('button').css('background','#fff');
			});
				$('.m_slider').addClass('s_active2');
				$('.m_slider').eq(dot_index).removeClass('s_active2');
			setTimeout(test,600);
			function test(){
				$('.m_slider').removeClass('s_active');
				$('.m_slider').eq(dot_index).addClass('s_active');
			}
		}
	});
});