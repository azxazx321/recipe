$(
    function(){
        url = 'https://serverms.xin88.top/note?page=1'
        $.get(url, data => {
            console.log(data.data)
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

            $('.note>ul').append(array)
            console.log(array)
        })
    }
)