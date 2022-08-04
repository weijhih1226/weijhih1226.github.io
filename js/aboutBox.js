function fadeIn(box , opacity , r , g , b , o_dev) {
    if (opacity < 1) {
        setTimeout(function() {
            opacity += 0.1;
            box.style.opacity = opacity;
            box.style.backgroundColor = "rgba(" + r + "," + g + "," + b + "," + (opacity - o_dev) + ")";
            fadeIn(box , opacity , r , g , b , o_dev)
        } , 50)
    }
}

function fadeOut(box , opacity , r , g , b , o_dev) {
    if (opacity > 0.001) {
        setTimeout(function() {
        opacity *= 0.8;
        box.style.opacity = opacity;
        box.style.backgroundColor = "rgba(" + r + "," + g + "," + b + "," + (opacity - o_dev) + ")";
        fadeOut(box , opacity , r , g , b , o_dev)
        } , 50)
    }
    else {
        box.style.display = "none";
    }
}

window.addEventListener("DOMContentLoaded" , function(){
    var box = document.getElementById("about_block");
    var btn = document.getElementById("about_btn");
    btn.addEventListener('click' , function(){
        box.style.display = "block";
        var opacity = 0;
        var opacity_dev = 0.2;
        var r = g = b = 255;
        fadeIn(box , opacity , r , g , b , opacity_dev)
    })
    var close = document.getElementById("close");
    close.addEventListener('click' , function(){
        var opacity = 1;
        var opacity_dev = 0.2;
        var r = g = b = 255;
        fadeOut(box , opacity , r , g , b , opacity_dev)
    })
})