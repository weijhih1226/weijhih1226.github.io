var timeUTC = new Date().getTime();
var timeLST = timeUTC + 28800000;

var timeG = timeLST - 600000;   /* 10 mins delay */
var timeR = timeLST - 780000;   /* 13 mins delay */
var timeS = timeLST - 1380000;  /* 23 mins delay */
var timeL = timeLST - 300000;   /* 5 mins delay */
var timeT = timeLST - 1200000;   /* 20 mins delay */
var timeSKT = timeUTC - 10800000;   /* 3 hrs delay */

var datetimeG = new Date(timeG).toISOString();
var datetimeR = new Date(timeR).toISOString();
var datetimeS = new Date(timeS).toISOString();
var datetimeL = new Date(timeL).toISOString();
var datetimeT = new Date(timeT).toISOString();
var datetimeSKT = new Date(timeSKT).toISOString();
var filenameG = datetimeG.substring(0, 4) + "-" + datetimeG.substring(5, 7) + "-" + datetimeG.substring(8, 10) + "_" + datetimeG.substring(11, 13) + "00";
var filenameR = datetimeR.substring(0, 4) + datetimeR.substring(5, 7) + datetimeR.substring(8, 10) + datetimeR.substring(11, 13) + datetimeR.substring(14, 15) + "0";
var filenameS = datetimeS.substring(0, 4) + "-" + datetimeS.substring(5, 7) + "-" + datetimeS.substring(8, 10) + "-" + datetimeS.substring(11, 13) + "-" + datetimeS.substring(14, 15) + "0";
var filenameL = datetimeL.substring(0, 4) + datetimeL.substring(5, 7) + datetimeL.substring(8, 10) + datetimeL.substring(11, 13) + datetimeL.substring(14, 15) + "0";
var filenameT = datetimeT.substring(0, 4) + "-" + datetimeT.substring(5, 7) + "-" + datetimeT.substring(8, 10) + "_" + datetimeT.substring(11, 13) + "00";
var filenameSKT = datetimeSKT.substring(2, 4) + datetimeSKT.substring(5, 7) + datetimeSKT.substring(8, 10) + "00";

var homeURL = "https://www.cwb.gov.tw/Data/";
var homeURL2 = "https://npd.cwb.gov.tw/NPD/";
window.addEventListener("DOMContentLoaded" , function(){
    document.getElementById("rain").src = homeURL + "rainfall/" + filenameG + ".QZJ8.jpg";
    document.getElementById("radar").src = homeURL + "radar/CV1_TW_3600_" + filenameR + ".png";
    document.getElementById("sat").src = homeURL + "satellite/TWI_IR1_CR_800/TWI_IR1_CR_800-" + filenameS + ".jpg";
    document.getElementById("lgtn").src = homeURL + "lightning/" + filenameL + "00_lgtl.jpg";
    document.getElementById("temp").src = homeURL + "temperature/" + filenameT +".GTP8.jpg";
    document.getElementById("uvi").src = homeURL + "UVI/UVI.png";
    document.getElementById("skt").src = homeURL2 + "irisme_data/Weather/SKEWT/SKW___000_" + filenameSKT + "_46692.gif";
})
