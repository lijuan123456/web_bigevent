$(function () {
    var form = layui.form
    var layer = layer.layer
    // 自定义验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    // initUserInfo()

    // 初始化基本信息
    function initUserInfo() {
        $.ajax({
            mathod: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('请求客户信息失败')
            },
            complete: function () {

            }

        })
    }
})