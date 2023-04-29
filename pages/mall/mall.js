$(function () {
    function getData(p){
      var url = 'https://serverms.xin88.top/mall?page='+ p
    $.get(url, data => {
      console.log('mall:', data);
      const content = data.data.map(
        element => {
          return `
            <li>
              <img src="./assets/img/mall/${element.pic}"/>
              <p>${element.name}</p>
              <p>
              <span>$${element.price}</span>
              <span>Sale:${element.sale_count}</span>
              </p>
            </li>
          `
        }       
      )
      $('.mall>.content').html(content)
      
      $('.mall>.pages>ul').empty()

      const {page,pageCount} = data
      let start = page -2
      let end = page + 2
      
      if(start <= 0 ) {
        start = 1
        end = start + 4
      }

      if (end > pageCount) {
        end = pageCount
        start = end -4
      }

      for (let i = start; i <= end; i++) {
        $('.mall>.pages>ul').append(`
        <li class = "${page == i ? 'active' : ''} ">${i}</li>
        `)
      }

      const $btn_next = $('.mall>.pages>.next')
      const $btn_prev = $('.mall>.pages>.prev')
      p == pageCount ? $btn_next.hide() : $btn_next.show()
      p == 1 ? $btn_prev.hide() : $btn_prev.show()

      $(window).scrollTop(0)

    })

    }

    getData(1)

    $('.mall>.pages>ul').on('click','li', function(){
      $(this).addClass('active').siblings().removeClass('active')
      const pageSelected = $(this).text()
      console.log(pageSelected)
      getData(pageSelected)
    })


    $(".mall>.pages>.prev").on('click',function(){
      const pageSelected = $('.mall>.pages>ul>li.active').text()
      getData((pageSelected*1)-1)
  }
  )
  
  $(".mall>.pages>.next").on('click',function(){
      const pageSelected = $('.mall>.pages>ul>li.active').text()
      getData((pageSelected*1)+1)
  }
  )
   
  })