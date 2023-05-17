$(function () {

    /*首页专家组成员*/
    homeExperts();

    $('#myDemo a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    /*精彩回顾*/
    $.ajax({
        type: 'get',
        url: '/static/data/review.json?t=1',
        dataType: "json",
        success: function (data) {
            var $myTabContent = $("#myTabContent .row");
            $.each(data.title, function (i, item) {
                var str1 = '<li>' +
                    '<a href="javascript:;" class="tab_num">' + item.number + '</a>' +
                    '</li>';
                $("#myTab").append(str1);
            });

            $("#myTab").children(":first").addClass("active");
            for (var n = 0; n < 8; n++) {
                var str2 = '<div class="col-md-3">' +
                    '<div class="review-list review-kenburn">' +
                    '<div class="review-img">' +
                    '<div class="overflow-hidden"><img style="height: 167px;width: 100%" src="' + data.content[n].pic + '"></div>' +
                    '</div>' +
                    '<h3>' + data.content[n].desc + '</h3>' +
                    '</div>' +
                    '</div>';
                $myTabContent.append(str2);
            }
            $(document).on('click', "#myTab li", function (e) {
                $(this).addClass("active").siblings().removeClass("active");
                var m = 8 * ($(this).index());
                $myTabContent.html(" ");
                for (var n = m; n < (m + 8); n++) {
                    var str2 = '<div class="col-md-3">' +
                        '<div class="review-list review-kenburn">' +
                        '<div class="review-img">' +
                        '<div class="overflow-hidden"><img src="' + data.content[n].pic + '"></div>' +
                        '</div>' +
                        '<h3>' + data.content[n].desc + '</h3>' +
                        '</div>' +
                        '</div>';
                    $myTabContent.append(str2);
                }
            })
        }
    });

    var message = $("#message").val();
    if (message) {
        layer.alert(message);
    }

    // 手机飘窗显示
    $("#point_s").click(function () {
        $(".point").show();
    });

    // 轮播图
    $('#myCarousel').on('slide.bs.carousel', function (obj) {
        // 当前轮播索引
        var $item = $(this).find('.item');
        var index = $item.index(obj.relatedTarget);
        var $img = $($item[index]).find('img');
        if (isEmpty($img[0].src)) {
            $img.prop('src', $img.data('cache-src'));
        }
    });

    // 悬浮菜单
    $(".quick-menu li").mouseover(function(){
        $(this).children(".quick-bg").css("display","block")
    }).mouseout(function(){
        $(".quick-menu li").children(".quick-bg").css("display","none");
    })



});

function signUpDisable() {
    layer.alert('抱歉，报名时间已截止！');
}

/**
 * 辅导老师登录
 */
function tutorLogin() {
    layer.alert('抱歉，该功能暂未开放，请耐心等待！');
}
