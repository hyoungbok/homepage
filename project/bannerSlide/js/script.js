
$(function () {	
	const controlLinks = $(".controls a");
	const carousel = $(".carousel");
	const slideShow = $("html");
	let j = 1;
	
	slideShow.css({ backgroundColor: "#d23f48" });
	carousel.css({ backgroundColor: "#f4888f" });
	$.each(controlLinks, function (control) {
		$(this).on("click", function () {
			carousel.css({
				transform: `rotate(${(- Number(control) * 90) + 135}deg)`
			});
			

			$(".slide.active").removeClass("active");
			const activeSlide = $(`.slide:nth-child(${control + j})`);
			activeSlide.addClass("active");

			$(".controls a.active").removeClass("active");
			$(this).addClass("active");
		
			console.log(control)

			$(".image_item.active").removeClass("active");
			const activeText = $(`.image_item:nth-child(${control})`);
			$(`.image_item:nth-child(${control + j})`).addClass("active");

			if (control == 0) {
				slideShow.css({ backgroundColor: "#d23f48" });
				carousel.css({ backgroundColor: "#f4888f" });
			} else if (control == 1) {
				slideShow.css({ backgroundColor: "#d96520" });
				carousel.css({ backgroundColor: "#d07c49" });
			} else if (control == 2) {
				slideShow.css({ backgroundColor: "#a47f1d" });
				carousel.css({ backgroundColor: "#c9ba80" });
			} else {
				slideShow.css({ backgroundColor: "#06798c" });
				carousel.css({ backgroundColor: "#75b6c2" });
			}
		});
	});

})