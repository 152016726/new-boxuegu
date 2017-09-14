require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
var getSearch=require('../common/util.js');
$.get('/v6/course',function (data) {
    if(data.code==200){
        alert(data.msg);
        $(".courses").html(template('course-list-tem',data.result));
    }
});