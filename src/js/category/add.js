require('../common/aside.js');
require('../common/header.js');
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