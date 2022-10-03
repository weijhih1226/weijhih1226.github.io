const tStart = tNowUTC - 1440 * min2msec;
const tEnd = tNowUTC;
const tOpt = {year: 'numeric', month: '2-digit', day: '2-digit', 
              hour: '2-digit', minute: '2-digit', hour12: false};
var isoStrStart = new Date(tStart).toLocaleString('zh-TW', tOpt);
isoStrStart = isoStrStart.substring(11, 13) === '24' ? isoStrStart.substring(0, 11) + '00' + isoStrStart.substring(13, 16) : isoStrStart;
var tSelect = tEnd;
var tBar;

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
    const tsCtl = this.createElement('div');
    const tsCtlplay = this.createElement('i');
    const tsCtlforward = this.createElement('i');
    const tsCtlrewind = this.createElement('i');
    const tsCtnS = tsCtn.style;
    const tsTrackS = tsTrack.style;
    const tsS = ts.style;
    const tsDragBtnS = tsDragBtn.style;
    const tsCtlS = tsCtl.style;

    this.querySelector('main').appendChild(tsCtn);
    tsCtn.appendChild(tsTrack);
    tsCtn.appendChild(tsCtl);
    tsTrack.appendChild(ts);
    tsTrack.appendChild(tsDragBtn);
    tsCtl.appendChild(tsCtlrewind);
    tsCtl.appendChild(tsCtlplay);
    tsCtl.appendChild(tsCtlforward);

    tsCtn.id = 'tsCtn';
    tsCtn.className = 'timeslider';
    tsTrack.id = 'tsTrack';
    ts.id = 'ts';
    tsDragBtn.id = 'tsDragBtn';
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
    
    tsTrackS.left = '20px';
    tsTrackS.right = '150px';
    tsTrackS.height = '10px';
    tsTrackS.position = 'absolute';
    tsTrackS.background = '#9da8b3';
    tsTrackS.borderRadius = '5px';
    tsTrackS.display = 'flex';
    tsTrackS.alignItems = 'center';
    tsTrackS.cursor = 'pointer';

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
    });

    tsTrack.addEventListener('mousedown' , actionMouse);
    this.addEventListener('keydown' , actionKey , false)

    for (var t = 0 ; t < tAll1Hr.length ; t++) {
        const tick = this.createElement('div');
        const tickS = tick.style;
        tsTrack.appendChild(tick);

        tickS.left = (tAll1Hr[t] - tStart) / (tEnd - tStart) * 100 + '%';
        tickS.width = '2px';
        tickS.height = '12px';
        tickS.position = 'absolute';
        tickS.background = '#fff';
        tickS.cursor = 'pointer';
    }

    function actionMouse(e){
        tBar = (e.clientX - this.getBoundingClientRect().left) / this.clientWidth;
        tSelect = tStart + (tEnd - tStart) * tBar;
        tsS.width = tBar * 100 + '%';
        actionSelect();
    }

    function actionKey(e){
        switch(e.keyCode){
            case 37:
                tSelect -= 5 * min2msec;
                break;
            case 39:
                tSelect += 5 * min2msec;
                break;
        }
        tBar = (tSelect - tStart) / (tEnd - tStart);
        tsS.width = tBar * 100 + '%';
        actionSelect();
    }

    function actionSelect(){
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

    // new MutationObserver(function(mutations , owner){
    //     console.log(mutations , owner);
    // }).observe(tSelect , {attributes: true});
});