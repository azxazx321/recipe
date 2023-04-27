$(function(){
    const url = 'https://douyu.xin88.top/api/room/list?page=1&type=ms'
    $.get(url, data => {
        console.log(data.data)
        const array = data.data.list.map(element => {
            return `<li>
            <img src="${element.roomSrc}" alt="">
            <span>${element.roomName}</span>
            <p>${element.hn}</p>
            <p>${element.nickname}</p>
            </li>
            `})

        console.log(array)
        $('.content').append(array)
    })
})

