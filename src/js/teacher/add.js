require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
$("#teached-add-form").ajaxForm(function (data) {
    data.code==200&&alert(data.msg);
    location.href="./list.html";
})