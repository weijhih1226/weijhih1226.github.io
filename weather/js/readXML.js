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
		this.latLngs = L.XML.getLatLngs(xml);
		this.fire('loaded');
	},

	latLngs: []
})

L.Util.extend(L.XML, {

    parseXML: function (xml, xmlOptions) {
		var coords = [];
		var layers = [], l;
		locs = xml.getElementsByTagName('location');
		for (var i = 0; i < locs.length; i++) {
			var locName = locs[i].getElementsByTagName('locationName')[0].innerHTML;
			if (locs[i].getElementsByTagName('lat_wgs84')[0] !== undefined) {
				var locLat = locs[i].getElementsByTagName('lat_wgs84')[0].innerHTML;
				var locLon = locs[i].getElementsByTagName('lon_wgs84')[0].innerHTML;
			} else {
				var locLat = locs[i].getElementsByTagName('lat')[0].innerHTML;
				var locLon = locs[i].getElementsByTagName('lon')[0].innerHTML;
			}

			var stID = locs[i].getElementsByTagName('stationId')[0].innerHTML;
			var obsTime = locs[i].getElementsByTagName('time')[0].innerHTML;
			var element = locs[i].getElementsByTagName('weatherElement');

			l = new L.CircleMarker(new L.LatLng(locLat, locLon) , {radius: 2.5 , color: xmlOptions.color , fillOpacity: 1})
			if (l) { layers.push(l); }

			var k, j, descr = '';
			for (k = 0; k < element.length; k++) {
				descr = descr + '<h4>' + element[k].childNodes[1].innerHTML + ': ' + element[k].childNodes[3].innerHTML + '</h4>';
			}

			if (locName) {
				l.bindPopup('<h3>' + locName + ' (' + stID + ')</h3>' + 
				'<h4>(' + parseFloat(locLat).toFixed(3) + ' , ' + parseFloat(locLon).toFixed(3) + ')</h4>' + 
				'<h4>ObsTime: ' + obsTime + '</h4>' + 
				'<h4>Observation: </h4>' + descr + '', { className: 'xml-popup'});
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

    parseStyles: function (xml, xmlOptions) {
		var styles = {};
		var sl = xml.getElementsByTagName('Style');
		for (var i = 0; i < sl.length; i++) {
			var style = this.parseStyle(sl[i], xmlOptions);
			if (style) {
				var styleName = '#' + style.id;
				styles[styleName] = style;
			}
		}
		return styles;
	},

    parseStyle: function (xml, kmlOptions) {
		var style = {}, poptions = {}, ioptions = {}, el, id;

		var attributes = {color: true, width: true, Icon: true, href: true, hotSpot: true};

		function _parse (xml) {
			var options = {};
			for (var i = 0; i < xml.childNodes.length; i++) {
				var e = xml.childNodes[i];
				var key = e.tagName;
				if (!attributes[key]) { continue; }
				if (key === 'hotSpot')
				{
					for (var j = 0; j < e.attributes.length; j++) {
						options[e.attributes[j].name] = e.attributes[j].nodeValue;
					}
				} else {
					var value = (e.childNodes && e.childNodes.length) ? e.childNodes[0].nodeValue : null;
					if(!value) {
						continue;
					}
					if (key === 'color') {
						options.opacity = parseInt(value.substring(0, 2), 16) / 255.0;
						options.color = '#' + value.substring(6, 8) + value.substring(4, 6) + value.substring(2, 4);
                    } else if (key === 'width') {
						options.weight = parseInt(value);
					} else if (key === 'Icon') {
						ioptions = _parse(e);
						if (ioptions.href) { options.href = ioptions.href; }
					} else if (key === 'href') {
						options.href = value;
					}
				}
			}
			return options;
		}

		el = xml.getElementsByTagName('LineStyle');
		if (el && el[0]) { style = _parse(el[0]); }
		el = xml.getElementsByTagName('PolyStyle');
		if (el && el[0]) { poptions = _parse(el[0]); }
		if (poptions.color) { style.fillColor = poptions.color; }
		if (poptions.opacity) { style.fillOpacity = poptions.opacity; }
		el = xml.getElementsByTagName('IconStyle');
		if (el && el[0]) { ioptions = _parse(el[0]); }
		if (ioptions.href) {
			var iconOptions = {
				iconUrl: ioptions.href,
				shadowUrl: null,
				anchorRef: {x: ioptions.x, y: ioptions.y},
				anchorType:	{x: ioptions.xunits, y: ioptions.yunits}
			};

			if (typeof kmlOptions === "object" && typeof kmlOptions.iconOptions === "object") {
				L.Util.extend(iconOptions, kmlOptions.iconOptions);
			}
			style.icon = new L.KMLIcon(iconOptions);
            style.opacity = ioptions.opacity;
		}

		id = xml.getAttribute('id');
		if (id && style) {
			style.id = id;
		}

		return style;
	},

    parseStyleMap: function (xml, existingStyles) {
		var sl = xml.getElementsByTagName('StyleMap');

		for (var i = 0; i < sl.length; i++) {
			var e = sl[i], el;
			var smKey, smStyleUrl;

			el = e.getElementsByTagName('key');
			if (el && el[0]) { smKey = el[0].textContent; }
			el = e.getElementsByTagName('styleUrl');
			if (el && el[0]) { smStyleUrl = el[0].textContent; }

			if (smKey === 'normal')
			{
				existingStyles['#' + e.getAttribute('id')] = existingStyles[smStyleUrl];
			}
		}

		return;
	},

    getLatLngs: function (xml) {
        var locTag = xml.getElementsByTagName('location');
		var latTag = xml.getElementsByTagName('lat_wgs84');
        var lonTag = xml.getElementsByTagName('lon_wgs84');

		var coords = [];
		for (var i = 0; i < lonTag.length; i++) {
            var lat = latTag[i].childNodes[0].nodeValue;
            var lon = lonTag[i].childNodes[0].nodeValue;
			coords.push(new L.LatLng(lat, lon));
		}
		return coords;
	},

	parseFolder: function (xml, style) {
		var el, layers = [], l;
		el = xml.getElementsByTagName('location');
		for (var i = 0; i < el.length; i++) {
			l = this.parseLocation(el[i], xml, style);
			if (l) { layers.push(l); }
		}
		if (!layers.length) { return; }
		if (layers.length === 1) {
			l = layers[0];
		} else {
			l = new L.FeatureGroup(layers);
		}
		el = xml.getElementsByTagName('name');
		if (el.length && el[0].childNodes.length) {
			l.options.name = el[0].childNodes[0].nodeValue;
		}
		return l;
	},

	parseLocation: function (location, xml, style, options) {
		var h, i, j, k, el, il, opts = options || {};

		el = location.getElementsByTagName('styleUrl');
		for (i = 0; i < el.length; i++) {
			var url = el[i].childNodes[0].nodeValue;
			for (var a in style[url]) {
				opts[a] = style[url][a];
			}
		}

		il = location.getElementsByTagName('Style')[0];
		if (il) {
			var inlineStyle = this.parseStyle(location);
			if (inlineStyle) {
				for (k in inlineStyle) {
					opts[k] = inlineStyle[k];
				}
			}
		}

		var multi = ['MultiGeometry', 'MultiTrack', 'gx:MultiTrack'];
		for (h in multi) {
			el = location.getElementsByTagName(multi[h]);
			for (i = 0; i < el.length; i++) {
				var layer = this.parsePlacemark(el[i], xml, style, opts);
				if (layer === undefined)
					continue;
				this.addLocationPopup(location, layer);
				return layer;
			}
		}

		var layers = [];

		var parse = ['LineString', 'Polygon', 'Point', 'Track', 'gx:Track'];
		for (j in parse) {
			var tag = parse[j];
			el = location.getElementsByTagName(tag);
			for (i = 0; i < el.length; i++) {
				var l = this['parse' + tag.replace(/gx:/, '')](el[i], xml, opts);
				if (l) { layers.push(l); }
			}
		}

		if (!layers.length) {
			return;
		}
		var layer = layers[0];
		if (layers.length > 1) {
			layer = new L.FeatureGroup(layers);
		}

		this.addLocationPopup(location, layer);
		return layer;
	},

	// addLocationPopup: function(location, layer) {
	// 	var el, i, j, name, descr = '';
	// 	el = location.getElementsByTagName('locationName');
	// 	if (el.length && el[0].childNodes.length) {
	// 	  	name = el[0].childNodes[0].nodeValue;
	// 	}
	// 	el = location.getElementsByTagName('weatherElement');
	// 	for (i = 0; i < el.length; i++) {
	// 	  	for (j = 0; j < el[i].childNodes.length; j++) {
	// 			descr = descr + el[i].childNodes[j].nodeValue;
	// 	  	}
	// 	}
	// 	if (name) {
	// 	  	layer.bindPopup('<h2>' + name + '</h2>' + descr, { className: 'xml-popup'});
	// 	}
	//   },
})

L.XMLCircle = L.Circle.extend({
    options: {
        radius: 2,
		color: 'red',
	}
});