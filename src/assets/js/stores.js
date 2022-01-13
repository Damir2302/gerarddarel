$(document).ready(function(){

    $('.s-label').on('click', function() {
        $('.s-label').removeAttr('data-active');
        $(this).attr('data-active', true);

        $('.s-list').removeAttr('data-active');
        $(`.s-list[data-tab="${$(this).attr('data-tab')}"]`).attr('data-active', true)
    });

});