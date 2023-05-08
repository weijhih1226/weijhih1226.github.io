document.addEventListener('DOMContentLoaded' , function(){
    const menuRn = document.querySelector('#menu-rain');
    const menuSat = document.querySelector('#menu-sat');
    const menuTy = document.querySelector('#menu-ty');
    const menuSkt = document.querySelector('#menu-skt');

    menuRn.querySelector('#rain-d').setAttribute('data-title' , '日雨量');
    menuRn.querySelector('#rain-h').setAttribute('data-title' , '時雨量');

    menuRn.querySelector('#rain-d').setAttribute('data-url-tag' , 'J');
    menuRn.querySelector('#rain-h').setAttribute('data-url-tag' , 'T');

    menuSat.querySelector('#sat-tw').setAttribute('data-url-tag-area' , 'TWI');
    menuSat.querySelector('#sat-ea').setAttribute('data-url-tag-area' , 'LCC');
    menuSat.querySelector('#sat-gb').setAttribute('data-url-tag-area' , 'FDK');

    menuSat.querySelector('#sat-tw').setAttribute('data-url-tag-vs-g-px' , '1350');
    menuSat.querySelector('#sat-ea').setAttribute('data-url-tag-vs-g-px' , '2750');
    menuSat.querySelector('#sat-gb').setAttribute('data-url-tag-vs-g-px' , '2750');

    menuSat.querySelector('#sat-tw').setAttribute('data-url-tag-vs-t-px' , '1375');
    menuSat.querySelector('#sat-ea').setAttribute('data-url-tag-vs-t-px' , '2750');
    menuSat.querySelector('#sat-gb').setAttribute('data-url-tag-vs-t-px' , '2750');

    menuSat.querySelector('#sat-tw').setAttribute('data-url-tag-ir-px' , '800');
    menuSat.querySelector('#sat-ea').setAttribute('data-url-tag-ir-px' , '2750');
    menuSat.querySelector('#sat-gb').setAttribute('data-url-tag-ir-px' , '2750');

    menuTy.querySelector('#ty-all').setAttribute('data-title' , '各國颱風路徑');
    menuTy.querySelector('#ty-ec').setAttribute('data-title' , '各國颱風路徑');
    menuTy.querySelector('#ty-ncep').setAttribute('data-title' , 'NCEP颱風路徑');
    menuTy.querySelector('#ty-uk').setAttribute('data-title' , 'UK颱風路徑');
    menuTy.querySelector('#ty-cmc').setAttribute('data-title' , 'CMC颱風路徑');
    menuTy.querySelector('#ty-fnmoc').setAttribute('data-title' , 'FNMOC颱風路徑');
    menuTy.querySelector('#ty-jma').setAttribute('data-title' , 'JMA颱風路徑');

    menuTy.querySelector('#ty-all').setAttribute('data-url-tag' , 'ALL');
    menuTy.querySelector('#ty-ec').setAttribute('data-url-tag' , 'ALL');
    menuTy.querySelector('#ty-ncep').setAttribute('data-url-tag' , 'NCEP-GFS');
    menuTy.querySelector('#ty-uk').setAttribute('data-url-tag' , 'UKMO-UM');
    menuTy.querySelector('#ty-cmc').setAttribute('data-url-tag' , 'CMC-GEM');
    menuTy.querySelector('#ty-fnmoc').setAttribute('data-url-tag' , 'FNMOC-NAVGEM');
    menuTy.querySelector('#ty-jma').setAttribute('data-url-tag' , 'JMA-GSM');

    menuSkt.querySelector('#skt-tp').setAttribute('data-title' , '探空-臺北');
    menuSkt.querySelector('#skt-ds').setAttribute('data-title' , '探空-東沙');
    menuSkt.querySelector('#skt-hl').setAttribute('data-title' , '探空-花蓮');
    menuSkt.querySelector('#skt-pt').setAttribute('data-title' , '探空-屏東');
    menuSkt.querySelector('#skt-mk').setAttribute('data-title' , '探空-馬公');
    menuSkt.querySelector('#skt-pj').setAttribute('data-title' , '探空-彭佳嶼');
    menuSkt.querySelector('#skt-gi').setAttribute('data-title' , '探空-綠島');

    menuSkt.querySelector('#skt-tp').setAttribute('data-url-tag' , '46692');
    menuSkt.querySelector('#skt-ds').setAttribute('data-url-tag' , '46810');
    menuSkt.querySelector('#skt-hl').setAttribute('data-url-tag' , '46699');
    menuSkt.querySelector('#skt-pt').setAttribute('data-url-tag' , '46750');
    menuSkt.querySelector('#skt-mk').setAttribute('data-url-tag' , '46734');
    menuSkt.querySelector('#skt-pj').setAttribute('data-url-tag' , '46695');
    menuSkt.querySelector('#skt-gi').setAttribute('data-url-tag' , '46780');
})