const CLS_TS_CTL_PLAY = 'icofont-play-alt-1 icofont-2x'
const CLS_TS_CTL_FORWARD = 'icofont-forward icofont-2x'
const CLS_TS_CTL_REWIND = 'icofont-rewind icofont-2x'
const TAG_CLASS_ADD = 'collapse'
const INFO_TIME = ['00:00' , '06:00' , '12:00' , '18:00'];

const MIN2MSEC = 60000;
const tRange = 24;  // Units: hr
const tStart = NOW_UTC - tRange * 60 * MIN2MSEC;
const tEnd = NOW_UTC;
const tOpt = {year: 'numeric', month: '2-digit', day: '2-digit', 
              hour: '2-digit', minute: '2-digit', hour12: false};
const tStrStart = datetime2LSTStr(tStart);
const tStrEnd = datetime2LSTStr(tEnd);
var optPlay = 0;
var tSkipDefault = 10;
var tSkip = tSkipDefault;
const playSpeed = 500;

const tInt5Min = 5 * MIN2MSEC;
const tInt10Min = 10 * MIN2MSEC;
const tInt30Min = 30 * MIN2MSEC;
const tInt1Hr = 60 * MIN2MSEC;
const tInt12Hr = 720 * MIN2MSEC;

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
for (var t = tStart12Hr ; t <= tEnd ; t += tInt12Hr) tAll12Hr.push(t + 480 * MIN2MSEC);

const tStartAll = tAll5Min[1];
const tEndAll = tAll5Min[tAll5Min.length - 1];
var tSelect = tEndAll;

function createElement(tagName , id , cls){
    const el = document.createElement(tagName);
    if (Boolean(id)) el.id = id;
    if (Boolean(cls)) el.className = cls;
    return el;
}

function createTick(cls , time){
    const el = createElement('div' , null , cls);
    el.style.left = time2BarWidth(time);
    return el;
}

function actionMouseOverAndLeave(objMouseOver , objActionOn , clsActionOn){
    objMouseOver.addEventListener('mouseover' , function(){
        objActionOn.classList.remove(clsActionOn)
    });
    objMouseOver.addEventListener('mouseleave' , function(){
        objActionOn.classList.add(clsActionOn)
    });
}

document.addEventListener('DOMContentLoaded' , function(){
    const content = document.querySelector('.content');
    const tsCtn = document.querySelector('#timeslider');
    const tsBody = createElement('div' , 'ts-body' , );
    const tsTrack = createElement('div' , 'ts-track' , );
    const tsBar = createElement('div' , 'ts-bar' , );
    const tsAnchor = createElement('div' , 'ts-anchor' , );
    const tsPointer = createElement('div' , 'ts-pointer' , );
    const tsPointerTag = createElement('div' , 'ts-pointer-tag' , );
    const tsBarPointer = createElement('div' , 'ts-bar-pointer' , );
    const tsBarTag = createElement('div' , 'ts-bar-tag' , );
    
    const tsCtl = createElement('div' , 'ts-ctl' , );
    const tsCtlPlay = createElement('i' , 'ts-ctl-play' , CLS_TS_CTL_PLAY);
    const tsCtlForward = createElement('i' , 'ts-ctl-forward' , CLS_TS_CTL_FORWARD);
    const tsCtlRewind = createElement('i' , 'ts-ctl-rewind' , CLS_TS_CTL_REWIND);

    tsCtn.classList.add(TAG_CLASS_ADD);
    tsCtlPlay.classList.add('ts-ctl-icon');
    tsCtlForward.classList.add('ts-ctl-icon');
    tsCtlRewind.classList.add('ts-ctl-icon');
    tsBar.style.width = time2BarWidth(tAll5Min[tAll5Min.length-1]);
    tsAnchor.style.left = time2BarWidth(tAll5Min[tAll5Min.length-1]);
    tsBarTag.innerText = time2LSTStr(tEndAll);
    tsPointerTag.innerText = time2LSTStr(tEndAll);

    tsCtn.appendChild(tsBody);
    tsCtn.appendChild(tsCtl);
    tsBody.appendChild(tsTrack);
    tsBody.appendChild(tsAnchor);
    tsTrack.appendChild(tsBar);
    tsAnchor.appendChild(tsBarPointer);
    tsAnchor.appendChild(tsPointer);
    tsAnchor.appendChild(tsPointerTag);
    tsAnchor.appendChild(tsBarTag);
    tsCtl.appendChild(tsCtlRewind);
    tsCtl.appendChild(tsCtlPlay);
    tsCtl.appendChild(tsCtlForward);

    for (let t = 1 ; t < tAll10Min.length ; t++){
        const timeLST = time2LSTStr(tAll10Min[t]);
        if (timeLST.substring(3, 5) === '00'){
            var tick = createTick('ts-ticks-1hr' , tAll10Min[t]);
        } else if (timeLST.substring(3, 5) === '30'){
            var tick = createTick('ts-ticks-30min' , tAll10Min[t]);
        } else {
            var tick = createTick('ts-ticks-10min' , tAll10Min[t]);
        }
        tick.classList.add('ts-ticks');

        tsTrack.appendChild(tick);

        if (INFO_TIME.includes(timeLST.substring(0, 5))){
            if (['00'].includes(timeLST.substring(0, 2))){
                var tsTickInfo = createElement('span' , null , 'ts-ticks-info-00L');
                tsTickInfo.innerText = date2LSTStr(tAll10Min[t]);
            } else {
                var tsTickInfo = createElement('span' , null , 'ts-ticks-info-06L');
                tsTickInfo.innerText = time2LSTStr(tAll10Min[t]);
            }
            tsTickInfo.classList.add('ts-ticks-info' , 'ts-ticks-info-nodisplay');
            tick.appendChild(tsTickInfo);
            tick.style.background = '#000';
            actionMouseOverAndLeave(tsBody , tsTickInfo , 'ts-ticks-info-nodisplay');
        } else tick.style.background = '#fff';

        tick.addEventListener('mouseover' , function(){
            tsPointerTag.innerText = time2LSTStr(tAll10Min[t]);
        });
    }

    function eventMouse(e){
        tSelect = click2NearestTime(e , this);
        display(tSelect);
    }
    function eventRewind(){
        tSelect = rewind(tSelect , tSkip);
        display(tSelect);
    }
    function eventForward(){
        tSelect = forward(tSelect , tSkip);
        display(tSelect);
    }
    function eventPlay(spd){
        if (optPlay === 1){
            tSelect = forward(tSelect , tSkip);
            display(tSelect);
            setTimeout(() => {
                eventPlay(spd);
            } , spd);
        };
    }

    function switchPlayPause(){
        switch (optPlay){
            case 0:
                optPlay = 1;
                tsCtl.querySelector('.icofont-play-alt-1').className = 'ts-ctl-icon icofont-pause icofont-2x';
                eventPlay(playSpeed);
                break;
            case 1:
                optPlay = 0;
                tsCtl.querySelector('.icofont-pause').className = 'ts-ctl-icon icofont-play-alt-1 icofont-2x';
                break;
        };
    }

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
    }
    function display(t){
        displayTimeslider(t);
        displayContent(t);
    }

    function displayTimeslider(tSelect){
        tsBar.style.width = time2BarWidth(tSelect);
        tsAnchor.style.left = time2BarWidth(tSelect);
        tsBarTag.innerText = time2LSTStr(tSelect);
    }

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

        tStrRn = tStr30Min;
        tStrRdr = tStr10Min;
        tStrSat = tStr10Min;
        tStrLtn = tStr5Min;
        tStrTemp = tStr1Hr;
        tStrSkt = tStr12Hr;

        tDicRn = tDic30Min;
        tDicRdr = tDic10Min;
        tDicSat = tDic10Min;
        tDicLtn = tDic5Min;
        tDicTemp = tDic1Hr;
        tDicSkt = tDic12Hr;

        setProduct(content , '#rain' , titleRn , tStrRn , urlRn(tDicRn , tagRn));
        setProduct(content , '#radar' , titleRdr , tStrRdr , urlRdr(tDicRdr));
        setProduct(content , '#satvsg' , titleSatVSg , tStrSat , urlSatVSg(tDicSat , tagSatArea , tagSatVSgPx));
        setProduct(content , '#satvst' , titleSatVSt , tStrSat , urlSatVSt(tDicSat , tagSatArea , tagSatVStPx));
        setProduct(content , '#satirc' , titleSatIRc , tStrSat , urlSatIRc(tDicSat , tagSatArea , tagSatIRPx));
        setProduct(content , '#satire' , titleSatIRe , tStrSat , urlSatIRe(tDicSat , tagSatArea , tagSatIRPx));
        setProduct(content , '#lgtn' , titleLtn , tStrLtn , urlLtn(tDicLtn));
        setProduct(content , '#temp' , titleTemp , tStrTemp , urlTemp(tDicTemp));
        setProduct(content , '#skt' , titleSkt , tStrSkt , urlSkt(tDicSkt , tagSkt));
    }

    const onTicks = (eventType, eventHandler) => on(tsTrack , 'div' , eventType , '.ts-ticks', eventHandler);

    tsTrack.addEventListener('mousedown' , eventMouse);
    tsCtlRewind.addEventListener('click' , eventRewind);
    tsCtlForward.addEventListener('click' , eventForward);
    tsCtlPlay.addEventListener('click' , switchPlayPause);
    this.addEventListener('keydown' , eventKey , false);
    this.addEventListener('keyup' , () => tSkip = tSkipDefault , false);

    tsAnchor.addEventListener('mouseover' , () => {
        tsBarPointer.style.display = 'flex';
    });
    tsAnchor.addEventListener('mouseleave' , () => {
        tsBarPointer.style.display = 'none';
    });
    onTicks('mouseover', e => {
        e.target.appendChild(tsPointer);
        tsPointer.appendChild(tsPointerTag)
        tsPointer.style.display = tsPointerTag.style.display = 'flex';
    })
    onTicks('mouseleave', () => {
        tsPointer.style.display = tsPointerTag.style.display = 'none';
    })
});

function date2LSTStr(t){
    return new Date(t).toLocaleString('zh-TW', tOpt).substring(0, 10);
}

function time2LSTStr(t){
    var tStr = new Date(t).toLocaleString('zh-TW', tOpt).substring(11, 16);
    return (tStr.substring(0, 2) === '24' ? '00' : tStr.substring(0, 2)) + tStr.substring(2, 5);
}

function datetime2LSTStr(t){
    var tStr = new Date(t).toLocaleString('zh-TW', tOpt).substring(0, 16);
    return tStr.substring(11, 13) === '24' ? (tStr.substring(0, 11) + '00' + tStr.substring(13, 16)) : tStr;
}

function datetime2UTCStr(t){
    var tStr = new Date(t).toISOString().substring(0, 13);
    return tStr.substring(0, 4) + '/' + tStr.substring(5, 7) + '/' + tStr.substring(8, 10) + ' ' + tStr.substring(11, 13) + 'Z';
}

function timeDic(s){
    return {Y: s.substring(0, 4), M: s.substring(5, 7), D: s.substring(8, 10), 
            h: s.substring(11, 13), m: s.substring(14, 16)};
}

function findNewest(tSelect , tAll){
    var tNewest;
    for (const t of tAll){
        if (tSelect >= t) tNewest = t;
        else return tNewest;
    };
    return tNewest;
}

function time2BarWidth(t){
    return (t - tStart) / (tEnd - tStart) * 100 + '%';
}

function rewind(t , int){
    return (t - int * MIN2MSEC < tStart) ? tEndAll : t - int * MIN2MSEC;
}

function forward(t , int){
    return (t + int * MIN2MSEC > tEnd) ? tStartAll : t + int * MIN2MSEC;
}

function click2Time(e , track){
    return tStart + (tEnd - tStart) * (e.clientX - track.getBoundingClientRect().left) / track.clientWidth;
}

function click2NearestTime(e , track){
    var t = click2Time(e , track);
    var tAbs = [];
    tAll5Min.forEach(t5Min => tAbs.push(Math.abs(t - t5Min)));
    var tMin = Math.min(...tAbs);
    for (var i = 0; i < tAbs.length; i++){
        if (tAbs[i] === tMin) return tAll5Min[i];
    }
}

function click2BarWidth(e , track){
    return (e.clientX - track.getBoundingClientRect().left) / track.clientWidth * 100 + '%';
}

const on = (root, selector, eventType, childSelector, eventHandler) => {
    const elements = root.querySelectorAll(selector);
    for (const element of elements) {
        element.addEventListener(eventType, eventOnElement => {
            if (eventOnElement.target.matches(childSelector)) {
                eventHandler(eventOnElement);
            }
        })
    }
}