// 每次调用ajax时会先使用这个函数为Ajax配置
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    // 统一拼接路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
})