$(function() {

    var url = 'https://serverms.xin88.top/index'
    $.get(url, data => {
        console.log(data)
        const content = data.hot_video.map(
            element => {
                return `
                <li>
                    <video src = './assets/video/${element.mp4}' preload = 'matadata'></video>                   
                        <i></i>
                    <b>${element.vname}809</b>
                </li>
                `
            }
        )
        $('.home>.hot-video>ul').append(content)
    })


    // $('.home>.video').on('mouseover','li>video',function(){
    //     $(this).trigger('play')
    //     console.log('play')
    // })

    // $('.home>.video').on('mouseleave','li>video',function(){
    //     $(this).trigger('pause')
    //     console.log('play')
    // })

    $('.home>.hot-video>ul').on('click','li',function () {
        if($(this).hasClass('active')) {
            $(this).children('video').trigger('pause')

            $(this).removeClass('active').siblings().removeClass('noactive')

        } else if ($(this).hasClass('noactive')) { 
            $(this).children('video').trigger('play')
            $(this).siblings().children('video').trigger('pause')

            $(this).addClass('active').removeClass('noactive')
            $(this).siblings().addClass('noactive').removeClass('active')

        } else {
            $(this).addClass('active').siblings().addClass('noactive')

            $(this).children('video').trigger('play')
        }
    })
 
    
})