// 必须锁定为ID其他不行 ID可以为表格的ID或者元素的ID,表格的ID为‘submit触发事件，元素的ID则为click触发事件
$("#repass-form").on('submit',function () {
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