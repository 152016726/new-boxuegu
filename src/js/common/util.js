//解析location.search:
//传1个参数返回指定Key的值，不传参数返回解析后的对象后的值。
//1.首先介截掉头部的？号
//2.通过&符号劈成一组组成key=val 的字符串组成的数组
//3.然后在通过=号把数组劈成了key 和 val两个值的数组
//4.建立一个新对象，按照键是key 值是val的形式赋值新对象；
function getSearch(key){
    var searchStr=location.search.slice(1);
    var searchArr=searchStr.split('&');
    var searchObj={},Arr;
    for(var i=0;i<searchArr.length;i++){
        Arr=searchArr[i].split('=');
        searchObj[Arr[0]]=Arr[1];
    }
    return key?searchObj[key]:searchObj;
}

//暴露数据给其他版块公用
module.exports = getSearch;
