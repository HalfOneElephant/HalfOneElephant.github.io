/**
 * 设置导航选中样式
 */
function cssNavigation() {
    var url = window.document.location.pathname;
    $("a[href$='" + url + "']").parent().addClass("cur");
}

/**
 * 动画效果
 */
if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
    new WOW().init();
}

$(function () {
    // 设置导航选中样式
    cssNavigation();

    // 导航下拉
    $(".dropdown").mouseover(function () {
        $(this).addClass('open');
    }).mouseout(function () {
        $(this).removeClass('open');
    });

    // TOP
    var navH = $(".nav_bg").offset().top;
    $(window).scroll(function () {
        var scroH = $(this).scrollTop();
        if (scroH > navH) {
            $(".nav_bg").addClass("navbar-fixed-top");
        } else {
            $(".nav_bg").removeClass("navbar-fixed-top");
        }

        // 判断toTop是否显示
        if ($(window).scrollTop() > 100) {
            $("#toTop").fadeIn(1500);
        }
        else {
            $("#toTop").fadeOut(1500);
        }
    });

    // 当点击跳转链接后，回到页面顶部位置
    $("#toTop").click(function () {
        $('body,html').animate({scrollTop: 0}, 1000);
        return false;
    });
});