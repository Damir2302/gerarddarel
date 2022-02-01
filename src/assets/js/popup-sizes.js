$(document).on("click", function (t) {
    var a = $(t.target);
    if (a.hasClass("js-link-popup")) {
        t.preventDefault();
        var o = $(a.attr("href"));
        $.magnificPopup.open({
            items: {
                src: a.attr("href"),
                type: "inline"
            },
            showCloseBtn: !!o.attr("data-autoplay"),
            fixedContentPos: !0,
            focus: $(a.attr("data-focus")),
            callbacks: {
                open: function () {
                    $("body").addClass("mod-fixed"), o.attr("data-autoplay") && o.find(o.attr("data-autoplay")).get(0).play()
                },
                close: function () {
                    $("body").removeClass("mod-fixed"), o.attr("data-autoplay") && o.find(o.attr("data-autoplay")).get(0).pause()
                }
            }
        })
    }

    $('.table-button').on('click', function () {
        $('div.table-button').removeClass('selected');
        $(this).addClass('selected');
        let dataClass = '.' + $(this).data('type');
        $('.table-content').removeClass('selected');
        $(dataClass).addClass('selected');
    });

});