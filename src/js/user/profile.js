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
            initPlugin();
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
            alert('保存失败');
        }
});

//所有的插件的初始化
function initPlugin() {
    //日期插件
    $('input[name=tc_birthday]').datepicker({
        language:'zh-CN',
        format:'yyyy-mm-dd',
        endDate:new Date('2017-9-16')
    });
    $('input[name=tc_join_date]').datepicker({
        language:'zh-CN',
        format:'yyyy-mm-dd',
        endDate:new Date('2017-9-16')
    });
    //三级联动
    $('#region-container').region({
        url: '/lib/jquery-region/region.json'
    });
    //富文本编辑器
    CKEDITOR.replace("introduce", {
        width:600,
        skin:"kama"
    });
}
