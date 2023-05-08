import * as TAG from './tagInfo.js'

const ID_ZOOM = 'zoom';
const ID_LINK = 'zm-link';
const ID_IMG = 'zm-img';
const TAG_COLLAPSE = TAG.COLLAPSE;
const TIME_FADE = 10;
const WIDTH_WINDOW = 800
const HEIGHT_WINDOW = WIDTH_WINDOW

document.addEventListener('DOMContentLoaded' , function(){
    showImages(TAG.MAIN , TAG.CLS_CONTENT , TAG.GALLERY_IMGS)
})

function showImages(tagContainer , tagContent , tagImages){
    const imgs = document.querySelectorAll(tagImages);
    imgs.forEach(img => {
        img.onclick = () => {
            const zoom = createZoom(ID_ZOOM , TAG_COLLAPSE , tagContainer , tagContent)
            const zoomLk = createLink(ID_LINK , img)
            const zoomImg = createImage(ID_IMG , img)
            zoom.appendChild(zoomLk);
            zoomLk.appendChild(zoomImg);
            mutationObserver(img , zoomLk , zoomImg)
        }
    })
}

function createZoom(id , cls , tagContainer , tagContent){
    const container = document.querySelector(tagContainer);
    const content = document.querySelector(tagContent);
    const zm = document.createElement('div');
    container.appendChild(zm);
    zm.id = id;
    zm.classList.add(cls)
    zm.style.right = getComputedStyle(content).right;
    fadeInOut(zm , TIME_FADE)
    return zm
}

function createLink(id , img){
    const l = document.createElement('a');
    l.id = id;
    l.href = '#';
    l.onclick = () => window.open(img.src , "_blank" , "width="+WIDTH_WINDOW+",height="+HEIGHT_WINDOW);
    return l
}

function createImage(id , img){
    const image = new Image();
    image.id = id;
    image.src = img.src;
    return image
}

function mutationObserver(img , zoomLk , zoomImg){
    new MutationObserver(muts => {
        muts.forEach(mut => {
            if (mut.type === 'attributes') zoomLk.href = zoomImg.src = img.src;
        })
    }).observe(img , {attributes: true});
}

function fadeInOut(el , delay){
    fadeIn(el , delay);
    el.onclick = () => fadeOut(el , delay);
}

function fadeIn(el , delay){
    if (el.style.opacity === '') el.style.opacity = '0';
    if (parseFloat(el.style.opacity) < 1) {
        setTimeout(() => {
            el.style.opacity = parseFloat(el.style.opacity) + 0.1;
            fadeIn(el , delay)
        } , delay)
    }
}

function fadeOut(el , delay){
    if (el.style.opacity === '') el.style.opacity = '1';
    if (parseFloat(el.style.opacity) > 0) {
        setTimeout(() => {
            el.style.opacity = parseFloat(el.style.opacity) - 0.1;
            fadeOut(el , delay)
        } , delay)
    } else {el.remove()}
}