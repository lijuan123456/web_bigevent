// 每次调用$Ajax或$post 或$get
// 先到用这个$.ajaxPrefilter方法 在这个函数中可以拿到给Ajax提供的配置对象
$.ajaxPrefilter(function (option) {
    option.url = 'http://127.0.0.1:3007' + option.url
    // 统一未有权限接口听见请求头
    if (option.url.indexOf('/my') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token' || '')
        }
    }

    option.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})