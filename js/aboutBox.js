function fadeIn(body , block , div , img , opacity , blur , r , g , b , o_dev) {
    if (opacity < 1) {
        setTimeout(function() {
            opacity += 0.1;
            blur += 0.2;
            body.style.backgroundColor = "rgba(0, 0, 0," + (opacity - o_dev) + ")";
            block.style.opacity = opacity;
            block.style.backgroundColor = "rgba(" + r + "," + g + "," + b + "," + (opacity - o_dev) + ")";
            block.style.backdropFilter = "blur(" + blur + "px)"
            for(var i=0; i<div.length; i++){
                div[i].style.opacity = opacity;
            }
            img.style.opacity = opacity;
            fadeIn(body , block , div , img , opacity , blur , r , g , b , o_dev)
        } , 50)
    }
}

function fadeOut(body , block , div , img , opacity , blur , r , g , b , o_dev) {
    if (opacity > 0.0001) {
        setTimeout(function() {
        opacity *= 0.8;
        blur -= 0.2;
        body.style.backgroundColor = "rgba(0, 0, 0," + (opacity - o_dev) + ")";
        block.style.opacity = opacity;
        block.style.backgroundColor = "rgba(" + r + "," + g + "," + b + "," + (opacity - o_dev) + ")";
        block.style.backdropFilter = "blur(" + blur + "px)"
        for(var i=0; i<div.length; i++){
            div[i].style.opacity = opacity;
        }
        img.style.opacity = opacity;
        fadeOut(body , block , div , img , opacity , blur , r , g , b , o_dev)
        } , 50)
    }
    else {
        block.style.display = "none";
    }
}

window.addEventListener("DOMContentLoaded" , function(){
    var body = document.querySelector("body");
    var block = document.querySelector("#about_block");
    var btn = document.querySelector("#about_btn");
    var close = document.querySelector("#close");
    var div = document.querySelectorAll("#about_block div");
    var img = document.querySelector("#about_side img");
    btn.addEventListener('click' , function(){
        block.style.display = "block";
        close.style.display = "block";
        img.style.display = "block";
        var opacity = 0;
        var opacity_dev = 0.2;
        var blur = 0;
        var r = g = b = 255;
        fadeIn(body , block , div , img , opacity , blur , r , g , b , opacity_dev)
    })
    close.addEventListener('click' , function(){
        var opacity = 1;
        var opacity_dev = 0.1;
        var blur = 2;
        var r = g = b = 255;
        fadeOut(body , block , div , img , opacity , blur , r , g , b , opacity_dev)
    })
})