var gulp=require("gulp");
var htmlmin=require('gulp-htmlmin');
var uglify=require('gulp-uglify');
var rename=require('gulp-rename');
var cleancss=require('gulp-clean-css');
var less=require('gulp-less');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat=require('gulp-concat');
var htmlReplace=require('gulp-html-replace');

gulp.task('less',function () {
    gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(cleancss())
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('uglify',function () {
    gulp.src('./src/**/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(gulp.dest("./dist"));
});
gulp.task('html',function () {
    gulp.src(['src/**/*.html','src/index.html'])
        .pipe(htmlReplace({
            style:gulp.src('src/html/common/style.html'),
            aside:gulp.src('src/html/common/aside.html'),
            header:gulp.src('src/html/common/header.html')
        }))
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true,//压缩页面JS
            minifyCSS: true,//压缩页面CSS
            removeComments: true//清除HTML注释
        }))
        .pipe(gulp.dest('dist'));

    gulp.src('dist/index.html')
        .pipe(gulp.dest('./'));
});

//包装第三方插件
var jsLibs = [
    'node_modules/art-template/lib/template-web.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery-form/dist/jquery.form.min.js',
    "./node_modules/echarts/dist/echarts.min.js",
    "./node_modules/nprogress/nprogress.js"
];
//合并第三方插件为一个
gulp.task('jsLib',function () {
    gulp.src(jsLibs)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/js'));
});

//打包commonjs模块
//1.其中src/js/common目录下的文件不要打包，因为将来那个页面脚本需要他，require它即可


var jsModules=[
    //首页
    'src/js/index.js',
    //用户
    'src/js/user/login.js',
    'src/js/user/repass.js',
    'src/js/user/profile.js',
    //讲师
    'src/js/teacher/add.js',
    'src/js/teacher/edit.js',
    'src/js/teacher/list.js',
    //课程
    'src/js/course/add.js',
    'src/js/course/edit1.js',
    'src/js/course/edit2.js',
    'src/js/course/edit3.js',
    'src/js/course/list.js',
    //学科分类
    'src/js/category/add.js',
    'src/js/category/edit.js',
    'src/js/category/list.js',
]
gulp.task('js',function () {
    jsModules.forEach(function (jspath) {
        var path=jspath.split('/');
        var jsName=path.pop();
        path.shift();
        browserify(jspath).bundle()
            .pipe(source(jsName))
            .pipe(buffer())
            .pipe(gulp.dest('dist/'+path.join('/')));

    })
});
//添加统一打包的任务
gulp.task('build',function () {
    gulp.run(['less','js','jsLib','html','uglify']);
});
//添加默认追踪的任务
gulp.task('default',['html','uglify','less','js','jsLib']);