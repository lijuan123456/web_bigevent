$(function () {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {

        // 提示客户是否退出
        layer.confirm('确认退出登录', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //   清空本地存储的token
            localStorage.removeItem('token')
            // 重新跳转到登录页
            location.href = '/login.html'
            //  这个是layUI里的关闭弹出层
            layer.close(index);
        });
    })
})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // 请求头
        // headers: {
        //     Authorization: localStorage.getItem('token' || '')
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            // 调用渲染用户头像
            randerAvatar(res.data)

        },
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
        //         // 1. 强制清空 token
        //         localStorage.removeItem('token')
        //         // 2. 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }

    })
}
// 渲染用户头像

function randerAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染人本头像
        // $('.text-avatar').show()
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}