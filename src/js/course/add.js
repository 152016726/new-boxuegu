require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
$("#creat-course").ajaxForm(function (data) {
    if(data.code==200){
        alert(data.msg);
        location.href='/dist/html/course/edit1.html?cs_id='+data.result.cs_id;
    }
})