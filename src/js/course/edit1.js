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

