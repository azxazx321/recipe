$( function () {
    function getData(p) {
        url = `https://serverms.xin88.top/mall/search?type=1&page=${p}&kw=`
        $.get( url, function (data) {
            console.log(data)
            const content = data.data.map( 
                element => {
                    return `
                        <li>
                            <img src="./assets/img/mall/${element.pic}">
                            <div>
                            <p>${element.name}</p>
                            <p>${element.price}</p>
                            <p>${element.sale_count}</p>
                            </div>
                        </li>
                    `
                }
            ) 
            $(".search>.content").html(content)
            
            $('.search>.pages>ul').empty()

            
            const {page, pageCount} = data
            let start = page - 2
            let end = page + 2
            if (start < 1 ) {
                start = 1
                end = start + 4
            } 

            if (end > pageCount) {
                end = pageCount
                start = end - 4
            }


            for (let i = start; i <= end; i++) {
                $('.search>.pages>ul').append(`
                <li class = "${i == p ? 'active' : ''}">${i}</li>
                `)
            }

            const $btn_next = $('.search>.pages>.next')
            const $btn_prev = $('.search>.pages>.prev')
            p == pageCount ? $btn_next.hide() : $btn_next.show()
            p == 1 ? $btn_prev.hide() : $btn_prev.show()

            $(window).scrollTop(0)

    })
    }


    getData(40)
    
    $('.search>.pages>ul').on('click', 'li', function(){
        $(this).addClass('active').siblings().removeClass('active')
        const pageSelected = $(this).text()
        console.log(pageSelected)
        getData(pageSelected)
       

    })

    $(".search>.pages>.prev").on('click',function(){
        const pageSelected = $('.search>.pages>ul>li.active').text()
        getData((pageSelected*1)-1)
    }
    )
    
    $(".search>.pages>.next").on('click',function(){
        const pageSelected = $('.search>.pages>ul>li.active').text()
        getData((pageSelected*1)+1)
    }
    )

}
)