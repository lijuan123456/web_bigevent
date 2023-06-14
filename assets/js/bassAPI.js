// 每次调用$Ajax或$post 或$get
// 先到用这个$.ajaxPrefilter方法 在这个函数中可以拿到给Ajax提供的配置对象
$.ajaxPrefilter(function (option) {
    option.url = 'http://127.0.0.1:3007' + option.url
})