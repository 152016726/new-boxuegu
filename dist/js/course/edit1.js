(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
console.log(user);

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
},{}],2:[function(require,module,exports){
var isLogin=!!$.cookie('PHPSESSID');//用于是否登录
var isLoginPage=location.pathname=='/dist/html/user/login.html';
if(isLogin&&isLoginPage){
    location.href='/dist';
}else if(!isLoginPage&&!isLogin){
    location.href='/dist/html/user/login.html';
}

},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
var loadingImage='<div class="overlay">'+'<img src="/uploads/loading.gif"/>'+'</div>';
$('body').append(loadingImage);
$(document).on('ajaxStart',function () {
    $('overlay').show();
});
$(document).on('ajaxStop',function () {
    $('overlay').hide();
});
},{}],5:[function(require,module,exports){
//解析location.search:
//传1个参数返回指定Key的值，不传参数返回解析后的对象后的值。
//1.首先介截掉头部的？号
//2.通过&符号劈成一组组成key=val 的字符串组成的数组
//3.然后在通过=号把数组劈成了key 和 val两个值的数组
//4.建立一个新对象，按照键是key 值是val的形式赋值新对象；
function getSearch(key){
    var searchStr=location.search.slice(1);
    var searchArr=searchStr.split('&');
    var searchObj={},Arr;
    for(var i=0;i<searchArr.length;i++){
        Arr=searchArr[i].split('=');
        searchObj[Arr[0]]=Arr[1];
    }
    return key?searchObj[key]:searchObj;
}

//暴露数据给其他版块公用
module.exports = getSearch;

},{}],6:[function(require,module,exports){
require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
var getSearch=require('../common/util.js');
//导入列表
$.get('/v6/course/basic',{cs_id:getSearch("cs_id")},function (data) {
    console.log(data);
    if(data.code==200){
        data.result.Eindex=1;
        $(".course-add").append(template('course-edit',data.result));
    }

});
$('#course-form-edit1').ajaxForm({
        delegation:true,
        success:function (data) {
            if(data.code==200){
                alert(data.msg);
                location.href='/dist/html/course/edit2.html?cs_id='+data.result.cs_id;
            }
        }
    }
);


},{"../common/aside.js":1,"../common/common.js":2,"../common/header.js":3,"../common/loading.js":4,"../common/util.js":5}]},{},[6]);
