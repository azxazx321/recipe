$(function(){

    function getBottom(el) {
        // 元素的顶部 top
        const top = $(el).css('top') // 大概: '10px'   
        // 获取高度
        const height = $(el).height() // 获取的是值, 例如 20
        // console.log({ top, height })
        // 如何把 '10px' 转为数字 10
        // 通过 parseFloat 转化
        return parseFloat(top) + height
      }
    
    function getData(p){
        url = `https://serverms.xin88.top/note?page=${p}`
        $.get(url, data => {
            console.log(data.page)
            const array = data.data.map( element => {
                const { width, height } = element
                const img_w = 242.5
                const img_h = img_w*height/width
                return `<li>
                    <img src="./assets/img/note/${element.cover}"
                        style="width: ${img_w}px; height: ${img_h}px"
                    />
                    <p>${element.title}</p> 
                    <p>                  
                    <span>${element.name}</span>
                    <span>${element.favorite}</span>
                    </p>
                    </li>
                `})

            $('.note>ul').html(array)  

            $('.note>.pages>ul').empty()

            const {page, pageCount} = data
            let start = page - 2
            let end = page + 2

            if (start < 1) {
                start = 1
                end = start + 4
            }

            if (end > pageCount) {
                end = pageCount
                start = end - 4
            }


            for( let i = start; i <= end; i++ ) {
                $('.note>.pages>ul').append(
                    `<li class="${page == i ? 'active' : ''}">${i}</li>`)
            }

            const $btn_prev = $('.note>.pages>.prev')
            const $btn_next = $('.note>.pages>.next')
            page == 1 ? $btn_prev.hide() : $btn_prev.show()
            page == pageCount ? $btn_next.hide() : $btn_next.show()
           
            //$(window).scrollTop(0)
            const els = []

            $('.content>li').each( (index,element) => {
                const w = $(element).width()
                if (index < 4) {
                    $(element).css({ left: index * w + index * 10, top: 0})
                    els.push(element)
                } else {
                    let el_min = els[0]
                    console.log(els)
                    //console.log(els[0],'fdjs')
                    els.forEach( el => {
                        if (getBottom(el) < getBottom(el_min)) {
                            el_min = el
                        }
                    })

                    $(element).css({
                        left: $(el_min).css('left'),
                        top: getBottom(el_min) + 10    
                    })
        
                    const index = els.indexOf(el_min)
                    els.splice(index, 1, element)
                

                }
            })

            let el_max = els[0]

            els.forEach(el => {
                if (getBottom(el) > getBottom(el_max)) {
                el_max = el //如果遍历的元素 比 当前最大的 还要大, 就替换
                }
            })
            // 把这个最大元素的底部位置, 设置为父元素的高
            $('.content').height(
                getBottom(el_max)
            )
        }
        )
    }
    

    getData(1)

    // $('.note>.pages>ul>li').click(
    //     function() {
    //         //console.log('this')
    //         $(this).addClass('active').siblings().removeClass('active')
    //         //console.log($(this).text())
    //         const pageSelected = $(this).text()
    //         getData(pageSelected)
           
    //     }
    // )

    $('.note>.pages>ul').on('click','li',
        function() {
            //console.log(this)
            $(this).addClass('active').siblings().removeClass('active')
            //console.log($(this).text())
            const pageSelected = $(this).text()
            console.log(pageSelected)
            getData(pageSelected)
           
        }
    )

    $(".note>.pages>.prev").on('click',function(){
        const pageSelected = $('.note>.pages>ul>li.active').text()
        getData((pageSelected*1)-1)
    }
    )
    
    $(".note>.pages>.next").on('click',function(){
        const pageSelected = $('.note>.pages>ul>li.active').text()
        getData((pageSelected*1)+1)
    }
    )


})
    
