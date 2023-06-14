$(function () {
    // 点击注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })



    $('#link_login').on('click', function () {

        $('.reg_box').hide()
        $('.login_box').show()
    })

    // 校验规则
    // 从layUI中获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格',
        ],
        repwd: function (value) {
            //   通过形参拿到确认密码框的值，
            // 还需要拿到密码框的值
            // 然后进行等于的判断 如果判断失败 return一个提示消息
            var pwd = $('.reg_box [name=password]').val()
            if (pwd !== value) return '两次密码不一致'
        }
    })


    // 监听注册表单
    $('#form_reg').on('submit', function (e) {
        // 组织默认行为
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            // console.log(res);
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功,请登录！')
            // 模拟点击事件
            $('#link_login').click()
        })
    })


    // 监听登录

    $('#form-login').submit(function (e) {
        // 阻止默认行为
        e.preventDefault()
        // serialize() 快速获取表单内的数据
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('登录失败！请重新登录')
                layer.msg('登录成功！')

                // 将登录成功后的token保存
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href = '/index.html'
                

            }


        })


    })
})