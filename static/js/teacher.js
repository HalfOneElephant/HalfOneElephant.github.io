/**
 * 专家组成员展示
 * @param item
 * @returns {string}
 */
var teacherHtml = function (item) {
    return '<div class="item teaevery">' +
        '       <img src="' + item.pic + '" alt="">' +
        '       <div class="txtwrap">' +
        '           <h3>' + item.name + '</h3>' +
        '           <span></span>' +
        '           <p class="txt1">' + item.level + '</p>' +
        '           <p class="txt2">' + item.content + '</p>' +
        '           <a href="/kpfront/teacherNewsList?expert=' + item.expert + '" class="teaColumn"><img src="http://pic.unisedu.com/kpkh/column/column-icon.png" alt="">名家专栏</a>' +
        '       </div>' +
        '   </div>';
};

/**
 * 首页专家组成员
 */
function homeExperts() {
    sendRequest('get', 'http://pic.unisedu.com/kpkh/teacher/teacher-new.json', {}, 'json', function (res) {
        // 首页专家组成员
        var html = '', html2 = '', html3 = '', html4 = '';
        for (var n = 0; n < 5; n++) {
            html += teacherHtml(res.kexuejia[n]);
            html2 += teacherHtml(res.kehuan[n]);
            html3 += teacherHtml(res.kepu[n]);
            html4 += teacherHtml(res.congyezhe[n]);
        }
        $("#first").prepend(html);
        $("#second").prepend(html2);
        $("#third").prepend(html3);
        $("#fourth").prepend(html4);
    });
}

/**
 * 专家组成员列表页面
 */
function teacherList() {
    sendRequest('get', 'http://pic.unisedu.com/kpkh/teacher/teacher-new.json', {}, 'json', function (res) {
        // 专家组列表
        $.each(res.kexuejia, function (i, item) {
            $("#home .tealist").append(teacherHtml(item));
        });
        $.each(res.kehuan, function (i, item) {
            $("#profile .tealist").append(teacherHtml(item));
        });
        $.each(res.kepu, function (i, item) {
            $("#messages .tealist").append(teacherHtml(item));
        });
        $.each(res.congyezhe, function (i, item) {
            $("#settings .tealist").append(teacherHtml(item));
        });
    });
}

/**
 * 专家个人介绍
 */
function expertDetails() {
    var $expertShortName = $("#expertShortName");
    var expert = isEmpty($expertShortName.val()) ? 'linqun' : $expertShortName.val();
    sendRequest('get', 'http://pic.unisedu.com/kpkh/teacher/teacher-new.json', {}, 'json', function (res) {
        for (var key in res) {
            $.each(res[key], function (i, item) {
                if (expert === item.expert) {
                    $("#expertDetails").show();
                    $("#expertPic").prop('src', 'http://pic.unisedu.com/kpkh/column/' + expert + '.png');
                    $(".expertName").text(item.name);
                    $("#expertLevel").text(item.level);
                    $("#expertContent").text(item.content);
                }
            });
        }
    });
}

/**
 * 名家专栏--新闻列表
 */
function teacherNewsList() {
    sendRequest('post', '/kpfront/teacherNewsList', serializeToJson('expertNewsForm'), 'json', function (data) {
        // 列表数据
        var template = $("#template").render(data);
        $("#expertNewsList").html(template);

        // 分页
        globalPage('page', data.pageNum, data.count, 5, 'expertPageNum', function () {
            teacherNewsList();
        });
    });
}