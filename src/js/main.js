$(document).ready(function () {

	// SVG for old browsers
	svg4everybody();

	// hero shapes animations appearing (now 500ms after page load)
	setTimeout(function () {
		$('.b-shape').removeClass('b-shape_hidden');
	}, 500);

	// mobile navigation open/close
	$(document).on('click', '.b-navbar__btn', navToggle);

	function navToggle(e) {
		e.preventDefault();

		var $body = $('body');

		if ($body.hasClass('b-navbar-opened')) {
			$body.removeClass('b-navbar-opened');
		} else {
			$body.addClass('b-navbar-opened');
		}
	}

	// header anchor navigation (scroll to section with id)
	var app = app || {};
	app.state = false;

	$(document).on('click', '.js-anchor-nav .nav-link[href^="#"]', anchorNav);
	$(window).on('scroll resize', anchorNavScroll);

	function anchorNav(e) {
		app.state = true;

		e.preventDefault();

		var headerHeight = $('.b-navbar').outerHeight();
		var $anchorLink = $(this);
		var $anchorContainer = $anchorLink.closest('.js-anchor-nav');
		var $anchorItem = $anchorLink.closest('.nav-item');
		var dest = $anchorLink.attr('href');

		$anchorContainer.find('.nav-item').removeClass('active');

		if ( $('body').width() > '991') {
			$anchorItem.addClass('active');
		}
		else {
			$('body').removeClass('b-navbar-opened');
		}

		if (dest !== undefined && dest !== '' && $(dest).length) {
			var destPosition = $(dest).offset().top;

			$('html, body').animate({
				scrollTop: destPosition - headerHeight
			}, 900);
		}

		setTimeout(function () {
			app.state = false;
		}, 900);
	}
	function anchorNavScroll() {
		if ( $('body').width() > '991') {
			if (app.state) return;

			var headerHeight = $('.b-navbar').outerHeight();
			var $section = $('body').find('[id]');
			$('.js-anchor-nav .nav-item').removeClass('active');

			$($section).each(function(){
				var scrolled = $(window).scrollTop() + headerHeight + 1;
				var sectionHeight = $(this).outerHeight();
				var sectionId = $(this).attr('id');
				var sectionHref = $('.js-anchor-nav .nav-link[href="#' + sectionId + '"]');
				var sectionTop = $(this).offset().top;
				var sectionBottom = $(this).offset().top + sectionHeight;

				if ( (scrolled > sectionTop) && (scrolled < sectionBottom) ) {
					sectionHref.closest('.nav-item')
							.addClass('active')
							.siblings('nav-item').removeClass('active');
				}
			})
		}
		else {
			$('.js-anchor-nav .nav-item').removeClass('active');
		}
	}

	// Show border-bottom in header when reaching bottom edge of "hero" section
	function highlightHeader() {
		var $body = $('body');
		var hero = $('.b-hero');
		var header = $('.b-navbar');

		if (hero.length && header.length) {
			var heroPosition = hero.offset().top;
			var heroHeight = hero.outerHeight();
			var top = $(this).scrollTop();
			var headerHeight = header.outerHeight();
			var heroBottom = heroPosition + heroHeight - headerHeight;

			if (top > heroBottom) {
				$body.addClass('b-header-highlight');
			} else {
				$body.removeClass('b-header-highlight');
			}
		}
	}

	highlightHeader();
	$(window).on('scroll', highlightHeader);

	// anchors
	$(document).on('click', '.js-anchor', anchorScroll);

	function anchorScroll(e) {
		e.preventDefault();

		var headerHeight = $('.b-navbar').outerHeight();

		$("html, body").animate({
			scrollTop: $($.attr(this, 'href')).offset().top - headerHeight
		}, 800);
	}

	var slider = $('.b-carousel');

	// carousel height setup
	function carouselHeight() {
		var innner = slider.find('.carousel-inner');
		var item = slider.find('.carousel-item');

		var maxHeight = 0;

		item.each(function () {
			if ( $(this).outerHeight() > maxHeight ) {
				maxHeight = $(this).outerHeight();
			}
		});

		innner.height(maxHeight);
	}

	carouselHeight();

	$(window).resize(function () {
		carouselHeight();
	});

	// enable swipe on touch devices for carousel
	slider.on("touchstart", function(event){
		var xClick = event.originalEvent.touches[0].pageX;
		$(this).one("touchmove", function(event){
			var xMove = event.originalEvent.touches[0].pageX;
			if( Math.floor(xClick - xMove) > 5 ){
				$(this).carousel('next');
			}
			else if( Math.floor(xClick - xMove) < -5 ){
				$(this).carousel('prev');
			}
		});
		$(this).on("touchend", function(){
			$(this).off("touchmove");
		});
	});

	// modal close by closing mobile navigation
	$('.modal').on('show.bs.modal', function (e) {
		$('body').removeClass('b-navbar-opened');
	});
});