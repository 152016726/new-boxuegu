//-var path=location.pathname;
// -$(“.nav a”).removeclass(“active”);
// -$(“nav a[href=”’+path+’”]”).addclass(“active”).parent().show();

// 头像信息展示
var user=JSON.parse(localStorage.getItem('userInfo'));
$('#avatar').attr('src',user.tc_avatar);
$('#monitar').text(user.tc_name);

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