const T_NUM = 144 , T_STEP = 10 , MIN2MSEC = 60000;
const NOW_UTC = new Date().getTime();
const NOW_LST = NOW_UTC + 480 * MIN2MSEC;

document.addEventListener('DOMContentLoaded' , function(){
    addElementTimeLi('.time-list' , NOW_LST , T_NUM , T_STEP);
})

function addElementTimeLi(obj_p , tNowLST , tNum , tStep){
    var obj_p = document.querySelector(obj_p);
    if (obj_p !== null){
        for (let t = 0; t < tNum; t++){
            let li = addElementLi(tNowLST , t , tStep);
            obj_p.appendChild(li);
        }
    }
}

function addElementLi(tNowLST , t , tStep){
    const isoStr = new Date((tNowLST - t * tStep * MIN2MSEC)).toISOString();
    const isoUTCStr = new Date((tNowLST - (480 + t * tStep) * MIN2MSEC)).toISOString();
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
    return li;
}