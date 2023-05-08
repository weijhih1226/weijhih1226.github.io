import * as TAG from './tagInfo.js'

const SCROLL_PX = 100;
const SPEED = 300;

let goTopJudge = function(){
    if ($(this).scrollTop() > SCROLL_PX) $(this).children(TAG.CLS_BTN_GOTOP).addClass("show");
    else $(this).children(TAG.BTN_GOTOP).removeClass("show");
}

let goTop = function(tagsCtn , tagBtn , speed){
    tagsCtn.forEach(tagCtn => {
        $(tagCtn).scroll(goTopJudge);
    });
    $(tagBtn).click(function(){
        $(this).parent().animate({scrollTop: 0} , speed);
    });
    Waves.attach(tagBtn, ['waves-light']);
    Waves.init();
}

$(document).ready(function(){
    $(TAG.MENU_LIST_TITLE).click(function(){
        $(this).siblings(".inmenu").slideToggle();
    });
    const tagsCtn = [TAG.CLS_SIDEMENU , TAG.CLS_CONTENT]
    goTop(tagsCtn , TAG.CLS_BTN_GOTOP , SPEED)

    // $(TAG.CLS_SIDEMENU).scroll(goTopJudge);
    // $(TAG.CLS_CONTENT).scroll(goTopJudge);
    // $(TAG.CLS_BTN_GOTOP).click(function(){
    //     $(this).parent().animate({scrollTop: 0} , 300);
    // });
    // Waves.attach(TAG.CLS_BTN_GOTOP, ['waves-light']);
    // Waves.init();
});