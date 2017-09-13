require('../common/aside.js');
require('../common/header.js');
$("#teached-add-form").ajaxForm(function (data) {
    data.code==200&&alert(data.msg);
    location.href="./list.html";
})