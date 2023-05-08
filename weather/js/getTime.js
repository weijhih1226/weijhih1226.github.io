const MIN2MSEC = 60000;
const NOW_UTC = new Date().getTime();
const NOW_LST = NOW_UTC + 480 * MIN2MSEC;

const tOpt = {year: 'numeric', month: '2-digit', day: '2-digit', 
              hour: '2-digit', minute: '2-digit', hour12: false};

const HOME_CWB = 'https://www.cwb.gov.tw/Data/';
const HOME_CWB2 = 'https://npd.cwb.gov.tw/NPD/';
const HOME_T2 = 'https://typhoon2000.ph/multi/models/';
const URL_ERR = 'https://www.cwb.gov.tw/V8/assets/img/404_Yunbau.png';

const isoStrRn = new Date(NOW_LST - 10 * MIN2MSEC).toISOString();       /* 10 mins delay */
const isoStrRdr = new Date(NOW_LST - 13 * MIN2MSEC).toISOString();      /* 13 mins delay */
const isoStrSat = new Date(NOW_LST - 23 * MIN2MSEC).toISOString();      /* 23 mins delay */
const isoStrLtn = new Date(NOW_LST - 5 * MIN2MSEC).toISOString();       /* 5 mins delay */
const isoStrTemp = new Date(NOW_LST - 20 * MIN2MSEC).toISOString();     /* 20 mins delay */
const isoStrSkt = new Date(NOW_UTC - 180 * MIN2MSEC).toISOString();     /* 3 hrs delay */
const isoStrTyCWB = new Date(NOW_UTC - 120 * MIN2MSEC).toISOString();   /* 2 hrs delay */
const isoStrTyT2 = new Date(NOW_UTC - 240 * MIN2MSEC).toISOString();    /* 2 hrs delay */

let tDicRn = timeDic30Min(isoStrRn);
let tDicRdr = timeDic10Min(isoStrRdr);
let tDicLtn = timeDic5Min(isoStrLtn);
let tDicSat = timeDic10Min(isoStrSat);
let tDicTemp = timeDic1Hr(isoStrTemp);
let tDicSkt = timeDic12Hr(isoStrSkt);
let tDicTyCWB = timeDic6Hr(isoStrTyCWB);
let tDicTyT2 = timeDic12Hr(isoStrTyT2);

let tStrRn = datetimeDic2LSTStr(tDicRn);
let tStrRdr = datetimeDic2LSTStr(tDicRdr);
let tStrLtn = datetimeDic2LSTStr(tDicLtn);
let tStrSat = datetimeDic2LSTStr(tDicSat);
let tStrTemp = datetimeDic2LSTStr(tDicTemp);
let tStrUvi = '';
let tStrSkt = datetimeDic2UTCStr(tDicSkt);
let tStrTyCWB = datetimeDic2UTCStr(tDicTyCWB);
let tStrTyT2 = datetimeDic2UTCStr(tDicTyT2);

let tagRn = 'J'
let tagTyT2 = 'ALL';
let tagSatArea = 'TWI';
let tagSatVSgPx = '1350';
let tagSatVStPx = '1375';
let tagSatIRPx = '800';
let tagSkt = '46692';
let fcstTyCWB = 72;

let titleRn = '日雨量';
let titleRdr = '雷達';
let titleSatVSg = '衛星-可見光';
let titleSatVSt = '衛星-真實色';
let titleSatIRc = '衛星-彩色';
let titleSatIRe = '衛星-色調強化';
let titleLtn = '閃電';
let titleTemp = '氣溫';
let titleUvi = '紫外線指數';
let titleSkt = '探空-臺北';
let titleTyCWB = 'CWB颱風路徑';
let titleTyT2 = '各國颱風路徑';

let arrayTagRn = ['J' , 'T'];
let arrayTitleRn = ['日雨量' , '時雨量'];
let arrayTagSatArea = ['TWI' , 'LCC' , 'FDK'];
let arrayTagSatVSgPx = ['1350' , '2750' , '2750'];
let arrayTagSatVStPx = ['1375' , '2750' , '2750'];
let arrayTagSatIRPx = ['800' , '2750' , '2750'];
let arrayTagTyT2 = ['ALL' , 'ALL' , 'NCEP-GFS' , 'UKMO-UM' , 'CMC-GEM' , 'FNMOC-NAVGEM' , 'JMA-GSM'];
let arrayTitleTyT2 = ['各國颱風路徑' , '各國颱風路徑' , 'NCEP颱風路徑' , 'UK颱風路徑' , 'CMC颱風路徑' , 'FNMOC颱風路徑' , 'JMA颱風路徑'];
let arrayTagSkt = ['46692' , '46810' , '46699' , '46750' , '46734' , '46695' , '46780'];
let arrayTitleSkt = ['探空-臺北' , '探空-東沙' , '探空-花蓮' , '探空-屏東' , '探空-馬公' , '探空-彭佳嶼' , '探空-綠島'];

let urlRn = (dt , type) => HOME_CWB + 'rainfall/' + (dt.Y+'-'+dt.M+'-'+dt.D+'_'+dt.h+dt.m) + '.QZ' + type + '8.jpg';
let urlRdr = (dt) => HOME_CWB + 'radar/CV1_TW_3600_' + (dt.Y+dt.M+dt.D+dt.h+dt.m) + '.png';
let urlSatVSg = (dt , area , px) => HOME_CWB + 'satellite/' + area + '_VIS_Gray_' + px + '/' + area + '_VIS_Gray_' + px + '-' + (dt.Y+'-'+dt.M+'-'+dt.D+'-'+dt.h+'-'+dt.m) + '.jpg';
let urlSatVSt = (dt , area , px) => HOME_CWB + 'satellite/' + area + '_VIS_TRGB_' + px + '/' + area + '_VIS_TRGB_' + px + '-' + (dt.Y+'-'+dt.M+'-'+dt.D+'-'+dt.h+'-'+dt.m) + '.jpg';
let urlSatIRc = (dt , area , px) => HOME_CWB + 'satellite/' + area + '_IR1_CR_' + px + '/' + area + '_IR1_CR_' + px + '-' + (dt.Y+'-'+dt.M+'-'+dt.D+'-'+dt.h+'-'+dt.m) + '.jpg';
let urlSatIRe = (dt , area , px) => HOME_CWB + 'satellite/' + area + '_IR1_MB_' + px + '/' + area + '_IR1_MB_' + px + '-' + (dt.Y+'-'+dt.M+'-'+dt.D+'-'+dt.h+'-'+dt.m) + '.jpg';
let urlLtn = (dt) => HOME_CWB + 'lightning/' + (dt.Y+dt.M+dt.D+dt.h+dt.m) + '00_lgtl.jpg';
let urlTemp = (dt) => HOME_CWB + 'temperature/' + (dt.Y+'-'+dt.M+'-'+dt.D+'_'+dt.h) + '00.GTP8.jpg';
let urlSkt = (dt , stn) => HOME_CWB2 + 'irisme_data/Weather/SKEWT/SKW___000_' + (dt.Y.substring(2,4)+dt.M+dt.D+dt.h) + '_' + stn + '.gif';
let urlTyCWB = (dt , fcst) => HOME_CWB + 'typhoon/TY_NEWS/PTA_' + (dt.Y+dt.M+dt.D+dt.h) + '00-' + fcst + '_zhtw.png';
let urlTyT2 = (dt , mdl) => HOME_T2 + (dt.Y+dt.M+dt.D+dt.h) + '00_' + mdl + '.PNG';
let urlUvi = () => HOME_CWB + 'UVI/UVI.png';

window.addEventListener('DOMContentLoaded' , function(){
    const content = document.querySelector('.content');
    const menuRn = document.querySelector('#menu-rain');
    const menuSat = document.querySelector('#menu-sat');
    const menuTy = document.querySelector('#menu-ty');
    const menuSkt = document.querySelector('#menu-skt');

    // Default
    setProduct(content , '#rain' , titleRn , tStrRn , urlRn(tDicRn , tagRn));
    setProduct(content , '#radar' , titleRdr , tStrRdr , urlRdr(tDicRdr));
    setProduct(content , '#satvsg' , titleSatVSg , tStrSat , urlSatVSg(tDicSat , tagSatArea , tagSatVSgPx));
    setProduct(content , '#satvst' , titleSatVSt , tStrSat , urlSatVSt(tDicSat , tagSatArea , tagSatVStPx));
    setProduct(content , '#satirc' , titleSatIRc , tStrSat , urlSatIRc(tDicSat , tagSatArea , tagSatIRPx));
    setProduct(content , '#satire' , titleSatIRe , tStrSat , urlSatIRe(tDicSat , tagSatArea , tagSatIRPx));
    setProduct(content , '#lgtn' , titleLtn , tStrLtn , urlLtn(tDicLtn));
    setProduct(content , '#temp' , titleTemp , tStrTemp , urlTemp(tDicTemp));
    setProduct(content , '#uvi' , titleUvi , tStrUvi , urlUvi());
    setProduct(content , '#skt' , titleSkt , tStrSkt , urlSkt(tDicSkt , tagSkt));
    setProduct(content , '#ty-cwb' , titleTyCWB , tStrTyCWB , urlTyCWB(tDicTyCWB , fcstTyCWB));
    setProduct(content , '#ty-t2' , titleTyT2 , tStrTyT2 , urlTyT2(tDicTyT2 , tagTyT2));

    // Handle Error
    content.querySelector('#ty-cwb').querySelector('img').onerror = function(){
        if (fcstTyCWB > 0) {fcstTyCWB -= 12; this.src = urlTyCWB(tDicTyCWB , fcstTyCWB);}
        else this.src = URL_ERR;
    }
    content.querySelectorAll('img').forEach(img => img.onerror = () => img.src = URL_ERR);

    // Handle Click
    menuRn.querySelectorAll('.menu-rain-list').forEach((el , i) => {
        el.onclick = function(){
            titleRn = this.dataset.title;
            tagRn = this.dataset.urlTag;
            setProduct(content , '#rain' , titleRn , tStrRn , urlRn(tDicRn , tagRn));
        }
    })
    menuSat.querySelectorAll('.menu-sat-list').forEach((el , i) => {
        el.onclick = function(){
            tagSatArea = this.dataset.urlTagArea;
            tagSatVSgPx = this.dataset.urlTagVsGPx;
            tagSatVStPx = this.dataset.urlTagVsTPx;
            tagSatIRPx = this.dataset.urlTagIrPx;
            setProduct(content , '#satvsg' , titleSatVSg , tStrSat , urlSatVSg(tDicSat , tagSatArea , tagSatVSgPx));
            setProduct(content , '#satvst' , titleSatVSt , tStrSat , urlSatVSt(tDicSat , tagSatArea , tagSatVStPx));
            setProduct(content , '#satirc' , titleSatIRc , tStrSat , urlSatIRc(tDicSat , tagSatArea , tagSatIRPx));
            setProduct(content , '#satire' , titleSatIRe , tStrSat , urlSatIRe(tDicSat , tagSatArea , tagSatIRPx));
        }
    })
    menuTy.querySelectorAll('.menu-ty-list').forEach((el , i) => {
        el.onclick = function(){
            titleTyT2 = this.dataset.title;
            tagTyT2 = this.dataset.urlTag;
            setProduct(content , '#ty-t2' , titleTyT2 , tStrTyT2 , urlTyT2(tDicTyT2 , tagTyT2));
        }
    })
    menuSkt.querySelectorAll('.menu-skt-list').forEach((el , i) => {
        el.onclick = function(){
            titleSkt = this.dataset.title;
            tagSkt = this.dataset.urlTag;
            setProduct(content , '#skt' , titleSkt , tStrSkt , urlSkt(tDicSkt , tagSkt));
        }
    })
})

function timeDic(s){
    return {Y: s.substring(0, 4), M: s.substring(5, 7), D: s.substring(8, 10), 
            h: s.substring(11, 13), m: s.substring(14, 16)};
}
function timeDic5Min(s){
    s = s.substring(0, 4) + '-' + s.substring(5, 7) + '-' + s.substring(8, 10) + 'T' + s.substring(11, 13) + ':' + s.substring(14, 15) + (parseInt(s.substring(15, 16)) < 5 ? '0' : '5');
    return timeDic(s);
}
function timeDic10Min(s){
    s = s.substring(0, 4) + '-' + s.substring(5, 7) + '-' + s.substring(8, 10) + 'T' + s.substring(11, 13) + ':' + s.substring(14, 15) + '0';
    return timeDic(s);
}
function timeDic30Min(s){
    s = s.substring(0, 4) + '-' + s.substring(5, 7) + '-' + s.substring(8, 10) + 'T' + s.substring(11, 13) + ':' + (parseInt(s.substring(14, 15)) < 3 ? '0' : '3') + '0';
    return timeDic(s);
}
function timeDic1Hr(s){
    s = s.substring(0, 4) + '-' + s.substring(5, 7) + '-' + s.substring(8, 10) + 'T' + s.substring(11, 13) + ':00';
    return timeDic(s);
}
function timeDic6Hr(s){
    let sHr = parseInt(s.substring(11, 13));
    s = s.substring(0, 4) + '-' + s.substring(5, 7) + '-' + s.substring(8, 10) + 'T' + ((sHr < 6) ? '00' : (sHr < 12) ? '06' : (sHr < 18) ? '12' : '18') + ':00';
    return timeDic(s);
}
function timeDic12Hr(s){
    s = s.substring(0, 4) + '-' + s.substring(5, 7) + '-' + s.substring(8, 10) + 'T' + (parseInt(s.substring(11, 13)) < 12 ? '00' : '12') + ':00';
    return timeDic(s);
}

function datetimeDic2LSTStr(tDic){
    return tDic.Y + '/' + tDic.M + '/' + tDic.D + ' ' + tDic.h + ':' + tDic.m;
}
function datetimeDic2UTCStr(tDic){
    return tDic.Y + '/' + tDic.M + '/' + tDic.D + ' ' + tDic.h + 'Z';
}

function setProduct(parent , id , title , time , src){
    let product = parent.querySelector(id);
    product.querySelector('img').src = src;
    product.querySelector('img').title = title;
    product.querySelector('img').alt = title;
    product.querySelector('.title').innerText = title;
    product.querySelector('.time').innerText = time;
}