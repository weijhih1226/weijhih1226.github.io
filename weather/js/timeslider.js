const tStart = tNowUTC - 1440 * min2msec;
const tEnd = tNowUTC;
const tOpt = {year: 'numeric', month: '2-digit', day: '2-digit', 
              hour: '2-digit', minute: '2-digit', hour12: false};
var isoStrStart = new Date(tStart).toLocaleString('zh-TW', tOpt);
var isoStrEnd = new Date(tEnd).toLocaleString('zh-TW', tOpt);
isoStrStart = isoStrStart.substring(11, 13) === '24' ? isoStrStart.substring(0, 11) + '00' + isoStrStart.substring(13, 16) : isoStrStart;
isoStrEnd = isoStrEnd.substring(11, 13) === '24' ? isoStrEnd.substring(0, 11) + '00' + isoStrEnd.substring(13, 16) : isoStrEnd;
var tSelect = tEnd;
var optPlay = 0;
var tSkipDefault = 10;
var tSkip = tSkipDefault;
const playSpeed = 500;

const tInt5Min = 5 * min2msec;
const tInt10Min = 10 * min2msec;
const tInt30Min = 30 * min2msec;
const tInt1Hr = 60 * min2msec;
const tInt12Hr = 720 * min2msec;

const tStart5Min = Date.parse(isoStrStart.substring(0, 4) + '-' + isoStrStart.substring(5, 7) + '-' + isoStrStart.substring(8, 10) + 'T' + isoStrStart.substring(11, 13) + ':' + isoStrStart.substring(14, 15) + (parseInt(isoStrStart.substring(15, 16)) < 5 ? '0' : '5') + ':00');
const tStart10Min = Date.parse(isoStrStart.substring(0, 4) + '-' + isoStrStart.substring(5, 7) + '-' + isoStrStart.substring(8, 10) + 'T' + isoStrStart.substring(11, 13) + ':' + isoStrStart.substring(14, 15) + '0:00');
const tStart30Min = Date.parse(isoStrStart.substring(0, 4) + '-' + isoStrStart.substring(5, 7) + '-' + isoStrStart.substring(8, 10) + 'T' + isoStrStart.substring(11, 13) + ':' + (parseInt(isoStrStart.substring(14, 15)) < 3 ? '0' : '3') + '0:00');
const tStart1Hr = Date.parse(isoStrStart.substring(0, 4) + '-' + isoStrStart.substring(5, 7) + '-' + isoStrStart.substring(8, 10) + 'T' + isoStrStart.substring(11, 13) + ':00');
const tStart12Hr = Date.parse(isoStrStart.substring(0, 4) + '-' + isoStrStart.substring(5, 7) + '-' + isoStrStart.substring(8, 10) + 'T' + (parseInt(isoStrStart.substring(11, 13)) < 12 ? '00' : '12') + ':00') - tInt12Hr;

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
    tsS.width = '100%';
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
    tsPointerS.left = '100%';

    tsTag.innerHTML = isoStrEnd.substring(11, 16);
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

    tsTrack.addEventListener('mousedown' , actionMouse);
    tsCtlrewind.addEventListener('click' , actionRewind);
    tsCtlforward.addEventListener('click' , actionForward);
    tsCtlplay.addEventListener('click' , switchPlayPause);
    this.addEventListener('keydown' , actionKey , false);
    this.addEventListener('keyup' , () => tSkip = tSkipDefault , false);

    for (var t = 1 ; t < tAll1Hr.length ; t++) {
        const tick = this.createElement('div');
        const tickS = tick.style;
        tsTrack.appendChild(tick);

        tickS.left = (tAll1Hr[t] - tStart) / (tEnd - tStart) * 100 + '%';
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

        tickS.left = (tAll30Min[t] - tStart) / (tEnd - tStart) * 100 + '%';
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

        tickS.left = (tAll10Min[t] - tStart) / (tEnd - tStart) * 100 + '%';
        tickS.width = '1px';
        tickS.height = '5px';
        tickS.position = 'absolute';
        tickS.background = '#fff';
        tickS.cursor = 'pointer';
    };

    function actionMouse(e){
        tSelect = click2NearestTime(e , this);
        displayTimeslider(tSelect);
        displayContent(tSelect);
    };
    function actionRewind(){
        tSelect = rewind(tSelect , tSkip);
        displayTimeslider(tSelect);
        displayContent(tSelect);
    };
    function actionForward(){
        tSelect = forward(tSelect , tSkip);
        displayTimeslider(tSelect);
        displayContent(tSelect);
    };
    function actionPlay(){
        if (optPlay === 1){
            tSelect = forward(tSelect , tSkip);
            displayTimeslider(tSelect);
            displayContent(tSelect);
            setTimeout(() => {
                actionPlay();
            } , playSpeed);
        };
    };

    function switchPlayPause(){
        switch (optPlay){
            case 0:
                optPlay = 1;
                document.querySelector('.icofont-play-alt-1').className = 'icofont-pause icofont-2x';
                actionPlay();
                break;
            case 1:
                optPlay = 0;
                document.querySelector('.icofont-pause').className = 'icofont-play-alt-1 icofont-2x';
                break;
        };
    };

    function actionKey(e){
        e.preventDefault();
        if (!e.ctrlKey && e.shiftKey) tSkip = 30;
        else if (e.ctrlKey && !e.shiftKey) tSkip = 5;
        else if (e.ctrlKey && e.shiftKey) tSkip = 60;
        else tSkip = tSkipDefault;

        switch (e.keyCode){
            case 32:
                switchPlayPause();
                break;
            case 37:
                actionRewind();
                break;
            case 39:
                actionForward();
                break;
        }
    };

    function displayTimeslider(tSelect){
        tsS.width = time2BarWidth(tSelect);
        tsPointerS.left = time2BarWidth(tSelect);
        tsTag.innerHTML = time2Str(tSelect);
    }

    function displayContent(tSelect){
        var t = 0;
        while (tAll5Min[t] < tSelect) {var t5Min = tAll5Min[t]; t++;}
        var t = 0;
        while (tAll10Min[t] < tSelect) {var t10Min = tAll10Min[t]; t++;}
        var t = 0;
        while (tAll30Min[t] < tSelect) {var t30Min = tAll30Min[t]; t++;}
        var t = 0;
        while (tAll1Hr[t] < tSelect) {var t1Hr = tAll1Hr[t]; t++;}
        var t = 0;
        while (tAll12Hr[t] < tSelect) {var t12Hr = tAll12Hr[t]; t++;}
        
        var isoStr5Min = new Date(t5Min).toLocaleString('zh-TW', tOpt);
        var isoStr10Min = new Date(t10Min).toLocaleString('zh-TW', tOpt);
        var isoStr30Min = new Date(t30Min).toLocaleString('zh-TW', tOpt);
        var isoStr1Hr = new Date(t1Hr).toLocaleString('zh-TW', tOpt);
        var isoStr12Hr = new Date(t12Hr).toISOString();
        isoStr5Min = isoStr5Min.substring(11, 13) === '24' ? isoStr5Min.substring(0, 11) + '00' + isoStr5Min.substring(13, 16) : isoStr5Min;
        isoStr10Min = isoStr10Min.substring(11, 13) === '24' ? isoStr10Min.substring(0, 11) + '00' + isoStr10Min.substring(13, 16) : isoStr10Min;
        isoStr30Min = isoStr30Min.substring(11, 13) === '24' ? isoStr30Min.substring(0, 11) + '00' + isoStr30Min.substring(13, 16) : isoStr30Min;
        isoStr1Hr = isoStr1Hr.substring(11, 13) === '24' ? isoStr1Hr.substring(0, 11) + '00' + isoStr1Hr.substring(13, 16) : isoStr1Hr;
        isoStr12Hr = isoStr12Hr.substring(0, 4) + '/' + isoStr12Hr.substring(5, 7) + '/' + isoStr12Hr.substring(8, 10) + ' ' + isoStr12Hr.substring(11, 13) + ':00Z';

        rain.querySelector('.time').innerText = isoStr30Min;
        radar.querySelector('.time').innerText = isoStr10Min;
        lgtn.querySelector('.time').innerText = isoStr5Min;
        satvsg.querySelector('.time').innerText = isoStr10Min;
        satvst.querySelector('.time').innerText = isoStr10Min;
        satirc.querySelector('.time').innerText = isoStr10Min;
        satire.querySelector('.time').innerText = isoStr10Min;
        temp.querySelector('.time').innerText = isoStr1Hr;
        skt.querySelector('.time').innerText = isoStr12Hr;
        
        rain.querySelector('img').src = urlRn2(isoStr30Min.substring(0, 4) , isoStr30Min.substring(5, 7) , isoStr30Min.substring(8, 10) , isoStr30Min.substring(11, 13) , isoStr30Min.substring(14, 16) , tagRn);
        radar.querySelector('img').src = urlRdr2(isoStr10Min.substring(0, 4) , isoStr10Min.substring(5, 7) , isoStr10Min.substring(8, 10) , isoStr10Min.substring(11, 13) , isoStr10Min.substring(14, 16));
        lgtn.querySelector('img').src = urlLtn2(isoStr5Min.substring(0, 4) , isoStr5Min.substring(5, 7) , isoStr5Min.substring(8, 10) , isoStr5Min.substring(11, 13) , isoStr5Min.substring(14, 16));
        satvsg.querySelector('img').src = urlSatVSg2(isoStr10Min.substring(0, 4) , isoStr10Min.substring(5, 7) , isoStr10Min.substring(8, 10) , isoStr10Min.substring(11, 13) , isoStr10Min.substring(14, 16) , tagSatArea , tagSatVSgPx);
        satvst.querySelector('img').src = urlSatVSt2(isoStr10Min.substring(0, 4) , isoStr10Min.substring(5, 7) , isoStr10Min.substring(8, 10) , isoStr10Min.substring(11, 13) , isoStr10Min.substring(14, 16) , tagSatArea , tagSatVStPx);
        satirc.querySelector('img').src = urlSatIRc2(isoStr10Min.substring(0, 4) , isoStr10Min.substring(5, 7) , isoStr10Min.substring(8, 10) , isoStr10Min.substring(11, 13) , isoStr10Min.substring(14, 16) , tagSatArea , tagSatIRPx);
        satire.querySelector('img').src = urlSatIRe2(isoStr10Min.substring(0, 4) , isoStr10Min.substring(5, 7) , isoStr10Min.substring(8, 10) , isoStr10Min.substring(11, 13) , isoStr10Min.substring(14, 16) , tagSatArea , tagSatIRPx);
        temp.querySelector('img').src = urlTemp2(isoStr1Hr.substring(0, 4) , isoStr1Hr.substring(5, 7) , isoStr1Hr.substring(8, 10) , isoStr1Hr.substring(11, 13));
        skt.querySelector('img').src = urlSkt2(isoStr12Hr.substring(2, 4) , isoStr12Hr.substring(5, 7) , isoStr12Hr.substring(8, 10) , isoStr12Hr.substring(11, 13));
    };
});

function rewind(t , int){
    return (t - int * min2msec < tStart) ? tEnd : t - int * min2msec;
};

function forward(t , int){
    return (t + int * min2msec > tEnd) ? tStart : t + int * min2msec;
};

function time2BarWidth(t){
    return (t - tStart) / (tEnd - tStart) * 100 + '%';
};

function time2Str(t){
    var tStr = new Date(t).toLocaleString('zh-TW', tOpt).substring(11, 16);
    return (tStr.substring(0, 2) === '24' ? '00' : tStr.substring(0, 2)) + tStr.substring(2, 5);
}

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