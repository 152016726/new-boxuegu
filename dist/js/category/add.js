(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
//ajaxForm方法会判断你传入的数据类型，如果是对象认为是配置，函数认为是成功回调
$.get('/v6/category/top',function (data) {
    var html=template('category-add',data.result);
    $('.form-control').append(html);
});
$(".form-horizontal").ajaxForm(function (data) {
    if(data.code==200){
        alert(data.msg);
        $.get('/v6/category/top',function (data) {
            var html=template('category-add',data.result);
            $('.form-control').append(html);
        });
    }
})
},{"../common/aside.js":2,"../common/common.js":3,"../common/header.js":4,"../common/loading.js":5}],2:[function(require,module,exports){
//-var path=location.pathname;
// -$(“.nav a”).removeclass(“active”);
// -$(“nav a[href=”’+path+’”]”).addclass(“active”).parent().show();
NProgress.start();
window.onload=function () {
    NProgress.done();
};
// 头像信息展示
var user=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).tc_avatar:'';
var tc_names=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).tc_name:'';
$('#avatar').attr('src',user);
$('#monitar').text(tc_names);

// 下拉列表
$('.navs a').on('click', function () {
    $(this).next('ul').slideToggle();
});
var path=location.pathname;
$(".navs a").removeClass("active");
$('.navs a[href="'+path+'"]').addClass("active").parents("ul").show();
// 页面跳转



//用户信息的展示通过首页测试就可以，导航下拉列表显示隐藏通过首页测试可以，焦点位置
//除了首页测试，还得通过另外一个子元素
},{}],3:[function(require,module,exports){
var isLogin=!!$.cookie('PHPSESSID');//用于是否登录
var isLoginPage=location.pathname=='/dist/html/user/login.html';
if(isLogin&&isLoginPage){
    location.href='/dist';
}else if(!isLoginPage&&!isLogin){
    location.href='/dist/html/user/login.html';
}

},{}],4:[function(require,module,exports){
// 返回登录页
$("#btn-logout").on("click",function () {
    $.ajax({
        type:'post',
        url:'/v6/logout',
        success:function (result) {
            console.log(result);
            if(result.code=='200'){
                alert(result.msg);
                location.href='/dist/html/user/login.html';
            }
        }
    })
});
},{}],5:[function(require,module,exports){
var loadingImage='<div class="overlay">'+'<img src="/uploads/loading.gif"/>'+'</div>';
$('body').append(loadingImage);
$(document).on('ajaxStart',function () {
    $('.overlay').show();
});
$(document).on('ajaxStop',function () {
    $('.overlay').hide();
});
},{}]},{},[1]);
