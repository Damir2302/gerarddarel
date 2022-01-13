$(document).ready(function() {
    // PASSWORD POPUP OPEN
    $('[href="#password-forgot"]').on('click', function(e) {
        e.preventDefault();
        $('.password-container, .password-bg-layer').fadeIn(500);
        $('.password-container').css('display', 'flex');
        $('body').removeAttr('class');
        $('body').addClass('password-popup');
    });

    // PASSWORD POPUP CLOSE
    $('.password-popup-area > .close-icon, .password-popup-success button').on('click', function() {
        $('.password-container, .password-bg-layer').fadeOut(500);
        $('body').removeClass('password-popup');
    });
})