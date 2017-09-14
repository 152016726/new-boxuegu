require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
var getSearch=require('../common/util.js');

//页面信息回显
$.get("/v6/course/lesson",{cs_id:getSearch("cs_id")},function (data) {
    if(data.code==200){
        data.result.Eindex=3;
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
//编辑信息添加页面
$("#course-modal-edit3").ajaxForm({
    delegation:true,
    success:function (data) {
        if(data.code==200){
            if(data.result){
                alert('添加成功');
                location.href='/dist/html/course/edit3.html?cs_id='+getSearch("cs_id");
            }else{
                alert("修改成功");
            }
        }
    }
});
//添加章节
$(document).on('click','#add_chapter',function () {
    $("#chapterModal").html(template("course-tem-edit3",{ct_cs_id:getSearch("cs_id")}));
});





