// 每次调用ajax时会先使用这个函数为Ajax配置
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    // 统一拼接路径
    options.url = 'http://www.liulongbin.top:3007' + options.url



    // 统一为有权限的接口设置headers请求头
    // headers 就是请求头配置对象
    // 不是所有的请求都加headers
    if (options.url.indexOf('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        // console.log('zhxinggg');
        console.log(res);
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1 强制清空token
            localStorage.removeItem('token');
            // 2 返回login.html
            location.href = './login.html'
        }
    }

})