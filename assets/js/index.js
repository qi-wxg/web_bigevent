$(function() {
    // 调用getUserInfo获取用户基本信息
    getUserInfo();

    var layer = layui.layer
        // 推出点击事件
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1 清空本地token
            localStorage.removeItem('token');
            // 2 重新返回登陆页面
            location.href = './login.html'

            // 关闭 confirm
            layer.close(index)
        });
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                // console.log(res);
                return layui.layer.msg('获取失败')
            }
            // 渲染用户头像
            renderAvatar(res.data)
        },
        // 成功还是失败都会执行complete 
        // complete: function(res) {
        //     // console.log('zhxinggg');
        //     console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1 强制清空token
        //         localStorage.removeItem('token');
        //         // 2 返回login.html
        //         location.href = './login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 设置头像
    if (user.user_pic !== null) {
        // 图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()

    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }


}