require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
// 必须表格的ID为‘submit触发事件，元素的ID则为click触发事件
$(".btn-success").on('click',function () {
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