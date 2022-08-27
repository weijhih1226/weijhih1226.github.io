L.XMLPicture = L.FeatureGroup.extend({
    initialize: function (url, datatype, options) {
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
			this.addXML(xml, datatype, options);
		}
	},

	addXML: function (xml, datatype, options) {
		var layers = L.XMLPicture.parseXML(xml, datatype, options);
		if (!layers || !layers.length) return;
		for (var i = 0; i < layers.length; i++) {
			this.fire('addlayer', {
				layer: layers[i]
			});
			this.addLayer(layers[i]);
		}
		this.fire('loaded');
	},
})

L.Util.extend(L.XMLPicture, {
    parseXML: function (xml, datatype, options) {
		var layers = [], l;
		var data = xml.getElementsByTagName('dataset')[0]
						.getElementsByTagName('contents')[0]
						.getElementsByTagName('content')[0].innerHTML.split(',');	

		if (datatype === 'radar') {
			var lng_start = 115.007864;
			var lat_start = 17.998477;
			var res = 0.0125;
			var num_lng = 921;
			var num_lat = 881;
			var num_x = num_lng;
			var num_y = num_lat;
		} else if (datatype === 'qpe' | datatype === 'qpf') {
			var lng_start = 117.982950;
			var lat_start = 19.973364;
			var res = 0.075;
			var num_lng = 75;
			var num_lat = 95;
			var num_x = num_lng;
			var num_y = num_lat;
		} else if (datatype === 'rain' | datatype === 'temp') {
			var lng_start = 120.008033;
			var lat_start = 21.878274;
			var res = 0.03;
			var num_lng = 67;
			var num_lat = 120;
			var num_x = num_lng - 1;
			var num_y = num_lat;
		} else return;

		for (var j = 0; j < num_y; j++) {
			for (var i = 0; i < num_x; i++) {
				var pdata = parseFloat(data[i + j * (num_x)]);
				var bounds = [[lat_start + (j - 0.5) * res, lng_start + (i - 0.5) * res], [lat_start + (j + 0.5) * res, lng_start + (i + 0.5) * res]];
				if (datatype === 'radar'){
					if (pdata !== -999 & pdata !== -99) {
						fillColor = radarColormap(pdata);
						l = L.rectangle(bounds, {
							fillColor: fillColor, 
							fillOpacity: options.fillOpacity, 
							stroke: false, 
							attribution: options.attribution, 
							value: pdata
						});
						// l.bindTooltip('<h4>回波：' + pdata + ' dBZ</h4>');
						l.addEventListener('mousemove' , function(){
							var color = document.querySelector('#color' + readRadarColor(this.options.value));
							color.style.marginLeft = '0';
							color.style.marginRight = '6px';
        					color.style.border = '2px solid #fff';
						})
						l.addEventListener('mouseout' , function(){
							var color = document.querySelector('#color' + readRadarColor(this.options.value));
							color.style.marginLeft = '2px';
							color.style.marginRight = '8px';
        					color.style.border = '0';
						})

						if (l) { layers.push(l); }
					}
				} else if (datatype === 'qpe'){
					if (pdata > 0) {
						fillColor = rainColormap(pdata);
						l = L.rectangle(bounds, {
							fillColor: fillColor, 
							fillOpacity: options.fillOpacity, 
							stroke: false, 
							attribution: options.attribution
						});
						l.bindTooltip('<h4>1h-QPE：' + pdata + ' mm</h4>');
						if (l) { layers.push(l); }
					}
				} else if (datatype === 'qpf'){
					if (pdata > 0) {
						fillColor = rainColormap(pdata);
						l = L.rectangle(bounds, {
							fillColor: fillColor, 
							fillOpacity: options.fillOpacity, 
							stroke: false, 
							attribution: options.attribution
						});
						l.bindTooltip('<h4>1h-QPF：' + pdata + ' mm</h4>');
						if (l) { layers.push(l); }
					}
				} else if (datatype === 'rain') {
					if (pdata > 0) {
						fillColor = rainColormap(pdata);
						l = L.rectangle(bounds, {
							fillColor: fillColor, 
							fillOpacity: options.fillOpacity, 
							stroke: false, 
							attribution: options.attribution
						});
						l.bindTooltip('<h4>雨量：' + pdata + ' mm</h4>');	
						if (l) { layers.push(l); }
					}
				} else if (datatype === 'temp'){
					if (pdata !== -999) {
						fillColor = tempColormap(pdata);
						l = L.rectangle(bounds, {
							fillColor: fillColor, 
							fillOpacity: options.fillOpacity, 
							stroke: false, 
							attribution: options.attribution
						});
						l.bindTooltip('<h4>氣溫：' + pdata + ' \xB0C</h4>');
						if (l) { layers.push(l); }
					}
				} else return;
			}
		}
		return layers;
	},
})

L.xmlPicture = function(url, datatype, options) {
	return new L.XMLPicture(url, datatype, options);
};

function readRadarColor(d) {
	const tk = [65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, "0"];
	return d >= tk[0]  ? '0' :
           d >= tk[1]  ? '1' :
           d >= tk[2]  ? '2' :
		   d >= tk[3]  ? '3' :
		   d >= tk[4]  ? '4' :
		   d >= tk[5]  ? '5' :
		   d >= tk[6]  ? '6' :
		   d >= tk[7]  ? '7' :
		   d >= tk[8]  ? '8' :
		   d >= tk[9]  ? '9' :
		   d >= tk[10] ? '10' :
		   d >= tk[11] ? '11' :
		   d >= tk[12] ? '12' :
		   d >= tk[13] ? '13' :
		   			     '13';
}

function radarColormap(data) {
	if (data < 1) {
		return '#00ffff';
	} else if (data >= 1 & data < 2) {
		return '#00ecff';
	} else if (data >= 2 & data < 3) {
		return '#00daff';
	} else if (data >= 3 & data < 4) {
		return '#00c8ff';
	} else if (data >= 4 & data < 5) {
		return '#00b6ff';
	} else if (data >= 5 & data < 6) {
		return '#00a3ff';
	} else if (data >= 6 & data < 7) {
		return '#0091ff';
	} else if (data >= 7 & data < 8) {
		return '#007fff';
	} else if (data >= 8 & data < 9) {
		return '#006dff';
	} else if (data >= 9 & data < 10) {
		return '#005bff';
	} else if (data >= 10 & data < 11) {
		return '#0048ff';
	} else if (data >= 11 & data < 12) {
		return '#0036ff';
	} else if (data >= 12 & data < 13) {
		return '#0024ff';
	} else if (data >= 13 & data < 14) {
		return '#0012ff';
	} else if (data >= 14 & data < 15) {
		return '#0000ff';
	} else if (data >= 15 & data < 16) {
		return '#00ff00';
	} else if (data >= 16 & data < 17) {
		return '#00f400';
	} else if (data >= 17 & data < 18) {
		return '#00e900';
	} else if (data >= 18 & data < 19) {
		return '#00de00';
	} else if (data >= 19 & data < 20) {
		return '#00d300';
	} else if (data >= 20 & data < 21) {
		return '#00c800';
	} else if (data >= 21 & data < 22) {
		return '#00be00';
	} else if (data >= 22 & data < 23) {
		return '#00b400';
	} else if (data >= 23 & data < 24) {
		return '#00aa00';
	} else if (data >= 24 & data < 25) {
		return '#00a000';
	} else if (data >= 25 & data < 26) {
		return '#009600';
	} else if (data >= 26 & data < 27) {
		return '#33ab00';
	} else if (data >= 27 & data < 28) {
		return '#66c000';
	} else if (data >= 28 & data < 29) {
		return '#99d500';
	} else if (data >= 29 & data < 30) {
		return '#ccea00';
	} else if (data >= 30 & data < 31) {
		return '#ffff00';
	} else if (data >= 31 & data < 32) {
		return '#fff400';
	} else if (data >= 32 & data < 33) {
		return '#ffe900';
	} else if (data >= 33 & data < 34) {
		return '#ffde00';
	} else if (data >= 34 & data < 35) {
		return '#ffd300';
	} else if (data >= 35 & data < 36) {
		return '#ffc800';
	} else if (data >= 36 & data < 37) {
		return '#ffb800';
	} else if (data >= 37 & data < 38) {
		return '#ffa800';
	} else if (data >= 38 & data < 39) {
		return '#ff9800';
	} else if (data >= 39 & data < 40) {
		return '#ff8800';
	} else if (data >= 40 & data < 41) {
		return '#ff7800';
	} else if (data >= 41 & data < 42) {
		return '#ff6000';
	} else if (data >= 42 & data < 43) {
		return '#ff4800';
	} else if (data >= 43 & data < 44) {
		return '#ff3000';
	} else if (data >= 44 & data < 45) {
		return '#ff1800';
	} else if (data >= 45 & data < 46) {
		return '#ff0000';
	} else if (data >= 46 & data < 47) {
		return '#f40000';
	} else if (data >= 47 & data < 48) {
		return '#e90000';
	} else if (data >= 48 & data < 49) {
		return '#de0000';
	} else if (data >= 49 & data < 50) {
		return '#d30000';
	} else if (data >= 50 & data < 51) {
		return '#c80000';
	} else if (data >= 51 & data < 52) {
		return '#be0000';
	} else if (data >= 52 & data < 53) {
		return '#b40000';
	} else if (data >= 53 & data < 54) {
		return '#aa0000';
	} else if (data >= 54 & data < 55) {
		return '#a00000';
	} else if (data >= 55 & data < 56) {
		return '#960000';
	} else if (data >= 56 & data < 57) {
		return '#ab0033';
	} else if (data >= 57 & data < 58) {
		return '#c00066';
	} else if (data >= 58 & data < 59) {
		return '#d50099';
	} else if (data >= 59 & data < 60) {
		return '#ea00cc';
	} else if (data >= 60 & data < 61) {
		return '#ff00ff';
	} else if (data >= 61 & data < 62) {
		return '#ea00ff';
	} else if (data >= 62 & data < 63) {
		return '#d500ff';
	} else if (data >= 63 & data < 64) {
		return '#c000ff';
	} else if (data >= 64 & data < 65) {
		return '#ab00ff';
	} else if (data >= 65) {
		return '#9600ff';
	}

	// if (data < 6) {
	// 	return '#625273';
	// } else if (data >= 6 & data < 7) {
	// 	return '#675775';
	// } else if (data >= 7 & data < 8) {
	// 	return '#6b5c78';
	// } else if (data >= 8 & data < 9) {
	// 	return '#6f617b';
	// } else if (data >= 9 & data < 10) {
	// 	return '#73677e';
	// } else if (data >= 10 & data < 11) {
	// 	return '#776c81';
	// } else if (data >= 11 & data < 12) {
	// 	return '#7b7184';
	// } else if (data >= 12 & data < 13) {
	// 	return '#7f7787';
	// } else if (data >= 13 & data < 14) {
	// 	return '#837c8a';
	// } else if (data >= 14 & data < 15) {
	// 	return '#87818d';
	// } else if (data >= 15 & data < 16) {
	// 	return '#8b8690';
	// } else if (data >= 16 & data < 17) {
	// 	return '#8f8c93';
	// } else if (data >= 17 & data < 18) {
	// 	return '#939196';
	// } else if (data >= 18 & data < 19) {
	// 	return '#979699';
	// } else if (data >= 19 & data < 20) {
	// 	return '#9c9c9c';
	// } else if (data >= 20 & data < 21) {
	// 	return '#00cc00';
	// } else if (data >= 21 & data < 22) {
	// 	return '#00c500';
	// } else if (data >= 22 & data < 23) {
	// 	return '#00be00';
	// } else if (data >= 23 & data < 24) {
	// 	return '#00b800';
	// } else if (data >= 24 & data < 25) {
	// 	return '#00b100';
	// } else if (data >= 25 & data < 26) {
	// 	return '#00aa00';
	// } else if (data >= 26 & data < 27) {
	// 	return '#00a500';
	// } else if (data >= 27 & data < 28) {
	// 	return '#009f00';
	// } else if (data >= 28 & data < 29) {
	// 	return '#009a00';
	// } else if (data >= 29 & data < 30) {
	// 	return '#009400';
	// } else if (data >= 30 & data < 31) {
	// 	return '#008e00';
	// } else if (data >= 31 & data < 32) {
	// 	return '#33a500';
	// } else if (data >= 32 & data < 33) {
	// 	return '#66bb00';
	// } else if (data >= 33 & data < 34) {
	// 	return '#99d200';
	// } else if (data >= 34 & data < 35) {
	// 	return '#cce800';
	// } else if (data >= 35 & data < 36) {
	// 	return '#ffff00';
	// } else if (data >= 36 & data < 37) {
	// 	return '#f9f200';
	// } else if (data >= 37 & data < 38) {
	// 	return '#f4e500';
	// } else if (data >= 38 & data < 39) {
	// 	return '#efd800';
	// } else if (data >= 39 & data < 40) {
	// 	return '#eacc00';
	// } else if (data >= 40 & data < 41) {
	// 	return '#e5bf00';
	// } else if (data >= 41 & data < 42) {
	// 	return '#eab500';
	// } else if (data >= 42 & data < 43) {
	// 	return '#efab00';
	// } else if (data >= 43 & data < 44) {
	// 	return '#f4a200';
	// } else if (data >= 44 & data < 45) {
	// 	return '#f99800';
	// } else if (data >= 45 & data < 46) {
	// 	return '#ff8e00';
	// } else if (data >= 46 & data < 47) {
	// 	return '#ff8513';
	// } else if (data >= 47 & data < 48) {
	// 	return '#ff7c26';
	// } else if (data >= 48 & data < 49) {
	// 	return '#ff733a';
	// } else if (data >= 49 & data < 50) {
	// 	return '#ff6a4d';
	// } else if (data >= 50 & data < 51) {
	// 	return '#ff6060';
	// } else if (data >= 51 & data < 52) {
	// 	return '#ff4d4d';
	// } else if (data >= 52 & data < 53) {
	// 	return '#ff3a3a';
	// } else if (data >= 53 & data < 54) {
	// 	return '#ff2626';
	// } else if (data >= 54 & data < 55) {
	// 	return '#ff1313';
	// } else if (data >= 55 & data < 56) {
	// 	return '#ff0000';
	// } else if (data >= 56 & data < 57) {
	// 	return '#f50000';
	// } else if (data >= 57 & data < 58) {
	// 	return '#eb0000';
	// } else if (data >= 58 & data < 59) {
	// 	return '#e10000';
	// } else if (data >= 59 & data < 60) {
	// 	return '#d80000';
	// } else if (data >= 60 & data < 61) {
	// 	return '#ce0000';
	// } else if (data >= 61 & data < 62) {
	// 	return '#d80033';
	// } else if (data >= 62 & data < 63) {
	// 	return '#e10066';
	// } else if (data >= 63 & data < 64) {
	// 	return '#eb0099';
	// } else if (data >= 64 & data < 65) {
	// 	return '#f500cc';
	// } else if (data >= 65) {
	// 	return '#ff00ff';
	// }
};

var rainColormap = function(data) {
	if (data > 0 & data < 1) {
		return '#c1c1c1';
	} else if (data >= 1 & data < 2) {
		return '#99ffff';
	} else if (data >= 2 & data < 6) {
		return '#00ccff';
	} else if (data >= 6 & data < 10) {
		return '#0099ff';
	} else if (data >= 10 & data < 15) {
		return '#0066ff';
	} else if (data >= 15 & data < 20) {
		return '#339900';
	} else if (data >= 20 & data < 30) {
		return '#33ff00';
	} else if (data >= 30 & data < 40) {
		return '#ffff00';
	} else if (data >= 40 & data < 50) {
		return '#ffcc00';
	} else if (data >= 50 & data < 70) {
		return '#ff9900';
	} else if (data >= 70 & data < 90) {
		return '#ff0000';
	} else if (data >= 90 & data < 110) {
		return '#cc0000';
	} else if (data >= 110 & data < 130) {
		return '#a50000';
	} else if (data >= 130 & data < 150) {
		return '#990099';
	} else if (data >= 150 & data < 200) {
		return '#cc00cc';
	} else if (data >= 200 & data < 300) {
		return '#ff00ff';
	} else if (data >= 300) {
		return '#ffccff';
	}
};

var tempColormap = function(data) {
	if (data < 0) {
		return '#107388';
	} else if (data >= 0 & data < 1) {
		return '#1f7e94';
	} else if (data >= 1 & data < 2) {
		return '#2e899c';
	} else if (data >= 2 & data < 3) {
		return '#3c93a7';
	} else if (data >= 3 & data < 4) {
		return '#4d9eb1';
	} else if (data >= 4 & data < 5) {
		return '#5daabe';
	} else if (data >= 5 & data < 6) {
		return '#68b3c6';
	} else if (data >= 6 & data < 7) {
		return '#77bfcd';
	} else if (data >= 7 & data < 8) {
		return '#87cbd8';
	} else if (data >= 8 & data < 9) {
		return '#95d4e3';
	} else if (data >= 9 & data < 10) {
		return '#a5dfeb';
	} else if (data >= 10 & data < 11) {
		return '#b4e9f7';
	} else if (data >= 11 & data < 12) {
		return '#0c924b';
	} else if (data >= 12 & data < 13) {
		return '#1c9a51';
	} else if (data >= 13 & data < 14) {
		return '#31a157';
	} else if (data >= 14 & data < 15) {
		return '#41a95e';
	} else if (data >= 15 & data < 16) {
		return '#51b263';
	} else if (data >= 16 & data < 17) {
		return '#61ba6a';
	} else if (data >= 17 & data < 18) {
		return '#76c16f';
	} else if (data >= 18 & data < 19) {
		return '#85c976';
	} else if (data >= 19 & data < 20) {
		return '#96d07c';
	} else if (data >= 20 & data < 21) {
		return '#a5d984';
	} else if (data >= 21 & data < 22) {
		return '#b9df88';
	} else if (data >= 22 & data < 23) {
		return '#cae68f';
	} else if (data >= 23 & data < 24) {
		return '#d9f191';
	} else if (data >= 24 & data < 25) {
		return '#f4f3c5';
	} else if (data >= 25 & data < 26) {
		return '#f7e68a';
	} else if (data >= 26 & data < 27) {
		return '#f2d577';
	} else if (data >= 27 & data < 28) {
		return '#f1c363';
	} else if (data >= 28 & data < 29) {
		return '#edb24c';
	} else if (data >= 29 & data < 30) {
		return '#e99e39';
	} else if (data >= 30 & data < 31) {
		return '#e68d29';
	} else if (data >= 31 & data < 32) {
		return '#dd7c07';
	} else if (data >= 32 & data < 33) {
		return '#f05334';
	} else if (data >= 33 & data < 34) {
		return '#ee175b';
	} else if (data >= 34 & data < 35) {
		return '#ac0539';
	} else if (data >= 35 & data < 36) {
		return '#750205';
	} else if (data >= 36 & data < 37) {
		return '#9c68aa';
	} else if (data >= 37 & data < 38) {
		return '#874f9a';
	} else if (data >= 38) {
		return '#7e269e';
	}
};