$(document).ready(function() {

    /////////////////
    // PERSONAL PAGE
    /////////////////

    $("#datepicker").datepicker();

    // VALIDATE FORM
    $('.personal__profile .p-input input').on('blur', function() {
        if ($(this).val() == '') {
            $(this).parent().attr('data-error', $(this).attr('data-error-message'));
        } else {
            $(this).parent().removeAttr('data-error');
        }
    });

    //////////////////
    // FAVORITES PAGE
    //////////////////

    $('.fav__item a.button-style').on('click', function(e) {
        if ($(this).prev().find('select').val() == null) {
            e.preventDefault();
            $(this).prev().find('.f-error').addClass('error');
        } else {
            $(this).prev().find('.f-error').removeClass('error');
        }
    });

    //////////////////
    // ORDERS PAGE
    //////////////////

    $('.p-order__switcher > a').on('click', function(e) {
        e.preventDefault();
        $(this).siblings().removeAttr('data-active');
        $(this).attr('data-active', true);

        $('.p-orders__list').removeClass('active');
        $(`.p-orders__list[data-active=${$(this).index() + 1}]`).addClass('active');
    });


    //////////////////
    // RETURN PAGE
    //////////////////

    $("#r-date").datepicker();

    $('.p-return__form button').on('click', function(e) {
        e.preventDefault();

        // VALIDATE FORM
        $('.p-return__form input[required]').each(function() {
            if ($(this).val() == '') {
                $(this).parent().attr('data-error', $(this).attr('data-error-message'));
            } else  {
                $(this).parent().removeAttr('data-error');
            }
        });

        if ($('.p-input[data-error]').length == 0) {
            $('#return-form').submit();
        }

    });
});

