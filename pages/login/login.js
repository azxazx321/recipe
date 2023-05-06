$('.login>.modal>button').on('click', function(){
    var phone = $('.login>.modal>:text').val()
    var pwd = $('.login>.modal>:password').val()
    console.log(phone,pwd)

    var url = 'https://serverms.xin88.top/users/login'
    $.post(url, {phone, pwd}, data => {
        if (data.code == 200) {
            alert("login successful")
            const checkbox = $('.login :checkbox').prop('checked')
            const user = JSON.stringify(data.data)
            checkbox ? localStorage.setItem('user', user) : sessionStorage.setItem('user', user)

            location.replace("?p=home")
        } else {
            alert(data.msg)
        }
    })
})