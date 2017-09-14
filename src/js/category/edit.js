require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
var cg_id=require('../common/util.js');
console.log(cg_id);
//获取课程列表回显
$.get('/v6/category/edit',{cg_id:cg_id("cg_id")},function (data) {
    console.log(data);
    var html=template("category-form-edit",data.result);
    $(".category-add").html(html);
});
//用户提交数据更新
$(".form-horizontal").ajaxForm({
    delegation:true,
    success:function (data) {
        if(data.code==200){
            alert(data.msg);
            location.href='/dist/html/category/list.html';
        }
    }
});