(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// 必须锁定为ID其他不行 ID可以为表格的ID或者元素的ID
$("#repass-form").on('click',function () {
    if($(".tc_new_pass").val()!=$(".tc_new_repeat").val()){
        alert("2次密码不一致");
        return false;
    }
    $(this).ajaxSubmit({
        success:function (data) {
            if(data.code=='200'){
                alert(data.msg);
            }
        }
    });
    return false;

})
},{}]},{},[1]);
