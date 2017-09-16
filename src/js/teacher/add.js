require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
$("#teached-add-form").ajaxForm(function (data) {
    data.code==200&&alert(data.msg);
    location.href="./list.html";
});
initPlugin();
//所有的插件的初始化
function initPlugin() {
    //日期插件
    $('input[name=tc_join_date]').datepicker({
        language:'zh-CN',
        format:'yyyy-mm-dd',
        endDate:new Date('2017-9-16')
    });
}