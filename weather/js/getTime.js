const tNum = 144 , tStep = 10 , min2msec = 60000;
const tNowUTC = new Date().getTime();
const tNowLST = tNowUTC + 480 * min2msec;

const isoStrRn = new Date(tNowLST - 10 * min2msec).toISOString();       /* 10 mins delay */
const isoStrRdr = new Date(tNowLST - 13 * min2msec).toISOString();      /* 13 mins delay */
const isoStrSat = new Date(tNowLST - 23 * min2msec).toISOString();      /* 23 mins delay */
const isoStrLtn = new Date(tNowLST - 5 * min2msec).toISOString();       /* 5 mins delay */
const isoStrTemp = new Date(tNowLST - 20 * min2msec).toISOString();     /* 20 mins delay */
const isoStrSkt = new Date(tNowUTC - 180 * min2msec).toISOString();     /* 3 hrs delay */
const isoStrTyCWB = new Date(tNowUTC - 120 * min2msec).toISOString();   /* 2 hrs delay */
const isoStrTyT2 = new Date(tNowUTC - 240 * min2msec).toISOString();    /* 2 hrs delay */
const isoHrTyCWB = parseInt(isoStrTyCWB.substring(11, 13));
const isoHrTyT2 = parseInt(isoStrTyT2.substring(11, 13));

const homeCWB = 'https://www.cwb.gov.tw/Data/';
const homeCWB2 = 'https://npd.cwb.gov.tw/NPD/';
const homeT2 = 'https://typhoon2000.ph/multi/models/';
const urlErr = 'https://www.cwb.gov.tw/V8/assets/img/404_Yunbau.png'

const tStrRn = isoStrRn.substring(0, 4) + '-' + isoStrRn.substring(5, 7) + '-' + isoStrRn.substring(8, 10) + '_' + isoStrRn.substring(11, 13) + (parseInt(isoStrRn.substring(14, 15)) < 3 ? '0' : '3') + '0';
const tStrRdr = isoStrRdr.substring(0, 4) + isoStrRdr.substring(5, 7) + isoStrRdr.substring(8, 10) + isoStrRdr.substring(11, 13) + isoStrRdr.substring(14, 15) + '0';
const tStrLtn = isoStrLtn.substring(0, 4) + isoStrLtn.substring(5, 7) + isoStrLtn.substring(8, 10) + isoStrLtn.substring(11, 13) + isoStrLtn.substring(14, 15) + '000';
const tStrSat = isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0';
const tStrTemp = isoStrTemp.substring(0, 4) + '-' + isoStrTemp.substring(5, 7) + '-' + isoStrTemp.substring(8, 10) + '_' + isoStrTemp.substring(11, 13) + '00';
const tStrSkt = isoStrSkt.substring(2, 4) + isoStrSkt.substring(5, 7) + isoStrSkt.substring(8, 10) + (parseInt(isoStrSkt.substring(11, 13)) < 12 ? '00' : '12');
const tStrTyCWB = isoStrTyCWB.substring(0, 4) + isoStrTyCWB.substring(5, 7) + isoStrTyCWB.substring(8, 10) + ((isoHrTyCWB < 6) ? '00' : (isoHrTyCWB < 12) ? '06' : (isoHrTyCWB < 18) ? '12' : '18') + '00';
const tStrTyT2 = isoStrTyT2.substring(0, 4) + isoStrTyT2.substring(5, 7) + isoStrTyT2.substring(8, 10) + ((isoHrTyT2 < 12) ? '00' : '12') + '00';

const tFmtRn = isoStrRn.substring(0, 4) + '/' + isoStrRn.substring(5, 7) + '/' + isoStrRn.substring(8, 10) + ' ' + isoStrRn.substring(11, 13) + ':' + (parseInt(isoStrRn.substring(14, 15)) < 3 ? '0' : '3') + '0'
const tFmtRdr = isoStrRdr.substring(0, 4) + '/' + isoStrRdr.substring(5, 7) + '/' + isoStrRdr.substring(8, 10) + ' ' + isoStrRdr.substring(11, 13) + ':' + isoStrRdr.substring(14, 15) + '0';
const tFmtLtn = isoStrLtn.substring(0, 4) + '/' + isoStrLtn.substring(5, 7) + '/' + isoStrLtn.substring(8, 10) + ' ' + isoStrLtn.substring(11, 13) + ':' + isoStrLtn.substring(14, 15) + '0';
const tFmtSat = isoStrSat.substring(0, 4) + '/' + isoStrSat.substring(5, 7) + '/' + isoStrSat.substring(8, 10) + ' ' + isoStrSat.substring(11, 13) + ':' + isoStrSat.substring(14, 15) + '0';
const tFmtTemp = isoStrTemp.substring(0, 4) + '/' + isoStrTemp.substring(5, 7) + '/' + isoStrTemp.substring(8, 10) + ' ' + isoStrTemp.substring(11, 13) + ':00';
const tFmtUvi = '';
const tFmtSkt = isoStrSkt.substring(0, 4) + '/' + isoStrSkt.substring(5, 7) + '/' + isoStrSkt.substring(8, 10) + ' ' + (parseInt(isoStrSkt.substring(11, 13)) < 12 ? '00' : '12') + ':00Z';
const tFmtTyCWB = isoStrTyCWB.substring(0, 4) + '/' + isoStrTyCWB.substring(5, 7) + '/' + isoStrTyCWB.substring(8, 10) + ' ' + ((isoHrTyCWB < 6) ? '00' : (isoHrTyCWB < 12) ? '06' : (isoHrTyCWB < 18) ? '12' : '18') + ':00Z';
const tFmtTyT2 = isoStrTyT2.substring(0, 4) + '/' + isoStrTyT2.substring(5, 7) + '/' + isoStrTyT2.substring(8, 10) + ' ' + (parseInt(isoStrTyT2.substring(11, 13)) < 12 ? '00' : '12') + ':00Z';

var rain , radar , lgtn;
var satvsg , satvst , satirc , satire;
var temp , uvi;
var skt;
var tyCWB , tyT2;

var tagRn = 'J';
var tagTyT2 = 'ALL';
var tagSatArea = 'TWI';
var tagSatVSgPx = '1350';
var tagSatVStPx = '1375';
var tagSatIRPx = '800';
var fcstTyCWB = 72;

const urlRn = homeCWB + 'rainfall/' + tStrRn + '.QZ' + tagRn + '8.jpg';
const urlRdr = homeCWB + 'radar/CV1_TW_3600_' + tStrRdr + '.png';
const urlLtn = homeCWB + 'lightning/' + tStrLtn + '_lgtl.jpg';
const urlSatVSg = homeCWB + 'satellite/' + tagSatArea + '_VIS_Gray_' + tagSatVSgPx + '/' + tagSatArea + '_VIS_Gray_' + tagSatVSgPx + '-' + tStrSat + '.jpg';
const urlSatVSt = homeCWB + 'satellite/' + tagSatArea + '_VIS_TRGB_' + tagSatVStPx + '/' + tagSatArea + '_VIS_TRGB_' + tagSatVStPx + '-' + tStrSat + '.jpg';
const urlSatIRc = homeCWB + 'satellite/' + tagSatArea + '_IR1_CR_' + tagSatIRPx + '/' + tagSatArea + '_IR1_CR_' + tagSatIRPx + '-' + tStrSat + '.jpg';
const urlSatIRe = homeCWB + 'satellite/' + tagSatArea + '_IR1_MB_' + tagSatIRPx + '/' + tagSatArea + '_IR1_MB_' + tagSatIRPx + '-' + tStrSat + '.jpg';
const urlTemp = homeCWB + 'temperature/' + tStrTemp + '.GTP8.jpg';
const urlUvi = homeCWB + 'UVI/UVI.png';
const urlSkt = homeCWB2 + 'irisme_data/Weather/SKEWT/SKW___000_' + tStrSkt + '_46692.gif';
const urlTyCWB = homeCWB + 'typhoon/TY_NEWS/PTA_' + tStrTyCWB + '-' + fcstTyCWB + '_zhtw.png';
const urlTyT2 = homeT2 + tStrTyT2 + '_' + tagTyT2 + '.PNG';

window.addEventListener("DOMContentLoaded" , function(){
    const content = document.querySelector(".content");
    const menu = document.querySelector("#menu");

    rain = content.querySelector("#rain");
    radar = content.querySelector("#radar");
    lgtn = content.querySelector("#lgtn");
    satvsg = content.querySelector("#satvsg");
    satvst = content.querySelector("#satvst");
    satirc = content.querySelector("#satirc");
    satire = content.querySelector("#satire");
    temp = content.querySelector("#temp");
    uvi = content.querySelector("#uvi");
    skt = content.querySelector("#skt");
    tyCWB = content.querySelector("#ty-cwb");
    tyT2 = content.querySelector("#ty-t2");

    tyCWB.querySelector('img').onerror = function() {
        if (fcstTyCWB > 0) {fcstTyCWB -= 12; this.src = homeCWB + "typhoon/TY_NEWS/PTA_" + tStrTyCWB + "-" + fcstTyCWB + "_zhtw.png";}
        else {this.src = urlErr;}
    }
    content.querySelectorAll('img').forEach(img => img.onerror = () => img.src = urlErr);

    rain.querySelector('.time').innerText = tFmtRn;
    radar.querySelector('.time').innerText = tFmtRdr;
    lgtn.querySelector('.time').innerText = tFmtLtn;
    satvsg.querySelector('.time').innerText = tFmtSat;
    satvst.querySelector('.time').innerText = tFmtSat;
    satirc.querySelector('.time').innerText = tFmtSat;
    satire.querySelector('.time').innerText = tFmtSat;
    temp.querySelector('.time').innerText = tFmtTemp;
    uvi.querySelector('.time').innerText = tFmtUvi;
    skt.querySelector('.time').innerText = tFmtSkt;
    tyCWB.querySelector('.time').innerText = tFmtTyCWB;
    tyT2.querySelector('.time').innerText = tFmtTyT2;

    rain.querySelector('img').src = urlRn;
    radar.querySelector('img').src = urlRdr;
    lgtn.querySelector('img').src = urlLtn;
    satvsg.querySelector('img').src = urlSatVSg;
    satvst.querySelector('img').src = urlSatVSt;
    satirc.querySelector('img').src = urlSatIRc;
    satire.querySelector('img').src = urlSatIRe;
    temp.querySelector('img').src = urlTemp;
    uvi.querySelector('img').src = urlUvi;
    skt.querySelector('img').src = urlSkt;
    tyCWB.querySelector('img').src = urlTyCWB;
    tyT2.querySelector('img').src = urlTyT2;

    menu.querySelector("#rain-d").addEventListener('click' , function(){
        tagRn = 'J';
        rain.querySelector('img').src = homeCWB + 'rainfall/' + isoStrRn.substring(0, 4) + '-' + isoStrRn.substring(5, 7) + '-' + isoStrRn.substring(8, 10) + '_' + isoStrRn.substring(11, 13) + (parseInt(isoStrRn.substring(14, 15)) < 3 ? '0' : '3') + '0.QZ' + tagRn + '8.jpg';
        rain.querySelector('img').title = 'Rainfall Daily';
        rain.querySelector('img').alt = 'Rainfall Daily';
        rain.querySelector('.title').innerText = '日雨量';
    })
    menu.querySelector("#rain-h").addEventListener('click' , function(){
        tagRn = 'T';
        rain.querySelector('img').src = homeCWB + 'rainfall/' + isoStrRn.substring(0, 4) + '-' + isoStrRn.substring(5, 7) + '-' + isoStrRn.substring(8, 10) + '_' + isoStrRn.substring(11, 13) + (parseInt(isoStrRn.substring(14, 15)) < 3 ? '0' : '3') + '0.QZ' + tagRn + '8.jpg';
        rain.querySelector('img').title = 'Rainfall Hourly';
        rain.querySelector('img').alt = 'Rainfall Hourly';
        rain.querySelector('.title').innerText = '時雨量';
    })
    menu.querySelector("#sat-tw").addEventListener('click' , function(){
        tagSatArea = 'TWI';
        tagSatVSgPx = '1350';
        tagSatVStPx = '1375';
        tagSatIRPx = '800';
        satvsg.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_VIS_Gray_' + tagSatVSgPx + '/' + tagSatArea + '_VIS_Gray_' + tagSatVSgPx + '-' + isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0.jpg';
        satvst.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_VIS_TRGB_' + tagSatVStPx + '/' + tagSatArea + '_VIS_TRGB_' + tagSatVStPx + '-' + isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0.jpg';
        satirc.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_IR1_CR_' + tagSatIRPx + '/' + tagSatArea + '_IR1_CR_' + tagSatIRPx + '-' + isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0.jpg';
        satire.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_IR1_MB_' + tagSatIRPx + '/' + tagSatArea + '_IR1_MB_' + tagSatIRPx + '-' + isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0.jpg';
    })
    menu.querySelector("#sat-ea").addEventListener('click' , function(){
        tagSatArea = 'LCC';
        tagSatVSgPx = '2750';
        tagSatVStPx = '2750';
        tagSatIRPx = '2750';
        satvsg.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_VIS_Gray_' + tagSatVSgPx + '/' + tagSatArea + '_VIS_Gray_' + tagSatVSgPx + '-' + isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0.jpg';
        satvst.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_VIS_TRGB_' + tagSatVStPx + '/' + tagSatArea + '_VIS_TRGB_' + tagSatVStPx + '-' + isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0.jpg';
        satirc.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_IR1_CR_' + tagSatIRPx + '/' + tagSatArea + '_IR1_CR_' + tagSatIRPx + '-' + isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0.jpg';
        satire.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_IR1_MB_' + tagSatIRPx + '/' + tagSatArea + '_IR1_MB_' + tagSatIRPx + '-' + isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0.jpg';
    })
    menu.querySelector("#sat-gb").addEventListener('click' , function(){
        tagSatArea = 'FDK';
        tagSatVSgPx = '2750';
        tagSatVStPx = '2750';
        tagSatIRPx = '2750';
        satvsg.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_VIS_Gray_' + tagSatVSgPx + '/' + tagSatArea + '_VIS_Gray_' + tagSatVSgPx + '-' + isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0.jpg';
        satvst.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_VIS_TRGB_' + tagSatVStPx + '/' + tagSatArea + '_VIS_TRGB_' + tagSatVStPx + '-' + isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0.jpg';
        satirc.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_IR1_CR_' + tagSatIRPx + '/' + tagSatArea + '_IR1_CR_' + tagSatIRPx + '-' + isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0.jpg';
        satire.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_IR1_MB_' + tagSatIRPx + '/' + tagSatArea + '_IR1_MB_' + tagSatIRPx + '-' + isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0.jpg';
    })
    menu.querySelector("#ty-all").addEventListener('click' , function(){
        tagTyT2 = 'ALL';
        tyT2.querySelector('img').src = homeT2 + tStrTyT2 + '_' + tagTyT2 + '.PNG';
        tyT2.querySelector('.title').innerText = '各國颱風路徑';
    })
    menu.querySelector("#ty-ec").addEventListener('click' , function(){
        tagTyT2 = 'ALL';
        tyT2.querySelector('img').src = homeT2 + tStrTyT2 + '_' + tagTyT2 + '.PNG';
        tyT2.querySelector('.title').innerText = '各國颱風路徑';
    })
    menu.querySelector("#ty-ncep").addEventListener('click' , function(){
        tagTyT2 = 'NCEP-GFS';
        tyT2.querySelector('img').src = homeT2 + tStrTyT2 + '_' + tagTyT2 + '.PNG';
        tyT2.querySelector('.title').innerText = 'NCEP颱風路徑';
    })
    menu.querySelector("#ty-uk").addEventListener('click' , function(){
        tagTyT2 = 'UKMO-UM';
        tyT2.querySelector('img').src = homeT2 + tStrTyT2 + '_' + tagTyT2 + '.PNG';
        tyT2.querySelector('.title').innerText = 'UK颱風路徑';
    })
    menu.querySelector("#ty-cmc").addEventListener('click' , function(){
        tagTyT2 = 'CMC-GEM';
        tyT2.querySelector('img').src = homeT2 + tStrTyT2 + '_' + tagTyT2 + '.PNG';
        tyT2.querySelector('.title').innerText = 'CMC颱風路徑';
    })
    menu.querySelector("#ty-fnmoc").addEventListener('click' , function(){
        tagTyT2 = 'FNMOC-NAVGEM';
        tyT2.querySelector('img').src = homeT2 + tStrTyT2 + '_' + tagTyT2 + '.PNG';
        tyT2.querySelector('.title').innerText = 'FNMOC颱風路徑';
    })
    menu.querySelector("#ty-jma").addEventListener('click' , function(){
        tagTyT2 = 'JMA-GSM';
        tyT2.querySelector('img').src = homeT2 + tStrTyT2 + '_' + tagTyT2 + '.PNG';
        tyT2.querySelector('.title').innerText = 'JMA颱風路徑';
    })

    var pics = document.querySelectorAll('.content>div>.pic>a');
    content.style.right = '300px';
    var enlargeUrl = []
    for (i = 0 ; i < pics.length ; i++) {
        enlargeUrl.push(pics[i].querySelector('img').src);
        
        pics[i].addEventListener('click' , function() {
            var opacity = 0;
            var enlarge = document.createElement('div');
            enlarge.style.opacity = '0';
            fadeIn(enlarge , opacity , 10);
            enlarge.setAttribute('id' , 'enlarge');
            enlarge.style.left = '0';
            enlarge.style.right = content.style.right;
            enlarge.style.top = '0';
            enlarge.style.bottom = '0';
            enlarge.style.position = 'absolute';
            enlarge.style.display = 'flex';
            enlarge.style.justifyContent = 'center';
            enlarge.style.alignItems = 'center';
            enlarge.style.flexWrap = 'wrap';
            enlarge.style.overflow = 'auto';
            enlarge.style.backgroundColor = 'rgba(0 , 0 , 0 , .8)';
            document.querySelector('main').appendChild(enlarge);

            var enlargeImg = new Image();
            var originImg = this.querySelector('img');
            enlargeImg.setAttribute('id' , 'enlargeImg');
            enlargeImg.src = originImg.src;
            enlargeImg.style.height = '90%';
            enlargeImg.style.position = 'absolute';
            enlargeImg.style.overflow = 'auto';
            enlarge.appendChild(enlargeImg)
            enlarge.addEventListener('click' , function() {var opacity = 1; fadeOut(this , opacity , 10);})

            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === "attributes") {
                        enlargeImg.src = originImg.src;
                    }
                });
            });
            observer.observe(originImg , {attributes: true});
        })
    }
    
    addElementTimeLi('.time-list' , tNowLST , tNum , tStep);

    // fetch(document.querySelector("#rain>img").src, {method: 'get'})
    // .then(function(response) {
    //     console.log(response)
    // }).catch(function(err) {
    //     console.log(err)
    // })

    // var xhr = new XMLHttpRequest();

    // xhr.open('GET', homeCWB + "rainfall/" + filenameG + ".QZJ8.jpg");
    // // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader('Content-Type', 'image/jpeg');
    // xhr.responseType = "image";
    // xhr.send(null);
    // console.log(xhr)
    // try { // statements to try
    //     document.querySelector("#rain>img").src = homeCWB + "rainfall/" + filenameG + ".QZJ81.jpg";
    // }
    // catch (e) {
    //     console.log(e); // 將例外傳至例外處理機制
    // }
    

    // console.log(NetPing(document.querySelector("#rain>img").src))
    // console.log(getHttpRequest(document.querySelector("#rain>img").src))

})

// function CheckStatus(url){
//     xh = new ActiveXObject("Microsoft.XMLHTTP")
//     xh.open("HEAD" , url , false)
//     xh.send()
//     return XMLHTTP.status==200
// }

// function NetPing(){
//     return CheckStatus(url);
// }

function addElementTimeLi(obj_p , tNowLST , tNum , tStep) {
    var obj_p = document.querySelector(obj_p);
    for (var t = 0; t < tNum; t++) {
        const li = addElementLi(obj_p , tNowLST , t , tStep);
        li.addEventListener('mouseover' , function() {
            $(this).siblings().css({'background-color' : 'rgba(37, 45, 56, 1)'});
            $(this).css({'background-color' : 'rgba(74, 90, 112, 1)'});
        })
    }
}

function addElementLi(obj_p , tNowLST , t , tStep) {
    const isoStr = new Date((tNowLST - t * tStep * min2msec)).toISOString();
    const isoUTCStr = new Date((tNowLST - (480 + t * tStep) * min2msec)).toISOString();
    const YYYY = isoStr.substring(0, 4) , MM = isoStr.substring(5, 7) , DD = isoStr.substring(8, 10);
    const hh = isoStr.substring(11, 13) , mm = isoStr.substring(14, 15) + '0';
    const YYYYUTC = isoUTCStr.substring(0, 4) , YYUTC = isoUTCStr.substring(2, 4) , MMUTC = isoUTCStr.substring(5, 7) , DDUTC = isoUTCStr.substring(8, 10);
    const hhUTC = isoUTCStr.substring(11, 13);
    
    const id = YYYY + MM + DD + '_' + hh + mm;
    const timeHTML = YYYY + '/' + MM + '/' + DD + ' ' + hh + ':' + mm;
    const tStrRn = YYYY + '-' + MM + '-' + DD + '_' + hh + ((parseInt(mm) < 30) ? '0' : '3') + '0';
    const tStrRdr = YYYY + MM + DD + hh + mm;
    const tStrLtn = YYYY + MM + DD + hh + mm + '00';
    const tStrSat = YYYY + '-' + MM + '-' + DD + '-' + hh + '-' + mm;
    const tStrTemp = YYYY + '-' + MM + '-' + DD + '_' + hh + '00';
    const tStrSkt = YYUTC + MMUTC + DDUTC + ((parseInt(hhUTC) < 12) ? '00' : '12');

    const tFmt10 = YYYY + '/' + MM + '/' + DD + ' ' + hh + ':' + mm;
    const tFmt30 = YYYY + '/' + MM + '/' + DD + ' ' + hh + ':' + (parseInt(mm) < 30 ? '0' : '3') + '0';
    const tFmt60 = YYYY + '/' + MM + '/' + DD + ' ' + hh + ':00';
    const tFmt12 = YYYYUTC + '/' + MMUTC + '/' + DDUTC + ' ' + ((parseInt(hhUTC) < 12) ? '00' : '12') + ':00Z';

    const li = document.createElement('li');
    li.setAttribute('id' , id);
    li.innerHTML = '<a href="#">' + timeHTML + '</a>';
    li.addEventListener('mouseover' , function() {
        rain.querySelector('.time').innerText = tFmt30;
        radar.querySelector('.time').innerText = tFmt10;
        lgtn.querySelector('.time').innerText = tFmt10;
        satvsg.querySelector('.time').innerText = tFmt10;
        satvst.querySelector('.time').innerText = tFmt10;
        satirc.querySelector('.time').innerText = tFmt10;
        satire.querySelector('.time').innerText = tFmt10;
        temp.querySelector('.time').innerText = tFmt60;
        uvi.querySelector('.time').innerText = '';
        skt.querySelector('.time').innerText = tFmt12;

        rain.querySelector('img').src = homeCWB + 'rainfall/' + tStrRn + '.QZ' + tagRn + '8.jpg';
        radar.querySelector('img').src = homeCWB + 'radar/CV1_TW_3600_' + tStrRdr + '.png';
        lgtn.querySelector('img').src = homeCWB + 'lightning/' + tStrLtn + '_lgtl.jpg';
        satvsg.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_VIS_Gray_' + tagSatVSgPx + '/' + tagSatArea + '_VIS_Gray_' + tagSatVSgPx + '-' + tStrSat + '.jpg';
        satvst.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_VIS_TRGB_' + tagSatVStPx + '/' + tagSatArea + '_VIS_TRGB_' + tagSatVStPx + '-' + tStrSat + '.jpg';
        satirc.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_IR1_CR_' + tagSatIRPx + '/' + tagSatArea + '_IR1_CR_' + tagSatIRPx + '-' + tStrSat + '.jpg';
        satire.querySelector('img').src = homeCWB + 'satellite/' + tagSatArea + '_IR1_MB_' + tagSatIRPx + '/' + tagSatArea + '_IR1_MB_' + tagSatIRPx + '-' + tStrSat + '.jpg';
        temp.querySelector('img').src = homeCWB + 'temperature/' + tStrTemp + '.GTP8.jpg';
        skt.querySelector('img').src = homeCWB2 + 'irisme_data/Weather/SKEWT/SKW___000_' + tStrSkt + '_46692.gif';
    })
    obj_p.appendChild(li);
    return li
}

function getHttpRequest(url) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET' , url , true)
    // xhr.onload = function() {
    //     if (xhr.status >= 200 && xhr.status < 400) {
    //       console.log(xhr.responseText);    // Success!
    //     }
    // };
    xhr.send(null)
    return xhr;
}


function NetPing(url) {
    $.ajax({
        type: "GET",
        cache: false,
        url: url,
        data: "",
        success: function() {
            Done(1);
        },
        error: function() {
            Done(0);
        }
    });
}

function fadeIn(el , opacity , delay) {
    if (opacity < 1) {
        setTimeout(function() {
            opacity += 0.1;
            el.style.opacity = opacity;
            fadeIn(el , opacity , delay)
        } , delay)
    }
}

function fadeOut(el , opacity , delay) {
    if (opacity > 0) {
        setTimeout(function() {
        opacity -= 0.1;
        el.style.opacity = opacity;
        fadeOut(el , opacity , delay)
        } , delay)
    } else {el.remove()}
}