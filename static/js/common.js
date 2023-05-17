/**
 * 常量
 * @type {string}
 */
/**
 * 手机号正则
 * @type {RegExp}
 */
var phoneReg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;

/**
 * 密码正则
 * @type {RegExp}
 */
var pwdReg = /^\w{6,18}$/;

/**
 * 验证码正则
 * @type {RegExp}
 */
var mobileCodeReg = /^\d{6}$/;

/**
 * 固话正则
 */
var telReg = /(^(0\d{2,3})-(\d{7,8})$)|(^(0\d{2,3})-(\d{7,8})-(\d+)$)/;

/**
 * 数字正则
 */
var numReg = /^(\d+)$/;

/**
 * 0-100,包括0 和100的数字
 * @type {RegExp}
 */
var digitReg = /^(\d{1,2}(\.\d{1,2})?|100|100.0|100.00)$/;

/**
 * Ajax通用方法
 */
function sendRequest(type, url, data, dataType, callback) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        cache: false,
        dataType: dataType,
        success: function (res) {
            if (res.code && res.code !== 200) {
                showWarning(res.msg);
            } else {
                if (callback && typeof(callback) === "function") {
                    callback(res);
                }
            }
        },
        error: function (xhr, status, error) {
            if (xhr.status === 401) {
                showWarning("太久没有进行操作，请重新登录！");
            } else {
                showWarning("服务器开小差了，请过一会再试。");
            }
        }
    });
}

/**
 * Ajax通用方法--自行处理callback
 */
function sendRequestCallback(type, url, data, dataType, callback) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        cache: false,
        dataType: dataType,
        success: function (res) {
            if (callback && typeof(callback) === "function") {
                callback(res);
            }
        },
        error: function (xhr, status, error) {
            if (xhr.status === 401) {
                showWarning("太久没有进行操作，请重新登录！");
            } else {
                showWarning("服务器开小差了，请过一会再试。");
            }
        }
    });
}

/**
 * Ajax通用方法--关闭layer弹框
 */
function sendRequestAndClose(type, url, data, dataType, callback) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        cache: false,
        dataType: dataType,
        success: function (res) {
            closeAll();
            if (res.code && res.code !== 200) {
                showWarning(res.msg);
            } else {
                if (callback && typeof(callback) === "function") {
                    callback(res);
                }
            }
        },
        error: function (xhr, status, error) {
            closeAll();
            if (xhr.status === 401) {
                showWarning("太久没有进行操作，请重新登录！");
            } else {
                showWarning("服务器开小差了，请过一会再试。");
            }
        }
    });
}

function closeAll() {
    layer.closeAll();
}

/**
 * 通用POST分页
 */
function globalPage(elem, pageNum, count, pageSize, pageNumId, callback) {
    layui.use('laypage', function () {
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: elem,     // 注意，这里的 elem 是 ID，不用加 # 号
            count: count,   // 数据总数，从服务端得到
            limit: pageSize ? pageSize : 10,
            layout: ['count', 'prev', 'page', 'next'],
            jump: function (obj, first) {
                $("#" + pageNumId).val(obj.curr);
                if (!first) {
                    if (callback && typeof(callback) === "function") {
                        callback();
                    }
                }
            },
            curr: pageNum
        });
    });
}

/**
 * 警告提示
 */
function showWarning(content, time, callback) {
    layer.msg(content, {icon: 7, time: time}, function () {
        if (callback && typeof(callback) === "function") {
            callback();
        }
    });
}

/**
 * 成功提示
 */
function showSuccess(content, time, callback) {
    layer.msg(content, {icon: 1, time: time}, function () {
        if (callback && typeof(callback) === "function") {
            callback();
        }
    });
}

/**
 * 询问框
 */
function confirmMsg(msg, callback) {
    layer.confirm(msg, {btn: ['确认', '取消']}, function (index) {
        layer.close(index);
        if (callback && typeof(callback) === "function") {
            callback();
        }
    });
}

/**
 * 提示框
 */
function msg(msg, callback) {
    layer.msg(msg, {icon: 16, shade: 0.3, time: 2000}, function () {
        if (callback && typeof(callback) === "function") {
            callback();
        }
    });
}

/**
 * 弹框
 */
function alertMsg(msg, callback) {
    layer.alert(msg, function (index) {
        layer.close(index);
        if (callback && typeof(callback) === "function") {
            callback();
        }
    });
}

/**
 * 判断字符是否为空的方法
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
    try {
        if (typeof obj == "undefined" || obj == null || obj == "" || obj.toString().replace(/^\s+$/, "").length === 0) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

/**
 * 序列化数据转JSON
 * @param itemId
 */
function serializeToJson(itemId) {
    var itemArray = $("#" + itemId).serializeArray();
    var data = {};
    $(itemArray).each(function (index, obj) {
        data[obj.name] = (obj.value === 'on') ? '1' : obj.value;
    });
    return data;
}

/**
 * Ajax异常处理
 * @param error
 */
function errorManage(error) {
    var status = error.status;
    if (!isEmpty(status) && status === 401) {
        window.location.href = "/";
    } else {
        showWarning(error.responseText);
    }
}

/**
 * 验证身份证号
 */
function validateIdCard(idCard) {
    //15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }
            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                } else {
                    return false;
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
    return false;
}

/**
 * 《参赛申请书》未审核提示
 */
function showApply(applyStatus) {
    if (applyStatus === null) {
        showWarning('请耐心等待，工作人员正在进行《参赛申请书》的审核工作');
    } else if (applyStatus <= 2) {
        showWarning('请耐心等待，工作人员正在进行《参赛申请书》的审核工作');
    } else if (applyStatus === 3) {
        showWarning('《参赛申请书》不符合规范，请重新提交');
    }
}

/**
 * 团体学生未验证手机
 */
function showMobile() {
    showWarning('请验证手机号隶属本人');
}

/**
 * 已禁止考生提示
 */
function showProhibit() {
    showWarning('您的身份证号异常，请联系组委会');
}

layui.config({
    base: '/static/modules/'
}).extend({
    selectInput: 'selectInput/selectInput'
});

/**
 * 判断参数是否全部为空或者均不为空
 * @returns {boolean}
 */
function isMeetEmpty() {
    // 传的参数转为数组
    var $array = Array.prototype.slice.call(arguments);
    var index = 0;
    $array.forEach(function (item) {
        index += isEmpty(item) ? 0 : 1;
    });
    return (index === 0 || index === $array.length);
}
