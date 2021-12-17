var $swiperSelector = $('.slider-container');

$swiperSelector.each(function(index) {
    var $this = $(this);
    $this.addClass("swiper-slider-" + index);

    var dragSize = $this.data('drag-size') ? $this.data('drag-size') : $(window).width() / 5;

    var swiper = new Swiper(".swiper-slider-" + index, {
      direction: "horizontal",
      freeMode: true,
      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        768: {
           slidesPerView: 3,
		       spaceBetween: 20
        },
        320: {
          slidesPerView: 1.7,
          spaceBetween: 10
       }
      },
      navigation: {
        nextEl: ".slider-button-next",
        prevEl: ".slider-button-prev"
      },
      scrollbar: {
        el: ".slider-scrollbar",
        draggable: true,
        dragSize: 'auto'
     },

     on: {
      init: function() {
        checkArrow();
      },
      resize: function () {
        checkArrow();
      }
    }

  });
});

function checkArrow() {
  let swiperPrev = $('.slider-button-prev');
  let swiperNext = $('.slider-button-next');
  if ( $(window).width() < 768  ) {
    swiperPrev.css('display', 'none');
    swiperNext.css('display', 'none');
  } else {
    swiperPrev.css('display', 'flex');
    swiperNext.css('display', 'flex');
  }
}
