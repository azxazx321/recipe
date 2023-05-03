$(function() {

    var url = 'https://serverms.xin88.top/index'
    $.get(url, data => {
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

        $('.hot-search>div').html(
            data.today_hot.map(
                element  => {
                    const { name, emphasize} = element
                    return `<a class="${emphasize ? 'active' : ''}" href="?p=search&kw=${name}">${name}</a>
                    `
                }
            )
        )

        $('.today-meal>div:first-child>ul').html(

            data.today_meal.map((value, i) => {
                const { cate_name, contents } = value
        
                contents.forEach(content => {
                  const { desc, pic, title } = content
                console.log(pic)
                  $('.swiper-wrapper').append(`<div class="swiper-slide">
                    <img src="./assets/img/food/${pic}" alt="">
                    <b>${title}</b>
                    <p>${desc}</p>
                  </div>`)
                })
        
        
                return `<li class="${i == 0 ? 'active' : ''}">${cate_name}</li>`
              })

            )
    
             
         
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

    $('.today-meal').on('click','li', function(){
        $(this).addClass('active').siblings().removeClass('active')
        const i = $(this).index()
        mySwiper.slideTo(3*i)
    })

    var mySwiper = new Swiper('.swiper', {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 3,
        on: {
            slideChange() {
                const i = this.activeIndex / 3
                $('.today-meal li').eq(i).click()
            }
        }
    })

    setInterval(() => {
        $('.area-1-right').toggleClass('active')
      }, 3000);
    
 
    
})