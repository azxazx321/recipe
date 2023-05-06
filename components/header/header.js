$(function (){
    $(".search>button").click(function(){
        location.assign('?p=search')
    })

    const user = JSON.parse(
        sessionStorage.getItem('user') || localStorage.getItem('user')
    )

    if (user) {
        console.log(user)
        $('.header>a').hide()
        $('.header>.user').show()
        $('.header>.user>a').text(user.phone)
        if (user.avatar) $('.header>.user>img').prop('src', user.avatar)
    } else {
        $('.header>a').show()
        $('.header>.user').hide()
    }
})