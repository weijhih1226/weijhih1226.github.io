const delay = 10;
const width = 300;

window.addEventListener('DOMContentLoaded' , function(){
    var outmenu = document.querySelector('.outmenu');
    var content = document.querySelector('.content');
    var btn = document.querySelectorAll('.btn-goTop');
    var contentAll = [];
    if (outmenu != null) {
        var zoom = null;
        outmenu.style.right = '0px';
        content.style.right = '300px';
        btn[0].style.right = '325px';
        btn[1].style.right = '25px';
        contentAll.push(content , zoom , ...btn);

        document.querySelector('#nav-menu').addEventListener('click' , () => {
            contentAll[1] = document.querySelector('#zoom');
            if (outmenu.style.right == '0px') close(outmenu , contentAll , width , delay);
            else open(outmenu , contentAll , width , delay);
        })
    }
})

function close(menu , content , width , delay){
    if (menu.style.right === '') menu.style.right = '0';
    if (parseInt(menu.style.right) > -width) {
        setTimeout(() => {
            menu.style.right = (parseInt(menu.style.right) - 10) + 'px';
            for (i = 0 ; i < content.length ; i++) {
                if (content[i] != null) content[i].style.right = (parseInt(content[i].style.right) - 10) + 'px';
            }
            close(menu , content , width , delay)
        } , delay)
    }
}

function open(menu , content , width , delay){
    if (menu.style.right === '') menu.style.right = -width + 'px';
    if (parseInt(menu.style.right) < 0) {
        setTimeout(() => {
            menu.style.right = (parseInt(menu.style.right) + 10) + 'px';
            for (i = 0 ; i < content.length ; i++) {
                if (content[i] != null) content[i].style.right = (parseInt(content[i].style.right) + 10) + 'px';
            }
            open(menu , content , width , delay)
        } , delay)
    }
}