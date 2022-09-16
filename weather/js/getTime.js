var timeUTC = new Date().getTime();
var timeLST = timeUTC + 28800000;

var timeG = timeLST - 600000;   /* 10 mins delay */
var timeR = timeLST - 780000;   /* 13 mins delay */
var timeS = timeLST - 1380000;  /* 23 mins delay */
var timeL = timeLST - 300000;   /* 5 mins delay */
var timeT = timeLST - 1200000;   /* 20 mins delay */
var timeSKT = timeUTC - 10800000;   /* 3 hrs delay */
var timeTY = timeUTC - 7200000;   /* 2 hrs delay */

var datetimeG = new Date(timeG).toISOString();
var datetimeR = new Date(timeR).toISOString();
var datetimeS = new Date(timeS).toISOString();
var datetimeL = new Date(timeL).toISOString();
var datetimeT = new Date(timeT).toISOString();
var datetimeSKT = new Date(timeSKT).toISOString();
var datetimeTY = new Date(timeTY).toISOString();
var filenameG = datetimeG.substring(0, 4) + "-" + datetimeG.substring(5, 7) + "-" + datetimeG.substring(8, 10) + "_" + datetimeG.substring(11, 13) + "00";
var filenameR = datetimeR.substring(0, 4) + datetimeR.substring(5, 7) + datetimeR.substring(8, 10) + datetimeR.substring(11, 13) + datetimeR.substring(14, 15) + "0";
var filenameS = datetimeS.substring(0, 4) + "-" + datetimeS.substring(5, 7) + "-" + datetimeS.substring(8, 10) + "-" + datetimeS.substring(11, 13) + "-" + datetimeS.substring(14, 15) + "0";
var filenameL = datetimeL.substring(0, 4) + datetimeL.substring(5, 7) + datetimeL.substring(8, 10) + datetimeL.substring(11, 13) + datetimeL.substring(14, 15) + "0";
var filenameT = datetimeT.substring(0, 4) + "-" + datetimeT.substring(5, 7) + "-" + datetimeT.substring(8, 10) + "_" + datetimeT.substring(11, 13) + "00";
var filenameSKT = datetimeSKT.substring(2, 4) + datetimeSKT.substring(5, 7) + datetimeSKT.substring(8, 10) + "00";
var filenameTY = datetimeTY.substring(0, 4) + datetimeTY.substring(5, 7) + datetimeTY.substring(8, 10) + "0000";

var homeURL = "https://www.cwb.gov.tw/Data/";
var homeURL2 = "https://npd.cwb.gov.tw/NPD/";
window.addEventListener("DOMContentLoaded" , function(){
    document.querySelector("#rain>img").src = document.querySelector("#rain").href = homeURL + "rainfall/" + filenameG + ".QZJ8.jpg";
    document.querySelector("#radar>img").src = document.querySelector("#radar").href = homeURL + "radar/CV1_TW_3600_" + filenameR + ".png";
    document.querySelector("#sat>img").src = document.querySelector("#sat").href = homeURL + "satellite/TWI_IR1_CR_800/TWI_IR1_CR_800-" + filenameS + ".jpg";
    document.querySelector("#lgtn>img").src = document.querySelector("#lgtn").href = homeURL + "lightning/" + filenameL + "00_lgtl.jpg";
    document.querySelector("#temp>img").src = document.querySelector("#temp").href = homeURL + "temperature/" + filenameT +".GTP8.jpg";
    document.querySelector("#uvi>img").src = document.querySelector("#uvi").href = homeURL + "UVI/UVI.png";
    document.querySelector("#skt>img").src = document.querySelector("#skt").href = homeURL2 + "irisme_data/Weather/SKEWT/SKW___000_" + filenameSKT + "_46692.gif";
    document.querySelector("#ty>img").src = document.querySelector("#ty").href = homeURL + "typhoon/TY_NEWS/PTA_" + filenameTY + "-72_zhtw.png";
    
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