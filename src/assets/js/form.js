//////////////
// Login
/////////////

$('#identification input[type=email]').on('blur', function() {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test($(this).val())) {
        $(this).next().addClass('error');
    } else {
        $(this).next().removeClass('error');
    }
});

//////////////////
// Registration
/////////////////

$('#registrationForm input').on('blur', function() {
    if ($(this).val() == '') {
        $(this).parent().next().addClass('error');
        $(this).parent().next().next().removeClass('error');
    } else {
        $(this).parent().next().removeClass('error');
    }
});

$('#registrationForm  input[type=email]').on('blur', function() {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test($(this).val())) {
        $(this).parent().next().addClass('error');
    } else {
        $(this).parent().next().removeClass('error');
    }
});

$('#customerPassword').on('keyup', function() {
    if ($(this).val() !== $('#customerPasswordConfirm').val()) {
        $('#customerPasswordConfirm').parent().next().next().addClass('error');
        $('#customerPasswordConfirm').parent().next().removeClass('error');
    } else {
        $('#customerPasswordConfirm').parent().next().next().removeClass('error');
    }
});

$('#customerPasswordConfirm').on('keyup', function() {
    if ($(this).val() !== $('#customerPassword').val()) {
        $(this).parent().next().next().addClass('error');
        $(this).parent().next().removeClass('error');
    } else {
        $(this).parent().next().next().removeClass('error');
    }
});

$('#registrationForm button[value=confirm]').on('click', function(e) {
    if (!$('#registrationForm').find('.error').length) {
        $(this).submit();
    } else {
        e.preventDefault();
    }
});