(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var isLogin=!!$.cookie('PHPSESSID');//用于是否登录
var isLoginPage=location.pathname=='/dist/html/user/login.html';
if(isLogin&&isLoginPage){
    location.href='/dist';
}else if(!isLoginPage&&!isLogin){
    location.href='/dist/html/user/login.html';
}

},{}],2:[function(require,module,exports){
require("./common.js");
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
},{"./common.js":1}]},{},[2]);
