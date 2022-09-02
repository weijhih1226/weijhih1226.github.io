const svgTyEyeHtml = '<i class="icofont-hurricane icofont-2x">';
const svgTyEyePath = '<path d="M937.5 209.7c-75.39999999999998-26.899999999999977-146.39999999999998-45.19999999999999-221.5-26.69999999999999-12 3-24.600000000000023 5.800000000000011-28.700000000000045 18.900000000000006-4 12.900000000000006 6.800000000000068 19.900000000000006 15.200000000000045 26.299999999999983 174.70000000000005 132.90000000000003 187.70000000000005 383.90000000000003 8.100000000000023 544.2-135.30000000000007 120.79999999999995-295.3 167.79999999999995-475.6 124.19999999999993-66-16-121.6-51.700000000000045-172.5-106.30000000000007 38.099999999999994 12.5 71.6 23 106.5 28.90000000000009 37.80000000000001 6.399999999999977 74.69999999999999 5.199999999999932 111.80000000000001-2.800000000000068 13.399999999999977-2.8999999999999773 27.899999999999977-5.600000000000023 30.80000000000001-20.799999999999955 2.6999999999999886-14-10.5-20.700000000000045-19.80000000000001-28-65.30000000000001-51.60000000000002-107-117.70000000000005-124.4-199.30000000000007-21.900000000000006-102.59999999999997 4-194.99999999999994 63.400000000000006-278.4 112.09999999999997-157.39999999999998 348.49999999999994-239.7 534.7-186.99999999999997 65.20000000000005 18.5 122.20000000000005 51.69999999999999 172 106.79999999999998z m-438.3 142c-78.30000000000001 0.10000000000002274-146.39999999999998 67.5-147.8 146.2-1.3999999999999773 79 68.60000000000002 149.70000000000005 148 149.60000000000002 78.30000000000007-0.10000000000002274 146.39999999999998-67.5 147.80000000000007-146.2 1.3999999999999773-79-68.5-149.7-148.00000000000006-149.60000000000002z"/>'
const svgTdPath = '<path d="M500.2 62.5c-241.8 0-437.7 195.89999999999998-437.7 437.3 0 241.8 195.89999999999998 437.7 437.7 437.7 241.40000000000003 0 437.3-195.89999999999998 437.3-437.7 0-241.40000000000003-195.89999999999998-437.3-437.3-437.3z m301.59999999999997 466.5c-0.6999999999999318 9-2.199999999999932 19.100000000000023-4.699999999999932 30.299999999999955h-237.70000000000005v237.80000000000007c-11.199999999999932 2.5-21.600000000000023 4.2999999999999545-31.399999999999977 5.100000000000023-9.700000000000045 0.6999999999999318-19.80000000000001 1.099999999999909-30.30000000000001 1.099999999999909-9 0-17.69999999999999-0.39999999999997726-26.69999999999999-1.099999999999909-9-0.7000000000000455-19.100000000000023-2.5-30.30000000000001-5.100000000000023v-237.70000000000005h-237.5c-2.5-11.199999999999932-4.299999999999983-21.699999999999932-5.099999999999994-31.399999999999977-0.6999999999999886-9.700000000000045-1.0999999999999943-19.80000000000001-1.0999999999999943-30.30000000000001 0-9 0.4000000000000057-17.69999999999999 1.0999999999999943-26.69999999999999 0.700000000000017-9 2.5-19.100000000000023 5.099999999999994-30.30000000000001h237.40000000000003v-237.5c11.199999999999989-2.5 21.599999999999966-4 31.399999999999977-4.699999999999989 9.699999999999989-1.0999999999999943 19.80000000000001-1.4000000000000057 30.30000000000001-1.4000000000000057 9 0 17.999999999999943 0.4000000000000057 26.69999999999999 1.4000000000000057 9 0.6999999999999886 19.100000000000023 2.1999999999999886 30.299999999999955 4.699999999999989v237.40000000000003h237.80000000000007c2.5 11.199999999999989 4 21.599999999999966 4.699999999999932 31.399999999999977 1.1000000000000227 9.699999999999989 1.400000000000091 19.80000000000001 1.400000000000091 30.30000000000001 0.09999999999990905 9.099999999999966-0.3000000000000682 18.099999999999966-1.400000000000091 26.69999999999999z"/>'
const svgTyEyeColor = ['#ebebeb' , '#a8c2de' , '#66a8ef' , '#66ef6b' , '#e6ef66' , '#efb866' , '#ef6668' , '#ef66e1' , '#994290' , '#994243' , '#261010'];
const svgTyEyeLevel = [0 , 3 , 5 , 10 , 15 , 20 , 25 , 30 , 35 , 40 , 50];
const svgTyEyeWidth = 25;
const svgTyEyeHeight = 25;
const svgTyEyeStroke = '#777';
const svgTyEyeStrokeWidth = '20px';

L.XMLTyphoon = L.FeatureGroup.extend({
    initialize: function (url, options) {
		var xhr = new XMLHttpRequest();
		var parser = new DOMParser();
		xhr.open("get" , url , false);
        xhr.send(null);
		var xmlText = xhr.responseText;
		var xml = parser.parseFromString(xmlText, 'text/xml');

		this._xml = xml;
		this._layers = {};
		this._xmlOptions = options;

		if (xml) {
			this.addXML(xml, options);
		}
	},

	addXML: function (xml, options) {
		var layers = L.XMLTyphoon.parseXML(xml, options);
		if (!layers || !layers.length) return;
		for (var i = 0; i < layers.length; i++) {
			this.fire('addlayer', {
				layer: layers[i]
			});
			this.addLayer(layers[i]);
		}
		this.fire('loaded');
	},

	latLngs: []
})

L.xmlTyphoon = function(url, options) {
	return new L.XMLTyphoon(url, options);
};

L.Util.extend(L.XMLTyphoon, {
    parseXML: function (xml, options) {
		var layers = [], l;
		var typhoons = xml.getElementsByTagName('tropicalCyclone');
        for (var i = 0; i < typhoons.length; i++) {
            var loc = [] , layer = L.layerGroup();
            var year = typhoons[i].getElementsByTagName('year')[0].innerHTML;
            var isTyphoon = typhoons[i].getElementsByTagName('typhoon_name')[0] !== undefined;
            if (isTyphoon) {
                var typhoonName = typhoons[i].getElementsByTagName('typhoon_name')[0].innerHTML;
                var cwbTyphoonName = typhoons[i].getElementsByTagName('cwb_typhoon_name')[0].innerHTML;
                var cwbTyNo = typhoons[i].getElementsByTagName('cwb_ty_no')[0].innerHTML;
            } else {
                var typhoonName = 'unnamed';
                var cwbTyphoonName = '未命名';
                var cwbTyNo = '--';
            }
            var cwbTdNo = typhoons[i].getElementsByTagName('cwb_td_no')[0].innerHTML;
            var analysisData = typhoons[i].getElementsByTagName('analysis_data')[0].getElementsByTagName('fix');
            var locStart = [];
            var maxWindSpeed = [];
            for (var j = 0; j < analysisData.length; j++) {
                var isNow = j === analysisData.length - 1;
                var obsYYYY = analysisData[j].getElementsByTagName('fix_time')[0].innerHTML.substring(0 , 4);
                var obsMM = analysisData[j].getElementsByTagName('fix_time')[0].innerHTML.substring(5 , 7);
                var obsDD = analysisData[j].getElementsByTagName('fix_time')[0].innerHTML.substring(8 , 10);
                var obshh = analysisData[j].getElementsByTagName('fix_time')[0].innerHTML.substring(11 , 13);
                var obsmm = analysisData[j].getElementsByTagName('fix_time')[0].innerHTML.substring(14 , 16);
                var obsss = analysisData[j].getElementsByTagName('fix_time')[0].innerHTML.substring(17 , 19);
                var obsTimeS = obsYYYY + '/' + obsMM + '/' + obsDD + ' ' + obshh + ':' + obsmm + ':' + obsss + 'L';
                var locLon = analysisData[j].getElementsByTagName('coordinate')[0].innerHTML.split(',')[0];
                var locLat = analysisData[j].getElementsByTagName('coordinate')[0].innerHTML.split(',')[1];
                var locEnd = new L.LatLng(locLat, locLon);
                if (locStart) {layers.push(new L.polyline([locStart , locEnd] , {weight: options.weightLine, color: tyColor(maxWindSpeed , options)}))};
                var locStart = new L.LatLng(locLat, locLon);
                if (analysisData[j].getElementsByTagName('max_wind_speed')[0] === undefined) {
                    var maxWindSpeed = analysisData[j].getElementsByTagName('max_wind_speed')[0];
                } else {
                    var maxWindSpeed = analysisData[j].getElementsByTagName('max_wind_speed')[0].innerHTML;
                }
                if (analysisData[j].getElementsByTagName('max_gust_speed')[0] === undefined) {
                    var maxGustSpeed = analysisData[j].getElementsByTagName('max_gust_speed')[0];
                } else {
                    var maxGustSpeed = analysisData[j].getElementsByTagName('max_gust_speed')[0].innerHTML;
                }
                var pressure = analysisData[j].getElementsByTagName('pressure')[0].innerHTML;
                if (analysisData[j].getElementsByTagName('circle_of_15ms')[0].innerHTML.trim() === '') {
                    var circleOf15ms = 0;
                } else {
                    var circleOf15ms = analysisData[j].getElementsByTagName('circle_of_15ms')[0].getElementsByTagName('radius')[0].innerHTML;
                }
                if (analysisData[j].getElementsByTagName('circle_of_25ms')[0].innerHTML.trim() === '') {
                    var circleOf25ms = 0;
                } else {
                    var circleOf25ms = analysisData[j].getElementsByTagName('circle_of_25ms')[0].getElementsByTagName('radius')[0].innerHTML;
                }
                var svgTyEyeStyle = `fill: ${isNow ? tyColor(maxWindSpeed , options) : options.colorPastIn}; opacity: ${isNow ? 1 : .5}`;
                var cwbStrength = tyStrength(maxWindSpeed);
                var titlePoint = cwbStrength + ' ' + cwbTyphoonName;

                var ty = [];
                ty.push(new L.Circle(new L.LatLng(locLat, locLon) , {
                    radius: circleOf15ms * 1000, 
                    weight: isNow ? options.weightLine : options.weightOut, 
                    color: isNow ? options.colorFcstOut : options.colorPastOut, 
                    opacity: isNow ? options.opacityFcst : options.opacityPast, 
                    fillOpacity: isNow ? options.fillOpacityFcst : options.fillOpacityPast, 
                    attribution: options.attribution, 
                }))
                ty.push(new L.Circle(new L.LatLng(locLat, locLon) , {
                    radius: circleOf25ms * 1000, 
                    weight: isNow ? options.weightLine : options.weightIn, 
                    color: isNow ? options.colorFcstIn : options.colorPastIn, 
                    opacity: isNow ? options.opacityFcst : options.opacityPast, 
                    fillOpacity: isNow ? options.fillOpacityFcst : options.fillOpacityPast, 
                    attribution: options.attribution, 
                }))
                ty.push(new L.Marker(new L.LatLng(locLat, locLon) , {
                    icon: L.divIcon({
                        className: "hurricane-pin",
                        iconAnchor: [12.5, 12.5],
                        html: `<svg ${svgTag} width="${svgTyEyeWidth}" height="${svgTyEyeHeight}" style="${svgTyEyeStyle}">${maxWindSpeed >= 17.2 ? svgTyEyePath : svgTdPath}</svg>`
                    }),
                    title: titlePoint + ' (' + obsTimeS + ')',
                    attribution: options.attribution, 
                }).bindPopup('<h3>' + titlePoint + ' (' + typhoonName + ')</h3>' + 
                    '<h4 style="display: inline;">TY/TD編號：</h4><h4 style="font-weight: normal; display: inline;">' + year + cwbTyNo + '/' + cwbTdNo + '<br></h4>' + 
                    '<h4 style="display: inline;">時間：</h4><h4 style="font-weight: normal; display: inline;">' + obsTimeS + '<br></h4>' + 
                    '<h4 style="display: inline;">經緯度：</h4><h4 style="font-weight: normal; display: inline;">' + locLon + ', ' + locLat + '<br></h4>' + 
                    '<h4 style="display: inline;">中心氣壓：</h4><h4 style="font-weight: normal; display: inline;">' + pressure + ' hPa<br></h4>' + 
                    '<h4 style="display: inline;">近中心最大風速：</h4><h4 style="font-weight: normal; display: inline;">' + maxWindSpeed + ' m/s<br></h4>' + 
                    '<h4 style="display: inline;">瞬間最大陣風：</h4><h4 style="font-weight: normal; display: inline;">' + maxGustSpeed + ' m/s<br></h4>' + 
                    '<h4 style="display: inline;">7級/10級風暴風半徑：</h4><h4 style="font-weight: normal; display: inline;">' + circleOf15ms + '/' + circleOf25ms + ' km<br></h4>',
                    {className: 'xml-popup'})
                )

                for (var k = 0; k < ty.length ; k++) {
                    layer.addLayer(ty[k]);
                    isNow ? ty[k].bindTooltip('<h3>' + titlePoint + '</h3><h4 style="font-weight: normal;">' + obsTimeS + ' - 最新位置</h4>' , {permanent: true}) : 
                            ty[k].bindTooltip('<h3>' + titlePoint + '</h3><h4 style="font-weight: normal;">' + obsTimeS + '</h4>');
                }
            }

            var forecastData = typhoons[i].getElementsByTagName('forecast_data')[0].getElementsByTagName('fix');
            for (var j = 0; j < forecastData.length; j++) {
                var initYYYY = forecastData[j].getElementsByTagName('init_time')[0].innerHTML.substring(0 , 4);
                var initMM = forecastData[j].getElementsByTagName('init_time')[0].innerHTML.substring(5 , 7);
                var initDD = forecastData[j].getElementsByTagName('init_time')[0].innerHTML.substring(8 , 10);
                var inithh = forecastData[j].getElementsByTagName('init_time')[0].innerHTML.substring(11 , 13);
                var initmm = forecastData[j].getElementsByTagName('init_time')[0].innerHTML.substring(14 , 16);
                var initss = forecastData[j].getElementsByTagName('init_time')[0].innerHTML.substring(17 , 19);
                var initTimeS = initYYYY + '/' + initMM + '/' + initDD + ' ' + inithh + ':' + initmm + ':' + initss + 'L';
                var tau = forecastData[j].getElementsByTagName('tau')[0].innerHTML;
                var fcstTime = new Date(new Date(initYYYY , initMM - 1 , initDD , inithh , initmm , initss).getTime() + tau * 3600000);
                var fcstYYYY = fcstTime.getFullYear().toString();
                var fcstMM = (fcstTime.getMonth() + 1).toString().padStart(2 , '0');
                var fcstDD = fcstTime.getDate().toString().padStart(2 , '0');
                var fcsthh = fcstTime.getHours().toString().padStart(2 , '0');
                var fcstmm = fcstTime.getMinutes().toString().padStart(2 , '0');
                var fcstss = fcstTime.getSeconds().toString().padStart(2 , '0');
                var fcstTimeS = fcstYYYY + '/' + fcstMM + '/' + fcstDD + ' ' + fcsthh + ':' + fcstmm + ':' + fcstss + 'L';
                var locLon = forecastData[j].getElementsByTagName('coordinate')[0].innerHTML.split(',')[0];
                var locLat = forecastData[j].getElementsByTagName('coordinate')[0].innerHTML.split(',')[1];
                var locEnd = new L.LatLng(locLat, locLon);
                if (locStart) {
                    layers.push(new L.polyline([locStart , locEnd] , {weight: options.weightLine, color: tyColor(maxWindSpeed , options)}));
                }
                var locStart = new L.LatLng(locLat, locLon);
                if (forecastData[j].getElementsByTagName('max_wind_speed')[0] === undefined) {
                    var maxWindSpeed = forecastData[j].getElementsByTagName('max_wind_speed')[0];
                } else {
                    var maxWindSpeed = forecastData[j].getElementsByTagName('max_wind_speed')[0].innerHTML;
                }
                if (forecastData[j].getElementsByTagName('max_gust_speed')[0] === undefined) {
                    var maxGustSpeed = forecastData[j].getElementsByTagName('max_gust_speed')[0];
                } else {
                    var maxGustSpeed = forecastData[j].getElementsByTagName('max_gust_speed')[0].innerHTML;
                }
                var pressure = forecastData[j].getElementsByTagName('pressure')[0].innerHTML;
                var movingSpeed = forecastData[j].getElementsByTagName('moving_speed')[0].innerHTML;
                var movingDirection = forecastData[j].getElementsByTagName('moving_direction')[0].innerHTML;
                if (forecastData[j].getElementsByTagName('circle_of_15ms')[0].innerHTML.trim() === '') {
                    var circleOf15ms = 0;
                } else {
                    var circleOf15ms = forecastData[j].getElementsByTagName('circle_of_15ms')[0].getElementsByTagName('radius')[0].innerHTML;
                }
                if (forecastData[j].getElementsByTagName('circle_of_25ms')[0].innerHTML.trim() === '') {
                    var circleOf25ms = 0;
                } else {
                    var circleOf25ms = forecastData[j].getElementsByTagName('circle_of_25ms')[0].getElementsByTagName('radius')[0].innerHTML;
                }
                var radiusOf70percentProbability = forecastData[j].getElementsByTagName('radius_of_70percent_probability')[0].innerHTML;
                var svgTyEyeStyle = `fill: ${tyColor(maxWindSpeed , options)}; opacity: .5`;
                var cwbStrength = tyStrength(maxWindSpeed);
                var titlePoint = cwbStrength + ' ' + cwbTyphoonName;

                var ty = [];
                ty.push(new L.Circle(new L.LatLng(locLat, locLon) , {
                    radius: circleOf15ms * 1000, 
                    weight: options.weightOut, 
                    color: options.colorFcstOut, 
                    opacity: options.opacityFcst, 
                    dashArray: '3', 
                    fillOpacity: options.fillOpacityFcst, 
                    attribution: options.attribution, 
                }))
                ty.push(new L.Circle(new L.LatLng(locLat, locLon) , {
                    radius: circleOf25ms * 1000, 
                    weight: options.weightIn, 
                    color: options.colorFcstIn, 
                    opacity: options.opacityFcst, 
                    dashArray: '3', 
                    fillOpacity: options.fillOpacityFcst, 
                    attribution: options.attribution, 
                }))
                ty.push(new L.Marker(new L.LatLng(locLat, locLon) , {
                    icon: L.divIcon({
                        className: "hurricane-pin",
                        iconAnchor: [12.5, 12.5],
                        html: `<svg ${svgTag} width="${svgTyEyeWidth}" height="${svgTyEyeHeight}" style="${svgTyEyeStyle}">${maxWindSpeed >= 17.2 ? svgTyEyePath : svgTdPath}</svg>`,
                    }),
                    title: titlePoint + ' (' + fcstTimeS + ')',
                    attribution: options.attribution, 
                }).bindPopup('<h3>' + titlePoint + ' (' + typhoonName + ')</h3>' + 
                    '<h4 style="display: inline;">TY/TD編號：</h4><h4 style="font-weight: normal; display: inline;">' + year + cwbTyNo + '/' + cwbTdNo + '<br></h4>' + 
                    '<h4 style="display: inline;">預測：</h4><h4 style="font-weight: normal; display: inline;">' + tau + ' hr<br></h4>' + 
                    '<h4 style="display: inline;">時間：</h4><h4 style="font-weight: normal; display: inline;">' + fcstTimeS + '<br></h4>' + 
                    '<h4 style="display: inline;">經緯度：</h4><h4 style="font-weight: normal; display: inline;">' + locLon + ', ' + locLat + '<br></h4>' + 
                    '<h4 style="display: inline;">中心氣壓：</h4><h4 style="font-weight: normal; display: inline;">' + pressure + ' hPa<br></h4>' + 
                    '<h4 style="display: inline;">近中心最大風速：</h4><h4 style="font-weight: normal; display: inline;">' + maxWindSpeed + ' m/s<br></h4>' + 
                    '<h4 style="display: inline;">瞬間最大陣風：</h4><h4 style="font-weight: normal; display: inline;">' + maxGustSpeed + ' m/s<br></h4>' + 
                    '<h4 style="display: inline;">7級/10級風暴風半徑：</h4><h4 style="font-weight: normal; display: inline;">' + circleOf15ms + '/' + circleOf25ms + ' km<br></h4>',
                    {className: 'xml-popup'})
                )

                for (var k = 0; k < ty.length ; k++) {
                    layer.addLayer(ty[k]);
                    ty[k].bindTooltip('<h3>' + titlePoint + '</h3><h4 style="font-weight: normal;">' + fcstTimeS + ' - 預測' + tau + ' hr位置</h4>');
                }
            }
            layers.push(layer);
        }
		return layers;
	},
});

function isTyphoon(maxWindSpeed) {return maxWindSpeed >= 17.2 ? true : false}

function tyStrength(maxWindSpeed) {
    return maxWindSpeed >= 51 ? '強烈颱風' : 
           maxWindSpeed >= 32.7 ? '中度颱風' : 
           maxWindSpeed >= 17.2 ? '輕度颱風' : 
           '熱帶性低氣壓'
}

function tyColor(maxWindSpeed , options) {
    return maxWindSpeed >= 51 ? options.colorL : 
           maxWindSpeed >= 32.7 ? options.colorM : 
           maxWindSpeed >= 17.2 ? options.colorS : 
           options.colorTD
}