$(document).ready(function() {

    // HIDE TOP HEADER
    $(window).on('scroll', function(){
        if ($(window).scrollTop() > 82) {
            $('body').addClass('hide-top-header');
        } else {
            $('body').removeClass('hide-top-header');
        }
    });

    // FIX HEADER (MOBILE + TABLET)
    $(window).on('scroll', function(){
        if ($(window).width() < 1024 && $(window).scrollTop() > 82) {
            $('body.item-page').addClass('hide-header');
        } else {
            $('body.item-page').removeClass('hide-header');
        }
    });

    // OPEN MOBILE MENU
    $('.header__menu-btn').on('click', function(e) {
        e.preventDefault();
        if ($('body').hasClass('show-login') || $('body').hasClass('show-cart')) {
            $('body').removeClass('show-login');
            $('body').removeClass('show-cart');
            $('body').addClass('open-menu');
        } else {
            $('body').toggleClass('open-menu menu-layer');
        }
    });

    // OPEN SUBMENU
    $(window).on('resize', function() {
        if ($(window).width() < 1260) {
            $("#navbar .item__menu.has-submenu > a").on("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).closest("li").toggleClass("active-link");
                $(this).closest("ul").toggleClass("submenu-show");
            });
        } else {
            $("#navbar .item__menu.has-submenu > a").off("click");
        }
    });

    if ($(window).width() < 1260) {
            $("#navbar .item__menu.has-submenu > a").on("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).closest("li").toggleClass("active-link");
                $(this).closest("ul").toggleClass("submenu-show");
            });
        }

    // CLOSE MOBILE MENU WHEN RESIZING WINDOW
    $(window).on('resize', function() {
        if ($(this).width() >= 1260) {
            $('.open-menu').removeClass('open-menu menu-layer');
            $('.active-link').removeClass('active-link');
            $('.submenu-show').removeClass('submenu-show');
        }
    });

    // SHOW LOGIN ONCLICK
    $('.header__login > a').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('body').removeAttr('class');
        $('body').addClass('show-login menu-layer');
    });

    $('.close__content').on('click', function() {
        $('body').removeClass('show-login menu-layer');
    });

    // SHOW CART ONCLICK
    $('.header__cart > a').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!$('body').hasClass('item-page')) {
            $('body').removeAttr('class');
        }
        $('body').addClass('show-cart menu-layer');
    });

    $('.close__content').on('click', function() {
        $('body').removeClass('show-cart menu-layer');
    });


    // DELETE MASK LAYER ONLICK
    $('.right__layer').on('click', function() {
        $('body').removeClass('show-login show-wishlist show-cart menu-layer open-menu')
    });

    // SLICK SLIDERS
    $('.header__top a').slick({
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        arrows: false,
        pauseOnFocus : false,
        swipe: false,
        fade: true,
        easing: 'linear'
    });

    $('.hero__slider').slick({
        slidesToShow: 1,
        dots : true,
        arrows: false,
        autoplay : true,
        autoplaySpeed : 4000,
        pauseOnDotsHover : true,
        pauseOnFocus : false,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    dots: false,
                    arrows: true
                }
            }
        ]
    });

    $('.instagram-feed__list').slick({
        slidesToShow: 1,
        autoplay: false,
        infinite: true,
        arrows: false,
        centerMode: true,
        mobileFirst: true,
        responsive: [
            {
            breakpoint: 475,
            settings: {
                slidesToShow: 2,
                centerMode: false
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1023,
            settings: {
                slidesToShow: 3,
                autoplay: true,
                autoplaySpeed: 0,
                speed: 2000,
                cssEase:'linear',
                focusOnSelect: false
            }
        }
    ]
    });

    // SORTING COL.
    if (localStorage.getItem('sorting-column') == 'two-columns') {
        $('.sorting__col-4').removeClass('active');
        $('.sorting__col-2').addClass('active');
        $('.catalog__container').addClass('two-columns');
    }

    $('[class*="sorting__col-"]').on('click', function() {
        if ($(this).hasClass('sorting__col-2')) {
            $('.catalog__container').addClass('two-columns');
            // add to local storage
            localStorage.setItem('sorting-column', 'two-columns');
        } else {
            $('.catalog__container').removeClass('two-columns');
            localStorage.removeItem('sorting-column');
        }

        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

    // FILTER COLOR
    $('.filter__btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(this).parent().hasClass('collapsed')) {
            $(this).parent().removeClass('collapsed');
        } else {
            $('.collapsed').removeClass('collapsed');
            $(this).parent().addClass('collapsed');
        }
    });

    $('html').click(function(e) {
        if (!$(e.target).closest('.collapsed').length) {
            $('.collapsed').removeClass('collapsed');
          }
    });

    // MOBILE FILTER
    $('.filter__button--mobile').on('click', function() {
        $('body').addClass('filter-mobile');
        $('.filters-container').addClass('active');
    });

    $('.filter-close, .filter-footer button').on('click', function(){
        $('body').removeClass('filter-mobile');
        $('.filters-container, .filters-mob-container').removeClass('active');
    });


    $('.filter-cat').on('click', function() {
        $(`.filters-mob-container.${$(this).data('path')}`).addClass('active');
    });

    $('.inner-header').on('click', function() {
        $(this).parent().parent().parent().removeClass('active');
    });

    // SELECT PRODUCTS ATTRIBUTES
    $('.item__size-list li').on('click', function(e) {
        e.preventDefault();
        if (!$(this).hasClass('not-available')) {
            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');
            $('.addToCart__btn, .add-to-cart').attr('disabled', false);
            $('.addToCart__btn + span, .add-to-cart + span').css('display', 'none');
        }
    });

    $('.swatch__color, .item__color-list li').on('click', function(e) {
        e.preventDefault();
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
    });

    // ADD TO CART (CATALOG PAGE)
    $('.add-to-cart').on('click', function(e) {
        if (!$(this).parent().prev().find('.swatch__size').hasClass('selected')) {
            $(this).prev().addClass('error');

            setTimeout(() => {
                $(this).prev().removeClass('error');
            }, 2000);

        } else {
            $(this).html('Добавлено!');

            setTimeout(() => {
                $(this).html('Добавить в корзину');
                $(this).parent().prev().find('.swatch__size').removeClass('selected')
            }, 2000);
        }
    });

    // OPEN DESCRIPTION ACCORDION
    $('.item__accordion h3').on('click', function() {
        $(this).parent().toggleClass('opened');
    });

    // MOBILE ITEM SLIDER
    var $slickOn;

    function activeSlick() {
        if ($(window).width() < 1024) {
            if (!$slickOn) {
                $('#item .item__slider').slick({
                    slidesToShow: 1,
                    dots : true,
                    arrows: false,
                    mobileFirst: true,
                    responsive: [
                        {
                        breakpoint: 670,
                        settings: {
                            slidesToShow: 2,
                            adaptiveHeight: true
                        }
                        }
                ]
                });
                $slickOn = true;
            }
        } else if ($(window).width() > 1024) {
            if ($slickOn) {
                $('#item .item__slider').slick('unslick');
                $slickOn = false;
            }
        }
    }

    activeSlick();

    $(window).on('resize', function() {
        activeSlick();
    });

    // SCROLL TO TOP BUTTON
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            $('#scrollTop').addClass('show');
        } else {
            $('#scrollTop').removeClass('show');
        }
        });

    $('#scrollTop').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
    });

    // VALIDATE FORM
    $('.c-input input').on('blur', function() {
        if ($(this).val() == '') {
            $(this).parent().attr('data-error', $(this).attr('data-error-message'));
        } else {
            $(this).parent().removeAttr('data-error');
        }
    });

    // PHONE MASK
    $('#input-phone').inputmask({"mask": "+7 (999) 99-99-99"});

    // DELIVERY SELECT
    $('.delivery-date-select').on('click', function() {
        $(this).siblings().removeClass('active');
        $(this).toggleClass('active');
    });

    $('.date-select-item').on('click', function(e) {
        $(this).parent().parent().find('span').html($(this).html())
    });

    $('html').click(function(e) {
        if (!$(e.target).closest('.delivery-date-select').length) {
            $('.delivery-date-select').removeClass('active');
          }
    });
});