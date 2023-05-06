$(function () {
    const user = JSON.parse(
        sessionStorage.getItem('user') || localStorage.getItem('user')
    )

    if(user.avatar) {
        $('.profile #photo>img').prop('src', user.avatar)

        $('.profile td#phone').text(user.phone)
        $('.profile td#created').text(moment(user.created).format('DD-MM-YYYY HH:MM:SS'))
    }

    $('.profile>.left').on('click','li', function () {
        const i = $(this).index()
        location.assign('?p=profile&index=' + i)
    })

    const index = new URLSearchParams(location.search).get('index')
    $('.profile>.left>ul>li').eq(index)
        .addClass('active').siblings().removeClass('active')

    $('.profile>.right>div').eq(index).show().siblings().hide()
}
)