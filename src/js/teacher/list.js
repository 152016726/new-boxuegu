require('../common/aside.js');
require('../common/header.js');
//获取列表功能
$.get('/v6/teacher',function (data) {
    data.code==200&&$('#teacher-table').html(template('teacher-list-tem',data.result));
});
//注销功能
$("#teacher-table").on('click',".btn-warning",function () {
    var $s=$(this).attr('status');
    var $p=$(this).attr('passid');
    var $this=$(this);
    console.log($p);
    $.ajax({
        type:'post',
        url:'/v6/teacher/handle',
        data:{tc_id:$p,tc_status:$s},
        success:function (data) {
            if(data.code==200){
                alert(data.msg);
                $this.attr('status',data.result.tc_status);
                $s==0?$this.text("启 用"):$this.text('注 销');
            }
        }
    })
})
//详细资料
$('#teacher-table').on('click','#teacher-list',function () {
    console.log(1);
        var ids=$(this).attr('data-id');
        $.get('/v6/teacher/view',{tc_id:ids},function (data) {
            if(data.code==200){
                alert(data.msg);
                var html=template('teacher-list-list',data.result);
                $("#teacher-list-modal").html(html);
            }
        })
})