require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
var getSearch=require('../common/util.js');
$.get('/v6/course/picture',{cs_id:getSearch("cs_id")},function (data) {
    if(data.code==200){
        data.result.Eindex=2;
        $(".course-add").append(template('course-edit2',data.result));
    }

});