const svgTag = 'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"';
const svgWindPath = '<path d="M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"/><path d="M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z"/>'
const svgWindColor = ['#ebebeb' , '#a8c2de' , '#66a8ef' , '#66ef6b' , '#e6ef66' , '#efb866' , '#ef6668' , '#ef66e1' , '#994290' , '#994243' , '#261010'];
const svgWindLevel = [0 , 3 , 5 , 10 , 15 , 20 , 25 , 30 , 35 , 40 , 50];
const svgWindWidth = 25;
const svgWindHeight = 25;
const svgWindStroke = '#777';
const svgWindStrokeWidth = '20px';

L.XMLLayer = L.FeatureGroup.extend({
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
		var layers = L.XMLLayer.parseXML(xml, options);
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

L.xmlLayer = function(url, options) {
	return new L.XMLLayer(url, options);
};

L.Util.extend(L.XMLLayer, {

    parseXML: function (xml, options) {
		var layers = [], l;
		locs = xml.getElementsByTagName('location');
		for (var i = 0; i < locs.length; i++) {
			var locName = locs[i].getElementsByTagName('locationName')[0].innerHTML;
			if (locs[i].getElementsByTagName('lat_wgs84')[0] !== undefined) {
				var locLat = locs[i].getElementsByTagName('lat_wgs84')[0].innerHTML;
				var locLon = locs[i].getElementsByTagName('lon_wgs84')[0].innerHTML;
			} else {
				var locLonLat , locLon , locLat;
				var locLat67 = locs[i].getElementsByTagName('lat')[0].innerHTML;
				var locLon67 = locs[i].getElementsByTagName('lon')[0].innerHTML;
				locLonLat = TWD67toTWD97(locLon67 , locLat67);
				locLon = locLonLat.lon97;
				locLat = locLonLat.lat97;
			}

			var stID = locs[i].getElementsByTagName('stationId')[0].innerHTML;
			var obsYYYY = locs[i].getElementsByTagName('time')[0].childNodes[1].innerHTML.substring(0 , 4);
			var obsMM = locs[i].getElementsByTagName('time')[0].childNodes[1].innerHTML.substring(5 , 7);
			var obsDD = locs[i].getElementsByTagName('time')[0].childNodes[1].innerHTML.substring(8 , 10);
			var obshh = locs[i].getElementsByTagName('time')[0].childNodes[1].innerHTML.substring(11 , 13);
			var obsmm = locs[i].getElementsByTagName('time')[0].childNodes[1].innerHTML.substring(14 , 16);
			var obsss = locs[i].getElementsByTagName('time')[0].childNodes[1].innerHTML.substring(17 , 19);
			var obsTime = obsYYYY + '/' + obsMM + '/' + obsDD + ' ' + obshh + ':' + obsmm + ':' + obsss + ' L';
			var element = locs[i].getElementsByTagName('weatherElement');

			if (element[1].childNodes[1].innerHTML === 'WDIR') {
				const windSpeed = element[2].childNodes[3].childNodes[1].innerHTML;
				if (windSpeed >= svgWindLevel[0] & windSpeed < svgWindLevel[1]) {
					var svgWindStyle = `fill: ${svgWindColor[0]}; stroke: ${svgWindStroke}; stroke-width: ${svgWindStrokeWidth};`;
				} else if (windSpeed >= svgWindLevel[1] & windSpeed < svgWindLevel[2]) {
					var svgWindStyle = `fill: ${svgWindColor[1]}; stroke: ${svgWindStroke}; stroke-width: ${svgWindStrokeWidth};`;
				} else if (windSpeed >= svgWindLevel[2] & windSpeed < svgWindLevel[3]) {
					var svgWindStyle = `fill: ${svgWindColor[2]}; stroke: ${svgWindStroke}; stroke-width: ${svgWindStrokeWidth};`;
				} else if (windSpeed >= svgWindLevel[3] & windSpeed < svgWindLevel[4]) {
					var svgWindStyle = `fill: ${svgWindColor[3]}; stroke: ${svgWindStroke}; stroke-width: ${svgWindStrokeWidth};`;
				} else if (windSpeed >= svgWindLevel[4] & windSpeed < svgWindLevel[5]) {
					var svgWindStyle = `fill: ${svgWindColor[4]}; stroke: ${svgWindStroke}; stroke-width: ${svgWindStrokeWidth};`;
				} else if (windSpeed >= svgWindLevel[5] & windSpeed < svgWindLevel[6]) {
					var svgWindStyle = `fill: ${svgWindColor[5]}; stroke: ${svgWindStroke}; stroke-width: ${svgWindStrokeWidth};`;
				} else if (windSpeed >= svgWindLevel[6] & windSpeed < svgWindLevel[7]) {
					var svgWindStyle = `fill: ${svgWindColor[6]}; stroke: ${svgWindStroke}; stroke-width: ${svgWindStrokeWidth};`;
				} else if (windSpeed >= svgWindLevel[6] & windSpeed < svgWindLevel[8]) {
					var svgWindStyle = `fill: ${svgWindColor[7]}; stroke: ${svgWindStroke}; stroke-width: ${svgWindStrokeWidth};`;
				} else if (windSpeed >= svgWindLevel[8] & windSpeed < svgWindLevel[9]) {
					var svgWindStyle = `fill: ${svgWindColor[8]}; stroke: ${svgWindStroke}; stroke-width: ${svgWindStrokeWidth};`;
				} else if (windSpeed >= svgWindLevel[9] & windSpeed < svgWindLevel[10]) {
					var svgWindStyle = `fill: ${svgWindColor[9]}; stroke: ${svgWindStroke}; stroke-width: ${svgWindStrokeWidth};`;
				} else if (windSpeed >= svgWindLevel[10]) {
					var svgWindStyle = `fill: ${svgWindColor[10]}; stroke: ${svgWindStroke}; stroke-width: ${svgWindStrokeWidth};`;
				};

				l = new L.Marker(new L.LatLng(locLat, locLon) , {
					icon: L.divIcon({
						className: "wind-pin",
						iconAnchor: [12.5, 12.5],
						html: `<svg ${svgTag} width="${svgWindWidth}" height="${svgWindHeight}" style="${svgWindStyle}">${svgWindPath}</svg>`,
					}),
					title: locName + '：' + windSpeed + ' m/s',
					rotationAngle: parseFloat(element[1].childNodes[3].childNodes[1].innerHTML) + 180,
					attribution: options.attribution, 
				})
				if (l) { layers.push(l); }
			} else {
				l = new L.CircleMarker(new L.LatLng(locLat, locLon) , {
					radius: options.radius, 
					color: options.color, 
					fillOpacity: options.fillOpacity, 
					attribution: options.attribution, 
				})
				if (l) { layers.push(l); }
			}

			var k, j, descr = '';
			for (k = 0; k < element.length; k++) {
				var obsData = processObs(element[k].childNodes[1].innerHTML , element[k].childNodes[3].childNodes[1].innerHTML);
				var obsName = obsData.obsName;
				var obsValue = obsData.obsValue;
				var obsUnit = obsData.obsUnit;
				descr = descr + '<h4 style="font-weight: bold; display: inline;">' + obsName + '：</h4><h4 style="font-weight: normal; display: inline;">' + obsValue + ' ' + obsUnit + '<br></h4>';
			}

			if (locName) {
				l.bindPopup('<h3>' + locName + ' (' + stID + ')</h3>' + 
				// '<h4>(' + parseFloat(locLat).toFixed(3) + ' , ' + parseFloat(locLon).toFixed(3) + ')</h4>' + 
				'<h4 style="font-weight: bold; display: inline;">觀測資料時間：</h4><h4 style="font-weight: normal; display: inline;">' + obsTime + '<br></h4>' + 
				descr + '', {className: 'xml-popup'});
				l.bindTooltip('<h3>' + locName + '</h3>' + '<h4 style="font-weight: normal;">' + stID + '</h4>');
			}
		}
		return layers;
	},
});

TWD67toTWD97 = function(lon67 , lat67) {
	const x0 = 247342;
	const y0 = 2652336;
	const lon0 = 120.9738819;
	const lat0 = 23.9756500;
	const dx = 250000;
	const dy = 0;
	const lon00 = 121;
	const lat00 = 0;
	var x67 = (dx - x0) / (lon00 - lon0) * (lon67 - lon00) + dx;
	var y67 = (dy - y0) / (lat00 - lat0) * (lat67 - lat00) + dy;

	const A = 0.00001549;
	const B = 0.000006521;
	// var x67 = x97 - 807.8 - A * x97 - B * y97;
	// var y67 = y97 + 248.6 - A * y97 - B * x97;
	var x97 = x67 + 807.8 + A * x67 + B * y67;
	var y97 = y67 - 248.6 + A * y67 + B * x67;

	// var Longlat97 = TWD97_TM2toLonglat(x97 , y97)
	// var lon97 = Longlat97.lon97;
	// var lat97 = Longlat97.lat97;

	var lon97 = (x97 - dx) / (dx - x0) * (lon00 - lon0) + lon00;
	var lat97 = (y97 - dy) / (dy - y0) * (lat00 - lat0) + lat00;
	return {lon97, lat97};
};

TWD97_TM2toLonglat = function(x97 , y97) {
	const pow = Math.pow, M_PI = Math.PI;
	const sin = Math.sin, cos = Math.cos, tan = Math.tan;
	const $a = 6378137.0, $b = 6356752.314245;
	const $lng0 = 121 * M_PI / 180, $k0 = 0.9999, $dx = 250000, $dy = 0;
	const $e = pow((1 - pow($b, 2) / pow($a, 2)), 0.5);

	x97 -= $dx;
	  y97 -= $dy;

	var $M = y97 / $k0;

	var $mu = $M / ($a * (1.0 - pow($e, 2) / 4.0 - 3 * pow($e, 4) / 64.0 - 5 * pow($e, 6) / 256.0));
	var $e1 = (1.0 - pow((1.0 - pow($e, 2)), 0.5)) / (1.0 + pow((1.0 - pow($e, 2)), 0.5));

	var $J1 = (3 * $e1 / 2 - 27 * pow($e1, 3) / 32.0);
	var $J2 = (21 * pow($e1, 2) / 16 - 55 * pow($e1, 4) / 32.0);
	var $J3 = (151 * pow($e1, 3) / 96.0);
	var $J4 = (1097 * pow($e1, 4) / 512.0);

	var $fp = $mu + $J1 * sin(2 * $mu) + $J2 * sin(4 * $mu) + $J3 * sin(6 * $mu) + $J4 * sin(8 * $mu);

	var $e2 = pow(($e * $a / $b), 2);
	var $C1 = pow($e2 * cos($fp), 2);
	var $T1 = pow(tan($fp), 2);
	var $R1 = $a * (1 - pow($e, 2)) / pow((1 - pow($e, 2) * pow(sin($fp), 2)), (3.0 / 2.0));
	var $N1 = $a / pow((1 - pow($e, 2) * pow(sin($fp), 2)), 0.5);

	var $D = x97 / ($N1 * $k0);

	var $Q1 = $N1 * tan($fp) / $R1;
	var $Q2 = (pow($D, 2) / 2.0);
	var $Q3 = (5 + 3 * $T1 + 10 * $C1 - 4 * pow($C1, 2) - 9 * $e2) * pow($D, 4) / 24.0;
	var $Q4 = (61 + 90 * $T1 + 298 * $C1 + 45 * pow($T1, 2) - 3 * pow($C1, 2) - 252 * $e2) * pow($D, 6) / 720.0;
	var lat97 = $fp - $Q1 * ($Q2 - $Q3 + $Q4);

	var $Q5 = $D;
	var $Q6 = (1 + 2 * $T1 + $C1) * pow($D, 3) / 6;
	var $Q7 = (5 - 2 * $C1 + 28 * $T1 - 3 * pow($C1, 2) + 8 * $e2 + 24 * pow($T1, 2)) * pow($D, 5) / 120.0;
	var lon97 = $lng0 + ($Q5 - $Q6 + $Q7) / cos($fp);

	lat97 = (lat97 * 180) / M_PI;
	lon97 = (lon97 * 180) / M_PI;
	
	return {lon97, lat97};
};

processObs = function(name , value) {
	switch (value) {
		case '-99':
			value = '---';
			break;
		case '-998.00':
			value = '0.00';
			break;
	}
	switch (name) {
		case 'ELEV':
			return {obsName: '測站高度' , obsValue: parseFloat(value).toFixed(1) , obsUnit: 'm'};
		case 'WDIR':
			return {obsName: '風向' , obsValue: value , obsUnit: '\xB0'};
		case 'WDSD':
			return {obsName: '風速' , obsValue: value , obsUnit: 'm/s'};
		case 'TEMP':
			return {obsName: '氣溫' , obsValue: value , obsUnit: '\xB0C'};
		case 'HUMD':
			return {obsName: '相對濕度' , obsValue: value * 100 , obsUnit: '%'};
		case 'PRES':
			return {obsName: '測站氣壓' , obsValue: value , obsUnit: 'hPa'};
		case '24R':
		case 'H_24R':
			return {obsName: '日累積雨量' , obsValue: value , obsUnit: 'mm'};
		case 'H_FX':
			return {obsName: '小時最大陣風風速' , obsValue: value , obsUnit: 'm/s'};
		case 'H_XD':
			return {obsName: '小時最大陣風風向' , obsValue: value , obsUnit: '\xB0'};
		case 'H_FXT':
			if (value !== '---') {
				value = value.substring(0 , 2) + ':' + value.substring(2 , 4) + ' L';
			}
			return {obsName: '小時最大陣風時間' , obsValue: value , obsUnit: ''};
		case 'H_F10':
			return {obsName: '本時最大10分鐘平均風速' , obsValue: value , obsUnit: 'm/s'};
		case 'H_10D':
			return {obsName: '本時最大10分鐘平均風向' , obsValue: value , obsUnit: '\xB0'};
		case 'H_F10T':
			if (value !== '---') {
				value = value.substring(0 , 2) + ':' + value.substring(2 , 4) + ' L';
			}
			return {obsName: '本時最大10分鐘平均風時間' , obsValue: value , obsUnit: ''};				// 本時最大10分鐘平均風速發生時間
		case 'H_UVI':
			return {obsName: '紫外線指數' , obsValue: value , obsUnit: ''};								// 紫外線指數
		case 'D_TX':
			return {obsName: '本日最高溫' , obsValue: parseFloat(value).toFixed(1) , obsUnit: '\xB0C'};
		case 'D_TXT':
			if (value !== '---') {
				value = value.substring(0 , 2) + ':' + value.substring(2 , 4) + ' L';
			}
			return {obsName: '本日最高溫時間' , obsValue: value , obsUnit: ''};							// 本日最高溫發生時間
		case 'D_TN':
			return {obsName: '本日最低溫' , obsValue: parseFloat(value).toFixed(1) , obsUnit: '\xB0C'};
		case 'D_TNT':
			if (value !== '---') {
				value = value.substring(0 , 2) + ':' + value.substring(2 , 4) + ' L';
			}
			return {obsName: '本日最低溫時間' , obsValue: value , obsUnit: ''};							// 本日最低溫發生時間
		case 'D_TS':
			return {obsName: '本日總日照時數' , obsValue: value , obsUnit: 'hr'};
		case 'VIS':
			return {obsName: '能見度' , obsValue: value , obsUnit: 'km'};								// 十分鐘盛行能見度
		case 'Weather':
			return {obsName: '天氣現象' , obsValue: value , obsUnit: ''};								// 十分鐘天氣現象描述
		case 'RAIN':
			return {obsName: '60分鐘' , obsValue: processRain(value) , obsUnit: 'mm'};					// 60分鐘累積雨量
		case 'MIN_10':
			return {obsName: '10分鐘' , obsValue: processRain(value) , obsUnit: 'mm'};					// 10分鐘累積雨量
		case 'HOUR_3':
			return {obsName: '3小時' , obsValue: processRain(value) , obsUnit: 'mm'};					// 3小時累積雨量
		case 'HOUR_6':
			return {obsName: '6小時' , obsValue: processRain(value) , obsUnit: 'mm'};					// 6小時累積雨量
		case 'HOUR_12':
			return {obsName: '12小時' , obsValue: processRain(value) , obsUnit: 'mm'};					// 12小時累積雨量
		case 'HOUR_24':
			return {obsName: '24小時' , obsValue: processRain(value) , obsUnit: 'mm'};					// 24小時累積雨量
		case 'NOW':
			return {obsName: '本日' , obsValue: processRain(value) , obsUnit: 'mm'};					// 本日累積雨量
		case 'latest_2days':
			return {obsName: '前1日0時到現在' , obsValue: processRain(value) , obsUnit: 'mm'};			// 前1日0時到現在累積雨量
		case 'latest_3days':
			return {obsName: '前2日0時到現在' , obsValue: processRain(value) , obsUnit: 'mm'};			// 前2日0時到現在累積雨量
		case 'ATTRIBUTE':
			return {obsName: '自動站屬性' , obsValue: value , obsUnit: ''};
		case 'CITY':
			return {obsName: '縣市' , obsValue: value , obsUnit: ''};
		case 'CITY_SN':
			return {obsName: '縣市編號' , obsValue: value , obsUnit: ''};
		case 'TOWN':
			return {obsName: '鄉鎮' , obsValue: value , obsUnit: ''};
		case 'TOWN_SN':
			return {obsName: '鄉鎮編號' , obsValue: value , obsUnit: ''};
		default: {
			return {obsName: name , obsValue: value , obsUnit: ''}
		}
	}
};

processRain = function(value) {
	if (value < 0) {
		return '---';
	} else {
		return parseFloat(value).toFixed(1);
	}
};

L.XMLCircle = L.Circle.extend({
    options: {
        radius: 2,
		color: 'red',
	}
});

L.RotatedMarker = L.Marker.extend({    
    _reset: function() {
        var pos = this._map.latLngToLayerPoint(this._latlng).round();

        L.DomUtil.setPosition(this._icon, pos);
        if (this._shadow) {
            L.DomUtil.setPosition(this._shadow, pos);
        }

        if (this.options.iconAngle) {
            this._icon.style.WebkitTransform = this._icon.style.WebkitTransform + ' rotate(' + this.options.iconAngle + 'deg)';
            this._icon.style.MozTransform = 'rotate(' + this.options.iconAngle + 'deg)';
            this._icon.style.MsTransform = 'rotate(' + this.options.iconAngle + 'deg)';
            this._icon.style.OTransform = 'rotate(' + this.options.iconAngle + 'deg)';
        }

        this._icon.style.zIndex = pos.y;
    },

    setIconAngle: function (iconAngle) {

        if (this._map) {
            this._removeIcon();
        }

        this.options.iconAngle = iconAngle;

        if (this._map) {
            this._initIcon();
            this._reset();
        }
    }

});