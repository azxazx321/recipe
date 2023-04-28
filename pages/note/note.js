$(function(){
    function getData(p){
        url = `https://serverms.xin88.top/note?page=${p}`
        $.get(url, data => {
            console.log(data.page)
            const array = data.data.map( element => {
                return `<li>
                    <img src="./assets/img/note/${element.cover}"/>
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
           
            $(window).scrollTop(0)

            
        
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
    
