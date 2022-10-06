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

var tStrRn = isoStrRn.substring(0, 4) + '-' + isoStrRn.substring(5, 7) + '-' + isoStrRn.substring(8, 10) + '_' + isoStrRn.substring(11, 13) + (parseInt(isoStrRn.substring(14, 15)) < 3 ? '0' : '3') + '0';
var tStrRdr = isoStrRdr.substring(0, 4) + isoStrRdr.substring(5, 7) + isoStrRdr.substring(8, 10) + isoStrRdr.substring(11, 13) + isoStrRdr.substring(14, 15) + '0';
var tStrLtn = isoStrLtn.substring(0, 4) + isoStrLtn.substring(5, 7) + isoStrLtn.substring(8, 10) + isoStrLtn.substring(11, 13) + isoStrLtn.substring(14, 15) + '000';
var tStrSat = isoStrSat.substring(0, 4) + '-' + isoStrSat.substring(5, 7) + '-' + isoStrSat.substring(8, 10) + '-' + isoStrSat.substring(11, 13) + '-' + isoStrSat.substring(14, 15) + '0';
var tStrTemp = isoStrTemp.substring(0, 4) + '-' + isoStrTemp.substring(5, 7) + '-' + isoStrTemp.substring(8, 10) + '_' + isoStrTemp.substring(11, 13) + '00';
var tStrSkt = isoStrSkt.substring(2, 4) + isoStrSkt.substring(5, 7) + isoStrSkt.substring(8, 10) + (parseInt(isoStrSkt.substring(11, 13)) < 12 ? '00' : '12');
var tStrTyCWB = isoStrTyCWB.substring(0, 4) + isoStrTyCWB.substring(5, 7) + isoStrTyCWB.substring(8, 10) + ((isoHrTyCWB < 6) ? '00' : (isoHrTyCWB < 12) ? '06' : (isoHrTyCWB < 18) ? '12' : '18') + '00';
var tStrTyT2 = isoStrTyT2.substring(0, 4) + isoStrTyT2.substring(5, 7) + isoStrTyT2.substring(8, 10) + ((isoHrTyT2 < 12) ? '00' : '12') + '00';

const tFmtRn = isoStrRn.substring(0, 4) + '/' + isoStrRn.substring(5, 7) + '/' + isoStrRn.substring(8, 10) + ' ' + isoStrRn.substring(11, 13) + ':' + (parseInt(isoStrRn.substring(14, 15)) < 3 ? '0' : '3') + '0'
const tFmtRdr = isoStrRdr.substring(0, 4) + '/' + isoStrRdr.substring(5, 7) + '/' + isoStrRdr.substring(8, 10) + ' ' + isoStrRdr.substring(11, 13) + ':' + isoStrRdr.substring(14, 15) + '0';
const tFmtLtn = isoStrLtn.substring(0, 4) + '/' + isoStrLtn.substring(5, 7) + '/' + isoStrLtn.substring(8, 10) + ' ' + isoStrLtn.substring(11, 13) + ':' + isoStrLtn.substring(14, 15) + '0';
const tFmtSat = isoStrSat.substring(0, 4) + '/' + isoStrSat.substring(5, 7) + '/' + isoStrSat.substring(8, 10) + ' ' + isoStrSat.substring(11, 13) + ':' + isoStrSat.substring(14, 15) + '0';
const tFmtTemp = isoStrTemp.substring(0, 4) + '/' + isoStrTemp.substring(5, 7) + '/' + isoStrTemp.substring(8, 10) + ' ' + isoStrTemp.substring(11, 13) + ':00';
const tFmtUvi = '';
const tFmtSkt = isoStrSkt.substring(0, 4) + '/' + isoStrSkt.substring(5, 7) + '/' + isoStrSkt.substring(8, 10) + ' ' + (parseInt(isoStrSkt.substring(11, 13)) < 12 ? '00' : '12') + 'Z';
const tFmtTyCWB = isoStrTyCWB.substring(0, 4) + '/' + isoStrTyCWB.substring(5, 7) + '/' + isoStrTyCWB.substring(8, 10) + ' ' + ((isoHrTyCWB < 6) ? '00' : (isoHrTyCWB < 12) ? '06' : (isoHrTyCWB < 18) ? '12' : '18') + 'Z';
const tFmtTyT2 = isoStrTyT2.substring(0, 4) + '/' + isoStrTyT2.substring(5, 7) + '/' + isoStrTyT2.substring(8, 10) + ' ' + (parseInt(isoStrTyT2.substring(11, 13)) < 12 ? '00' : '12') + 'Z';

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

urlRn = (t , type) => homeCWB + 'rainfall/' + t + '.QZ' + type + '8.jpg';
urlRdr = (t) => homeCWB + 'radar/CV1_TW_3600_' + t + '.png';
urlLtn = (t) => homeCWB + 'lightning/' + t + '_lgtl.jpg';
urlSatVSg = (t , area , px) => homeCWB + 'satellite/' + area + '_VIS_Gray_' + px + '/' + area + '_VIS_Gray_' + px + '-' + t + '.jpg';
urlSatVSt = (t , area , px) => homeCWB + 'satellite/' + area + '_VIS_TRGB_' + px + '/' + area + '_VIS_TRGB_' + px + '-' + t + '.jpg';
urlSatIRc = (t , area , px) => homeCWB + 'satellite/' + area + '_IR1_CR_' + px + '/' + area + '_IR1_CR_' + px + '-' + t + '.jpg';
urlSatIRe = (t , area , px) => homeCWB + 'satellite/' + area + '_IR1_MB_' + px + '/' + area + '_IR1_MB_' + px + '-' + t + '.jpg';
urlTemp = (t) => homeCWB + 'temperature/' + t + '.GTP8.jpg';
urlUvi = () => homeCWB + 'UVI/UVI.png';
urlSkt = (t) => homeCWB2 + 'irisme_data/Weather/SKEWT/SKW___000_' + t + '_46692.gif';
urlTyCWB = (t , fcst) => homeCWB + 'typhoon/TY_NEWS/PTA_' + t + '-' + fcst + '_zhtw.png';
urlTyT2 = (t , mdl) => homeT2 + t + '_' + mdl + '.PNG';

window.addEventListener('DOMContentLoaded' , function(){
    const content = document.querySelector('.content');
    const menu = document.querySelector('#menu');
    content.style.right = '300px';
    addElementTimeLi('.time-list' , tNowLST , tNum , tStep);

    rain = content.querySelector('#rain');
    radar = content.querySelector('#radar');
    lgtn = content.querySelector('#lgtn');
    satvsg = content.querySelector('#satvsg');
    satvst = content.querySelector('#satvst');
    satirc = content.querySelector('#satirc');
    satire = content.querySelector('#satire');
    temp = content.querySelector('#temp');
    uvi = content.querySelector('#uvi');
    skt = content.querySelector('#skt');
    tyCWB = content.querySelector('#ty-cwb');
    tyT2 = content.querySelector('#ty-t2');

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

    rain.querySelector('img').src = urlRn(tStrRn , tagRn);
    radar.querySelector('img').src = urlRdr(tStrRdr);
    lgtn.querySelector('img').src = urlLtn(tStrLtn);
    satvsg.querySelector('img').src = urlSatVSg(tStrSat , tagSatArea , tagSatVSgPx);
    satvst.querySelector('img').src = urlSatVSt(tStrSat , tagSatArea , tagSatVStPx);
    satirc.querySelector('img').src = urlSatIRc(tStrSat , tagSatArea , tagSatIRPx);
    satire.querySelector('img').src = urlSatIRe(tStrSat , tagSatArea , tagSatIRPx);
    temp.querySelector('img').src = urlTemp(tStrTemp);
    uvi.querySelector('img').src = urlUvi();
    skt.querySelector('img').src = urlSkt(tStrSkt);
    tyCWB.querySelector('img').src = urlTyCWB(tStrTyCWB , fcstTyCWB);
    tyT2.querySelector('img').src = urlTyT2(tStrTyT2 , tagTyT2);

    // Handle Error
    tyCWB.querySelector('img').onerror = function() {
        if (fcstTyCWB > 0) {fcstTyCWB -= 12; this.src = urlTyCWB(tStrTyCWB , fcstTyCWB);}
        else {this.src = urlErr}
    }
    content.querySelectorAll('img').forEach(img => img.onerror = () => img.src = urlErr);

    // Handle Click
    const imgs = content.querySelectorAll('div>.pic>a>img');
    imgs.forEach(img => {
        img.onclick = () => {
            const oriImg = img;
            const zoomBg = document.createElement('div');
            const zoomLk = document.createElement('a');
            const zoomImg = new Image();
            const zoomBgS = zoomBg.style;
            const zoomLkS = zoomLk.style;
            const zoomImgS = zoomImg.style;
            document.querySelector('main').appendChild(zoomBg);
            zoomBg.appendChild(zoomLk);
            zoomLk.appendChild(zoomImg);

            fadeIn(zoomBg , 10);
            zoomBg.onclick = () => fadeOut(zoomBg , 10);
            new MutationObserver(muts => {
                muts.forEach(mut => {
                    if (mut.type === 'attributes') zoomImg.src = oriImg.src;
                })
            }).observe(oriImg , {attributes: true});

            zoomBg.id = 'zoomBg';
            zoomBgS.left = '0';
            zoomBgS.right = content.style.right;
            zoomBgS.top = '0';
            zoomBgS.bottom = '0';
            zoomBgS.position = 'absolute';
            zoomBgS.display = 'flex';
            zoomBgS.justifyContent = 'center';
            zoomBgS.alignItems = 'center';
            zoomBgS.flexWrap = 'wrap';
            zoomBgS.overflow = 'auto';
            zoomBgS.backgroundColor = 'rgba(0 , 0 , 0 , .8)';
            zoomLk.id = 'zoomLk';
            // zoomLk.href = originImg.src;
            // zoomLk.target = '_blank';
            zoomLkS.height = '90%';
            zoomLkS.position = 'absolute';
            zoomLkS.display = 'flex';
            zoomLkS.justifyContent = 'center';
            zoomLkS.alignItems = 'center';
            zoomImg.id = 'zoomImg';
            zoomImg.src = oriImg.src;
            zoomImgS.height = '100%';
        }
    })

    menu.querySelector('#rain-d').onclick = () => {
        tagRn = 'J';
        rain.querySelector('img').src = urlRn(tStrRn , tagRn);
        rain.querySelector('img').title = 'Rainfall Daily';
        rain.querySelector('img').alt = 'Rainfall Daily';
        rain.querySelector('.title').innerText = '日雨量';
    }
    menu.querySelector('#rain-h').onclick = () => {
        tagRn = 'T';
        rain.querySelector('img').src = urlRn(tStrRn , tagRn);
        rain.querySelector('img').title = 'Rainfall Hourly';
        rain.querySelector('img').alt = 'Rainfall Hourly';
        rain.querySelector('.title').innerText = '時雨量';
    }
    menu.querySelector('#sat-tw').onclick = () => {
        tagSatArea = 'TWI' , tagSatVSgPx = '1350' , tagSatVStPx = '1375' , tagSatIRPx = '800';
        satvsg.querySelector('img').src = urlSatVSg(tStrSat , tagSatArea , tagSatVSgPx);
        satvst.querySelector('img').src = urlSatVSt(tStrSat , tagSatArea , tagSatVStPx);
        satirc.querySelector('img').src = urlSatIRc(tStrSat , tagSatArea , tagSatIRPx);
        satire.querySelector('img').src = urlSatIRe(tStrSat , tagSatArea , tagSatIRPx);
    }
    menu.querySelector('#sat-ea').onclick = () => {
        tagSatArea = 'LCC' , tagSatVSgPx = '2750' , tagSatVStPx = '2750' , tagSatIRPx = '2750';
        satvsg.querySelector('img').src = urlSatVSg(tStrSat , tagSatArea , tagSatVSgPx);
        satvst.querySelector('img').src = urlSatVSt(tStrSat , tagSatArea , tagSatVStPx);
        satirc.querySelector('img').src = urlSatIRc(tStrSat , tagSatArea , tagSatIRPx);
        satire.querySelector('img').src = urlSatIRe(tStrSat , tagSatArea , tagSatIRPx);
    }
    menu.querySelector('#sat-gb').onclick = () => {
        tagSatArea = 'FDK' , tagSatVSgPx = '2750' , tagSatVStPx = '2750' , tagSatIRPx = '2750';
        satvsg.querySelector('img').src = urlSatVSg(tStrSat , tagSatArea , tagSatVSgPx);
        satvst.querySelector('img').src = urlSatVSt(tStrSat , tagSatArea , tagSatVStPx);
        satirc.querySelector('img').src = urlSatIRc(tStrSat , tagSatArea , tagSatIRPx);
        satire.querySelector('img').src = urlSatIRe(tStrSat , tagSatArea , tagSatIRPx);
    }
    menu.querySelector('#ty-all').onclick = () => {
        tagTyT2 = 'ALL';
        tyT2.querySelector('img').src = urlTyT2(tStrTyT2 , tagTyT2);
        tyT2.querySelector('.title').innerText = '各國颱風路徑';
    }
    menu.querySelector('#ty-ec').onclick = () => {
        tagTyT2 = 'ALL';
        tyT2.querySelector('img').src = urlTyT2(tStrTyT2 , tagTyT2);
        tyT2.querySelector('.title').innerText = '各國颱風路徑';
    }
    menu.querySelector('#ty-ncep').onclick = () => {
        tagTyT2 = 'NCEP-GFS';
        tyT2.querySelector('img').src = urlTyT2(tStrTyT2 , tagTyT2);
        tyT2.querySelector('.title').innerText = 'NCEP颱風路徑';
    }
    menu.querySelector('#ty-uk').onclick = () => {
        tagTyT2 = 'UKMO-UM';
        tyT2.querySelector('img').src = urlTyT2(tStrTyT2 , tagTyT2);
        tyT2.querySelector('.title').innerText = 'UK颱風路徑';
    }
    menu.querySelector('#ty-cmc').onclick = () => {
        tagTyT2 = 'CMC-GEM';
        tyT2.querySelector('img').src = urlTyT2(tStrTyT2 , tagTyT2);
        tyT2.querySelector('.title').innerText = 'CMC颱風路徑';
    }
    menu.querySelector('#ty-fnmoc').onclick = () => {
        tagTyT2 = 'FNMOC-NAVGEM';
        tyT2.querySelector('img').src = urlTyT2(tStrTyT2 , tagTyT2);
        tyT2.querySelector('.title').innerText = 'FNMOC颱風路徑';
    }
    menu.querySelector('#ty-jma').onclick = () => {
        tagTyT2 = 'JMA-GSM';
        tyT2.querySelector('img').src = urlTyT2(tStrTyT2 , tagTyT2);
        tyT2.querySelector('.title').innerText = 'JMA颱風路徑';
    }

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
        addElementLi(obj_p , tNowLST , t , tStep).addEventListener('mouseover' , function() {
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
    const tFmt10 = YYYY + '/' + MM + '/' + DD + ' ' + hh + ':' + mm;
    const tFmt30 = YYYY + '/' + MM + '/' + DD + ' ' + hh + ':' + (parseInt(mm) < 30 ? '0' : '3') + '0';
    const tFmt60 = YYYY + '/' + MM + '/' + DD + ' ' + hh + ':00';
    const tFmt12 = YYYYUTC + '/' + MMUTC + '/' + DDUTC + ' ' + ((parseInt(hhUTC) < 12) ? '00' : '12') + ':00Z';

    const li = document.createElement('li');
    li.id = id;
    li.innerHTML = '<a href="#">' + timeHTML + '</a>';
    li.addEventListener('mouseover' , () => {
        tStrRn = YYYY + '-' + MM + '-' + DD + '_' + hh + ((parseInt(mm) < 30) ? '0' : '3') + '0';
        tStrRdr = YYYY + MM + DD + hh + mm;
        tStrLtn = YYYY + MM + DD + hh + mm + '00';
        tStrSat = YYYY + '-' + MM + '-' + DD + '-' + hh + '-' + mm;
        tStrTemp = YYYY + '-' + MM + '-' + DD + '_' + hh + '00';
        tStrSkt = YYUTC + MMUTC + DDUTC + ((parseInt(hhUTC) < 12) ? '00' : '12');

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

        rain.querySelector('img').src = urlRn(tStrRn , tagRn);
        radar.querySelector('img').src = urlRdr(tStrRdr);
        lgtn.querySelector('img').src = urlLtn(tStrLtn);
        satvsg.querySelector('img').src = urlSatVSg(tStrSat , tagSatArea , tagSatVSgPx);
        satvst.querySelector('img').src = urlSatVSt(tStrSat , tagSatArea , tagSatVStPx);
        satirc.querySelector('img').src = urlSatIRc(tStrSat , tagSatArea , tagSatIRPx);
        satire.querySelector('img').src = urlSatIRe(tStrSat , tagSatArea , tagSatIRPx);
        temp.querySelector('img').src = urlTemp(tStrTemp);
        skt.querySelector('img').src = urlSkt(tStrSkt);
    })
    obj_p.appendChild(li);
    return li;
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

function fadeIn(el , delay) {
    if (el.style.opacity === '') el.style.opacity = '0';
    if (parseFloat(el.style.opacity) < 1) {
        setTimeout(() => {
            el.style.opacity = parseFloat(el.style.opacity) + 0.1;
            fadeIn(el , delay)
        } , delay)
    }
}

function fadeOut(el , delay) {
    if (el.style.opacity === '') el.style.opacity = '1';
    if (parseFloat(el.style.opacity) > 0) {
        setTimeout(() => {
            el.style.opacity = parseFloat(el.style.opacity) - 0.1;
            fadeOut(el , delay)
        } , delay)
    } else {el.remove()}
}