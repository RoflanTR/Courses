$(document).ready(function () {
	$('.slider').slick({
		dots: true,
		infinite: true,
		slidesToShow: 4,
		// autoplay:true,
		speed: 700,
		arrow: false,
		slidesToScroll: 3,
		responsive: [
		  {
			breakpoint: 1824,
			settings: {
			  slidesToShow: 3,
			  slidesToScroll: 1,
			  infinite: true,
			  dots: true
			}
		  },
		  {
			breakpoint: 900,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 2
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  }

		]
	  });

})
