function fadeIn(block , box , opacity) {
    if (opacity < 1) {
        setTimeout(function() {
            opacity += 0.1;
            block.style.opacity = opacity;
            block.style.backgroundColor = "rgba(0, 0, 0," + (opacity / 2) + ")";
            box.style.marginTop = (1 - opacity) + "em";
            fadeIn(block , box , opacity)
        } , 50)
    }
}

function fadeOut(block , box , opacity) {
    if (opacity > 0) {
        setTimeout(function() {
        opacity -= 0.1;
        block.style.opacity = opacity;
        block.style.backgroundColor = "rgba(0, 0, 0," + (opacity / 2) + ")";
        box.style.marginTop = (1 - opacity) + "em";
        fadeOut(block , box , opacity)
        } , 50)
    }
    else {
        block.style.display = "none";
    }
}

window.addEventListener("DOMContentLoaded" , function(){
    var block = document.querySelector("#about_bg");
    var box = document.querySelector("#about_block");
    var btn = document.querySelector("#about_btn");
    var close = document.querySelector("#close");
    btn.addEventListener('click' , function(){
        block.style.display = "block";
        // close.style.display = "block";
        var opacity = 0;
        fadeIn(block , box , opacity)
    })
    close.addEventListener('click' , function(){
        var opacity = 1;
        fadeOut(block , box , opacity)
    })
    // block.addEventListener('click' , function(){
    //     var opacity = 1;
    //     fadeOut(block , opacity)
    // })
})