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
    $('.overlay').show();
});
$(document).on('ajaxStop',function () {
    $('.overlay').hide();
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
var lessons;

//页面信息回显
$.get("/v6/course/lesson",{cs_id:getSearch("cs_id")},function (data) {
    if(data.code==200){
        data.result.Eindex=3;
        lessons=data.result.lessons;
        console.log(lessons);
        alert(data.msg);
        $('.course-add').html(template("course-form-edit3",data.result));
    }
});

//编辑信息回显页面
$(document).on("click","#btn-info",function () {
    $.get("/v6/course/chapter/edit",{ct_id:$(this).attr('data-id')},function (data) {
        if(data.code==200){
            $("#chapterModal").html(template("course-tem-edit3",data.result));
        }
    })
});
//编辑信息和添加页面的提交数据
// 定义和用法
// prop() 方法设置或返回被选元素的属性和值。
// 当该方法用于返回属性值时，则返回第一个匹配元素的值。
// 当该方法用于设置属性值时，则为匹配元素集合设置一个或多个属性/值对。
// 注意：prop() 方法应该用于检索属性值，例如 DOM 属性（如 selectedIndex, tagName, nodeName, nodeType, ownerDocument, defaultChecked, 和 defaultSelected）。
// 提示：如需检索 HTML 属性，请使用 attr() 方法代替。
// 提示：如需移除属性，请使用 removeProp() 方法。
// 语法
// 返回属性的值：
// $(selector).prop(property)
// 设置属性和值：
// $(selector).prop(property,value)
// 使用函数设置属性和值：
// $(selector).prop(property,function(index,currentvalue))
// 设置多个属性和值：
// $(selector).prop({property:value, property:value,...})
$("#course-modal-edit3").ajaxForm({
    delegation:true,
    beforeSubmit:function (arrData,$form,options) {
            arrData.push({
                name:'ct_is_free',
                value:$('#ct_is_free').prop('checked')?1:0
            })
    },
    success:function (data) {
        var formArr=$('#course-modal-edit3').serializeArray();
        if(data.code==200){
            if(data.result){
                alert('添加成功');
                upLesson(data.result);
                console.log(lessons);
                $('#course-modal-edit3').get(0).reset();
            }else{
                alert("修改成功");
                upLesson();
                console.log(lessons);
            }
        }
    }
});
//添加章节回显信息
$(document).on('click','#add_chapter',function () {
    $("#chapterModal").html(template("course-tem-edit3",{ct_cs_id:getSearch("cs_id")}));
});

function upLesson(ct_id) {
    var formData=getFormData();
    var formArr={
        ct_id:ct_id||formData.ct_id,
        ct_name:formData.ct_name,
        ct_video_duration:formData.ct_minutes+":"+formData.ct_seconds
    };

    if(ct_id){
        lessons.push(formArr);
    }else{
        var index=getLessonIndex(formData.ct_id);
        lessons.splice(index,1,formArr);
    }

    $("#lesson-list").html(template('lesson-list-tpl',lessons));



    function getFormData(){
            var formArrData=$('#course-modal-edit3').serializeArray();
            var formData={};
            for(var i=0;i<formArrData.length;i++){
                formData[formArrData[i].name]=formArrData[i].value;
            }
            return formData;
    }

    function getLessonIndex(ct_id){
        for(var i=0;i<lessons.length;i++){
            if(lessons[i].ct_id==ct_id){
                return i;
            }
        }
    }
}





},{"../common/aside.js":1,"../common/common.js":2,"../common/header.js":3,"../common/loading.js":4,"../common/util.js":5}]},{},[6]);
