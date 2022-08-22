const svgTag2 = 'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"';
const windSvgPath2 = '<path d="M937.5 209.7c-75.39999999999998-26.899999999999977-146.39999999999998-45.19999999999999-221.5-26.69999999999999-12 3-24.600000000000023 5.800000000000011-28.700000000000045 18.900000000000006-4 12.900000000000006 6.800000000000068 19.900000000000006 15.200000000000045 26.299999999999983 174.70000000000005 132.90000000000003 187.70000000000005 383.90000000000003 8.100000000000023 544.2-135.30000000000007 120.79999999999995-295.3 167.79999999999995-475.6 124.19999999999993-66-16-121.6-51.700000000000045-172.5-106.30000000000007 38.099999999999994 12.5 71.6 23 106.5 28.90000000000009 37.80000000000001 6.399999999999977 74.69999999999999 5.199999999999932 111.80000000000001-2.800000000000068 13.399999999999977-2.8999999999999773 27.899999999999977-5.600000000000023 30.80000000000001-20.799999999999955 2.6999999999999886-14-10.5-20.700000000000045-19.80000000000001-28-65.30000000000001-51.60000000000002-107-117.70000000000005-124.4-199.30000000000007-21.900000000000006-102.59999999999997 4-194.99999999999994 63.400000000000006-278.4 112.09999999999997-157.39999999999998 348.49999999999994-239.7 534.7-186.99999999999997 65.20000000000005 18.5 122.20000000000005 51.69999999999999 172 106.79999999999998z m-438.3 142c-78.30000000000001 0.10000000000002274-146.39999999999998 67.5-147.8 146.2-1.3999999999999773 79 68.60000000000002 149.70000000000005 148 149.60000000000002 78.30000000000007-0.10000000000002274 146.39999999999998-67.5 147.80000000000007-146.2 1.3999999999999773-79-68.5-149.7-148.00000000000006-149.60000000000002z"/>'
const windSvgColor2 = ['#ebebeb' , '#a8c2de' , '#66a8ef' , '#66ef6b' , '#e6ef66' , '#efb866' , '#ef6668' , '#ef66e1' , '#994290' , '#994243' , '#261010'];
const windSvgLevel2 = [0 , 3 , 5 , 10 , 15 , 20 , 25 , 30 , 35 , 40 , 50];
const windSvgWidth2 = 25;
const windSvgHeight2 = 25;
const windSvgStroke2 = '#777';
const windSvgStrokeWidth2 = '20px';

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
            var location = [] , layer = L.layerGroup();
            var year = typhoons[i].getElementsByTagName('year')[0].innerHTML;
            var typhoonName = typhoons[i].getElementsByTagName('typhoon_name')[0].innerHTML;
            var cwbTyphoonName = typhoons[i].getElementsByTagName('cwb_typhoon_name')[0].innerHTML;
            var cwbTdNo = typhoons[i].getElementsByTagName('cwb_td_no')[0].innerHTML;
            var cwbTyNo = typhoons[i].getElementsByTagName('cwb_ty_no')[0].innerHTML;
            var analysisData = typhoons[i].getElementsByTagName('analysis_data')[0].getElementsByTagName('fix');
            for (var j = 0; j < analysisData.length; j++) {
                var obsYYYY = analysisData[j].getElementsByTagName('fix_time')[0].innerHTML.substring(0 , 4);
                var obsMM = analysisData[j].getElementsByTagName('fix_time')[0].innerHTML.substring(5 , 7);
                var obsDD = analysisData[j].getElementsByTagName('fix_time')[0].innerHTML.substring(8 , 10);
                var obshh = analysisData[j].getElementsByTagName('fix_time')[0].innerHTML.substring(11 , 13);
                var obsmm = analysisData[j].getElementsByTagName('fix_time')[0].innerHTML.substring(14 , 16);
                var obsss = analysisData[j].getElementsByTagName('fix_time')[0].innerHTML.substring(17 , 19);
                var obsTime = obsYYYY + '/' + obsMM + '/' + obsDD + ' ' + obshh + ':' + obsmm + ':' + obsss + ' L';
                var locLon = analysisData[j].getElementsByTagName('coordinate')[0].innerHTML.split(',')[0];
                var locLat = analysisData[j].getElementsByTagName('coordinate')[0].innerHTML.split(',')[1];
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
                if (analysisData[j].getElementsByTagName('circle_of_15ms')[0].innerHTML === '') {
                    var circleOf15ms = 0;
                } else {
                    var circleOf15ms = analysisData[j].getElementsByTagName('circle_of_15ms')[0].getElementsByTagName('radius')[0].innerHTML;
                }
                if (analysisData[j].getElementsByTagName('circle_of_25ms')[0].innerHTML === '') {
                    var circleOf25ms = 0;
                } else {
                    var circleOf25ms = analysisData[j].getElementsByTagName('circle_of_25ms')[0].getElementsByTagName('radius')[0].innerHTML;
                }

                location.push(new L.LatLng(locLat, locLon))

                l = new L.Circle(new L.LatLng(locLat, locLon) , {
                    radius: circleOf25ms * 1000, 
                    color: options.color1, 
                    fillOpacity: options.fillOpacity1, 
                    attribution: options.attribution, 
                })
                layer.addLayer(l);

                var windSvgStyle2 = `fill: ${options.color1};`;
                l = new L.Marker(new L.LatLng(locLat, locLon) , {
                    icon: L.divIcon({
                        className: "hurricane-pin",
                        iconAnchor: [12.5, 12.5],
                        // html: `<i class="icofont-hurricane icofont-2x">`,
                        html: `<svg ${svgTag2} width="${windSvgWidth2}" height="${windSvgHeight2}" style="${windSvgStyle2}">${windSvgPath2}</svg>`,
                    }),
                    title: cwbTyphoonName + '颱風 (' + obsTime + ')',
                    attribution: options.attribution, 
                })
                layer.addLayer(l);

                l.bindPopup('<h3>' + cwbTyphoonName + '颱風 (' + typhoonName + ')</h3>' + 
                '<h4 style="font-weight: bold; display: inline;">TY/TD編號：</h4><h4 style="font-weight: normal; display: inline;">' + year + cwbTyNo + '/' + cwbTdNo + '<br></h4>' + 
                '<h4 style="font-weight: bold; display: inline;">定位時間：</h4><h4 style="font-weight: normal; display: inline;">' + obsTime + '<br></h4>' + 
                '<h4 style="font-weight: bold; display: inline;">經緯度：</h4><h4 style="font-weight: normal; display: inline;">' + locLon + ', ' + locLat + '<br></h4>' + 
                '<h4 style="font-weight: bold; display: inline;">中心氣壓：</h4><h4 style="font-weight: normal; display: inline;">' + pressure + ' hPa<br></h4>' + 
                '<h4 style="font-weight: bold; display: inline;">近中心最大風速：</h4><h4 style="font-weight: normal; display: inline;">' + maxWindSpeed + ' m/s<br></h4>' + 
                '<h4 style="font-weight: bold; display: inline;">瞬間最大陣風：</h4><h4 style="font-weight: normal; display: inline;">' + maxGustSpeed + ' m/s<br></h4>' + 
                '<h4 style="font-weight: bold; display: inline;">7級/10級風暴風半徑：</h4><h4 style="font-weight: normal; display: inline;">' + circleOf15ms + '/' + circleOf25ms + ' km<br></h4>',
                {className: 'xml-popup'});
                l.bindTooltip('<h3>' + cwbTyphoonName + '颱風 (' + typhoonName + ')</h3>' + '<h4 style="font-weight: normal;">' + obsTime + '</h4>');

                l = new L.Circle(new L.LatLng(locLat, locLon) , {
                    radius: circleOf15ms * 1000, 
                    color: options.color2, 
                    fillOpacity: options.fillOpacity2, 
                    attribution: options.attribution, 
                })
                layer.addLayer(l);
            }
            var forecastData = typhoons[i].getElementsByTagName('forecast_data')[0].getElementsByTagName('fix');
            for (var j = 0; j < forecastData.length; j++) {
                var initTime = forecastData[j].getElementsByTagName('init_time')[0].innerHTML;
                var tau = forecastData[j].getElementsByTagName('tau')[0].innerHTML;
                var locLon = forecastData[j].getElementsByTagName('coordinate')[0].innerHTML.split(',')[0];
                var locLat = forecastData[j].getElementsByTagName('coordinate')[0].innerHTML.split(',')[1];
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
                if (forecastData[j].getElementsByTagName('circle_of_15ms')[0].innerHTML === '') {
                    var circleOf15ms = 0;
                } else {
                    var circleOf15ms = forecastData[j].getElementsByTagName('circle_of_15ms')[0].getElementsByTagName('radius')[0].innerHTML;
                }
                if (forecastData[j].getElementsByTagName('circle_of_25ms')[0].innerHTML === '') {
                    var circleOf25ms = 0;
                } else {
                    var circleOf25ms = forecastData[j].getElementsByTagName('circle_of_25ms')[0].getElementsByTagName('radius')[0].innerHTML;
                }
                var radiusOf70percentProbability = forecastData[j].getElementsByTagName('radius_of_70percent_probability')[0].innerHTML;

                location.push(new L.LatLng(locLat, locLon))

                l = new L.Circle(new L.LatLng(locLat, locLon) , {
                    radius: circleOf25ms * 1000, 
                    color: options.color3, 
                    fillOpacity: options.fillOpacity3, 
                    attribution: options.attribution, 
                })
                layer.addLayer(l);

                l = new L.Circle(new L.LatLng(locLat, locLon) , {
                    radius: circleOf15ms * 1000, 
                    color: options.color4, 
                    fillOpacity: options.fillOpacity4, 
                    attribution: options.attribution, 
                })
                layer.addLayer(l);
            }
            layers.push(new L.polyline(location , {weight: options.weight}));
            layers.push(layer);
        }
		// for (var i = 0; i < locs.length; i++) {
		// 	var locName = locs[i].getElementsByTagName('locationName')[0].innerHTML;
		// 	if (locs[i].getElementsByTagName('lat_wgs84')[0] !== undefined) {
		// 		var locLat = locs[i].getElementsByTagName('lat_wgs84')[0].innerHTML;
		// 		var locLon = locs[i].getElementsByTagName('lon_wgs84')[0].innerHTML;
		// 	} else {
		// 		var locLonLat , locLon , locLat;
		// 		var locLat67 = locs[i].getElementsByTagName('lat')[0].innerHTML;
		// 		var locLon67 = locs[i].getElementsByTagName('lon')[0].innerHTML;
		// 		locLonLat = TWD67toTWD97(locLon67 , locLat67);
		// 		locLon = locLonLat.lon97;
		// 		locLat = locLonLat.lat97;
		// 	}

		// 	var stID = locs[i].getElementsByTagName('stationId')[0].innerHTML;
		// 	var obsYYYY = locs[i].getElementsByTagName('time')[0].childNodes[1].innerHTML.substring(0 , 4);
		// 	var obsMM = locs[i].getElementsByTagName('time')[0].childNodes[1].innerHTML.substring(5 , 7);
		// 	var obsDD = locs[i].getElementsByTagName('time')[0].childNodes[1].innerHTML.substring(8 , 10);
		// 	var obshh = locs[i].getElementsByTagName('time')[0].childNodes[1].innerHTML.substring(11 , 13);
		// 	var obsmm = locs[i].getElementsByTagName('time')[0].childNodes[1].innerHTML.substring(14 , 16);
		// 	var obsss = locs[i].getElementsByTagName('time')[0].childNodes[1].innerHTML.substring(17 , 19);
		// 	var obsTime = obsYYYY + '/' + obsMM + '/' + obsDD + ' ' + obshh + ':' + obsmm + ':' + obsss + ' L';
		// 	var element = locs[i].getElementsByTagName('weatherElement');

		// 	if (element[1].childNodes[1].innerHTML === 'WDIR') {
		// 		const windSpeed = element[2].childNodes[3].childNodes[1].innerHTML;
		// 		if (windSpeed >= windSvgLevel[0] & windSpeed < windSvgLevel[1]) {
		// 			var windSvgStyle = `fill: ${windSvgColor[0]}; stroke: ${windSvgStroke}; stroke-width: ${windSvgStrokeWidth};`;
		// 		} else if (windSpeed >= windSvgLevel[1] & windSpeed < windSvgLevel[2]) {
		// 			var windSvgStyle = `fill: ${windSvgColor[1]}; stroke: ${windSvgStroke}; stroke-width: ${windSvgStrokeWidth};`;
		// 		} else if (windSpeed >= windSvgLevel[2] & windSpeed < windSvgLevel[3]) {
		// 			var windSvgStyle = `fill: ${windSvgColor[2]}; stroke: ${windSvgStroke}; stroke-width: ${windSvgStrokeWidth};`;
		// 		} else if (windSpeed >= windSvgLevel[3] & windSpeed < windSvgLevel[4]) {
		// 			var windSvgStyle = `fill: ${windSvgColor[3]}; stroke: ${windSvgStroke}; stroke-width: ${windSvgStrokeWidth};`;
		// 		} else if (windSpeed >= windSvgLevel[4] & windSpeed < windSvgLevel[5]) {
		// 			var windSvgStyle = `fill: ${windSvgColor[4]}; stroke: ${windSvgStroke}; stroke-width: ${windSvgStrokeWidth};`;
		// 		} else if (windSpeed >= windSvgLevel[5] & windSpeed < windSvgLevel[6]) {
		// 			var windSvgStyle = `fill: ${windSvgColor[5]}; stroke: ${windSvgStroke}; stroke-width: ${windSvgStrokeWidth};`;
		// 		} else if (windSpeed >= windSvgLevel[6] & windSpeed < windSvgLevel[7]) {
		// 			var windSvgStyle = `fill: ${windSvgColor[6]}; stroke: ${windSvgStroke}; stroke-width: ${windSvgStrokeWidth};`;
		// 		} else if (windSpeed >= windSvgLevel[6] & windSpeed < windSvgLevel[8]) {
		// 			var windSvgStyle = `fill: ${windSvgColor[7]}; stroke: ${windSvgStroke}; stroke-width: ${windSvgStrokeWidth};`;
		// 		} else if (windSpeed >= windSvgLevel[8] & windSpeed < windSvgLevel[9]) {
		// 			var windSvgStyle = `fill: ${windSvgColor[8]}; stroke: ${windSvgStroke}; stroke-width: ${windSvgStrokeWidth};`;
		// 		} else if (windSpeed >= windSvgLevel[9] & windSpeed < windSvgLevel[10]) {
		// 			var windSvgStyle = `fill: ${windSvgColor[9]}; stroke: ${windSvgStroke}; stroke-width: ${windSvgStrokeWidth};`;
		// 		} else if (windSpeed >= windSvgLevel[10]) {
		// 			var windSvgStyle = `fill: ${windSvgColor[10]}; stroke: ${windSvgStroke}; stroke-width: ${windSvgStrokeWidth};`;
		// 		};

		// 		l = new L.Marker(new L.LatLng(locLat, locLon) , {
		// 			icon: L.divIcon({
		// 				className: "wind-pin",
		// 				iconAnchor: [12.5, 12.5],
		// 				html: `<svg ${svgTag} width="${windSvgWidth}" height="${windSvgHeight}" style="${windSvgStyle}">${windSvgPath}</svg>`,
		// 			}),
		// 			title: locName + '：' + windSpeed + ' m/s',
		// 			rotationAngle: parseFloat(element[1].childNodes[3].childNodes[1].innerHTML) + 180,
		// 			attribution: options.attribution, 
		// 		})
		// 		if (l) { layers.push(l); }
		// 	} else {
		// 		l = new L.CircleMarker(new L.LatLng(locLat, locLon) , {
		// 			radius: options.radius, 
		// 			color: options.color, 
		// 			fillOpacity: options.fillOpacity, 
		// 			attribution: options.attribution, 
		// 		})
		// 		if (l) { layers.push(l); }
		// 	}

		// 	var k, j, descr = '';
		// 	for (k = 0; k < element.length; k++) {
		// 		var obsData = processObs(element[k].childNodes[1].innerHTML , element[k].childNodes[3].childNodes[1].innerHTML);
		// 		var obsName = obsData.obsName;
		// 		var obsValue = obsData.obsValue;
		// 		var obsUnit = obsData.obsUnit;
		// 		descr = descr + '<h4 style="font-weight: bold; display: inline;">' + obsName + '：</h4><h4 style="font-weight: normal; display: inline;">' + obsValue + ' ' + obsUnit + '<br></h4>';
		// 	}

		// 	if (locName) {
		// 		l.bindPopup('<h3>' + locName + ' (' + stID + ')</h3>' + 
		// 		// '<h4>(' + parseFloat(locLat).toFixed(3) + ' , ' + parseFloat(locLon).toFixed(3) + ')</h4>' + 
		// 		'<h4 style="font-weight: bold; display: inline;">觀測資料時間：</h4><h4 style="font-weight: normal; display: inline;">' + obsTime + '<br></h4>' + 
		// 		descr + '', {className: 'xml-popup'});
		// 		l.bindTooltip('<h3>' + locName + '</h3>' + '<h4 style="font-weight: normal;">' + stID + '</h4>');
		// 	}
		// }
		return layers;
	},
});