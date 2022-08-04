function fadeIn(box , opacity) {
    if (opacity < 1) {
        setTimeout(function() {
            opacity = opacity + 0.1;
            box.style.opacity = opacity;
            fadeIn(box , opacity)
        } , 50)
    }
}

function fadeOut(box , opacity) {
    if (opacity > 0) {
        setTimeout(function() {
        opacity = opacity - 0.1;
        box.style.opacity = opacity;
        fadeOut(box , opacity)
        } , 50)
    }
}

window.addEventListener("DOMContentLoaded" , function(){
    var box = document.getElementById("about_box");
    var btn = document.getElementById("about_btn");
    btn.addEventListener('click' , function(){
        box.style.display = "block";
        var opacity = 0;
        fadeIn(box , opacity)
    })
})