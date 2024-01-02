/*
	Preloader
*/

$(window).on("load", function () {
	var preload = $('.preloader');
	preload.find('.spinner').fadeOut(function () {
		preload.fadeOut();
	});
});

$(function () {
	'use strict';


	/*
		Vars
	*/

	var width = $(window).width();
	var height = $(window).height();


	/*
		Typed
	*/

	$('.subtitle.subtitle-typed').each(function () {
		var subtitleContainer = $(this);

		subtitleContainer.typed({
			stringsElement: subtitleContainer.find('.typing-title'),
			backDelay: 3500, /* Delay in text change */
			typeSpeed: 0, /* Typing speed */
			loop: true
		});
	});


	/*
		Sidebar Show/Hide
	*/

	$('header, .profile').on('click', '.menu-btn', function () {
		$('.s_overlay').fadeIn();
		$('.content-sidebar').addClass('active');
		$('body,html').addClass('sidebar-open');
		return false;
	});
	$('.content-sidebar, .container').on('click', '.close, .s_overlay', function () {
		$('.s_overlay').fadeOut();
		$('.content-sidebar').removeClass('active');
		$('body,html').removeClass('sidebar-open');
	});


	/*
		Popup Menu Navigation
	*/

	$('.main-menu li.page_item_has_children').each(function () {
		$(this).find('> a').after('<span class="children_toggle"></span>');
	});
	$('.main-menu').on('click', '.children_toggle', function () {
		var main_menu_item = $(this).closest('.page_item_has_children');
		if (main_menu_item.hasClass('open')) {
			main_menu_item.removeClass('open');
			main_menu_item.find('> ul').slideUp(250);
		} else {
			main_menu_item.addClass('open');
			main_menu_item.find('> ul').slideDown(250);
		}
	});


	/*
		Default Menu
	*/

	$('.lnk-view-menu').on('click', function () {
		var btn_text1 = $(this).find('.text').text();
		var btn_text2 = $(this).find('.text').data('text-open');
		if ($('.profile').hasClass('default-menu-open')) {
			$('.profile').removeClass('default-menu-open');
			$(this).find('.text').data('text-open', btn_text1);
			$(this).find('.text').text(btn_text2);
		} else {
			$('.profile').addClass('default-menu-open');
			$(this).find('.text').data('text-open', btn_text1);
			$(this).find('.text').text(btn_text2);
		}

		return false;
	});


	/*
		Header Menu Desktop
	*/

	var container = $('.container');
	var card_items = $('.card-inner');

	/*
		Initialize Portfolio
	*/
	var $container = $('.grid-items');
	$container.imagesLoaded(function () {
		$container.isotope({
			percentPosition: true,
			itemSelector: '.grid-item'
		});
	});


	/*
		Filter items on button click
	*/
	$('.filter-button-group').on('click', '.f_btn', function () {
		var filterValue = $(this).find('input').val();
		$container.isotope({ filter: '.' + filterValue });
		$('.filter-button-group .f_btn').removeClass('active');
		$(this).addClass('active');
	});


	/*
		Gallery popup
	*/
	if (/\.(?:jpg|jpeg|gif|png)$/i.test($('.gallery-item:first a').attr('href'))) {
		$('.gallery-item a').magnificPopup({
			gallery: {
				enabled: true
			},
			type: 'image',
			closeBtnInside: false,
			mainClass: 'mfp-fade'
		});
	}


	/*
		Media popup
	*/
	$('.has-popup-media').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'mfp-fade popup-box-inline'
	});


	/*
		Image popup
	*/
	$('.has-popup-image').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-fade',
		image: {
			verticalFit: true
		}
	});


	/*
		Video popup
	*/
	$('.has-popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		iframe: {
			patterns: {
				youtube_short: {
					index: 'youtu.be/',
					id: 'youtu.be/',
					src: 'https://www.youtube.com/embed/%id%?autoplay=1'
				}
			}
		},
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade',
		callbacks: {
			markupParse: function (template, values, item) {
				template.find('iframe').attr('allow', 'autoplay');
			}
		}
	});


	/*
		Music popup
	*/
	$('.has-popup-music').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade'
	});


	/*
		Gallery popup
	*/
	$('.has-popup-gallery').on('click', function () {
		var gallery = $(this).attr('href');

		$(gallery).magnificPopup({
			delegate: 'a',
			type: 'image',
			closeOnContentClick: false,
			mainClass: 'mfp-fade',
			removalDelay: 160,
			fixedContentPos: false,
			gallery: {
				enabled: true
			}
		}).magnificPopup('open');

		return false;
	});


	/*
		Validate Contact Form
	*/

	$("#cform").validate({
		ignore: ".ignore",
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			hiddenRecaptcha: {
				required: function () {
					if (grecaptcha.getResponse() == '') {
						return true;
					} else {
						return false;
					}
				}
			}
		},
		success: "valid",
		submitHandler: function () {
			$.ajax({
				url: 'mailer/feedback.php',
				type: 'post',
				dataType: 'json',
				data: 'name=' + $("#cform").find('input[name="name"]').val() + '&email=' + $("#cform").find('input[name="email"]').val() + '&message=' + $("#cform").find('textarea[name="message"]').val(),
				beforeSend: function () {

				},
				complete: function () {

				},
				success: function (data) {
					$('#cform').fadeOut();
					$('.alert-success').delay(1000).fadeIn();
				}
			});
		}
	});


	/*
		Validate Commect Form
	*/

	$("#comment_form").validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			}
		},
		success: "valid",
		submitHandler: function () {
		}
	});

	/*
		New JS
	*/

	$(window).on('resize', function () {
		/*
			Dotted Skills Line On Resize Window
		*/

		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if (skills_dotted.length) {
			skills_dotted.find('.percentage .da').css({ 'width': skills_dotted_w + 1 });
		}

		/*
			Testimonials Carousel On Resize Window
		*/

		var revs_slider = $(".revs-carousel .owl-carousel");
		revs_slider.find('.revs-item').css({ 'max-width': revs_slider.width() });
	});

	/*
		Dotted Skills Line
	*/

	function skills() {
		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if (skills_dotted.length) {
			skills_dotted.append('<span class="dg"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage').append('<span class="da"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage .da').css({ 'width': skills_dotted_w });
		}
	}
	setTimeout(skills, 1000);

	/*
		Circle Skills Line
	*/

	var skills_circles = $('.skills-list.circles .progress');
	if (skills_circles.length) {
		skills_circles.append('<div class="slice"><div class="bar"></div><div class="fill"></div></div>');
	}

	/*
		Wrap First Title Word
	*/

	$('.content .title').each(function (index) {
		var title = $(this).text().split(' ');
		if (title.length > 1) {
			var firstWord = title[0];
			var replaceWord = '<span class="first-word">' + firstWord + '</span>';
			var newString = $(this).html().replace(firstWord, replaceWord);
			$(this).html(newString);
		} else {
			$(this).html('<div class="first-letter">' + $(this).html() + '</div>');
		}
	});

});


/*
	Google Map Options
*/

function initMap() {
	var myLatlng = new google.maps.LatLng(40.773328, -73.960088); // <- Your latitude and longitude
	var styles = [
		{
			"featureType": "water",
			"stylers": [{
				"color": "#d8dee9"
			},
			{
				"visibility": "on"
			}]
		},
		{
			"featureType": "landscape",
			"stylers": [{
				"color": "#eeeeee"
			}]
		}]

	var mapOptions = {
		zoom: 14,
		center: myLatlng,
		mapTypeControl: false,
		disableDefaultUI: true,
		zoomControl: true,
		scrollwheel: false,
		styles: styles
	}

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'We are here!'
	});
}