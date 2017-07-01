$(document).ready(function() {
	/* $(".auth_button").click(function(){
		$(this).next().slideToggle();
	}); */

	$(".main_menu_bt").click(function(){
		$(".main_menu ul").slideToggle();
	});

	$(".auth_button").click(function(){
		$(".top_login").slideToggle();
	});

	$(".add_ad").click(function(){
		$(".footer_left_block ul").slideToggle();
	});

	$(".reclama").click(function(){
		$(".rec_content").slideToggle();
	});

	$(".contacts").click(function(){
		$(".contacts_content").slideToggle();
	});

	$(".menu_button").click(function(){
		$(".top_main_menu").slideToggle();
	});

	new WOW({offset:100}).init();

	$(function(){
		$('#accordion').on('show.bs.collapse', function(){
			console.log($(this));
			// $(this).next().find('.fa').removeClass().addClass('fa fa-chevron-circle-up');
		});
	});

	//Активация tooltip (Подсказок при наведении на кнопку)
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	});

	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	$(".block").waypoint(function(direction) {
		if (direction === "down") {
			$(".class").addClass("active");
		} else if (direction === "up") {
			$(".class").removeClass("deactive");
		};
	}, {offset: 100});

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$("a.scroll").click(function() {
		$.scrollTo($(".div"), 800, {
			offset: -90
		});
	});

	//Каруселька
	//Документация: https://owlcarousel2.github.io/OwlCarousel2/
	var owl = $('.owl-carousel');
	owl.owlCarousel({
		loop:true,
		margin:10,
		// nav:true,
		// autoHeight:true,
		autoplay:true,
		autoplayTimeout:2000,
		autoplayHoverPause:true,
		dots:false,
		responsive:{
			0:{
				items:1
			},
			480 : {
				items:2
			},
			768:{
				items:3
			},
			1024:{
				items:4
			},
			1200:{
				items:5
			}
		}
	});

	$('.play').on('click',function(){
		owl.trigger('play.owl.autoplay',[1000])
	});
	$('.stop').on('click',function(){
		owl.trigger('stop.owl.autoplay')
	});

	owl.on('mousewheel', '.owl-stage', function (e) {
		if (e.deltaY>0) {
			owl.trigger('next.owl');
		} else {
			owl.trigger('prev.owl');
		}
		e.preventDefault();
	});

	// Переход с следующему элементу слайдера
	$('.owl-next').click(function() {
		owl.trigger('next.owl.carousel');
	});
	// Переход к предыдущему элементу слайдера
	$('.owl-prev').click(function() {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    owl.trigger('prev.owl.carousel', [300]);
  });

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});

});
