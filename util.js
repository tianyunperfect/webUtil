"use strict";
// 参考：https://zhuanlan.zhihu.com/p/144709419
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 判断类型集合
 * @param str
 * @param type
 */
exports.checkStr = function (str, type) {
    switch (type) {
        case 'phone': //手机号码
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        case 'tel': //座机
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card': //身份证
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            return /^[a-zA-Z]\w{5,17}$/.test(str);
        case 'postal': //邮政编码
            return /[1-9]\d{5}(?!\d)/.test(str);
        case 'QQ': //QQ号
            return /^[1-9][0-9]{4,9}$/.test(str);
        case 'email': //邮箱
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'money': //金额(小数点2位)
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case 'URL': //网址
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
        case 'IP': //IP
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case 'date': //日期时间
            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str);
        case 'number': //数字
            return /^[0-9]$/.test(str);
        case 'english': //英文
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese': //中文
            return /^[\\u4E00-\\u9FA5]+$/.test(str);
        case 'lower': //小写
            return /^[a-z]+$/.test(str);
        case 'upper': //大写
            return /^[A-Z]+$/.test(str);
        case 'HTML': //HTML标记
            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        default:
            return true;
    }
};
/**
 * 获取数据类型
 * String/Number/Boolean/Function/Null/Undefined/Object/Array/Date/RegExp/Error/Symbol/Promise/Set
 * @param o
 */
exports.getType = function (o) {
    return Object.prototype.toString.call(o).slice(8, -1);
};
/**
 * 判断是否是微信
 */
exports.isWeiXin = function () {
    var ua = navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
    if (ua !== null) {
        return ua[0] === "micromessenger";
    }
    return false;
};
/**
 * 判断是否是手机端
 */
exports.isDeviceMobile = function () {
    return /android|webos|iphone|ipod|balckberry/i.test(navigator.userAgent);
};
/**
 * 是否是IOS
 */
exports.isIos = function () {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
        return false;
    }
    else if (u.indexOf('iPhone') > -1) { //苹果手机
        return true;
    }
    else if (u.indexOf('iPad') > -1) { //iPad
        return false;
    }
    else if (u.indexOf('Windows Phone') > -1) { //winphone手机
        return false;
    }
    else {
        return false;
    }
};
/**
 * 是否是电脑端
 */
exports.isPC = function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};
/**
 * 获取url参数
 * @param name
 */
exports.getQueryString = function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var search = window.location.search.split('?')[1] || '';
    var r = search.match(reg) || [];
    return r[2];
};
/**
 * 动态引入js
 * @param src
 */
exports.injectScript = function (src) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = src;
    var t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
};
/**
 * 根据url地址下载
 * @param url
 */
exports.download = function (url) {
    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
    if (isChrome || isSafari) {
        var link = document.createElement('a');
        link.href = url;
        if (link.download !== undefined) {
            var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
            link.download = fileName;
        }
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }
    if (url.indexOf('?') === -1) {
        url += '?download';
    }
    window.open(url, '_self');
    return true;
};
/**
 * 是否包含某个class
 * @param el
 * @param className
 */
exports.hasClass = function (el, className) {
    var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
};
/**
 * 添加某个class
 * @param el
 * @param className
 */
exports.addClass = function (el, className) {
    if (exports.hasClass(el, className)) {
        return;
    }
    var newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
};
/**
 * el去除某个class
 * @param el
 * @param className
 */
exports.removeClass = function (el, className) {
    if (!exports.hasClass(el, className)) {
        return;
    }
    var reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
    el.className = el.className.replace(reg, ' ');
};
/**
 * 滚动到顶部
 */
exports.scrollTop = function () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
};
/**
 * 滚动到底部
 */
exports.scrollToEnd = function () {
    document.body.scrollTop = document.documentElement.scrollTop = document.body.scrollHeight;
};
/**
 * el是否在视口范围内
 * @param el
 * @param partiallyVisible
 */
exports.elementIsVisibleInViewport = function (el, partiallyVisible) {
    if (partiallyVisible === void 0) { partiallyVisible = false; }
    var _a = el.getBoundingClientRect(), top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
    var innerHeight = window.innerHeight, innerWidth = window.innerWidth;
    return partiallyVisible
        ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
            ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
/**
 * 数组排序，{type} 1：从小到大 2：从大到小 3：随机
 * @param arr
 * @param type
 */
exports.sort = function (arr, type) {
    if (type === void 0) { type = 1; }
    return arr.sort(function (a, b) {
        switch (type) {
            case 1:
                return a - b;
            case 2:
                return b - a;
            case 3:
                return Math.random() - 0.5;
            default:
                return arr;
        }
    });
};
/**
 * 劫持粘贴板
 * @param value
 */
exports.copyTextToClipboard = function (value) {
    var textArea = document.createElement("textarea");
    textArea.style.background = 'transparent';
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
    }
    catch (err) {
        console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
};
/**
 * 整数随机数范围  包含min max
 * @param min
 * @param max
 */
exports.random = function (min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 10; }
    return Math.floor(min + Math.random() * ((max + 1) - min));
};
/**
 * 在字符串中插入新字符串
 * @param soure
 * @param index
 * @param newStr
 */
exports.insertStr = function (soure, index, newStr) {
    var str = soure.slice(0, index) + newStr + soure.slice(index);
    return str;
};
