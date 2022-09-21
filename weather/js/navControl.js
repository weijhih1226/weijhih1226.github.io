window.addEventListener('DOMContentLoaded' , function(){
    var outmenu = document.querySelector('.outmenu');
    var contentAll = [];
    if (outmenu != null) {
        var content = document.querySelector('.content');
        var enlarge = null
        contentAll.push(content , enlarge)
        outmenu.style.right = '0px';
        document.querySelector('#nav-menu').addEventListener('click' , function(){
            contentAll[1] = document.querySelector('#enlarge');
            if (outmenu.style.right == '0px') {
                close(outmenu , contentAll , 0 , 300)
                // content.style.right = '0px';
                // outmenu.style.right = '-300px';
            } else {
                open(outmenu , contentAll , -300 , 0)
                // content.style.right = '300px';
                // outmenu.style.right = '0px';
            }
        })
    }
})

function close(menu , content , menu_right , content_right){
    if (menu_right > -300) {
        setTimeout(function(){
            menu_right -= 10;
            content_right -= 10;
            menu.style.right = menu_right + 'px';
            for (i = 0 ; i < content.length ; i++) {
                if (content[i] != null){
                    content[i].style.right = content_right + 'px';
                }
            }
            close(menu , content , menu_right , content_right)
        } , 10)
    }
}

function open(menu , content , menu_right , content_right){
    if (menu_right < 0) {
        setTimeout(function(){
            menu_right += 10;
            content_right += 10;
            menu.style.right = menu_right + 'px';
            for (i = 0 ; i < content.length ; i++) {
                if (content[i] != null){
                    content[i].style.right = content_right + 'px';
                }
            }
            open(menu , content , menu_right , content_right)
        } , 10)
    }
}