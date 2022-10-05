const tStart = tNowUTC - 1440 * min2msec;
const tEnd = tNowUTC;
const tOpt = {year: 'numeric', month: '2-digit', day: '2-digit', 
              hour: '2-digit', minute: '2-digit', hour12: false};
const tStrStart = datetime2LSTStr(tStart);
const tStrEnd = datetime2LSTStr(tEnd);
var optPlay = 0;
var tSkipDefault = 10;
var tSkip = tSkipDefault;
const playSpeed = 500;

const tInt5Min = 5 * min2msec;
const tInt10Min = 10 * min2msec;
const tInt30Min = 30 * min2msec;
const tInt1Hr = 60 * min2msec;
const tInt12Hr = 720 * min2msec;

const tStart5Min = Date.parse(tStrStart.substring(0, 4) + '-' + tStrStart.substring(5, 7) + '-' + tStrStart.substring(8, 10) + 'T' + tStrStart.substring(11, 13) + ':' + tStrStart.substring(14, 15) + (parseInt(tStrStart.substring(15, 16)) < 5 ? '0' : '5') + ':00');
const tStart10Min = Date.parse(tStrStart.substring(0, 4) + '-' + tStrStart.substring(5, 7) + '-' + tStrStart.substring(8, 10) + 'T' + tStrStart.substring(11, 13) + ':' + tStrStart.substring(14, 15) + '0:00');
const tStart30Min = Date.parse(tStrStart.substring(0, 4) + '-' + tStrStart.substring(5, 7) + '-' + tStrStart.substring(8, 10) + 'T' + tStrStart.substring(11, 13) + ':' + (parseInt(tStrStart.substring(14, 15)) < 3 ? '0' : '3') + '0:00');
const tStart1Hr = Date.parse(tStrStart.substring(0, 4) + '-' + tStrStart.substring(5, 7) + '-' + tStrStart.substring(8, 10) + 'T' + tStrStart.substring(11, 13) + ':00');
const tStart12Hr = Date.parse(tStrStart.substring(0, 4) + '-' + tStrStart.substring(5, 7) + '-' + tStrStart.substring(8, 10) + 'T' + (parseInt(tStrStart.substring(11, 13)) < 12 ? '00' : '12') + ':00') - tInt12Hr;

const tAll5Min = [];
const tAll10Min = [];
const tAll30Min = [];
const tAll1Hr = [];
const tAll12Hr = [];
for (var t = tStart5Min ; t <= tEnd ; t += tInt5Min) tAll5Min.push(t);
for (var t = tStart10Min ; t <= tEnd ; t += tInt10Min) tAll10Min.push(t);
for (var t = tStart30Min ; t <= tEnd ; t += tInt30Min) tAll30Min.push(t);
for (var t = tStart1Hr ; t <= tEnd ; t += tInt1Hr) tAll1Hr.push(t);
for (var t = tStart12Hr ; t <= tEnd ; t += tInt12Hr) tAll12Hr.push(t + 480 * min2msec);

const tStartAll = tAll5Min[1];
const tEndAll = tAll5Min[tAll5Min.length - 1];
var tSelect = tEndAll;

urlRn2 = (Y , M , D , h , m , type) => homeCWB + 'rainfall/' + (Y+'-'+M+'-'+D+'_'+h+m) + '.QZ' + type + '8.jpg';
urlRdr2 = (Y , M , D , h , m) => homeCWB + 'radar/CV1_TW_3600_' + (Y+M+D+h+m) + '.png';
urlLtn2 = (Y , M , D , h , m) => homeCWB + 'lightning/' + (Y+M+D+h+m) + '00_lgtl.jpg';
urlSatVSg2 = (Y , M , D , h , m , area , px) => homeCWB + 'satellite/' + area + '_VIS_Gray_' + px + '/' + area + '_VIS_Gray_' + px + '-' + (Y+'-'+M+'-'+D+'-'+h+'-'+m) + '.jpg';
urlSatVSt2 = (Y , M , D , h , m , area , px) => homeCWB + 'satellite/' + area + '_VIS_TRGB_' + px + '/' + area + '_VIS_TRGB_' + px + '-' + (Y+'-'+M+'-'+D+'-'+h+'-'+m) + '.jpg';
urlSatIRc2 = (Y , M , D , h , m , area , px) => homeCWB + 'satellite/' + area + '_IR1_CR_' + px + '/' + area + '_IR1_CR_' + px + '-' + (Y+'-'+M+'-'+D+'-'+h+'-'+m) + '.jpg';
urlSatIRe2 = (Y , M , D , h , m , area , px) => homeCWB + 'satellite/' + area + '_IR1_MB_' + px + '/' + area + '_IR1_MB_' + px + '-' + (Y+'-'+M+'-'+D+'-'+h+'-'+m) + '.jpg';
urlTemp2 = (Y , M , D , h) => homeCWB + 'temperature/' + (Y+'-'+M+'-'+D+'_'+h) + '00.GTP8.jpg';
urlSkt2 = (Y , M , D , h) => homeCWB2 + 'irisme_data/Weather/SKEWT/SKW___000_' + (Y+M+D+h) + '_46692.gif';

document.addEventListener('DOMContentLoaded' , function(){
    const content = this.querySelector('.content');
    const menu = this.querySelector('#menu');
    const tsCtn = this.createElement('div');
    const tsTrack = this.createElement('div');
    const ts = this.createElement('div');
    const tsDragBtn = this.createElement('div');
    const tsPointer = this.createElement('div');
    const tsTag = this.createElement('div');
    const tsCtl = this.createElement('div');
    const tsCtlplay = this.createElement('i');
    const tsCtlforward = this.createElement('i');
    const tsCtlrewind = this.createElement('i');
    const tsCtnS = tsCtn.style;
    const tsTrackS = tsTrack.style;
    const tsS = ts.style;
    const tsDragBtnS = tsDragBtn.style;
    const tsPointerS = tsPointer.style;
    const tsTagS = tsTag.style;
    const tsCtlS = tsCtl.style;

    this.querySelector('main').appendChild(tsCtn);
    tsCtn.appendChild(tsTrack);
    tsCtn.appendChild(tsCtl);
    tsTrack.appendChild(ts);
    tsTrack.appendChild(tsDragBtn);
    tsTrack.appendChild(tsPointer);
    tsPointer.appendChild(tsTag);
    tsCtl.appendChild(tsCtlrewind);
    tsCtl.appendChild(tsCtlplay);
    tsCtl.appendChild(tsCtlforward);

    tsCtn.id = 'tsCtn';
    tsCtn.className = 'timeslider';
    tsTrack.id = 'tsTrack';
    ts.id = 'ts';
    tsDragBtn.id = 'tsDragBtn';
    tsPointer.id = 'tsPointer';
    tsTag.id = 'tsTag';
    tsCtl.id = 'tsCtl';
    tsCtlplay.className = 'icofont-play-alt-1 icofont-2x';
    tsCtlforward.className = 'icofont-forward icofont-2x';
    tsCtlrewind.className = 'icofont-rewind icofont-2x';
    
    tsCtnS.zIndex = '2';
    tsCtnS.left = '0';
    tsCtnS.right = '300px';
    tsCtnS.bottom = '0';
    tsCtnS.height = '3em';
    tsCtnS.position = 'fixed';
    tsCtnS.display = 'flex';
    tsCtnS.alignItems = 'center';
    tsCtnS.background = 'rgba(255 , 255 , 255 , 0)';
    tsCtnS.pointerEvents = 'none';
    
    tsTrackS.left = '20px';
    tsTrackS.right = '150px';
    tsTrackS.height = '10px';
    tsTrackS.position = 'absolute';
    tsTrackS.background = '#9da8b3';
    tsTrackS.borderRadius = '5px';
    tsTrackS.display = 'flex';
    tsTrackS.alignItems = 'center';
    tsTrackS.cursor = 'pointer';
    tsTrackS.pointerEvents = 'auto';

    tsS.left = '0';
    tsS.top = '0';
    tsS.bottom = '0';
    tsS.width = time2BarWidth(tAll5Min[tAll5Min.length-1]);
    tsS.position = 'absolute';
    tsS.background = '#197C9D';
    tsS.borderRadius = '5px';

    // tsDragBtn.draggable = 'true';
    tsDragBtnS.top = '-3px';
    tsDragBtnS.right = '-3px';
    tsDragBtnS.width = '16px';
    tsDragBtnS.height = '16px';
    tsDragBtnS.position = 'absolute';
    tsDragBtnS.display = 'none';
    tsDragBtnS.background = '#197C9D';
    tsDragBtnS.borderRadius = '8px';
    tsDragBtnS.cursor = 'pointer';

    tsPointerS.height = tsTrackS.height;
    tsPointerS.position = 'absolute';
    tsPointerS.left = time2BarWidth(tAll5Min[tAll5Min.length-1]);

    tsTag.innerHTML = time2LSTStr(tEndAll);
    tsTagS.left = '-30px';
    tsTagS.top = '-45px';
    tsTagS.width = '60px';
    tsTagS.height = '30px';
    tsTagS.border = '1px solid #fff';
    tsTagS.borderRadius = '5px';
    tsTagS.position = 'absolute';
    tsTagS.background = '#197C9D';
    tsTagS.color = '#fff';
    tsTagS.display = 'flex';
    tsTagS.justifyContent = 'center';
    tsTagS.alignItems = 'center';
    tsTagS.fontSize = '14px';
    tsTagS.pointerEvents = 'none';

    tsCtlS.right = '20px';
    tsCtlS.width = '110px';
    tsCtlS.height = '80%';
    tsCtlS.position = 'absolute';
    tsCtlS.display = 'flex';
    tsCtlS.justifyContent = 'center';
    tsCtlS.alignItems = 'center';

    tsCtl.querySelectorAll('i').forEach(icon => {
        icon.style.margin = '5px';
        // icon.style.color = '#9da8b3';
        icon.style.color = '#197C9D';
        icon.style.backgroundColor = '#fff';
        icon.style.borderRadius = '50%';
        icon.style.cursor = 'pointer';
        icon.style.pointerEvents = 'auto';
    });

    tsTrack.addEventListener('mousedown' , eventMouse);
    tsCtlrewind.addEventListener('click' , eventRewind);
    tsCtlforward.addEventListener('click' , eventForward);
    tsCtlplay.addEventListener('click' , switchPlayPause);
    this.addEventListener('keydown' , eventKey , false);
    this.addEventListener('keyup' , () => tSkip = tSkipDefault , false);

    for (var t = 1 ; t < tAll1Hr.length ; t++) {
        const tick = this.createElement('div');
        const tickS = tick.style;
        tsTrack.appendChild(tick);

        tickS.left = time2BarWidth(tAll1Hr[t]);
        tickS.width = '2px';
        tickS.height = '12px';
        tickS.position = 'absolute';
        tickS.background = '#fff';
        tickS.cursor = 'pointer';
    };

    for (var t = 1 ; t < tAll30Min.length ; t++) {
        const tick = this.createElement('div');
        const tickS = tick.style;
        tsTrack.appendChild(tick);

        tickS.left = time2BarWidth(tAll30Min[t]);
        tickS.width = '1px';
        tickS.height = '10px';
        tickS.position = 'absolute';
        tickS.background = '#fff';
        tickS.cursor = 'pointer';
    };

    for (var t = 1 ; t < tAll10Min.length ; t++) {
        const tick = this.createElement('div');
        const tickS = tick.style;
        tsTrack.appendChild(tick);

        tickS.left = time2BarWidth(tAll10Min[t]);
        tickS.width = '1px';
        tickS.height = '5px';
        tickS.position = 'absolute';
        tickS.background = '#fff';
        tickS.cursor = 'pointer';
    };

    function eventMouse(e){
        tSelect = click2NearestTime(e , this);
        display(tSelect);
    };
    function eventRewind(){
        tSelect = rewind(tSelect , tSkip);
        display(tSelect);
    };
    function eventForward(){
        tSelect = forward(tSelect , tSkip);
        display(tSelect);
    };
    function eventPlay(){
        if (optPlay === 1){
            tSelect = forward(tSelect , tSkip);
            display(tSelect);
            setTimeout(() => {
                eventPlay();
            } , playSpeed);
        };
    };

    function switchPlayPause(){
        switch (optPlay){
            case 0:
                optPlay = 1;
                document.querySelector('.icofont-play-alt-1').className = 'icofont-pause icofont-2x';
                eventPlay();
                break;
            case 1:
                optPlay = 0;
                document.querySelector('.icofont-pause').className = 'icofont-play-alt-1 icofont-2x';
                break;
        };
    };

    function eventKey(e){
        e.preventDefault();
        if (e.ctrlKey && e.shiftKey) tSkip = 60;
        else if (!e.ctrlKey && e.shiftKey) tSkip = 30;
        else if (e.ctrlKey && !e.shiftKey) tSkip = 5;
        else tSkip = tSkipDefault;

        switch (e.keyCode){
            case 32:
                switchPlayPause();
                break;
            case 37:
                eventRewind();
                break;
            case 39:
                eventForward();
                break;
        }
    };
    function display(t){
        displayTimeslider(t);
        displayContent(t);
    };

    function displayTimeslider(tSelect){
        tsS.width = time2BarWidth(tSelect);
        tsPointerS.left = time2BarWidth(tSelect);
        tsTag.innerHTML = time2LSTStr(tSelect);
    };

    function displayContent(tSelect){
        const t5Min = findNewest(tSelect , tAll5Min);
        const t10Min = findNewest(tSelect , tAll10Min);
        const t30Min = findNewest(tSelect , tAll30Min);
        const t1Hr = findNewest(tSelect , tAll1Hr);
        const t12Hr = findNewest(tSelect , tAll12Hr);
        
        const tStr5Min = datetime2LSTStr(t5Min);
        const tStr10Min = datetime2LSTStr(t10Min);
        const tStr30Min = datetime2LSTStr(t30Min);
        const tStr1Hr = datetime2LSTStr(t1Hr);
        const tStr12Hr = datetime2UTCStr(t12Hr);

        const tDic5Min = timeDic(tStr5Min);
        const tDic10Min = timeDic(tStr10Min);
        const tDic30Min = timeDic(tStr30Min);
        const tDic1Hr = timeDic(tStr1Hr);
        const tDic12Hr = timeDic(tStr12Hr);

        rain.querySelector('.time').innerText = tStr30Min;
        radar.querySelector('.time').innerText = tStr10Min;
        lgtn.querySelector('.time').innerText = tStr5Min;
        satvsg.querySelector('.time').innerText = tStr10Min;
        satvst.querySelector('.time').innerText = tStr10Min;
        satirc.querySelector('.time').innerText = tStr10Min;
        satire.querySelector('.time').innerText = tStr10Min;
        temp.querySelector('.time').innerText = tStr1Hr;
        skt.querySelector('.time').innerText = tStr12Hr;
        
        rain.querySelector('img').src = urlRn2(tDic30Min.Y , tDic30Min.M , tDic30Min.D , tDic30Min.h , tDic30Min.m , tagRn);
        radar.querySelector('img').src = urlRdr2(tDic10Min.Y , tDic10Min.M , tDic10Min.D , tDic10Min.h , tDic10Min.m);
        lgtn.querySelector('img').src = urlLtn2(tDic5Min.Y , tDic5Min.M , tDic5Min.D , tDic5Min.h , tDic5Min.m);
        satvsg.querySelector('img').src = urlSatVSg2(tDic10Min.Y , tDic10Min.M , tDic10Min.D , tDic10Min.h , tDic10Min.m , tagSatArea , tagSatVSgPx);
        satvst.querySelector('img').src = urlSatVSt2(tDic10Min.Y , tDic10Min.M , tDic10Min.D , tDic10Min.h , tDic10Min.m , tagSatArea , tagSatVStPx);
        satirc.querySelector('img').src = urlSatIRc2(tDic10Min.Y , tDic10Min.M , tDic10Min.D , tDic10Min.h , tDic10Min.m , tagSatArea , tagSatIRPx);
        satire.querySelector('img').src = urlSatIRe2(tDic10Min.Y , tDic10Min.M , tDic10Min.D , tDic10Min.h , tDic10Min.m , tagSatArea , tagSatIRPx);
        temp.querySelector('img').src = urlTemp2(tDic1Hr.Y , tDic1Hr.M , tDic1Hr.D , tDic1Hr.h);
        skt.querySelector('img').src = urlSkt2(tDic12Hr.Y.substring(2, 4) , tDic12Hr.M , tDic12Hr.D , tDic12Hr.h);
    };
});

function time2LSTStr(t){
    var tStr = new Date(t).toLocaleString('zh-TW', tOpt).substring(11, 16);
    return (tStr.substring(0, 2) === '24' ? '00' : tStr.substring(0, 2)) + tStr.substring(2, 5);
};

function datetime2LSTStr(t){
    var tStr = new Date(t).toLocaleString('zh-TW', tOpt).substring(0, 16);
    return tStr.substring(11, 13) === '24' ? (tStr.substring(0, 11) + '00' + tStr.substring(13, 16)) : tStr;
};

function datetime2UTCStr(t){
    var tStr = new Date(t).toISOString().substring(0, 13);
    return tStr.substring(0, 4) + '/' + tStr.substring(5, 7) + '/' + tStr.substring(8, 10) + ' ' + tStr.substring(11, 13) + 'Z';
};

function timeDic(s){
    return {Y: s.substring(0, 4), M: s.substring(5, 7), D: s.substring(8, 10), 
            h: s.substring(11, 13), m: s.substring(14, 16)};
};

function findNewest(tSelect , tAll){
    var tNewest;
    for (const t of tAll){
        if (tSelect >= t) tNewest = t;
        else return tNewest;
    };
    return tNewest;
};

function time2BarWidth(t){
    return (t - tStart) / (tEnd - tStart) * 100 + '%';
};

function rewind(t , int){
    return (t - int * min2msec < tStart) ? tEndAll : t - int * min2msec;
};

function forward(t , int){
    return (t + int * min2msec > tEnd) ? tStartAll : t + int * min2msec;
};

function click2Time(e , track){
    return tStart + (tEnd - tStart) * (e.clientX - track.getBoundingClientRect().left) / track.clientWidth;
};

function click2NearestTime(e , track){
    var t = click2Time(e , track);
    var tAbs = [];
    tAll5Min.forEach(t5Min => tAbs.push(Math.abs(t - t5Min)));
    var tMin = Math.min(...tAbs);
    for (var i = 0; i < tAbs.length; i++){
        if (tAbs[i] === tMin) return tAll5Min[i];
    };
};

function click2BarWidth(e , track){
    return (e.clientX - track.getBoundingClientRect().left) / track.clientWidth * 100 + '%';
};