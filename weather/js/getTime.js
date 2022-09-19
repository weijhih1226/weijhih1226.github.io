const min2msec = 60000;
const timeStep = 10;
const timeNum = 144;
var timeUTC = new Date().getTime();
var timeLST = timeUTC + 480 * min2msec;

var timeG = timeLST - 10 * min2msec;   /* 10 mins delay */
var timeR = timeLST - 13 * min2msec;   /* 13 mins delay */
var timeS = timeLST - 23 * min2msec;  /* 23 mins delay */
var timeL = timeLST - 5 * min2msec;   /* 5 mins delay */
var timeT = timeLST - 20 * min2msec;   /* 20 mins delay */
var timeSKT = timeUTC - 180 * min2msec;   /* 3 hrs delay */
var timeTY = timeUTC - 120 * min2msec;   /* 2 hrs delay */

var timeStrG = new Date(timeG).toISOString();
var timeStrR = new Date(timeR).toISOString();
var timeStrS = new Date(timeS).toISOString();
var timeStrL = new Date(timeL).toISOString();
var timeStrT = new Date(timeT).toISOString();
var timeStrSKT = new Date(timeSKT).toISOString();
var timeStrTY = new Date(timeTY).toISOString();

var homeURL = "https://www.cwb.gov.tw/Data/";
var homeURL2 = "https://npd.cwb.gov.tw/NPD/";
var pathError = 'https://www.cwb.gov.tw/V8/assets/img/404_Yunbau.png'
var pathG = homeURL + "rainfall/" + timeStrG.substring(0, 4) + "-" + timeStrG.substring(5, 7) + "-" + timeStrG.substring(8, 10) + "_" + timeStrG.substring(11, 13) + (parseInt(timeStrG.substring(14, 15)) < 3 ? "0" : "3") + "0.QZJ8.jpg";
var pathR = homeURL + "radar/CV1_TW_3600_" + timeStrR.substring(0, 4) + timeStrR.substring(5, 7) + timeStrR.substring(8, 10) + timeStrR.substring(11, 13) + timeStrR.substring(14, 15) + "0.png";
var pathSatVSgTW = homeURL + "satellite/TWI_VIS_Gray_1350/TWI_VIS_Gray_1350-" + timeStrS.substring(0, 4) + "-" + timeStrS.substring(5, 7) + "-" + timeStrS.substring(8, 10) + "-" + timeStrS.substring(11, 13) + "-" + timeStrS.substring(14, 15) + "0.jpg";
var pathSatVStTW = homeURL + "satellite/TWI_VIS_TRGB_1375/TWI_VIS_TRGB_1375-" + timeStrS.substring(0, 4) + "-" + timeStrS.substring(5, 7) + "-" + timeStrS.substring(8, 10) + "-" + timeStrS.substring(11, 13) + "-" + timeStrS.substring(14, 15) + "0.jpg";
var pathSatIRcTW = homeURL + "satellite/TWI_IR1_CR_800/TWI_IR1_CR_800-" + timeStrS.substring(0, 4) + "-" + timeStrS.substring(5, 7) + "-" + timeStrS.substring(8, 10) + "-" + timeStrS.substring(11, 13) + "-" + timeStrS.substring(14, 15) + "0.jpg";
var pathSatIReTW = homeURL + "satellite/TWI_IR1_MB_800/TWI_IR1_MB_800-" + timeStrS.substring(0, 4) + "-" + timeStrS.substring(5, 7) + "-" + timeStrS.substring(8, 10) + "-" + timeStrS.substring(11, 13) + "-" + timeStrS.substring(14, 15) + "0.jpg";
var pathL = homeURL + "lightning/" + timeStrL.substring(0, 4) + timeStrL.substring(5, 7) + timeStrL.substring(8, 10) + timeStrL.substring(11, 13) + timeStrL.substring(14, 15) + "000_lgtl.jpg";
var pathT = homeURL + "temperature/" + timeStrT.substring(0, 4) + "-" + timeStrT.substring(5, 7) + "-" + timeStrT.substring(8, 10) + "_" + timeStrT.substring(11, 13) + "00.GTP8.jpg";
var pathUVI = homeURL + "UVI/UVI.png"
var pathSKT = homeURL2 + "irisme_data/Weather/SKEWT/SKW___000_" + timeStrSKT.substring(2, 4) + timeStrSKT.substring(5, 7) + timeStrSKT.substring(8, 10) + (parseInt(timeStrSKT.substring(11, 13)) < 12 ? "00" : "12") + "_46692.gif";
var pathTY = homeURL + "typhoon/TY_NEWS/PTA_" + timeStrTY.substring(0, 4) + timeStrTY.substring(5, 7) + timeStrTY.substring(8, 10) + "0000-72_zhtw.png";
window.addEventListener("DOMContentLoaded" , function(){
    rain = document.querySelector("#rain");
    radar = document.querySelector("#radar");
    satvsg = document.querySelector("#satvsg");
    satvst = document.querySelector("#satvst");
    satirc = document.querySelector("#satirc");
    satire = document.querySelector("#satire");
    lgtn = document.querySelector("#lgtn");
    temp = document.querySelector("#temp");
    uvi = document.querySelector("#uvi");
    skt = document.querySelector("#skt");
    ty = document.querySelector("#ty");
    
    rain.childNodes[0].onerror = function() {rain.childNodes[0].src = pathError; rain.removeAttribute("href")}
    radar.childNodes[0].onerror = function() {radar.childNodes[0].src = pathError; radar.removeAttribute("href")}
    satvsg.childNodes[0].onerror = function() {satvsg.childNodes[0].src = pathError; satvsg.removeAttribute("href")}
    satvst.childNodes[0].onerror = function() {satvst.childNodes[0].src = pathError; satvst.removeAttribute("href")}
    satirc.childNodes[0].onerror = function() {satirc.childNodes[0].src = pathError; satirc.removeAttribute("href")}
    satire.childNodes[0].onerror = function() {satire.childNodes[0].src = pathError; satire.removeAttribute("href")}
    lgtn.childNodes[0].onerror = function() {lgtn.childNodes[0].src = pathError; lgtn.removeAttribute("href")}
    temp.childNodes[0].onerror = function() {temp.childNodes[0].src = pathError; temp.removeAttribute("href")}
    uvi.childNodes[0].onerror = function() {uvi.childNodes[0].src = pathError; uvi.removeAttribute("href")}
    skt.childNodes[0].onerror = function() {skt.childNodes[0].src = pathError; skt.removeAttribute("href")}
    ty.childNodes[0].onerror = function() {ty.childNodes[0].src = pathError; ty.removeAttribute("href")}

    rain.childNodes[0].src = rain.href = pathG;
    radar.childNodes[0].src = radar.href = pathR;
    satvsg.childNodes[0].src = satvsg.href = pathSatVSgTW;
    satvst.childNodes[0].src = satvst.href = pathSatVStTW;
    satirc.childNodes[0].src = satirc.href = pathSatIRcTW;
    satire.childNodes[0].src = satire.href = pathSatIReTW;
    lgtn.childNodes[0].src = lgtn.href = pathL;
    temp.childNodes[0].src = temp.href = pathT;
    uvi.childNodes[0].src = uvi.href = pathUVI;
    skt.childNodes[0].src = skt.href = pathSKT;
    ty.childNodes[0].src = ty.href = pathTY;

    addElementTimeLi('.inmenu' , timeLST , 144);

    // fetch(document.querySelector("#rain>img").src, {method: 'get'})
    // .then(function(response) {
    //     console.log(response)
    // }).catch(function(err) {
    //     console.log(err)
    // })

    // var xhr = new XMLHttpRequest();

    // xhr.open('GET', homeURL + "rainfall/" + filenameG + ".QZJ8.jpg");
    // // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader('Content-Type', 'image/jpeg');
    // xhr.responseType = "image";
    // xhr.send(null);
    // console.log(xhr)
    // try { // statements to try
    //     document.querySelector("#rain>img").src = homeURL + "rainfall/" + filenameG + ".QZJ81.jpg";
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

function addElementTimeLi(obj_p , time) {
    var obj_p = document.querySelector(obj_p);
    for (t = 0; t < timeNum; t++) {
        addElementLi(obj_p , time)
    }
}

function addElementLi(obj_p , time) {
    var timeStr = new Date((time - t * timeStep * min2msec)).toISOString();
    var timeUTCStr = new Date((time - 480 * min2msec - t * timeStep * min2msec)).toISOString();
    var timeHTML = timeStr.substring(0, 4) + "/" + timeStr.substring(5, 7) + "/" + timeStr.substring(8, 10) + " " + timeStr.substring(11, 13) + ':' + timeStr.substring(14, 15) + '0';
    var id = timeStr.substring(0, 4) + timeStr.substring(5, 7) + timeStr.substring(8, 10) + "_" + timeStr.substring(11, 13) + timeStr.substring(14, 15) + '0';
    
    var li = document.createElement("li");
    li.setAttribute("id" , id);
    li.innerHTML = '<a href="#">' + timeHTML + '</a>';
    li.addEventListener('mouseover' , function() {
        var pathG = homeURL + "rainfall/" + timeStr.substring(0, 4) + "-" + timeStr.substring(5, 7) + "-" + timeStr.substring(8, 10) + "_" + timeStr.substring(11, 13) + (parseInt(timeStr.substring(14, 15)) < 3 ? "0" : "3") + "0.QZJ8.jpg";
        var pathR = homeURL + "radar/CV1_TW_3600_" + timeStr.substring(0, 4) + timeStr.substring(5, 7) + timeStr.substring(8, 10) + timeStr.substring(11, 13) + timeStr.substring(14, 15) + "0.png";
        var pathSatVSgTW = homeURL + "satellite/TWI_VIS_Gray_1350/TWI_VIS_Gray_1350-" + timeStr.substring(0, 4) + "-" + timeStr.substring(5, 7) + "-" + timeStr.substring(8, 10) + "-" + timeStr.substring(11, 13) + "-" + timeStr.substring(14, 15) + "0.jpg";
        var pathSatVStTW = homeURL + "satellite/TWI_VIS_TRGB_1375/TWI_VIS_TRGB_1375-" + timeStr.substring(0, 4) + "-" + timeStr.substring(5, 7) + "-" + timeStr.substring(8, 10) + "-" + timeStr.substring(11, 13) + "-" + timeStr.substring(14, 15) + "0.jpg";
        var pathSatIRcTW = homeURL + "satellite/TWI_IR1_CR_800/TWI_IR1_CR_800-" + timeStr.substring(0, 4) + "-" + timeStr.substring(5, 7) + "-" + timeStr.substring(8, 10) + "-" + timeStr.substring(11, 13) + "-" + timeStr.substring(14, 15) + "0.jpg";
        var pathSatIReTW = homeURL + "satellite/TWI_IR1_MB_800/TWI_IR1_MB_800-" + timeStr.substring(0, 4) + "-" + timeStr.substring(5, 7) + "-" + timeStr.substring(8, 10) + "-" + timeStr.substring(11, 13) + "-" + timeStr.substring(14, 15) + "0.jpg";
        var pathL = homeURL + "lightning/" + timeStr.substring(0, 4) + timeStr.substring(5, 7) + timeStr.substring(8, 10) + timeStr.substring(11, 13) + timeStr.substring(14, 15) + "000_lgtl.jpg";
        var pathT = homeURL + "temperature/" + timeStr.substring(0, 4) + "-" + timeStr.substring(5, 7) + "-" + timeStr.substring(8, 10) + "_" + timeStr.substring(11, 13) + "00.GTP8.jpg";
        var pathSKT = homeURL2 + "irisme_data/Weather/SKEWT/SKW___000_" + timeUTCStr.substring(2, 4) + timeUTCStr.substring(5, 7) + timeUTCStr.substring(8, 10) + (parseInt(timeUTCStr.substring(11, 13)) < 12 ? "00" : "12") + "_46692.gif";

        try {
            document.querySelector("#rain>img").src = document.querySelector("#rain").href = pathG;
            document.querySelector("#radar>img").src = document.querySelector("#radar").href = pathR;
            document.querySelector("#satvsg>img").src = document.querySelector("#satvsg").href = pathSatVSgTW;
            document.querySelector("#satvst>img").src = document.querySelector("#satvst").href = pathSatVStTW;
            document.querySelector("#satirc>img").src = document.querySelector("#satirc").href = pathSatIRcTW;
            document.querySelector("#satire>img").src = document.querySelector("#satire").href = pathSatIReTW;
            document.querySelector("#lgtn>img").src = document.querySelector("#lgtn").href = pathL;
            document.querySelector("#temp>img").src = document.querySelector("#temp").href = pathT;
            document.querySelector("#skt>img").src = document.querySelector("#skt").href = pathSKT;
        }
        catch (e) {
            console.log('Fail')
        }
        
    })
    obj_p.appendChild(li);
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