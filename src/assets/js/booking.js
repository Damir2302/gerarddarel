$(document).ready(function() {
    // BOOKING OPEN
    $('.bookNow__btn').on('click', function() {
        $('.booking-container, .booking-bg-layer').fadeIn(500);
        $('.booking-container').css('display', 'flex');
        $('body').addClass('booking-popup');
    });

    // BOOKING CLOSE
    $('.booking-title > .close-icon').on('click', function() {
        $('.booking-container, .booking-bg-layer').fadeOut(500);
        $('body').removeClass('booking-popup');
    });

    // NAVIGATION
    function stepNext(that) {
        that.closest('.steps')
            .addClass('hide')
            .next()
            .removeClass('hide');

        $('.nav-current').removeClass('nav-current')
                         .addClass('nav-visited')
                         .next()
                         .addClass('nav-current');

        $('.navigation-menu .nav-visited').on('click', function() {
            $('.steps').addClass('hide');
            $(`.step-${$(this).attr('data-step')}`).removeClass('hide');
            $('.nav-visited').removeClass('nav-visited');
            $('.nav-current').removeClass('nav-current');
            $(this).prev().addClass('nav-visited');
            $(this).prev().prev().addClass('nav-visited');
            $(this).addClass('nav-current');
        });

        $('.nav-mobile span:first-child').html(`${$('.nav-current').attr('data-step')}/4`)
        $('.nav-mobile span:last-child').html(`${$('.nav-current > a').html()}`)
    }

    function goToStep(num) {
        $('.steps').addClass('hide');
        $('.nav-visited').removeClass('nav-visited');
        $('.nav-current').removeClass('nav-current');

        $(`.step-${num}`).removeClass('hide');
        $(`[data-step="${num}"]`).prev().addClass('nav-visited');
        $(`[data-step="${num}"]`).addClass('nav-current');
    }

    // SELECT CITY
    $('#selectCityBtn').on('click', function(e) {
        e.preventDefault();
        $('.location-search').addClass('hide');
        $('.product-block').removeClass('hide');
    })

    // CHANGE CITY
    $('#changeCityBtn').on('click', function(e) {
        e.preventDefault();
        $('.location-search').removeClass('hide');
        $('.product-block').addClass('hide');
    })

    // STEP-1
    $('.product-column-right button').on('click', function() {
        if ($('.select-block-size select').val() == null) {
            $('.select-block-size').next().fadeIn(100);
            $('.select-block-size').next().css('display', 'inline-block');
        } else {
            $('.select-block-size').next().fadeOut(100);
        }
    });

    $('.product-column-right button').on('click', function() {
        if ($('.select-block-color select').val() == null) {
            $('.select-block-color').next().fadeIn(100);
            $('.select-block-color').next().css('display', 'inline-block');
        } else {
            $('.select-block-color').next().fadeOut(100);
        }
    });

    $('.product-column-right button').on('click', function() {
        if ($('.select-block-size select').val() !== null &&
        $('.select-block-color select').val() !== null) {
            stepNext($(this));
        }
    });

    // STEP-2
    $('.button-toggle').on('click', function() {
        $(this).find('.close-map').toggleClass('hide');
        $(this).find('.open-map').toggleClass('hide');
        $('.product-store-list').toggleClass('hide');
        $('#store-map').toggleClass('hide');
    });

    $('.other-info').on('click', function() {
        stepNext($(this));
    });

    // STEP-3
    $('.user-store > a').on('click', function() {
        goToStep(2);
    });

    $('.user-products > a').on('click', function() {
        goToStep(1);
    });

    $('.step-3 .step-actions button').on('click', function() {
        let input;
        input = $('.col-row input[required]');
        // VALIDATION IF EMPTY
        let empty;
        empty = input.filter(function() {
            return $(this).val() == "";
        });
        empty.each(function(e) {
            $(this).next().fadeIn(100);
            $(this).next().css('display', 'inline-block');
        });
        // VALIDATION IF NOT EMPTY
        let notEmpty;
        notEmpty = input.filter(function() {
            return $(this).val() !== "";
        });
        notEmpty.each(function(e) {
            $(this).next().fadeOut(100);
        });

        if (!$('#userLegal').is(':checked')) {
            $('#userLegal').next().next().fadeIn(100);
            $('#userLegal').next().next().css('display', 'inline-block');
        } else {
            $('#userLegal').next().next().fadeOut(100);
        }

        // EMAIL VALIDATION
        let checkEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (checkEmail.test($('.col-row input[type="email"]').val()) == false) {
            $('.col-row input[type="email"]').next().fadeIn(100);
            $('.col-row input[type="email"]').next().css('display', 'inline-block');
        } else {
            $('.col-row input[type="email"]').next().fadeOut(100);
        }

        if (!empty.length && $('#userLegal').is(':checked') && $('.col-row input[type="email"]').val().length) {
            stepNext($(this));
        }

    });

    // PHONE MASK
    $('#b-phone').inputmask({"mask": "+7 (999) 99-99-99"});

    // OPEN TERMS
    $('#open-terms').on('click', function(){
        $('.terms-data').removeClass('hide');
        $('.user-content').addClass('hide');
    });

    // CLOSE TERMS
    $('.terms-data .close-icon').on('click', function(){
        $('.terms-data').addClass('hide');
        $('.user-content').removeClass('hide');
    });

    // STEP-4
    $('.step-4 .step-actions button').on('click', function() {
        /////CLOSE POPUP/////
        $('.booking-container, .booking-bg-layer').fadeOut(500);
        $('body').removeClass('booking-popup');
    });

})

// ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("store-map", {
            center: [55.748890, 37.715026],
            zoom: 10,
            controls: ['smallMapDefaultSet']
        }, {
            searchControlProvider: 'yandex#search'
        }),
        myPlacemark = new ymaps.Placemark([55.771232, 37.620230], {
            // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
            balloonContentBody: `<div class="b-balloon-shop">
            <p class="b-balloon-shop__title">ЦВЕТНОЙ</p>
            <div class="b-balloon-shop__content">
              <p>Цветной бул., 15, стр. 1</p>
              <p>+7 (495) 737-77-73</p>
              <p>Пн — Сб: 10:00 — 22:00, Вс: 11:00 — 22:00</p>
        <br><p><a class="button-style" href="javascript:void(0)">Выбрать магазин</a></p></div>
          </div>`
        });

    myMap.geoObjects.add(myPlacemark);
}



