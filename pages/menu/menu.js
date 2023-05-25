$(function() {

    function getData(p) {
        var url = 'https://serverms.xin88.top/video?page=' + p

        $.get(url, data => {
            console.log(data.data);
            const array = data.data.map(element => {return `
                        <li>
                            <div>
                            <img src='./assets/img/video/${element.pic}'>
                            <div>
                                <span>${element.views}</span>
                                <span>${element.duration}</span>
                            </div>
                            </div>
                            <p>${element.title}</p>
                        </li>
            `})

            $('.menu>.menu-content').html(array)

            $('.menu>.pages>ul').empty()
            const {page, pageCount} = data
            let start = page - 2
            let end = page + 2
            if(start < 1) {
                start = 1
                end = start + 4
            }

            if (end > pageCount) {
                end = pageCount
                start = end - 4
            }

            for(let i = start; i <= end; i++) {
                $('.menu>.pages>ul').append(`<li class = "${page == i ? 'active' : ''}">${i}</li>`)

            }

            if(page == 1) {
                $('.menu>.pages>.prev').hide()
            } else {
                $('.menu>.pages>.prev').show()

            }
            if(page == pageCount) {
                $('.menu>.pages>.next').hide()
            } else {
                $('.menu>.pages>.next').show()
            }

        
        })
        

        $('.menu>pages').html()
    }

    getData(1)

    $('.menu>.pages>ul').on('click', 'li', function() {
        const pageSeleted = $(this).text()
        $(this).addClass('active').siblings().removeClass('active')
        getData(pageSeleted)
    })

    $('.menu>.pages>.prev').on('click',function() {
        const pageSeleted = $('.menu>.pages>ul>li.active').text()
        getData(pageSeleted - 1)
    })

    $('.menu>.pages>.next').click(function() {
        const pageSeleted = $('.menu>.pages>ul>li.active').text()
        getData(pageSeleted*1 + 1)
    })

    

}
)