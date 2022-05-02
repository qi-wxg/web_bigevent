$(function() {
    // 点击--去注册账号--进行切换
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击--去登陆--进行切换
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    // 从layui中获取form对象
    var form = layui.form;
    // 获取layer对象
    var layer = layui.layer

    form.verify({
        // 自定义了pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    // 监听注册表单事件
    $('#form_reg').on('submit', function(e) {
        // 主阻止默认行为
        e.preventDefault();


        // 发起Ajax请求
        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录');
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登录表单
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: "/api/login",
            method: "POST",
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败！")
                }
                layer.msg("登陆成功");
                // console.log(res.token);
                // 将登陆成功得到的token字符串值保存到localStorage中
                localStorage.setItem('token', res.token);
                // 跳转后台主页
                location.href = 'index.html'
            }
        })
    })

})