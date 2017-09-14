require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
$.ajax({
    type:'get',
    url:'/v6/teacher/profile',
    success:function (data) {
        if(data.code=="200"){
            var html=template('teacher-profile-tpl',data.result);
            $(".teacher-profile").html(html);
        }
    }
})
$('#teacher-profile-form').ajaxForm({
        // 事件委托获取动态元素
        delegation:true,
        success:function (data) {
            if(data.code==200){
                alert(data.msg);
            }
        },
        error:function () {
            alert('登录失败');
        }
});

