
$(function () {
	$(window).on('scroll', function () {
		let scr = $(window).scrollTop();
		let header = $('#header');
		if (scr >= 50) {
			header.addClass('scroll_header')
		} else {
			header.removeClass('scroll_header')
		}
	})
})

$(function () {
	$('input[name=them]:checkbox').on('click', function () {
		const checked = $('input[name=them]:checkbox').is(':checked')
		if (checked) {
			$('body').addClass('dark_theme')
			$('#theme_button').attr('class','bx bx-sun theme_button')
		} else {
			$('body').removeClass('dark_theme')
			$('#theme_button').attr('class','bx bx-moon theme_button')
		}	
	})
})





/* SCROLL SECTION ACTIVE */
$(function(){
	let menu = $(".nav_menu > .nav_list > .nav_item");
  let content = $("#main > div");
  menu.click(function(e){
		e.preventDefault();
		let tg = $(this);
		let i = tg.index();

		let section = content.eq(i);
		let tt = section.offset().top;
		$("html,body").stop().animate({scrollTop:tt},100);
  });
  $(window).scroll(function(){
		let sct = $(window).scrollTop();		
		content.each(function(){
			let tg = $(this);
			let i = tg.index();
			if(tg.offset().top <= sct+50){
				menu.find(">a").removeClass("active_link");
				menu.find(">a").eq(i).addClass("active_link");
			}
		});
  })
});

// $(function () {
// 	$(window).on('scroll', function () {
// 		const sections = document.querySelectorAll('.section[id]')
// 		$(function () {
// 			const scrollY = $(window).scrollTop();	
			
// 			sections.forEach(current => {
// 				const sectionHeight = current.offsetHeight;
// 				const sectionTop = current.offsetTop - 58;
// 				const sectionId = current.getAttribute('id');
			
// 				if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {			
// 					$('.nav_menu a[href*=' + sectionId + ']').addClass('active_link');
// 				} else {			
// 					$('.nav_menu a[href*=' + sectionId + ']').removeClass('active_link');
// 				}
// 			})
			
// 		})		 
// 	 })
// })


// about modal
$(function () {
	const modalViews = $('.about_modal');
	const modalBtns = $('.about_button');
	const modalClose = $('.about_modal_close');
	const dimmed = $('.dimmed');

	modalBtns.on('click', function () {
		$(this).siblings(modalViews).addClass('active_modal')
		$('body').addClass('scroll_hidden')
	})
	modalClose.on('click', function () {
		modalViews.removeClass('active_modal')
		$('body').removeClass("scroll_hidden")
	})
	dimmed.on('click', function () {
		modalViews.removeClass('active_modal')
		$('body').removeClass("scroll_hidden")
	})
})


// skill graph

$(function(){	
  let win = $(window);
  let chartBool = true;

  win.on('scroll',$.throttle(1000/15,function(){
    let ts = $(this)
    let sct = ts.scrollTop();
    let s_content = $(".graph_content");
    let charts = s_content.find(".graph_data");
    
		var skillOffsetTop=charts.offset().top;

    if(sct >= skillOffsetTop-800){
      if(chartBool){
        charts.each(function(i){
          let chart = $(this);
          let chartBar = chart.find(".graph_color").css({width:'0%'});
          let percentNumber = chart.find(".skill_p .num");
          let percentData = percentNumber.text();
          percentNumber.text(0);
          $({percent:0}).delay(150*i).animate({percent:percentData},{
            duration: 1000,
            progress: function(){
              let now = this.percent;
              chartBar.css({width:now+'%'});
              percentNumber.text(Math.floor(now));
            }
          })
        })
      }
      chartBool = false;
    
    } else {
      chartBool = true;
    }
  }))
});



/* ==================== MIXITUP FILTER ==================== */
$(function () {
	let mixerPortfolio = mixitup('.work_container', {
		selectors: {
			target: '.work_card'
		},
		animation: {
			duration: 300
		}
	});

	const workItem = $('.work_item');
  let work = true;
	workItem.on('click', function () {
		if (work) {
			$('.work_item').removeClass('active_work')
			$(this).addClass('active_work')
		} 
	})
})


/*=============== SHOW SCROLL UP ===============*/
$(function () {
	$(window).on('scroll', function () {
		const scrollUp = $('#scroll_up')
		if (this.scrollY >= 460) {
			scrollUp.addClass('show_scroll');
		} else {
			scrollUp.removeClass('show_scroll');
		}	
	})
	$('.scroll_up').on('click', function () {
		$('html').scrollTop(0);
	})
})