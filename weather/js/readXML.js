L.XML = L.FeatureGroup.extend({
    initialize: function (xml, xmlOptions) {
		this._xml = xml;
		this._layers = {};
		this._xmlOptions = xmlOptions;

		if (xml) {
			this.addXML(xml, xmlOptions);
		}
	},

	addXML: function (xml, xmlOptions) {
		var layers = L.XML.parseXML(xml, xmlOptions);
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

L.Util.extend(L.XML, {

    parseXML: function (xml, xmlOptions) {
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
				locLonLat = this.TWD67toTWD97(locLon67 , locLat67);
				locLon = locLonLat.lon97;
				locLat = locLonLat.lat97;
			}

			var stID = locs[i].getElementsByTagName('stationId')[0].innerHTML;
			var obsTime = locs[i].getElementsByTagName('time')[0].innerHTML;
			var element = locs[i].getElementsByTagName('weatherElement');

			l = new L.CircleMarker(new L.LatLng(locLat, locLon) , {radius: 2.5 , color: xmlOptions.color , fillOpacity: 1})
			if (l) { layers.push(l); }

			var k, j, descr = '';
			for (k = 0; k < element.length; k++) {
				var obsData = this.processObsData(element[k].childNodes[1].innerHTML , element[k].childNodes[3].innerHTML);
				var obsName = obsData.obsName;
				var obsValue = obsData.obsValue;
				var obsUnit = obsData.obsUnit;
				descr = descr + '<h4>' + obsName + '：' + obsValue + obsUnit + '</h4>';
			}

			if (locName) {
				l.bindPopup('<h3>' + locName + ' (' + stID + ')</h3>' + 
				// '<h4>(' + parseFloat(locLat).toFixed(3) + ' , ' + parseFloat(locLon).toFixed(3) + ')</h4>' + 
				'<h4>觀測資料時間：' + obsTime + '</h4>' + 
				descr + '', { className: 'xml-popup'});
			}
		}
		return layers;
	},

	addLocationPopup: function(location, layer) {
		var el, i, j, name, descr = '';
		el = location.getElementsByTagName('locationName');
		if (el.length && el[0].childNodes.length) {
		  	name = el[0].childNodes[0].nodeValue;
		}
		el = location.getElementsByTagName('weatherElement');
		for (i = 0; i < el.length; i++) {
		  	for (j = 0; j < el[i].childNodes.length; j++) {
				descr = descr + el[i].childNodes[j].nodeValue;
		  	}
		}
		if (name) {
		  	layer.bindPopup('<h2>' + name + '</h2>' + descr, { className: 'xml-popup'});
		}
	},

	TWD67toTWD97: function(lon67 , lat67) {
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

		// var Longlat97 = this.TWD97_TM2toLonglat(x97 , y97)
		// var lon97 = Longlat97.lon97;
		// var lat97 = Longlat97.lat97;

		var lon97 = (x97 - dx) / (dx - x0) * (lon00 - lon0) + lon00;
		var lat97 = (y97 - dy) / (dy - y0) * (lat00 - lat0) + lat00;
		return {lon97, lat97};
	},

	TWD97_TM2toLonglat: function(x97 , y97) {
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
	},

	processObsData: function(name , value) {
		if (name === 'ELEV') {
			return {obsName: '測站高度' , obsValue: value , obsUnit: 'm'};
		} else if (name === 'WDIR') {
			return {obsName: '風向' , obsValue: value , obsUnit: '\xB0'};
		} else if (name === 'WDSD') {
			return {obsName: '風速' , obsValue: value , obsUnit: 'm/s'};
		} else if (name === 'TEMP') {
			return {obsName: '氣溫' , obsValue: value , obsUnit: '\xB0C'};
		} else if (name === 'HUMD') {
			// value = toString((value / 100).toFixed(3));
			console.log(value);
			return {obsName: '相對濕度' , obsValue: value , obsUnit: ''};
		} else if (name === 'PRES') {
			return {obsName: '測站氣壓' , obsValue: value , obsUnit: 'hPa'};
		} else if (name === 'H_24R' | name === '24R') {
			return {obsName: '日累積雨量' , obsValue: value , obsUnit: 'mm'};
		} else if (name === 'H_FX') {
			return {obsName: '小時最大陣風風速' , obsValue: value , obsUnit: 'm/s'};
		} else if (name === 'H_XD') {
			return {obsName: '小時最大陣風風向' , obsValue: value , obsUnit: '\xB0'};
		} else if (name === 'H_FXT') {
			return {obsName: '小時最大陣風時間' , obsValue: value , obsUnit: ''};
		} else if (name === 'H_F10') {
			return {obsName: '本時最大10分鐘平均風速' , obsValue: value , obsUnit: 'm/s'};
		} else if (name === 'H_10D') {
			return {obsName: '本時最大10分鐘平均風向' , obsValue: value , obsUnit: '\xB0'};
		} else if (name === 'H_F10T') {
			return {obsName: '本時最大10分鐘平均風速發生時間' , obsValue: value , obsUnit: ''};
		} else if (name === 'H_UVI') {
			return {obsName: '小時紫外線指數' , obsValue: value , obsUnit: ''};
		} else if (name === 'D_TX') {
			return {obsName: '本日最高溫' , obsValue: value , obsUnit: '\xB0C'};
		} else if (name === 'D_TXT') {
			return {obsName: '本日最高溫發生時間' , obsValue: value , obsUnit: ''};
		} else if (name === 'D_TN') {
			return {obsName: '本日最低溫' , obsValue: value , obsUnit: '\xB0C'};
		} else if (name === 'D_TNT') {
			return {obsName: '本日最低溫發生時間' , obsValue: value , obsUnit: ''};
		} else if (name === 'D_TS') {
			return {obsName: '本日總日照時數' , obsValue: value , obsUnit: 'hr'};
		} else if (name === 'VIS') {
			return {obsName: '十分鐘盛行能見度' , obsValue: value , obsUnit: 'km'};
		} else if (name === 'Weather') {
			return {obsName: '十分鐘天氣現象描述' , obsValue: value , obsUnit: ''};
		} else if (name === 'RAIN') {
			return {obsName: '60分鐘累積雨量' , obsValue: value , obsUnit: 'mm'};
		} else if (name === 'MIN_10') {
			return {obsName: '10分鐘累積雨量' , obsValue: value , obsUnit: 'mm'};
		} else if (name === 'HOUR_3') {
			return {obsName: '3小時累積雨量' , obsValue: value , obsUnit: 'mm'};
		} else if (name === 'HOUR_6') {
			return {obsName: '6小時累積雨量' , obsValue: value , obsUnit: 'mm'};
		} else if (name === 'HOUR_12') {
			return {obsName: '12小時累積雨量' , obsValue: value , obsUnit: 'mm'};
		} else if (name === 'HOUR_24') {
			return {obsName: '24小時累積雨量' , obsValue: value , obsUnit: 'mm'};
		} else if (name === 'NOW') {
			return {obsName: '本日累積雨量' , obsValue: value , obsUnit: 'mm'};
		} else if (name === 'latest_2days') {
			return {obsName: '前1日0時到現在之累積雨量' , obsValue: value , obsUnit: 'mm'};
		} else if (name === 'latest_3days') {
			return {obsName: '前2日0時到現在之累積雨量' , obsValue: value , obsUnit: 'mm'};
		} else if (name === 'ATTRIBUTE') {
			return {obsName: '自動站屬性' , obsValue: value , obsUnit: ''};
		} else if (name === 'HOUR_24') {
			return {obsName: '24小時累積雨量' , obsValue: value , obsUnit: 'mm'};
		} else if (name === 'HOUR_24') {
			return {obsName: '24小時累積雨量' , obsValue: value , obsUnit: 'mm'};
		} else if (name === 'CITY') {
			return {obsName: '縣市' , obsValue: value , obsUnit: ''};
		} else if (name === 'CITY_SN') {
			return {obsName: '縣市編號' , obsValue: value , obsUnit: ''};
		} else if (name === 'TOWN') {
			return {obsName: '鄉鎮' , obsValue: value , obsUnit: ''};
		} else if (name === 'TOWN_SN') {
			return {obsName: '鄉鎮編號' , obsValue: value , obsUnit: ''};
		}
		return {obsName: name , obsValue: value , obsUnit: ''}
	}
})

L.XMLCircle = L.Circle.extend({
    options: {
        radius: 2,
		color: 'red',
	}
});