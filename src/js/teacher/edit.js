require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
var getSearch=require('../common/util.js');
//导入列表
$.get('/v6/teacher/edit',{tc_id:getSearch('tc_id')},function (data) {
    if(data.code==200){
        alert(data.msg);
        var html=template('teacher-form-tem',data.result);
        $(".teacher-add").html(html);
    }
});
//提交数据
$('#teacher-edit-form').ajaxForm({
    delegation:true,
    success:function (data) {
        if(data.code==200){
            alert(data.msg);
            location.href='/dist/html/teacher/list.html';
        }
    }
});