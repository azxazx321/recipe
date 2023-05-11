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

    $.get('https://serverms.xin88.top/users/head_photos', data => {

    $('.profile #photo>div').html(
      data.hero.map(value => {
        const { alias, selectAudio } = value

        return `<img data-au="${selectAudio}" src="https://game.gtimg.cn/images/lol/act/img/champion/${alias}.png" alt="">`
      })
    )
  })

  
    $('.profile #photo>div').on('click', 'img', function() {
        const src = $(this).prop('src')
        $('.profile #photo>img').prop('src', src)

        const au = $(this).data('au')
        console.log(au)
        audio.src = au
        audio.play()
        })
    const audio = document.createElement('audio')

    $('.profile #photo>button').click(function() {
        var url = 'https://serverms.xin88.top/users/head_photo'
        const id = user.id
        const alias = $('.profile #photo>img').prop('src')
        console.log(alias)
        $.post(url, {id, alias}, data => {
            console.log(data)
            if (data.code == 200) {
                user.avatar = alias // 修改用户的头像信息
                // 判断当前用户信息存储在 本地 还是 会话存储
                if (sessionStorage.getItem('user')) {
                  sessionStorage.setItem('user', JSON.stringify(user))
                }
                if (localStorage.getItem('user')) {
                  localStorage.setItem('user', JSON.stringify(user))
                }
                // 刷新页面
                location.reload()
            }

        })
    })

    $('.profile button.logout').click(function() {
        sessionStorage.removeItem('user')
        localStorage.removeItem('user')

        location.replace('?p=home')
    })
}
)