$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form

    // 从layui中获取layer对象
    var layer = layui.layer

    // 通过 form.verify({})函数 自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })

    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登入!');
            $('#link_login').click();
        })
    })

    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            // serialize 写错单词
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    // msg 写错单词
                    return layer.msg('登入失败!')
                }
                // 登入成功之后记得要先拿一下token值
                layer.msg('登入成功!');
                // 将登入成功得到的token字符串 保存到本地存储中
                localStorage.setItem('token', res.token);
                // 调整到后台主页
                location.href = '/index.html'
            }
        })
    })


})