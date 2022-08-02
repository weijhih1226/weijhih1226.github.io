window.addEventListener("DOMContentLoaded" , function(){
    var box = document.getElementById("box");
    window.addEventListener("mousemove" , function(){
        box.style.left = event.clientX + "px";
        box.style.top = event.clientY + "px";
        document.getElementById("fb_outer").addEventListener('mousemove' , function(){
            box.style.visibility = "visible";
        })
        document.getElementById("fb_outer").addEventListener('mouseout' , function(){
            box.style.visibility = "hidden";
        })
    })
})